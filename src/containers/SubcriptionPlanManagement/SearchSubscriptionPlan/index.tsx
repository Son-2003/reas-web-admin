import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import { useSelector } from 'react-redux';
import {
  selectSubscriptionCurrentPage,
  selectSubscriptionPlans,
  selectSubscriptionTotalPages,
} from '../selector';
import { fetchSubscriptionPlans } from '../thunk';
import { CREATE_SUBSCRIPTION_PLAN_ROUTE } from '@/common/constants/router';

export const SubscriptionPlanManagement = () => {
  // const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const subscriptionPlans = useSelector(selectSubscriptionPlans);
  const totalPages = useSelector(selectSubscriptionTotalPages);
  const currentPage = useSelector(selectSubscriptionCurrentPage);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSubscriptionPlans({ pageNo, pageSize })).finally(() =>
      setLoading(false),
    );
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
        <Heading title="Subcription management" description="" />
        <Button onClick={() => navigate(CREATE_SUBSCRIPTION_PLAN_ROUTE)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={subscriptionPlans}
          searchKey="name"
          placeholder="Tìm kiếm yêu cầu vật phẩm tại đây..."
          dataType="subscriptionPlans"
          defaultSortOrder={false}
        />
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
