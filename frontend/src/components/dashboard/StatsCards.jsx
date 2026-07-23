import { CarFront, CircleDollarSign, DollarSign, PackageCheck, TriangleAlert } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatCurrency';

export default function StatsCards({ vehicles, totalRevenue, activeFilter, onSelectFilter }) {
  const available = vehicles.filter((v) => v.quantity > 0).length;
  const low = vehicles.filter((v) => v.quantity >= 1 && v.quantity <= 5).length;
  const sold = vehicles.filter((v) => v.quantity === 0).length;

  const stats = [
    {
      id: '',
      label: 'Total vehicles',
      value: vehicles.length,
      icon: CarFront,
      color: 'bg-blue-50/90 text-blue-600 border border-blue-200/50',
      activeRing: 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/40',
    },
    {
      id: 'in_stock',
      label: 'Available vehicles',
      value: available,
      icon: PackageCheck,
      color: 'bg-emerald-50/90 text-emerald-600 border border-emerald-200/50',
      activeRing: 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50/40',
    },
    {
      id: 'low_stock',
      label: 'Low stock alerts',
      value: low,
      icon: TriangleAlert,
      color: 'bg-amber-50/90 text-amber-600 border border-amber-200/50',
      activeRing: 'ring-2 ring-amber-500 border-amber-400 bg-amber-50/40',
    },
    totalRevenue !== undefined && totalRevenue !== null
      ? {
          id: 'revenue',
          label: 'Total revenue',
          value: formatCurrency(totalRevenue),
          icon: DollarSign,
          color: 'bg-indigo-50/90 text-indigo-600 border border-indigo-200/50',
          activeRing: 'ring-2 ring-indigo-500 border-indigo-400 bg-indigo-50/40',
          isCurrency: true,
        }
      : {
          id: 'out_of_stock',
          label: 'Total sold out',
          value: sold,
          icon: CircleDollarSign,
          color: 'bg-violet-50/90 text-violet-600 border border-violet-200/50',
          activeRing: 'ring-2 ring-violet-500 border-violet-400 bg-violet-50/40',
        },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ id, label, value, icon: Icon, color, activeRing, isCurrency }) => {
        const isActive = (activeFilter || '') === id;
        return (
          <Card
            key={label}
            onClick={() => !isCurrency && onSelectFilter && onSelectFilter(id)}
            className={`p-5 transition-all duration-200 ${
              !isCurrency ? 'cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-[0.99]' : ''
            } ${isActive ? activeRing : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                <p className={`mt-3 font-extrabold text-slate-900 ${isCurrency ? 'text-2xl sm:text-3xl tracking-tight' : 'text-3xl'}`}>
                  {value}
                </p>
              </div>
              <span className={`rounded-xl p-3 shadow-2xs ${color}`}>
                <Icon size={22} />
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
