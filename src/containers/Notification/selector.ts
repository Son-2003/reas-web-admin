import { ReduxState } from '@/lib/redux/store';
import { NotificationDto } from '@/common/models/notification';
import { ApiStatus } from '@/common/enums/apiStatus';

export const selectNotificationToken = (state: ReduxState): string | null =>
  state.notification.token;

export const selectNotifications = (
  state: ReduxState,
): NotificationDto[] | null => state.notification.notifications || null;

export const selectNotificationsStatus = (state: ReduxState): ApiStatus =>
  state.notification.fetchNotificationsStatus;

export const selectNotificationErrorMessage = (
  state: ReduxState,
): string | undefined => state.notification.errorMessage;
