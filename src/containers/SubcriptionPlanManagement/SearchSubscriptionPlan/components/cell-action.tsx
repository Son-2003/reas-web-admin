import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Icons } from '@/components/ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import { deleteSubscriptionPlan } from '../../thunk';

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [dialogContent] = useState<React.ReactNode | null>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();

  const handleDelete = async () => {
    if (!data?.id) return;

    try {
      await dispatch(deleteSubscriptionPlan(data.id)).unwrap();
      console.log('Xoá thành công');
    } catch (error) {
      console.error('Xoá thất bại:', error);
    }
  };

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              <Icons.delete className="mr-2 h-4 w-4" />
              {t('subscriptionPlan.delete')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
