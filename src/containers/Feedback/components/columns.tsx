import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import { Icons } from '@/components/ui/icons';
import { CellAction } from './cell-action';
import { Feedback } from '@/common/models/feedback';
import { useTranslation } from 'react-i18next';
import { StatusEntity } from '@/common/enums/statusEntity';

export const useFeedbackUserColumns = (): ColumnDef<Feedback>[] => {
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
      accessorKey: 'status',
      header: t('feedback.status'),
      cell: ({ row }) => {
        const status: StatusEntity =
          StatusEntity[row.original.statusEntity as keyof typeof StatusEntity];
        const isActive = status === StatusEntity.ACTIVE;

        const statusClass = isActive ? 'text-green-600' : 'text-red-600';

        return (
          <span className={`font-semibold uppercase ${statusClass}`}>
            {status}
          </span>
        );
      },
    },

    {
      id: 'actions',
      header: t('feedback.actions'),
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ];
};
