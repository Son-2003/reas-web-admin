import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedback, getFeedbackDetail, deleteFeedback } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { Feedback } from '@/common/models/feedback';

export interface FeedbackState {
  feedbacks: Feedback[];
  feedbackDetail: Feedback | null;
  fetchStatus: ApiStatus;
  totalPages: number;
  totalRecords: number;
  last: boolean;
  errorMessage?: string;
}

export const initialState: FeedbackState = {
  feedbacks: [],
  feedbackDetail: null,
  fetchStatus: ApiStatus.Idle,
  totalPages: 1,
  totalRecords: 0,
  last: true,
  errorMessage: undefined,
};

const feedbackManagementSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    resetFeedbackState: (state) => {
      state.feedbacks = [];
      state.feedbackDetail = null;
      state.fetchStatus = ApiStatus.Idle;
      state.totalPages = 1;
      state.totalRecords = 0;
      state.last = true;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedback.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        getFeedback.fulfilled,
        (
          state,
          action: PayloadAction<{
            feedbacks: Feedback[];
            pageNo: number;
            pageSize: number;
            totalPages: number;
            totalRecords: number;
            last: boolean;
          }>,
        ) => {
          state.fetchStatus = ApiStatus.Fulfilled;
          state.feedbacks = action.payload.feedbacks;
          state.totalPages = action.payload.totalPages;
          state.totalRecords = action.payload.totalRecords;
          state.last = action.payload.last;
          state.errorMessage = undefined;
        },
      )
      .addCase(getFeedback.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Có lỗi xảy ra khi tải dữ liệu feedback.';
      })

      .addCase(getFeedbackDetail.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        getFeedbackDetail.fulfilled,
        (state, action: PayloadAction<Feedback>) => {
          state.fetchStatus = ApiStatus.Fulfilled;
          state.feedbackDetail = action.payload;
          state.errorMessage = undefined;
        },
      )
      .addCase(getFeedbackDetail.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Có lỗi xảy ra khi tải chi tiết feedback.';
      })

      // Xử lý khi xóa feedback
      .addCase(deleteFeedback.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.fetchStatus = ApiStatus.Fulfilled;
        state.feedbacks = state.feedbacks.filter(
          (feedback) => feedback.id !== Number(action.meta.arg),
        );
        state.errorMessage = undefined;
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Có lỗi xảy ra khi xóa feedback.';
      });
  },
});

export const { resetFeedbackState } = feedbackManagementSlice.actions;
export default feedbackManagementSlice.reducer;
