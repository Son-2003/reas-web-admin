import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { Item } from '@/common/models/item';
import { StatusItem } from '@/common/enums/statusItem';
import { useTranslation } from 'react-i18next';

const getStatusColor = (status: StatusItem) => {
  const statusColors: Record<StatusItem, string> = {
    [StatusItem.AVAILABLE]: 'text-green-600',
    [StatusItem.SOLD]: 'text-gray-500',
    [StatusItem.EXPIRED]: 'text-red-600',
    [StatusItem.NO_LONGER_FOR_EXCHANGE]: 'text-yellow-600',
    [StatusItem.PENDING]: 'text-blue-500',
    [StatusItem.REJECTED]: 'text-red-700',
    [StatusItem.IN_EXCHANGE]: 'text-purple-600',
  };

  return statusColors[status] || 'text-black dark:text-white';
};

export const useItemColumns = (): ColumnDef<Item>[] => {
  const { t } = useTranslation();
  return [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'itemName',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('itemsManagement.itemName')}
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original.itemName}</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'owner',
      header: t('itemsManagement.owner'),
      cell: ({ row }) => <span>{row.original.owner.userName}</span>,
      enableSorting: false,
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('itemsManagement.price')}
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original.price.toLocaleString()} VND</span>,
      enableSorting: true,
    },

    {
      accessorKey: 'status',
      header: t('itemsManagement.status'),
      cell: ({ row }) => {
        const status = row.original.statusItem;
        return (
          <span className={`font-bold ${getStatusColor(status)}`}>
            {status}
          </span>
        );
      },
      enableSorting: false,
    },
    {
      id: 'actions',
      header: t('itemsManagement.action'),
      cell: ({ row }) => <CellAction data={row.original} />,
      enableSorting: false,
    },
  ];
};
