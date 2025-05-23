'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { fetchMonthlyRevenueBySubscriptionPlan } from '../thunk';
import { selectMonthlyRevenueBySubscriptionPlan } from '../selector';
import { useTranslation } from 'react-i18next';
import { TypeSubscriptionPlan } from '@/common/enums/typeSubscriptionPlan';

export function SalesPieChart() {
  const dispatch = useDispatch<ReduxDispatch>();

  const { t } = useTranslation();

  const monthlyRevenueBySubscriptionPlan = useSelector(
    selectMonthlyRevenueBySubscriptionPlan,
  );

  const totalRevenue = React.useMemo(
    () =>
      Object.values(monthlyRevenueBySubscriptionPlan).reduce(
        (acc, curr) => acc + curr,
        0,
      ),
    [monthlyRevenueBySubscriptionPlan],
  );

  const planNameMap = {
    [TypeSubscriptionPlan.PREMIUM_PLAN]: t('dashboard.premiumPlan'),
    [TypeSubscriptionPlan.ITEM_EXTENSION]: t('dashboard.itemExtension'),
  };

  const chartConfig = {
    revenue: {
      label: t('dashboard.revenue'),
    },
    premium: {
      label: 'Premium Plan',
      color: 'hsl(var(--chart-1))',
    },
    item: {
      label: 'Item Extension',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  React.useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    dispatch(
      fetchMonthlyRevenueBySubscriptionPlan({
        month: currentMonth,
        year: currentYear,
      }),
    );
  }, [dispatch]);

  const chartData = React.useMemo(
    () =>
      Object.entries(monthlyRevenueBySubscriptionPlan).map(
        ([plan, revenue]) => ({
          plan: planNameMap[plan as TypeSubscriptionPlan] || plan,
          revenue,
          fill:
            plan === TypeSubscriptionPlan.PREMIUM_PLAN
              ? 'var(--color-premium)'
              : 'var(--color-item)',
        }),
      ),
    [monthlyRevenueBySubscriptionPlan],
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0"></CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="plan"
              innerRadius={70}
              outerRadius={100}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {totalRevenue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {t('dashboard.revenue')}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: chartConfig.premium.color }}
            />
            <span>{chartConfig.premium.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: chartConfig.item.color }}
            />
            <span>{chartConfig.item.label}</span>
          </div>
        </div>

        <div className="leading-none text-muted-foreground">
          {t('dashboard.showing')}
        </div>
      </CardFooter>
    </Card>
  );
}
