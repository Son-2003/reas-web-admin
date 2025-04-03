import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { PaymentHistory } from '@/common/models/payment-history';



export const columns: ColumnDef<PaymentHistory>[] = [
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
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => <span>{row.original.transactionId}</span>,
  },

  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <span>{row.original.amount}</span>,
  },

  {
    accessorKey: 'methodPayment',
    header: 'Method payment',
    cell: ({ row }) => <span>{row.original.methodPayment}</span>,
  },

  {
    accessorKey: 'statusItem',
    header: 'Status payment',
    cell: ({ row }) => <span>{row.original.description}</span>,
  },
  {
    accessorKey: 'transactionDateTime',
    header: 'Time',
    cell: ({ row }) => <span>{row.original.transactionDateTime}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
