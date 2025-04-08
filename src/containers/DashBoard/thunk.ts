import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'DashboardManagement';

export const fetchMonthlyRevenue = createAppAsyncThunk(
  `${TypePrefix}/fetchMonthlyRevenue`,
  async ({ month, year }: { month: number; year: number }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: `payment-history/monthly-revenue`,
          params: { month, year },
        },
        true,
      );
      return response;
    } catch (error) {
      console.error('Error in fetchMonthlyRevenue:', error);
      throw error;
    }
  },
);

export const fetchSuccessfulTransactions = createAppAsyncThunk(
  `${TypePrefix}/fetchSuccessfulTransactions`,
  async ({ month, year }: { month: number; year: number }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: `payment-history/number-of-successful-transaction`,
          params: { month, year },
        },
        true,
      );
      return response;
    } catch (error) {
      console.error('Error in fetchSuccessfulTransactions:', error);
      throw error;
    }
  },
);

export const fetchMonthlyRevenueBySubscriptionPlan = createAppAsyncThunk(
  `${TypePrefix}/fetchMonthlyRevenueBySubscriptionPlan`,
  async ({ month, year }: { month: number; year: number }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: `payment-history/monthly-revenue-by-subscription-plan`,
          params: { month, year },
        },
        true,
      );
      return response;
    } catch (error) {
      console.error('Error in fetchMonthlyRevenueBySubscriptionPlan:', error);
      throw error;
    }
  },
);

export const fetchSuccessfulExchanges = createAppAsyncThunk(
  `${TypePrefix}/fetchSuccessfulExchanges`,
  async ({ month, year }: { month: number; year: number }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: `payment-history/number-of-successful-exchanges`,
          params: { month, year },
        },
        true,
      );
      return response;
    } catch (error) {
      console.error('Error in fetchSuccessfulExchanges:', error);
      throw error;
    }
  },
);
export const fetchCurrentActiveUsers = createAppAsyncThunk(
  `${TypePrefix}/fetchCurrentActiveUsers`,
  async () => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: `user/count-active-users`,
        },
        true,
      );
      return response;
    } catch (error) {
      console.error('Error in fetchSuccessfulExchanges:', error);
      throw error;
    }
  },
);

export const fetchYearlyRevenueBySubscriptionPlan = createAppAsyncThunk(
  `${TypePrefix}/fetchYearlyRevenueBySubscriptionPlan`,
  async ({ year }: { year: number }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: `payment-history/monthly-revenue-by-subscription-plan-in-a-year`,
          params: { year },
        },
        true,
      );
      return response;
    } catch (error) {
      console.error('Error in fetchYearlyRevenueBySubscriptionPlan:', error);
      throw error;
    }
  },
);
