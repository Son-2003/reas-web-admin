import { UserDto } from '@/common/models/user';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';

export const columns: ColumnDef<UserDto>[] = [
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
    accessorKey: 'userName',
    header: 'User name',
    cell: ({ row }) => <span>{row.original.fullName}</span>,
  },
  {
    accessorKey: 'fullName',
    header: 'Full name',
    cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => <span>{row.original.gender}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.statusEntity.toString().toLowerCase();
      const color = status === 'active' ? 'green' : 'red';
      return (
        <span style={{ color: color, fontWeight: 'bold' }}>
          {row.original.statusEntity}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Hành động',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
