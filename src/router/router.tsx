import DashboardPage from '@/app/dashboard/page';
import LoginPage from '@/app/login/page';
import { DASHBOARD_ROUTE } from '@/common/constants/router';
import { createBrowserRouter /*, Navigate */ } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: DASHBOARD_ROUTE,
    element: <DashboardPage />,
  },
]);

export default router;
