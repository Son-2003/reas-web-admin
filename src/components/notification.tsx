import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WEB_SOCKET_ENDPOINT } from '@/utils/environment';
import { ReduxDispatch } from '@/lib/redux/store';
import { selectUserInfo } from '@/containers/Auth/selector';
import { ChatMessage } from '@/common/models/chat';
import { selectChatConversations } from '@/containers/Chat/selector';
import { fetchChatConversationsByUser } from '@/containers/Chat/thunk';

// Helper function to format timestamp to a readable format
const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
};

const NotificationDropdown: React.FC = () => {
  const dispatch = useDispatch<ReduxDispatch>();
  const chatConversations = useSelector(selectChatConversations);
  const userInfo = useSelector(selectUserInfo);
  const senderUsername = userInfo?.userName || '';
  const [filteredConversations, setFilteredConversations] = useState<
    ChatMessage[]
  >([]);
  const [viewedConversations, setViewedConversations] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const stompClientRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (senderUsername) {
      dispatch(fetchChatConversationsByUser({ senderId: senderUsername }));
    }
  }, [dispatch, senderUsername]);

  useEffect(() => {
    if (chatConversations) {
      const filtered = chatConversations.filter(
        (conv: ChatMessage) =>
          (conv.senderId === senderUsername ||
            conv.recipientId === senderUsername) &&
          !viewedConversations.includes(
            conv.senderId === senderUsername ? conv.recipientId : conv.senderId,
          ),
      );
      setFilteredConversations(filtered);
    }
  }, [chatConversations, senderUsername, viewedConversations]);

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

    const otherParty =
      receivedMessage.senderId === senderUsername
        ? receivedMessage.recipientId
        : receivedMessage.senderId;

    setFilteredConversations((prevConversations) => {
      const existingIndex = prevConversations.findIndex((conv) => {
        const convOtherParty =
          conv.senderId === senderUsername ? conv.recipientId : conv.senderId;
        return convOtherParty === otherParty;
      });

      let updatedConversations = [...prevConversations];
      if (existingIndex !== -1) {
        updatedConversations[existingIndex] = {
          ...receivedMessage,
        };
      } else if (!viewedConversations.includes(otherParty)) {
        updatedConversations = [receivedMessage, ...prevConversations];
      } else {
        return prevConversations;
      }

      return updatedConversations;
    });

    setViewedConversations((prev) => prev.filter((id) => id !== otherParty));
  };

  const handleConversationClick = (conv: ChatMessage) => {
    const receiverUsername =
      conv.recipientId === senderUsername ? conv.senderId : conv.recipientId;
    const receiverFullName =
      conv.recipientId === senderUsername
        ? conv.senderName
        : conv.recipientName;

    const otherParty =
      conv.senderId === senderUsername ? conv.recipientId : conv.senderId;

    setViewedConversations((prev) => [...prev, otherParty]);

    setFilteredConversations((prevConversations) =>
      prevConversations.filter((item) => item !== conv),
    );

    const url = `/admin/chat?receiverUsername=${receiverUsername}&receiverFullName=${encodeURIComponent(receiverFullName)}`;
    navigate(url);

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2">
        <Bell className="w-6 h-6 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-96 bg-white dark:bg-black shadow-lg rounded-lg p-6 z-50 border dark:border-gray-700"
          >
            <h4 className="font-semibold text-gray-700 dark:text-white mb-2">
              Notifications
            </h4>
            {filteredConversations.length > 0 ? (
              <ul className="space-y-4 max-h-96 overflow-auto">
                {filteredConversations.map((conv, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleConversationClick(conv)}
                  >
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-[#00B0B9] rounded-full mr-3">
                        <span className="text-white text-lg">🛎️</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-[#0B1D2D]">
                          {conv.recipientId === senderUsername
                            ? conv.senderName
                            : conv.recipientName}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          New message from{' '}
                          {conv.recipientId === senderUsername
                            ? conv.senderName
                            : conv.recipientName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(conv.timestamp)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                No new notifications.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
