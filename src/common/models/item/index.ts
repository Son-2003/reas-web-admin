import { ConditionItem } from '@/common/enums/conditionItem';
import { Gender } from '@/common/enums/gender';
import { MethodExchange } from '@/common/enums/methodExchange';
import { Role } from '@/common/enums/role';
import { StatusItem } from '@/common/enums/statusItem';
import { TypeItem } from '@/common/enums/typeItem';

export interface Item {
  id: number;
  itemName: string;
  description: string;
  price: number;
  imageUrl: string;
  moneyAccepted: boolean;
  statusItem: StatusItem;
  conditionItem: ConditionItem;
  termsAndConditionsExchange: string;
  expiredTime: string;
  approvedTime: Date;
  methodExchanges: MethodExchange[];
  category: Category;
  brand: Brand;
  owner: Owner;
  desiredItem: DesiredItem;
  userLocation: UserLocation;
  favorite: Boolean;
  distance: string;
  typeItem: TypeItem;
}

export interface DesiredItem {
  id: number;
  categoryId: number;
  categoryName: string;
  conditionItem: ConditionItem;
  brandId: number;
  brandName: string;
  typeItem: TypeItem;
  minPrice: number;
  maxPrice: number;
  description: string;
}

export interface Owner {
  id: number;
  userName: string;
  email: string;
  phone: number;
  gender: Gender;
  statusEntity: string;
  image: string;
  roleName: Role;
  numOfExchangedItems: number;
  numOfFeedbacks: number;
  numOfRatings: number;
  userLocations: UserLocation[];
}

export interface Category {
  categoryName: string;
}
export interface Brand {
  brandName: string;
  image: string;
}

export interface UserLocation {
  id: number;
  userId: number;
  specificAddress: string;
  location: Location;
  primary: boolean;
}

export interface Location {
  id: number;
  area: string;
  province: string;
  city: string;
  district: string;
  ward: string;
  cluster: string;
}
