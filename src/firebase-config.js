// firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCfS2BLcrIHHtG5C69ORK0ckGDR2lFjNm4",
  authDomain: "sport-gym-center-16ed4.firebaseapp.com",
  projectId: "sport-gym-center-16ed4",
  storageBucket: "sport-gym-center-16ed4.firebasestorage.app",
  messagingSenderId: "730750875793",
  appId: "1:730750875793:web:3533e78325eca68859a730",
  measurementId: "G-4DFT7TPE7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
