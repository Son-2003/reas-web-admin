import { ReduxState } from '@/lib/redux/store';

export const selectExchangeHistory = (state: ReduxState) =>
  state.exchangeHistoryManagement.history;

export const selectExchangeHistoryFetchStatus = (state: ReduxState) =>
  state.exchangeHistoryManagement.fetchStatus;

export const selectExchangeHistoryTotalPages = (state: ReduxState) =>
  state.exchangeHistoryManagement.totalPages;

export const selectExchangeHistoryTotalRecords = (state: ReduxState) =>
  state.exchangeHistoryManagement.totalRecords;

export const selectExchangeHistoryLastPage = (state: ReduxState) =>
  state.exchangeHistoryManagement.last;

export const selectExchangeHistoryDetail = (state: ReduxState) =>
  state.exchangeHistoryManagement.exchangeHistoryDetail;

export const selectExchangeHistoryDetailFetchStatus = (state: ReduxState) =>
  state.exchangeHistoryManagement.fetchDetailStatus;

export const selectExchangeHistoryDetailError = (state: ReduxState) =>
  state.exchangeHistoryManagement.errorDetailMessage;
