import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { ReduxDispatch } from '@/lib/redux/store';
import { selectUserInfo } from '@/containers/Auth/selector';
import { fetchChatMessagesByUser } from '../thunk';
import { WEB_SOCKET_ENDPOINT } from '@/utils/environment';
import moment from 'moment-timezone';
import { ChatMessage } from '@/common/models/chat';

const ChatMain: React.FC = () => {
  const dispatch = useDispatch<ReduxDispatch>();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const receiverUsername = queryParams.get('receiverUsername') || '';
  const receiverFullName = queryParams.get('receiverFullName') || '';
  const userInfo = useSelector(selectUserInfo);
  const senderUsername = userInfo?.userName || '';

  const stompClientRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // WebSocket connection with reconnect
  useEffect(() => {
    if (!senderUsername) {
      console.error('senderUsername is missing');
      return;
    }

    let subscription: any;

    const connect = () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect();
      }

      const client = Stomp.over(() => new SockJS(WEB_SOCKET_ENDPOINT));
      stompClientRef.current = client;

      client.connect(
        {},
        () => {
          subscription = client.subscribe(
            // Lưu subscription vào biến
            `/user/${senderUsername}/queue/messages`,
            onMessageReceived,
          );
        },
        (error: any) => {
          console.error('WebSocket error:', error);
          setTimeout(connect, 5000);
        },
      );

      client.onWebSocketClose = () => {
        console.warn('WebSocket connection closed');
        setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      if (subscription) subscription.unsubscribe();
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect();
      }
    };
  }, [senderUsername]);

  const onMessageReceived = (payload: any) => {
    try {
      const receivedMessage: ChatMessage = JSON.parse(payload.body);

      // Sử dụng functional update để có state mới nhất
      setMessages((prev) => {
        const isDuplicate = prev.some((msg) => msg.id === receivedMessage.id);
        if (isDuplicate) {
          console.log('Duplicate message ignored:', receivedMessage.id);
          return prev;
        }
        return [...prev, receivedMessage];
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  // Fetch initial chat messages
  useEffect(() => {
    if (!receiverUsername || !senderUsername) {
      console.error('Missing receiverUsername or senderUsername');
      return;
    }

    const fetchChat = async () => {
      try {
        const response = await dispatch(
          fetchChatMessagesByUser({
            senderId: senderUsername,
            recipientId: receiverUsername,
          }),
        ).unwrap();

        if (Array.isArray(response)) {
          setMessages(response);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching chat messages:', error);
        setMessages([]);
      }
    };

    fetchChat();
  }, [dispatch, receiverUsername, senderUsername]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const client = stompClientRef.current;
    if (!client || !client.connected) {
      console.warn('WebSocket is not connected');
      return;
    }

    if (!receiverUsername) {
      console.error('receiverUsername is missing');
      return;
    }

    setIsSending(true);

    try {
      const vietnamTime = moment().tz('Asia/Ho_Chi_Minh').format();
      const chatMessage = {
        senderId: senderUsername,
        recipientId: receiverUsername,
        senderName: userInfo?.fullName,
        recipientName: receiverFullName,
        content: message,
        timestamp: vietnamTime,
        contentType: 'text',
      };

      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      client.send('/app/chat', {}, JSON.stringify(chatMessage));
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setIsSending(false);
  };

  // Thêm useEffect để reset messages khi receiver thay đổi
  useEffect(
    () => () => {
      setMessages([]); // Reset messages khi component unmount hoặc receiver thay đổi
    },
    [receiverUsername],
  );

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col flex-1">
      <div className="h-14 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full mr-4" />
        <div>
          <p className="font-semibold">{receiverFullName}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
        {messages
          .filter(
            (msg) =>
              (msg.senderId === senderUsername &&
                msg.recipientId === receiverUsername) ||
              (msg.senderId === receiverUsername &&
                msg.recipientId === senderUsername),
          )
          .map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === senderUsername ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] break-words ${
                  msg.senderId === senderUsername
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                }`}
              >
                <div className="flex flex-col">
                  {msg.contentType === 'image' ? (
                    <img
                      src={msg.content}
                      alt="image"
                      className="rounded-md mb-2"
                      style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <span>{msg.content}</span>
                  )}
                  <span
                    className={`text-xs mt-1 ${
                      msg.senderId === senderUsername
                        ? 'text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {moment(msg.timestamp)
                      .tz('Asia/Ho_Chi_Minh')
                      .format('HH:mm DD/MM/YYYY')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700"
          onClick={sendMessage}
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatMain;
