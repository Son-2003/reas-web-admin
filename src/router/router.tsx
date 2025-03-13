import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';
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
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/admin/users-management',
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
