import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { baseURL } from '../../api.js';

const StripeCheckoutForm = ({ amount, currency, productos }) => {
    const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
  
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
  
      try {
        const response = await fetch(`${baseURL}/procesar-pago`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            amount: amount,
            currency: currency, // Pasar la moneda al backend
            productos: productos, // Enviar los productos junto con el pago
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Pago exitoso:', data);
        } else {
          console.error('Error en el pago:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };
   
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pagar ${amount} {currency.toUpperCase()}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
