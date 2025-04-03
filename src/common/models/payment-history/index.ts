import { MethodPayment } from "@/common/enums/methodPayment";
import { StatusPayment } from "@/common/enums/statusPayment";

export interface PaymentHistory {
    id: number;
    transactionId: number;
    amount: number;
    description: string;
    transactionDateTime: string;
    statusPayment: StatusPayment;
    methodPayment: MethodPayment;
    startDate: string;
    endDate: string;
    planName: string;
    typeSubscriptionPlan: string;
    duration: number;
} 