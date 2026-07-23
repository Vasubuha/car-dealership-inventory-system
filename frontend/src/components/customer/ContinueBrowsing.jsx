import { motion } from 'framer-motion';
import { Eye, ArrowRight, Fuel, Gauge, Calendar } from 'lucide-react';

export default function ContinueBrowsing() {
  const recentlyViewed = [
    {
      id: 'rv-1',
      brand: 'Porsche',
      model: '911 Carrera GTS',
      year: 2024,
      fuel: 'Petrol',
      mileage: '850 km',
      price: '₹2.15 Crore',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      lastViewed: '10 mins ago',
    },
    {
      id: 'rv-2',
      brand: 'Mercedes-Benz',
      model: 'E-Class LWB E350d',
      year: 2024,
      fuel: 'Diesel',
      mileage: '4,500 km',
      price: '₹88.5 Lakh',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
      lastViewed: '1 hour ago',
    },
    {
      id: 'rv-3',
      brand: 'Hyundai',
      model: 'Ioniq 5 EV AWD',
      year: 2024,
      fuel: 'Electric',
      mileage: '2,100 km',
      price: '₹46.2 Lakh',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80',
      lastViewed: 'Yesterday',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Personalized History
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 tracking-tight mt-2">
              Continue Where You Left Off
            </h2>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('inventory');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View History</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Recently Viewed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentlyViewed.map((v, idx) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={v.image}
                  alt={`${v.brand} ${v.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-slate-950/70 backdrop-blur-md">
                  Viewed {v.lastViewed}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-3 justify-between flex-1">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                    {v.brand}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">{v.model}</h3>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium py-1.5 border-y border-slate-100">
                  <span>{v.fuel}</span>
                  <span>{v.mileage}</span>
                  <span>{v.year}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="text-base font-extrabold text-slate-900 font-heading">
                    {v.price}
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('inventory');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Resume Inspection</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
