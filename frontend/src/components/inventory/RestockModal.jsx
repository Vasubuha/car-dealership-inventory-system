import { useState } from 'react';
import { PackagePlus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import { vehicleService } from '../../services/vehicleService';

export default function RestockModal({ isOpen, vehicle, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !vehicle) return null;

  const handleClose = () => {
    setQuantity('1');
    setErrorMsg('');
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const qtyNum = Number(quantity);

    if (!quantity || isNaN(qtyNum) || qtyNum <= 0) {
      setErrorMsg('Quantity must be greater than zero.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await vehicleService.restockVehicle(vehicle.id, qtyNum);
      toast.success(
        response?.message || `Successfully restocked ${vehicle.make} ${vehicle.model}.`
      );
      onSuccess?.();
      handleClose();
    } catch (err) {
      const status = err.response?.status;
      const detail = err.response?.data?.detail;
      let toastMessage = 'Restock could not be completed. Please try again.';

      if (status === 403) {
        toastMessage = 'Access denied. Only administrators can restock inventory.';
      } else if (status === 404) {
        toastMessage = 'Vehicle not found or no longer exists.';
      } else if (status === 422) {
        if (Array.isArray(detail)) {
          toastMessage = detail.map((d) => d.msg).join(', ');
        } else if (typeof detail === 'string') {
          toastMessage = detail;
        } else {
          toastMessage = 'Invalid quantity provided. Quantity must be greater than 0.';
        }
      } else if (status === 500) {
        toastMessage = 'Internal server error. Please try again later.';
      } else if (typeof detail === 'string') {
        toastMessage = detail;
      }

      toast.error(toastMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="restock-modal-title"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <PackagePlus size={20} />
            </span>
            <div>
              <h2 id="restock-modal-title" className="font-bold text-slate-900">
                Restock Inventory
              </h2>
              <p className="text-xs text-slate-500">Update stock count for this vehicle</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Vehicle</p>
            <p className="mt-0.5 font-bold text-slate-800 text-base">
              {vehicle.make} {vehicle.model}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Category: <strong className="text-slate-700">{vehicle.category}</strong></span>
              <span>Current Stock: <strong className="text-slate-700">{vehicle.quantity}</strong></span>
            </div>
          </div>

          <div>
            <label htmlFor="restock-quantity" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Quantity to add
            </label>
            <input
              id="restock-quantity"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter stock quantity"
              disabled={isSubmitting}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition ${
                errorMsg
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100'
                  : 'border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
              }`}
            />
            {errorMsg && <p className="mt-1 text-xs font-medium text-rose-600">{errorMsg}</p>}
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !quantity || Number(quantity) <= 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Restocking...
                </>
              ) : (
                'Restock'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
