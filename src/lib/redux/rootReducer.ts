import userReducer from '@/containers/Auth/slice';
import userManagemetReducer from '@/containers/UsersManagement/slice';

export const reducer = {
  user: userReducer,
  userManagement: userManagemetReducer,
};
