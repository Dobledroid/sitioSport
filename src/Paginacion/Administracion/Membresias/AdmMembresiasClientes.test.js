import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdmMembresiasClientes from './AdmMembresiasClientes';

// Mock para fetch
global.fetch = jest.fn();

describe('AdmMembresiasClientes', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('debería renderizar encabezados de la tabla', async () => {
    // Mock de la respuesta del fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          ID_membresiaUsuario: 1,
          usuario: 'Juan Pérez',
          correoElectronico: 'juan@example.com',
          telefono: '1234567890',
          nombreMembresia: 'Premium',
          fechaInicio: '2024-01-01',
          fechaVencimiento: '2024-12-31',
        },
      ],
    });

    render(
      <MemoryRouter>
        <AdmMembresiasClientes />
      </MemoryRouter>
    );

    // Verificar encabezados de tabla
    expect(await screen.findByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Correo')).toBeInTheDocument();
    expect(screen.getByText('Telefono')).toBeInTheDocument();
    expect(screen.getByText('Membresía')).toBeInTheDocument();
    expect(screen.getByText('Fecha de inicio')).toBeInTheDocument();
    expect(screen.getByText('Fecha de vencimiento')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
  });

  it('debería renderizar datos de membresías', async () => {
    // Mock de la respuesta del fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          ID_membresiaUsuario: 1,
          usuario: 'Juan Pérez',
          correoElectronico: 'juan@example.com',
          telefono: '1234567890',
          nombreMembresia: 'Premium',
          fechaInicio: '2024-01-01',
          fechaVencimiento: '2024-12-31',
        },
      ],
    });

    render(
      <MemoryRouter>
        <AdmMembresiasClientes />
      </MemoryRouter>
    );

    // Formatear fechas dinámicamente para el test
    const fechaInicioFormateada = new Date('2024-01-01').toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const fechaVencimientoFormateada = new Date('2024-12-31').toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Verificar que los datos se renderizan correctamente
    expect(await screen.findByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('juan@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(fechaInicioFormateada)).toBeInTheDocument();
    expect(screen.getByText(fechaVencimientoFormateada)).toBeInTheDocument();
  });

  it('debería manejar errores en el fetch', async () => {
    // Mock de un error en el fetch
    fetch.mockRejectedValueOnce(new Error('Error al obtener las membresías'));

    render(
      <MemoryRouter>
        <AdmMembresiasClientes />
      </MemoryRouter>
    );

    // Esperar que no haya datos renderizados por el error
    await waitFor(() =>
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument()
    );
  });
});
