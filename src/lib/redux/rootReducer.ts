import userReducer from '@/containers/Auth/slice';
import userManagementReducer from '@/containers/UsersManagement/slice';
import pendingItemsReducer from '@/containers/ItemRequest/slice';
import itemManagementReducer from '@/containers/ItemManagement/slice';
import feedbackManagementReducer from '@/containers/Feedback/slice';
import exchangeHistoryManagementReducer from '@/containers/ExchangeHistory/slice';
import paymentHistoryReducer from '@/containers/PaymentHistoryManagement/slice';
import paymentHistoryByUserIdReducer from '@/containers/PaymentHistoryManagementByUserId/slice';
import dashboardManagementReducer from '@/containers/DashBoard/slice';
import subscriptionPlanReducer from '@/containers/SubcriptionPlanManagement/slice';
import chatReducer from '@/containers/Chat/slice';
import notificationReducer from '@/containers/Notification/slice';
export const reducer = {
  user: userReducer,
  userManagement: userManagementReducer,
  pendingItems: pendingItemsReducer,
  itemManagement: itemManagementReducer,
  feedbackManagement: feedbackManagementReducer,
  exchangeHistoryManagement: exchangeHistoryManagementReducer,
  paymentHistory: paymentHistoryReducer,
  paymentHistoryByUserId: paymentHistoryByUserIdReducer,
  dashboardManagement: dashboardManagementReducer,
  subscriptionPlan: subscriptionPlanReducer,
  chat: chatReducer,
  notification: notificationReducer,
};
