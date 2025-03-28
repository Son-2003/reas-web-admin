import { ReduxState } from '@/lib/redux/store';

export const selectPendingItems = (state: ReduxState) =>
  state.pendingItems.pendingItems;
export const selectItemDetail = (state: ReduxState) =>
  state.pendingItems.itemDetail;
export const selectPendingItemsStatus = (state: ReduxState) =>
  state.pendingItems.status;
export const selectItemDetailStatus = (state: ReduxState) =>
  state.pendingItems.itemDetailStatus;
