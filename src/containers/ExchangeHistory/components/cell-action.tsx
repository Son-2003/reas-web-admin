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
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Icons } from '@/components/ui/icons';
import { useTranslation } from 'react-i18next';

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [dialogContent] = useState<React.ReactNode | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleViewDetailsClick = () => {
    navigate(`/admin/item-request/${data.id}`);
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
            <DropdownMenuItem onClick={handleViewDetailsClick}>
              <Icons.info className="mr-2 h-4 w-4" />
              {t('itemRequest.detail')}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
