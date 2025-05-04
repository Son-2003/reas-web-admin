import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import {
  SubscriptionPlan,
  SubscriptionResponse,
} from '@/common/models/subscription';

const TypePrefix = 'SubscriptionPlan';

export const fetchSubscriptionPlans = createAppAsyncThunk(
  `${TypePrefix}/fetchSubscriptionPlans`,
  async (params?: { pageNo?: number; pageSize?: number; search?: string }) => {
    try {
      const requestBody = params?.search
        ? { name: params.search, statusEntities: ['ACTIVE'] }
        : { statusEntities: ['ACTIVE'] };

      const queryParams = {
        pageNo: params?.pageNo,
        pageSize: params?.pageSize,
      };

      const response = await callApi(
        {
          method: 'post',
          url: 'subscription-plan/search',
          params: queryParams,
          data: requestBody,
        },
        true,
      );

      return {
        items: response.content as SubscriptionResponse[],
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
        currentPage: response.pageNo,
      };
    } catch (error) {
      console.error('Error in fetchSubscriptionPlans:', error);
      throw error;
    }
  },
);

export const createSubscriptionPlan = createAppAsyncThunk(
  `${TypePrefix}/createSubscriptionPlan`,
  async (subscriptionData: SubscriptionPlan) => {
    try {
      const response = await callApi(
        {
          method: 'post',
          url: 'subscription-plan',
          data: subscriptionData,
        },
        true,
      );

      return response;
    } catch (error) {
      console.error('Error in createSubscriptionPlan:', error);
      throw error;
    }
  },
);

export const updateSubscriptionPlan = createAppAsyncThunk(
  `${TypePrefix}/updateSubscriptionPlan`,
  async (subscriptionData: SubscriptionPlan) => {
    try {
      const response = await callApi(
        {
          method: 'put',
          url: 'subscription-plan',
          data: subscriptionData,
        },
        true,
      );

      return response.data;
    } catch (error) {
      console.error('Error in updateSubscriptionPlan:', error);
      throw error;
    }
  },
);

export const deleteSubscriptionPlan = createAppAsyncThunk(
  `${TypePrefix}/deleteSubscriptionPlan`,
  async (id: number) => {
    try {
      await callApi(
        {
          method: 'delete',
          url: `subscription-plan/${id}`,
        },
        true,
      );

      return id;
    } catch (error) {
      console.error('Error in deleteSubscriptionPlan:', error);
      throw error;
    }
  },
);
