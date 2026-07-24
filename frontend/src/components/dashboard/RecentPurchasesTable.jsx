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
      <div className="border-b border-slate-200/80 bg-slate-50/60 px-5 py-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">Recent Customer Purchases</h3>
            <p className="text-xs font-medium text-slate-500">
              Latest transactions recorded across dealership
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600 border border-blue-200/60">
            <ShoppingBag size={13} />
            {purchases.length} Sale{purchases.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {purchases.length === 0 ? (
        <div className="p-8 text-center text-xs font-medium text-slate-400">
          No customer purchases recorded yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="border-b border-slate-200/80 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Customer</th>
                <th className="px-4 py-2.5">Vehicle</th>
                <th className="px-4 py-2.5 text-right">Unit Price</th>
                <th className="px-4 py-2.5 text-right">Qty</th>
                <th className="px-4 py-2.5 text-right">Total Amount</th>
                <th className="px-4 py-2.5 text-right">Purchase Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-medium">
              {purchases.map((item) => (
                <tr key={item.id} className="transition hover:bg-slate-50/80">
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-slate-500 shrink-0">
                        <UserIcon size={14} />
                      </div>
                      <div className="truncate max-w-[160px]">
                        <p className="font-bold text-slate-900 truncate">{item.customer_name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{item.customer_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">
                        {item.vehicle_make} {item.vehicle_model}
                      </p>
                      <span className="inline-block rounded bg-slate-100 px-1.5 py-0.2 text-[10px] font-bold tracking-wide text-slate-500 uppercase">
                        {item.category}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-slate-700">
                    {formatCurrency(item.unit_price)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[11px] font-extrabold text-blue-700">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-extrabold text-slate-900 text-sm">
                    {formatCurrency(item.total_price)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-[11px] font-normal text-slate-400">
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
