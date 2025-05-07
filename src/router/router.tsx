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
  SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE,
  CREATE_STAFF_ACCOUNT_ROUTE,
  CREATE_SUBSCRIPTION_PLAN_ROUTE,
  UPDATE_SUBSCRIPTION_PLAN_ROUTE,
  EDIT_STAFF_ACCOUNT_ROUTE,
  ACCOUNT_DETAIL_ROUTE,
  CHAT_ROUTE,
  CRITICAL_REPORT_MANAGEMENT_ROUTE,
  REPLY_CRITICAL_REPORT_ROUTE,
  EDIT_USER_ACCOUNT_ROUTE,
  ACCOUNT_DETAIL_USER_ROUTE,
} from '@/common/constants/router';
import ProtectedRoute from './protectedRoute';
import PaymentHistoryPage from '@/app/payment-history/page';
import PaymentHistoryByUserPage from '@/app/payment-history-by-user/page';
import SubscriptionPlanManagementPage from '@/app/subscription-plan/page';
import CreateUpdateUserPage from '@/app/create-account-user/page';
import CreateSubscriptionPlanPage from '@/app/create-subscription-plan/page';
import UpdateSubscriptionPlanPage from '@/app/update-subscription-plan/page';
import AccountDetailPage from '@/app/user-detail/page';
import ChatPage from '@/app/chat/page';
import CriticalReportPage from '@/app/critical-report/page';
import ReplyCriticalReportPage from '@/app/reply-critical-report/page';
import AdminRoute from './adminRoute';
import StaffRoute from './staffRoute';

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
            element: <StaffRoute />,
            children: [
              {
                path: ITEM_REQUEST_ROUTE,
                element: <ItemRequestPage />,
              },
              {
                path: ITEM_REQUEST_DETAIL_ROUTE,
                element: <ItemRequestDetailPage />,
              },
            ],
          },

          {
            element: <AdminRoute />,
            children: [
              {
                path: SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE,
                element: <SubscriptionPlanManagementPage />,
              },
              {
                path: CREATE_SUBSCRIPTION_PLAN_ROUTE,
                element: <CreateSubscriptionPlanPage />,
              },
              {
                path: UPDATE_SUBSCRIPTION_PLAN_ROUTE,
                element: <UpdateSubscriptionPlanPage />,
              },
              {
                path: STAFFS_MANAGEMENT_ROUTE,
                element: <UsersManagementPage />,
              },
              {
                path: CREATE_STAFF_ACCOUNT_ROUTE,
                element: <CreateUpdateUserPage />,
              },
              {
                path: EDIT_STAFF_ACCOUNT_ROUTE,
                element: <CreateUpdateUserPage />,
              },
              {
                path: ACCOUNT_DETAIL_ROUTE,
                element: <AccountDetailPage />,
              },
            ],
          },

          {
            path: USERS_MANAGEMENT_ROUTE,
            element: <UsersManagementPage />,
          },

          {
            path: EDIT_USER_ACCOUNT_ROUTE,
            element: <CreateUpdateUserPage />,
          },

          {
            path: ACCOUNT_DETAIL_USER_ROUTE,
            element: <AccountDetailPage />,
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
          {
            path: CRITICAL_REPORT_MANAGEMENT_ROUTE,
            element: <CriticalReportPage />,
          },
          {
            path: REPLY_CRITICAL_REPORT_ROUTE,
            element: <ReplyCriticalReportPage />,
          },
          {
            path: CHAT_ROUTE,
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
