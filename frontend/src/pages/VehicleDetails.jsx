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
        <div className="relative min-h-80 overflow-hidden bg-slate-900 p-10 text-white flex flex-col justify-between">
          <img
            src={v.imageUrl || v.image_url || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'}
            alt={`${v.make} ${v.model}`}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80';
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-blue-300 bg-blue-950/80 px-3 py-1 rounded-full inline-block backdrop-blur-xs">
              {v.category}
            </p>
          </div>
          <div className="relative z-10 mt-16">
            <h1 className="text-4xl font-black italic text-white drop-shadow-md sm:text-5xl">{v.make}</h1>
            <p className="mt-1 text-xl font-medium text-blue-100 drop-shadow-sm">{v.model}</p>
          </div>
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
