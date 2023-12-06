import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Product from '../../src/components/Product';
import store from '../../src/utils/store'
import { Provider } from 'react-redux';
import userContext from "../../src/utils/userContext";
import { BrowserRouter } from 'react-router-dom';


const sampleProduct = {
    id: 1,
    title: 'Sample Product',
    img: 'sample.jpg',
    price: 10,
    inCart: false,
};

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

describe('Product Component', () => {
    it('renders the product details', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <Product product={sampleProduct} />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );

        const productTitle = screen.getByText(sampleProduct.title);
        const productPrice = screen.getByTestId('product-price')

        expect(productTitle).toBeInTheDocument();
        expect(productPrice).toBeInTheDocument();
    });

    it('checking if Add to Cart button is visible to add items to the cart', () => {
        const addProductIntoCart = jest.fn();
        const openCartModal = jest.fn();
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <Product
                            product={sampleProduct}
                            addProductIntoCart={addProductIntoCart}
                            openCartModal={openCartModal}
                        />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );


        const cartButton = screen.getByTestId('add-to-cart-button');
        fireEvent.click(cartButton);

        const cartIcon = cartButton.querySelector('.fas.fa-cart-plus');
        expect(cartIcon).toBeInTheDocument();

    })

    it('disables the Add to Cart button when inCart is true', () => {
        const productInCart = {
            ...sampleProduct,
            inCart: true,
        };


        render(<BrowserRouter>
            <Provider store={store}>
                <MockUserProvider value={{ user: mockUser }}>
                    <Product product={productInCart} />
                </MockUserProvider>
            </Provider>
        </BrowserRouter>);

        const cartButton = screen.getByTestId('add-to-cart-button');

        expect(cartButton).toBeDisabled();
    });

})