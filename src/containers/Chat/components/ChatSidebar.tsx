import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReduxDispatch } from '@/lib/redux/store';
import { selectUserInfo } from '@/containers/Auth/selector';
import { ChatMessage } from '@/common/models/chat';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { WEB_SOCKET_ENDPOINT } from '@/utils/environment';
import { fetchChatConversationsByUser } from '../thunk';
import { selectChatConversations } from '../selector';

const ChatSidebar: React.FC = () => {
  const dispatch = useDispatch<ReduxDispatch>();
  const chatConversations = useSelector(selectChatConversations);
  const userInfo = useSelector(selectUserInfo);
  const senderUsername = userInfo?.userName || '';
  const navigate = useNavigate();
  const [filteredConversations, setFilteredConversations] = useState<
    ChatMessage[]
  >([]);
  const stompClientRef = useRef<any>(null);

  useEffect(() => {
    if (senderUsername) {
      dispatch(fetchChatConversationsByUser({ senderId: senderUsername }));
    }
  }, [dispatch, senderUsername]);

  useEffect(() => {
    if (chatConversations) {
      const filtered = chatConversations.filter(
        (conv: ChatMessage) =>
          conv.senderId === senderUsername ||
          conv.recipientId === senderUsername,
      );
      setFilteredConversations(filtered);
    }
  }, [chatConversations, senderUsername]);

  const connectWebSocket = () => {
    const client = Stomp.over(() => new SockJS(WEB_SOCKET_ENDPOINT));
    stompClientRef.current = client;

    client.connect(
      {},
      () => {
        client.subscribe(
          `/user/${senderUsername}/queue/messages`,
          onMessageReceived,
        );
        client.subscribe(`/topic/public`, onMessageReceived);
      },
      () => {
        setTimeout(connectWebSocket, 5000);
      },
    );

    client.onWebSocketClose = () => {
      setTimeout(connectWebSocket, 5000);
    };
  };

  useEffect(() => {
    if (senderUsername) {
      connectWebSocket();
    }

    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect();
      }
    };
  }, [senderUsername]);

  const onMessageReceived = (payload: any) => {
    const receivedMessage: ChatMessage = JSON.parse(payload.body);

    if (
      receivedMessage.senderId !== senderUsername &&
      receivedMessage.recipientId !== senderUsername
    ) {
      return;
    }

    setFilteredConversations((prevConversations) => {
      const existingIndex = prevConversations.findIndex((conv) => {
        const otherParty =
          conv.senderId === senderUsername ? conv.recipientId : conv.senderId;
        return (
          otherParty ===
          (receivedMessage.senderId === senderUsername
            ? receivedMessage.recipientId
            : receivedMessage.senderId)
        );
      });

      if (existingIndex !== -1) {
        const updatedConversations = [...prevConversations];
        updatedConversations[existingIndex] = {
          ...updatedConversations[existingIndex],
          content: receivedMessage.content,
          timestamp: receivedMessage.timestamp,
        };
        return updatedConversations;
      } else {
        return [receivedMessage, ...prevConversations];
      }
    });
  };

  const handleConversationClick = (conv: ChatMessage) => {
    const receiverUsername =
      conv.recipientId === senderUsername ? conv.senderId : conv.recipientId;
    const receiverFullName =
      conv.recipientId === senderUsername
        ? conv.senderName
        : conv.recipientName;

    const url = `/admin/chat?receiverUsername=${receiverUsername}&receiverFullName=${encodeURIComponent(receiverFullName)}`;
    navigate(url);
  };

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul className="space-y-3">
        {filteredConversations?.map((conv, index) => (
          <li
            key={index}
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-xl"
            onClick={() => handleConversationClick(conv)}
          >
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <div>
              <p className="font-medium">
                {conv.recipientId === senderUsername
                  ? conv.senderName
                  : conv.recipientName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate overflow-hidden whitespace-nowrap w-[150px]">
                {conv.senderId === senderUsername
                  ? `You: ${conv.content}` // Conditionally prepend "You: " for messages from the user
                  : conv.content}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(conv.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
