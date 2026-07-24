import { memo } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

function InventoryTableHeader({ sortKey, onSortToggle }) {
  const getSortIcon = (field) => {
    if (sortKey === `${field}_asc`) {
      return <ArrowUp size={13} className="text-blue-600 inline ml-1" />;
    }
    if (sortKey === `${field}_desc`) {
      return <ArrowDown size={13} className="text-blue-600 inline ml-1" />;
    }
    return <ArrowUpDown size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 inline ml-1 transition" />;
  };

  const headers = [
    { field: 'make', label: 'Vehicle Make & Model', align: 'text-left' },
    { field: 'category', label: 'Category', align: 'text-left' },
    { field: 'price', label: 'Price', align: 'text-right' },
    { field: 'stock', label: 'Stock Qty', align: 'text-center' },
    { field: 'value', label: 'Inventory Value', align: 'text-right' },
    { field: 'status', label: 'Status', align: 'text-center', sortable: false },
    { field: 'updated', label: 'Last Updated', align: 'text-right' },
    { field: 'actions', label: 'Actions', align: 'text-right', sortable: false },
  ];

  return (
    <thead className="sticky top-0 z-10 bg-slate-100/95 text-slate-500 border-b border-slate-200/90 shadow-2xs backdrop-blur-2xs">
      <tr>
        {headers.map(({ field, label, align, sortable = true }) => (
          <th
            key={field}
            scope="col"
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider ${align}`}
          >
            {sortable ? (
              <button
                type="button"
                onClick={() => onSortToggle(field)}
                className="group inline-flex items-center gap-1 font-bold hover:text-slate-900 transition focus:outline-none"
              >
                <span>{label}</span>
                {getSortIcon(field)}
              </button>
            ) : (
              <span>{label}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default memo(InventoryTableHeader);
