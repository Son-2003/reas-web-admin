import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import { columns } from './components/columns';

import { ApiStatus } from '@/common/enums/apiStatus';
import {
  selectExchangeHistory,
  selectExchangeHistoryFetchStatus,
  selectExchangeHistoryTotalPages,
} from './selector';
import { getExchangeHistory } from './thunk';
import { ReduxDispatch } from '@/lib/redux/store';
import { USERS_MANAGEMENT_ROUTE } from '@/common/constants/router';

export const ExchangeHistory = () => {
  const { userId: userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();

  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const exchangeHistory = useSelector(selectExchangeHistory);
  const fetchStatus = useSelector(selectExchangeHistoryFetchStatus);
  const totalPages = useSelector(selectExchangeHistoryTotalPages);

  useEffect(() => {
    if (userId) {
      dispatch(getExchangeHistory({ userId }));
    }
  }, [dispatch, pageNo, pageSize]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Exchange History" description="" />

        <div className="flex flex-wrap gap-4 mb-6">
          <Button
            onClick={() => navigate(USERS_MANAGEMENT_ROUTE)}
            variant="outline"
          >
            Back
          </Button>
        </div>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        {fetchStatus === ApiStatus.Loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            columns={columns}
            data={exchangeHistory}
            searchKey="id"
            placeholder="Tìm kiếm lịch sử trao đổi tại đây..."
            dataType="exchangeHistory"
          />
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
