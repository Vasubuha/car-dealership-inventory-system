import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Download,
  ExternalLink,
  Award,
  Clock,
  ArrowRight,
  X,
  CreditCard,
  Car,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MarketplacePurchases() {
  const navigate = useNavigate();
  const [activeInvoice, setActiveInvoice] = useState(null);

  const purchases = [
    {
      id: 'ORD-9042',
      vehicle: '2024 BMW M4 Competition Coupé',
      brand: 'BMW',
      vin: 'VIN-MH-04-2024-901',
      price: '₹1,53,00,000',
      basePrice: '₹1,19,53,125',
      gstAmount: '₹33,46,875',
      purchaseDate: 'June 14, 2024',
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      location: 'Mumbai Central Hub',
      warranty: '3 Years / 1,00,00,0 km Bumper-to-Bumper Warranty',
      insurance: 'HDFC ERGO Comprehensive Policy #POL-88401',
      rto: 'MH-04 (Thane RTO) Registration Complete',
      timeline: [
        { step: 'Order Placed & Booked', date: 'June 10, 2024', done: true },
        { step: 'VIN Physical Audit Verified', date: 'June 11, 2024', done: true },
        { step: 'GST Invoice & Financing Cleared', date: 'June 12, 2024', done: true },
        { step: 'Vehicle Handover & Delivered', date: 'June 14, 2024', done: true },
      ],
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ORD-7712',
      vehicle: '2023 Audi RS6 Avant',
      brand: 'Audi',
      vin: 'VIN-KA-01-2023-412',
      price: '₹1,24,00,000',
      basePrice: '₹96,87,500',
      gstAmount: '₹27,12,500',
      purchaseDate: 'February 20, 2024',
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      location: 'Bengaluru Flagship Showroom',
      warranty: '2 Years Extended Certified Warranty',
      insurance: 'ICICI Lombard Zero-Dep policy #POL-10492',
      rto: 'KA-01 (Koramangala RTO) Registered',
      timeline: [
        { step: 'Order Placed & Booked', date: 'Feb 16, 2024', done: true },
        { step: 'VIN Physical Audit Verified', date: 'Feb 17, 2024', done: true },
        { step: 'GST Invoice & Financing Cleared', date: 'Feb 18, 2024', done: true },
        { step: 'Vehicle Handover & Delivered', date: 'Feb 20, 2024', done: true },
      ],
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <main className="pt-28 sm:pt-36 pb-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Verified Marketplace Ownership
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
              Marketplace Purchase Center
            </h1>
            <p className="text-base text-slate-600 mt-2 max-w-xl">
              Inspect your verified vehicle ownership records, digital warranty cards, order timelines, and GST tax invoices.
            </p>
          </div>

          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors self-start md:self-auto"
          >
            <Car className="w-4 h-4 text-blue-600" />
            <span>Back to Marketplace</span>
          </button>
        </div>

        {/* Purchase Cards List */}
        <div className="space-y-8">
          {purchases.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 text-left space-y-6"
            >
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img src={item.image} alt={item.vehicle} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                      <span className="text-blue-600 font-bold uppercase">{item.brand}</span>
                      <span>• Order #{item.id}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-slate-900">
                      {item.vehicle}
                    </h2>
                    <span className="text-xs font-mono text-slate-400">{item.vin}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border w-fit ${item.statusColor}`}>
                    {item.status}
                  </span>
                  <span className="text-xl font-extrabold font-heading text-slate-900 mt-1">
                    {item.price}
                  </span>
                </div>
              </div>

              {/* Order Timeline Stream */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
                  Order & Handover Timeline:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {item.timeline.map((t, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between gap-1"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>{t.step}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{t.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Credentials 3-col Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Warranty Coverage</div>
                    <div className="text-xs text-slate-600 mt-0.5">{item.warranty}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                  <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Insurance & RTO</div>
                    <div className="text-xs text-slate-600 mt-0.5">{item.insurance}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Delivery Hub</div>
                    <div className="text-xs text-slate-600 mt-0.5">{item.location}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Purchased on {item.purchaseDate}</span>
                <button
                  onClick={() => setActiveInvoice(item)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>View GST Tax Invoice</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Invoice Modal Preview */}
      <AnimatePresence>
        {activeInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveInvoice(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 text-left text-slate-900"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    GST
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-heading">Tax Invoice {activeInvoice.id}</h3>
                    <p className="text-xs text-slate-400">Autovance Motors OS Official Billing</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveInvoice(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Billed To</span>
                    <div className="font-bold text-slate-900 mt-1">Valued Customer Account</div>
                    <div className="text-slate-500">GSTIN: 27AAAAA0000A1Z5</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Vehicle Sold</span>
                    <div className="font-bold text-slate-900 mt-1">{activeInvoice.vehicle}</div>
                    <div className="font-mono text-slate-500">{activeInvoice.vin}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Base Vehicle Price:</span>
                    <span className="font-bold">{activeInvoice.basePrice}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>GST (28% Rate):</span>
                    <span className="font-bold">{activeInvoice.gstAmount}</span>
                  </div>
                  <div className="flex justify-between py-2 text-base font-extrabold text-blue-600 font-heading pt-2 border-t border-slate-200">
                    <span>Grand Total Paid:</span>
                    <span>{activeInvoice.price}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Tax Invoice Verified & Cleared
                </span>
                <button
                  onClick={() => {
                    alert('Tax Invoice PDF downloaded successfully.');
                    setActiveInvoice(null);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Receipt</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
