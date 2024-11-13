// firebase-messaging-sw.js
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Configura Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCfS2BLcrIHHtG5C69ORK0ckGDR2lFjNm4",
  authDomain: "sport-gym-center-16ed4.firebaseapp.com",
  projectId: "sport-gym-center-16ed4",
  storageBucket: "sport-gym-center-16ed4.firebasestorage.app",
  messagingSenderId: "730750875793",
  appId: "1:730750875793:web:3533e78325eca68859a730",
  measurementId: "G-4DFT7TPE7M"
};

// Inicializa Firebase en el service worker
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Maneja mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("Recibido en segundo plano", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
