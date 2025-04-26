import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'Chat';

export const fetchChatMessagesByUser = createAppAsyncThunk(
  `${TypePrefix}/fetchChatMessagesByUser`,
  async ({
    senderId,
    recipientId,
  }: {
    senderId: string;
    recipientId: string;
  }) => {
    const response = await callApi({
      method: 'get',
      url: `/messages/${senderId}/${recipientId}`,
    });
    return response;
  },
);

export const fetchChatConversationsByUser = createAppAsyncThunk(
  `${TypePrefix}/fetchChatConversationsByUser`,
  async ({ senderId }: { senderId: string }) => {
    const response = await callApi({
      method: 'get',
      url: `/conversations/${senderId}`,
    });
    return response;
  },
);
