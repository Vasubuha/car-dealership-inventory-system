import { memo } from 'react';
import { CheckCircle2, PackageX, TriangleAlert } from 'lucide-react';

function InventoryStatusBadge({ quantity }) {
  if (quantity > 5) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200/60 shadow-2xs">
        <CheckCircle2 size={12} className="text-emerald-600" />
        In Stock
      </span>
    );
  }
  if (quantity >= 1) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-200/60 shadow-2xs">
        <TriangleAlert size={12} className="text-amber-600" />
        Low Stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700 border border-rose-200/60 shadow-2xs">
      <PackageX size={12} className="text-rose-600" />
      Out of Stock
    </span>
  );
}

export default memo(InventoryStatusBadge);
