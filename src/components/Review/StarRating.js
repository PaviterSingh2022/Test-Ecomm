import React, { useEffect, useState } from 'react';

const StarRating = ({ parentCallback, myProductRating }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const setMyProductRating = (index) => {
        setRating(index);
        parentCallback(index);
    }

    useEffect(() => {
        setRating(myProductRating);
    }, myProductRating);

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating)
                            ? "star-rating-button star-rating-on"
                            : " star-rating-button star-rating-off"}
                        onClick={() =>
                            setMyProductRating(index)
                        }
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;