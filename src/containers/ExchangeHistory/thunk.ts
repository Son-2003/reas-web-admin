import { ExchangeHistoryByUserId } from '@/common/models/exchange-history';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'ExchangeHistory';

export const getExchangeHistory = createAppAsyncThunk(
  `${TypePrefix}/getExchangeHistory`,
  async (params: { userId: string; pageNo: number; pageSize: number }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: 'exchange/history',
          params: {
            userId: params.userId,
            pageNo: params.pageNo,
            pageSize: params.pageSize,
          },
        },
        true,
      );
      return {
        history: response.content as ExchangeHistoryByUserId[],
        pageNo: response.pageNo,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
        last: response.last,
      };
    } catch (error) {
      console.error('Error in getExchangeHistory:', error);
      throw error;
    }
  },
);

export const getExchangeHistoryDetail = createAppAsyncThunk(
  `${TypePrefix}/getExchangeHistoryDetail`,
  async (id: string) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: `exchange/${id}`,
        },
        true,
      );
      return response as ExchangeHistoryByUserId;
    } catch (error) {
      console.error('Error in getExchangeHistoryDetail:', error);
      throw error;
    }
  },
);
