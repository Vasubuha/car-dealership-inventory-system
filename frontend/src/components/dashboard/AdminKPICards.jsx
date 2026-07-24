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
  const cards = useMemo(
    () => [
      {
        label: "Today's Revenue",
        value: formatCurrency(kpis?.todays_revenue ?? 0),
        subtitle: 'Sales recorded today',
        icon: DollarSign,
        color: 'bg-blue-50 text-blue-600 border border-blue-200/60',
        badgeColor: 'bg-blue-100 text-blue-700',
      },
      {
        label: 'Weekly Revenue',
        value: formatCurrency(kpis?.weekly_revenue ?? 0),
        subtitle: 'Current week total',
        icon: TrendingUp,
        color: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
        badgeColor: 'bg-emerald-100 text-emerald-700',
      },
      {
        label: 'Monthly Revenue',
        value: formatCurrency(kpis?.monthly_revenue ?? 0),
        subtitle: 'Current month total',
        icon: Calendar,
        color: 'bg-indigo-50 text-indigo-600 border border-indigo-200/60',
        badgeColor: 'bg-indigo-100 text-indigo-700',
      },
      {
        label: 'Inventory Value',
        value: formatCurrency(kpis?.inventory_value ?? 0),
        subtitle: 'Total value of active stock',
        icon: BadgeDollarSign,
        color: 'bg-violet-50 text-violet-600 border border-violet-200/60',
        badgeColor: 'bg-violet-100 text-violet-700',
      },
      {
        label: 'Sold Today',
        value: kpis?.vehicles_sold_today ?? 0,
        subtitle: 'Vehicles purchased today',
        icon: Zap,
        color: 'bg-amber-50 text-amber-600 border border-amber-200/60',
        badgeColor: 'bg-amber-100 text-amber-700',
      },
      {
        label: 'Sold This Week',
        value: kpis?.vehicles_sold_this_week ?? 0,
        subtitle: 'Vehicles purchased this week',
        icon: ShoppingBag,
        color: 'bg-cyan-50 text-cyan-600 border border-cyan-200/60',
        badgeColor: 'bg-cyan-100 text-cyan-700',
      },
      {
        label: 'Average Selling Price',
        value: formatCurrency(kpis?.average_selling_price ?? 0),
        subtitle: 'Average revenue per unit',
        icon: CarFront,
        color: 'bg-sky-50 text-sky-600 border border-sky-200/60',
        badgeColor: 'bg-sky-100 text-sky-700',
      },
      {
        label: 'Low Stock Alerts',
        value: kpis?.low_stock_count ?? 0,
        subtitle: 'Vehicles with ≤ 5 units left',
        icon: TriangleAlert,
        color: 'bg-rose-50 text-rose-600 border border-rose-200/60',
        badgeColor: 'bg-rose-100 text-rose-700',
        isWarning: (kpis?.low_stock_count ?? 0) > 0,
      },
    ],
    [kpis]
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(
        ({ label, value, subtitle, icon: Icon, color, isWarning }) => (
          <Card
            key={label}
            className={`p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
              isWarning ? 'border-rose-200 bg-rose-50/20' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {value}
                </h3>
                <p className="mt-1.5 text-xs font-medium text-slate-500">{subtitle}</p>
              </div>
              <div className={`rounded-xl p-3 shadow-2xs ${color}`}>
                <Icon size={22} />
              </div>
            </div>
          </Card>
        )
      )}
    </div>
  );
}
