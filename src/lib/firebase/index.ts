import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBprEm2-PyXQ78yJv2XEpW1vYa34vz4y-E',
  authDomain: 'reas-app-f46cc.firebaseapp.com',
  projectId: 'reas-app-f46cc',
  storageBucket: 'reas-app-f46cc.firebasestorage.app',
  messagingSenderId: '682475272307',
  appId: '1:682475272307:web:2af101e60d65bb85165206',
};
const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);
export const vapidKey =
  'BNAEqpiFZvviP9YUJ6oh7PDWOPt50V0Aq1WQbkC9E-47sSTklOH0bPeVkwkZoSRAUMmMS1jGK5fnC_wdJXKqn9c';
