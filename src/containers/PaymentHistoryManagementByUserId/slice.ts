import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPaymentHistoryByUserId } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { PaymentHistory } from '@/common/models/payment-history';

export interface PaymentHistoryByUserIdState {
  paymentHistory: PaymentHistory[];
  fetchStatus: ApiStatus;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  errorMessage?: string;
}

export const initialState: PaymentHistoryByUserIdState = {
  paymentHistory: [],
  fetchStatus: ApiStatus.Idle,
  totalPages: 1,
  totalRecords: 0,
  currentPage: 0,
  errorMessage: undefined,
};

const paymentHistoryByUserIdSlice = createSlice({
  name: 'paymentHistoryByUserId',
  initialState,
  reducers: {
    resetPaymentHistoryByUserIdState: (state) => {
      state.paymentHistory = [];
      state.fetchStatus = ApiStatus.Idle;
      state.totalPages = 1;
      state.totalRecords = 0;
      state.currentPage = 0;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentHistoryByUserId.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        fetchPaymentHistoryByUserId.fulfilled,
        (
          state,
          action: PayloadAction<{
            paymentHistory: PaymentHistory[];
            totalPages: number;
            totalRecords: number;
            currentPage: number;
          }>
        ) => {
          state.fetchStatus = ApiStatus.Fulfilled;
          state.paymentHistory = action.payload.paymentHistory;
          state.totalPages = action.payload.totalPages;
          state.totalRecords = action.payload.totalRecords;
          state.currentPage = action.payload.currentPage;
          state.errorMessage = undefined;
        }
      )
      .addCase(fetchPaymentHistoryByUserId.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Có lỗi xảy ra khi tải lịch sử thanh toán.';
      });
  },
});

export const { resetPaymentHistoryByUserIdState } = paymentHistoryByUserIdSlice.actions;
export default paymentHistoryByUserIdSlice.reducer;
