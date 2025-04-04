import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';
import { ReduxDispatch } from '@/lib/redux/store';
import { useDispatch } from 'react-redux';
import { selectPaymentHistoryByUserId } from './selector';
import {
  selectPaymentHistoryFetchStatus,
  selectPaymentHistoryTotalPages,
} from '../PaymentHistoryManagement/selector';
import { useSelector } from 'react-redux';
import { fetchPaymentHistoryByUserId } from './thunk'; // Thêm import cho thunk
import { ApiStatus } from '@/common/enums/apiStatus';

export const PaymentHistoryByUserManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const { userId } = useParams();

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paymentHistory = useSelector(selectPaymentHistoryByUserId);
  const fetchStatus = useSelector(selectPaymentHistoryFetchStatus);
  const totalPages = useSelector(selectPaymentHistoryTotalPages);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPaymentHistoryByUserId(Number(userId)));
    }
  }, [dispatch, userId, pageNo, pageSize]);

  if (fetchStatus === ApiStatus.Loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t('paymentHistoryByUser.title')} description="" />
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
          dataType="itemRequests"
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
