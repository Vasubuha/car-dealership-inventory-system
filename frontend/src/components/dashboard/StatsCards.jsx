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
      color: 'bg-blue-50 text-blue-600',
      activeRing: 'ring-2 ring-blue-500 bg-blue-50/50',
    },
    {
      id: 'in_stock',
      label: 'Available vehicles',
      value: available,
      icon: PackageCheck,
      color: 'bg-emerald-50 text-emerald-600',
      activeRing: 'ring-2 ring-emerald-500 bg-emerald-50/50',
    },
    {
      id: 'low_stock',
      label: 'Low stock',
      value: low,
      icon: TriangleAlert,
      color: 'bg-amber-50 text-amber-600',
      activeRing: 'ring-2 ring-amber-500 bg-amber-50/50',
    },
    totalRevenue !== undefined && totalRevenue !== null
      ? {
          id: 'revenue',
          label: 'Total revenue',
          value: formatCurrency(totalRevenue),
          icon: DollarSign,
          color: 'bg-emerald-50 text-emerald-600',
          activeRing: 'ring-2 ring-emerald-500 bg-emerald-50/50',
          isCurrency: true,
        }
      : {
          id: 'out_of_stock',
          label: 'Total sold out',
          value: sold,
          icon: CircleDollarSign,
          color: 'bg-violet-50 text-violet-600',
          activeRing: 'ring-2 ring-violet-500 bg-violet-50/50',
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
            className={`p-5 transition-all duration-150 ${
              !isCurrency ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : ''
            } ${isActive ? activeRing : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className={`mt-3 font-bold text-slate-900 ${isCurrency ? 'text-2xl sm:text-3xl tracking-tight' : 'text-3xl'}`}>
                  {value}
                </p>
              </div>
              <span className={`rounded-xl p-3 ${color}`}>
                <Icon size={22} />
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
