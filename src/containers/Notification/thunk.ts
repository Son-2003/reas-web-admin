import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import callApi from '@/utils/api';
import {
  GetNotificationRequest,
  NotificationResponse,
} from '@/common/models/notification';
import { NotificationDto } from '@/common/models/notification';

const TypePrefix = 'Notification';

export const setRegistrationTokenThunk = createAppAsyncThunk<string, string>(
  `${TypePrefix}/setRegistrationToken`,
  async (token) => token,
);

export const getNotificationsOfCurrentUserThunk = createAppAsyncThunk<
  {
    notifications: NotificationDto[];
    totalPages: number;
    totalRecords: number;
    currentPage: number;
  },
  GetNotificationRequest
>(`${TypePrefix}/getNotificationsOfCurrentUser`, async (request) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('pageNo', request.pageNo.toString());
    queryParams.append('pageSize', request.pageSize.toString());
    if (request.username) {
      queryParams.append('username', request.username);
    }

    const response = (await callApi({
      method: 'get',
      url: `/notification/get-notifications-of-user?${queryParams.toString()}`,
    })) as NotificationResponse;

    if (!response || !Array.isArray(response.content)) {
      throw new Error('Invalid response format from API');
    }

    return {
      notifications: response.content as NotificationDto[],
      totalPages: response.totalPages ?? 1,
      totalRecords: response.totalRecords ?? 0,
      currentPage: response.pageNo ?? request.pageNo,
    };
  } catch (error) {
    console.error('Error in getNotificationsOfCurrentUser:', error);
    throw error;
  }
});
