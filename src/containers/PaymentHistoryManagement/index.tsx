import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Search, XCircle } from 'lucide-react';
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
import { Input } from '@/components/ui/input';

export const PaymentHistoryManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const columns = usePaymentHistorycolumns();

  const paymentHistory = useSelector(selectPaymentHistory);
  const totalPages = useSelector(selectPaymentHistoryTotalPages);

  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPaymentHistory({ pageNo, pageSize, transactionId })).finally(
      () => setLoading(false),
    );
  }, [dispatch, pageNo, pageSize]);

  const handleSearch = () => {
    setPageNo(0);
    dispatch(fetchPaymentHistory({ pageNo: 0, pageSize, transactionId }));
  };

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
        <div className="flex items-center space-x-2 ml-12">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder={t('paymentHistory.placeholder')}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="h-8 w-[150px] pl-8 pr-8 lg:w-[250px]"
            />

            {transactionId && (
              <button
                onClick={() => {
                  setTransactionId('');
                  setPageNo(0);
                  dispatch(
                    fetchPaymentHistory({
                      pageNo: 0,
                      pageSize,
                      transactionId: '',
                    }),
                  );
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <DataTable
          columns={columns}
          data={paymentHistory}
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
