import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusCircle,
  Layers,
  ShoppingBag,
  MinusCircle,
  FileText,
  BarChart3,
  Bell,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function WorkflowJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      icon: PlusCircle,
      title: 'Vehicle Added',
      sub: 'VIN Scanned & Logged',
      desc: 'Sales rep enters vehicle specs or imports CSV. Stock # and VIN are immediately allocated to Mumbai Hub.',
      color: 'bg-blue-600 text-white',
      cardBg: 'border-blue-200 bg-blue-50/50',
      badge: 'Step 01',
      badgeColor: 'bg-blue-100 text-blue-700',
      visual: (
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span>VIN Entry Form</span>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Verified</span>
          </div>
          <div className="space-y-1.5 text-[11px] font-mono text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <div>VIN: VIN-MH-2024-9042</div>
            <div>Model: 2024 BMW M4 Competition</div>
            <div>Price: ₹1.53 Crore • Stock: In Stock</div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      icon: Layers,
      title: 'Inventory Updated',
      sub: 'Catalog & Valuation Synced',
      desc: 'The central stock ledger automatically updates valuation figures and syncs vehicle availability across all 140+ dealer branches.',
      color: 'bg-indigo-600 text-white',
      cardBg: 'border-indigo-200 bg-indigo-50/50',
      badge: 'Step 02',
      badgeColor: 'bg-indigo-100 text-indigo-700',
      visual: (
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span>Branch Multi-Stock Sync</span>
            <span className="text-blue-600 font-mono text-[10px]">14ms Latency</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-600">
            <div className="flex justify-between p-1.5 bg-slate-50 rounded">
              <span>Mumbai Hub:</span>
              <span className="font-bold text-emerald-600">+1 Unit Added</span>
            </div>
            <div className="flex justify-between p-1.5 bg-slate-50 rounded">
              <span>Ecosystem Total:</span>
              <span className="font-bold text-slate-900">450 Vehicles Active</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      icon: ShoppingBag,
      title: 'Customer Purchase',
      sub: 'Digital Agreement Signed',
      desc: 'A buyer selects the vehicle online or in-showroom. Customer details are tied to the stock order in one click.',
      color: 'bg-emerald-600 text-white',
      cardBg: 'border-emerald-200 bg-emerald-50/50',
      badge: 'Step 03',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      visual: (
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span>Customer Deal Agreement</span>
            <span className="text-emerald-600 font-bold text-[10px]">Signed</span>
          </div>
          <div className="text-[11px] text-slate-600 space-y-1">
            <div>Buyer: Rajesh Sharma (Apex Motors)</div>
            <div>Vehicle: 2024 BMW M4 Comp</div>
            <div className="text-emerald-700 font-bold mt-1">Payment Method: HDFC Auto Loan Approved</div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      icon: MinusCircle,
      title: 'Stock Reduced',
      sub: 'Automated Reallocation',
      desc: 'The inventory quantity is decremented instantly. The vehicle status transitions from "In Stock" to "Purchased".',
      color: 'bg-rose-600 text-white',
      cardBg: 'border-rose-200 bg-rose-50/50',
      badge: 'Step 04',
      badgeColor: 'bg-rose-100 text-rose-700',
      visual: (
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span>Stock Status Transition</span>
            <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[10px]">Status: Reserved</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden my-2">
            <div className="w-[70%] h-full bg-rose-500 rounded-full" />
          </div>
          <div className="text-[10px] text-slate-500 font-semibold flex justify-between">
            <span>Available: 449</span>
            <span>Allocated: 1</span>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      icon: FileText,
      title: 'Invoice Generated',
      sub: 'GST Tax & Transfer Doc Created',
      desc: 'The system auto-generates official GST compliant invoices, RTO registration papers, and warranty handoffs.',
      color: 'bg-amber-600 text-white',
      cardBg: 'border-amber-200 bg-amber-50/50',
      badge: 'Step 05',
      badgeColor: 'bg-amber-100 text-amber-700',
      visual: (
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
            <span>Invoice #INV-2024-884</span>
            <span className="text-amber-600 font-bold text-[10px]">GST 28% Included</span>
          </div>
          <div className="text-[11px] font-mono text-slate-600 space-y-1">
            <div>Subtotal: ₹1,20,00,000</div>
            <div>GST: ₹33,60,00,0</div>
            <div className="font-bold text-slate-900">Total: ₹1,53,60,000</div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      icon: BarChart3,
      title: 'Analytics Updated',
      sub: 'Turnaround & Revenue Recalculated',
      desc: 'Monthly revenue, average turnaround days, and dealer commission figures refresh dynamically in real time.',
      color: 'bg-purple-600 text-white',
      cardBg: 'border-purple-200 bg-purple-50/50',
      badge: 'Step 06',
      badgeColor: 'bg-purple-100 text-purple-700',
      visual: (
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
            <span>Monthly Revenue Recalculation</span>
            <span className="text-emerald-600 font-bold text-[10px]">+₹1.53 Cr</span>
          </div>
          <div className="flex items-end gap-2 h-12">
            <div className="w-1/4 h-[50%] bg-purple-200 rounded-t" />
            <div className="w-1/4 h-[70%] bg-purple-300 rounded-t" />
            <div className="w-1/4 h-[85%] bg-purple-400 rounded-t" />
            <div className="w-1/4 h-[100%] bg-purple-600 rounded-t" />
          </div>
        </div>
      ),
    },
    {
      id: 7,
      icon: Bell,
      title: 'Manager Notification',
      sub: 'Push Alert to Regional Manager',
      desc: 'Regional managers receive instant JWT push notifications confirming stock reduction and purchase completion.',
      color: 'bg-sky-600 text-white',
      cardBg: 'border-sky-200 bg-sky-50/50',
      badge: 'Step 07',
      badgeColor: 'bg-sky-100 text-sky-700',
      visual: (
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
            <Bell className="w-4 h-4 text-sky-600" />
            <span>Push Alert Delivered</span>
          </div>
          <p className="text-[11px] text-slate-600">
            "Order #1042 completed. BMW M4 transferred to Rajesh Sharma. Audit ledger signed."
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="workflow" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Live Lifecycle Storytelling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            The Complete Dealership Operating Journey
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Watch how a vehicle moves seamlessly from initial acquisition to customer handover with total audit accuracy.
          </p>
        </div>

        {/* Horizontal Step Indicator Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <div className={`p-1 rounded-md ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg">
          {/* Left Description (6 cols) */}
          <div className="lg:col-span-6 text-left flex flex-col gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider w-fit ${steps[activeStep].badgeColor}`}>
              {steps[activeStep].badge} of 07
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              {steps[activeStep].title}
            </h3>

            <div className="text-sm font-semibold text-blue-600">
              {steps[activeStep].sub}
            </div>

            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              {steps[activeStep].desc}
            </p>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
              >
                <span>Next Lifecycle Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Fragment (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-2xl border ${steps[activeStep].cardBg}`}
              >
                {steps[activeStep].visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
