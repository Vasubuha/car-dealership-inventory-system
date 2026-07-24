import { memo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Card from '../../common/Card';
import { formatCurrency } from '../../../utils/formatCurrency';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-xs">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-extrabold text-slate-900">
          Sales: {data.sales} vehicle{data.sales === 1 ? '' : 's'}
        </p>
        <p className="text-xs font-medium text-blue-600">
          Revenue: {formatCurrency(data.revenue)}
        </p>
      </div>
    );
  }
  return null;
};

function WeeklySalesChart({ data = [] }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Weekly Sales Breakdown</h3>
          <p className="text-xs font-medium text-slate-500">Vehicles sold per day this week</p>
        </div>
      </div>
      <div className="h-72 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
            No sales data this week
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

export default memo(WeeklySalesChart);
