const SEARCH_QUERY = 'Key Beauty key Biscayne 961 Crandon Blvd';
const MIN_RATING = 4;
/** Places API (New) returns at most 5 reviews per request — Google platform limit. */
const MAX_REVIEWS = 5;

function normalizePlaceId(id) {
    if (!id) return null;
    return id.replace(/^places\//, '');
}

function getReviewText(review) {
    return (
        review.text?.text ||
        review.originalText?.text ||
        review.text ||
        ''
    ).trim();
}

function toReview(review) {
    const text = getReviewText(review);
    const name = review.authorAttribution?.displayName || 'Google review';
    const publishTime = review.publishTime || review.relativePublishTimeDescription || '';

    return {
        id: `${name}-${publishTime}-${text.slice(0, 24)}`,
        name,
        text,
        rating: review.rating ?? 0,
        photoUrl: review.authorAttribution?.photoUri || null,
        profileUrl: review.authorAttribution?.uri || null,
    };
}

async function fetchPlacePayload(apiKey, placeId) {
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
        const placeId = normalizePlaceId(process.env.GOOGLE_PLACE_ID);
        const payload = await fetchPlacePayload(apiKey, placeId);

        const reviews = (payload.reviews || [])
            .map(toReview)
            .filter((review) => review.rating >= MIN_RATING && review.text)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, MAX_REVIEWS);

        res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
        res.status(200).json({
            rating: payload.rating ?? null,
            count: payload.userRatingCount ?? null,
            reviews,
            source: 'google-places-api-new',
        });
    } catch (error) {
        res.status(502).json({
            error: 'Unable to load Google reviews',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
