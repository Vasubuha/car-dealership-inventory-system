import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Save, Sparkles } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import VehicleCard from '../../components/dashboard/VehicleCard';
import { vehicleService } from '../../services/vehicleService';
import { useVehicles } from '../../hooks/useVehicles';
import { VEHICLE_CATEGORIES } from '../../constants/categories';

export default function EditVehicle() {
  const { id } = useParams();
  const { vehicles, loading } = useVehicles();
  const [changes, setChanges] = useState({});
  const [urlError, setUrlError] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nav = useNavigate();

  const vehicle = vehicles.find((v) => String(v.id) === id);

  const form = {
    make: '',
    model: '',
    category: '',
    price: '',
    quantity: 1,
    imageUrl: '',
    ...vehicle,
    imageUrl: changes.imageUrl !== undefined ? changes.imageUrl : (vehicle?.imageUrl || vehicle?.image_url || ''),
    ...changes,
  };

  const handleImageUrlChange = (val) => {
    setChanges((prev) => ({ ...prev, imageUrl: val }));
    if (val.trim()) {
      try {
        const parsed = new URL(val.trim());
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
          setUrlError('');
        } else {
          setUrlError('URL must start with http:// or https://');
        }
      } catch {
        setUrlError('Please enter a valid URL (e.g., https://example.com/car.jpg)');
      }
    } else {
      setUrlError('');
    }
  };

  if (loading || !vehicle) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      </PageContainer>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    const currentImg = form.imageUrl?.trim() || '';
    if (currentImg) {
      try {
        const parsed = new URL(currentImg);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          setUrlError('URL must start with http:// or https://');
          return;
        }
      } catch {
        setUrlError('Please enter a valid URL (e.g., https://example.com/car.jpg)');
        return;
      }
    }

    if (!form.category) {
      setError('Please select a vehicle category.');
      return;
    }

    setIsSubmitting(true);
    try {
      let cleanUrl = currentImg;
      if (cleanUrl && !/^https?:\/\//i.test(cleanUrl)) {
        cleanUrl = 'https://' + cleanUrl;
      }

      const payload = {
        make: form.make.trim(),
        model: form.model.trim(),
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
        imageUrl: cleanUrl || null,
        image_url: cleanUrl || null,
      };

      await vehicleService.updateVehicle(id, payload);
      nav('/vehicles');
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Unable to update vehicle. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Navigation / Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              onClick={() => nav(-1)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition mb-2"
            >
              <ArrowLeft size={14} /> Back to vehicles
            </button>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Edit vehicle: {vehicle.make} {vehicle.model}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Update vehicle specs, category, pricing, and image URL with real-time preview.
            </p>
          </div>
        </div>

        {/* Main Content Grid: Form (left) & Live Preview (right) */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left: Edit Vehicle Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Make */}
                <div>
                  <label htmlFor="edit-vehicle-make" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Make <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="edit-vehicle-make"
                    required
                    type="text"
                    placeholder="e.g. Toyota, BMW, Tesla"
                    value={form.make}
                    onChange={(e) => setChanges({ ...changes, make: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Model */}
                <div>
                  <label htmlFor="edit-vehicle-model" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Model <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="edit-vehicle-model"
                    required
                    type="text"
                    placeholder="e.g. Camry, M3, Model 3"
                    value={form.model}
                    onChange={(e) => setChanges({ ...changes, model: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="sm:col-span-2">
                  <label htmlFor="edit-vehicle-category" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="edit-vehicle-category"
                    required
                    value={form.category}
                    onChange={(e) => setChanges({ ...changes, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">Select Category</option>
                    {VEHICLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="edit-vehicle-price" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Price ($) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="edit-vehicle-price"
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 35000"
                    value={form.price}
                    onChange={(e) => setChanges({ ...changes, price: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="edit-vehicle-quantity" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Stock Quantity <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="edit-vehicle-quantity"
                    required
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 5"
                    value={form.quantity}
                    onChange={(e) => setChanges({ ...changes, quantity: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Image URL Input */}
                <div className="sm:col-span-2">
                  <label htmlFor="edit-vehicle-image-url" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Image URL <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="edit-vehicle-image-url"
                    type="text"
                    placeholder="https://example.com/car.jpg"
                    value={form.imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 outline-none transition ${
                      urlError
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-50'
                        : 'border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50'
                    }`}
                  />
                  {urlError ? (
                    <p className="mt-1 text-xs font-medium text-rose-600">{urlError}</p>
                  ) : (
                    <p className="mt-1 text-xs text-slate-400">
                      Enter a direct image link ending in .jpg, .png, or Unsplash URL.
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-xs font-medium text-rose-700">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => nav(-1)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || Boolean(urlError)}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-1.5" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-1.5" />
                      Save changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Right: Live Preview Card */}
          <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                <h3 className="font-bold text-slate-800 text-sm">Live Card Preview</h3>
              </div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Real-time
              </span>
            </div>

            {/* Render Vehicle Card Preview */}
            <VehicleCard vehicle={form} isPreview />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
