import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { PaymentHistory } from '@/common/models/payment-history';
import { useTranslation } from 'react-i18next';
import { MethodPayment } from '@/common/enums/methodPayment';
import { StatusPayment } from '@/common/enums/statusPayment';

export const usePaymentHistorycolumns = (): ColumnDef<PaymentHistory>[] => {
  const { t } = useTranslation();
  const MethodPaymentLabelsArray = [
    {
      label: t('paymentHistory.methodPaymentCash'),
      value: MethodPayment.CASH,
      color: 'bg-gray-300',
      border: 'border-gray-500',
    },
    {
      label: t('paymentHistory.methodPaymentBankTransfer'),
      value: MethodPayment.BANK_TRANSFER,
      color: 'bg-blue-300',
      border: 'border-blue-500',
    },
    {
      label: t('paymentHistory.methodPaymentCreditCard'),
      value: MethodPayment.CREDIT_CARD,
      color: 'bg-red-300',
      border: 'border-red-500',
    },
    {
      label: t('paymentHistory.methodPaymentPayPal'),
      value: MethodPayment.PAYPAL,
      color: 'bg-blue-400',
      border: 'border-blue-600',
    },
    {
      label: t('paymentHistory.methodPaymentApplePay'),
      value: MethodPayment.APPLE_PAY,
      color: 'bg-gray-400',
      border: 'border-gray-600',
    },
    {
      label: t('paymentHistory.methodPaymentVisa'),
      value: MethodPayment.VISA,
      color: 'bg-green-300',
      border: 'border-green-500',
    },
    {
      label: t('paymentHistory.methodPaymentMasterCard'),
      value: MethodPayment.MASTER_CARD,
      color: 'bg-yellow-300',
      border: 'border-yellow-500',
    },
    {
      label: t('paymentHistory.methodPaymentOther'),
      value: MethodPayment.OTHER,
      color: 'bg-purple-300',
      border: 'border-purple-500',
    },
  ];

  return [
    {
      accessorKey: 'transactionId',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('paymentHistory.transactionId')}
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('paymentHistory.amount')}
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-bold">
          {row.original.amount.toLocaleString()}
        </span>
      ),
      enableSorting: true, // bật sort
    },
    {
      accessorKey: 'methodPayment',
      header: t('paymentHistory.methodPayment'),
      cell: ({ row }) => {
        const method = MethodPaymentLabelsArray.find(
          (item) => item.value === row.original.methodPayment,
        );

        return (
          <span
            className={`px-2 py-1 rounded ${method ? method.color : 'bg-gray-100'} ${method ? method.border : 'border-gray-400'}`}
          >
            {method ? method.label : 'Unknown'}
          </span>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'description',
      header: t('paymentHistory.description'),
      cell: ({ row }) => {
        const status = row.original.description;
        let statusColor = 'text-gray-600';

        if (status === 'PAY FOR PREMIUM PLAN') {
          statusColor = 'text-blue-600';
        } else if (status === 'PAY FOR EXTENSION PLAN') {
          statusColor = 'text-green-600';
        }

        return <span className={`font-bold ${statusColor}`}>{status}</span>;
      },
      enableSorting: false,
    },

    {
      accessorKey: 'status',
      header: t('paymentHistory.statusPayment'),
      cell: ({ row }) => {
        const status = row.original.statusPayment;

        let statusColor = 'text-gray-600';
        let statusLabel = '';

        switch (status) {
          case StatusPayment.SUCCESS:
            statusColor = 'text-green-600';
            statusLabel = t('paymentHistory.statusSuccess');
            break;
          case StatusPayment.FAILED:
            statusColor = 'text-red-600';
            statusLabel = t('paymentHistory.statusFailed');
            break;
          case StatusPayment.PENDING:
            statusColor = 'text-yellow-600';
            statusLabel = t('paymentHistory.statusPending');
            break;
          default:
            statusLabel = t('paymentHistory.statusUnknown');
            break;
        }

        return (
          <span className={`font-bold ${statusColor}`}>{statusLabel}</span>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('paymentHistory.date')}
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.original.transactionDateTime);
        const formattedDate = new Intl.DateTimeFormat('vi-VN', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }).format(date);
        return <span>{formattedDate}</span>;
      },
      enableSorting: true, // bật sort
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.transactionDateTime).getTime();
        const dateB = new Date(rowB.original.transactionDateTime).getTime();
        return dateA - dateB;
      },
    },
    {
      accessorKey: 'time',
      header: t('paymentHistory.time'),
      cell: ({ row }) => {
        const date = new Date(row.original.transactionDateTime);
        const formattedTime = new Intl.DateTimeFormat('vi-VN', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        }).format(date);
        return <span>{formattedTime}</span>;
      },
      enableSorting: false,
    },
  ];
};
