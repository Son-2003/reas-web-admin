export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: string;
  contentType: string;
}
