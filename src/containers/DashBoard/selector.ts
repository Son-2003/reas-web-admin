import { ReduxState } from '@/lib/redux/store';

export const selectDashboardRevenue = (state: ReduxState) =>
  state.dashboardManagement.revenue;

export const selectDashboardRevenueFetchStatus = (state: ReduxState) =>
  state.dashboardManagement.fetchRevenueStatus;

export const selectDashboardSuccessfulTransactions = (state: ReduxState) =>
  state.dashboardManagement.successfulTransactions;

export const selectDashboardTransactionFetchStatus = (state: ReduxState) =>
  state.dashboardManagement.fetchTransactionStatus;

export const selectMonthlyRevenueBySubscriptionPlan = (state: ReduxState) =>
  state.dashboardManagement.monthlyRevenueBySubscriptionPlan;

export const selectSubscriptionPlanRevenueFetchStatus = (state: ReduxState) =>
  state.dashboardManagement.fetchSubscriptionPlanRevenueStatus;

export const selectSuccessfulExchanges = (state: ReduxState) =>
  state.dashboardManagement.successfulExchanges;

export const selectSuccessfulExchangesFetchStatus = (state: ReduxState) =>
  state.dashboardManagement.fetchSuccessfulExchangesStatus;

export const selectCurrentActiveUsers = (state: ReduxState) =>
  state.dashboardManagement.currentActiveUsers;

export const selectCurrentActiveUsersFetchStatus = (state: ReduxState) =>
  state.dashboardManagement.fetchCurrentActiveUsersStatus;

export const selectYearlyRevenueBySubscriptionPlan = (state: ReduxState) =>
  state.dashboardManagement.yearlyRevenueBySubscriptionPlan;

export const selectYearlyRevenueFetchStatus = (state: ReduxState) =>
  state.dashboardManagement.fetchYearlyRevenueStatus;
