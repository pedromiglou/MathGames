import { render, screen } from '@testing-library/react';
import Menu from './Menu.js';

test('renders learn react link', () => {
  render(<Menu />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
