import React, { useState } from 'react';
import PropTypes from 'prop-types';  // Importa PropTypes
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { baseURL } from '../../api.js';
import Swal from 'sweetalert2';
import SurveyModal from './SurveyModal';

const StripeCheckoutForm = ({ amount, currency, productos, userID, currentURL, ID_direccion }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [showSurvey, setShowSurvey] = useState(false); // Estado para el modal de encuesta

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ID_direccion) {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar una dirección de envío antes de proceder al pago.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('[error]', error);
      Swal.fire({ title: 'Error de validación', text: error.message, icon: 'error', confirmButtonText: 'Aceptar' });
    } else {
      try {
        const response = await fetch(`${baseURL}/procesar-pago`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount, currency, ID_usuario: userID, currentURL, ID_direccion }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Pago exitoso:', data);
          
          // Mostrar el modal de encuesta
          setShowSurvey(true);
        } else {
          console.error('Error en el pago:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  const handleCloseSurvey = () => {
    setShowSurvey(false);
    window.location.href = "/tienda";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pagar ${amount} {currency.toUpperCase()}</button>
      </form>
      <SurveyModal show={showSurvey} handleClose={handleCloseSurvey} ID_usuario={userID} ID_pedido={ID_direccion} />
    </>
  );
};

// Validación de los props usando PropTypes
StripeCheckoutForm.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  productos: PropTypes.array.isRequired,
  userID: PropTypes.string.isRequired,
  currentURL: PropTypes.string.isRequired,
  ID_direccion: PropTypes.string.isRequired,
};

export default StripeCheckoutForm;
