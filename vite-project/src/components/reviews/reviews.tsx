import { useCallback, useEffect, useState } from 'react';
import './reviews.css';
import {
    fallbackReviews,
    GOOGLE_RATING,
    GOOGLE_REVIEW_COUNT,
    GOOGLE_REVIEWS_URL,
    MIN_REVIEW_RATING,
    type Review,
} from '../../data/reviews';

const ROTATE_MS = 7000;

const StarIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="review-star">
        <path
            fill="currentColor"
            d="M12 2.6l2.53 6.12 6.62.58-5.05 4.4 1.5 6.46L12 16.9l-5.6 3.26 1.5-6.46-5.05-4.4 6.62-.58L12 2.6z"
        />
    </svg>
);

const GoogleMark = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="google-mark">
        <path fill="#4285F4" d="M23.5 12.27c0-.84-.07-1.65-.21-2.43H12v4.6h6.46a5.52 5.52 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.56-5.17 3.56-8.8z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.95-2.93l-3.88-3c-1.08.72-2.47 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.09A12 12 0 0 0 12 24z" />
        <path fill="#FBBC05" d="M5.27 14.26A7.21 7.21 0 0 1 4.9 12c0-.79.14-1.55.37-2.26V6.65H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.35l4-3.09z" />
        <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.6 4.6 1.79l3.44-3.44C17.95 1.14 15.23 0 12 0 7.31 0 3.26 2.69 1.27 6.65l4 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
);

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
    const [googleRating, setGoogleRating] = useState(GOOGLE_RATING);
    const [googleCount, setGoogleCount] = useState(GOOGLE_REVIEW_COUNT);
    const [isLive, setIsLive] = useState(false);
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        let cancelled = false;

        fetch('/api/google-reviews')
            .then(async (response) => {
                if (!response.ok) return null;
                return response.json();
            })
            .then((data) => {
                if (cancelled || !data?.reviews?.length) return;

                const filtered = data.reviews.filter(
                    (review: Review) => review.rating >= MIN_REVIEW_RATING && review.text,
                );

                if (!filtered.length) return;

                setReviews(filtered);
                setIndex(0);
                setIsLive(true);
                if (typeof data.rating === 'number') setGoogleRating(data.rating);
                if (typeof data.count === 'number') setGoogleCount(data.count);
            })
            .catch(() => {
                /* Keep fallback reviews if the API is unavailable locally. */
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const goTo = useCallback((nextIndex: number) => {
        setIndex((nextIndex + reviews.length) % reviews.length);
    }, [reviews.length]);

    useEffect(() => {
        if (paused || reviews.length < 2) return undefined;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % reviews.length);
        }, ROTATE_MS);

        return () => window.clearInterval(timer);
    }, [paused, reviews.length]);

    const current = reviews[index] ?? reviews[0];
    if (!current) return null;

    const filledStars = Math.round(current.rating);

    return (
        <section className="reviews container section" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading">client reviews</h2>
            <p className="reviews-subtitle">
                {isLive
                    ? 'Live Google reviews from guests who rated Key Beauty 4.5 stars or higher.'
                    : 'Guest reviews shown while live Google reviews load.'}
            </p>
            <div className="reviews-rating">
                <span className="reviews-stars" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, starIndex) => (
                        <StarIcon key={starIndex} />
                    ))}
                </span>
                <span className="reviews-rating-copy">
                    Rated {googleRating} on Google · {googleCount} reviews
                </span>
            </div>
            <div
                className="reviews-carousel"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {reviews.length > 1 && (
                    <button
                        type="button"
                        className="reviews-arrow"
                        onClick={() => goTo(index - 1)}
                        aria-label="Previous review"
                    >
                        ‹
                    </button>
                )}
                <article key={current.id} className="review-card" aria-live="polite" aria-atomic="true">
                    <div
                        className="reviews-stars review-card-stars"
                        aria-label={`${current.rating} out of 5 stars`}
                    >
                        {Array.from({ length: filledStars }, (_, starIndex) => (
                            <StarIcon key={starIndex} />
                        ))}
                    </div>
                    <p className="reviews-quote">“{current.text}”</p>
                    <div className="reviews-author-row">
                        {isLive && current.photoUrl && (
                            <img
                                src={current.photoUrl}
                                alt=""
                                className="reviews-author-photo"
                            />
                        )}
                        {isLive && current.profileUrl ? (
                            <a
                                href={current.profileUrl}
                                className="reviews-author reviews-author-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {current.name}
                            </a>
                        ) : (
                            <p className="reviews-author">{current.name}</p>
                        )}
                    </div>
                    <p className="reviews-source">
                        <GoogleMark />
                        {isLive ? 'Posted on Google' : 'Guest review'}
                    </p>
                    {isLive && (
                        <p className="reviews-google-attribution">
                            Content from{' '}
                            <a
                                href={GOOGLE_REVIEWS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google Maps
                            </a>
                        </p>
                    )}
                </article>
                {reviews.length > 1 && (
                    <button
                        type="button"
                        className="reviews-arrow"
                        onClick={() => goTo(index + 1)}
                        aria-label="Next review"
                    >
                        ›
                    </button>
                )}
            </div>
            {reviews.length > 1 && (
                <div className="reviews-dots" role="tablist" aria-label="Choose a review">
                    {reviews.map((review, reviewIndex) => (
                        <button
                            key={review.id}
                            type="button"
                            role="tab"
                            aria-selected={reviewIndex === index}
                            className={`reviews-dot${reviewIndex === index ? ' is-active' : ''}`}
                            onClick={() => goTo(reviewIndex)}
                            aria-label={`Show review ${reviewIndex + 1}`}
                        />
                    ))}
                </div>
            )}
            <a
                className="reviews-google-link"
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                Read reviews on Google
            </a>
        </section>
    );
};

export default Reviews;
