import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonContainer } from '../../src/components/Button';

describe('Button Component', () => {
    test('renders button with default styles', () => {
        render(<ButtonContainer />);
        const button = screen.getByRole('button');

        // Add your assertions for default styles here
        expect(button).toHaveStyle(`
      text-transform: capitalize;
      font-size: 1.4rem;
      background: transparent;
      border: ;
      border: 2px outset buttonface;
      border-radius: 0.5rem;
      color: ;
      color: ButtonText;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      margin: 0.2rem 0.5rem 0.2rem 0;
    `);
    });

    test('renders button with cart styles', () => {
        render(<ButtonContainer cart />);
        const button = screen.getByRole('button');

        // Add your assertions for cart styles here
        expect(button).toHaveStyle(`
      text-transform: capitalize;
      font-size: 1.4rem;
      background: transparent;
      border: ;
      border: 2px outset buttonface;
      border-radius: 0.5rem;
      color: ;
      color: ButtonText;
      padding: 0.2rem 0.5rem;
      cursor: pointer;
      margin: 0.2rem 0.5rem 0.2rem 0;
    `);
    });

    // Add more test cases as needed

    test('handles click event', () => {
        const handleClick = jest.fn();
        render(<ButtonContainer onClick={handleClick} />);
        const button = screen.getByRole('button');

        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalled();
    });
});
