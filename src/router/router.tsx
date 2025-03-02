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
import { UsersManagement } from '@/containers/UsersManagement/SearchUser';
import { createBrowserRouter /*, Navigate */ } from 'react-router-dom';

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
        element: <UsersManagement />,
      },
      {
        path: STAFFS_MANAGEMENT_ROUTE,
        element: <UsersManagement />,
      },
      {
        path: CREATE_STAFF_ACCOUNT_ROUTE,
        element: <CreateAccountUserPage />,
      },
      {
        path: EDIT_STAFF_ACCOUNT_ROUTE,
        element: <CreateAccountUserPage />,
      },
    ],
  },
]);

export default router;
