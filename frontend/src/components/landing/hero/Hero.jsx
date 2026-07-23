import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import HeroCarousel from './HeroCarousel';

export default function Hero() {
  const { openLogin } = useAuth();

  return (
    <section className="relative pt-28 sm:pt-36 pb-16 lg:pb-24 bg-white overflow-hidden text-slate-900">
      {/* Subtle Background Lighting */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-blue-100/40 via-indigo-50/50 to-sky-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-rose-50/40 via-amber-50/30 to-blue-50/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* LEFT (5 cols) - Concise High-Impact Text */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 shadow-2xs w-fit"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Automotive Dealership OS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]"
            >
              Watch Your Dealership <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Operate in Real-Time.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-lg"
            >
              From VIN acquisition to customer handoff, manage stock velocity, purchase approvals, and branch logistics from one unified control center.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('workflow');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all duration-200"
              >
                <span>See Dealership Workflow</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openLogin()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              >
                <span>Dealership Login</span>
              </button>
            </motion.div>

            {/* Quick Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 border-t border-slate-100 flex items-center gap-6 text-xs font-semibold text-slate-600"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 140+ Showrooms Active
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Sub-20ms API Latency
              </span>
            </motion.div>
          </div>

          {/* RIGHT (7 cols) - Cinematic Apple-Quality 3D Carousel Showcase */}
          <div className="lg:col-span-7 relative mt-6 lg:mt-0 flex items-center justify-center">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
