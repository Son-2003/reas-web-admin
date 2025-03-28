import userReducer from '@/containers/Auth/slice';
import userManagementReducer from '@/containers/UsersManagement/slice';
import pendingItemsReducer from '@/containers/ItemRequest/slice'; 
import itemManagementReducer from '@/containers/ItemManagement/slice';

export const reducer = {
  user: userReducer,
  userManagement: userManagementReducer,
  pendingItems: pendingItemsReducer, 
  itemManagement: itemManagementReducer,
};
