
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useTranslation } from 'react-i18next';
import statsData from '@/lib/dementia-stats.json';


export default function DementiaStatsChart() {
  const { t } = useTranslation();
  const { chartData, chartTitleKey, chartDescKey } = statsData;

  const data = chartData.map(item => ({
    name: t(item.nameKey),
    prevalence: item.prevalence
  }));

  return (
    <Card className="mt-12 bg-white/60 backdrop-blur-sm border-gray-200">
      <CardHeader>
        <CardTitle>{t(chartTitleKey)}</CardTitle>
        <CardDescription>
          {t(chartDescKey)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                top: 5,
                right: 30,
                left: -10,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis unit="%" tickLine={false} axisLine={false} />
                <Tooltip
                    cursor={{fill: 'hsl(var(--primary) / 0.1)'}}
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
borderRadius: 'var(--radius)',
                    }}
                />
                <Bar dataKey="prevalence" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
