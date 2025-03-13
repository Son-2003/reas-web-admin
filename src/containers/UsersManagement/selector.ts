import { ReduxState } from '@/lib/redux/store';

export const selectUserSearchResult = (state: ReduxState) =>
  state.userManagement.userPaginationResponse;

export const selectStaffAccountRegistrationResult = (state: ReduxState) =>
  state.userManagement.userInfo;

export const selectStaffAccountInfo = (state: ReduxState) =>
  state.userManagement.userInfo;

export const selectStaffAccountUpdateResult = (state: ReduxState) =>
  state.userManagement.userInfo;
