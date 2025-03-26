import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';
import {
  ITEM_REQUEST_DETAIL_ROUTE,
  ITEM_REQUEST_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  STAFFS_MANAGEMENT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from '@/common/constants/router';
import AppShell from '@/components/app-shell';

import { createBrowserRouter } from 'react-router-dom';
import ItemRequestPage from '@/app/item-request/page';
import { ItemRequestDetail } from '@/containers/ItemRequest/detail';
import UsersManagementPage from '@/app/search-users/page';
import ItemManagementPage from '@/app/item/page';

// Import trang chi tiết

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
        path: ITEM_REQUEST_DETAIL_ROUTE, // Thêm route chi tiết
        element: <ItemRequestDetail />,
      },
      {
        path: ITEMS_MANAGEMENT_ROUTE,
        element: <ItemManagementPage />,
      }
    ],
  },
]);

export default router;
