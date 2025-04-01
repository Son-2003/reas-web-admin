import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { ReduxDispatch } from '@/lib/redux/store';
import { fetchPendingItems } from './thunk';
import { selectPendingItems } from './selector';
import { useItemRequestColumns } from './components/columns';

export const ItemRequest = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const items = useSelector(selectPendingItems);
  const columns = useItemRequestColumns();

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPendingItems()).finally(() => setLoading(false));
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
        <Heading title={t('itemRequest.title')} description="" />
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={items || []}
          searchKey="id"
          placeholder={t('itemRequest.searchPlaceholder')}
          dataType="itemRequests"
        />
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
