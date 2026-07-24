import { memo } from 'react';
import { Calendar, Car, Tag, X, Edit2, PackagePlus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

function VehicleDetailsModal({ isOpen, vehicle, onClose, onEdit, onRestock }) {
  if (!isOpen || !vehicle) return null;

  const inventoryValue = (Number(vehicle.price) || 0) * (Number(vehicle.quantity) || 0);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
      return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(dateString));
    } catch {
      return '—';
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <Car size={20} />
            </span>
            <div>
              <h2 id="vehicle-modal-title" className="font-bold text-slate-900">
                Vehicle Record Details
              </h2>
              <p className="text-xs text-slate-500">Inventory attributes and asset status</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4">
          {/* Image Banner */}
          <div className="relative h-44 w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 grid place-items-center">
            {vehicle.image_url ? (
              <img
                src={vehicle.image_url}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80';
                }}
              />
            ) : (
              <Car size={36} className="text-slate-400" />
            )}
          </div>

          {/* Title & Category */}
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {vehicle.make} {vehicle.model}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700 border border-slate-200">
                <Tag size={12} /> {vehicle.category}
              </span>
            </div>
          </div>

          {/* Attribute Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unit Price</p>
              <p className="mt-0.5 text-sm font-extrabold text-slate-900">{formatCurrency(vehicle.price)}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stock Quantity</p>
              <p className="mt-0.5 text-sm font-extrabold text-slate-900">{vehicle.quantity} Units</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Asset Value</p>
              <p className="mt-0.5 text-sm font-extrabold text-blue-600">{formatCurrency(inventoryValue)}</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Modified</p>
              <p className="mt-0.5 text-xs font-bold text-slate-700">{formatDate(vehicle.updated_at || vehicle.created_at)}</p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRestock(vehicle);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
            >
              <PackagePlus size={14} /> Restock Stock
            </button>
            <button
              onClick={() => {
                onClose();
                onEdit(vehicle);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              <Edit2 size={14} /> Edit Attributes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(VehicleDetailsModal);
