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
    statusItems,
    methodPayments,
    sortBy = '',
    sortDir = 'desc',
  }: {
    pageNo: number;
    pageSize: number;
    transactionId?: string;
    statusItems?: string[];
    methodPayments?: string[];
    sortBy?: string;
    sortDir?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams({
        pageNo: pageNo.toString(),
        pageSize: pageSize.toString(),
        sortBy,
        sortDir,
      }).toString();

      const requestBody: Record<string, any> = {};
      if (transactionId) requestBody.transactionId = transactionId;
      if (statusItems) requestBody.statusItems = statusItems;
      if (methodPayments) requestBody.methodPayments = methodPayments;

      const response = await callApi(
        {
          method: 'post',
          url: `payment-history/search?${queryParams}`,
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
