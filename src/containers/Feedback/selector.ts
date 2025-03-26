import { ReduxState } from '@/lib/redux/store';

export const selectSearchResults = (state: ReduxState) =>
  state.itemSearch.searchResults;
export const selectSearchStatus = (state: ReduxState) =>
  state.itemSearch.searchStatus;
