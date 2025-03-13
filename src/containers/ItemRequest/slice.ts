import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPendingItems, fetchItemDetail } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { Item } from '@/common/models/item';

export interface ItemSliceState {
  pendingItems: Item[];
  itemDetail: Item | null; // Thêm state cho itemDetail
  status: ApiStatus;
  itemDetailStatus: ApiStatus; // Trạng thái cho itemDetail
}

export const initialState: ItemSliceState = {
  pendingItems: [],
  itemDetail: null, // Giá trị mặc định là null
  status: ApiStatus.Idle,
  itemDetailStatus: ApiStatus.Idle, // Trạng thái mặc định
};

const itemManagementSlice = createSlice({
  name: 'itemManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingItems.pending, (state) => {
        state.status = ApiStatus.Loading;
      })
      .addCase(
        fetchPendingItems.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.status = ApiStatus.Fulfilled;
          state.pendingItems = action.payload;
        },
      )
      .addCase(fetchPendingItems.rejected, (state) => {
        state.status = ApiStatus.Failed;
      })
      .addCase(fetchItemDetail.pending, (state) => {
        state.itemDetailStatus = ApiStatus.Loading;
      })
      .addCase(
        fetchItemDetail.fulfilled,
        (state, action: PayloadAction<Item>) => {
          state.itemDetailStatus = ApiStatus.Fulfilled;
          state.itemDetail = action.payload;
        },
      )
      .addCase(fetchItemDetail.rejected, (state) => {
        state.itemDetailStatus = ApiStatus.Failed;
      });
  },
});

export default itemManagementSlice.reducer;
