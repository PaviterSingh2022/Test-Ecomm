import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from '../../src/components/LoginModal';

describe('LoginModal Component', () => {
    it('renders LoginModal with Login component', () => {
        const onHideMock = jest.fn();

        render(<LoginModal name="Login" show onHide={onHideMock} />);

        // Assert that the Login component is rendered
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.queryAllByText('Login')); // Use queryByText

        // Trigger the close button click event
        fireEvent.click(screen.getByText('Close'));

        // Assert that the onHide function is called
        expect(onHideMock).toHaveBeenCalledTimes(1);
    });

    it('renders LoginModal with Signup component', () => {
        const onHideMock = jest.fn();

        render(<LoginModal name="Signup" show onHide={onHideMock} />);

        // Assert that the Signup component is rendered
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.queryAllByText('Signup')); // Use queryByText

        // Trigger the close button click event
        fireEvent.click(screen.getByText('Close'));

        // Assert that the onHide function is called
        expect(onHideMock).toHaveBeenCalledTimes(1);
    });
});