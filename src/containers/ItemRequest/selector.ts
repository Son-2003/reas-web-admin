import { ReduxState } from '@/lib/redux/store';

export const selectPendingItems = (state: ReduxState) => state.itemManagement.pendingItems;
export const selectItemDetail = (state: ReduxState) => state.itemManagement.itemDetail;
export const selectItemStatus = (state: ReduxState) => state.itemManagement.status;
export const selectItemDetailStatus = (state: ReduxState) => state.itemManagement.itemDetailStatus;
