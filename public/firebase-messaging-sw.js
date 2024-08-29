// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
 
  apiKey: "AIzaSyAUQk56scXDQ2LO9jYQVF__GbpW7KJUrk4",
  authDomain: "inotebook-dd168.firebaseapp.com",
  projectId: "inotebook-dd168",
  storageBucket: "inotebook-dd168.appspot.com",
  messagingSenderId: "688702660998",
  appId: "1:688702660998:web:5dce18938a795d785acc07",
  measurementId: "G-73WBK1PY41"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
