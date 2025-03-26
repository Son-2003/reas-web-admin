import userReducer from '@/containers/Auth/slice';
import userManagementReducer from '@/containers/UsersManagement/slice';
import itemManagementReducer from '@/containers/ItemRequest/slice';
import itemSearchReducer from '@/containers/ItemManagement/slice'; // Import reducer mới

export const reducer = {
  user: userReducer,
  userManagement: userManagementReducer,
  itemManagement: itemManagementReducer,
  itemSearch: itemSearchReducer, // Thêm reducer cho tìm kiếm item
};
