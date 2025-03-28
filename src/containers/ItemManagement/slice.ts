import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { Item } from '@/common/models/item';

export interface ItemState {
  items: Item[];
  fetchStatus: ApiStatus;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  errorMessage?: string;
}

export const initialState: ItemState = {
  items: [],
  fetchStatus: ApiStatus.Idle,
  totalPages: 1,
  totalRecords: 0,
  currentPage: 0,
  errorMessage: undefined,
};

const itemManagementSlice = createSlice({
  name: 'itemManagement',
  initialState,
  reducers: {
    resetItemState: (state) => {
      state.items = [];
      state.fetchStatus = ApiStatus.Idle;
      state.totalPages = 1;
      state.totalRecords = 0;
      state.currentPage = 0;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        fetchItems.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: Item[];
            totalPages: number;
            totalRecords: number;
            currentPage: number;
          }>,
        ) => {
          state.fetchStatus = ApiStatus.Fulfilled;
          state.items = action.payload.items;
          state.totalPages = action.payload.totalPages;
          state.totalRecords = action.payload.totalRecords;
          state.currentPage = action.payload.currentPage;
          state.errorMessage = undefined;
        },
      )
      .addCase(fetchItems.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Có lỗi xảy ra khi tải dữ liệu.';
      });
  },
});

export const { resetItemState } = itemManagementSlice.actions;
export default itemManagementSlice.reducer;
