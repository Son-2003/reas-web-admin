import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import { fetchPendingItems } from './thunk';
import { selectPendingItems, selectTotalPages } from './selector';
import { useItemRequestColumns } from './components/columns';
import { Input } from '@/components/ui/input';
import { SortingState } from '@tanstack/react-table';

export const ItemRequest = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const items = useSelector(selectPendingItems);
  const columns = useItemRequestColumns();

  const [loading, setLoading] = useState(true);
  const totalPages = useSelector(selectTotalPages);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPendingItems({ pageNo, pageSize, itemName })).finally(() =>
      setLoading(false),
    );
  }, [dispatch, pageNo, pageSize]);

  const handleSearch = () => {
    setPageNo(0);
    dispatch(fetchPendingItems({ pageNo: 0, pageSize, itemName }));
  };

  const handleClearSearch = () => {
    setItemName('');
    setPageNo(0);
    dispatch(fetchPendingItems({ pageNo: 0, pageSize, itemName: '' }));
  };

  const handleSortChange = (sorting: SortingState) => {
    const sortBy = sorting[0]?.id || 'id';
    const sortDir = sorting[0]?.desc ? 'desc' : 'asc';
    setPageNo(0);
    dispatch(
      fetchPendingItems({
        pageNo: 0,
        pageSize,
        itemName,
        sortBy,
        sortDir,
      }),
    );
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
        <Heading title={t('itemRequest.title')} description="" />
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex items-center space-x-2 ml-12">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder={t('itemRequest.placeholder')}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="h-8 w-[150px] pl-8 lg:w-[250px]"
            />
            {itemName && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <DataTable
          columns={columns}
          data={items || []}
          dataType="itemRequests"
          onSortChange={handleSortChange}
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
