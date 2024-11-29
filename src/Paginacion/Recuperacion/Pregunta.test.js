import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Pregunta from './Pregunta';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = require('react-router-dom').useNavigate;

describe('Pregunta Component', () => {
  beforeEach(() => {
    // Mock del usuario almacenado en localStorage
    localStorage.setItem('user', JSON.stringify({ ID_usuario: 'user123' }));
    mockNavigate.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders correctly with all elements', () => {
    render(
      <Router>
        <Pregunta />
      </Router>
    );

    expect(screen.getByText('Recuperación de contraseña por pregunta secreta')).toBeInTheDocument();
    expect(screen.getByLabelText('Seleccione una pregunta secreta')).toBeInTheDocument();
    expect(screen.getByLabelText('Respuesta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeInTheDocument();
  });

//   it('handles form submission correctly', async () => {
//     // Mock para simular una respuesta exitosa de la API
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ message: 'Success' }),
//       })
//     );

//     render(
//       <Router>
//         <Pregunta />
//       </Router>
//     );

//     fireEvent.change(screen.getByLabelText('Seleccione una pregunta secreta'), {
//       target: { value: '¿Cuál es el nombre de tu mascota?' },
//     });

//     fireEvent.change(screen.getByLabelText('Respuesta'), {
//       target: { value: 'Firulais' },
//     });

//     fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

//     await waitFor(() => {
//       expect(mockNavigate).toHaveBeenCalledTimes(1);
//     });

//     expect(mockNavigate).toHaveBeenCalledWith('/resetPassword');
//   });

  it('displays error message on API failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Error: Invalid answer' }),
      })
    );

    render(
      <Router>
        <Pregunta />
      </Router>
    );

    fireEvent.change(screen.getByLabelText('Seleccione una pregunta secreta'), {
      target: { value: '¿Cuál es el nombre de tu mascota?' },
    });

    fireEvent.change(screen.getByLabelText('Respuesta'), {
      target: { value: 'Incorrect' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

    const errorMessage = await screen.findByText((content, element) =>
      element.tagName.toLowerCase() === 'p' && content.includes('Error: Invalid answer')
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
