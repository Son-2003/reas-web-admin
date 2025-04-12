import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import { PaymentHistory } from '@/common/models/payment-history';

const TypePrefix = 'PaymentHistoryByUserId';

export const fetchPaymentHistoryByUserId = createAppAsyncThunk(
  `${TypePrefix}/fetchPaymentHistoryByUserId`,
  async ({
    userId,
    pageNo,
    pageSize,
    transactionId,
  }: {
    userId: number;
    pageNo: number;
    pageSize: number;
    transactionId?: string;
  }) => {
    try {
      const requestBody = transactionId ? { transactionId } : {};
      const response = await callApi(
        {
          method: 'post',
          url: `payment-history/search/${userId}`,
          params: { pageNo, pageSize },
          data: requestBody,
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
