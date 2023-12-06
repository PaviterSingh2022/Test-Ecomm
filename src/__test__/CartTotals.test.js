import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import store from '../../src/utils/store'
import { Provider } from 'react-redux';
import userContext from "../../src/utils/userContext";
import { BrowserRouter } from 'react-router-dom';
import CartTotals from '../../src/components/Cart/CartTotals';

const mockUser = {
    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
    email: "Test1234@gmail.com",
};

const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

describe('CartTotals', () => {
    test('renders CartTotals component', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CartTotals value={{ subTotal: 50, tax: 5, total: 55, cart: [] }} />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );

        // Ensure that the component renders properly
        expect(screen.getByText('clear cart')).toBeInTheDocument();
        expect(screen.getByText('subtotal :')).toBeInTheDocument();
        expect(screen.getByText('tax :')).toBeInTheDocument();
        expect(screen.getByText('total Amount :')).toBeInTheDocument();
        expect(screen.getByText('Proceed To Checkout')).toBeInTheDocument();
    });

    test('able to click "clear cart" button to remove an item from cart', () => {

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CartTotals
                            value={{ subTotal: 50, tax: 5, total: 55, cart: [] }}
                        />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('clear cart'));

    });

    test('navigates to /checkout when "Proceed To Checkout" button is clicked', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CartTotals
                            value={{ subTotal: 50, tax: 5, total: 55, cart: [] }}
                        />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Proceed To Checkout'));

        // Ensure that the navigation occurred
        const checkoutButton = screen.getByText('Proceed To Checkout');
        const parentAnchor = checkoutButton.closest('a');

        expect(parentAnchor).toHaveAttribute('href', '/checkout');
    });

});
