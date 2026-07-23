import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Zap, Shield, Gauge } from 'lucide-react';

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const vehicles = [
    {
      id: 'porsche-911',
      title: 'Porsche 911 GT3 RS',
      category: 'Track Ready',
      specs: '4.0L V6 • 525 HP • 0-100 3.2s',
      price: '₹2.15 Crore',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
      badgeBg: 'bg-rose-600',
    },
    {
      id: 'bmw-m4',
      title: 'BMW M4 Competition',
      category: 'Executive Coupé',
      specs: '3.0L Twin-Turbo • 510 HP',
      price: '₹1.53 Crore',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
      badgeBg: 'bg-blue-600',
    },
    {
      id: 'mercedes-amg',
      title: 'Mercedes-AMG GT 63 S',
      category: 'V8 Performance',
      specs: '4.0L V8 • 639 HP • 4MATIC+',
      price: '₹2.70 Crore',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
      badgeBg: 'bg-indigo-600',
    },
    {
      id: 'ioniq-5',
      title: 'Hyundai Ioniq 5 EV',
      category: 'Zero Emission EV',
      specs: '72.6 kWh • 305 HP • 500 km',
      price: '₹46.2 Lakh',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85',
      badgeBg: 'bg-emerald-600',
    },
    {
      id: 'tata-harrier',
      title: 'Tata Harrier Fearless+',
      category: 'Performance SUV',
      specs: 'Kryotec Diesel • 170 HP • AT',
      price: '₹26.4 Lakh',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85',
      badgeBg: 'bg-amber-600',
    },
    {
      id: 'toyota-hilux',
      title: 'Toyota Hilux 4x4 High',
      category: 'Heavy Duty 4x4',
      specs: '2.8L Diesel • 500 Nm Torque',
      price: '₹37.9 Lakh',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
      badgeBg: 'bg-sky-600',
    },
  ];

  const total = vehicles.length;

  // Auto-play interval timer
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[600px] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* 3D Depth Cards Track Container */}
      <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[540px] flex items-center justify-center">
        {vehicles.map((item, idx) => {
          // Calculate relative position to active index
          let offset = (idx - currentIndex + total) % total;
          if (offset > total / 2) offset -= total;

          const isCenter = offset === 0;
          const isAdjacent = Math.abs(offset) === 1;
          const isFar = Math.abs(offset) === 2;
          const isHidden = Math.abs(offset) > 2;

          if (isHidden) return null;

          // Scale & Translation math for 3D Carousel Perspective
          let scale = 1;
          let translateX = 0;
          let opacity = 1;
          let zIndex = 30;
          let blur = 'blur(0px)';

          if (isCenter) {
            scale = 1;
            translateX = 0;
            opacity = 1;
            zIndex = 40;
          } else if (offset === 1) {
            scale = 0.88;
            translateX = '65%';
            opacity = 0.75;
            zIndex = 20;
          } else if (offset === -1) {
            scale = 0.88;
            translateX = '-65%';
            opacity = 0.75;
            zIndex = 20;
          } else if (offset === 2) {
            scale = 0.78;
            translateX = '120%';
            opacity = 0.35;
            zIndex = 10;
            blur = 'blur(2px)';
          } else if (offset === -2) {
            scale = 0.78;
            translateX = '-120%';
            opacity = 0.35;
            zIndex = 10;
            blur = 'blur(2px)';
          }

          const isFavorited = favorites.includes(item.id);

          return (
            <motion.div
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              animate={{
                scale: scale,
                x: translateX,
                opacity: opacity,
                filter: blur,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
              style={{ zIndex }}
              className={`absolute w-[320px] sm:w-[420px] lg:w-[480px] h-[460px] sm:h-[520px] lg:h-[540px] rounded-[28px] overflow-hidden border cursor-pointer transition-all duration-300 ${
                isCenter
                  ? 'border-white/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] shadow-blue-900/20 hover:scale-[1.02]'
                  : 'border-slate-200/60 shadow-lg'
              }`}
            >
              {/* Edge-to-Edge Image */}
              <div className="relative w-full h-full bg-slate-900 overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10 opacity-90 transition-opacity" />

                {/* Top Overlay Bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white ${item.badgeBg} shadow-md backdrop-blur-md`}
                  >
                    {item.category}
                  </span>

                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    aria-label="Add to wishlist"
                    className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-200 ${
                      isFavorited
                        ? 'bg-rose-500/90 border-rose-400 text-white shadow-lg'
                        : 'bg-slate-950/40 border-white/20 text-white/80 hover:text-white hover:bg-slate-950/70'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 flex flex-col justify-end text-left z-10 space-y-2">
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Verified Stock</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
                    {item.specs}
                  </p>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Starting Price
                      </span>
                      <span className="text-xl sm:text-2xl font-black font-heading text-white">
                        {item.price}
                      </span>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-colors">
                      Quick Inspect
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hover Circular Navigation Arrows */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={handlePrev}
              aria-label="Previous Vehicle"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={handleNext}
              aria-label="Next Vehicle"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Minimal Pagination Dots */}
      <div className="flex items-center gap-2 mt-4 z-40">
        {vehicles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-8 bg-blue-600'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
