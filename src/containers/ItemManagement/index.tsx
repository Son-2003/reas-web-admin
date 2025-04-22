import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Search, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from './thunk';
import { ReduxDispatch } from '@/lib/redux/store';
import { selectItems, selectTotalPages } from './selector';
import { USERS_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { useItemColumns } from './components/columns';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { StatusItem } from '@/common/enums/statusItem';
import { Icons } from '@/components/ui/icons';
import { SortingState } from '@tanstack/react-table';
import { SORT_BY_ID, SORT_DIRTECTION_ASC } from '@/common/constants/sort';

export const ItemManagement = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const columns = useItemColumns();
  const [loading, setLoading] = useState(true);
  const { id: userId } = useParams<{ id: string }>();

  const items = useSelector(selectItems);
  const totalPages = useSelector(selectTotalPages);
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [itemName, setItemName] = useState('');
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true);
    if (userId) {
      dispatch(
        fetchItems({
          ownerIds: [userId],
          itemName,
          pageNo,
          pageSize,
          statusItems: [...selectedValues],
          sortBy: 'id',
          sortDir: 'asc',
        }),
      ).finally(() => setLoading(false));
    }
  }, [dispatch, userId, pageNo, pageSize, selectedValues]);

  const options = [
    {
      label: t('itemsManagement.available'),
      value: StatusItem.AVAILABLE,
      icon: Icons.check,
    },
    {
      label: t('itemsManagement.sold'),
      value: StatusItem.SOLD,
      icon: Icons.cancel,
    },
    {
      label: t('itemsManagement.rejected'),
      value: StatusItem.REJECTED,
      icon: Icons.x,
    },
    {
      label: t('itemsManagement.expired'),
      value: StatusItem.EXPIRED,
      icon: Icons.cancel,
    },
    {
      label: t('itemsManagement.pending'),
      value: StatusItem.PENDING,
      icon: Icons.pending,
    },
    {
      label: t('itemsManagement.noLongerForExchange'),
      value: StatusItem.NO_LONGER_FOR_EXCHANGE,
      icon: Icons.outStock,
    },
    {
      label: t('itemsManagement.inExchange'),
      value: StatusItem.IN_EXCHANGE,
      icon: Icons.spinner,
    },
  ];

  const handleSearch = () => {
    setPageNo(0);
    if (userId) {
      dispatch(
        fetchItems({
          ownerIds: [userId],
          pageNo: 0,
          pageSize,
          itemName,
          statusItems: [...selectedValues],
          sortBy: SORT_BY_ID,
          sortDir: SORT_DIRTECTION_ASC,
        }),
      );
    }
  };

  const handleClearSearch = () => {
    setItemName('');
    setPageNo(0);
    if (userId) {
      dispatch(
        fetchItems({
          ownerIds: [userId],
          pageNo: 0,
          pageSize,
          itemName: '',
          statusItems: [...selectedValues],
          sortBy: SORT_BY_ID,
          sortDir: SORT_DIRTECTION_ASC,
        }),
      );
    }
  };

  const handleSortChange = (sorting: SortingState) => {
    const sortBy = sorting[0]?.id || 'id';
    const sortDir = sorting[0]?.desc ? 'desc' : 'asc';
    if (userId && sortBy === 'id') {
      setPageNo(0);
      dispatch(
        fetchItems({
          ownerIds: [userId],
          pageNo: 0,
          pageSize,
          itemName,
          statusItems: [...selectedValues],
          sortBy,
          sortDir,
        }),
      );
    }
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
        <div className="flex items-center space-x-2 ml-12">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder={t('itemRequest.searchPlaceholder')}
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

          {/* Filter Section */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-dotted border-2 border-slate-400 text-sm"
              >
                <PlusCircledIcon className="mr-1 h-3 w-3" />
                {t('itemsManagement.filter.title')}
                {selectedValues?.size > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-1 h-3" />
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal lg:hidden text-sm"
                    >
                      {selectedValues.size}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {selectedValues.size > 2 ? (
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-1 font-normal text-sm"
                        >
                          {selectedValues.size} selected
                        </Badge>
                      ) : (
                        options
                          .filter((option) => selectedValues.has(option.value))
                          .map((option) => (
                            <Badge
                              variant="secondary"
                              key={option.value}
                              className="rounded-sm px-1 font-normal text-sm"
                            >
                              {option.label}
                            </Badge>
                          ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-48 p-2">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <div
                    key={option.value}
                    className={`
                      flex items-center justify-between py-1 px-2 rounded cursor-pointer 
                      text-black dark:text-white text-sm
                      ${
                        isSelected
                          ? 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                    onClick={() => {
                      const newSet = new Set(selectedValues);
                      isSelected
                        ? newSet.delete(option.value)
                        : newSet.add(option.value);
                      setSelectedValues(newSet);
                      setPageNo(0);
                      if (userId) {
                        dispatch(
                          fetchItems({
                            ownerIds: [userId],
                            pageNo: 0,
                            pageSize,
                            itemName,
                            statusItems: [...newSet],
                            sortBy: 'id',
                            sortDir: 'asc',
                          }),
                        );
                      }
                    }}
                  >
                    <span className="flex items-center text-sm">
                      {option.icon && <option.icon className="w-3 h-3 mr-1" />}
                      {option.label}
                    </span>
                    {isSelected && (
                      <CheckIcon className="w-3 h-3 text-green-500" />
                    )}
                  </div>
                );
              })}

              {selectedValues.size > 0 && (
                <>
                  <Separator className="my-2" />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm"
                    onClick={() => {
                      setSelectedValues(new Set());
                      setPageNo(0);
                      if (userId) {
                        dispatch(
                          fetchItems({
                            ownerIds: [userId],
                            pageNo: 0,
                            pageSize,
                            itemName,
                            statusItems: [],
                            sortBy: 'id',
                            sortDir: 'asc',
                          }),
                        );
                      }
                    }}
                  >
                    {t('itemsManagement.filter.clear')}
                  </Button>
                </>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <DataTable
          columns={columns}
          data={items || []}
          defaultSortOrder={false}
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
