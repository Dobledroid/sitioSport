import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdmTiposMembresias from './AdmTiposMembresias';

// Mock para fetch y SweetAlert2
global.fetch = jest.fn();
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('AdmTiposMembresias', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('debería renderizar la tabla de tipos de membresías', async () => {
    // Mock de la respuesta del fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          ID_tipoMembresia: 1,
          nombre: 'Básica',
          costo: '100',
          ID_UnicoMembresia: 'BSC123',
        },
      ],
    });

    render(
      <MemoryRouter>
        <AdmTiposMembresias />
      </MemoryRouter>
    );

    // Verificar encabezados de tabla
    expect(await screen.findByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Costo')).toBeInTheDocument();
    expect(screen.getByText('ID único membresía')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();

    // Verificar datos renderizados
    expect(await screen.findByText('Básica')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('BSC123')).toBeInTheDocument();
  });

  it('debería abrir el modal para agregar una nueva membresía', async () => {
    render(
      <MemoryRouter>
        <AdmTiposMembresias />
      </MemoryRouter>
    );

    // Click en "Agregar Nuevo"
    fireEvent.click(screen.getByText('Agregar Nuevo'));

    // Verificar que el modal está abierto
    expect(await screen.findByText('Agregar Nueva Membresía')).toBeInTheDocument();
  });

  it('debería abrir el modal para editar una membresía existente', async () => {
    // Mock de la respuesta del fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          ID_tipoMembresia: 1,
          nombre: 'Básica',
          costo: '100',
          ID_UnicoMembresia: 'BSC123',
        },
      ],
    });

    render(
      <MemoryRouter>
        <AdmTiposMembresias />
      </MemoryRouter>
    );

    // Esperar datos y click en "Editar"
    const editButton = await screen.findByText('Editar');
    fireEvent.click(editButton);

    // Verificar que el modal está abierto con datos
    expect(await screen.findByText('Editar Membresía')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Básica')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('BSC123')).toBeInTheDocument();
  });
});
