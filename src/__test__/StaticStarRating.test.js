import React from 'react';
import { render } from '@testing-library/react';
import StaticStarRating from '../../src/components/Review/StaticStarRating';

describe('StaticStarRating', () => {
    it('renders the component with the correct rating', () => {
        const { getByTestId } = render(<StaticStarRating myProductRating={3} />);
        const starRatingElement = getByTestId('star-rating');

        expect(starRatingElement).toHaveAttribute('data-rating', '3');
    });

    it('renders the correct number of stars highlighted based on the rating', () => {
        const { container } = render(<StaticStarRating myProductRating={2} />);
        const starButtons = container.querySelectorAll('.star-rating-button');

        expect(starButtons[0]).toHaveClass('star-rating-on');
        expect(starButtons[1]).toHaveClass('star-rating-on');
        expect(starButtons[2]).toHaveClass('star-rating-off');
        expect(starButtons[3]).toHaveClass('star-rating-off');
        expect(starButtons[4]).toHaveClass('star-rating-off');
    });

    it('displays the correct number of stars based on the given rating', () => {
        const { container } = render(<StaticStarRating myProductRating={4} />);
        const starButtons = container.querySelectorAll('.star-rating-button');

        expect(starButtons).toHaveLength(5);
    });

});
