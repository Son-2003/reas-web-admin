import { MethodExchange } from '@/common/enums/methodExchange';
import { Item, Owner } from '../item';

export interface ExchangeHistoryByUserId {
  id: number;
  sellerItem: Item;
  buyerItem: Item;
  paidBy: Owner;
  exchangeDate: string;
  exchangeLocation: string;
  estimatePrice: number;
  finalPrice: number;
  numberOfOffer: number;
  methodExchange: MethodExchange;
  statusExchangeRequest: string;
  buyerConfirmation: boolean;
  sellerConfirmation: boolean;
  additionalNotes: string;
  creationDate: string;
  exchangeHistory: ExchangeHistory;
  feedbackId: number | null;
}

export interface ExchangeHistory {
  id: number;
  buyerConfirmation: boolean;
  sellerConfirmation: boolean;
  buyerImageUrl: string | null;
  sellerImageUrl: string | null;
  buyerAdditionalNotes: string | null;
  sellerAdditionalNotes: string | null;
  statusExchangeHistory: string;
}
