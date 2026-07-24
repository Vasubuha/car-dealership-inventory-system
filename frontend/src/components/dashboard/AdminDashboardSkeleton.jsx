import Card from '../common/Card';

export default function AdminDashboardSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="h-6 w-56 rounded-md bg-slate-200"></div>
          <div className="h-3.5 w-80 rounded-md bg-slate-200"></div>
        </div>
      </div>

      {/* KPI Cards grid skeleton */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-slate-200"></div>
                <div className="h-6 w-28 rounded bg-slate-200"></div>
                <div className="h-3 w-24 rounded bg-slate-200"></div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-slate-200"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Row 1 charts skeleton */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5 space-y-3">
          <div className="h-4 w-36 rounded bg-slate-200"></div>
          <div className="h-64 w-full rounded-xl bg-slate-100"></div>
        </Card>
        <Card className="p-5 space-y-3">
          <div className="h-4 w-36 rounded bg-slate-200"></div>
          <div className="h-64 w-full rounded-xl bg-slate-100"></div>
        </Card>
      </div>

      {/* Row 2 charts skeleton */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5 space-y-3">
          <div className="h-4 w-36 rounded bg-slate-200"></div>
          <div className="h-64 w-full rounded-xl bg-slate-100"></div>
        </Card>
        <Card className="p-5 space-y-3">
          <div className="h-4 w-36 rounded bg-slate-200"></div>
          <div className="h-64 w-full rounded-xl bg-slate-100"></div>
        </Card>
      </div>

      {/* Table skeleton */}
      <Card className="p-5 space-y-3">
        <div className="h-5 w-44 rounded bg-slate-200"></div>
        <div className="h-40 w-full rounded-xl bg-slate-100"></div>
      </Card>
    </div>
  );
}
