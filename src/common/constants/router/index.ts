const HOME_ROUTE = '/';
const DASHBOARD_ROUTE = '/admin';
const CREATE_STAFF_ACCOUNT_ROUTE = '/admin/create-account-staff';
const EDIT_STAFF_ACCOUNT_ROUTE = '/admin/edit-staff/:staffId';
const USERS_MANAGEMENT_ROUTE = '/admin/users-management';
const STAFFS_MANAGEMENT_ROUTE = '/admin/staffs-management';
const ITEM_REQUEST_ROUTE = '/admin/item-request';
const ITEM_REQUEST_DETAIL_ROUTE = '/admin/item-request/:id';
const ITEMS_MANAGEMENT_ROUTE = '/admin/items-management/:id';
const ITEM_MANAGEMENT_DETAIL_ROUTE = '/admin/items-management/:userId/:itemId';
const FEEDBACK_USER_MANAGEMENT_ROUTE =
  '/admin/feedback-user-management/:userId';
const FEEDBACK_USER_MANAGEMENT_DETAIL_ROUTE =
  '/admin/feedback-user-management/:userId/:feedbackId';
const EXCHANGE_HISTORY_MANAGEMENT_ROUTE =
  '/admin/exchange-history-management/:userId';
const EXCHANGE_HISTORY_MANAGEMENT_DETAIL_ROUTE =
  '/admin/exchange-history-management/:userId/:exchangeHistoryId';
const PAYMENT_HISTORY_MANAGEMENT_ROUTE = '/admin/payment-history-management';
const PAYMENT_HISTORY_BY_USER_MANAGEMENT_ROUTE =
  '/admin/payment-history-management/:userId';
const SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE =
  '/admin/subscription-plan-management';
const CREATE_SUBSCRIPTION_PLAN_ROUTE = '/admin/create-subscription-plan';
const UPDATE_SUBSCRIPTION_PLAN_ROUTE = '/admin/update-subscription-plan/:id';
const ACCOUNT_DETAIL_ROUTE = '/admin/account-detail/:staffId';
const CHAT_ROUTE = '/admin/chat';

export {
  HOME_ROUTE,
  DASHBOARD_ROUTE,
  CREATE_STAFF_ACCOUNT_ROUTE,
  EDIT_STAFF_ACCOUNT_ROUTE,
  USERS_MANAGEMENT_ROUTE,
  STAFFS_MANAGEMENT_ROUTE,
  ITEM_REQUEST_ROUTE,
  ITEM_REQUEST_DETAIL_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  ITEM_MANAGEMENT_DETAIL_ROUTE,
  FEEDBACK_USER_MANAGEMENT_ROUTE,
  FEEDBACK_USER_MANAGEMENT_DETAIL_ROUTE,
  EXCHANGE_HISTORY_MANAGEMENT_ROUTE,
  EXCHANGE_HISTORY_MANAGEMENT_DETAIL_ROUTE,
  PAYMENT_HISTORY_MANAGEMENT_ROUTE,
  PAYMENT_HISTORY_BY_USER_MANAGEMENT_ROUTE,
  SUBSCRIPTION_PLAN_MANAGEMENT_ROUTE,
  CREATE_SUBSCRIPTION_PLAN_ROUTE,
  UPDATE_SUBSCRIPTION_PLAN_ROUTE,
  ACCOUNT_DETAIL_ROUTE,
  CHAT_ROUTE,
};
