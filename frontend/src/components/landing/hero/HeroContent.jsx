import { motion } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';
import HeroButtons from './HeroButtons';
import HeroTrustBadges from './HeroTrustBadges';
import HeroStats from './HeroStats';

export default function HeroContent({ onGetStarted, onViewDemo }) {
  return (
    <div className="flex flex-col gap-6 lg:gap-7 z-10 text-left">
      {/* Top Small Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md shadow-blue-900/10 backdrop-blur-xl w-fit"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Layers className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-xs font-bold tracking-wide bg-gradient-to-r from-blue-200 via-indigo-200 to-sky-200 bg-clip-text text-transparent">
          Inventory Management Platform
        </span>
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 ml-1 border border-blue-500/30">
          v2.4
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col gap-2"
      >
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white tracking-tight leading-[1.12]">
          Manage Dealership Inventory <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent drop-shadow-sm">
            with Speed and Confidence.
          </span>
        </h1>
      </motion.div>

      {/* Product Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl"
      >
        Centralize vehicle stock, streamline acquisition workflows, track real-time valuations, and automate purchase management from a unified enterprise-grade SaaS control panel.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <HeroButtons onGetStarted={onGetStarted} onViewDemo={onViewDemo} />
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <HeroTrustBadges />
      </motion.div>

      {/* Stats Counter Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <HeroStats />
      </motion.div>
    </div>
  );
}
