import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { ExchangeHistoryByUserId } from '@/common/models/exchange-history';
import { useTranslation } from 'react-i18next';

export const useExchangeHistoryColumns =
  (): ColumnDef<ExchangeHistoryByUserId>[] => {
    const { t } = useTranslation();

    return [
      {
        accessorKey: 'id',
        sortDescFirst: true,
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            ID
            <Icons.sort className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: 'buyer',
        header: t('exchangeHistory.buyer'),
        cell: ({ row }) => (
          <span>
            {row.original.buyerItem === null
              ? row.original.buyerItem === null &&
                row.original.sellerItem.price === 0
                ? 'Free item'
                : 'Exchange with money'
              : row.original.buyerItem.itemName}
          </span>
        ),
      },
      {
        accessorKey: 'seller',
        header: t('exchangeHistory.seller'),
        cell: ({ row }) => <span>{row.original.sellerItem.itemName}</span>,
      },
      {
        accessorKey: 'date',
        header: t('exchangeHistory.date'),
        cell: ({ row }) => {
          const date = new Date(row.original.exchangeDate);
          const formattedDate = new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }).format(date);
          return <span>{formattedDate}</span>;
        },
      },
      {
        accessorKey: 'time',
        header: t('exchangeHistory.time'),
        cell: ({ row }) => {
          const date = new Date(row.original.exchangeDate);
          const formattedTime = new Intl.DateTimeFormat('vi-VN', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
          }).format(date);
          return <span>{formattedTime}</span>;
        },
      },
      {
        id: 'actions',
        header: t('exchangeHistory.actions'),
        cell: ({ row }) => <CellAction data={row.original} />,
      },
    ];
  };
