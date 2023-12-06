import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewCards from '../../src/components/Review/ReviewCards';

const mockReview = {
    rating: 4,
    title: 'Great Product',
    description: 'This product exceeded my expectations.',
};

describe('ReviewCards Component', () => {
    test('renders review card with correct title and description', () => {
        render(<ReviewCards review={mockReview} />);

        // Check if the title and description are rendered correctly
        expect(screen.getByText('Great Product')).toBeInTheDocument();
        expect(screen.getByText('This product exceeded my expectations.')).toBeInTheDocument();
    });

    test('renders star rating component with correct rating', () => {
        render(<ReviewCards review={mockReview} />);

        // Assuming StaticStarRating renders the correct star elements based on the rating prop
        // Check if the star rating component is rendered with the correct rating
        const starRatingElement = screen.getByTestId('star-rating');
        expect(starRatingElement).toHaveAttribute('data-rating', '4');
    });

});
