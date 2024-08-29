// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUQk56scXDQ2LO9jYQVF__GbpW7KJUrk4",
  authDomain: "inotebook-dd168.firebaseapp.com",
  projectId: "inotebook-dd168",
  storageBucket: "inotebook-dd168.appspot.com",
  messagingSenderId: "688702660998",
  appId: "1:688702660998:web:5dce18938a795d785acc07",
  measurementId: "G-73WBK1PY41"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Get FCM Token (for sending push notifications)
export const getFcmToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: "YOUR_PUBLIC_VAPID_KEY" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('Current token for client: ', currentToken);
        setTokenFound(true);
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      setTokenFound(false);
    });
};

// Handle incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
