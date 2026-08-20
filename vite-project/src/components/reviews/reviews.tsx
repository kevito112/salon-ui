import { useCallback, useEffect, useState } from 'react';
import './reviews.css';
import {
    fallbackReviews,
    GOOGLE_REVIEWS_URL,
    MIN_REVIEW_RATING,
    MAX_DISPLAY_REVIEWS,
    type Review,
} from '../../data/reviews';

const ROTATE_MS = 10000;

const STAR_PATH =
    'M12 2.6l2.53 6.12 6.62.58-5.05 4.4 1.5 6.46L12 16.9l-5.6 3.26 1.5-6.46-5.05-4.4 6.62-.58L12 2.6z';

const StarIcon = ({ className = 'review-star' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path fill="currentColor" d={STAR_PATH} />
    </svg>
);

const StarRating = ({
    rating,
    className = 'reviews-stars',
    label,
}: {
    rating: number;
    className?: string;
    label?: string;
}) => {
    const safeRating = Math.min(Math.max(rating, 0), 5);

    return (
        <span
            className={className}
            aria-label={label ?? `${safeRating} out of 5 stars`}
        >
            {Array.from({ length: 5 }, (_, index) => {
                const fillAmount = Math.min(Math.max(safeRating - index, 0), 1);

                return (
                    <span key={index} className="review-star-slot">
                        <StarIcon className="review-star review-star-empty" />
                        <span
                            className="review-star-fill"
                            style={{ width: `${fillAmount * 100}%` }}
                        >
                            <StarIcon className="review-star" />
                        </span>
                    </span>
                );
            })}
        </span>
    );
};

const formatRating = (rating: number) =>
    Number.isInteger(rating) ? `${rating}` : rating.toFixed(1);

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
    const [googleRating, setGoogleRating] = useState<number | null>(null);
    const [googleCount, setGoogleCount] = useState<number | null>(null);
    const [hasLiveGoogleData, setHasLiveGoogleData] = useState(false);
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
                if (cancelled || !data) return;

                if (typeof data.rating === 'number') setGoogleRating(data.rating);
                if (typeof data.count === 'number') setGoogleCount(data.count);

                if (data.source === 'google-places-api-new' || data.source === 'google-places-api') {
                    setHasLiveGoogleData(true);
                }

                const filtered = (data.reviews ?? []).filter(
                    (review: Review) => review.rating >= MIN_REVIEW_RATING && review.text,
                );

                if (filtered.length) {
                    setReviews(filtered.slice(0, MAX_DISPLAY_REVIEWS));
                    setIndex(0);
                }
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

    return (
        <section className="reviews container section" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading">client reviews</h2>
            <p className="reviews-subtitle">
                Hear what our community has to say about Key Beauty.
            </p>
            <div className="reviews-rating">
                {hasLiveGoogleData && googleRating !== null && googleCount !== null ? (
                    <>
                        <StarRating
                            rating={googleRating}
                            label={`Rated ${formatRating(googleRating)} out of 5 on Google`}
                        />
                        <span className="reviews-rating-copy">
                            Rated {formatRating(googleRating)} on Google · {googleCount} reviews
                        </span>
                    </>
                ) : (
                    <span className="reviews-rating-copy reviews-rating-loading">
                        Loading Google rating…
                    </span>
                )}
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
                    <StarRating
                        rating={current.rating}
                        className="reviews-stars review-card-stars"
                        label={`${current.rating} out of 5 stars`}
                    />
                    <p className="reviews-quote">“{current.text}”</p>
                    <div className="reviews-author-row">
                        {hasLiveGoogleData && current.photoUrl && (
                            <img
                                src={current.photoUrl}
                                alt=""
                                className="reviews-author-photo"
                            />
                        )}
                        {hasLiveGoogleData && current.profileUrl ? (
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
                        {hasLiveGoogleData ? 'Posted on Google' : 'Guest review'}
                    </p>
                    {hasLiveGoogleData && (
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
