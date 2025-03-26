import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchResults, selectSearchStatus } from './selector';
import { searchItems } from './thunk';
import { ReduxDispatch } from '@/lib/redux/store';
import { ApiStatus } from '@/common/enums/apiStatus';


export const ItemManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Lấy dữ liệu từ Redux store
  const items = useSelector(selectSearchResults);
  const searchStatus = useSelector(selectSearchStatus);

  // Gọi API khi component mount hoặc khi `pageNo` thay đổi
  useEffect(() => {
    dispatch(searchItems({ query: '' })); // Truy vấn tất cả item
  }, [dispatch, pageNo]);

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
        {searchStatus === ApiStatus.Loading ? (
          <div className="flex justify-center py-6">
            <LoaderCircle className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={items || []} // Sử dụng dữ liệu từ API
            searchKey="id"
            placeholder="Tìm kiếm yêu cầu vật phẩm tại đây..."
            dataType="itemRequests"
          />
        )}
      </div>

      <DataTablePagination
        currentPage={pageNo}
        totalPages={5}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
      />
    </>
  );
};
