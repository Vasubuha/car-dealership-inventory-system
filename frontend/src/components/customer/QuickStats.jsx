import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Car, Sparkles } from 'lucide-react';

export default function QuickStats() {
  const stats = [
    {
      label: 'Purchased Vehicles',
      value: '2',
      unit: 'Units Owned',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      label: 'Saved Wishlist',
      value: '5',
      unit: 'Bookmarked',
      icon: Heart,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-100',
    },
    {
      label: 'Marketplace Stock',
      value: '450+',
      unit: 'Available Now',
      icon: Car,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-100',
    },
    {
      label: 'Member Promotions',
      value: '4 Active',
      unit: 'Pre-Approved',
      icon: Sparkles,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500">{s.label}</span>
                  <div className={`p-2 rounded-xl ${s.bg} border`}>
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                    {s.unit}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
