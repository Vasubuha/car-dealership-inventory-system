export default function Button({ className = '', variant = 'primary', children, ...props }) {
  const styles = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-xs shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/25 border border-transparent',
    secondary:
      'bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50/90 active:bg-slate-100 hover:border-slate-300 shadow-2xs',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs shadow-rose-500/20 hover:shadow-md border border-transparent',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150 ease-out active:scale-[0.98] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500/25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
