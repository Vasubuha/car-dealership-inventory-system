import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardPreview from './DashboardPreview';
import FloatingCards from './FloatingCards';

export default function HeroDashboard() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate subtle tilt angle (-6 to +6 degrees)
    const rX = ((y - centerY) / centerY) * -4;
    const rY = ((x - centerX) / centerX) * 4;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      id="hero-dashboard-preview"
      className="relative w-full max-w-2xl mx-auto lg:max-w-none z-10 pt-4 lg:pt-0"
    >
      {/* 3D Perspective Wrapper */}
      <div
        className="perspective-1000 py-4"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative transition-transform duration-100 ease-out"
        >
          {/* Main Ambient Glow behind Dashboard */}
          <div className="absolute inset-0 -m-6 bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-sky-500/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          {/* Real Live Dashboard Preview */}
          <DashboardPreview />

          {/* Floating Glass Notification Cards */}
          <FloatingCards />
        </motion.div>
      </div>
    </div>
  );
}
