import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('login', () => {
  render(<App />);
  const login = screen.getByText(/Логин/i);
  expect(login).toBeInTheDocument();
});
