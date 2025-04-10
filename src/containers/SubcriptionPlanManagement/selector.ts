import { ReduxState } from '@/lib/redux/store';

export const selectSubscriptionPlans = (state: ReduxState) =>
  state.subscriptionPlan.items;

export const selectSubscriptionFetchStatus = (state: ReduxState) =>
  state.subscriptionPlan.fetchStatus;

export const selectSubscriptionCreateStatus = (state: ReduxState) =>
  state.subscriptionPlan.createStatus;
export const selectSubscriptionTotalPages = (state: ReduxState) =>
  state.subscriptionPlan.totalPages;

export const selectSubscriptionTotalRecords = (state: ReduxState) =>
  state.subscriptionPlan.totalRecords;

export const selectSubscriptionCurrentPage = (state: ReduxState) =>
  state.subscriptionPlan.currentPage;

export const selectSubscriptionError = (state: ReduxState) =>
  state.subscriptionPlan.errorMessage;
