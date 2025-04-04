import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { fetchItems } from './thunk';
import { ReduxDispatch } from '@/lib/redux/store';
import { ApiStatus } from '@/common/enums/apiStatus';
import {
  selectCurrentPage,
  selectFetchStatus,
  selectItems,
  selectTotalPages,
} from './selector';
import { USERS_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { useItemColumns } from './components/columns';

export const ItemManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const columns = useItemColumns();
  const { id: userId } = useParams<{ id: string }>();
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([
    'AVAILABLE',
  ]);

  const items = useSelector(selectItems);
  const fetchStatus = useSelector(selectFetchStatus);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);

  useEffect(() => {
    if (userId) {
      dispatch(fetchItems({ userId, statusItem: selectedFilters[0] }));
    }
  }, [dispatch, userId, pageNo, pageSize, selectedFilters]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t('itemsManagement.title')} description="" />
        <Button
          onClick={() => navigate(USERS_MANAGEMENT_ROUTE)}
          variant="outline"
        >
          Back
        </Button>
      </div>
      <Separator />

      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        {fetchStatus === ApiStatus.Loading ? (
          <div className="flex justify-center py-6">
            <LoaderCircle className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={items || []}
            searchKey="id"
            placeholder="Tìm kiếm yêu cầu vật phẩm tại đây..."
            dataType="itemRequests"
            onFilterChange={setSelectedFilters}
          />
        )}
      </div>

      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
      />
    </>
  );
};
