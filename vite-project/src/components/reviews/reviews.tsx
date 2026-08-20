import { useCallback, useEffect, useState } from 'react';
import './reviews.css';
import {
    fallbackReviews,
    GOOGLE_REVIEWS_URL,
    MIN_REVIEW_RATING,
    MAX_DISPLAY_REVIEWS,
    shuffleReviews,
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

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>(() => shuffleReviews(fallbackReviews));
    const [googleRating, setGoogleRating] = useState<number | null>(null);
    const [googleCount, setGoogleCount] = useState<number | null>(null);
    const [hasLiveGoogleData, setHasLiveGoogleData] = useState(false);
    const [index, setIndex] = useState(
        () => Math.floor(Math.random() * fallbackReviews.length),
    );
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

                const incomingReviews: Review[] = Array.isArray(data.reviews)
                    ? data.reviews
                    : [];
                const filtered = incomingReviews.filter(
                    (review) => review.rating >= MIN_REVIEW_RATING && review.text,
                );

                if (filtered.length) {
                    const shuffled = shuffleReviews(filtered.slice(0, MAX_DISPLAY_REVIEWS));
                    setReviews(shuffled);
                    setIndex(Math.floor(Math.random() * shuffled.length));
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
                        <p className="reviews-author">{current.name}</p>
                    </div>
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
            {hasLiveGoogleData && (
                <a
                    className="reviews-google-link"
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read reviews on Google Maps
                </a>
            )}
        </section>
    );
};

export default Reviews;
