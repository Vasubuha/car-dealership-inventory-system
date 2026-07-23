import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle2, ShieldCheck, Zap, ArrowRight, Car, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DemoModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Play className="w-4 h-4 text-blue-400 fill-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-white">
                  Autovance Platform Product Demo
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive overview of enterprise inventory operations
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Interactive Preview Container */}
            <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-indigo-900/20" />
              
              <div className="relative text-center p-6 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-blue-400 translate-x-0.5" />
                </div>
                <div className="text-white font-bold text-lg">
                  Enterprise Inventory Management Walkthrough
                </div>
                <p className="text-xs text-slate-400 max-w-md">
                  Watch how dealerships streamline 450+ active vehicle listings, execute single-click purchases, and maintain 99.8% stock accuracy.
                </p>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <Car className="w-5 h-5 text-blue-400 mb-2" />
                <div className="text-xs font-bold text-white mb-1">Centralized Stock</div>
                <div className="text-[11px] text-slate-400">
                  Track VINs, status tags, pricing, and mileage in real time.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <Zap className="w-5 h-5 text-amber-400 mb-2" />
                <div className="text-xs font-bold text-white mb-1">FastAPI Backend</div>
                <div className="text-[11px] text-slate-400">
                  Sub-20ms API response times for rapid catalog searches.
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="text-xs font-bold text-white mb-1">Role-Based Auth</div>
                <div className="text-[11px] text-slate-400">
                  Granular permission control for admins and sales staff.
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/60">
            <span className="text-xs text-slate-400">Ready to test the live application?</span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-colors"
              >
                <span>Launch Live System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
