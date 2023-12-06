import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyOrders from '../../src/components/Orders/EmptyOrders';

test('renders EmptyOrders component', () => {
    render(<EmptyOrders />);
    const h1Element = screen.getByText(/There is no orders/i);
    expect(h1Element).toBeInTheDocument();
});

test('has the correct class name for container', () => {
    render(<EmptyOrders />);
    const containerElement = screen.getByTestId('empty-orders-container');
    expect(containerElement).toHaveClass('container');
});

test('has the correct class name for row', () => {
    render(<EmptyOrders />);
    const rowElement = screen.getByTestId('empty-orders-row');
    expect(rowElement).toHaveClass('row');
});

test('has the correct class name for column', () => {
    render(<EmptyOrders />);
    const colElement = screen.getByTestId('empty-orders-column');
    expect(colElement).toHaveClass('col-10');
});

test('has the correct class name for text center', () => {
    render(<EmptyOrders />);
    const textCenterElement = screen.getByTestId('empty-orders-column');
    expect(textCenterElement).toHaveClass('text-center');
});

test('has the correct class name for text title', () => {
    render(<EmptyOrders />);
    const textTitleElement = screen.getByTestId('empty-orders-column');
    expect(textTitleElement).toHaveClass('text-title');
});
