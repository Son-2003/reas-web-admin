import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import { getFeedback } from '@/containers/Feedback/thunk';

import { useFeedbackUserColumns } from './components/columns';
import {
  selectFeedbackFetchStatus,
  selectFeedbacks,
  selectFeedbackTotalPages,
} from './selector';
import { ApiStatus } from '@/common/enums/apiStatus';
import { ReduxDispatch } from '@/lib/redux/store';
import { useDispatch } from 'react-redux';
import { USERS_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { useTranslation } from 'react-i18next';
import { StatusEntity } from '@/common/enums/statusEntity';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export const FeedbackUser = () => {
  const { userId: userId } = useParams<{ userId: string }>();
  const { t } = useTranslation();
  const columns = useFeedbackUserColumns();
  const storedUsername = localStorage.getItem('username');
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();
  const [selectedStatuses, setSelectedStatuses] = useState<Set<StatusEntity>>(
    new Set(),
  );
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const feedbacks = useSelector(selectFeedbacks);
  const fetchStatus = useSelector(selectFeedbackFetchStatus);
  const totalPages = useSelector(selectFeedbackTotalPages);
  const statusOptions = [
    { label: 'Active', value: StatusEntity.ACTIVE },
    { label: 'Inactive', value: StatusEntity.INACTIVE },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(
        getFeedback({
          userId,
          pageNo,
          pageSize,
          statuses: [...selectedStatuses],
        }),
      );
    }
  }, [dispatch, userId, pageNo, pageSize, selectedStatuses]);

  const handleStatusChange = (status: StatusEntity) => {
    const newSet = new Set(selectedStatuses);
    if (newSet.has(status)) {
      newSet.delete(status);
    } else {
      newSet.add(status);
    }
    setSelectedStatuses(newSet);
    setPageNo(0);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`${t('feedback.title')} ${storedUsername || 'Unknown User'}`}
          description=""
        />
        <Button
          onClick={() => navigate(USERS_MANAGEMENT_ROUTE)}
          variant="outline"
        >
          {t('button.back')}
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-y-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-dotted border-2 border-slate-400 text-sm"
            >
              <PlusCircledIcon className="mr-1 h-3 w-3" />
              {t('itemsManagement.filter.title')}
              {selectedStatuses.size > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-1 h-3" />
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal lg:hidden text-sm"
                  >
                    {selectedStatuses.size}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    {selectedStatuses.size > 2 ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal text-sm"
                      >
                        {selectedStatuses.size} selected
                      </Badge>
                    ) : (
                      statusOptions
                        .filter((option) => selectedStatuses.has(option.value))
                        .map((option) => (
                          <Badge
                            key={option.value}
                            variant="secondary"
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
          <PopoverContent className="w-40 p-2">
            {statusOptions.map((option) => {
              const isSelected = selectedStatuses.has(option.value);
              return (
                <div
                  key={option.value}
                  className={`flex items-center justify-between py-1 px-2 rounded cursor-pointer text-sm ${
                    isSelected
                      ? 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleStatusChange(option.value)}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-green-500" />}
                </div>
              );
            })}
            {selectedStatuses.size > 0 && (
              <>
                <Separator className="my-2" />
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-center text-gray-600 hover:text-black text-sm"
                  onClick={() => {
                    setSelectedStatuses(new Set());
                    setPageNo(0);
                  }}
                >
                  {t('itemsManagement.filter.clear')}
                </Button>
              </>
            )}
          </PopoverContent>
        </Popover>
        {fetchStatus === ApiStatus.Loading ? (
          <p>Loading feedbacks...</p>
        ) : (
          <DataTable columns={columns} data={feedbacks} dataType="feedbacks" />
        )}
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
