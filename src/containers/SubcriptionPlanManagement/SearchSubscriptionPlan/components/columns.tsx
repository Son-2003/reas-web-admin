import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { SubscriptionResponse } from '@/common/models/subscription';
import { useTranslation } from 'react-i18next';

export const useSubscriptionPlanColumns =
  (): ColumnDef<SubscriptionResponse>[] => {
    const { t } = useTranslation();

    return [
      {
        accessorKey: 'name',
        header: t('subscriptionPlan.planName'),
        cell: ({ row }) => <span>{row.original.name}</span>,
      },
      {
        accessorKey: 'description',
        header: t('subscriptionPlan.description'),
        cell: ({ row }) => <span>{row.original.description}</span>,
      },
      {
        accessorKey: 'price',
        header: t('subscriptionPlan.price'),
        cell: ({ row }) => <span>{row.original.price.toLocaleString()}</span>,
      },
      {
        accessorKey: 'typeSubscriptionPlan',
        header: t('subscriptionPlan.subscriptionType'),
        cell: ({ row }) => {
          const type = row.original.typeSubscriptionPlan;
          const typeLabel =
            type === 'PREMIUM_PLAN'
              ? t('subscriptionPlan.typePremium')
              : t('subscriptionPlan.typeItemExtension');
          return <span>{typeLabel}</span>;
        },
      },
      {
        accessorKey: 'duration',
        header: t('subscriptionPlan.duration'),
        cell: ({ row }) => {
          const months = row.original.duration;
          return (
            <span>{t('subscriptionPlan.durationUnit', { count: months })}</span>
          );
        },
      },
      {
        accessorKey: 'numberOfFreeExtension',
        header: t('subscriptionPlan.numberOfFreeExtension'),
        cell: ({ row }) => {
          const number = row.original.numberOfFreeExtension;
          return <span>{number}</span>;
        },
      },
      {
        id: 'actions',
        header: t('subscriptionPlan.actions'),
        cell: ({ row }) => <CellAction data={row.original} />,
      },
    ];
  };
