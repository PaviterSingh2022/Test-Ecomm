import React from 'react';
import { render } from '@testing-library/react';
import Title from '../../src/components/Title';

test('renders Title component with name and title', () => {
    const testName = 'our';
    const testTitle = 'products';

    const { container } = render(<Title name={testName} title={testTitle} />);

    // Custom function to match the text using a regular expression with flexibility for whitespace
    const isTextInElement = (element) => {
        const textContent = element.textContent || element.innerText;
        const formattedText = textContent.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space
        const regex = new RegExp(`${testName}\\s*${testTitle}`, 'i'); // Allow for optional whitespace between words
        return regex.test(formattedText);
    };

    // Use querySelectorAll with the custom matching function
    const matchingElements = container.querySelectorAll('*'); // Select all elements
    const foundElement = Array.from(matchingElements).find((element) => isTextInElement(element));

    // Assert that at least one matching element is found
    expect(foundElement).toBeInTheDocument();
});
