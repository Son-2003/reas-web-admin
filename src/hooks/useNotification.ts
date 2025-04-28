import { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging, vapidKey } from '../lib/firebase';
import { useDispatch } from 'react-redux';
import { setRegistrationTokenThunk } from '@/containers/Notification/thunk';
import { ReduxDispatch } from '@/lib/redux/store';

export const useNotification = (): void => {
  const dispatch = useDispatch<ReduxDispatch>();

  const requestNotificationPermission = async (): Promise<void> => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
        await getFcmToken();
      } else {
        console.log('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const getFcmToken = async (): Promise<void> => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const fcmToken = await getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: registration,
      });
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        dispatch(setRegistrationTokenThunk(fcmToken));
      } else {
        console.log('No FCM token available. Permission may not be granted.');
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Notification received in foreground:', payload);
      if (payload.notification) {
        const notificationTitle = payload.notification.title || 'REAS';
        const notificationOptions: NotificationOptions = {
          body: payload.notification.body || 'New notification',
        };
        new Notification(notificationTitle, notificationOptions);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    requestNotificationPermission();
  }, []);
};
