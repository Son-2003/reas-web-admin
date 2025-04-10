import { Metadata } from 'next';
// import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { CalendarDateRangePicker } from '@/containers/DashBoard/components/date-range-picker';
import { useTranslation } from 'react-i18next';
import { SalesPieChart } from './components/pie-chart';
import { TooltipChart } from './components/tooltip-chart';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import { useSelector } from 'react-redux';
import {
  selectCurrentActiveUsers,
  selectCurrentActiveUsersFetchStatus,
  selectDashboardRevenue,
  selectDashboardRevenueFetchStatus,
  selectDashboardSuccessfulTransactions,
  selectDashboardTransactionFetchStatus,
  selectSuccessfulExchanges,
  selectSuccessfulExchangesFetchStatus,
} from './selector';
import { useEffect } from 'react';

import { ApiStatus } from '@/common/enums/apiStatus';
import {
  fetchCurrentActiveUsers,
  fetchMonthlyRevenue,
  fetchSuccessfulExchanges,
  fetchSuccessfulTransactions,
} from './thunk';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
};

export default function Dashboard() {
  const { t } = useTranslation();
  const dispatch = useDispatch<ReduxDispatch>();
  const revenue = useSelector(selectDashboardRevenue);
  const fetchRevenueStatus = useSelector(selectDashboardRevenueFetchStatus);
  const successfulTransactions = useSelector(
    selectDashboardSuccessfulTransactions,
  );
  const fetchTransactionStatus = useSelector(
    selectDashboardTransactionFetchStatus,
  );
  const successfulExchanges = useSelector(selectSuccessfulExchanges);
  const fetchSuccessfulTransactionsStatus = useSelector(
    selectSuccessfulExchangesFetchStatus,
  );
  const currentActiveUsers = useSelector(selectCurrentActiveUsers);
  const fetchCurrentActiveUsersStatus = useSelector(
    selectCurrentActiveUsersFetchStatus,
  );

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    dispatch(fetchMonthlyRevenue({ month: currentMonth, year: currentYear }));
    dispatch(
      fetchSuccessfulTransactions({ month: currentMonth, year: currentYear }),
    );
    dispatch(
      fetchSuccessfulExchanges({ month: currentMonth, year: currentYear }),
    );
    dispatch(fetchCurrentActiveUsers());
  }, [dispatch]);
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('dashboard.title')}
        </h2>
        {/* <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>{t('dashboard.download')}</Button>
        </div> */}
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
          {/* <TabsTrigger value="analytics" disabled>
            {t('dashboard.analytics')}
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            {t('dashboard.reports')}
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            {t('dashboard.notifications')}
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* 🧾 Total Revenue Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('dashboard.totalRevenue')}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {fetchRevenueStatus === ApiStatus.Loading
                    ? '...'
                    : `${revenue.toLocaleString()}`}
                </div>
                <p className="text-xs text-muted-foreground">
                  {/* Optional: dùng thêm tỉ lệ tăng nếu có */}
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('dashboard.subscriptions')}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {fetchCurrentActiveUsersStatus === ApiStatus.Loading
                    ? '...'
                    : `${currentActiveUsers.toLocaleString()}`}
                </div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            {/* 🧾 Transactions Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('dashboard.transactions')}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {fetchTransactionStatus === ApiStatus.Loading
                    ? '...'
                    : `${successfulTransactions.toLocaleString()}`}
                </div>
                <p className="text-xs text-muted-foreground">
                  {/* Optional: dùng thêm tỉ lệ tăng nếu có */}
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t('dashboard.successfulExchanges')}
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {fetchSuccessfulTransactionsStatus === ApiStatus.Loading
                    ? '...'
                    : `${successfulExchanges.toLocaleString()}`}
                </div>

                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t('dashboard.revenueChart')}</CardTitle>
                <CardDescription>{t('dashboard.barChartDes')}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {/* <Overview /> */}
                <TooltipChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t('dashboard.pieChartTitle')}</CardTitle>
                <CardDescription>{t('dashboard.pieChartDes')}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <RecentSales /> */}
                <SalesPieChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
