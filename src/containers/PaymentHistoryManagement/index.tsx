import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { usePaymentHistorycolumns } from './components/columns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentHistory } from './thunk';
import {
  selectPaymentHistory,
  selectPaymentHistoryTotalPages,
} from './selector';
import { ReduxDispatch } from '@/lib/redux/store';

export const PaymentHistoryManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const columns = usePaymentHistorycolumns();

  const paymentHistory = useSelector(selectPaymentHistory);
  const totalPages = useSelector(selectPaymentHistoryTotalPages);

  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPaymentHistory({ pageNo, pageSize })).finally(() =>
      setLoading(false),
    );
  }, [dispatch, pageNo, pageSize]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t('paymentHistory.title')} description="" />
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={paymentHistory}
          searchKey="id"
          placeholder={t('paymentHistory.placeholder')}
          dataType="paymentHistory"
          defaultSortOrder={false}
        />
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
