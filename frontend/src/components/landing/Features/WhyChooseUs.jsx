import { motion } from 'framer-motion';
import { Layers, ShoppingBag, BarChart3, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Layers,
      title: 'Real-Time Inventory Tracking',
      description: 'Audit VIN statuses, stock allocations, and valuation metrics across multi-branch dealership networks with sub-second accuracy.',
      badge: 'Live Stock Sync',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      gradient: 'from-blue-500/10 to-indigo-500/5',
      accentColor: 'text-blue-600',
      visual: (
        <div className="w-full h-32 rounded-xl bg-white border border-slate-200 p-3 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
            <span>VIN Audit Status</span>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              99.8% Synced
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-blue-600 rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>450 Active Stock</span>
              <span>12 In Transit</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: ShoppingBag,
      title: 'Automated Purchase Management',
      description: 'Streamline vehicle acquisition, client purchase orders, tax invoicing, and digital ownership handoffs directly from the portal.',
      badge: 'Workflows',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      gradient: 'from-emerald-500/10 to-teal-500/5',
      accentColor: 'text-emerald-600',
      visual: (
        <div className="w-full h-32 rounded-xl bg-white border border-slate-200 p-3 shadow-inner flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-800">Purchase Order #1042</span>
            <span className="font-extrabold text-blue-600">₹88.5 Lakh</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[10px] text-slate-600 font-medium flex items-center justify-between">
            <span>Client: Apex Dealerships</span>
            <span className="text-emerald-600 font-bold">Approved</span>
          </div>
        </div>
      ),
    },
    {
      icon: BarChart3,
      title: 'Dealership Analytics Intelligence',
      description: 'Gain real-time insight into stock turnaround velocity, monthly profit margins, and popular regional brand demands.',
      badge: 'Intelligence',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      gradient: 'from-indigo-500/10 to-purple-500/5',
      accentColor: 'text-indigo-600',
      visual: (
        <div className="w-full h-32 rounded-xl bg-white border border-slate-200 p-3 shadow-inner flex items-end gap-2 justify-around">
          <div className="w-6 h-[40%] bg-blue-200 rounded-t-md" />
          <div className="w-6 h-[65%] bg-blue-400 rounded-t-md" />
          <div className="w-6 h-[90%] bg-blue-600 rounded-t-md" />
          <div className="w-6 h-[75%] bg-indigo-500 rounded-t-md" />
        </div>
      ),
    },
    {
      icon: ShieldCheck,
      title: 'Role-Based Security & Access',
      description: 'Enterprise-grade JWT token authentication with strictly isolated role permissions for sales executives, managers, and admins.',
      badge: 'JWT Security',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
      gradient: 'from-amber-500/10 to-orange-500/5',
      accentColor: 'text-amber-600',
      visual: (
        <div className="w-full h-32 rounded-xl bg-white border border-slate-200 p-3 shadow-inner flex flex-col justify-center items-center text-center gap-1.5">
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs border border-amber-200">
            JWT
          </div>
          <span className="text-[11px] font-bold text-slate-800">FastAPI Encrypted Sessions</span>
        </div>
      ),
    },
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Enterprise Dealership OS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Why Modern Dealerships Choose Autovance
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Engineered specifically to solve complex inventory logistics, valuation transparency, and multi-location branch coordination.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${pillar.gradient} border border-slate-100 shadow-2xs`}>
                      <Icon className={`w-6 h-6 ${pillar.accentColor}`} />
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${pillar.badgeColor} border`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Custom Visual Illustration */}
                {pillar.visual}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
