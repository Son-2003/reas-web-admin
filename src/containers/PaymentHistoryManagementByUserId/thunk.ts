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
    methodPayments,
    statusPayments,
    sortBy = '',
    sortDir = 'desc',
  }: {
    userId: number;
    pageNo: number;
    pageSize: number;
    transactionId?: string;
    methodPayments?: string[];
    statusPayments?: string[];
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
      if (methodPayments) requestBody.methodPayments = methodPayments;
      if (statusPayments) requestBody.statusPayments = statusPayments;

      const response = await callApi(
        {
          method: 'post',
          url: `payment-history/search/${userId}?${queryParams}`,
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
