import { ReduxState } from '@/lib/redux/store';

export const selectPaymentHistoryByUserId = (state: ReduxState) =>
  state.paymentHistoryByUserId.paymentHistory;

export const selectPaymentHistoryByUserIdFetchStatus = (state: ReduxState) =>
  state.paymentHistoryByUserId.fetchStatus;

export const selectPaymentHistoryByUserIdTotalPages = (state: ReduxState) =>
  state.paymentHistoryByUserId.totalPages;

export const selectPaymentHistoryByUserIdTotalRecords = (state: ReduxState) =>
  state.paymentHistoryByUserId.totalRecords;

export const selectPaymentHistoryByUserIdCurrentPage = (state: ReduxState) =>
  state.paymentHistoryByUserId.currentPage;
