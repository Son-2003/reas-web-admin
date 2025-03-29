import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';
import {
  FEEDBACK_USER_MANAGEMENT_ROUTE,
  ITEM_MANAGEMENT_DETAIL_ROUTE,
  ITEM_REQUEST_DETAIL_ROUTE,
  ITEM_REQUEST_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  STAFFS_MANAGEMENT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from '@/common/constants/router';
import AppShell from '@/components/app-shell';

import { createBrowserRouter } from 'react-router-dom';
import ItemRequestPage from '@/app/item-request/page';
import UsersManagementPage from '@/app/search-users/page';
import ItemManagementPage from '@/app/item/page';
import ItemRequestDetailPage from '@/app/item-request-detail/page';
import ItemDetailPage from '@/app/item-detail/page';
import FeedbackUserPage from '@/app/feedback-user/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: USERS_MANAGEMENT_ROUTE,
        element: <UsersManagementPage />,
      },
      {
        path: STAFFS_MANAGEMENT_ROUTE,
        element: <UsersManagementPage />,
      },
      {
        path: ITEM_REQUEST_ROUTE,
        element: <ItemRequestPage />,
      },
      {
        path: ITEM_REQUEST_DETAIL_ROUTE,
        element: <ItemRequestDetailPage />,
      },
      {
        path: ITEMS_MANAGEMENT_ROUTE,
        element: <ItemManagementPage />,
      },
      {
        path: ITEM_MANAGEMENT_DETAIL_ROUTE,
        element: <ItemDetailPage />,
      },
      {
        path: FEEDBACK_USER_MANAGEMENT_ROUTE,
        element: <FeedbackUserPage />,
      }
    ],
  },
]);

export default router;
