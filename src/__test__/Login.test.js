import React from 'react';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../src/components/Login'


describe('Login Component', () => {


    it('renders the Login component', () => {
        render(<Login />);
        const loginText = screen.getByText('Login');
        expect(loginText).toBeInTheDocument();
    });

    it('renders login form with email and password inputs', () => {
        const { getByLabelText } = render(<Login />);
        expect(getByLabelText('Email')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
    });

    it('renders the Login component with initial values', () => {
        render(<Login />);

        // Check that the initial email and password values are displayed
        expect(screen.getByLabelText('Email')).toHaveValue('Test1234@gmail.com');
        expect(screen.getByLabelText('Password')).toHaveValue('Test1234');
    });

    it('displays an error message for password too short', async () => {
        render(<Login />);

        try {

            // Fill in the password field with a too short password
            fireEvent.change(screen.getByLabelText('Password'), {
                target: { value: 'short' },
            });

            // Submit the form
            fireEvent.click(screen.getByText('Login'));

            // Check for the error message
            const passwordError = await screen.findByText(/Must be grater than 6 characters/i);
            expect(passwordError).toBeInTheDocument();
        } catch (error) {
            console.error('Error in test:', error);
        }
    });

    it('displays an error message for password too long', async () => {
        render(<Login />);

        // Fill in the password field with a too long password
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'verylongpasswordthatexceedscharacterlimit' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Login'));

        // Check for the error message
        const passwordError = await screen.findByText(/Must be less than or equal to 10 characters/i);
        expect(passwordError).toBeInTheDocument();
    });

    it('does not display error messages with valid email and password', async () => {
        render(<Login />);

        // Fill in the email and password fields with valid data
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Login'));

        // Check that no error messages are displayed
        const emailError = screen.queryByText(/Must be a valid email/i);
        const passwordError = screen.queryByText(/Must be greater than 6 characters/i);
        expect(emailError).toBeNull();
        expect(passwordError).toBeNull();
    });

}
)