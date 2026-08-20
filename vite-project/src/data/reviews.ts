export type Review = {
    id: string;
    name: string;
    text: string;
    rating: number;
    photoUrl?: string | null;
    profileUrl?: string | null;
};

export const GOOGLE_REVIEWS_URL =
    'https://www.google.com/maps/search/?api=1&query=Key+Beauty+key+Biscayne%2C+961+Crandon+Blvd%2C+Key+Biscayne%2C+FL+33149';

export const MIN_REVIEW_RATING = 4;
/** Places API (New) returns at most 5 reviews per request. */
export const MAX_DISPLAY_REVIEWS = 5;

/** Fisher–Yates shuffle; returns a new array in random order. */
export function shuffleReviews<T>(items: T[]): T[] {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/** Fallback reviews if the Google Places API is unavailable. */
export const fallbackReviews: Review[] = [
    {
        id: 'elena',
        name: 'Elena',
        text: 'The best experience!! Yeny is very knowledgeable about all the services offered! Facials are outstanding! The lymphatic massage is the best!! She always has a smile and makes you feel at home!! Definitely an experience!! Thank you!!',
        rating: 5,
    },
    {
        id: 'jennifer',
        name: 'Jennifer',
        text: 'Without a doubt the best in facials, lashes, eyebrows, massages and more. Always in love with my results. Yeny has a lovely energy that makes your experience very relaxing. Recommend 100%.',
        rating: 5,
    },
    {
        id: 'janiel',
        name: 'Janiel',
        text: 'The service was exceptional. She has a lot of knowledge. I definitely will be back again. I recommended her 100%.',
        rating: 5,
    },
    {
        id: 'diana',
        name: 'Diana',
        text: 'Excellent! I noticed changes on me.',
        rating: 5,
    },
    {
        id: 'google-facials',
        name: 'A Google guest',
        text: "Yeny's facials are fantastic and she's a skincare magician.",
        rating: 5,
    },
];
