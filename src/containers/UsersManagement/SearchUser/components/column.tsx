import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { UserDto } from '@/common/models/user';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';

export const useUserColumns = (): ColumnDef<UserDto>[] => {
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
          {t('usersManagement.id')}
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'userName',
      header: t('usersManagement.username'),
      cell: ({ row }) => <span>{row.original.userName}</span>,
    },
    {
      accessorKey: 'fullName',
      header: t('usersManagement.name'),
      cell: ({ row }) => <span>{row.original.fullName}</span>,
    },
    {
      accessorKey: 'email',
      header: t('usersManagement.email'),
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: 'phone',
      header: t('usersManagement.phone'),
      cell: ({ row }) => <span>{row.original.phone}</span>,
    },
    {
      accessorKey: 'gender',
      header: t('usersManagement.gender'),
      cell: ({ row }) => <span>{row.original.gender}</span>,
    },
    {
      accessorKey: 'status',
      header: t('usersManagement.status'),
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
      header: t('usersManagement.action'),
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ];
};
