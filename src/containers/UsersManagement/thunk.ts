import { SearchRequestPagination } from '@/common/models/pagination';
import { SearchUserRequest } from '@/common/models/user';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi, { objectToQueryString } from '@/utils/api';

const TypePrefix = 'User';

export const searchUser = createAppAsyncThunk(
  `${TypePrefix}/searchUser`,
  async (data: SearchRequestPagination<SearchUserRequest>) => {
    const queryString = objectToQueryString(data);
    return await callApi(
      {
        method: 'get',
        url: `/user/search?${queryString}`,
      },
      true,
    );
  },
);
