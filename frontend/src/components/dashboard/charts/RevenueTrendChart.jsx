import { memo } from 'react';
import {
  Area,
  AreaChart,
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
        <p className="mt-1 text-sm font-extrabold text-blue-600">
          Revenue: {formatCurrency(data.revenue)}
        </p>
        <p className="text-xs font-medium text-slate-600">
          Units Sold: <span className="font-bold text-slate-900">{data.units}</span>
        </p>
      </div>
    );
  }
  return null;
};

function RevenueTrendChart({ data = [] }) {
  // Format short date for X-Axis e.g. "Jul 24"
  const formattedData = data.map((item) => {
    const parts = item.date.split('-');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const month = monthNames[parseInt(parts[1], 10) - 1] || '';
    const day = parseInt(parts[2], 10) || '';
    return {
      ...item,
      shortDate: `${month} ${day}`,
    };
  });

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Revenue Trend (30 Days)</h3>
          <p className="text-xs font-medium text-slate-500">Daily sales revenue trajectory</p>
        </div>
      </div>
      <div className="h-72 w-full">
        {formattedData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
            No revenue data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="shortDate"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
                tickFormatter={(val) =>
                  val >= 10000000
                    ? `₹${(val / 10000000).toFixed(1)}Cr`
                    : val >= 100000
                      ? `₹${(val / 100000).toFixed(0)}L`
                      : `₹${val}`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

export default memo(RevenueTrendChart);
