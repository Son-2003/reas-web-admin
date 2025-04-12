import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { Icons } from '@/components/ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UPDATE_SUBSCRIPTION_PLAN_ROUTE } from '@/common/constants/router';
import { deleteSubscriptionPlan } from '../../thunk';
import { ReduxDispatch } from '@/lib/redux/store';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpdate = () => {
    navigate(UPDATE_SUBSCRIPTION_PLAN_ROUTE.replace(':id', data.id), {
      state: { subscriptionPlan: data },
    });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteSubscriptionPlan(data.id)).unwrap();
      toast({
        title: t('subscriptionPlan.deleted'),
        description: t('subscriptionPlan.deleteSuccess'),
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: t('subscriptionPlan.deleteFailed'),
        description:
          error instanceof Error
            ? error.message
            : t('subscriptionPlan.deleteError'),
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      {isDeleteDialogOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: isDeleteDialogOpen ? 1 : 0 }}
        >
          <div
            className="bg-black rounded-lg p-6 max-w-md mx-auto transform transition-all duration-300"
            style={{
              transform: isDeleteDialogOpen ? 'scale(1)' : 'scale(0.9)',
            }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold">
                {t('subscriptionPlan.confirmTitle')}
              </h2>
              <button
                className="text-white p-2 hover:bg-gray-700 rounded-full"
                onClick={() => setDeleteDialogOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white text-center mt-4">
              {t('subscriptionPlan.confirmMessage')}
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => setDeleteDialogOpen(false)}
              >
                {t('common.cancel')}
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{t('subscriptionPlan.openMenu')}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('subscriptionPlan.actions')}</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleUpdate}>
            <Icons.edit className="mr-2 h-4 w-4" />
            {t('subscriptionPlan.update')}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Icons.delete className="mr-2 h-4 w-4 " />
            {t('subscriptionPlan.delete')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
