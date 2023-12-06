import React, { useEffect, useState } from 'react';

const StaticStarRating = ({ myProductRating }) => {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setRating(myProductRating);
    }, myProductRating);

    return (
        <div className="star-rating" data-testid="star-rating" data-rating={myProductRating}>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        disabled
                        type="button"
                        key={index}
                        className={index <= (rating)
                            ? "star-rating-button star-rating-on"
                            : " star-rating-button star-rating-off"}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

export default StaticStarRating;