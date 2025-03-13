export interface Item {
  itemName: string;
  description: string;
  price: number;
  conditionItem: string;
  imageUrl: string;
  methodExchanges: string[];
  isMoneyAccepted: boolean;
  typeExchange: string;
  typeItem: string;
  termsAndConditionsExchange: string;
  categoryId: number;
  brandId: number;
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
}
