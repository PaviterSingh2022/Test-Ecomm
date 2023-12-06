import React from 'react';
import { render } from '@testing-library/react';
import Default from '../../src/components/Default';

describe('Default Component', () => {
    test('renders error message and 404', () => {
        const { getByText } = render(<Default location={{ pathname: '/not-found' }} />);

        expect(getByText('error')).toBeInTheDocument();
        expect(getByText('404')).toBeInTheDocument();
        expect(getByText('page not found')).toBeInTheDocument();
    });

    test('renders the correct path in the error message', () => {
        const { getByText } = render(<Default location={{ pathname: '/some-path' }} />);

        expect(getByText(/the requested URL/)).toBeInTheDocument();
        expect(getByText(/\/some-path/)).toBeInTheDocument();
    });
});
