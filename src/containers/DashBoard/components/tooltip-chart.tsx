'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useTranslation } from 'react-i18next';

const chartData = [
  { month: 'Jan', buy: 4500, exchange: 3000 },
  { month: 'Feb', buy: 3800, exchange: 4200 },
  { month: 'Mar', buy: 5200, exchange: 1200 },
  { month: 'Apr', buy: 1400, exchange: 5500 },
  { month: 'May', buy: 6000, exchange: 3500 },
  { month: 'Jun', buy: 4800, exchange: 4000 },
  { month: 'Jul', buy: 5000, exchange: 4500 },
  { month: 'Aug', buy: 4700, exchange: 3200 },
  { month: 'Sep', buy: 5300, exchange: 4100 },
  { month: 'Oct', buy: 4900, exchange: 3800 },
  { month: 'Nov', buy: 5200, exchange: 3400 },
  { month: 'Dec', buy: 5600, exchange: 3700 },
];

export function TooltipChart() {
  const { t } = useTranslation();

  const chartConfig = {
    exchange: {
      label: t('dashboard.exchange'),
      color: 'hsl(var(--chart-2))',
    },
    buy: {
      label: t('dashboard.buy'),
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
            dataKey="buy"
            stackId="a"
            fill="var(--color-buy)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="exchange"
            stackId="a"
            fill="var(--color-exchange)"
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
