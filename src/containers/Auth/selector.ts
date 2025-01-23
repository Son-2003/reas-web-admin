import { ReduxState } from '@/lib/redux/store';

export const selectUserToken = (state: ReduxState) => state.user.token;

export const selectUserInfo = (state: ReduxState) => state.user.userInfo;

export const selectUserStatus = (state: ReduxState) => state.user.status;
