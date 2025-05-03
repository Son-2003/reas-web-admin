import { TypeSubscriptionPlan } from '@/common/enums/typeSubscriptionPlan';

export interface SubscriptionResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  typeSubscriptionPlan: TypeSubscriptionPlan;
  duration: number;
  numberOfFreeExtension: number;
}

export interface SubscriptionPlan {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  typeSubscriptionPlan: string;
  duration: number;
  numberOfFreeExtension: number;
}
