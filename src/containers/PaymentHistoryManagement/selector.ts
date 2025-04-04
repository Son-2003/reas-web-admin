import { ReduxState } from '@/lib/redux/store';

export const selectPaymentHistory = (state: ReduxState) =>
  state.paymentHistory.paymentHistory;

export const selectPaymentHistoryFetchStatus = (state: ReduxState) =>
  state.paymentHistory.fetchStatus;

export const selectPaymentHistoryTotalPages = (state: ReduxState) =>
  state.paymentHistory.totalPages;

export const selectPaymentHistoryTotalRecords = (state: ReduxState) =>
  state.paymentHistory.totalRecords;

export const selectPaymentHistoryCurrentPage = (state: ReduxState) =>
  state.paymentHistory.currentPage;
