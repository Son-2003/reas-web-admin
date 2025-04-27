import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import {
  GetNotificationRequest,
  NotificationResponse,
} from '@/common/models/notification';

const TypePrefix = 'Notification';

export const setRegistrationTokenThunk = createAppAsyncThunk<string, string>(
  `${TypePrefix}/setRegistrationToken`,
  async (token) => token,
);

export const getNotificationsOfCurrentUserThunk = createAppAsyncThunk<
  NotificationResponse,
  GetNotificationRequest
>(`${TypePrefix}/getNotificationsOfCurrentUser`, async (request) => {
  const response = await callApi({
    method: 'get',
    url: `/notification/get-notifications-of-user?pageNo=${request.pageNo}&pageSize=${request.pageSize}&username=${request.username}`,
  });
  return response;
});
