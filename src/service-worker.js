import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precargar recursos
precacheAndRoute(self.__WB_MANIFEST);

// Estrategia de caché para las solicitudes de red
registerRoute(
({ request }) => request.destination === 'document',
new StaleWhileRevalidate()
);