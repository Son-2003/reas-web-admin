'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectYearlyRevenueBySubscriptionPlan } from '../selector';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';
import {  useEffect } from 'react';
import { fetchYearlyRevenueBySubscriptionPlan } from '../thunk';



export function TooltipChart() {
  const { t } = useTranslation();
  const yearlyRevenue = useSelector(selectYearlyRevenueBySubscriptionPlan);
  const dispatch = useDispatch<ReduxDispatch>();

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    dispatch(fetchYearlyRevenueBySubscriptionPlan({ year: currentYear }));
  }, [dispatch]);

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2025, i);
    const monthKey = date.toLocaleString('en-US', { month: 'short' }).toLowerCase(); 
    
    return {
      month: t(`months.${monthKey}`),  
      PREMIUM_PLAN: 0,
      ITEM_EXTENSION: 0,
    };
  });
  
  const chartData = months.map((defaultMonth, index) => {
    const revenueForMonth = yearlyRevenue[index + 1]; 
    return {
      month: defaultMonth.month,
      PREMIUM_PLAN: revenueForMonth?.PREMIUM_PLAN || 0,
      ITEM_EXTENSION: revenueForMonth?.ITEM_EXTENSION || 0,
    };
  });
  

  const chartConfig = {
    ITEM_EXTENSION: {
      label: t('dashboard.itemExtension'),
      color: 'hsl(var(--chart-2))',
    },
    PREMIUM_PLAN: {
      label: t('dashboard.premiumPlan'),
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ChartContainer config={chartConfig} className="h-auto">
        <BarChart data={chartData}>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Bar
            dataKey="PREMIUM_PLAN"
            stackId="a"
            fill={chartConfig.PREMIUM_PLAN.color}
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="ITEM_EXTENSION"
            stackId="a"
            fill={chartConfig.ITEM_EXTENSION.color}
            radius={[4, 4, 0, 0]}
          />
          <ChartTooltip
            content={<ChartTooltipContent labelFormatter={(value) => value} />}
            cursor={false}
            defaultIndex={1}
          />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
