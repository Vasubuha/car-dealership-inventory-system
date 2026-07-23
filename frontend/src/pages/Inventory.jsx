import { useMemo, useState } from 'react';
import { Search, X, PackagePlus, ArrowUpDown, Filter, AlertCircle, RefreshCw } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import RestockModal from '../components/inventory/RestockModal';
import { useVehicles } from '../hooks/useVehicles';
import { formatCurrency } from '../utils/formatCurrency';

function InventoryTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm" aria-busy="true" aria-label="Loading inventory">
      <div className="animate-pulse">
        <div className="border-b border-slate-100 bg-slate-50/50 p-4">
          <div className="h-4 w-32 rounded bg-slate-200" />
        </div>
        <div className="divide-y divide-slate-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 gap-4">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-44 rounded bg-slate-200" />
                <div className="h-3 w-24 rounded bg-slate-100" />
              </div>
              <div className="h-4 w-20 rounded bg-slate-200 hidden sm:block" />
              <div className="h-4 w-20 rounded bg-slate-200 hidden md:block" />
              <div className="h-6 w-24 rounded-full bg-slate-200" />
              <div className="h-9 w-24 rounded-xl bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StockStatusBadge({ quantity }) {
  if (quantity > 5) {
    return <Badge tone="green">In Stock</Badge>;
  }
  if (quantity >= 1) {
    return <Badge tone="amber">Low Stock</Badge>;
  }
  return <Badge tone="red">Out of Stock</Badge>;
}

export default function Inventory() {
  const { vehicles, loading, error, refresh } = useVehicles();
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('highest_stock');
  const [selectedVehicleForRestock, setSelectedVehicleForRestock] = useState(null);

  const filteredAndSorted = useMemo(() => {
    return vehicles
      .filter((v) => {
        const query = search.trim().toLowerCase();
        if (query) {
          const makeMatch = v.make?.toLowerCase().includes(query);
          const modelMatch = v.model?.toLowerCase().includes(query);
          if (!makeMatch && !modelMatch) return false;
        }

        if (stockFilter === 'in_stock') {
          return v.quantity > 5;
        }
        if (stockFilter === 'low_stock') {
          return v.quantity >= 1 && v.quantity <= 5;
        }
        if (stockFilter === 'out_of_stock') {
          return v.quantity === 0;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'highest_stock') {
          return b.quantity - a.quantity;
        }
        if (sortBy === 'lowest_stock') {
          return a.quantity - b.quantity;
        }
        if (sortBy === 'newest') {
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        }
        return 0;
      });
  }, [vehicles, search, stockFilter, sortBy]);

  const totalStockCount = useMemo(
    () => vehicles.reduce((acc, curr) => acc + (curr.quantity || 0), 0),
    [vehicles]
  );

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor vehicle stock levels and restock inventory.
            </p>
          </div>
          {!loading && !error && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                Total Units: {totalStockCount}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {vehicles.length} vehicle models
              </span>
            </div>
          )}
        </div>

        {/* Top Toolbar */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm space-y-3">
          <div className="grid gap-3 md:grid-cols-12">
            {/* Search field */}
            <div className="relative md:col-span-6 lg:col-span-6">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                id="inventory-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by make or model..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-800 shadow-xs outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Dropdown Filter */}
            <div className="relative md:col-span-3 lg:col-span-3">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Filter size={16} />
              </div>
              <select
                id="inventory-filter-stock"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-800 shadow-xs outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Stock</option>
                <option value="in_stock">In Stock (&gt; 5)</option>
                <option value="low_stock">Low Stock (1–5)</option>
                <option value="out_of_stock">Out of Stock (0)</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative md:col-span-3 lg:col-span-3">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <ArrowUpDown size={16} />
              </div>
              <select
                id="inventory-sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-800 shadow-xs outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              >
                <option value="highest_stock">Highest Stock</option>
                <option value="lowest_stock">Lowest Stock</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <InventoryTableSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-rose-100 bg-rose-50 p-8 text-center">
            <AlertCircle className="text-rose-400" size={40} />
            <div>
              <p className="font-semibold text-rose-700">{error}</p>
              <button
                id="inventory-retry-button"
                onClick={refresh}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 active:scale-95"
              >
                <RefreshCw size={14} />
                Retry
              </button>
            </div>
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-xs">
            <div>
              <PackagePlus className="mx-auto mb-3 text-slate-300" size={44} />
              <h3 className="font-bold text-slate-800 text-lg">No inventory available.</h3>
              <p className="mt-1 text-sm text-slate-500">
                Add vehicle to begin managing stock.
              </p>
              {(search || stockFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setStockFilter('all');
                  }}
                  className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet Table */}
            <div className="hidden sm:block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Vehicle</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4 text-right">Price</th>
                    <th className="px-5 py-4 text-center">Current Stock</th>
                    <th className="px-5 py-4 text-center">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredAndSorted.map((v) => (
                    <tr
                      key={v.id}
                      className="group transition-colors hover:bg-blue-50/30"
                    >
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {v.make} {v.model}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <span className="inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {v.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-medium text-slate-700">
                        {formatCurrency(v.price)}
                      </td>
                      <td className="px-5 py-4 text-center font-bold text-slate-900">
                        {v.quantity}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <StockStatusBadge quantity={v.quantity} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button
                          variant="secondary"
                          onClick={() => setSelectedVehicleForRestock(v)}
                          className="!py-1.5 !px-3 text-xs"
                        >
                          <PackagePlus size={14} />
                          Restock
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Cards */}
            <div className="space-y-3 sm:hidden">
              {filteredAndSorted.map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">
                        {v.make} {v.model}
                      </h3>
                      <span className="mt-1 inline-block rounded-lg bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {v.category}
                      </span>
                    </div>
                    <StockStatusBadge quantity={v.quantity} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 text-xs">
                    <div>
                      <p className="text-slate-400">Price</p>
                      <p className="font-semibold text-slate-700 mt-0.5">
                        {formatCurrency(v.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Current Stock</p>
                      <p className="font-bold text-slate-900 mt-0.5">
                        {v.quantity} units
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-end">
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedVehicleForRestock(v)}
                      className="w-full justify-center !py-2 text-xs"
                    >
                      <PackagePlus size={14} />
                      Restock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Restock Modal */}
      <RestockModal
        isOpen={Boolean(selectedVehicleForRestock)}
        vehicle={selectedVehicleForRestock}
        onClose={() => setSelectedVehicleForRestock(null)}
        onSuccess={refresh}
      />
    </PageContainer>
  );
}
