import { render, screen } from '@testing-library/react';
import App from './App';

test('App - Renders the Agenda', () => {
  render(<App />);
  const agenda = screen.getByText(/Agenda/i);
  expect(agenda).toBeInTheDocument();
});
