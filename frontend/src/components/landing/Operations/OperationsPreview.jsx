import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, RefreshCw, CheckCircle, Bell, ArrowRight, ShieldCheck, FileText, TrendingUp } from 'lucide-react';

export default function OperationsPreview() {
  const [activeTab, setActiveTab] = useState('status');

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Live Application Simulation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Experience the Application Operating Live
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Interact with live application fragments to see real-time status transitions, chart recalculations, and automated invoice outputs.
          </p>
        </div>

        {/* Fragment Workspace Shell */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 text-white text-left">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 pl-2">
                app.autovance.io/dashboard/preview
              </span>
            </div>

            {/* Interactive Fragment Tabs */}
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('status')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'status' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Stock Status Tag
              </button>
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'chart' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Revenue Chart Growth
              </button>
              <button
                onClick={() => setActiveTab('invoice')}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'invoice' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Generated Invoice Doc
              </button>
            </div>
          </div>

          {/* Interactive Fragment Display Box */}
          <div className="py-8 min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {activeTab === 'status' && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-lg bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Vehicle Order Status Transition</span>
                    <span className="text-emerald-400 font-mono">Live API Action</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">2024 BMW M4 Competition</div>
                      <div className="text-xs text-slate-400 font-mono">VIN #MH-9042 • Mumbai Hub</div>
                    </div>

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    >
                      Transferred to Customer
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'chart' && (
                <motion.div
                  key="chart"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-lg bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Monthly Sales Velocity Growth</span>
                    <span className="text-blue-400 font-bold">+18.4% MoM</span>
                  </div>

                  <div className="flex items-end gap-4 h-36 pt-4">
                    <div className="w-1/4 h-[40%] bg-blue-900/60 rounded-t-lg flex items-center justify-center text-[10px] font-bold">Q1</div>
                    <div className="w-1/4 h-[60%] bg-blue-800/80 rounded-t-lg flex items-center justify-center text-[10px] font-bold">Q2</div>
                    <div className="w-1/4 h-[80%] bg-blue-700 rounded-t-lg flex items-center justify-center text-[10px] font-bold">Q3</div>
                    <motion.div
                      animate={{ height: ['0%', '100%'] }}
                      transition={{ duration: 1.5 }}
                      className="w-1/4 h-[100%] bg-blue-500 rounded-t-lg flex items-center justify-center text-[10px] font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    >
                      Q4 (Live)
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'invoice' && (
                <motion.div
                  key="invoice"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-lg bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-400" /> Tax Invoice #INV-2024-884
                    </span>
                    <span className="text-emerald-400 font-bold">Paid & Signed</span>
                  </div>
                  <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span>Vehicle: 2024 Mercedes E-Class</span>
                      <span>₹88,50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (28%):</span>
                      <span>₹24,78,000</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                      <span>Grand Total:</span>
                      <span>₹1,13,28,000</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
