import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '@/common/models/chat';
import { ApiStatus } from '@/common/enums/apiStatus';
import { fetchChatMessagesByUser, fetchChatConversationsByUser } from './thunk';

export interface ChatState {
  chatMessages: ChatMessage[];
  chatConversations: ChatMessage[];
  fetchMessagesStatus: ApiStatus;
  fetchConversationsStatus: ApiStatus;
  errorMessage?: string;
}

export const initialState: ChatState = {
  chatMessages: [],
  chatConversations: [],
  fetchMessagesStatus: ApiStatus.Idle,
  fetchConversationsStatus: ApiStatus.Idle,
  errorMessage: undefined,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    resetChatState: (state) => {
      state.chatMessages = [];
      state.chatConversations = [];
      state.fetchMessagesStatus = ApiStatus.Idle;
      state.fetchConversationsStatus = ApiStatus.Idle;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    // Fetch messages
    builder
      .addCase(fetchChatMessagesByUser.pending, (state) => {
        state.fetchMessagesStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        fetchChatMessagesByUser.fulfilled,
        (state, action: PayloadAction<ChatMessage[]>) => {
          state.fetchMessagesStatus = ApiStatus.Fulfilled;
          state.chatMessages = action.payload;
        },
      )
      .addCase(fetchChatMessagesByUser.rejected, (state, action) => {
        state.fetchMessagesStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Failed to fetch chat messages.';
      });

    // Fetch conversations
    builder
      .addCase(fetchChatConversationsByUser.pending, (state) => {
        state.fetchConversationsStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        fetchChatConversationsByUser.fulfilled,
        (state, action: PayloadAction<ChatMessage[]>) => {
          state.fetchConversationsStatus = ApiStatus.Fulfilled;
          state.chatConversations = action.payload;
        },
      )
      .addCase(fetchChatConversationsByUser.rejected, (state, action) => {
        state.fetchConversationsStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Failed to fetch conversations.';
      });
  },
});

export const { resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
