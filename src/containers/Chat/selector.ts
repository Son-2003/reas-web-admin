import { ReduxState } from '@/lib/redux/store';

export const selectChatMessages = (state: ReduxState) =>
  state.chat.chatMessages;

export const selectChatConversations = (state: ReduxState) =>
  state.chat?.chatConversations || [];

export const selectChatMessagesStatus = (state: ReduxState) =>
  state.chat.fetchMessagesStatus;

export const selectChatConversationsStatus = (state: ReduxState) =>
  state.chat.fetchConversationsStatus;

export const selectChatErrorMessage = (state: ReduxState) =>
  state.chat.errorMessage;
