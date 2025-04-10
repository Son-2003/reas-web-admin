import { PaymentHistory } from '@/common/models/payment-history';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'PaymentHistory';

export const fetchPaymentHistory = createAppAsyncThunk(
  `${TypePrefix}/fetchPaymentHistory`,
  async ({ pageNo, pageSize }: { pageNo: number; pageSize: number }) => {
    try {
      const response = await callApi(
        {
          method: 'post',
          url: 'payment-history/search',
          params: { pageNo, pageSize },
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
