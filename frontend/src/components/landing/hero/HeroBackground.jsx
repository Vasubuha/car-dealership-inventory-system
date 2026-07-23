import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Radial Gradient Glows */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-40 dark:opacity-30 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.35) 0%, rgba(99, 102, 241, 0.25) 35%, rgba(168, 85, 247, 0.1) 70%, transparent 100%)',
        }}
      />
      <div 
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.25) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 100%)',
        }}
      />
      <div 
        className="absolute bottom-10 left-[-100px] w-[600px] h-[600px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.2) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 100%)',
        }}
      />

      {/* SVG Grid Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.07] stroke-slate-900 dark:stroke-white"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 48 0 L 0 0 0 48" fill="none" strokeWidth="1" />
            <circle cx="48" cy="48" r="1.5" className="fill-blue-500/40" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
      </svg>

      {/* Floating Animated Geometric Glowing Particles */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-32 left-[15%] w-3 h-3 rounded-full bg-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/2 left-[8%] w-4 h-4 rounded-full bg-indigo-500/50 shadow-[0_0_16px_rgba(99,102,241,0.6)]"
      />
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-24 right-[20%] w-2.5 h-2.5 rounded-full bg-emerald-400/70 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
      />

      {/* Elegant Curved Vector Line */}
      <svg
        className="absolute top-12 left-0 w-full h-[600px] pointer-events-none opacity-20"
        viewBox="0 0 1440 600"
        fill="none"
      >
        <path
          d="M-100 200 C300 100, 600 450, 1000 250 C1200 150, 1400 350, 1600 200"
          stroke="url(#hero-gradient-line)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <defs>
          <linearGradient id="hero-gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
