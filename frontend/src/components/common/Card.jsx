export default function Card({ className = '', children }) {
  return (
    <section className={`rounded-2xl border border-slate-200/70 bg-white/90 shadow-2xs transition-all duration-200 backdrop-blur-2xs ${className}`}>
      {children}
    </section>
  );
}
