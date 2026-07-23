import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function CallToAction() {
  const { openLogin, openRegister } = useAuth();

  return (
    <section className="py-20 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden text-center">
          {/* Background Ambient Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-blue-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transform Your Dealership Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Ready to Accelerate Your Dealership Inventory Operations?
            </h2>

            <p className="text-base sm:text-lg text-blue-100 font-normal leading-relaxed max-w-2xl">
              Join top luxury & multi-brand dealerships nationwide. Setup takes under 15 minutes with 0 technical overhead.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => openRegister()}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-extrabold text-blue-900 bg-white hover:bg-slate-100 shadow-xl shadow-blue-950/20 active:scale-[0.98] transition-all duration-200"
              >
                <span>Start Free Dealership Trial</span>
                <ArrowRight className="w-4 h-4 text-blue-900" />
              </button>

              <button
                onClick={() => openLogin()}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-colors"
              >
                <span>Sign In to Existing Portal</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-6 text-xs text-blue-200 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant Setup
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
