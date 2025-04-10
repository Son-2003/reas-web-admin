import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import { Item } from '@/common/models/item';

const TypePrefix = 'Item';

export const fetchItems = createAppAsyncThunk(
  `${TypePrefix}/fetchItems`,
  async ({
    userId,
    statusItem,
    pageNo,
    pageSize,
  }: {
    userId: string;
    statusItem?: string;
    pageNo: number;
    pageSize: number;
  }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: 'item/user',
          params: {
            userId,
            statusItem,
            pageNo,
            pageSize,
          },
        },
        true,
      );

      return {
        items: response.content as Item[],
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
        currentPage: response.pageNo,
      };
    } catch (error) {
      console.error('Error in fetchItems:', error);
      throw error;
    }
  },
);
