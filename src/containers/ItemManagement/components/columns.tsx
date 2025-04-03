import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { Item } from '@/common/models/item';
import { StatusItem } from '@/common/enums/statusItem';
import { useTranslation } from 'react-i18next';

const getStatusColor = (status: StatusItem) => {
  const statusColors: Record<StatusItem, string> = {
    [StatusItem.AVAILABLE]: 'text-green-600',
    [StatusItem.UNAVAILABLE]: 'text-gray-500',
    [StatusItem.EXPIRED]: 'text-red-600',
    [StatusItem.NO_LONGER_FOR_EXCHANGE]: 'text-yellow-600',
    [StatusItem.PENDING]: 'text-blue-500',
    [StatusItem.REJECTED]: 'text-red-700',
  };

  return statusColors[status] || 'text-black dark:text-white';
};





export const useItemColumns= (): ColumnDef<Item>[] => 
  
  {
    const { t } = useTranslation();
    return [
      {

        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value: any) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: any) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'id',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Id
            <Icons.sort className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: 'itemName',
        header: t('itemsManagement.itemName'),
        cell: ({ row }) => <span>{row.original.itemName}</span>,
      },
      {
        accessorKey: 'owner',
        header: t('itemsManagement.owner'),
        cell: ({ row }) => <span>{row.original.owner.userName}</span>,
      },
    
      {
        accessorKey: 'price',
        header: t('itemsManagement.price'),
        cell: ({ row }) => <span>{row.original.price.toLocaleString()} VND</span>,
      },
    
      {
        accessorKey: 'status',
        header: t('itemsManagement.status'),
        cell: ({ row }) => {
          const status = row.original.statusItem;
          return <span className={`font-bold ${getStatusColor(status)}`}>{status}</span>;
        },
      },
    
      {
        id: 'actions',
        header: t('itemsManagement.action'),
        cell: ({ row }) => <CellAction data={row.original} />,
      },
    ]
  }

