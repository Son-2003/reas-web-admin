import { ReduxState } from '@/lib/redux/store';

export const selectUserSearchResult = (state: ReduxState) =>
  state.userManagement.userPaginationResponse;

export const selectStaffAccountRegistrationResult = (state: ReduxState) =>
  state.userManagement.userInfo;
