import { useMemo } from 'react';
import {
  BadgeDollarSign,
  CarFront,
  PackageCheck,
  PackageX,
  TriangleAlert,
} from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatCurrency';

export default function InventorySummaryCards({ vehicles = [], activeStockFilter, onSelectFilter }) {
  const stats = useMemo(() => {
    const total = vehicles.length;
    const inStock = vehicles.filter((v) => v.quantity > 5).length;
    const lowStock = vehicles.filter((v) => v.quantity >= 1 && v.quantity <= 5).length;
    const outOfStock = vehicles.filter((v) => v.quantity === 0).length;
    const totalValue = vehicles.reduce(
      (acc, v) => acc + (Number(v.price) || 0) * (Number(v.quantity) || 0),
      0
    );

    return [
      {
        id: 'all',
        label: 'Total Models',
        value: total,
        subtitle: `${vehicles.reduce((a, b) => a + (b.quantity || 0), 0)} total stock units`,
        icon: CarFront,
        color: 'bg-blue-50 text-blue-600 border border-blue-200/60',
        activeRing: 'ring-2 ring-blue-500 border-blue-400 bg-blue-50/40',
      },
      {
        id: 'in_stock',
        label: 'In Stock',
        value: inStock,
        subtitle: 'Optimal stock levels (> 5)',
        icon: PackageCheck,
        color: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
        activeRing: 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50/40',
      },
      {
        id: 'low_stock',
        label: 'Low Stock',
        value: lowStock,
        subtitle: 'Requires restock (1–5)',
        icon: TriangleAlert,
        color: lowStock > 0 ? 'bg-amber-50 text-amber-600 border border-amber-200/60' : 'bg-slate-50 text-slate-600 border border-slate-200/60',
        activeRing: 'ring-2 ring-amber-500 border-amber-400 bg-amber-50/40',
      },
      {
        id: 'out_of_stock',
        label: 'Out of Stock',
        value: outOfStock,
        subtitle: 'Sold out models (0)',
        icon: PackageX,
        color: outOfStock > 0 ? 'bg-rose-50 text-rose-600 border border-rose-200/60' : 'bg-slate-50 text-slate-600 border border-slate-200/60',
        activeRing: 'ring-2 ring-rose-500 border-rose-400 bg-rose-50/40',
      },
      {
        id: 'value',
        label: 'Total Inventory Value',
        value: formatCurrency(totalValue),
        subtitle: 'Asset valuation of stock',
        icon: BadgeDollarSign,
        color: 'bg-violet-50 text-violet-600 border border-violet-200/60',
        isCurrency: true,
      },
    ];
  }, [vehicles]);

  return (
    <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map(({ id, label, value, subtitle, icon: Icon, color, activeRing, isCurrency }) => {
        const isActive = activeStockFilter === id;
        return (
          <Card
            key={label}
            onClick={() => !isCurrency && onSelectFilter && onSelectFilter(id)}
            className={`p-4 transition-all duration-200 ${
              !isCurrency
                ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.99]'
                : ''
            } ${isActive ? activeRing : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <h3 className={`mt-1.5 font-extrabold tracking-tight text-slate-900 ${isCurrency ? 'text-lg sm:text-xl' : 'text-2xl'}`}>
                  {value}
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-500 truncate max-w-[160px]">
                  {subtitle}
                </p>
              </div>
              <div className={`rounded-xl p-2.5 shadow-2xs ${color}`}>
                <Icon size={19} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
