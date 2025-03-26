import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import { Item } from '@/common/models/item';

const TypePrefix = 'Item';

export const searchItems = createAppAsyncThunk(
  `${TypePrefix}/searchItems`,
  async (searchParams: { query: string }) => {
    try {
      const response = await callApi(
        {
          method: 'get',
          url: 'item/search',
          data: searchParams,
        },
        true
      );

      return response.content as Item[];
    } catch (error) {
      console.error('Error in searchItems:', error);
      throw error;
    }
  }
);
