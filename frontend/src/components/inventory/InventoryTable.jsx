import { memo } from 'react';
import { PackagePlus } from 'lucide-react';
import InventoryTableHeader from './InventoryTableHeader';
import InventoryTableRow from './InventoryTableRow';

function InventoryTable({
  vehicles = [],
  sortKey,
  onSortToggle,
  onViewDetails,
  onEdit,
  onRestock,
  onDelete,
  onClearFilters,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
      {vehicles.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
            <PackagePlus size={24} />
          </div>
          <h3 className="text-sm font-extrabold text-slate-900">No vehicles matching filter criteria</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            Try adjusting your search query, stock status, or category filters.
          </p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="mt-3.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
          <table className="w-full text-left text-xs">
            <InventoryTableHeader sortKey={sortKey} onSortToggle={onSortToggle} />
            <tbody className="divide-y divide-slate-100/90 bg-white">
              {vehicles.map((v) => (
                <InventoryTableRow
                  key={v.id}
                  vehicle={v}
                  onViewDetails={onViewDetails}
                  onEdit={onEdit}
                  onRestock={onRestock}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default memo(InventoryTable);
