import { ConditionItem } from '@/common/enums/conditionItem';
import { Gender } from '@/common/enums/gender';
import { MethodExchange } from '@/common/enums/methodExchange';
import { Role } from '@/common/enums/role';
import { StatusItem } from '@/common/enums/statusItem';
import { TypeExchange } from '@/common/enums/typeExchange';

export interface Item {
  id: string;
  itemName: string;
  description: string;
  price: number;
  conditionItem: ConditionItem;
  imageUrl: string;
  methodExchanges: MethodExchange[];
  isMoneyAccepted: boolean;
  statusItem: StatusItem;
  typeExchange: TypeExchange;
  typeItem: TypeExchange;
  termsAndConditionsExchange: string;
  category: Category;
  brand: Brand;
  owner: Owner;
  desiredItem?: DesiredItem;
}

export interface DesiredItem {
  typeItem: TypeExchange;
  categoryId: number;
  brandId: number;
  conditionItem: ConditionItem;
  minPrice: number;
  maxPrice: number;
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
