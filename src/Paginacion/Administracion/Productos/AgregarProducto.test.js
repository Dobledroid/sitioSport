import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AgregarProducto from './AgregarProducto';

global.fetch = jest.fn();

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../../api', () => ({
  baseURL: 'http://mocked-api.com',
}));

describe('AgregarProducto', () => {
  beforeEach(() => {
    fetch.mockClear();
  });



  it('debería mostrar subcategorías y marcas al seleccionar una categoría', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ ID_categoria: 1, nombre: 'Categoría 1' }],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ ID_subcategoria: 1, nombre: 'Subcategoría 1' }],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ ID_marca: 1, nombre: 'Marca 1' }],
      });

    render(
      <MemoryRouter>
        <AgregarProducto />
      </MemoryRouter>
    );

    fireEvent.change(await screen.findByLabelText('Selecciona una categoría:'), { target: { value: '1' } });

    expect(await screen.findByLabelText('Selecciona una subcategoría:')).toBeInTheDocument();
    expect(await screen.findByLabelText('Selecciona una marca:')).toBeInTheDocument();
  });

  it('debería calcular el precio final correctamente', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ ID_categoria: 1, nombre: 'Categoría 1' }],
    });

    render(
      <MemoryRouter>
        <AgregarProducto />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Precio base:'), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText('Descuento en porcentaje:'), { target: { value: '20' } });

    fireEvent.click(screen.getByText('Calcular Precio Final'));

    expect(screen.getByLabelText('Precio final:').value).toBe('160.00');
  });

  it('debería mostrar errores si faltan campos obligatorios', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ ID_categoria: 1, nombre: 'Categoría 1' }],
    });

    render(
      <MemoryRouter>
        <AgregarProducto />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Agregar producto'));

    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('La descripción es obligatoria')).toBeInTheDocument();
      expect(screen.getByText('La categoría es obligatoria')).toBeInTheDocument();
    });
  });

});
