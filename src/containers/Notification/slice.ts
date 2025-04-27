import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  NotificationDto,
  NotificationResponse,
} from '@/common/models/notification';
import { ApiStatus } from '@/common/enums/apiStatus';
import {
  getNotificationsOfCurrentUserThunk,
  setRegistrationTokenThunk,
} from './thunk';

export interface NotificationState {
  token: string | null;
  notifications: NotificationDto[] | null;
  fetchNotificationsStatus: ApiStatus;
  errorMessage?: string;
}

export const initialState: NotificationState = {
  token: null,
  notifications: null,
  fetchNotificationsStatus: ApiStatus.Idle,
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
      state.token = null;
      state.notifications = null;
      state.fetchNotificationsStatus = ApiStatus.Idle;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    // setRegistrationTokenThunk
    builder
      .addCase(setRegistrationTokenThunk.pending, (state) => {
        state.fetchNotificationsStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        setRegistrationTokenThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.fetchNotificationsStatus = ApiStatus.Fulfilled;
          state.token = action.payload;
        },
      )
      .addCase(setRegistrationTokenThunk.rejected, (state, action) => {
        state.fetchNotificationsStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Failed to register token.';
      });

    // getNotificationsOfCurrentUserThunk
    builder
      .addCase(getNotificationsOfCurrentUserThunk.pending, (state) => {
        state.fetchNotificationsStatus = ApiStatus.Loading;
        state.errorMessage = undefined;
      })
      .addCase(
        getNotificationsOfCurrentUserThunk.fulfilled,
        (state, action: PayloadAction<NotificationResponse>) => {
          state.fetchNotificationsStatus = ApiStatus.Fulfilled;
          state.notifications = action.payload.content;
        },
      )
      .addCase(getNotificationsOfCurrentUserThunk.rejected, (state, action) => {
        state.fetchNotificationsStatus = ApiStatus.Failed;
        state.errorMessage =
          action.error.message || 'Failed to fetch notifications.';
      });
  },
});

export const { registerToken, clearToken, resetNotificationState } =
  notificationSlice.actions;
export default notificationSlice.reducer;
