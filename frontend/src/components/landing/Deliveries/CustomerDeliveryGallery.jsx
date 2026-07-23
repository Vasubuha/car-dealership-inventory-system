import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Calendar, MapPin, Quote } from 'lucide-react';

export default function CustomerDeliveryGallery() {
  const deliveries = [
    {
      title: 'Family SUV Handover in Bengaluru',
      customer: 'The Kapoor Family',
      vehicle: '2024 Tata Harrier Fearless+ Dark',
      location: 'Bengaluru Flagship Showroom',
      date: 'July 14, 2024',
      quote: 'Taking delivery of our family SUV was an unforgettable experience. The entire process from VIN booking to key handover took less than 24 hours!',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      category: 'Family SUV',
      badgeColor: 'bg-emerald-600',
    },
    {
      title: 'Executive Luxury Sedan Handoff',
      customer: 'Dr. Vikramaditya Rao',
      vehicle: '2024 Mercedes-Benz E-Class LWB',
      location: 'Mumbai South Showroom',
      date: 'June 28, 2024',
      quote: 'Autovance gave me total transparency into vehicle history and dealership stock status before I even walked into the showroom.',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      category: 'Executive Luxury',
      badgeColor: 'bg-blue-600',
    },
    {
      title: 'Commercial EV Fleet Deployment',
      customer: 'EcoCab Mobility Solutions',
      vehicle: '15 Units • Hyundai Ioniq 5 EV',
      location: 'Gurugram Tech Hub',
      date: 'July 02, 2024',
      quote: 'Deploying 15 electric vehicles for our fleet was seamless. Batch VIN registration and automated GST invoices saved us days of paperwork.',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
      category: 'EV Fleet Rollout',
      badgeColor: 'bg-indigo-600',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Real Customer Moments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Celebrating Customer Deliveries Nationwide
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Every vehicle delivery represents a trusted relationship built between dealerships and buyers.
          </p>
        </div>

        {/* Deliveries Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deliveries.map((d, idx) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between text-left"
            >
              {/* Photo Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <span
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${d.badgeColor} shadow-md`}
                >
                  {d.category}
                </span>
                <div className="absolute bottom-3 left-3 text-white flex items-center gap-1 text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{d.location}</span>
                </div>
              </div>

              {/* Story Body */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                    <span className="text-slate-900 font-bold">{d.customer}</span>
                    <span>{d.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {d.title}
                  </h3>
                  <div className="text-xs font-bold text-blue-600 mt-1">
                    Vehicle: {d.vehicle}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic font-normal leading-relaxed">
                  "{d.quote}"
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
