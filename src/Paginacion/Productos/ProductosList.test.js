import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductosList from './ProductosList';

describe('ProductosList Component', () => {
  it('renders the component with the correct structure', () => {
    render(<ProductosList />);

    // Verifica que el título principal se muestra
    expect(screen.getByText(/Showing 1-24 of 205 Products/i)).toBeInTheDocument();

    // Verifica que el dropdown de "Sort by" esté presente
    const sortDropdown = screen.getByLabelText('Bulk actions');
    expect(sortDropdown).toBeInTheDocument();

    // Verifica que los botones de paginación están presentes
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('renders product images correctly using querySelectorAll', () => {
    render(<ProductosList />);

    // Encuentra las imágenes usando un selector basado en clases
    const productImages = document.querySelectorAll('.img-fluid.object-fit-cover');
    expect(productImages.length).toBeGreaterThan(0);

    // Verifica que una imagen específica tiene la fuente esperada
    expect(productImages[0].getAttribute('src')).toBe('/products/2.jpg');
  });

  it('renders product details correctly', () => {
    render(<ProductosList />);

    // Verifica los detalles de los productos
    const productNames = screen.getAllByText(/Computer & Accessories/i);
    expect(productNames.length).toBeGreaterThan(0);

    const productPrice = screen.getByText('$1199.5');
    expect(productPrice).toBeInTheDocument();
  });

  it('handles pagination buttons', () => {
    render(<ProductosList />);

    // Verifica que el botón "Next" existe
    const nextButton = screen.getByTitle('Next');
    expect(nextButton).toBeInTheDocument();

    // Verifica que el botón "Prev" está deshabilitado
    const prevButton = screen.getByTitle('Prev');
    expect(prevButton).toBeDisabled();
  });

});
