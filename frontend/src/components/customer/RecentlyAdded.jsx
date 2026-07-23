import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function RecentlyAdded() {
  const newArrivals = [
    {
      id: 'na-1',
      brand: 'Porsche',
      model: '718 Cayman GT4',
      year: 2024,
      price: '₹1.48 Crore',
      tag: 'Just In',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'na-2',
      brand: 'Audi',
      model: 'RS e-tron GT',
      year: 2024,
      price: '₹2.05 Crore',
      tag: 'New EV',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'na-3',
      brand: 'Mahindra',
      model: 'Thar Earth Edition 4x4',
      year: 2024,
      price: '₹17.6 Lakh',
      tag: 'Off-Road',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'na-4',
      brand: 'Mercedes-Benz',
      model: 'AMG G 63 SUV',
      year: 2024,
      price: '₹3.30 Crore',
      tag: 'Luxury V8',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Duplicate for smooth ticker
  const tickerItems = [...newArrivals, ...newArrivals];

  return (
    <section className="py-16 bg-slate-900 text-white select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Brand New Stock Arrivals
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">Updated Today</span>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-6 whitespace-nowrap min-w-max"
        >
          {tickerItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-72 bg-slate-950 rounded-2xl border border-slate-800 p-3.5 shadow-xl hover:border-blue-500 transition-all text-left shrink-0"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-slate-900">
                <img
                  src={item.image}
                  alt={item.model}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase">{item.brand}</span>
                <h3 className="text-sm font-bold text-white font-heading truncate">{item.model}</h3>
                <div className="text-xs font-extrabold text-white mt-1">{item.price}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
