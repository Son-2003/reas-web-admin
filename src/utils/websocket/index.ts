import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { WEB_SOCKET_ENDPOINT } from '../environment';

export const initializeWebSocket = (
  senderUsername: string,
  onMessageReceived: (message: any) => void,
  onError: (error: any) => void,
) => {
  const client = new Client({
    webSocketFactory: () => new SockJS(WEB_SOCKET_ENDPOINT),
    reconnectDelay: 5000,
  });

  client.onConnect = () => {
    client.subscribe(`/user/${senderUsername}/queue/messages`, (payload) => {
      const message = JSON.parse(payload.body);
      onMessageReceived(message);
    });
    client.subscribe('/topic/public', (payload) => {
      const message = JSON.parse(payload.body);
      onMessageReceived(message);
    });
  };

  client.onStompError = onError;

  client.activate();

  return client;
};

export const sendMessage = (
  client: Client,
  message: {
    id: string;
    chatId: string;
    senderId: string;
    recipientId: string;
    senderName: string;
    recipientName: string;
    content: string;
    timestamp: Date;
    contentType: string;
  },
) => {
  if (client && client.connected) {
    client.publish({
      destination: '/app/chat',
      body: JSON.stringify(message),
    });
  } else {
    console.warn('WebSocket is not connected');
  }
};
