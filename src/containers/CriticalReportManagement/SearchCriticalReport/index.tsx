import {
  DEFAULT_PAGE_NO,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_BY,
  SORT_DIR_DESC,
} from '@/common/constants/pagination';
import { ReduxDispatch } from '@/lib/redux/store';
import { SortDirection } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectCriticalReportSearchResult } from '../selector';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { DataTable } from '@/components/DataTable/data-table';
import { useCriticalReportColumns } from './components/column';
import { SearchRequestPagination } from '@/common/models/pagination';
import { searchCriticalReport } from '../thunk';
import { SearchCriticalReportRequest } from '@/common/models/critical-report';
import { Skeleton } from '@/components/ui/skeleton';
import {
  TypeCriticalReport,
  StatusCriticalReport,
} from '@/common/enums/criticalReport';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PlusCircleIcon, CheckIcon, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const CriticalReportManagement = () => {
  const { t } = useTranslation();
  const [pageNo, setPageNo] = useState(DEFAULT_PAGE_NO);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortBy] = useState(DEFAULT_SORT_BY);
  const [sortDir] = useState<SortDirection>(SORT_DIR_DESC);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputReporterName, setInputReporterName] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<TypeCriticalReport>>(
    new Set(),
  );
  const [selectedStatuses, setSelectedStatuses] = useState<
    Set<StatusCriticalReport>
  >(new Set());

  const dispatch = useDispatch<ReduxDispatch>();
  const responsePagination = useSelector(selectCriticalReportSearchResult);
  const data = responsePagination?.content || [];
  const columns = useCriticalReportColumns();

  useEffect(() => {
    const searchCriticalReportRequestPagination: SearchRequestPagination = {
      pageNo,
      pageSize,
      sortBy,
      sortDir,
    };

    const defaultSearchCriticalReportRequest: SearchCriticalReportRequest = {
      ids: null,
      typeReports: [...selectedTypes],
      userFullName: null,
      residentIds: null,
      feedbackIds: null,
      exchangeRequestIds: null,
      reporterName,
      reporterIds: null,
      answererName: null,
      answererIds: null,
      statusCriticalReports: [...selectedStatuses],
    };

    setLoading(true);
    dispatch(
      searchCriticalReport({
        data: searchCriticalReportRequestPagination,
        request: defaultSearchCriticalReportRequest,
      }),
    ).finally(() => setLoading(false));

    setTotalPages(responsePagination?.totalPages || 0);
  }, [
    pageNo,
    pageSize,
    sortBy,
    sortDir,
    reporterName,
    selectedTypes,
    selectedStatuses,
  ]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t('criticalReport.title')} description="" />
      </div>
      <Separator />

      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-y-0">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Search Reporter Name */}
          <div className="relative w-64">
            <Input
              type="text"
              placeholder={t('criticalReport.searchPlaceholder')}
              value={inputReporterName}
              onChange={(e) => setInputReporterName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setReporterName(inputReporterName);
                  setPageNo(0);
                }
              }}
            />
            {inputReporterName && (
              <button
                type="button"
                onClick={() => {
                  setInputReporterName('');
                  setReporterName('');
                  setPageNo(0);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-dotted border-2 border-slate-400 text-sm"
              >
                <PlusCircleIcon className="mr-1 h-3 w-3" />
                {t('criticalReport.filterType')}
                {selectedTypes.size > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-1 h-3" />
                    <div className="flex gap-1">
                      {selectedTypes.size > 2 ? (
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-1 font-normal text-sm"
                        >
                          {selectedTypes.size} selected
                        </Badge>
                      ) : (
                        Array.from(selectedTypes).map((type) => (
                          <Badge
                            key={type}
                            variant="secondary"
                            className="rounded-sm px-1 font-normal text-sm"
                          >
                            {t(`criticalReport.type.${type.toLowerCase()}`)}
                          </Badge>
                        ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              {Object.values(TypeCriticalReport).map((type) => {
                const isSelected = selectedTypes.has(type);
                return (
                  <div
                    key={type}
                    onClick={() => {
                      const newSet = new Set(selectedTypes);
                      isSelected ? newSet.delete(type) : newSet.add(type);
                      setSelectedTypes(newSet);
                      setPageNo(0);
                    }}
                    className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer text-sm
          ${isSelected ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                  >
                    <span>
                      {t(`criticalReport.type.${type.toLowerCase()}`)}
                    </span>
                    {isSelected && (
                      <CheckIcon className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                );
              })}

              {selectedTypes.size > 0 && (
                <>
                  <Separator className="my-2" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm"
                    onClick={() => {
                      setSelectedTypes(new Set());
                      setPageNo(0);
                    }}
                  >
                    {t('common.clear')}
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-dotted border-2 border-slate-400 text-sm"
              >
                <PlusCircleIcon className="mr-1 h-3 w-3" />
                {t('criticalReport.filterStatus')}
                {selectedStatuses.size > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-1 h-3" />
                    <div className="flex gap-1">
                      {selectedStatuses.size > 2 ? (
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-1 font-normal text-sm"
                        >
                          {selectedStatuses.size} selected
                        </Badge>
                      ) : (
                        Array.from(selectedStatuses).map((status) => (
                          <Badge
                            key={status}
                            variant="secondary"
                            className="rounded-sm px-1 font-normal text-sm"
                          >
                            {t(`criticalReport.status.${status.toLowerCase()}`)}
                          </Badge>
                        ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              {Object.values(StatusCriticalReport).map((status) => {
                const isSelected = selectedStatuses.has(status);
                return (
                  <div
                    key={status}
                    onClick={() => {
                      const newSet = new Set(selectedStatuses);
                      isSelected ? newSet.delete(status) : newSet.add(status);
                      setSelectedStatuses(newSet);
                      setPageNo(0);
                    }}
                    className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer text-sm
        ${isSelected ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                  >
                    <span>
                      {t(`criticalReport.status.${status.toLowerCase()}`)}
                    </span>
                    {isSelected && (
                      <CheckIcon className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                );
              })}

              {selectedStatuses.size > 0 && (
                <>
                  <Separator className="my-2" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm"
                    onClick={() => {
                      setSelectedStatuses(new Set());
                      setPageNo(0);
                    }}
                  >
                    {t('common.clear')}
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>
        </div>

        {loading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <DataTable data={data} columns={columns} />
        )}
      </div>
      <DataTablePagination
        currentPage={pageNo}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
      />
    </>
  );
};
