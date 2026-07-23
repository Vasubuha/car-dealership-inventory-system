import { KeyRound, ShieldCheck, Server, Code2 } from 'lucide-react';

export default function HeroTrustBadges() {
  const trustItems = [
    {
      icon: KeyRound,
      label: 'JWT Authentication',
      color: 'text-amber-400',
    },
    {
      icon: ShieldCheck,
      label: 'Role Based Access',
      color: 'text-emerald-400',
    },
    {
      icon: Server,
      label: 'FastAPI Backend',
      color: 'text-sky-400',
    },
    {
      icon: Code2,
      label: 'React Frontend',
      color: 'text-blue-400',
    },
  ];

  return (
    <div className="pt-4 border-t border-slate-800/60">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
        Enterprise Security & Architecture
      </p>
      <div className="flex flex-wrap items-center gap-y-2.5 gap-x-5">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm text-xs font-medium text-slate-300 shadow-2xs hover:border-slate-700 transition-colors"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
