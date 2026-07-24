import { memo } from 'react';
import { Eye, Edit2, PackagePlus, Trash2, Car } from 'lucide-react';
import InventoryStatusBadge from './InventoryStatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';

function InventoryTableRow({
  vehicle,
  onViewDetails,
  onEdit,
  onRestock,
  onDelete,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      return '—';
    }
  };

  const inventoryValue = (Number(vehicle.price) || 0) * (Number(vehicle.quantity) || 0);

  return (
    <tr className="group transition-colors hover:bg-slate-50/80">
      {/* Vehicle Thumbnail & Info */}
      <td className="whitespace-nowrap px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200/80 bg-slate-100 grid place-items-center">
            {vehicle.image_url ? (
              <img
                src={vehicle.image_url}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80';
                }}
              />
            ) : (
              <Car size={18} className="text-slate-400" />
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">
              {vehicle.make}
            </p>
            <p className="text-xs font-semibold text-slate-500">
              {vehicle.model}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="whitespace-nowrap px-4 py-3 text-xs">
        <span className="inline-block rounded-md bg-slate-100 px-2.5 py-0.5 font-semibold text-slate-700 border border-slate-200/50">
          {vehicle.category}
        </span>
      </td>

      {/* Price */}
      <td className="whitespace-nowrap px-4 py-3 text-right text-xs font-bold text-slate-900">
        {formatCurrency(vehicle.price)}
      </td>

      {/* Stock Quantity */}
      <td className="whitespace-nowrap px-4 py-3 text-center">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-extrabold text-slate-900">
          {vehicle.quantity}
        </span>
      </td>

      {/* Inventory Value */}
      <td className="whitespace-nowrap px-4 py-3 text-right text-xs font-extrabold text-slate-900">
        {formatCurrency(inventoryValue)}
      </td>

      {/* Status */}
      <td className="whitespace-nowrap px-4 py-3 text-center">
        <InventoryStatusBadge quantity={vehicle.quantity} />
      </td>

      {/* Last Updated */}
      <td className="whitespace-nowrap px-4 py-3 text-right text-[11px] font-medium text-slate-500">
        {formatDate(vehicle.updated_at || vehicle.created_at)}
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap px-4 py-3 text-right">
        <div className="inline-flex items-center gap-1">
          {/* View Details */}
          <button
            type="button"
            onClick={() => onViewDetails(vehicle)}
            title="View Vehicle Details"
            aria-label={`View details for ${vehicle.make} ${vehicle.model}`}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition"
          >
            <Eye size={15} />
          </button>

          {/* Edit Vehicle */}
          <button
            type="button"
            onClick={() => onEdit(vehicle)}
            title="Edit Vehicle"
            aria-label={`Edit ${vehicle.make} ${vehicle.model}`}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-amber-600 transition"
          >
            <Edit2 size={15} />
          </button>

          {/* Restock Vehicle */}
          <button
            type="button"
            onClick={() => onRestock(vehicle)}
            title="Restock Vehicle"
            aria-label={`Restock ${vehicle.make} ${vehicle.model}`}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 transition"
          >
            <PackagePlus size={15} />
          </button>

          {/* Delete Vehicle */}
          <button
            type="button"
            onClick={() => onDelete(vehicle)}
            title="Delete Vehicle"
            aria-label={`Delete ${vehicle.make} ${vehicle.model}`}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-rose-600 transition"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default memo(InventoryTableRow);
