import React from 'react';
import { render } from '@testing-library/react';
import OrderSummary from '../../src/components/Cart/OrderSummary';

describe('OrderSummary Component', () => {

    test('renders OrderSummary component without crashing', () => {
        const cartItems = [
            {
                categoryId: "vxxbw52EaQnb6aCDwJAd",
                company: "apple",
                count: 1,
                id: "WQJKVI4oJSYmJIgfGKQM",
                img: "img/product-6.png",
                inCart: false,
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                price: 17,
                title: "Vintage Iphone",
                total: 0
            },
            {
                categoryId: "swoxKYVH3rbzPfeC1lhq",
                company: "Madame",
                count: 1,
                id: "aQzTq2UIaRpX6gVbw7hB",
                img: "img/product-11.jpg",
                inCart: false,
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                price: 12,
                title: "Madame Jeans",
                total: 0
            }
        ];
        const subtotal = 50.00;
        const shippingCost = 10.00;
        const totalAmount = 60.00;

        const { getByTestId, getByText } = render(
            <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                totalAmount={totalAmount}
            />
        );

        // Check if the component renders successfully
        const orderSummaryElement = getByTestId('order-summary');
        expect(orderSummaryElement).toBeInTheDocument();

    });

    test('renders OrderSummary component with correct values', () => {
        const cartItems = [
            {
                categoryId: "vxxbw52EaQnb6aCDwJAd",
                company: "apple",
                count: 1,
                id: "WQJKVI4oJSYmJIgfGKQM",
                img: "img/product-6.png",
                inCart: false,
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                price: 17,
                title: "Vintage Iphone",
                total: 0
            },
            {
                categoryId: "swoxKYVH3rbzPfeC1lhq",
                company: "Madame",
                count: 1,
                id: "aQzTq2UIaRpX6gVbw7hB",
                img: "img/product-11.jpg",
                inCart: false,
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                price: 12,
                title: "Madame Jeans",
                total: 0
            }
        ];
        const subtotal = 50.00;
        const shippingCost = 10.00;
        const totalAmount = 60.00;

        const { getByTestId, getByText } = render(
            <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                totalAmount={totalAmount}
            />
        );

        // Check if the component renders successfully
        const orderSummaryElement = getByTestId('order-summary');
        expect(orderSummaryElement).toBeInTheDocument();

        // Check if the subtotal, shipping, and total amount are displayed correctly
        expect(getByText(`Subtotal: $${subtotal.toFixed(2)}`)).toBeInTheDocument();
        expect(getByText(`Shipping: $${shippingCost.toFixed(2)}`)).toBeInTheDocument();
        expect(getByText(`Total Amount: $${totalAmount.toFixed(2)}`)).toBeInTheDocument();
    });
});
