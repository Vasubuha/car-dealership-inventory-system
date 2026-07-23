import { motion } from 'framer-motion';
import { ShoppingBag, FileText, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PurchasePreview() {
  const navigate = useNavigate();

  const mockPurchases = [
    {
      id: 'ORD-9042',
      vehicle: '2024 BMW M4 Competition Coupé',
      vin: 'VIN-MH-04-2024-901',
      price: '₹1.53 Crore',
      date: 'June 14, 2024',
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
      dealer: 'Mumbai Central Hub',
    },
    {
      id: 'ORD-7712',
      vehicle: '2023 Audi RS6 Avant',
      vin: 'VIN-KA-01-2023-412',
      price: '₹1.24 Crore',
      date: 'February 20, 2024',
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
      dealer: 'Bengaluru Flagship',
    },
  ];

  return (
    <section id="my-purchases" className="py-20 bg-slate-50 border-y border-slate-200 text-slate-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Personal Fleet History
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
              My Vehicle Purchases
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-xl">
              Inspect your verified vehicle ownership records, digital warranty cards, and GST invoices.
            </p>
          </div>

          <button
            onClick={() => navigate('/home/purchases')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors self-start md:self-auto"
          >
            <ShoppingBag className="w-4 h-4 text-blue-600" />
            <span>View Full Ownership Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2 Premium Purchase Cards (NO TABLES!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockPurchases.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-28 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={item.image}
                    alt={item.vehicle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono text-slate-400">Order #{item.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {item.vehicle}
                  </h3>

                  <div className="text-xs text-slate-500 font-mono mt-1">
                    {item.vin}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Purchase Price
                  </span>
                  <span className="text-lg font-extrabold text-slate-900 font-heading">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/home/purchases')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Invoice</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
