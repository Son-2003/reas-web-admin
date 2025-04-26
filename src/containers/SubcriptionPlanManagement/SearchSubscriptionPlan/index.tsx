import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { LoaderCircle, Plus, Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import {
  selectSubscriptionCurrentPage,
  selectSubscriptionPlans,
  selectSubscriptionTotalPages,
} from '../selector';
import { fetchSubscriptionPlans } from '../thunk';
import { CREATE_SUBSCRIPTION_PLAN_ROUTE } from '@/common/constants/router';
import { Input } from '@/components/ui/input';
import { useSubscriptionPlanColumns } from './components/columns';
import { useTranslation } from 'react-i18next';

export const SubscriptionPlanManagement = () => {
  const { t } = useTranslation();
  const columns = useSubscriptionPlanColumns();
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [pageNo, setPageNo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const subscriptionPlans = useSelector(selectSubscriptionPlans);
  const totalPages = useSelector(selectSubscriptionTotalPages);
  const currentPage = useSelector(selectSubscriptionCurrentPage);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSubscriptionPlans({ pageNo, pageSize, search })).finally(() =>
      setLoading(false),
    );
  }, [dispatch, pageNo, pageSize]);

  const handleSearch = () => {
    setPageNo(0);
    dispatch(fetchSubscriptionPlans({ pageNo: 0, pageSize, search }));
  };

  const handleClearSearch = () => {
    setSearch('');
    setPageNo(0);
    dispatch(fetchSubscriptionPlans({ pageNo: 0, pageSize, search: '' }));
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
        <Heading title={t('subscriptionPlan.title')} description="" />
        <div className="flex items-center space-x-2">
          <Button onClick={() => navigate(CREATE_SUBSCRIPTION_PLAN_ROUTE)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('subscriptionPlan.addNew')}
          </Button>
        </div>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex items-center space-x-2 ml-12">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
  autoComplete="off"
  placeholder={t('subscriptionPlan.searchPlaceholder')}
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }}
  className="h-8 w-[150px] pl-8 pr-8 lg:w-[250px]"
/>
            {search && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <XCircle className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={subscriptionPlans}
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
