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

// Lógica para la instalación de la PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Evitar que el navegador muestre el banner de instalación
  e.preventDefault();
  // Almacenar el evento para poder usarlo más tarde
  deferredPrompt = e;
  // Mostrar tu propio botón de instalación
  document.getElementById('install-button').style.display = 'block';
});

document.getElementById('install-button').addEventListener('click', () => {
  // Ocultar el botón de instalación
  document.getElementById('install-button').style.display = 'none';
  // Mostrar el cuadro de diálogo de instalación
  deferredPrompt.prompt();
  // Esperar la respuesta del usuario
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
    } else {
      console.log('Usuario rechazó la instalación');
    }
    deferredPrompt = null;
  });
});
