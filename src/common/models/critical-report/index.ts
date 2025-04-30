import {
  StatusCriticalReport,
  TypeCriticalReport,
} from '@/common/enums/criticalReport';
import { UserDto } from '../user';
import { Item } from '../item';

export interface CriticalReportResponse {
  id: number;
  typeReport: TypeCriticalReport;
  contentReport: string;
  contentResponse: string;
  imageUrl: string;
  approvedTime: string;
  creationDate: string;
  lastModificationDate: string;
  statusCriticalReport: StatusCriticalReport;
  resident: UserDto;
  reporter: UserDto;
  answerer: UserDto;
  exchangeRequest: ExchangeResponse;
  feedback: FeedbackResponse;
}

export interface SearchCriticalReportRequest {
  ids?: number[] | null;
  typeReports?: TypeCriticalReport[] | null;
  userFullName?: string | null;
  residentIds?: number[] | null;
  feedbackIds?: number[] | null;
  exchangeRequestIds?: number[] | null;
  reporterName?: string | null;
  reporterIds?: number[] | null;
  answererName?: string | null;
  answererIds?: number[] | null;
  statusCriticalReports?: StatusCriticalReport[] | null;
}

export interface FeedbackResponse {
  rating: number;
  comment: string;
  imageUrl: string;
}

export interface ExchangeResponse {
  finalPrice: number;
  paidBy: UserDto;
  exchangeDate: string;
  exchangeLocation: string;
  sellerItem: Item;
  buyerItem: Item;
}

export interface CriticalReportStaffRequest {
  id: number;
  contentResponse: string;
  isResolved: boolean;
}
