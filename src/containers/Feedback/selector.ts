import { ReduxState } from '@/lib/redux/store';

export const selectFeedbacks = (state: ReduxState) =>
  state.feedbackManagement.feedbacks;

export const selectFeedbackFetchStatus = (state: ReduxState) =>
  state.feedbackManagement.fetchStatus;

export const selectFeedbackTotalPages = (state: ReduxState) =>
  state.feedbackManagement.totalPages;

export const selectFeedbackTotalRecords = (state: ReduxState) =>
  state.feedbackManagement.totalRecords;

export const selectFeedbackLastPage = (state: ReduxState) =>
  state.feedbackManagement.last;

export const selectFeedbackDetail = (state: ReduxState) =>
  state.feedbackManagement.feedbackDetail;
