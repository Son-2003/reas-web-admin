import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { SubscriptionResponse } from '@/common/models/subscription';

export const columns: ColumnDef<SubscriptionResponse>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value: any) =>
  //         table.toggleAllPageRowsSelected(!!value)
  //       }
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value: any) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    accessorKey: 'name',
    header: 'Plan Name',
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <span>{row.original.description}</span>,
  },
  {
    accessorKey: 'price',
    header: 'Price (VND)',
    cell: ({ row }) => <span>{row.original.price.toLocaleString()} ₫</span>,
  },

  {
    accessorKey: 'typeSubscriptionPlan',
    header: 'Subscription Type',
    cell: ({ row }) => {
      const type = row.original.typeSubscriptionPlan;
      const typeLabel = type === 'PREMIUM_PLAN' ? 'Premium' : 'Item extension';
      return <span>{typeLabel}</span>;
    },
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => {
      const months = row.original.duration;
      return (
        <span>
          {months} month{months > 1 ? 's' : ''}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
