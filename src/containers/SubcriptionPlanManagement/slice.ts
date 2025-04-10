import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionResponse } from '@/common/models/subscription';
import { ApiStatus } from '@/common/enums/apiStatus';
import { fetchSubscriptionPlans, createSubscriptionPlan } from './thunk';

interface SubscriptionState {
  items: SubscriptionResponse[];
  fetchStatus: ApiStatus;
  createStatus: ApiStatus;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  errorMessage?: string;
}

const initialState: SubscriptionState = {
  items: [],
  fetchStatus: ApiStatus.Idle,
  createStatus: ApiStatus.Idle,
  totalPages: 1,
  totalRecords: 0,
  currentPage: 0,
  errorMessage: undefined,
};

const subscriptionSlice = createSlice({
  name: 'subscriptionPlan',
  initialState,
  reducers: {
    resetSubscriptionState: (state) => {
      state.items = [];
      state.fetchStatus = ApiStatus.Idle;
      state.createStatus = ApiStatus.Idle;
      state.totalPages = 1;
      state.totalRecords = 0;
      state.currentPage = 0;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionPlans.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        fetchSubscriptionPlans.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: SubscriptionResponse[];
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
      .addCase(fetchSubscriptionPlans.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Lỗi khi tải danh sách gói đăng ký.';
      })
      .addCase(createSubscriptionPlan.pending, (state) => {
        state.createStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        createSubscriptionPlan.fulfilled,
        (state, action: PayloadAction<SubscriptionResponse>) => {
          state.createStatus = ApiStatus.Fulfilled;
          state.items.push(action.payload);
          state.errorMessage = undefined;
        },
      )
      .addCase(createSubscriptionPlan.rejected, (state, action) => {
        state.createStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Lỗi khi tạo gói đăng ký mới.';
      });
  },
});

export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
