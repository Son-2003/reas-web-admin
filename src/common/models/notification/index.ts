import { TypeNotification } from '@/common/enums/typeNotification';

export interface NotificationDto {
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  contentType: string;
  notificationType: TypeNotification;
}

export interface NotificationResponse {
  content: NotificationDto[];
  last: boolean;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export interface GetNotificationRequest {
  pageNo: number;
  pageSize: number;
  username: string | undefined;
}
