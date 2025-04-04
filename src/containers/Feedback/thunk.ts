import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import { Feedback } from '@/common/models/feedback';

const TypePrefix = 'Feedback';

// Thunk để lấy danh sách feedback
export const getFeedback = createAppAsyncThunk(
  `${TypePrefix}/getFeedback`,
  async (params: { userId: string }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: 'feedback',
          params: {
            userId: params.userId,
          },
        },
        true,
      );
      return {
        feedbacks: response.content as Feedback[],
        pageNo: response.pageNo,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
        last: response.last,
      };
    } catch (error) {
      console.error('Error in getFeedback:', error);
      throw error;
    }
  },
);

export const getFeedbackDetail = createAppAsyncThunk(
  `${TypePrefix}/getFeedbackDetail`,
  async (feedbackId: string) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: `feedback/${feedbackId}`,
        },
        true,
      );
      return response as Feedback;
    } catch (error) {
      console.error('Error in getFeedbackDetail:', error);
      throw error;
    }
  },
);

export const deleteFeedback = createAppAsyncThunk(
  `${TypePrefix}/deleteFeedback`,
  async (feedbackId: string) => {
    try {
      const response = await callApi(
        {
          method: 'delete',
          url: `feedback`,
          params: {
            feedbackId,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      console.error('Error in deleteFeedback:', error);
      throw error;
    }
  },
);
