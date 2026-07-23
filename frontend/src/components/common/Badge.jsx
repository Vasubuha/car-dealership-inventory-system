export default function Badge({ children, tone = 'blue' }) {
  const colors = {
    blue: 'bg-blue-50/90 text-blue-700 border border-blue-200/60',
    green: 'bg-emerald-50/90 text-emerald-700 border border-emerald-200/60',
    amber: 'bg-amber-50/90 text-amber-700 border border-amber-200/60',
    slate: 'bg-slate-100/90 text-slate-600 border border-slate-200/60',
    red: 'bg-rose-50/90 text-rose-700 border border-rose-200/60',
    rose: 'bg-rose-50/90 text-rose-700 border border-rose-200/60',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-2xs ${colors[tone] || colors.slate}`}>
      {children}
    </span>
  );
}
