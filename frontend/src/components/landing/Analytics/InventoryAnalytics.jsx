import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Layers, DollarSign, Clock, ArrowUpRight } from 'lucide-react';

export default function InventoryAnalytics() {
  const metrics = [
    {
      title: 'Vehicles Sold',
      value: '3,420 Units',
      change: '+22.4% vs last Qtr',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      title: 'Active Inventory Value',
      value: '₹145 Crore',
      change: '+14.8% growth',
      icon: DollarSign,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Available Stock',
      value: '450 Active',
      change: 'Audit verified',
      icon: Layers,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-100',
    },
    {
      title: 'Monthly Revenue',
      value: '₹28.4 Crore',
      change: '+18.2% MoM',
      icon: TrendingUp,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-100',
    },
    {
      title: 'Average Turnaround',
      value: '16.2 Days',
      change: '3.4 days faster',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Infographic Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
              Dealership Inventory Analytics
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-xl">
              High-level operational metrics delivered to management without dashboard clutter.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
            Live Feed • Updated 5 mins ago
          </span>
        </div>

        {/* 5 Infographic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500">{m.title}</span>
                    <div className={`p-2 rounded-xl ${m.bg} border`}>
                      <Icon className={`w-4 h-4 ${m.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-black font-heading text-slate-900 tracking-tight">
                    {m.value}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>{m.change}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
