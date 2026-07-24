import { memo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import Card from '../../common/Card';
import { formatCurrency } from '../../../utils/formatCurrency';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#6366f1'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-xs">
        <p className="text-xs font-bold text-slate-900">{data.category}</p>
        <p className="mt-1 text-xs font-extrabold text-blue-600">
          Revenue: {formatCurrency(data.revenue)}
        </p>
        <p className="text-xs font-medium text-slate-600">
          Units Sold: <span className="font-bold text-slate-900">{data.sales}</span>
        </p>
      </div>
    );
  }
  return null;
};

function SalesByCategoryChart({ data = [] }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Sales by Category</h3>
          <p className="text-xs font-medium text-slate-500">Revenue distribution by vehicle class</p>
        </div>
      </div>
      <div className="h-72 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
            No category sales data recorded
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="revenue"
                nameKey="category"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${entry.category}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-xs font-semibold text-slate-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

export default memo(SalesByCategoryChart);
