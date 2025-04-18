import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { Feedback } from '@/common/models/feedback';
import { useTranslation } from 'react-i18next';

export const useFeedbackUserColumns = (): ColumnDef<Feedback>[] => {
  const { t } = useTranslation();

  return [
    //   {
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
      accessorKey: 'userName',
      header: t('feedback.userName'),
      cell: ({ row }) => <span>{row.original.user.userName}</span>,
    },

    {
      accessorKey: 'rating',
      header: t('feedback.rating'),
      cell: ({ row }) => <span>{row.original.rating}</span>,
    },
    {
      id: 'actions',
      header: t('feedback.actions'),
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ];
};
