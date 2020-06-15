import React from 'react';
import { render } from '@testing-library/react';
import EventTranspoTracker from './EventTranspoTracker';

test('renders learn react link', () => {
  const { getByText } = render(<EventTranspoTracker />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
