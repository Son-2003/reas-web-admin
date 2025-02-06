import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';
import AppShell from '@/components/app-shell';
import { createBrowserRouter /*, Navigate */ } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AppShell />, // Bọc toàn bộ admin trong AppShell
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      // {
      //   path: "/admin/location",
      //   element: <Location />,
      // },
      // {
      //   path: "/admin/location/:locationId",
      //   element: <LocationDetail />,
      // },
    ],
  },
]);

export default router;
