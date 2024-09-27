import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <PayPalScriptProvider
        options={{
          "client-id": "AcKd5cKO4KCOnvqiVsrCkdGsd0peKjVEi9GiXYM_wAvqfc_k9_FXeyJHRidSNPHs6ltye1N317mPYwYs"
        }}
      > */}
        <App />
      {/* </PayPalScriptProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
  navigator.serviceWorker
  .register('/service-worker.js')
  .then((registration) => {
  console.log('Service Worker registrado con éxito:', registration);
  })
  .catch((error) => {
  console.error('Error al registrar el Service Worker:', error);
  });
  });
  }