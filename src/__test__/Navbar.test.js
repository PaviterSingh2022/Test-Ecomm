// Navbar.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import userContext from "../../src/utils/userContext";
import Navbar from '../../src/components/Navbar';

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


describe('Navbar Component', () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>);
        // Assert that the component renders without crashing
        expect(screen.getByAltText('store')).toBeInTheDocument();
    });

    it('displays the login modal when "Login" is clicked', async () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>);
        userEvent.click(screen.getByText('Hello Sign in'));

        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

        //Now, you can click the "Login" item to trigger the login modal
        const loginButton = screen.getByText('Login');
        userEvent.click(loginButton);
    });

    it('logs out when "Logout" is clicked', async () => {
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: mockUser }}>
                    <Navbar />
                </MockUserProvider>
            </BrowserRouter>);
        userEvent.click(screen.getByText('Hello Test1234@gmail.com'));

        //Now, you can click the "Logout" item
        const logoutButton = await screen.findByText('Logout');

        userEvent.click(logoutButton);
    });

});
