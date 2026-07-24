import { memo } from 'react';
import { ShoppingBag, User as UserIcon } from 'lucide-react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatCurrency';

function RecentPurchasesTable({ purchases = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="overflow-hidden p-0 shadow-2xs">
      <div className="border-b border-slate-200/80 bg-slate-50/50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Recent Customer Purchases</h3>
            <p className="text-xs font-medium text-slate-500">
              Latest transactions recorded across dealership
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-200/60">
            <ShoppingBag size={14} />
            {purchases.length} Recent Sale{purchases.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {purchases.length === 0 ? (
        <div className="p-12 text-center text-sm font-medium text-slate-400">
          No customer purchases recorded yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-200/80 bg-slate-100/60 text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Vehicle</th>
                <th className="px-5 py-3.5">Unit Price</th>
                <th className="px-5 py-3.5">Qty</th>
                <th className="px-5 py-3.5">Total Amount</th>
                <th className="px-5 py-3.5">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 bg-white font-medium">
              {purchases.map((item) => (
                <tr key={item.id} className="transition hover:bg-slate-50/70">
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600">
                        <UserIcon size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{item.customer_name}</p>
                        <p className="text-xs text-slate-500">{item.customer_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div>
                      <p className="font-bold text-slate-900">
                        {item.vehicle_make} {item.vehicle_model}
                      </p>
                      <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase">
                        {item.category}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-700">
                    {formatCurrency(item.unit_price)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-extrabold text-slate-900">
                    {formatCurrency(item.total_price)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-slate-500">
                    {formatDate(item.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default memo(RecentPurchasesTable);
