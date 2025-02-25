import { SearchRequestPagination } from '@/common/models/pagination';
import {
  CreateStaffAccountRequest,
  SearchUserRequest,
} from '@/common/models/user';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi, { objectToQueryString } from '@/utils/api';

const TypePrefix = 'User';

export const searchUser = createAppAsyncThunk(
  `${TypePrefix}/searchUser`,
  async ({
    data,
    request,
  }: {
    data: SearchRequestPagination;
    request: SearchUserRequest;
  }) => {
    const queryString = objectToQueryString(data);
    return await callApi(
      {
        method: 'post',
        url: `/user/search?${queryString}`,
        data: request,
      },
      true,
    );
  },
);

export const createStaffAccount = createAppAsyncThunk(
  `${TypePrefix}/createStaffAccount`,
  async (data: CreateStaffAccountRequest) =>
    await callApi(
      {
        method: 'post',
        url: '/user/create-new-staff',
        data: data,
      },
      true,
    ),
);
