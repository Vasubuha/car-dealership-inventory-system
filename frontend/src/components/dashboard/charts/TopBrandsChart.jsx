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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur-xs">
        <p className="text-xs font-bold text-slate-900">{data.brand}</p>
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

function TopBrandsChart({ data = [] }) {
  const isSparse = data.length <= 2;

  return (
    <Card className="flex flex-col justify-between p-5 h-full">
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900">Top Selling Brands</h3>
          <p className="text-xs font-medium text-slate-500">Highest grossing manufacturers</p>
        </div>
      </div>

      <div className="h-64 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
            No brand performance data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
              barCategoryGap={isSparse ? '35%' : '20%'}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(val) =>
                  val >= 10000000
                    ? `₹${(val / 10000000).toFixed(1)}Cr`
                    : val >= 100000
                      ? `₹${(val / 100000).toFixed(0)}L`
                      : `₹${val}`
                }
              />
              <YAxis
                dataKey="brand"
                type="category"
                tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                width={95}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="revenue"
                fill="#6366f1"
                radius={[0, 6, 6, 0]}
                maxBarSize={isSparse ? 28 : 24}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

export default memo(TopBrandsChart);
