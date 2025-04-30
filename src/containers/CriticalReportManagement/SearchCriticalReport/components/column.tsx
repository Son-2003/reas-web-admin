import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { CriticalReportResponse } from '@/common/models/critical-report';
import { CellAction } from './cell-action';

export const useCriticalReportColumns =
  (): ColumnDef<CriticalReportResponse>[] => {
    const { t } = useTranslation();

    return [
      {
        accessorKey: 'id',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('criticalReport.reportId')}
            <Icons.sort className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => <span>{row.original.id}</span>,
      },
      {
        accessorKey: 'contentReport',
        header: t('criticalReport.contentReport'),
        cell: ({ row }) => (
          <div className="whitespace-pre-wrap">
            {row.original.contentReport.split('\\n')[0]}
          </div>
        ),
      },
      {
        accessorKey: 'creationDate',
        header: t('criticalReport.creationDate'),
        cell: ({ row }) => {
          const date = new Date(row.original.creationDate);
          const formattedDateTime = new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(date);
          return <span>{formattedDateTime}</span>;
        },
      },
      {
        accessorKey: 'reporter',
        header: t('criticalReport.reporter'),
        cell: ({ row }) => <span>{row.original.reporter.fullName}</span>,
      },
      {
        accessorKey: 'typeReport',
        header: t('criticalReport.typeReport'),
        cell: ({ row }) => <span>{row.original.typeReport}</span>,
      },
      {
        accessorKey: 'statusCriticalReport',
        header: t('usersManagement.status'),
        cell: ({ row }) => {
          const status = row.original.statusCriticalReport
            .toString()
            .toLowerCase();
          var color;
          switch (status) {
            case 'pending':
              color = 'blue';
              break;
            case 'resolved':
              color = 'green';
              break;
            case 'rejected':
              color = 'red';
              break;
            default:
              color = 'gray';
          }
          return (
            <span style={{ color: color, fontWeight: 'bold' }}>
              {row.original.statusCriticalReport}
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
