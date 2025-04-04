import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import { PaymentHistory } from '@/common/models/payment-history';

const TypePrefix = 'PaymentHistoryByUserId';

export const fetchPaymentHistoryByUserId = createAppAsyncThunk(
  `${TypePrefix}/fetchPaymentHistoryByUserId`,
  async (userId: number) => {
    try {
      const response = await callApi(
        {
          method: 'post',
          url: `payment-history/search/${userId}`,
        },
        true,
      );
      return {
        paymentHistory: response.content as PaymentHistory[],
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
        currentPage: response.pageNo,
      };
    } catch (error) {
      console.error('Error in fetchPaymentHistoryByUserId:', error);
      throw error;
    }
  },
);
