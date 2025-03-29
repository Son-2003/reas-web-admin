import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import { Feedback } from '@/common/models/feedback';

const TypePrefix = 'Feedback';

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
