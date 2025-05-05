import { UserDto } from '@/common/models/user';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Package, MessageCircle, History } from 'lucide-react';
import { Icons } from '@/components/ui/icons';
import { useTranslation } from 'react-i18next';
import {
  ACCOUNT_DETAIL_ROUTE,
  EDIT_STAFF_ACCOUNT_ROUTE,
  EXCHANGE_HISTORY_MANAGEMENT_ROUTE,
  FEEDBACK_USER_MANAGEMENT_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  PAYMENT_HISTORY_BY_USER_MANAGEMENT_ROUTE,
} from '@/common/constants/router';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import { deactivateUser } from '../../thunk';

interface CellActionProps {
  data: UserDto;
  onRefresh: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onRefresh }) => {
  const [isDeactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();

  const handleViewDetailsClick = () => {
    navigate(ACCOUNT_DETAIL_ROUTE.replace(':staffId', String(data.id)));
  };

  const handleUpdateInfoStaff = () => {
    navigate(EDIT_STAFF_ACCOUNT_ROUTE.replace(':staffId', String(data.id)));
  };

  const handleViewItem = () => {
    localStorage.setItem('username', data.userName);
    navigate(ITEMS_MANAGEMENT_ROUTE.replace(':id', String(data.id)));
  };

  const handleViewFeedback = () => {
    localStorage.setItem('username', data.userName);
    navigate(
      FEEDBACK_USER_MANAGEMENT_ROUTE.replace(':userId', String(data.id)),
    );
  };

  const handleViewHistoryExchange = () => {
    localStorage.setItem('username', data.userName);
    navigate(
      EXCHANGE_HISTORY_MANAGEMENT_ROUTE.replace(':userId', String(data.id)),
    );
  };

  const handleChat = () => {
    navigate(
      `/admin/chat?receiverUsername=${data.userName}&receiverFullName=${encodeURIComponent(data.fullName)}`,
    );
  };

  const handleViewPaymentExchange = () => {
    localStorage.setItem('username', data.userName);
    navigate(
      PAYMENT_HISTORY_BY_USER_MANAGEMENT_ROUTE.replace(
        ':userId',
        String(data.id),
      ),
    );
  };

  const handleDeactivateStaff = async () => {
    try {
      setLoading(true);
      await dispatch(deactivateUser(data.id)).unwrap();
      toast({
        title: t('usersManagement.deactivateSuccessTitle'),
        description: t('usersManagement.deactivateSuccessMessage'),
        variant: 'default',
      });
      onRefresh();
    } catch (error: any) {
      toast({
        title: t('usersManagement.deactivateErrorTitle'),
        description:
          error instanceof Error
            ? error.message
            : t('usersManagement.deactivateErrorMessage'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setDeactivateDialogOpen(false);
    }
  };

  return (
    <>
      {isDeactivateDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md mx-auto shadow-lg transform transition-all">
            <div className="flex justify-between items-center">
              <h2 className="text-black dark:text-white font-bold">
                {t('usersManagement.confirmDeactivateTitle')}
              </h2>
            </div>
            <p className="text-black dark:text-gray-300 text-center mt-4">
              {t('usersManagement.confirmDeactivateMessage')}
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={() => setDeactivateDialogOpen(false)}
              >
                {t('common.cancel')}
              </button>
              <button
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleDeactivateStaff}
              >
                {loading ? t('common.processing') : t('common.deactivate')}
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {t('usersManagement.cell-action.title')}
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={handleViewDetailsClick}>
              <Icons.info className="mr-2 h-4 w-4" />
              {t('usersManagement.cell-action.view')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleUpdateInfoStaff}>
              <Icons.edit className="mr-2 h-4 w-4" />
              {t('usersManagement.cell-action.edit')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewItem}>
              <Package className="mr-2 h-4 w-4" />
              {t('usersManagement.cell-action.viewItem')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewFeedback}>
              <MessageCircle className="mr-2 h-4 w-4" />
              {t('usersManagement.cell-action.viewFeedback')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewHistoryExchange}>
              <History className="mr-2 h-4 w-4" />
              {t('usersManagement.cell-action.viewHistoryExchange')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewPaymentExchange}>
              <History className="mr-2 h-4 w-4" />
              {t('usersManagement.cell-action.viewHistoryPayment')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleChat}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeactivateDialogOpen(true)}
              className="text-red-600"
            >
              <Icons.delete className="mr-2 h-4 w-4" />
              {t('usersManagement.cell-action.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent></DialogContent>
      </Dialog>
    </>
  );
};
