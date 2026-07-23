import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter Dealership',
      desc: 'Ideal for single-location Independent Showrooms & Used Car Lots.',
      monthlyPrice: '₹4,999',
      annualPrice: '₹3,999',
      unit: '/month',
      badge: 'Single Branch',
      highlight: false,
      features: [
        'Up to 100 Active Vehicle Listings',
        'Standard VIN Audit & Stock Tagging',
        '2 Staff User Accounts',
        'Basic Sales & Invoice Export',
        'Email Support',
      ],
      buttonText: 'Start Free Trial',
    },
    {
      name: 'Professional Network',
      desc: 'Designed for Growing Multi-Location Franchise Dealerships.',
      monthlyPrice: '₹12,999',
      annualPrice: '₹9,999',
      unit: '/month',
      badge: 'Most Popular',
      highlight: true,
      features: [
        'Up to 500 Active Vehicle Listings',
        'Multi-Branch Live Stock Allocation',
        '10 Staff User Accounts with Role Permissions',
        'Automated Purchase Management & Invoicing',
        'Dealership Analytics Infographic Reports',
        'Sub-20ms FastAPI API Sync',
        'Priority Phone & Email Support',
      ],
      buttonText: 'Get Started Now',
    },
    {
      name: 'Enterprise Group',
      desc: 'Built for Regional OEM Chains & Mega Automotive Groups.',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      unit: '',
      badge: 'Unlimited Scale',
      highlight: false,
      features: [
        'Unlimited Vehicle Listings & Branches',
        'Custom Role-Based Access Control (RBAC)',
        'Dedicated API Endpoints & Custom Webhooks',
        'White-Label Customer Portal Integration',
        'Dedicated Account Manager & 24/7 SLA',
      ],
      buttonText: 'Contact Enterprise Sales',
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Predictable SaaS Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Transparent Plans for Every Showroom
          </h2>
          <p className="text-base text-slate-600 mt-3">
            No hidden transaction fees. Scale seamlessly as your vehicle inventory grows.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-100 border border-slate-200 mt-8">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !annual ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                annual ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-400 text-slate-950">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between text-left transition-all duration-300 ${
                p.highlight
                  ? 'bg-gradient-to-b from-blue-900 to-slate-900 text-white shadow-2xl border-2 border-blue-500 scale-105'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-xl'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">{p.name}</span>
                <span
                  className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                    p.highlight
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {p.badge}
                </span>
              </div>

              <div>
                {/* Price */}
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold font-heading tracking-tight">
                    {annual ? p.annualPrice : p.monthlyPrice}
                  </span>
                  <span className="text-xs font-semibold opacity-70">{p.unit}</span>
                </div>

                <p className={`text-xs mb-6 font-medium ${p.highlight ? 'text-blue-100' : 'text-slate-600'}`}>
                  {p.desc}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-8 pt-6 border-t border-slate-200/40">
                  {p.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs font-medium">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          p.highlight ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <button
                onClick={() => navigate('/register')}
                className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold transition-all ${
                  p.highlight
                    ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/40'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{p.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
