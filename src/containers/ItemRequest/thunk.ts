import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'Item';

export const fetchPendingItems = createAppAsyncThunk(
  `${TypePrefix}/fetchPendingItems`,
  async () => {
    try {
      const response = await callApi(
        { method: 'get', url: '/item/pending' },
        true,
      );

      // Return items along with pagination details
      return {
        items: response.content,
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
        currentPage: response.pageNo,
      };
    } catch (error) {
      console.error('Error in fetchPendingItems:', error);
      throw error;
    }
  },
);

export const fetchItemDetail = createAppAsyncThunk(
  `${TypePrefix}/fetchItemDetail`,
  async (id: string) =>
    await callApi({ method: 'get', url: `/item/${id}` }, true),
);

export const reviewItemRequest = createAppAsyncThunk(
  `${TypePrefix}/reviewItemRequest`,
  async ({
    id,
    statusItem,
  }: {
    id: string;
    statusItem: 'AVAILABLE' | 'REJECTED';
  }) =>
    await callApi(
      {
        method: 'put',
        url: `/item/review?id=${id}&statusItem=${statusItem}`,
      },
      true,
    ),
);
