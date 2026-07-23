import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, PlusCircle, Sparkles } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import VehicleCard from '../../components/dashboard/VehicleCard';
import { vehicleService } from '../../services/vehicleService';
import { VEHICLE_CATEGORIES } from '../../constants/categories';

export default function AddVehicle() {
  const [form, setForm] = useState({
    make: '',
    model: '',
    category: '',
    price: '',
    quantity: '1',
    imageUrl: '',
  });
  const [urlError, setUrlError] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const nav = useNavigate();

  const handleImageUrlChange = (val) => {
    setForm((prev) => ({ ...prev, imageUrl: val }));
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

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.imageUrl.trim()) {
      try {
        const parsed = new URL(form.imageUrl.trim());
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
      let cleanUrl = form.imageUrl.trim();
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

      await vehicleService.createVehicle(payload);
      nav('/vehicles');
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Unable to create vehicle. Please try again.');
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
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Add vehicle</h1>
            <p className="mt-1 text-sm text-slate-500">
              Add a new vehicle to your dealership inventory with live preview.
            </p>
          </div>
        </div>

        {/* Main Content Grid: Form (left) & Live Preview (right) */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left: Add Vehicle Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Make */}
                <div>
                  <label htmlFor="add-vehicle-make" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Make <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="add-vehicle-make"
                    required
                    type="text"
                    placeholder="e.g. Toyota, BMW, Tesla"
                    value={form.make}
                    onChange={(e) => setForm({ ...form, make: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Model */}
                <div>
                  <label htmlFor="add-vehicle-model" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Model <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="add-vehicle-model"
                    required
                    type="text"
                    placeholder="e.g. Camry, M3, Model 3"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="sm:col-span-2">
                  <label htmlFor="add-vehicle-category" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="add-vehicle-category"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                  <label htmlFor="add-vehicle-price" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Price ($) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="add-vehicle-price"
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 35000"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="add-vehicle-quantity" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Stock Quantity <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="add-vehicle-quantity"
                    required
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 5"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Image URL Input */}
                <div className="sm:col-span-2">
                  <label htmlFor="add-vehicle-image-url" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Image URL <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="add-vehicle-image-url"
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
                      Adding vehicle...
                    </>
                  ) : (
                    <>
                      <PlusCircle size={16} className="mr-1.5" />
                      Add vehicle
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
