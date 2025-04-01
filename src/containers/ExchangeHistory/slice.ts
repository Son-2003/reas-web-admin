import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getExchangeHistory, getExchangeHistoryDetail } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { ExchangeHistoryByUserId } from '@/common/models/exchange-history';

export interface ExchangeHistoryState {
  history: ExchangeHistoryByUserId[];
  fetchStatus: ApiStatus;
  totalPages: number;
  totalRecords: number;
  last: boolean;
  errorMessage?: string;

  exchangeHistoryDetail?: ExchangeHistoryByUserId;
  fetchDetailStatus: ApiStatus;
  errorDetailMessage?: string;
}

export const initialState: ExchangeHistoryState = {
  history: [],
  fetchStatus: ApiStatus.Idle,
  totalPages: 1,
  totalRecords: 0,
  last: true,
  errorMessage: undefined,

  exchangeHistoryDetail: undefined,
  fetchDetailStatus: ApiStatus.Idle,
  errorDetailMessage: undefined,
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
      state.exchangeHistoryDetail = undefined;
      state.fetchDetailStatus = ApiStatus.Idle;
      state.errorDetailMessage = undefined;
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
      })
      
      .addCase(getExchangeHistoryDetail.pending, (state) => {
        state.fetchDetailStatus = ApiStatus.Loading;
        state.errorDetailMessage = undefined;
      })
      .addCase(
        getExchangeHistoryDetail.fulfilled,
        (state, action: PayloadAction<ExchangeHistoryByUserId>) => {
          state.fetchDetailStatus = ApiStatus.Fulfilled;
          state.exchangeHistoryDetail = action.payload;
          state.errorDetailMessage = undefined;
        },
      )
      .addCase(getExchangeHistoryDetail.rejected, (state, action) => {
        state.fetchDetailStatus = ApiStatus.Failed;
        state.errorDetailMessage =
          action.error.message || 'Có lỗi xảy ra khi tải chi tiết lịch sử trao đổi.';
      });
  },
});

export const { resetExchangeHistoryState } = exchangeHistoryManagementSlice.actions;
export default exchangeHistoryManagementSlice.reducer;
