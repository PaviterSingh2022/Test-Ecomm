import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutItem from '../../src/components/Cart/CheckoutItem';
import { Provider } from 'react-redux';
import store from '../../src/utils/store'


describe('CheckoutItem Component', () => {
    const mockItem = {
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

    const mockFetchAddToCartData = jest.fn();

    test('renders the Checkout Item component without crashing', () => {
        render(
            <Provider store={store}>
                <CheckoutItem item={mockItem} fetchAddToCartData={mockFetchAddToCartData} />
            </Provider>
        );
    });


    test('renders product details correctly', () => {
        render(<Provider store={store}><CheckoutItem item={mockItem} fetchAddToCartData={mockFetchAddToCartData} /> </Provider>);

        // Check if product details are rendered
        expect(screen.getByAltText('product')).toBeInTheDocument();
        expect(screen.getByText(/product/i)).toBeInTheDocument();
        expect(screen.getByText(/price/i)).toBeInTheDocument();
        expect(screen.getByText(`$ ${mockItem.price * mockItem.count}`)).toBeInTheDocument();
    });


});
