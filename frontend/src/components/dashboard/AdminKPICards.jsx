import { useMemo } from 'react';
import {
  BadgeDollarSign,
  Calendar,
  CarFront,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  TriangleAlert,
  Zap,
} from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatCurrency';

export default function AdminKPICards({ kpis }) {
  const cards = useMemo(() => {
    const todayRev = kpis?.todays_revenue ?? 0;
    const weekRev = kpis?.weekly_revenue ?? 0;
    const monthRev = kpis?.monthly_revenue ?? 0;
    const invVal = kpis?.inventory_value ?? 0;
    const soldToday = kpis?.vehicles_sold_today ?? 0;
    const soldWeek = kpis?.vehicles_sold_this_week ?? 0;
    const asp = kpis?.average_selling_price ?? 0;
    const lowStock = kpis?.low_stock_count ?? 0;
    const totalVeh = kpis?.total_vehicles ?? 0;

    return [
      {
        label: "Today's Revenue",
        value: formatCurrency(todayRev),
        subtitle: todayRev === 0 ? 'No sales recorded today' : 'Sales recorded today',
        icon: DollarSign,
        color: 'bg-blue-50 text-blue-600 border border-blue-200/60',
      },
      {
        label: 'Weekly Revenue',
        value: formatCurrency(weekRev),
        subtitle: weekRev === 0 ? 'No sales this week' : `${soldWeek} sale${soldWeek === 1 ? '' : 's'} this week`,
        icon: TrendingUp,
        color: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
      },
      {
        label: 'Monthly Revenue',
        value: formatCurrency(monthRev),
        subtitle: monthRev === 0 ? 'No sales this month' : 'Current month total',
        icon: Calendar,
        color: 'bg-indigo-50 text-indigo-600 border border-indigo-200/60',
      },
      {
        label: 'Inventory Value',
        value: formatCurrency(invVal),
        subtitle: `${totalVeh} active vehicle unit${totalVeh === 1 ? '' : 's'} in stock`,
        icon: BadgeDollarSign,
        color: 'bg-violet-50 text-violet-600 border border-violet-200/60',
      },
      {
        label: 'Sold Today',
        value: soldToday,
        subtitle: soldToday === 0 ? 'No orders placed today' : 'Vehicles purchased today',
        icon: Zap,
        color: 'bg-amber-50 text-amber-600 border border-amber-200/60',
      },
      {
        label: 'Sold This Week',
        value: soldWeek,
        subtitle: soldWeek === 0 ? 'No orders placed this week' : 'Vehicles purchased this week',
        icon: ShoppingBag,
        color: 'bg-cyan-50 text-cyan-600 border border-cyan-200/60',
      },
      {
        label: 'Average Selling Price',
        value: formatCurrency(asp),
        subtitle: asp === 0 ? 'No sales data yet' : 'Average revenue per unit',
        icon: CarFront,
        color: 'bg-sky-50 text-sky-600 border border-sky-200/60',
      },
      {
        label: 'Low Stock Alerts',
        value: lowStock,
        subtitle: lowStock > 0 ? 'Requires attention' : 'All stock levels healthy',
        icon: TriangleAlert,
        color: lowStock > 0 ? 'bg-rose-50 text-rose-600 border border-rose-200/60' : 'bg-slate-50 text-slate-600 border border-slate-200/60',
        isWarning: lowStock > 0,
      },
    ];
  }, [kpis]);

  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, subtitle, icon: Icon, color, isWarning }) => (
        <Card
          key={label}
          className={`p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
            isWarning ? 'border-rose-200/90 bg-rose-50/20' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {label}
              </p>
              <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                {value}
              </h3>
              <p className={`mt-1 text-xs font-semibold ${isWarning ? 'text-rose-600' : 'text-slate-500'}`}>
                {subtitle}
              </p>
            </div>
            <div className={`rounded-xl p-2.5 shadow-2xs ${color}`}>
              <Icon size={19} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
