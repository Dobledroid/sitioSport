import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Productos from './Productos';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import 'fake-indexeddb/auto';

// Habilita el mock de fetch
fetchMock.enableMocks();

// Mock de los módulos y componentes que dependen de servicios externos
jest.mock('../../Esquema/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../../Esquema/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../../api.js', () => ({
  baseURL: 'http://fakeapi.com',
}));
jest.mock('../utilidades/Spinner', () => () => <div data-testid="spinner">Loading...</div>);

describe('Productos Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks(); // Resetea mocks de fetch antes de cada prueba
  });

  test('renders header, footer, and product list', async () => {
    // Mock de la respuesta de fetch
    fetchMock.mockResponseOnce(JSON.stringify([{ ID_producto: 1, nombre: "Producto de prueba", precioFinal: 100 }]));

    // Renderiza el componente dentro de un MemoryRouter
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Verifica que el header y el footer se hayan renderizado
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    // Verifica que el spinner se muestra mientras carga
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Verifica que los productos se cargan después de que el spinner desaparece
    await waitFor(() => {
      const productItems = screen.getAllByText(/Producto de prueba/i);
      expect(productItems.length).toBeGreaterThan(0);
    });
  });

  test('displays filtered products after search', async () => {
    // Mock de la respuesta de fetch
    fetchMock.mockResponseOnce(JSON.stringify([{ ID_producto: 2, nombre: "Producto de prueba", precioFinal: 50 }]));

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Simula que el usuario escribe en la barra de búsqueda
    const searchBar = screen.getByPlaceholderText(/Buscar.../i);
    fireEvent.change(searchBar, { target: { value: 'Producto de prueba' } });

    // Espera a que el componente filtre y muestre los productos
    await waitFor(() => {
      const filteredProducts = screen.getAllByText(/Producto de prueba/i);
      expect(filteredProducts.length).toBeGreaterThan(0);
    });
  });

  test('filters products by category', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ ID_producto: 3, nombre: "Producto Categoría", precioFinal: 75 }]));

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Simula que el usuario selecciona una categoría de la barra lateral
    const categoryLink = screen.getByText(/Categorías/i);
    fireEvent.click(categoryLink);

    // Espera a que los productos se actualicen según el filtro de categoría
    await waitFor(() => {
      const filteredProducts = screen.getAllByText(/Producto Categoría/i);
      expect(filteredProducts.length).toBeGreaterThan(0);
    });
  });

  test('sorts products by price', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ ID_producto: 4, nombre: "Producto Menor Precio", precioFinal: 25 }]));

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Cambia la ordenación a "Menor precio"
    const sortSelect = screen.getByText(/Ordenar por/i);
    fireEvent.change(sortSelect, { target: { value: '1' } });

    await waitFor(() => {
      const sortedProducts = screen.getAllByText(/Producto Menor Precio/i);
      expect(sortedProducts.length).toBeGreaterThan(0);
    });
  });

  test('displays favorite icon for each product', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ ID_producto: 5, nombre: "Producto Favorito", precioFinal: 100 }]));

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    // Espera a que los productos se carguen y verifica que cada uno tiene el icono de favorito
    await waitFor(() => {
      const favoriteIcons = screen.getAllByRole('link', { name: /fa-heart/i });
      expect(favoriteIcons.length).toBeGreaterThan(0);
    });
  });
});
