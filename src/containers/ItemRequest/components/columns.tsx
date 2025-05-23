import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { Item } from '@/common/models/item';
import { useTranslation } from 'react-i18next';

export const useItemRequestColumns = (): ColumnDef<Item>[] => {
  const { t } = useTranslation();
  return [
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
          Id
          <Icons.sort className="ml-2 h-4 w-4" />
        </Button>
      ),
    },

    {
      accessorKey: 'itemName',
      header: t('itemRequest.itemName'),
      cell: ({ row }) => <span>{row.original.itemName}</span>,
    },

    {
      accessorKey: 'owner',
      header: t('itemRequest.owner'),
      cell: ({ row }) => <span>{row.original.owner.userName}</span>,
    },
    {
      accessorKey: 'status',
      header: t('itemRequest.status'),
      cell: ({ row }) => (
        <span className="font-bold text-yellow-500">
          {row.original.statusItem}
        </span>
      ),
    },

    {
      id: 'actions',
      header: t('itemRequest.action'),
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ];
};
