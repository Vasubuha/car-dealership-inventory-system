import { lazy, Suspense, useEffect, useState } from 'react';
import { AlertCircle, LogIn, RefreshCw } from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';
import AdminKPICards from './AdminKPICards';
import RecentPurchasesTable from './RecentPurchasesTable';
import AdminDashboardSkeleton from './AdminDashboardSkeleton';

// Lazy-load Recharts components for optimal performance
const RevenueTrendChart = lazy(() => import('./charts/RevenueTrendChart'));
const WeeklySalesChart = lazy(() => import('./charts/WeeklySalesChart'));
const SalesByCategoryChart = lazy(() => import('./charts/SalesByCategoryChart'));
const TopBrandsChart = lazy(() => import('./charts/TopBrandsChart'));

export default function AdminDashboardView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    setStatusCode(null);
    try {
      // Exactly ONE API request to fetch all dashboard metrics & analytics
      const result = await dashboardService.getDashboardData();
      setData(result);
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
      const status = err.response?.status;
      setStatusCode(status);
      if (status === 401) {
        setError('Your session has expired or you are not logged in. Please sign in again.');
      } else if (status === 403) {
        setError('Administrator access is required to view dashboard analytics.');
      } else {
        setError(err.response?.data?.detail ?? 'Failed to load dealership dashboard analytics.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-5 text-rose-700 shadow-2xs">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} className="text-rose-600 shrink-0" />
            <div>
              <h3 className="font-extrabold text-slate-900">Dashboard Notice</h3>
              <p className="mt-0.5 text-xs font-medium text-rose-600">{error}</p>
            </div>
          </div>
          {statusCode === 401 ? (
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              <LogIn size={14} /> Sign In
            </a>
          ) : (
            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-rose-700 transition"
            >
              <RefreshCw size={14} /> Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header section */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl tracking-tight">
            Dealership Analytics Dashboard
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Real-time business intelligence, sales performance, and inventory health
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
        >
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Top KPI Cards Grid */}
      <AdminKPICards kpis={data?.kpis} />

      {/* 2-Column Responsive Charts Grid */}
      <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-2xl bg-slate-100" />}>
        {/* Row 1: Revenue Trend & Weekly Sales */}
        <div className="grid gap-5 lg:grid-cols-2">
          <RevenueTrendChart data={data?.salesTrend ?? []} />
          <WeeklySalesChart data={data?.weeklySales ?? []} />
        </div>

        {/* Row 2: Category Distribution & Top Brands */}
        <div className="grid gap-5 lg:grid-cols-2">
          <SalesByCategoryChart data={data?.salesByCategory ?? []} />
          <TopBrandsChart data={data?.topBrands ?? []} />
        </div>
      </Suspense>

      {/* Row 3: Recent Purchases Table */}
      <RecentPurchasesTable purchases={data?.recentPurchases ?? []} />
    </div>
  );
}
