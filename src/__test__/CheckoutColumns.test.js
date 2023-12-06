import React from 'react';
import { render } from '@testing-library/react';
import CheckoutColumns from '../../src/components/Cart/CheckoutColumns';

describe('CheckoutColumns Component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<CheckoutColumns />);

        expect(getByText('products')).toBeInTheDocument();
        expect(getByText('name of product')).toBeInTheDocument();
        expect(getByText('price')).toBeInTheDocument();
        expect(getByText('quantity')).toBeInTheDocument();
        expect(getByText('total')).toBeInTheDocument();
    });

    it('applies the correct classes to columns', () => {
        const { getByText } = render(<CheckoutColumns />);

        expect(getByText('products').closest('.col-lg-2')).toBeInTheDocument();
        expect(getByText('name of product').closest('.col-lg-2')).toBeInTheDocument();
        expect(getByText('price').closest('.col-lg-2')).toBeInTheDocument();
        expect(getByText('quantity').closest('.col-lg-2')).toBeInTheDocument();
        expect(getByText('total').closest('.col-lg-2')).toBeInTheDocument();
    });

    it('renders the container with the correct class', () => {
        const { container } = render(<CheckoutColumns />);

        expect(container.firstChild).toHaveClass('container-fluid');
        expect(container.firstChild).toHaveClass('text-center');
        expect(container.firstChild).toHaveClass('d-none');
        expect(container.firstChild).toHaveClass('d-lg-block');
    });
});