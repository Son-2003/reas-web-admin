import LoginPage from '@/app/login/page';
import { createBrowserRouter /*, Navigate */ } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
]);

export default router;
