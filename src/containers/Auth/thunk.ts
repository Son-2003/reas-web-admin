import { AccountSignIn, AccountSignUp, UserDto } from '@/common/models/user';
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import { UserToken } from '@/common/models/user';
import callApi from '@/utils/api';
import Cookies from 'js-cookie';

const TypePrefix = 'user';

export const signIn = createAppAsyncThunk(
  `${TypePrefix}/signin`,
  async (data: AccountSignIn) => {
    // Log phần data trước khi gọi API
    console.log('SignIn data sent:', {
      ...data,
      registrationTokens: data.registrationTokens || [],
    });

    const response = await callApi({
      method: 'post',
      url: '/auth/login',
      data: {
        ...data,
        registrationTokens: data.registrationTokens || [],
      },
    });

    const userToken: UserToken = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };

    return userToken;
  },
);

export const signUp = createAppAsyncThunk(
  `${TypePrefix}/signup`,
  async (data: AccountSignUp) => {
    const response = await callApi({
      method: 'post',
      url: '/auth/register/user',
      data: data,
    });

    const userToken: UserToken = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };

    Cookies.set('access-token', userToken.accessToken);
    Cookies.set('refresh-token', userToken.refreshToken);

    return userToken;
  },
);

export const refreshToken = createAppAsyncThunk(
  `${TypePrefix}/refreshToken`,
  async () => {
    const response = await callApi(
      {
        method: 'post',
        url: '/auth/refresh_token',
      },
      false,
      true,
    );

    const userToken: UserToken = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };

    return userToken;
  },
);

export const getUserInfo = createAppAsyncThunk(
  `${TypePrefix}/getUserInfo`,
  async () => {
    const response = await callApi(
      {
        method: 'get',
        url: '/auth/info',
      },
      true,
    );

    const userInfo: UserDto = response;

    return userInfo;
  },
);
export const logout = createAppAsyncThunk(`${TypePrefix}/logout`, async () => {
  await callApi({
    method: 'get',
    url: '/logout',
  }),
    true;
  Cookies.remove('access-token');
  Cookies.remove('refresh-token');
});
