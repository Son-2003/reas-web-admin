import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { ExchangeHistoryByUserId } from '@/common/models/exchange-history';

export const columns: ColumnDef<ExchangeHistoryByUserId>[] = [
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
    accessorKey: 'buyer',
    header: 'Buyer',
    cell: ({ row }) => <span>{row.original.buyerItem.itemName}</span>,
  },
  {
    accessorKey: 'seller',
    header: 'Seller',
    cell: ({ row }) => <span>{row.original.sellerItem.itemName}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <span>{row.original.exchangeDate}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
