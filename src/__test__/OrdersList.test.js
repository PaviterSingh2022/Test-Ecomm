import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Orders from '../../src/components/Orders/OrdersList';

const mockOrders = [
    {
        id: 1,
        orderId: '123456',
        orderDate: new Date().toString(),
        total: 50,
        image: 'path/to/image.jpg',
        name: 'Test Product',
        productId: '789',
    },
    {
        id: 2,
        orderId: '789101',
        orderDate: new Date().toString(),
        total: 20,
        image: 'path/to/image1.jpg',
        name: 'Testify Product',
        productId: '567',
    },

];

describe('Orders component', () => {
    it('renders the orders list correctly', () => {
        render(<Router><Orders orders={mockOrders} /> </Router>);

        const ordersList = screen.getByTestId('orders-list');
        expect(ordersList).toBeInTheDocument();

        // Ensure each order item is rendered
        mockOrders.forEach(order => {
            // Find the paragraph element directly containing the order ID
            const orderIdParagraph = screen.getByText(`${order.orderId}`);

            // Assert that the order ID is present and has the correct value
            expect(orderIdParagraph).toBeInTheDocument();
        });

    });

    it('passes correct props to OrdersItem component', () => {
        render(<Router><Orders orders={mockOrders} /> </Router>);

        mockOrders.forEach(order => {
            const ordersItem = screen.getByText(`${order.orderId}`);
            expect(ordersItem).toBeInTheDocument();
            expect(ordersItem).toHaveTextContent(order.orderId);
        });
    });

})


