import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdmProductos from './AdmProductos';

// Mock para fetch, SweetAlert2, y useNavigate
global.fetch = jest.fn();
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('AdmProductos', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  it('debería renderizar la tabla de productos', async () => {
    // Mock de la respuesta del fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          ID_producto: 1,
          nombre: 'Producto 1',
          precioFinal: '100',
          Marca: 'Marca 1',
          Categoria: 'Categoría 1',
          Subcategoria: 'Subcategoría 1',
          imagenUrl: 'https://example.com/image.jpg',
        },
      ],
    });

    render(
      <MemoryRouter>
        <AdmProductos />
      </MemoryRouter>
    );

    // Verificar encabezados de tabla
    expect(await screen.findByText('Imagen')).toBeInTheDocument();
    expect(screen.getByText('Producto')).toBeInTheDocument();
    expect(screen.getByText('Precio')).toBeInTheDocument();
    expect(screen.getByText('Marca')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Subcategoria')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();

    // Verificar datos renderizados
    expect(await screen.findByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Marca 1')).toBeInTheDocument();
    expect(screen.getByText('Categoría 1')).toBeInTheDocument();
    expect(screen.getByText('Subcategoría 1')).toBeInTheDocument();
  });

  it('debería navegar a la página de agregar un nuevo producto', async () => {
    render(
      <MemoryRouter>
        <AdmProductos />
      </MemoryRouter>
    );

    // Click en "Agregar Nuevo"
    const addButton = screen.getByText('Agregar Nuevo');
    fireEvent.click(addButton);

    // Verificar navegación
    expect(mockNavigate).toHaveBeenCalledWith('/AgregarProducto');
  });

  it('debería navegar a la página de editar un producto', async () => {
    // Mock de la respuesta del fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          ID_producto: 1,
          nombre: 'Producto 1',
          precioFinal: '100',
          Marca: 'Marca 1',
          Categoria: 'Categoría 1',
          Subcategoria: 'Subcategoría 1',
          imagenUrl: 'https://example.com/image.jpg',
        },
      ],
    });

    render(
      <MemoryRouter>
        <AdmProductos />
      </MemoryRouter>
    );

    // Click en "Editar"
    const editButton = await screen.findByText('Editar');
    fireEvent.click(editButton);

    // Verificar navegación
    expect(mockNavigate).toHaveBeenCalledWith('/EditarProducto/1');
  });
});
