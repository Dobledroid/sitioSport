import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import Checkout from './Checkout';

// Mock del hook useLocalStorage
jest.mock('react-use', () => ({
  useLocalStorage: jest.fn(),
}));

// Mock del componente StripeCheckoutForm con nombre asignado
jest.mock('./StripeCheckoutForm', () => {
  const MockStripeCheckoutForm = () => <div>Mock StripeCheckoutForm</div>;
  return MockStripeCheckoutForm;
});

// Mock del componente Header con nombre asignado
jest.mock('../../Esquema/Header', () => {
  const MockHeader = () => <header>Mock Header</header>;
  return MockHeader;
});

// Mock del componente Footer con nombre asignado
jest.mock('../../Esquema/Footer', () => {
  const MockFooter = () => <footer>Mock Footer</footer>;
  return MockFooter;
});

describe('Checkout Component', () => {
  const mockUser = { ID_usuario: 1 };
  const mockProductos = [
    { ID_producto: 1, nombre: 'Producto 1', precio: 100 },
    { ID_producto: 2, nombre: 'Producto 2', precio: 200 },
  ];
  const mockDireccion = {
    ID_direccion: 1,
    codigoPostal: '12345',
    direccion: 'Calle Falsa 123',
    nombre: 'Juan Pérez',
    telefono: '555-1234',
  };

  beforeEach(() => {
    useLocalStorage.mockReturnValue([mockUser, jest.fn()]);
    global.fetch = jest.fn((url) => {
      if (url.includes('/carrito-compras/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProductos),
        });
      }
      if (url.includes('/direccion-envio-predeterminada-user/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDireccion),
        });
      }
      return Promise.reject(new Error('Unexpected API call'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (initialEntries) => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('applies discount when valid code is entered', async () => {
    renderWithRouter([
      {
        pathname: '/checkout',
        state: { subtotal: 300, total: 300 },
      },
    ]);

    const input = screen.getByPlaceholderText('Ingrese su código de cupón');
    const button = screen.getByText('APLICAR CUPÓN');

    fireEvent.change(input, { target: { value: 'SPORT100' } });
    fireEvent.click(button);

    expect(await screen.findByText('Descuento aplicado correctamente.')).toBeInTheDocument();
  });

  test('displays error for invalid discount code', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter([
      {
        pathname: '/checkout',
        state: { subtotal: 300, total: 300 },
      },
    ]);

    const input = screen.getByPlaceholderText('Ingrese su código de cupón');
    const button = screen.getByText('APLICAR CUPÓN');

    fireEvent.change(input, { target: { value: 'INVALID' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('El código de descuento ingresado no es válido.');
    });
  });

  test('shows message if no address is available', async () => {
    global.fetch.mockImplementationOnce((url) => {
      if (url.includes('/direccion-envio-predeterminada-user/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(null),
        });
      }
      return Promise.reject(new Error('Unexpected API call'));
    });

    renderWithRouter([
      {
        pathname: '/checkout',
        state: { subtotal: 300, total: 300 },
      },
    ]);

    await waitFor(() => {
      expect(screen.getByText('No existe ninguna dirección, agregue una')).toBeInTheDocument();
    });
  });
});
