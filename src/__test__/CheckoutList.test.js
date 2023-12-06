import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userContext from "../../src/utils/userContext";
import store from '../../src/utils/store'
import { Provider } from 'react-redux';
import CheckoutList from '../../src/components/Cart/CheckoutList';
import { getCartProductsService } from '../firebase/services/cart.service';

// Mock userContext
const mockUser = {
    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
    email: "Test1234@gmail.com",
};

const defaultUser = {
    userId: null,
}

const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};;


// Mock getCartProductsService
jest.mock('../../src/firebase/services/cart.service', () => ({
    getCartProductsService: jest.fn().mockResolvedValue([{
        company: "Mock Product1",
        count: 1,
        id: "rlgm997oiWc2jCrgr80l",
        img: "img/product-10.png",
        inCart: true,
        info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
        price: 15,
        productId: "nCBlyCfdsp86bK7tiEO1",
        title: "Product 1",
        userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
    }, {
        company: "Mock Product2",
        count: 1,
        id: "rlgm997oiWc2jCrgr80l",
        img: "img/product-10.png",
        inCart: true,
        info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
        price: 15,
        productId: "nCBlyCfdsp86bK7tiEO1",
        title: "Product 2",
        userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
    }])
}));

describe('CheckoutList Component', () => {
    it('renders the component', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CheckoutList value={{ cart: [] }} />
                    </MockUserProvider>
                </Provider>
            );
        });

        //Wait for the data to be fetched
        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });
    });

    it('renders a message when the user is not logged in', async () => {
        const consoleSpy = jest.spyOn(console, 'log');
        await act(async () => {
            render(
                <Provider store={store}>
                    <MockUserProvider value={{ user: defaultUser }}>
                        <CheckoutList value={{ cart: [] }} />
                    </MockUserProvider>
                </Provider>
            );
        });

        // Check if the login message is displayed
        expect(consoleSpy).toHaveBeenCalledWith('Please login to see past Cart products');
    });

    it('calls fetchAddToCartData when mounted', async () => {
        //const fetchAddToCartData = jest.fn();

        await act(async () => {
            render(
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CheckoutList value={{ cart: [] }} />
                    </MockUserProvider>
                </Provider>
            );
        });

        await waitFor(() => {
            expect(getCartProductsService).toHaveBeenCalledWith(mockUser.userId);
        });
    });

    it('calls fetchAddToCartData when the user is logged in', async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CheckoutList value={{ cart: [] }} />
                    </MockUserProvider>
                </Provider>
            );
        });

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();

        // // Simulate a user login
        jest.mock('../../src/utils/userContext', () => ({
            __esModule: true,
            default: { user: mockUser }
        }));

        // Rerender the component to trigger useEffect
        await act(async () => {
            render(
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CheckoutList value={{ cart: [] }} />
                    </MockUserProvider>
                </Provider>
            );
        });


        //Wait for the calling fetchAddToCartData
        await waitFor(() => {
            expect(getCartProductsService).toHaveBeenCalledWith(mockUser.userId);
        });

    });

});
