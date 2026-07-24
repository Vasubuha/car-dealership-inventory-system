import Card from '../common/Card';

export default function AdminDashboardSkeleton() {
  return (
    <div className="space-y-7 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-lg bg-slate-200"></div>
          <div className="h-4 w-96 rounded-lg bg-slate-200"></div>
        </div>
      </div>

      {/* KPI Cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-2.5">
                <div className="h-3 w-24 rounded bg-slate-200"></div>
                <div className="h-7 w-32 rounded bg-slate-200"></div>
                <div className="h-3 w-28 rounded bg-slate-200"></div>
              </div>
              <div className="h-11 w-11 rounded-xl bg-slate-200"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts grid skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 space-y-2">
            <div className="h-5 w-44 rounded bg-slate-200"></div>
            <div className="h-3 w-32 rounded bg-slate-200"></div>
          </div>
          <div className="h-72 w-full rounded-xl bg-slate-100"></div>
        </Card>
        <Card className="p-5">
          <div className="mb-4 space-y-2">
            <div className="h-5 w-44 rounded bg-slate-200"></div>
            <div className="h-3 w-32 rounded bg-slate-200"></div>
          </div>
          <div className="h-72 w-full rounded-xl bg-slate-100"></div>
        </Card>
        <Card className="p-5">
          <div className="mb-4 space-y-2">
            <div className="h-5 w-44 rounded bg-slate-200"></div>
            <div className="h-3 w-32 rounded bg-slate-200"></div>
          </div>
          <div className="h-72 w-full rounded-xl bg-slate-100"></div>
        </Card>
        <Card className="p-5">
          <div className="mb-4 space-y-2">
            <div className="h-5 w-44 rounded bg-slate-200"></div>
            <div className="h-3 w-32 rounded bg-slate-200"></div>
          </div>
          <div className="h-72 w-full rounded-xl bg-slate-100"></div>
        </Card>
      </div>

      {/* Table skeleton */}
      <Card className="p-5 space-y-4">
        <div className="h-6 w-48 rounded bg-slate-200"></div>
        <div className="h-48 w-full rounded-xl bg-slate-100"></div>
      </Card>
    </div>
  );
}
