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
    sortBy = 'id',
    sortDir = 'asc',
  }: {
    ownerIds: string[];
    pageNo: number;
    pageSize: number;
    itemName: string;
    statusItems?: string[];
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

      const response = await callApi(
        {
          method: 'post',
          url: `/item/search?${queryParams}`,
          data: {
            ownerIds,
            statusItems,
            itemName,
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
