import { AlertCircle, ChevronLeft, ChevronRight, Receipt, RefreshCw, Search, ShoppingBag, X } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { usePurchaseHistory } from '../hooks/usePurchaseHistory';
import type { Purchase, PaginationMeta } from '../types/purchase';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 0 }).format(value);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function PurchaseSearchBar({
  make,
  model,
  onMakeChange,
  onModelChange,
}: {
  make: string;
  model: string;
  onMakeChange: (v: string) => void;
  onModelChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          id="purchase-filter-make"
          type="text"
          value={make}
          onChange={(e) => onMakeChange(e.target.value)}
          placeholder="Filter by make…"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-800 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        {make && (
          <button
            onClick={() => onMakeChange('')}
            aria-label="Clear make filter"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          id="purchase-filter-model"
          type="text"
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          placeholder="Filter by model…"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-800 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
        {model && (
          <button
            onClick={() => onModelChange('')}
            aria-label="Clear model filter"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading purchase history">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-3 w-24 rounded bg-slate-100" />
            </div>
            <div className="flex gap-4">
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
      <div>
        <ShoppingBag className="mx-auto mb-4 text-slate-300" size={48} />
        <h3 className="text-lg font-bold text-slate-800">
          {hasFilters ? 'No purchases match your filters' : 'No purchases yet'}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {hasFilters
            ? 'Try adjusting or clearing your search filters.'
            : 'When you purchase a vehicle it will appear here.'}
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-rose-100 bg-rose-50 p-8 text-center">
      <AlertCircle className="text-rose-400" size={40} />
      <div>
        <p className="font-semibold text-rose-700">{message}</p>
        <button
          id="purchase-history-retry"
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 active:scale-95"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    </div>
  );
}

// Desktop table row
function PurchaseHistoryTable({ purchases }: { purchases: Purchase[] }) {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:block">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">Vehicle</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4 text-center">Qty</th>
            <th className="px-5 py-4 text-right">Unit Price</th>
            <th className="px-5 py-4 text-right">Total</th>
            <th className="px-5 py-4 text-right">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {purchases.map((p) => (
            <tr
              key={p.purchase_id}
              className="group transition-colors hover:bg-blue-50/40"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-600">
                    <Receipt size={16} />
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{p.make} {p.model}</p>
                    <p className="text-xs text-slate-400">ID: {p.vehicle_id.slice(0, 8)}…</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {p.category}
                </span>
              </td>
              <td className="px-5 py-4 text-center font-medium text-slate-700">{p.quantity}</td>
              <td className="px-5 py-4 text-right text-slate-700">{formatCurrency(p.purchase_price)}</td>
              <td className="px-5 py-4 text-right font-bold text-slate-900">{formatCurrency(p.total_price)}</td>
              <td className="px-5 py-4 text-right text-slate-500">{formatDate(p.purchase_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Mobile card
function PurchaseHistoryCard({ purchase: p }: { purchase: Purchase }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md lg:hidden">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-600">
            <Receipt size={18} />
          </span>
          <div>
            <p className="font-bold text-slate-900">{p.make} {p.model}</p>
            <span className="mt-0.5 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
              {p.category}
            </span>
          </div>
        </div>
        <p className="text-right font-bold text-slate-900">{formatCurrency(p.total_price)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-3 text-sm">
        <div>
          <p className="text-xs text-slate-400">Unit Price</p>
          <p className="font-medium text-slate-700">{formatCurrency(p.purchase_price)}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Quantity</p>
          <p className="font-medium text-slate-700">{p.quantity}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-slate-400">Purchased on</p>
          <p className="font-medium text-slate-700">{formatDate(p.purchase_date)}</p>
        </div>
      </div>
    </div>
  );
}

function Pagination({
  meta,
  onPageChange,
}: {
  meta: PaginationMeta;
  onPageChange: (p: number) => void;
}) {
  if (meta.total_pages <= 1) return null;
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-sm">
      <p className="text-sm text-slate-500">
        Page <span className="font-semibold text-slate-800">{meta.page}</span> of{' '}
        <span className="font-semibold text-slate-800">{meta.total_pages}</span>
        <span className="ml-2 text-slate-400">({meta.total} records)</span>
      </p>
      <div className="flex gap-2">
        <button
          id="purchase-pagination-prev"
          onClick={() => onPageChange(meta.page - 1)}
          disabled={meta.page <= 1}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={15} />
          Prev
        </button>
        <button
          id="purchase-pagination-next"
          onClick={() => onPageChange(meta.page + 1)}
          disabled={meta.page >= meta.total_pages}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PurchaseHistoryPage() {
  const { purchases, meta, loading, error, page, make, model, setPage, setMake, setModel, refresh } =
    usePurchaseHistory(10);

  const hasFilters = Boolean(make || model);

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Purchase History</h1>
            <p className="mt-1 text-sm text-slate-500">
              All vehicles you have purchased, newest first.
            </p>
          </div>
          {!loading && !error && meta.total > 0 && (
            <span className="self-start rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 sm:self-auto">
              {meta.total} purchase{meta.total !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Search bar */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Filter purchases
          </p>
          <PurchaseSearchBar
            make={make}
            model={model}
            onMakeChange={setMake}
            onModelChange={setModel}
          />
        </div>

        {/* Content area */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={refresh} />
        ) : purchases.length === 0 ? (
          <EmptyState hasFilters={hasFilters} />
        ) : (
          <>
            {/* Desktop table */}
            <PurchaseHistoryTable purchases={purchases} />

            {/* Mobile cards */}
            <div className="space-y-3 lg:hidden">
              {purchases.map((p) => (
                <PurchaseHistoryCard key={p.purchase_id} purchase={p} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </div>
    </PageContainer>
  );
}
