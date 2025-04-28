import { ReduxState } from '@/lib/redux/store';
import { NotificationDto } from '@/common/models/notification';
import { ApiStatus } from '@/common/enums/apiStatus';

// Basic selectors
export const selectNotificationToken = (state: ReduxState): string | null =>
  state.notification.token;

export const selectNotifications = (state: ReduxState): NotificationDto[] =>
  state.notification.notifications;

export const selectNotificationsStatus = (state: ReduxState): ApiStatus =>
  state.notification.fetchStatus;

export const selectNotificationErrorMessage = (
  state: ReduxState,
): string | undefined => state.notification.errorMessage;

export const selectNotificationTotalPages = (state: ReduxState): number =>
  state.notification.totalPages;

export const selectNotificationTotalRecords = (state: ReduxState): number =>
  state.notification.totalRecords;

export const selectNotificationCurrentPage = (state: ReduxState): number =>
  state.notification.currentPage;
