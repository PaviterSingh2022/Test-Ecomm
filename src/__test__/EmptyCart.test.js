import React from 'react';
import { render } from '@testing-library/react';
import EmptyCart from '../../src/components/Cart/EmptyCart';

describe('EmptyCart component', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(<EmptyCart />);
        const emptyCartElement = getByTestId('empty-cart');
        expect(emptyCartElement).toBeInTheDocument();
    });

    it('displays the correct message', () => {
        const { getByText } = render(<EmptyCart />);
        const emptyCartMessage = getByText('Your cart is currently empty');
        expect(emptyCartMessage).toBeInTheDocument();
    });

    it('has the correct CSS class', () => {
        const { getByTestId } = render(<EmptyCart />);
        const emptyCartElement = getByTestId('empty-cart');
        expect(emptyCartElement).toHaveClass('container mt-5');
    });

    //ensures that the rendered component matches the previous snapshot.
    //This is useful for detecting unexpected changes in the component's appearance over time
    it('matches snapshot', () => {
        const { asFragment } = render(<EmptyCart />);
        expect(asFragment()).toMatchSnapshot();
    });
});
