import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePaymentHistoryByIdcolumns } from './components/columns';
import { ReduxDispatch } from '@/lib/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPaymentHistoryByUserId,
  selectPaymentHistoryByUserIdFetchStatus,
  selectPaymentHistoryByUserIdTotalPages,
} from './selector';
import { fetchPaymentHistoryByUserId } from './thunk';
import { ApiStatus } from '@/common/enums/apiStatus';
import { USERS_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { LoaderCircle, Search, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const PaymentHistoryByUserManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const { userId } = useParams();
  const columns = usePaymentHistoryByIdcolumns();

  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [transactionId, setTransactionId] = useState('');

  const paymentHistory = useSelector(selectPaymentHistoryByUserId);
  const fetchStatus = useSelector(selectPaymentHistoryByUserIdFetchStatus);
  const totalPages = useSelector(selectPaymentHistoryByUserIdTotalPages);

  useEffect(() => {
    if (userId) {
      dispatch(
        fetchPaymentHistoryByUserId({
          userId: Number(userId),
          pageNo,
          pageSize,
          transactionId,
        }),
      );
    }
  }, [dispatch, userId, pageNo, pageSize]);

  const handleSearch = () => {
    setPageNo(0);
    if (userId) {
      dispatch(
        fetchPaymentHistoryByUserId({
          userId: Number(userId),
          pageNo: 0,
          pageSize,
          transactionId,
        }),
      );
    }
  };

  if (fetchStatus === ApiStatus.Loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t('paymentHistory.title1')} description="" />
        <Button
          onClick={() => navigate(USERS_MANAGEMENT_ROUTE)}
          variant="outline"
        >
          {t('button.back')}
        </Button>
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
                  if (userId) {
                    dispatch(
                      fetchPaymentHistoryByUserId({
                        userId: Number(userId),
                        pageNo: 0,
                        pageSize,
                        transactionId: '',
                      }),
                    );
                  }
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
          dataType="paymentHistoryByUserId"
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
