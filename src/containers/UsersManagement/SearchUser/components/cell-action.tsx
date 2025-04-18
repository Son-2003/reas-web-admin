import { UserDto } from '@/common/models/user';
import { AlertModal } from '@/components/ui/alert-modal';
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
import { MoreHorizontal } from 'lucide-react';
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
import { Package, MessageCircle, History } from 'lucide-react';

interface CellActionProps {
  data: UserDto;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogContent] = useState<React.ReactNode | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onConfirm = async () => {
    try {
      setLoading(true);
      // call api to delete here
      // await agent.Location.delete(data.id);
      toast({
        title: 'Delete location successfully!',
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast({
        title: `${errorMessage}`,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleViewDetailsClick = () => {
    navigate(ACCOUNT_DETAIL_ROUTE.replace(':staffId', String(data.id)));
  };

  const handleUpdateInfoStaff = () => {
    navigate(EDIT_STAFF_ACCOUNT_ROUTE.replace(':staffId', String(data.id)));
  };
  const handleViewItem = () => {
    navigate(ITEMS_MANAGEMENT_ROUTE.replace(':id', String(data.id)));
  };
  const handleViewFeedback = () => {
    navigate(
      FEEDBACK_USER_MANAGEMENT_ROUTE.replace(':userId', String(data.id)),
    );
  };
  const handleViewHistoryExchange = () => {
    navigate(
      EXCHANGE_HISTORY_MANAGEMENT_ROUTE.replace(':userId', String(data.id)),
    );
  };

  const handleViewPaymentExchange = () => {
    navigate(
      PAYMENT_HISTORY_BY_USER_MANAGEMENT_ROUTE.replace(
        ':userId',
        String(data.id),
      ),
    );
  };

  const handleDeactivateStaff = () => {
    // call api to deactivate staff here
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
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
            {/* <DropdownMenuItem
              onClick={handleViewPaymentBetweenLocationAndSystem}
            >
              <Icons.check className="mr-2 h-4 w-4" />
              Lịch sử giao dịch giữa nhà hàng và hệ thống
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={handleDeactivateStaff}
              className="text-red-600"
            >
              <Icons.delete className="mr-2 h-4 w-4" />
              {t('usersManagement.cell-action.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
