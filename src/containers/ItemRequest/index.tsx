import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';
import { useDispatch, useSelector } from 'react-redux';

import { ReduxDispatch } from '@/lib/redux/store';
import { fetchPendingItems } from './thunk';
import { selectPendingItems } from './selector';

export const ItemRequest = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const items = useSelector(selectPendingItems);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPendingItems()).finally(() => setLoading(false));
  }, [dispatch]);

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
        <Heading title={t('itemRequest.title')} description="" />
        <Button onClick={() => navigate('/admin/newItemRequest')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={items || []} // Sử dụng dữ liệu từ Redux store
          searchKey="id"
          placeholder="Tìm kiếm yêu cầu vật phẩm tại đây..."
        />
      </div>
      <DataTablePagination
        currentPage={pageNo}
        totalPages={5} // Bạn có thể thay bằng totalPages từ API nếu có
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
      />
    </>
  );
};
