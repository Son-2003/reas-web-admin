import { PaymentHistory } from '@/common/models/payment-history';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'PaymentHistory';

export const fetchPaymentHistory = createAppAsyncThunk(
  `${TypePrefix}/fetchPaymentHistory`,
  async ({
    pageNo,
    pageSize,
    transactionId,
  }: {
    pageNo: number;
    pageSize: number;
    transactionId?: string;
  }) => {
    try {
      const requestBody = transactionId ? { transactionId } : {};

      const response = await callApi(
        {
          method: 'post',
          url: 'payment-history/search',
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
      console.error('Error in fetchPaymentHistory:', error);
      throw error;
    }
  },
);
