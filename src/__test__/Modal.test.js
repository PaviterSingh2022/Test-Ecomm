import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // Add this line
import Modal from '../../src/components/Modal'; // Update the path as needed
import configureStore from 'redux-mock-store';

// Mock your Redux store
const mockStore = configureStore([]);
const initialState = {
    allproducts: {
        modalOpen: true,
        modalProduct: {
            img: 'some-image-url',
            title: 'Test Product',
            price: 10,
        },
    },
};
const store = mockStore(initialState);

test('renders Modal component with correct content', () => {
    render(
        <Provider store={store}>
            <Router> {/* Add this line */}
                <Modal />
            </Router> {/* Add this line */}
        </Provider>
    );

    // Rest of your test...
});

test('triggers closeCartModal when continue shopping button is clicked', () => {
    const closeCartModalMock = jest.fn();

    render(
        <Provider store={store}>
            <Router> {/* Add this line */}
                <Modal closeCartModal={closeCartModalMock} />
            </Router> {/* Add this line */}
        </Provider>
    );

    // Rest of your test...
});

test('triggers closeCartModal when go to cart button is clicked', () => {
    const closeCartModalMock = jest.fn();

    render(
        <Provider store={store}>
            <Router> {/* Add this line */}
                <Modal closeCartModal={closeCartModalMock} />
            </Router> {/* Add this line */}
        </Provider>
    );

    // Rest of your test...
});
