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

export const FeedbackUser = () => {
  const { userId: userId } = useParams<{ userId: string }>();
  const { t } = useTranslation();
  const columns = useFeedbackUserColumns();
  const navigate = useNavigate();
  const dispatch = useDispatch<ReduxDispatch>();

  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const feedbacks = useSelector(selectFeedbacks);
  const fetchStatus = useSelector(selectFeedbackFetchStatus);
  const totalPages = useSelector(selectFeedbackTotalPages);

  useEffect(() => {
    if (userId) {
      dispatch(getFeedback({ userId, pageNo, pageSize }));
    }
  }, [dispatch, userId, pageNo, pageSize]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t('feedback.title')} description="" />
        <Button
          onClick={() => navigate(USERS_MANAGEMENT_ROUTE)}
          variant="outline"
        >
          {t('button.back')}
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        {fetchStatus === ApiStatus.Loading ? (
          <p>Loading feedbacks...</p>
        ) : (
          <DataTable
            columns={columns}
            data={feedbacks}
            searchKey="id"
            placeholder={t('feedback.searchPlaceholder')}
            dataType="feedbacks"
          />
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
