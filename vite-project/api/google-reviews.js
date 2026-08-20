const SEARCH_QUERY = 'Key Beauty key Biscayne 961 Crandon Blvd';
const MIN_RATING = 4.5;
const MAX_REVIEWS = 7;

function normalizePlaceId(id) {
    if (!id) return null;
    return id.replace(/^places\//, '');
}

function toReviewFromNew(review) {
    const text = review.text?.text || review.originalText?.text || '';
    const rating = review.rating ?? 0;

    return {
        id: `${review.authorAttribution?.displayName || 'guest'}-${review.publishTime || text.slice(0, 16)}`,
        name: review.authorAttribution?.displayName || 'Google review',
        text: text.trim(),
        rating,
        photoUrl: review.authorAttribution?.photoUri || null,
        profileUrl: review.authorAttribution?.uri || null,
    };
}

function toReviewFromLegacy(review) {
    const text = review.text || '';

    return {
        id: `${review.author_name || 'guest'}-${review.time || text.slice(0, 16)}`,
        name: review.author_name || 'Google review',
        text: text.trim(),
        rating: review.rating ?? 0,
        photoUrl: review.profile_photo_url || null,
        profileUrl: review.author_url || null,
    };
}

function mergeReviews(...reviewLists) {
    const seen = new Set();
    const merged = [];

    for (const list of reviewLists) {
        for (const review of list) {
            if (!review?.id || seen.has(review.id)) continue;
            seen.add(review.id);
            merged.push(review);
        }
    }

    return merged;
}

async function fetchNewPlacePayload(apiKey, placeId) {
    if (placeId) {
        const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
            headers: {
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'id,rating,userRatingCount,reviews',
            },
        });

        const payload = await response.json();
        if (!response.ok) {
            throw new Error(payload.error?.message || 'Unable to load place details');
        }

        return payload;
    }

    const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.rating,places.userRatingCount,places.reviews',
        },
        body: JSON.stringify({
            textQuery: SEARCH_QUERY,
            languageCode: 'en',
        }),
    });

    const payload = await response.json();
    if (!response.ok) {
        throw new Error(payload.error?.message || 'Unable to search for place');
    }

    return payload.places?.[0] || {};
}

async function fetchLegacyReviews(apiKey, placeId, sort) {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', placeId);
    url.searchParams.set('fields', 'reviews,rating,user_ratings_total');
    url.searchParams.set('reviews_sort', sort);
    url.searchParams.set('key', apiKey);

    const response = await fetch(url);
    const payload = await response.json();

    if (payload.status !== 'OK') {
        throw new Error(payload.error_message || `Legacy Places API failed (${sort})`);
    }

    return payload.result || {};
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
        res.status(503).json({ error: 'Google Places API key is not configured' });
        return;
    }

    try {
        const configuredPlaceId = normalizePlaceId(process.env.GOOGLE_PLACE_ID);
        const payload = await fetchNewPlacePayload(apiKey, configuredPlaceId);
        const placeId = configuredPlaceId || normalizePlaceId(payload.id);

        let rating = payload.rating ?? null;
        let count = payload.userRatingCount ?? null;

        const newReviews = (payload.reviews || []).map(toReviewFromNew);
        let legacyNewestReviews = [];
        let legacyRelevantReviews = [];

        if (placeId) {
            try {
                const newestPayload = await fetchLegacyReviews(apiKey, placeId, 'newest');
                legacyNewestReviews = (newestPayload.reviews || []).map(toReviewFromLegacy);
                if (typeof newestPayload.rating === 'number') rating = newestPayload.rating;
                if (typeof newestPayload.user_ratings_total === 'number') {
                    count = newestPayload.user_ratings_total;
                }
            } catch {
                /* Legacy API may be disabled; continue with New Places reviews. */
            }

            try {
                const relevantPayload = await fetchLegacyReviews(apiKey, placeId, 'most_relevant');
                legacyRelevantReviews = (relevantPayload.reviews || []).map(toReviewFromLegacy);
                if (typeof relevantPayload.rating === 'number') rating = relevantPayload.rating;
                if (typeof relevantPayload.user_ratings_total === 'number') {
                    count = relevantPayload.user_ratings_total;
                }
            } catch {
                /* Legacy API may be disabled; continue with New Places reviews. */
            }
        }

        const reviews = mergeReviews(newReviews, legacyNewestReviews, legacyRelevantReviews)
            .filter((review) => review.rating >= MIN_RATING && review.text)
            .slice(0, MAX_REVIEWS);

        res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
        res.status(200).json({
            rating,
            count,
            reviews,
            source: 'google-places-api',
        });
    } catch (error) {
        res.status(502).json({
            error: 'Unable to load Google reviews',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
