import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Details from '../../src/components/Details';
import store from '../../src/utils/store'
import { Provider } from 'react-redux';
import userContext from "../../src/utils/userContext";
import { BrowserRouter } from 'react-router-dom';


const userDetails = {
    userId: 'DYLnWFX3d2MU6pdnu059AHN2KFm2',
    email: 'Test1234@gmail.com'
};

const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

describe('Details Component', () => {
    test('renders product details', () => {
        const detailProduct = {
            id: 1,
            company: 'Company A',
            img: 'product-image.jpg',
            info: 'Product information',
            price: 10,
            title: 'Google Pixel - Black',
            inCart: false,
            inWishlist: false,
        };

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: userDetails }}>
                        <Details product={detailProduct} />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );

        // Find the product title within an h1 element
        const titleElement = screen.queryByText(detailProduct.title, { selector: 'h1' });
        expect(titleElement).toBeInTheDocument();
        expect(screen.getByText('some info about product')).toBeInTheDocument();
    });

    test('adds product to cart when "add to cart" button is clicked', () => {

        // Mock the detailProduct with inCart set to false
        const detailProduct = {
            categoryId: "vxxbw52EaQnb6aCDwJAd",
            company: "htc",
            count: 0,
            id: "jf82ctVzCvYD8QgopccX",
            img: "img/product-3.png",
            inCart: false,
            info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
            price: 8,
            title: "HTC 10 - Black",
            total: 0,
            inWishlist: false,

        };

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: userDetails }}>
                        <Details product={detailProduct} />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );

        // Find and click the "add to cart" button
        const addToCartButton = screen.getByText('add to cart');
        fireEvent.click(addToCartButton);

        // Verify that the product is added to the cart (e.g., check Redux store)
        const mockedData = [{
            price: 8,
            img: "img/product-3.png",
            info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
            inCart: false,
            title: "HTC 10 - Black",
            categoryId: "vxxbw52EaQnb6aCDwJAd",
            count: 1,
            total: 0,
            company: "htc",
            id: "jf82ctVzCvYD8QgopccX"
        }]

        expect(mockedData.length).toBe(1);
        expect(mockedData[0].id).toBe(detailProduct.id);

    });

    test('adds product to wishlist when "add to wishlist" button is clicked', () => {

        // Mock the detailProduct with inWishlist set to false
        const detailProduct = {
            id: "jf82ctVzCvYD8QgopccX",
            company: 'Company A',
            img: 'product-image.jpg',
            info: 'Product information',
            price: 100,
            title: 'Product Title',
            inCart: false,
            inWishlist: false,
        };

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: userDetails }}>
                        <Details product={detailProduct} />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );

        // Find and click the "add to wishlist" button
        const addToWishlistButton = screen.getByText('add to wishlist');
        fireEvent.click(addToWishlistButton);

        // Verify that the product is added to the wishlist (e.g., check Redux store)
        const wishlistData = [{
            categoryId: "vxxbw52EaQnb6aCDwJAd",
            company: "htc",
            count: 1,
            id: "jf82ctVzCvYD8QgopccX",
            img: "img/product-3.png",
            inCart: false,
            info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
            price: 8,
            title: "HTC 10 - Black",
            total: 0,
        }]

        expect(wishlistData.length).toBe(1);
        expect(wishlistData[0].id).toBe(detailProduct.id);
        expect(addToWishlistButton).toHaveTextContent('add to wishlist');
    });
});
