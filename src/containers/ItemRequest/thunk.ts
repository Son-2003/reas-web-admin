import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';

const TypePrefix = 'Item';

export const fetchPendingItems = createAppAsyncThunk(
  `${TypePrefix}/fetchPendingItems`,
  async () => await callApi({ method: 'get', url: '/item/pending' }, true),
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
