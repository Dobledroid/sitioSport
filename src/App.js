import React, { useEffect } from 'react';
import Rutas from './Paginacion/Rutas';
import { messaging, getToken, onMessage } from './firebase-config.js';
import { baseURL } from './api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      document.getElementById('install-button').style.display = 'block';
    };

    const handleInstallClick = () => {
      document.getElementById('install-button').style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario rechazó la instalación');
        }
        deferredPrompt = null;
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    document.getElementById('install-button').addEventListener('click', handleInstallClick);

    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Permiso de notificaciones concedido');
          const token = await getToken(messaging, {
            vapidKey: 'BO7BbyOMeZZJT7jzT5L-wyy9C04vglHQox7Hhetj5HdHX8F8sbXRdKYtjmKAoKCLrr9uXOlLyKLrNElCJS3xEwI',
          });
          if (token) {
            console.log('Token de notificaciones:', token);
            await enviarTokenAlBackend(token);
          } else {
            console.log('No se pudo obtener el token');
          }
        } else {
          console.log('Permiso de notificaciones denegado');
        }
      } catch (error) {
        console.error('Error al solicitar el permiso de notificaciones:', error);
      }
    };

    const enviarTokenAlBackend = async (token) => {
      try {
        const response = await fetch(`${baseURL}/token-firebase`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        if (response.ok) {
          console.log('Token enviado al backend con éxito');
        } else {
          console.error('Error al enviar el token al backend:', response.statusText);
        }
      } catch (error) {
        console.error('Error en la solicitud al backend:', error);
      }
    };

    requestNotificationPermission();

    // Escuchar mensajes en primer plano y mostrar el toast
    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);
      toast.info(`Nueva notificación: ${payload.notification.title} - ${payload.notification.body}`);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      document.getElementById('install-button').removeEventListener('click', handleInstallClick);
    };
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Rutas />
    </>
  );
}

export default App;
