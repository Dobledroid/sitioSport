import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Recuperacion from './Recuperacion';
import * as api from '../../api';

// Mock del módulo `api`
jest.mock('../../api', () => ({
  fetchData: jest.fn(),
}));

// Mock de componentes con nombres asignados
jest.mock('../../Esquema/Header', () => {
  const MockHeader = () => <div>Header Mock</div>;
  return MockHeader;
});

jest.mock('../../Esquema/Footer', () => {
  const MockFooter = () => <div>Footer Mock</div>;
  return MockFooter;
});

// Mock del componente `Alert` con validación de props y nombre asignado
jest.mock('../Validaciones/Alerts/Alert', () => {
  const PropTypes = require('prop-types'); // Mover PropTypes dentro del mock

  const MockAlert = ({ type, message, onClose }) => (
    <div role="alert" data-type={type}>
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );

  MockAlert.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  return MockAlert;
});

// Mock de `useNavigate`
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Recuperacion Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all elements', () => {
    render(
      <Router>
        <Recuperacion />
      </Router>
    );

    expect(screen.getByText('Recuperar Contraseña')).toBeInTheDocument();
    expect(screen.getByText('Ingrese su correo electrónico para continuar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese tu correo electrónico')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Acceso/i })).toBeInTheDocument();
    expect(screen.getByText('¿Ya tienes una cuenta?')).toBeInTheDocument();
  });

  it('handles successful API response and navigates to /validacion', async () => {
    const mockUserData = { ID_usuario: 'user123' };
    api.fetchData.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUserData),
    });

    render(
      <Router>
        <Recuperacion />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Ingrese tu correo electrónico'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Acceso/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/validacion', { state: mockUserData });
    });
  });

  it('displays an error alert for invalid email', async () => {
    api.fetchData.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValue({ msg: 'Usuario no encontrado' }),
    });

    render(
      <Router>
        <Recuperacion />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Ingrese tu correo electrónico'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Acceso/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Usuario no encontrado');
  });

  it('displays a server error alert', async () => {
    api.fetchData.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    });

    render(
      <Router>
        <Recuperacion />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Ingrese tu correo electrónico'), {
      target: { value: 'error@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Acceso/i }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(
      'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.'
    );
  });
});
