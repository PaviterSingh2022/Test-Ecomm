import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Signup from '../../src/components/Signup';
import { toast } from 'react-toastify';


// Mocking the Firebase functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

// Mock the toast.success function
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));


describe('Signup Component', () => {
  test('renders the component', () => {
    render(<Signup />);
    const emailInput = screen.getByPlaceholderText('jane@formik.com');
    const passwordInput = screen.getByPlaceholderText('******');
    const signupButton = screen.getByText('Signup');
    const loginButton = screen.getByText('Login');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(<Signup />);
    const emailInput = screen.getByPlaceholderText('jane@formik.com');
    const passwordInput = screen.getByPlaceholderText('******');
    const signupButton = screen.getByText('Signup');

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(signupButton);

    await act(() => {
      fireEvent.click(signupButton);
      waitFor(() => expect(toast.success).toHaveBeenCalledWith('Signup successfully'))
    });
  });

  test('displays an error message for an already used email', async () => {
    // Mock Firebase's createUserWithEmailAndPassword to simulate an error
    const createUserWithEmailAndPasswordMock = jest.fn(() =>
      Promise.reject({ code: 'auth/email-already-in-use' })
    );

    require('firebase/auth').createUserWithEmailAndPassword = createUserWithEmailAndPasswordMock;

    render(<Signup />);
    const emailInput = screen.getByPlaceholderText('jane@formik.com');
    const passwordInput = screen.getByPlaceholderText('******');
    const signupButton = screen.getByText('Signup');

    // Fill in the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(signupButton);

    // Wait for error message
    await act(() => {
      fireEvent.click(signupButton);
      waitFor(() => expect(toast.success).toHaveBeenCalledWith('auth/email-already-in-use'))
    });
  });
});
