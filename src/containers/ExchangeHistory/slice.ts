import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getExchangeHistory } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { ExchangeHistoryByUserId } from '@/common/models/exchange-history';

export interface ExchangeHistoryState {
  history: ExchangeHistoryByUserId[];
  fetchStatus: ApiStatus;
  totalPages: number;
  totalRecords: number;
  last: boolean;
  errorMessage?: string;
}

export const initialState: ExchangeHistoryState = {
  history: [],
  fetchStatus: ApiStatus.Idle,
  totalPages: 1,
  totalRecords: 0,
  last: true,
  errorMessage: undefined,
};

const exchangeHistoryManagementSlice = createSlice({
  name: 'exchangeHistory',
  initialState,
  reducers: {
    resetExchangeHistoryState: (state) => {
      state.history = [];
      state.fetchStatus = ApiStatus.Idle;
      state.totalPages = 1;
      state.totalRecords = 0;
      state.last = true;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExchangeHistory.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        getExchangeHistory.fulfilled,
        (
          state,
          action: PayloadAction<{
            history: ExchangeHistoryByUserId[];
            pageNo: number;
            pageSize: number;
            totalPages: number;
            totalRecords: number;
            last: boolean;
          }>,
        ) => {
          state.fetchStatus = ApiStatus.Fulfilled;
          state.history = action.payload.history;
          state.totalPages = action.payload.totalPages;
          state.totalRecords = action.payload.totalRecords;
          state.last = action.payload.last;
          state.errorMessage = undefined;
        },
      )
      .addCase(getExchangeHistory.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Có lỗi xảy ra khi tải lịch sử trao đổi.';
      });
  },
});

export const { resetExchangeHistoryState } =
  exchangeHistoryManagementSlice.actions;
export default exchangeHistoryManagementSlice.reducer;
