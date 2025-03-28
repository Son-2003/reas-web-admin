import { ReduxState } from '@/lib/redux/store';

export const selectItems = (state: ReduxState) => state.itemManagement.items;

export const selectFetchStatus = (state: ReduxState) =>
  state.itemManagement.fetchStatus;

export const selectTotalPages = (state: ReduxState) =>
  state.itemManagement.totalPages;

export const selectTotalRecords = (state: ReduxState) =>
  state.itemManagement.totalRecords;

export const selectCurrentPage = (state: ReduxState) =>
  state.itemManagement.currentPage;
