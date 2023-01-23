import { render, screen } from '@testing-library/react';
import App from './App';

test('Show render text title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Estadistícas del programa de lealtad/i);
  expect(linkElement).toBeInTheDocument();
});
