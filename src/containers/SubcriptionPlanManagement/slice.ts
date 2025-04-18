import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubscriptionResponse } from '@/common/models/subscription';
import { ApiStatus } from '@/common/enums/apiStatus';
import {
  fetchSubscriptionPlans,
  createSubscriptionPlan,
  deleteSubscriptionPlan,
  updateSubscriptionPlan,
} from './thunk';

interface SubscriptionState {
  items: SubscriptionResponse[];
  fetchStatus: ApiStatus;
  createStatus: ApiStatus;
  updateStatus: ApiStatus;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  errorMessage?: string;
}

const initialState: SubscriptionState = {
  items: [],
  fetchStatus: ApiStatus.Idle,
  createStatus: ApiStatus.Idle,
  updateStatus: ApiStatus.Idle,
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
      state.updateStatus = ApiStatus.Idle;
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
      })

      .addCase(deleteSubscriptionPlan.pending, (state) => {
        state.errorMessage = undefined;
      })
      .addCase(
        deleteSubscriptionPlan.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(
            (item) => item.id !== action.payload,
          );
          state.errorMessage = undefined;
        },
      )
      .addCase(deleteSubscriptionPlan.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Lỗi khi xóa gói đăng ký.';
      })

      .addCase(updateSubscriptionPlan.pending, (state) => {
        state.updateStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        updateSubscriptionPlan.fulfilled,
        (state, action: PayloadAction<SubscriptionResponse>) => {
          state.updateStatus = ApiStatus.Fulfilled;

          if (!action.payload?.id) {
            return;
          }

          const index = state.items.findIndex(
            (item) => item.id === action.payload.id,
          );

          if (index !== -1) {
            state.items[index] = action.payload;
          }
          state.errorMessage = undefined;
        },
      )

      .addCase(updateSubscriptionPlan.rejected, (state, action) => {
        state.updateStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Lỗi khi cập nhật gói đăng ký.';
      });
  },
});

export const { resetSubscriptionState } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
