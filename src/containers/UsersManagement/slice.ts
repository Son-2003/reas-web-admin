import { ResponseEntityPagination } from '@/common/models/pagination';
import { UserDto } from '@/common/models/user';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { createStaffAccount, searchUser } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';

export interface UserSliceState {
  userPaginationResponse: ResponseEntityPagination<UserDto> | undefined;
  userInfo: UserDto | undefined;
  status: ApiStatus;
}

export const initialState: UserSliceState = {
  userPaginationResponse: undefined,
  userInfo: undefined,
  status: ApiStatus.Idle,
};

const userManagemetSlice = createSlice({
  name: 'userManagemet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    setUserPaginationResponse(builder);
    setAccountStaffResponse(builder);
  },
});

function setUserPaginationResponse(
  builder: ActionReducerMapBuilder<UserSliceState>,
) {
  builder
    .addCase(searchUser.pending, (state: UserSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      searchUser.fulfilled,
      (
        state: UserSliceState,
        action: PayloadAction<ResponseEntityPagination<UserDto>>,
      ) => {
        state.status = ApiStatus.Fulfilled;
        state.userPaginationResponse = action.payload;
      },
    )
    .addCase(searchUser.rejected, (state: UserSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

function setAccountStaffResponse(
  builder: ActionReducerMapBuilder<UserSliceState>,
) {
  builder
    .addCase(createStaffAccount.pending, (state: UserSliceState) => {
      state.status = ApiStatus.Loading;
    })
    .addCase(
      createStaffAccount.fulfilled,
      (state: UserSliceState, action: PayloadAction<UserDto>) => {
        state.status = ApiStatus.Fulfilled;
        state.userInfo = action.payload;
      },
    )
    .addCase(createStaffAccount.rejected, (state: UserSliceState) => {
      state.status = ApiStatus.Failed;
    });
}

export default userManagemetSlice.reducer;
