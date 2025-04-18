import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import { Item } from '@/common/models/item';

const TypePrefix = 'Item';

export const fetchItems = createAppAsyncThunk(
  `${TypePrefix}/fetchItems`,
  async ({
    ownerIds,
    pageNo,
    pageSize,
    itemName,
    statusItems,
  }: {
    ownerIds: string[];
    pageNo: number;
    pageSize: number;
    itemName: string;
    statusItems?: string[];
  }) => {
    try {
      const response = await callApi(
        {
          method: 'post',
          url: '/item/search',
          data: {
            ownerIds,
            itemName,
            pageNo,
            pageSize,
            statusItems,
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
