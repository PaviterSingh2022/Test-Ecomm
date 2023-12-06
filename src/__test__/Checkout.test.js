import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userContext from "../../src/utils/userContext";
import { useSelector, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import Store from '../../src/components/Cart/Checkout';
import { BrowserRouter } from 'react-router-dom';
import { removeAll } from '../utils/cartSlice';


// Mock the context value
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

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const sampleCartItem = {
    company: "Mock Product",
    count: 1,
    id: "rlgm997oiWc2jCrgr80l",
    img: "img/product-10.png",
    inCart: true,
    info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    price: 15,
    productId: "nCBlyCfdsp86bK7tiEO1",
    title: "Adidas T-shirt",
    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
};

// Mock the Redux store
const mockStore = configureStore({
    reducer: {
        cart: removeAll,
    },
    preloadedState: {
        cart: {
            cart: [
                {
                    company: "Mock Product",
                    count: 1,
                    id: "rlgm997oiWc2jCrgr80l",
                    img: "img/product-10.png",
                    inCart: true,
                    info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                    price: 15,
                    productId: "nCBlyCfdsp86bK7tiEO1",
                    title: "Adidas T-shirt",
                    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
                }
            ],
        },
    },
});
describe('Store Component', () => {
    beforeEach(() => {
        useSelector.mockImplementation((selector) => selector(mockStore.getState()));
        useDispatch.mockReturnValue(jest.fn());
    });
    it('renders Store component with empty cart and Empty cart component render', () => {
        useSelector.mockImplementationOnce(() => ({ cart: [] }));
        render(
            <Provider store={mockStore}>
                <MockUserProvider value={{ user: mockUser }}>
                    <Store />
                </MockUserProvider>
            </Provider>
        );

        //Verify that EmptyCart component is rendered
        expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
    });

    it('renders Store component with items in the cart and Order Summary component render', () => {

        useSelector.mockImplementationOnce(() => ({ cart: [sampleCartItem] }));

        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <Store />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );

        // Verify that OrderSummary component is rendered
        expect(screen.getByTestId('order-summary')).toBeInTheDocument();
    });

});
