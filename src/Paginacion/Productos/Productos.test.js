/* eslint-disable */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Productos from './Productos';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import 'fake-indexeddb/auto';

fetchMock.enableMocks();

jest.mock('../../Esquema/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../../Esquema/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../../api.js', () => ({
  baseURL: 'http://fakeapi.com',
}));

describe('Productos Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders header, footer, and product list', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ ID_producto: 1, nombre: 'Producto de prueba', precioFinal: 100 }])
    );

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
      const productItems = screen.getAllByText(/Producto de prueba/i);
      expect(productItems.length).toBeGreaterThan(0);
    });
  });

  test('displays filtered products after search', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ ID_producto: 2, nombre: 'Producto de prueba', precioFinal: 50 }])
    );

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const searchBar = screen.getByPlaceholderText(/Buscar.../i);
    fireEvent.change(searchBar, { target: { value: 'Producto de prueba' } });

    await waitFor(() => {
      const filteredProducts = screen.getAllByText(/Producto de prueba/i);
      expect(filteredProducts.length).toBeGreaterThan(0);
    });
  });

  test.skip('filters products by category', async () => {
    fetchMock.mockResponses(
      JSON.stringify([{ ID_categoria: 1, nombre: 'Categorías' }]),
      JSON.stringify([{ ID_producto: 3, nombre: 'Producto Categoría', precioFinal: 75 }])
    );

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const categoryLink = await screen.findByText('Categorías');
    fireEvent.click(categoryLink);

    await waitFor(() => {
      const filteredProducts = screen.getAllByText(/Producto Categoría/i);
      expect(filteredProducts.length).toBeGreaterThan(0);
    });
  });

  test('sorts products by price', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ ID_producto: 4, nombre: 'Producto Menor Precio', precioFinal: 25 }])
    );

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    const sortSelect = await screen.findByLabelText(/ordenar por/i);
    fireEvent.change(sortSelect, { target: { value: '1' } });

    await waitFor(() => {
      const sortedProducts = screen.getAllByText(/Producto Menor Precio/i);
      expect(sortedProducts.length).toBeGreaterThan(0);
    });
  });

  test('displays favorite icon for each product', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ ID_producto: 5, nombre: 'Producto Favorito', precioFinal: 100 }])
    );

    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    await waitFor(() => {
      const favoriteIcons = screen.getAllByRole('link', { name: /Toggle Favorite/i });
      expect(favoriteIcons.length).toBeGreaterThan(0);
    });
  });
});
