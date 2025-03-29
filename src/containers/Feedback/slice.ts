import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedback } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { Feedback } from '@/common/models/feedback';

export interface FeedbackState {
  feedbacks: Feedback[];
  fetchStatus: ApiStatus;

  totalPages: number;
  totalRecords: number;
  last: boolean;
  errorMessage?: string;
}

export const initialState: FeedbackState = {
  feedbacks: [],
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
      });
  },
});

export const { resetFeedbackState } = feedbackManagementSlice.actions;
export default feedbackManagementSlice.reducer;
