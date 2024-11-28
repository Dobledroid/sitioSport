import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://aad869e446641a557b87b31c9e4088d8@o4508334191149056.ingest.us.sentry.io/4508334196654080",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 0.5, // Ajusta al 50% para producción; suficiente para obtener métricas significativas sin sobrecargar.
  tracePropagationTargets: ["localhost", /^https:\/\/sitio-sport\.vercel\.app\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // Captura el 10% de sesiones completas.
  replaysOnErrorSampleRate: 1.0, // Captura el 100% de sesiones con errores.
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

// Registro del Service Worker
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
