import { SearchRequestPagination } from '@/common/models/pagination';
import {
  CreateStaffAccountRequest,
  SearchUserRequest,
  UpdateStaffAccountRequest,
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

export const getUserInfo = createAppAsyncThunk(
  `${TypePrefix}/getUserInfo`,
  async (userId: string) =>
    await callApi(
      {
        method: 'get',
        url: `/user/${userId}`,
      },
      true,
    ),
);

export const updateUser = createAppAsyncThunk(
  `${TypePrefix}/updateUser`,
  async (data: UpdateStaffAccountRequest) =>
    await callApi(
      {
        method: 'put',
        url: `/user/update-staff`,
        data: data,
      },
      true,
    ),
);

export const deactivateUser = createAppAsyncThunk(
  `${TypePrefix}/deactivateUser`,
  async (userId: number) =>
    await callApi(
      {
        method: 'delete',
        url: `/user/deactivate-staff/${userId}`,
      },
      true,
    ),
);
