import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Icons } from '@/components/ui/icons';
import { useTranslation } from 'react-i18next';
import { REPLY_CRITICAL_REPORT_ROUTE } from '@/common/constants/router';
import { CriticalReportResponse } from '@/common/models/critical-report';

interface CellActionProps {
  data: CriticalReportResponse;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [dialogContent] = useState<React.ReactNode | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleReplyCriticalReport = () => {
    navigate(REPLY_CRITICAL_REPORT_ROUTE.replace(':reportId', String(data.id)));
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
            <DropdownMenuLabel>
              {t('usersManagement.cell-action.title')}
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={handleReplyCriticalReport}>
              <Icons.info className="mr-2 h-4 w-4" />
              {t('criticalReport.replyReport')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogContent && <DialogContent>{dialogContent}</DialogContent>}
      </Dialog>
    </>
  );
};
