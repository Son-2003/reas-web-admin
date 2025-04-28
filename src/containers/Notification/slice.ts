import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationDto } from '@/common/models/notification';
import { ApiStatus } from '@/common/enums/apiStatus';
import {
  getNotificationsOfCurrentUserThunk,
  setRegistrationTokenThunk,
} from './thunk';

export interface NotificationState {
  token: string | null;
  notifications: NotificationDto[];
  fetchStatus: ApiStatus;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  errorMessage?: string;
}

export const initialState: NotificationState = {
  token: null,
  notifications: [],
  fetchStatus: ApiStatus.Idle,
  totalPages: 1,
  totalRecords: 0,
  currentPage: 0,
  errorMessage: undefined,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    registerToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    resetNotificationState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    // setRegistrationTokenThunk
    builder
      .addCase(setRegistrationTokenThunk.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        setRegistrationTokenThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.fetchStatus = ApiStatus.Fulfilled;
          state.token = action.payload;
        },
      )
      .addCase(setRegistrationTokenThunk.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Failed to register token.';
      });

    // getNotificationsOfCurrentUserThunk
    builder
      .addCase(getNotificationsOfCurrentUserThunk.pending, (state) => {
        state.fetchStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        getNotificationsOfCurrentUserThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            notifications: NotificationDto[];
            totalPages: number;
            totalRecords: number;
            currentPage: number;
          }>,
        ) => {
          state.fetchStatus = ApiStatus.Fulfilled;
          state.notifications = action.payload.notifications;
          state.totalPages = action.payload.totalPages;
          state.totalRecords = action.payload.totalRecords;
          state.currentPage = action.payload.currentPage;
          state.errorMessage = undefined;
        },
      )
      .addCase(getNotificationsOfCurrentUserThunk.rejected, (state, action) => {
        state.fetchStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Failed to fetch notifications.';
      });
  },
});

export const { registerToken, clearToken, resetNotificationState } =
  notificationSlice.actions;
export default notificationSlice.reducer;
