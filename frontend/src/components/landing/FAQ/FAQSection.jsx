import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does Autovance connect with our existing dealership showroom management system?',
      a: 'Autovance provides RESTful FastAPI endpoints and CSV import tools that allow your team to seed or sync active vehicle stock, VIN details, status tags, and pricing in minutes without modifying your underlying database architecture.',
    },
    {
      q: 'Can we manage multiple dealership showroom branches under one account?',
      a: 'Yes. Autovance includes native multi-branch stock allocation. Regional dealership groups can assign vehicles to specific showroom locations while maintaining a centralized operational overview.',
    },
    {
      q: 'How are role permissions enforced between sales agents and managers?',
      a: 'Autovance utilizes JWT (JSON Web Token) authentication with strict Role-Based Access Control (RBAC). Sales agents can view stock and update reservation statuses, while managers and admins hold permission to edit pricing, process purchase approvals, and add vehicles.',
    },
    {
      q: 'Is there any limit to the number of vehicles or brands we can list?',
      a: 'Our Starter plan supports up to 100 active listings, Professional supports 500 listings, and Enterprise plans offer unlimited listings across all automotive OEM brands.',
    },
    {
      q: 'How quickly can our sales team get started?',
      a: 'Onboarding takes less than 15 minutes. Once registered, your team can log in directly, view live inventory metrics, filter by powertrain or category, and start managing sales orders.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Everything you need to know about setting up Autovance for your dealership network.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="text-base sm:text-lg font-heading">{item.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-blue-600 text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100 pt-3">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
