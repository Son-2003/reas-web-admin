import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchItems } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { Item } from '@/common/models/item';

export interface ItemSearchState {
  searchResults: Item[];
  searchStatus: ApiStatus;
}

export const initialState: ItemSearchState = {
  searchResults: [],
  searchStatus: ApiStatus.Idle,
};

const itemSearchSlice = createSlice({
  name: 'itemSearch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchItems.pending, (state) => {
        state.searchStatus = ApiStatus.Loading;
      })
      .addCase(
        searchItems.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.searchStatus = ApiStatus.Fulfilled;
          state.searchResults = action.payload;
        },
      )
      .addCase(searchItems.rejected, (state) => {
        state.searchStatus = ApiStatus.Failed;
      });
  },
});

export default itemSearchSlice.reducer;
