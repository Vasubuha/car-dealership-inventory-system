import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useMemo } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { useVehicles } from '../hooks/useVehicles';
import { formatCurrency } from '../utils/formatCurrency';
import { vehicleService } from '../services/vehicleService';
import { useAuth } from '../context/AuthContext';
export default function VehicleDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { vehicles, loading, error, refresh } = useVehicles();
  const { user } = useAuth();
  const v = useMemo(() => vehicles.find((x) => String(x.id) === id), [vehicles, id]);
  if (loading)
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  if (error || !v)
    return (
      <PageContainer>
        <p className="text-slate-600">Vehicle not found.</p>
      </PageContainer>
    );
  const buy = async () => {
    try {
      await vehicleService.purchaseVehicle(v.id);
      refresh();
      nav('/vehicles');
    } catch (e) {
      alert(e.response?.data?.detail ?? 'Purchase could not be completed.');
    }
  };
  return (
    <PageContainer>
      <button
        onClick={() => nav(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
      >
        <ArrowLeft size={17} />
        Back to inventory
      </button>
      <div className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm lg:grid-cols-2">
        <div className="min-h-80 bg-gradient-to-br from-blue-950 via-blue-800 to-slate-800 p-10 text-white">
          <p className="text-sm uppercase tracking-[.25em] text-blue-200">{v.category}</p>
          <h1 className="mt-20 text-5xl font-black italic">{v.make}</h1>
          <p className="mt-2 text-xl text-blue-100">{v.model}</p>
        </div>
        <div className="p-8 lg:p-12">
          <p className="text-sm font-semibold text-slate-500">Starting at</p>
          <p className="mt-1 text-4xl font-bold text-slate-900">{formatCurrency(v.price)}</p>
          <dl className="my-10 grid grid-cols-2 gap-y-6 text-sm">
            <div>
              <dt className="text-slate-500">Category</dt>
              <dd className="mt-1 font-semibold text-slate-800">{v.category}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Availability</dt>
              <dd className="mt-1 font-semibold text-slate-800">{v.quantity} in stock</dd>
            </div>
          </dl>
          {user?.role !== 'admin' && (
            <Button className="w-full" disabled={!v.quantity} onClick={buy}>
              <ShoppingCart size={17} />
              {v.quantity ? 'Purchase vehicle' : 'Currently unavailable'}
            </Button>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
