import { ReduxState } from '@/lib/redux/store';

export const selectUserSearchResult = (state: ReduxState) =>
  state.userManagement.userPaginationResponse;
