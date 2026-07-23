import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, PlusCircle, CheckCircle, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

export default function LiveStockPulse() {
  const [activePulseIndex, setActivePulseIndex] = useState(0);

  const pulses = [
    {
      type: 'add',
      icon: PlusCircle,
      title: 'Vehicle Added to Inventory',
      detail: '2024 BMW M4 Competition (VIN #9042) • Stocked at Mumbai Hub',
      time: 'Just now',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      type: 'purchase',
      icon: CheckCircle,
      title: 'Purchase Automated',
      detail: '2024 Mercedes-Benz E-Class • Order #1042 Approved (₹88.5 Lakh)',
      time: '2 mins ago',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      type: 'alert',
      icon: AlertTriangle,
      title: 'Low Stock Alert Triggered',
      detail: 'Electric SUV Inventory Low (2 units remaining in Bengaluru)',
      time: '5 mins ago',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePulseIndex((prev) => (prev + 1) % pulses.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [pulses.length]);

  const currentPulse = pulses[activePulseIndex];
  const Icon = currentPulse.icon;

  return (
    <section className="py-6 bg-slate-900 text-white select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Live Beacon Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-200 font-heading">
                Live Dealership Operational Pulse
              </span>
            </div>
          </div>

          {/* Animated Pulse Notification Card */}
          <div className="w-full lg:w-auto flex-1 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePulseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-md backdrop-blur-md text-left"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-1.5 rounded-lg border shrink-0 ${currentPulse.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">
                      {currentPulse.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {currentPulse.detail}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 shrink-0 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                  {currentPulse.time}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 text-xs font-semibold shrink-0">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">Sold Today:</span>
              <span className="font-extrabold text-white font-heading text-sm">42 Units</span>
            </div>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">Ecosystem Value:</span>
              <span className="font-extrabold text-white font-heading text-sm">₹2,450 Cr</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
