export default function MarketplaceSkeletonLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-blue-100 mb-4" />
      <div className="h-4 w-48 bg-slate-200 rounded-md mb-2" />
      <div className="h-3 w-64 bg-slate-100 rounded-md" />
    </div>
  );
}
