import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { vehicleService } from '../../services/vehicleService';
import { useVehicles } from '../../hooks/useVehicles';
const fields = ['make', 'model', 'category', 'price', 'quantity'];
export default function EditVehicle() {
  const { id } = useParams();
  const { vehicles, loading } = useVehicles();
  const [changes, setChanges] = useState({});
  const [error, setError] = useState('');
  const nav = useNavigate();
  const vehicle = vehicles.find((v) => String(v.id) === id);
  const form = { ...vehicle, ...changes };
  if (loading || !vehicle)
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  const submit = async (e) => {
    e.preventDefault();
    try {
      await vehicleService.updateVehicle(id, {
        make: form.make,
        model: form.model,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      nav('/vehicles');
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Unable to update vehicle.');
    }
  };
  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900">Edit vehicle</h1>
        <form
          onSubmit={submit}
          className="mt-8 grid gap-5 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2"
        >
          {fields.map((f) => (
            <label key={f} className={f === 'category' ? 'sm:col-span-2' : ''}>
              <span className="mb-2 block text-sm font-semibold capitalize text-slate-700">
                {f}
              </span>
              <input
                required
                type={f === 'price' || f === 'quantity' ? 'number' : 'text'}
                min={f === 'quantity' ? 0 : f === 'price' ? 0.01 : undefined}
                step={f === 'price' ? '0.01' : undefined}
                value={form[f]}
                onChange={(e) => setChanges({ ...changes, [f]: e.target.value })}
              />
            </label>
          ))}
          {error && <p className="sm:col-span-2 text-sm text-rose-600">{error}</p>}
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="secondary" onClick={() => nav(-1)}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
