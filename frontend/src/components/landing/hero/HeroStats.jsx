import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Car, ShoppingBag, CheckCircle2 } from 'lucide-react';

function Counter({ end, suffix = '', decimals = 0, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function HeroStats() {
  const stats = [
    {
      label: 'Vehicles Managed',
      endValue: 450,
      suffix: '+',
      decimals: 0,
      icon: Car,
      color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30',
    },
    {
      label: 'Purchases Processed',
      endValue: 1200,
      suffix: '+',
      decimals: 0,
      icon: ShoppingBag,
      color: 'from-indigo-500/20 to-indigo-600/10 text-indigo-400 border-indigo-500/30',
    },
    {
      label: 'Inventory Accuracy',
      endValue: 99.8,
      suffix: '%',
      decimals: 1,
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
            className="group relative flex flex-col p-3 sm:p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-lg shadow-slate-950/20 backdrop-blur-md hover:border-slate-700/80 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 truncate">
                {stat.label}
              </span>
              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${stat.color} border shadow-xs`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight">
              <Counter
                end={stat.endValue}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
