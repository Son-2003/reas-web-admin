import { Gender } from '@/common/enums/gender';
import { Role } from '@/common/enums/role';
import { StatusEntity } from '@/common/enums/statusEntity';

export interface SearchUserRequest {
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  genders: Gender[];
  statusEntities: StatusEntity[];
  roleNames: Role[];
}

export interface UserDto {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  statusEntity: StatusEntity;
  image: string;
  roleName: Role;
}

export interface AccountSignIn {
  userNameOrEmailOrPhone: string;
  password: string;
  registrationTokens: string[];
}

export interface AccountSignUp {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  gender: string;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}

export interface CreateStaffAccountRequest {
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  image: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateStaffAccountRequest {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  image: string;
  password: string;
  confirmPassword: string;
}
