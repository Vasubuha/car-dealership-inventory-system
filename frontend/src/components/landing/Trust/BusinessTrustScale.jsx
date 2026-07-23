import { motion } from 'framer-motion';
import { Building2, Car, TrendingUp, DollarSign, MapPin, ShieldCheck } from 'lucide-react';

export default function BusinessTrustScale() {
  const scaleStats = [
    {
      label: 'Showroom Networks',
      value: '140+',
      sub: 'Multi-branch franchises',
      icon: Building2,
      color: 'text-blue-600',
    },
    {
      label: 'Vehicles Managed',
      value: '12,000+',
      sub: 'Active stock units',
      icon: Car,
      color: 'text-indigo-600',
    },
    {
      label: 'Monthly Volume',
      value: '₹145 Cr',
      sub: 'Transaction processing',
      icon: TrendingUp,
      color: 'text-emerald-600',
    },
    {
      label: 'Ecosystem Valuation',
      value: '₹2,450 Cr',
      sub: 'Audited dealership assets',
      icon: DollarSign,
      color: 'text-rose-600',
    },
    {
      label: 'Cities Served',
      value: '28 Hubs',
      sub: 'Metro & Tier-1 networks',
      icon: MapPin,
      color: 'text-amber-600',
    },
    {
      label: 'System Uptime SLA',
      value: '99.99%',
      sub: 'Sub-20ms API response',
      icon: ShieldCheck,
      color: 'text-sky-600',
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-y border-slate-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Enterprise Scale Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight mt-3">
            Powering India's Premier Automotive Networks
          </h2>
          <p className="text-base text-slate-400 mt-2">
            Verified performance metrics from multi-location dealership groups operating on Autovance OS.
          </p>
        </div>

        {/* 6 High-Impact Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {scaleStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-lg text-left flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-300 mt-1">{stat.label}</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
