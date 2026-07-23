import { useEffect, useMemo, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsCards from '../components/dashboard/StatsCards';
import SearchBar from '../components/dashboard/SearchBar';
import FilterBar from '../components/dashboard/FilterBar';
import VehicleGrid from '../components/dashboard/VehicleGrid';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import RestockModal from '../components/inventory/RestockModal';
import { useVehicles } from '../hooks/useVehicles';
import { vehicleService } from '../services/vehicleService';
import { purchaseService } from '../services/purchaseService';
import { useAuth } from '../context/AuthContext';

export default function Dashboard({
  vehicles: sourceVehicles,
  loading: sourceLoading,
  error: sourceError,
  refresh: sourceRefresh,
  title,
}) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const hook = useVehicles();
  const vehicles = sourceVehicles ?? hook.vehicles;
  const loading = sourceLoading ?? hook.loading;
  const error = sourceError ?? hook.error;
  const refresh = sourceRefresh ?? hook.refresh;
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', stock: '', min: '', max: '', sort: 'newest' });
  const [deleting, setDeleting] = useState(null);
  const [restockingVehicle, setRestockingVehicle] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      purchaseService
        .getRevenueSummary()
        .then((res) => setTotalRevenue(res.total_revenue))
        .catch(() => setTotalRevenue(0));
    }
  }, [isAdmin, vehicles]);

  const categories = useMemo(() => [...new Set(vehicles.map((v) => v.category))], [vehicles]);

  const filtered = useMemo(
    () =>
      vehicles
        .filter((v) => `${v.make} ${v.model}`.toLowerCase().includes(search.toLowerCase()))
        .filter((v) => !filters.category || v.category === filters.category)
        .filter((v) => {
          if (!filters.stock) return true;
          if (filters.stock === 'in_stock') return v.quantity > 5;
          if (filters.stock === 'low_stock') return v.quantity >= 1 && v.quantity <= 5;
          if (filters.stock === 'out_of_stock') return v.quantity === 0;
          return true;
        })
        .filter((v) => !filters.min || Number(v.price) >= Number(filters.min))
        .filter((v) => !filters.max || Number(v.price) <= Number(filters.max))
        .sort((a, b) =>
          filters.sort === 'price-low'
            ? a.price - b.price
            : filters.sort === 'price-high'
              ? b.price - a.price
              : filters.sort === 'name'
                ? a.make.localeCompare(b.make)
                : new Date(b.created_at) - new Date(a.created_at)
        ),
    [vehicles, search, filters]
  );

  const purchase = async (v) => {
    try {
      await vehicleService.purchaseVehicle(v.id);
      refresh();
    } catch (e) {
      alert(e.response?.data?.detail ?? 'Purchase could not be completed.');
    }
  };

  const remove = async () => {
    try {
      await vehicleService.deleteVehicle(deleting.id);
      setDeleting(null);
      refresh();
    } catch (e) {
      alert(e.response?.data?.detail ?? 'Vehicle could not be deleted.');
    }
  };

  return (
    <PageContainer>
      <div className="space-y-7">
        <DashboardHeader count={vehicles.length} />
        {!title && (
          <StatsCards
            vehicles={vehicles}
            totalRevenue={isAdmin ? totalRevenue : undefined}
            activeFilter={filters.stock}
            onSelectFilter={(stockVal) => setFilters((f) => ({ ...f, stock: stockVal }))}
          />
        )}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">{title || 'Inventory overview'}</h2>
              <p className="text-sm text-slate-500">
                {filtered.length} vehicle{filtered.length === 1 ? '' : 's'} matching
                {filters.stock && (
                  <button
                    onClick={() => setFilters((f) => ({ ...f, stock: '' }))}
                    className="ml-2 font-semibold text-blue-600 hover:underline"
                  >
                    (Clear stock filter)
                  </button>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 xl:flex-row">
            <SearchBar value={search} onChange={setSearch} />
            <div className="xl:w-[720px]">
              <FilterBar
                filters={filters}
                categories={categories}
                onChange={(key, value) => setFilters((f) => ({ ...f, [key]: value }))}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="rounded-xl border border-rose-100 bg-rose-50 p-5 text-rose-700">
            <AlertCircle className="inline mr-2" size={18} />
            {error}
          </div>
        ) : filtered.length ? (
          <VehicleGrid
            vehicles={filtered}
            onPurchase={purchase}
            onRestock={(v) => setRestockingVehicle(v)}
            onDelete={setDeleting}
          />
        ) : (
          <EmptyState />
        )}
      </div>
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete vehicle?"
        message={`This will permanently remove ${deleting?.make || 'this vehicle'} from inventory.`}
        onCancel={() => setDeleting(null)}
        onConfirm={remove}
      />
      <RestockModal
        isOpen={Boolean(restockingVehicle)}
        vehicle={restockingVehicle}
        onClose={() => setRestockingVehicle(null)}
        onSuccess={refresh}
      />
    </PageContainer>
  );
}
