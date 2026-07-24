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
  const isSingleCategory = data.length === 1;
  const singleItem = isSingleCategory ? data[0] : null;

  return (
    <Card className="flex flex-col justify-between p-5 h-full">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">Sales by Category</h3>
          <p className="text-xs font-medium text-slate-500">Revenue distribution by vehicle class</p>
        </div>
      </div>

      <div className="relative h-64 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
            No category sales recorded
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="45%"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={isSingleCategory ? 0 : 4}
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
                  height={32}
                  formatter={(value) => (
                    <span className="text-xs font-semibold text-slate-700">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Single Category Center Overlay */}
            {isSingleCategory && singleItem && (
              <div className="pointer-events-none absolute inset-x-0 top-[30%] flex flex-col items-center justify-center text-center">
                <span className="text-sm font-extrabold text-slate-900">{singleItem.category}</span>
                <span className="text-xs font-extrabold text-blue-600">100%</span>
                <span className="text-[10px] font-medium text-slate-400">1 Category Sold</span>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}

export default memo(SalesByCategoryChart);
