import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import BillingAddressForm from '../../src/components/Cart/BillingAddress';

describe('BillingAddressForm Component', () => {
    it('renders with default values', () => {
        const { getByLabelText, getByDisplayValue } = render(<BillingAddressForm />);
        expect(getByLabelText('First Name')).toBeInTheDocument();
        expect(getByDisplayValue('John')).toBeInTheDocument();
        expect(getByLabelText('Last Name')).toBeInTheDocument();
        expect(getByDisplayValue('Doe')).toBeInTheDocument();
        expect(getByLabelText('Address 1')).toBeInTheDocument();
        expect(getByDisplayValue('11th Street , Palm Olympia')).toBeInTheDocument();
        expect(getByLabelText('Address 2')).toBeInTheDocument();
        expect(getByDisplayValue('Boston Road')).toBeInTheDocument();
        expect(getByLabelText('City')).toBeInTheDocument();
        expect(getByDisplayValue('New Jersey City')).toBeInTheDocument();
        expect(getByLabelText('State')).toBeInTheDocument();
        expect(getByDisplayValue('Newyork')).toBeInTheDocument();
        expect(getByLabelText('Country')).toBeInTheDocument();
        expect(getByDisplayValue('USA')).toBeInTheDocument();
        expect(getByLabelText('ZIP Code')).toBeInTheDocument();
        expect(getByDisplayValue('123456')).toBeInTheDocument();
    });

    it('updates form data on input change', () => {
        const { getByLabelText } = render(<BillingAddressForm />);
        const firstNameInput = getByLabelText('First Name');
        const lastNameInput = getByLabelText('Last Name');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

        expect(firstNameInput.value).toBe('John');
        expect(lastNameInput.value).toBe('Doe');
    });

    it('submits the form with valid data', async () => {
        const { getByText, getByLabelText } = render(<BillingAddressForm />);
        const submitButton = getByText('Submit');
        const firstNameInput = getByLabelText('First Name');
        const lastNameInput = getByLabelText('Last Name');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

        fireEvent.click(submitButton);
    });

});