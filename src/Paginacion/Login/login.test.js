// Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';

// Mocking the fetch API for the login process
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ ID_usuario: 1, correoElectronico: 'test@example.com' }),
    ok: true
  })
);

describe('Login Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders login form with email and password fields', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  test('displays alert if email or password is missing', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

fireEvent.click(screen.getByRole('button', { name: /Acceso/i }));

    await waitFor(() => {
      expect(screen.getByText(/Por favor, ingresa todos los campos./i)).toBeInTheDocument();
    });
  });

  test('calls handleLogin and shows success alert on successful login', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Fill out the form and submit
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'password123' },
    });
// src/Paginacion/Login/Login.test.js
fireEvent.click(screen.getByRole('button', { name: /Acceso/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Por favor, ingresa todos los campos./i)).not.toBeInTheDocument();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/users/login'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correoElectronico: 'test@example.com', contraseña: 'password123' }),
        })
      );
    });
  });

  test('displays error alert if login fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ msg: 'Login failed' }),
        ok: false,
      })
    );

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Acceso/i }));

    await waitFor(() => {
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
    });
  });
});
