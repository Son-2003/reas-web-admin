import userReducer from '@/containers/Auth/slice';
import userManagemetReducer from '@/containers/UsersManagement/slice';
import itemManagementReducer from '@/containers/ItemRequest/slice';

export const reducer = {
  user: userReducer,
  userManagement: userManagemetReducer,
  itemManagement: itemManagementReducer,
};
