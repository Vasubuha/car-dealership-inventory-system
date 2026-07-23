import { motion } from 'framer-motion';
import { PlusCircle, TrendingUp, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';

export default function FloatingCards() {
  return (
    <>
      {/* Floating Card 1: Vehicle Added (Top Right) */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 1, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-6 -right-4 sm:-right-8 z-30 flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-slate-950/60 backdrop-blur-2xl text-left max-w-xs pointer-events-none select-none"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/30 to-emerald-400/10 border border-emerald-500/40 flex items-center justify-center shrink-0">
          <PlusCircle className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">Vehicle Added</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
              JUST NOW
            </span>
          </div>
          <p className="text-[11px] text-slate-300 font-medium truncate">
            2024 BMW M4 Comp • $84,900
          </p>
        </div>
      </motion.div>

      {/* Floating Card 2: Revenue Today (Bottom Left) */}
      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [0, -1, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-6 -left-4 sm:-left-8 z-30 flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl shadow-slate-950/60 backdrop-blur-2xl text-left max-w-xs pointer-events-none select-none"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500/30 to-indigo-500/10 border border-blue-500/40 flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Revenue Today
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white">+$48,500</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              +18.4%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating Card 3: Purchase Successful (Top Left Accent) */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-1/3 -left-6 sm:-left-10 z-20 hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900/85 border border-slate-800 shadow-xl backdrop-blur-xl text-left pointer-events-none select-none"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
        <span className="text-[11px] font-semibold text-slate-200">
          Purchase Automated • Dealership #104
        </span>
      </motion.div>

      {/* Floating Card 4: Inventory Accuracy Badge (Bottom Right Accent) */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute bottom-12 -right-4 sm:-right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/85 border border-emerald-500/30 shadow-xl backdrop-blur-xl text-left pointer-events-none select-none"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span className="text-[11px] font-bold text-emerald-300">
          99.8% Audit Compliance
        </span>
      </motion.div>
    </>
  );
}
