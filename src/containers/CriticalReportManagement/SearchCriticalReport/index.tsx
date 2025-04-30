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

export const CriticalReportManagement = () => {
  const { t } = useTranslation();
  const [pageNo, setPageNo] = useState(DEFAULT_PAGE_NO);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortBy] = useState(DEFAULT_SORT_BY);
  const [sortDir] = useState<SortDirection>(SORT_DIR_DESC);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
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
      typeReports: null,
      userFullName: null,
      residentIds: null,
      feedbackIds: null,
      exchangeRequestIds: null,
      reporterName: null,
      reporterIds: null,
      answererName: null,
      answererIds: null,
      statusCriticalReports: null,
    };

    setLoading(true);
    dispatch(
      searchCriticalReport({
        data: searchCriticalReportRequestPagination,
        request: defaultSearchCriticalReportRequest,
      }),
    ).finally(() => setLoading(false));

    setTotalPages(responsePagination?.totalPages || 0);
  }, [pageNo, pageSize, sortBy, sortDir]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t('criticalReport.title')} description="" />
      </div>
      <Separator />

      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-y-0">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder={t('criticalReport.searchPlaceholder')}
              // value={inputUserName}
              // onChange={(e) => setInputUserName(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     setSearchUserName(inputUserName);
              //     setPageNo(0);
              //   }
              // }}
            />
            {/* {inputUserName && (
              <button
                type="button"
                onClick={() => {
                  setInputUserName('');
                  setSearchUserName('');
                  setPageNo(0);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
              >
                ×
              </button>
            )} */}
          </div>
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
