import CreateAccountUserPage from '@/app/create-account-user/page';
import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';
import {
  CREATE_STAFF_ACCOUNT_ROUTE,
  EDIT_STAFF_ACCOUNT_ROUTE,
  STAFFS_MANAGEMENT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
} from '@/common/constants/router';
import AppShell from '@/components/app-shell';
import { UsersManagement } from '@/containers/UsersManagement';
import { createBrowserRouter } from 'react-router-dom';
import ItemRequestPage from '@/app/itemrequest/page';
import { ItemRequestDetail } from '@/containers/ItemRequest/detail';

// Import trang chi tiết

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AppShell />,
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: USERS_MANAGEMENT_ROUTE,
        element: <UsersManagement />,
      },
      {
        path: STAFFS_MANAGEMENT_ROUTE,
        element: <UsersManagement />,
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
