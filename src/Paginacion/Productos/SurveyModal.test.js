import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SurveyModal from './SurveyModal';

describe('SurveyModal Component', () => {
  const mockHandleClose = jest.fn();
  const mockIDUsuario = 'user123';
  const mockIDPedido = 'order456';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mockea console.log
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restaura los mocks después de cada prueba
  });

  it('renders correctly with props', () => {
    render(
      <SurveyModal
        show={true}
        handleClose={mockHandleClose}
        ID_usuario={mockIDUsuario}
        ID_pedido={mockIDPedido}
      />
    );

    // Verifica que el título y el cuerpo del modal se renderizan
    expect(screen.getByText('Encuesta')).toBeInTheDocument();
    expect(
      screen.getByText('¡Muchas gracias por haber realizado tu compra!')
    ).toBeInTheDocument();
    expect(screen.getByText('¿Cómo fue tu experiencia?')).toBeInTheDocument();

    // Verifica que los emojis están presentes
    expect(screen.getByLabelText('bad')).toBeInTheDocument();
    expect(screen.getByLabelText('neutral')).toBeInTheDocument();
    expect(screen.getByLabelText('good')).toBeInTheDocument();

    // Verifica que el botón para cerrar el modal se renderiza
    expect(screen.getByRole('button', { name: /Cerrar/i })).toBeInTheDocument();
  });

  it('calls handleClose when the modal is closed', () => {
    render(
      <SurveyModal
        show={true}
        handleClose={mockHandleClose}
        ID_usuario={mockIDUsuario}
        ID_pedido={mockIDPedido}
      />
    );

    const closeButton = screen.getByRole('button', { name: /Cerrar/i });

    // Simula el clic en el botón para cerrar
    fireEvent.click(closeButton);

    // Verifica que la función `handleClose` fue llamada
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('handles emoji selection correctly', () => {
    render(
      <SurveyModal
        show={true}
        handleClose={mockHandleClose}
        ID_usuario={mockIDUsuario}
        ID_pedido={mockIDPedido}
      />
    );

    // Encuentra y selecciona un emoji
    const goodEmoji = screen.getByLabelText('good');
    fireEvent.click(goodEmoji);

    // Verifica que el emoji fue seleccionado (mock de console.log)
    expect(console.log).toHaveBeenCalledWith('Emoji seleccionado:', 'Me encantó');
    expect(console.log).toHaveBeenCalledWith('ID_usuario:', mockIDUsuario);
    expect(console.log).toHaveBeenCalledWith('ID_pedido:', mockIDPedido);
  });

  it('redirects to /tienda when "Cerrar" is clicked', () => {
    delete window.location;
    window.location = { href: '' }; // Mock de `window.location`

    render(
      <SurveyModal
        show={true}
        handleClose={mockHandleClose}
        ID_usuario={mockIDUsuario}
        ID_pedido={mockIDPedido}
      />
    );

    const closeButton = screen.getByRole('button', { name: /Cerrar/i });
    fireEvent.click(closeButton);

    // Verifica que la URL cambió a `/tienda`
    expect(window.location.href).toBe('/tienda');
  });
});
