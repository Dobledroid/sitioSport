/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Form } from 'react-bootstrap';
// import ListGroup from 'react-bootstrap/ListGroup';
import { useLocalStorage } from 'react-use';
import Header from "../../Esquema/Header";
import Footer from "../../Esquema/Footer";
// import { useLocation, Link, useNavigate } from 'react-router-dom';

import { useLocation, Link } from 'react-router-dom';
import { baseURL } from '../../api.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';
import './Checkout.css';

const stripePromise = loadStripe('pk_test_51PdbM8Hh07ihkU0MkAP9xASNG4k5d4iqbTroQL4D7q4nmrzZyMqb1R7vUYVGdBEc2MCw8PNGM6JscC7oJRiILvDU00g7ZpMGFR');

const Checkout = () => {
  // const [user, setUser] = useLocalStorage('user');
  const [user] = useLocalStorage('user');
  const [productos, setProductos] = useState([]);
  const [direccion, setDireccion] = useState(null);
  const location = useLocation();
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);

  const [codigoDescuento, setCodigoDescuento] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(false);

  // Estado comentado para Mercado Pago y PayPal
  // const [mercadoPagoSelected, setMercadoPagoSelected] = useState(false);
  // const [paypalSelected, setPaypalSelected] = useState(false);

  const { subtotal, total } = location.state;

  const handleCheckboxChange = (event) => {
    const direccionId = parseInt(event.target.value);
    setDireccionSeleccionada(direccionId);
  };

  const handleCardClick = (direccionId) => {
    setDireccionSeleccionada(direccionId);
  };

  useEffect(() => {
    const fetchProductosPedidos = async () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        try {
          const response = await fetch(`${baseURL}/carrito-compras/${user.ID_usuario}`);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              setProductos(data);
            } else {
              console.error("Los datos de productos no son un array.");
            }
          } else {
            console.error("Error al cargar los productos del carrito");
          }
        } catch (error) {
          console.error("Error de red:", error);
        }
      }
    };

    const fetchDirecciones = async () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (loggedIn) {
        try {
          const response = await fetch(`${baseURL}/direccion-envio-predeterminada-user/${user.ID_usuario}`);
          if (response.ok) {
            const data = await response.json();
            setDireccion(data);
          } else {
            console.error("Error al cargar las direcciones guardadas");
          }
        } catch (error) {
          console.error("Error de red:", error);
        }
      }
    };

    fetchDirecciones();
    fetchProductosPedidos();
  }, [user.ID_usuario]);

  const handleInputChange = (event) => {
    setCodigoDescuento(event.target.value);
  };

  const handleDescuentoSubmit = (event) => {
    event.preventDefault();
    if (codigoDescuento === 'SPORT100') {
      setDescuentoAplicado(true);
    } else {
      alert('El código de descuento ingresado no es válido.');
    }
  };

  // Función de realización de pedido, ahora sin uso directo
  /*
  const handleRealizarPedido = async () => {
    if (!direccionSeleccionada) {
      alert('Debe seleccionar una dirección de envío');
      return;
    }

    // Lógica para realizar el pedido con Stripe como único método de pago
  };
  */

  return (
    <>
      <Header />
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <h4>Detalles de facturación</h4>
            <div className="row">
              <div className="col-lg-8 col-md-6">
                <div className="row">
                  <div className="checkout__order">
                    <h4>Mis direcciones</h4>
                    <div>
                      {direccion ? (
                        <>
                          <div key={direccion.ID_direccion} onClick={() => handleCardClick(direccion.ID_direccion)}>
                            <Card className="my-2 hover-card">
                              <Card.Body className="d-flex">
                                <Form.Check
                                  type="radio"
                                  id={`direccion-${direccion.ID_direccion}`}
                                  name="direccion"
                                  value={direccion.ID_direccion}
                                  checked={direccionSeleccionada === direccion.ID_direccion}
                                  onChange={handleCheckboxChange}
                                  className="align-self-start"
                                />
                                <div className="ms-4">
                                  <Card.Title>C.P. {direccion.codigoPostal}</Card.Title>
                                  <Card.Text className="m-0">{direccion.direccion}</Card.Text>
                                  <Card.Text>{direccion.nombre} - {direccion.telefono}</Card.Text>
                                </div>
                              </Card.Body>
                              <Card.Footer className="text-muted" style={{ backgroundColor: 'transparent' }}>
                                <Link
                                  to={`/seleccionar-direccion-envio`}
                                  state={{
                                    subtotal: subtotal,
                                    descuentoAplicado: descuentoAplicado,
                                    total: total,
                                    ID_usuario: user.ID_usuario
                                  }}
                                  className="edit-link"
                                >
                                  Editar o elegir otro domicilio
                                </Link>
                              </Card.Footer>
                            </Card>
                          </div>
                        </>
                      ) : (
                        <ul>
                          <li> No existe ninguna dirección, agregue una
                            <Link to={"/agregar-direccion-envio"}> aquí</Link>
                          </li>
                        </ul>
                      )}
                    </div>
                    <div className="col-lg-6">
                      <div className="shoping__continue">
                        <div className="shoping__discount">
                          <h5>Códigos de descuento</h5>
                          <form onSubmit={handleDescuentoSubmit}>
                            <input type="text" placeholder="Ingrese su código de cupón" value={codigoDescuento} onChange={handleInputChange} className="text-dark" />
                            <button type="submit" className="site-btn">APLICAR CUPÓN</button>
                          </form>
                          {descuentoAplicado && <p>Descuento aplicado correctamente.</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="checkout__order">
                  <h4>Su pedido</h4>
                  <div className="checkout__order__products">Productos <span>Total</span></div>
                  <ul>
                    {productos.map((producto) => (
                      <li key={producto.ID_producto}>
                        {producto.nombre} <span>${producto.precio}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="checkout__order__total">Subtotal <span>${subtotal}</span></div>
                  <div className="checkout__order__total">Total <span>${total}</span></div>
                </div>
                <div className="payment-methods">
                  <Elements stripe={stripePromise}>
                    <StripeCheckoutForm
                      amount={total}
                      currency="mxn"
                      productos={productos}
                      userID={user.ID_usuario} // Pasa el userID
                      currentURL={window.location.origin} // Pasa el currentURL
                      ID_direccion={direccionSeleccionada} // Pasa el ID_direccion
                    />
                  </Elements>
                </div>
                {/* Botón "REALIZAR PEDIDO" ahora removido, comentado para referencia */}
                {/* 
                <button type="button" className="site-btn" onClick={handleRealizarPedido}>REALIZAR PEDIDO</button>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;