import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';
import {
  STAFFS_MANAGEMENT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from '@/common/constants/router';
import AppShell from '@/components/app-shell';

import { createBrowserRouter } from 'react-router-dom';
import ItemRequestPage from '@/app/itemrequest/page';
import { ItemRequestDetail } from '@/containers/ItemRequest/detail';
import UsersManagementPage from '@/app/search-users/page';

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
        path: '/admin/item-request',
        element: <ItemRequestPage />,
      },
      {
        path: '/admin/item-request/:id', // Thêm route chi tiết
        element: <ItemRequestDetail />,
      },
    ],
  },
]);

export default router;
