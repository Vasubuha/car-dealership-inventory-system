import { useMemo, useState } from 'react';
import { useNavigate } from 'react';
import { AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import ConfirmDialog from '../components/common/ConfirmDialog';
import RestockModal from '../components/inventory/RestockModal';
import InventorySummaryCards from '../components/inventory/InventorySummaryCards';
import InventoryToolbar from '../components/inventory/InventoryToolbar';
import InventoryTable from '../components/inventory/InventoryTable';
import InventoryPagination from '../components/inventory/InventoryPagination';
import InventoryStatusBadge from '../components/inventory/InventoryStatusBadge';
import VehicleDetailsModal from '../components/inventory/VehicleDetailsModal';
import { useVehicles } from '../hooks/useVehicles';
import { vehicleService } from '../services/vehicleService';
import { formatCurrency } from '../utils/formatCurrency';

function InventoryTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs animate-pulse">
      <div className="border-b border-slate-100 bg-slate-50/80 p-4">
        <div className="h-4 w-40 rounded bg-slate-200" />
      </div>
      <div className="divide-y divide-slate-100 p-4 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="h-10 w-12 rounded bg-slate-200" />
            <div className="h-4 w-36 rounded bg-slate-200 flex-1" />
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="h-6 w-20 rounded-full bg-slate-200" />
            <div className="h-7 w-24 rounded-lg bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Inventory() {
  const navigate = useNavigate();
  const { vehicles, loading, error, refresh } = useVehicles();

  // State Management
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortKey, setSortKey] = useState('updated_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal states
  const [viewingVehicle, setViewingVehicle] = useState(null);
  const [restockingVehicle, setRestockingVehicle] = useState(null);
  const [deletingVehicle, setDeletingVehicle] = useState(null);

  // Categories list
  const categories = useMemo(
    () => [...new Set(vehicles.map((v) => v.category).filter(Boolean))].sort(),
    [vehicles]
  );

  // Composite Filtered Vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Global Search
      const query = search.trim().toLowerCase();
      if (query) {
        const makeMatch = v.make?.toLowerCase().includes(query);
        const modelMatch = v.model?.toLowerCase().includes(query);
        const catMatch = v.category?.toLowerCase().includes(query);
        if (!makeMatch && !modelMatch && !catMatch) return false;
      }

      // Category Filter
      if (category && v.category !== category) {
        return false;
      }

      // Stock Status Filter
      if (stockFilter === 'in_stock' && v.quantity <= 5) return false;
      if (stockFilter === 'low_stock' && (v.quantity < 1 || v.quantity > 5)) return false;
      if (stockFilter === 'out_of_stock' && v.quantity !== 0) return false;

      // Price Range Filter
      if (minPrice && Number(v.price) < Number(minPrice)) return false;
      if (maxPrice && Number(v.price) > Number(maxPrice)) return false;

      return true;
    });
  }, [vehicles, search, category, stockFilter, minPrice, maxPrice]);

  // Sorted Vehicles
  const sortedVehicles = useMemo(() => {
    return [...filteredVehicles].sort((a, b) => {
      if (sortKey === 'make_asc') {
        return (a.make || '').localeCompare(b.make || '');
      }
      if (sortKey === 'make_desc') {
        return (b.make || '').localeCompare(a.make || '');
      }
      if (sortKey === 'category_asc') {
        return (a.category || '').localeCompare(b.category || '');
      }
      if (sortKey === 'price_asc') {
        return Number(a.price) - Number(b.price);
      }
      if (sortKey === 'price_desc') {
        return Number(b.price) - Number(a.price);
      }
      if (sortKey === 'stock_asc') {
        return Number(a.quantity) - Number(b.quantity);
      }
      if (sortKey === 'stock_desc') {
        return Number(b.quantity) - Number(a.quantity);
      }
      if (sortKey === 'value_desc') {
        return Number(b.price) * Number(b.quantity) - Number(a.price) * Number(a.quantity);
      }
      if (sortKey === 'value_asc') {
        return Number(a.price) * Number(a.quantity) - Number(b.price) * Number(b.quantity);
      }
      // Default: updated_desc
      return new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0);
    });
  }, [filteredVehicles, sortKey]);

  // Paginated Vehicles
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedVehicles.slice(start, start + pageSize);
  }, [sortedVehicles, currentPage, pageSize]);

  // Column Header Sort Toggle
  const handleSortToggle = (field) => {
    setCurrentPage(1);
    if (sortKey === `${field}_asc`) {
      setSortKey(`${field}_desc`);
    } else {
      setSortKey(`${field}_asc`);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setStockFilter('all');
    setMinPrice('');
    setMaxPrice('');
    setSortKey('updated_desc');
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(
    search || category || stockFilter !== 'all' || minPrice || maxPrice || sortKey !== 'updated_desc'
  );

  // Delete Action
  const handleDeleteConfirm = async () => {
    if (!deletingVehicle) return;
    try {
      await vehicleService.deleteVehicle(deletingVehicle.id);
      setDeletingVehicle(null);
      refresh();
    } catch (e) {
      alert(e.response?.data?.detail ?? 'Failed to delete vehicle.');
    }
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Workspace Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
              Enterprise Inventory Management
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Manage stock allocation, vehicle attributes, asset valuations, and restock operational inventory
            </p>
          </div>
          <button
            onClick={() => navigate('/vehicles/add')}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-900/20 hover:bg-blue-700 active:scale-95 transition"
          >
            <PlusCircle size={15} /> Add New Vehicle
          </button>
        </div>

        {/* Quick Summary Cards */}
        <InventorySummaryCards
          vehicles={vehicles}
          activeStockFilter={stockFilter}
          onSelectFilter={(filterId) => {
            setStockFilter(filterId);
            setCurrentPage(1);
          }}
        />

        {/* Toolbar & Filters */}
        <InventoryToolbar
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          category={category}
          onCategoryChange={(val) => {
            setCategory(val);
            setCurrentPage(1);
          }}
          categories={categories}
          stockFilter={stockFilter}
          onStockFilterChange={(val) => {
            setStockFilter(val);
            setCurrentPage(1);
          }}
          minPrice={minPrice}
          onMinPriceChange={setMinPrice}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Workspace Content */}
        {loading ? (
          <InventoryTableSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-8 text-center shadow-2xs">
            <AlertCircle className="text-rose-600" size={36} />
            <div>
              <h3 className="font-extrabold text-slate-900">Failed to load inventory</h3>
              <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>
              <button
                onClick={refresh}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition"
              >
                <RefreshCw size={14} /> Retry Loading
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet View: Enterprise Data Table */}
            <div className="hidden sm:block">
              <InventoryTable
                vehicles={paginatedVehicles}
                sortKey={sortKey}
                onSortToggle={handleSortToggle}
                onViewDetails={setViewingVehicle}
                onEdit={(v) => navigate(`/vehicles/${v.id}/edit`)}
                onRestock={setRestockingVehicle}
                onDelete={setDeletingVehicle}
                onClearFilters={hasActiveFilters ? handleResetFilters : undefined}
              />
            </div>

            {/* Mobile View: Read-Only Compact Card Fallback */}
            <div className="space-y-3 sm:hidden">
              {paginatedVehicles.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-xs font-medium text-slate-500">
                  No vehicles matching filter criteria.
                </div>
              ) : (
                paginatedVehicles.map((v) => (
                  <div
                    key={v.id}
                    className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {v.make} {v.model}
                        </h3>
                        <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">
                          {v.category}
                        </span>
                      </div>
                      <InventoryStatusBadge quantity={v.quantity} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2.5 text-xs border border-slate-100">
                      <div>
                        <p className="text-[10px] font-semibold uppercase text-slate-400">Unit Price</p>
                        <p className="font-bold text-slate-900 mt-0.5">{formatCurrency(v.price)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase text-slate-400">Stock Qty</p>
                        <p className="font-extrabold text-slate-900 mt-0.5">{v.quantity} units</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setViewingVehicle(v)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setRestockingVehicle(v)}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-2xs"
                      >
                        Restock
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            {sortedVehicles.length > 0 && (
              <InventoryPagination
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={sortedVehicles.length}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            )}
          </>
        )}
      </div>

      {/* Modals & Dialogs */}
      <VehicleDetailsModal
        isOpen={Boolean(viewingVehicle)}
        vehicle={viewingVehicle}
        onClose={() => setViewingVehicle(null)}
        onEdit={(v) => navigate(`/vehicles/${v.id}/edit`)}
        onRestock={setRestockingVehicle}
      />

      <RestockModal
        isOpen={Boolean(restockingVehicle)}
        vehicle={restockingVehicle}
        onClose={() => setRestockingVehicle(null)}
        onSuccess={refresh}
      />

      <ConfirmDialog
        open={Boolean(deletingVehicle)}
        title="Delete Vehicle Record?"
        message={`Are you sure you want to permanently remove ${deletingVehicle?.make} ${deletingVehicle?.model} from inventory?`}
        onCancel={() => setDeletingVehicle(null)}
        onConfirm={handleDeleteConfirm}
      />
    </PageContainer>
  );
}
