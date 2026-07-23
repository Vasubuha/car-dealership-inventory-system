import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function HeroButtons({ onGetStarted, onViewDemo }) {
  const { openLogin } = useAuth();

  const handlePrimaryClick = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      openLogin();
    }
  };

  const handleSecondaryClick = () => {
    if (onViewDemo) {
      onViewDemo();
    } else {
      const el = document.getElementById('hero-dashboard-preview');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 pt-2">
      {/* Primary CTA */}
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handlePrimaryClick}
        aria-label="Get Started with Dealership Inventory Software"
        className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] hover:bg-[position:right_center] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-500/40 border border-blue-400/30 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-300"
      >
        <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
        <span>Get Started Free</span>
        <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
        
        {/* Subtle shine effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-in-out" />
        </div>
      </motion.button>

      {/* Secondary CTA */}
      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSecondaryClick}
        aria-label="View Interactive Product Demo"
        className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 shadow-md shadow-slate-950/20 backdrop-blur-md focus:outline-none focus:ring-4 focus:ring-slate-700/50 transition-all duration-200"
      >
        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
          <Play className="w-3 h-3 text-blue-400 fill-blue-400 translate-x-0.5" />
        </div>
        <span>View Product Demo</span>
      </motion.button>
    </div>
  );
}
