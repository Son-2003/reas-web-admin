import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentHistory } from './thunk'; // Import thunk
import {
  selectPaymentHistory,
  selectPaymentHistoryFetchStatus,
  selectPaymentHistoryTotalPages,
} from './selector';
import { ReduxDispatch } from '@/lib/redux/store';
import { ApiStatus } from '@/common/enums/apiStatus';

export const PaymentHistoryManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paymentHistory = useSelector(selectPaymentHistory);
  const fetchStatus = useSelector(selectPaymentHistoryFetchStatus);
  const totalPages = useSelector(selectPaymentHistoryTotalPages);

  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch, pageNo, pageSize]);

  if (fetchStatus === ApiStatus.Loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t('paymentHistory.title')} description="" />
        <Button onClick={() => navigate('/admin/newItemRequest')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={paymentHistory}
          searchKey="id"
          placeholder="Tìm kiếm yêu cầu vật phẩm tại đây..."
          dataType="paymentHistory"
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
