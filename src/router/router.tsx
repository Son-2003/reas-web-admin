import { createBrowserRouter } from 'react-router-dom';
import AppShell from '@/components/app-shell';
import LoginPage from '@/app/login/page';
import DashboardPage from '@/app/dashboard/page';
import UsersManagementPage from '@/app/search-users/page';
import ItemManagementPage from '@/app/item/page';
import ItemRequestPage from '@/app/item-request/page';
import ItemRequestDetailPage from '@/app/item-request-detail/page';
import ItemDetailPage from '@/app/item-detail/page';
import FeedbackUserPage from '@/app/feedback-user/page';
import ExchangeHistoryPage from '@/app/exchange-history/page';
import FeedbackUserDetailPage from '@/app/feedback-user-detail/page';
import ExchangeHistoryDetailPage from '@/app/exchange-history-detail/page';

import {
  USERS_MANAGEMENT_ROUTE,
  STAFFS_MANAGEMENT_ROUTE,
  ITEM_REQUEST_ROUTE,
  ITEM_REQUEST_DETAIL_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  ITEM_MANAGEMENT_DETAIL_ROUTE,
  FEEDBACK_USER_MANAGEMENT_ROUTE,
  EXCHANGE_HISTORY_MANAGEMENT_ROUTE,
  FEEDBACK_USER_MANAGEMENT_DETAIL_ROUTE,
  EXCHANGE_HISTORY_MANAGEMENT_DETAIL_ROUTE,
  PAYMENT_HISTORY_MANAGEMENT_ROUTE,
  PAYMENT_HISTORY_BY_USER_MANAGEMENT_ROUTE,
} from '@/common/constants/router';
import ProtectedRoute from './protectedRoute';
import PaymentHistoryPage from '@/app/payment-history/page';
import PaymentHistoryByUserPage from '@/app/payment-history-by-user/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
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
          },
          {
            path: FEEDBACK_USER_MANAGEMENT_DETAIL_ROUTE,
            element: <FeedbackUserDetailPage />,
          },
          {
            path: EXCHANGE_HISTORY_MANAGEMENT_ROUTE,
            element: <ExchangeHistoryPage />,
          },
          {
            path: EXCHANGE_HISTORY_MANAGEMENT_DETAIL_ROUTE,
            element: <ExchangeHistoryDetailPage />,
          },
          {
            path: PAYMENT_HISTORY_MANAGEMENT_ROUTE,
            element: <PaymentHistoryPage />,
          },
          {
            path: PAYMENT_HISTORY_BY_USER_MANAGEMENT_ROUTE,
            element: <PaymentHistoryByUserPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
