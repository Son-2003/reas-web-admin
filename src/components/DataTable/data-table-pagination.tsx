import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setPageNo: (pageNo: number) => void;
  setPageSize: (pageSize: number) => void;
}

export function DataTablePagination({
  currentPage,
  totalPages,
  pageSize,
  setPageNo,
  setPageSize,
}: DataTablePaginationProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{t('pagination.pageSizeLimit')}</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value: any) => {
              setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[3, 5, 10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {totalPages > 0
            ? t('pagination.pageInfo', {
                currentPage: currentPage + 1,
                totalPages,
              })
            : t('pagination.noData')}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageNo(0)}
            disabled={currentPage === 0}
          >
            <span className="sr-only">{t('pagination.goToFirstPage')}</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageNo(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <span className="sr-only">{t('pagination.goToPreviousPage')}</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageNo(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <span className="sr-only">{t('pagination.goToNextPage')}</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageNo(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <span className="sr-only">{t('pagination.goToLastPage')}</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
