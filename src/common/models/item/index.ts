export interface Item {
  id: string;
  itemName: string;
  description: string;
  price: number;
  conditionItem: string;
  imageUrl: string;
  methodExchanges: string[];
  isMoneyAccepted: boolean;
  statusItem: string;
  typeExchange: string;
  typeItem: string;
  termsAndConditionsExchange: string;
  category: Category;
  brand: Brand;
  owner: Owner;
  desiredItem?: DesiredItem;
}

export interface DesiredItem {
  typeItem: string;
  categoryId: number;
  brandId: number;
  conditionItem: string;
  minPrice: number;
  maxPrice: number;
}

export interface Owner {
  id: number;
  userName: string;
  email: string;
  phone: number;
  gender: string;
  statusEntity: string;
  image: string;
  roleName: string;
  numOfExchangedItems: number;
  numOfFeedbacks: number;
  numOfRatings: number;
  userLocations: UserLocations[];
  

}

export interface Category{
  categoryName: string;
} 
export interface Brand{
  brandName: string;
  imgage: string;
}

export interface UserLocations {
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
