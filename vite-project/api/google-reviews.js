const SEARCH_QUERY = 'Key Beauty key Biscayne 961 Crandon Blvd';
const MIN_RATING = 4.5;

function toReview(review) {
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

async function fetchPlacePayload(apiKey, placeId) {
    if (placeId) {
        const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
            headers: {
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
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
            'X-Goog-FieldMask': 'places.rating,places.userRatingCount,places.reviews,places.id',
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
        const payload = await fetchPlacePayload(apiKey, process.env.GOOGLE_PLACE_ID);

        const reviews = (payload.reviews || [])
            .map(toReview)
            .filter((review) => review.rating >= MIN_RATING && review.text);

        res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
        res.status(200).json({
            rating: payload.rating ?? null,
            count: payload.userRatingCount ?? null,
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
