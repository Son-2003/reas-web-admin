// Service Worker - sw.js

self.addEventListener('install', (event) => {
  self.skipWaiting(); 
});


self.addEventListener('activate', (event) => {
  self.clients.claim(); 
});

self.addEventListener('push', (event) => {
  let notificationTitle = 'New Notification';
  let notificationOptions = {
    body: 'You have a new message.',
    icon: '/icon.png',  
    badge: '/badge.png',  
  };

  if (event.data) {
    const data = event.data.json();
    notificationTitle = data.notification.title || notificationTitle;
    notificationOptions.body = data.notification.body || notificationOptions.body;
  }

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();  

  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')  
  );
});
