import { Item, Owner } from '../item';

export interface Feedback {
  id: number;
  user: Owner;
  exchangeHistory: ExchangeHistory;
  item: Item;
  rating: number;
  comment: string;
  imageUrl: string;
  creationDate: string;
  updated: boolean;
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
