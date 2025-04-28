import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThemeSwitch from '@/components/theme-switch';
import LanguageSwitch from '@/components/lang-switch';
import { UserNav } from '@/containers/DashBoard/components/user-nav';
import NotificationDropdown from './notification';
import {
  selectNotifications,
  selectNotificationsStatus,
  selectNotificationErrorMessage,
  selectNotificationTotalPages,
  selectNotificationCurrentPage,
} from '@/containers/Notification/selector';
import { getNotificationsOfCurrentUserThunk } from '@/containers/Notification/thunk';
import { selectUserInfo } from '@/containers/Auth/selector';
import { ReduxDispatch } from '@/lib/redux/store';
import { ApiStatus } from '@/common/enums/apiStatus';

const AppHeader: React.FC = () => {
  const dispatch = useDispatch<ReduxDispatch>();
  const userInfo = useSelector(selectUserInfo);
  const username = userInfo?.userName || '';
  const notifications = useSelector(selectNotifications);
  const fetchStatus = useSelector(selectNotificationsStatus);
  const errorMessage = useSelector(selectNotificationErrorMessage);
  const totalPages = useSelector(selectNotificationTotalPages);
  const currentPage = useSelector(selectNotificationCurrentPage);

  useEffect(() => {
    if (username) {
      dispatch(
        getNotificationsOfCurrentUserThunk({
          pageNo: 1,
          pageSize: 10,
          username,
        }),
      );
    }
  }, [dispatch, username]);

  return (
    <header className="border-b flex place-content-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4"></div>
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <NotificationDropdown
            notificationCount={notifications.length}
            isLoading={fetchStatus === ApiStatus.Loading}
            errorMessage={errorMessage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <ThemeSwitch />
          <LanguageSwitch />
        </div>
        <UserNav />
      </div>
    </header>
  );
};

export default AppHeader;
