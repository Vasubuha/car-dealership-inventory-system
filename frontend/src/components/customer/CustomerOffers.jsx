import { motion } from 'framer-motion';
import { Sparkles, Percent, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerOffers() {
  const navigate = useNavigate();

  const promotions = [
    {
      title: 'Exclusive 0% Financing Rate',
      desc: 'Pre-approved 0% APR financing on luxury sedans for active Autovance members.',
      code: 'FINANCE0',
      badge: 'Low APR',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Trade-in Exchange Bonus',
      desc: 'Get up to ₹2,50,000 additional valuation on trading your existing vehicle.',
      code: 'TRADEBONUS',
      badge: 'Valuation Boost',
      color: 'from-indigo-600 to-purple-600',
    },
    {
      title: 'Luxury Collection VIP Access',
      desc: 'First look priority reservation on limited allocation Porsche & AMG models.',
      code: 'VIPACCESS',
      badge: 'Priority Reserve',
      color: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200 text-slate-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Exclusive Member Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Member Offers & Trade-In Bonuses
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Unlock pre-approved financing rates, high-value trade-in multipliers, and VIP stock access.
          </p>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                    {p.badge}
                  </span>
                  <Tag className="w-4 h-4 text-slate-400" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                  CODE: {p.code}
                </span>
                <button
                  onClick={() => {
                    const el = document.getElementById('inventory');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  <span>Apply Offer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
