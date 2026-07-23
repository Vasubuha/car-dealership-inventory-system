import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote, ThumbsUp, Users, Award } from 'lucide-react';

export default function CustomerExperience() {
  const testimonials = [
    {
      name: 'Rajesh Sharma',
      role: 'Managing Director, Apex Motors',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      vehicle: '2024 BMW M4 Competition',
      purchaseDate: 'June 2024',
      rating: 5,
      text: 'Autovance transformed our multi-branch inventory tracking. What used to take 3 days of manual stock reconciliation now happens automatically in real time across 4 showrooms.',
    },
    {
      name: 'Ananya Verma',
      role: 'Head of Fleet Operations, LuxeDrive',
      location: 'Bengaluru, Karnataka',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      vehicle: '2024 Mercedes-Benz E-Class',
      purchaseDate: 'May 2024',
      rating: 5,
      text: 'The purchase management automation cut our vehicle transfer paperwork time by 75%. Our sales team closes luxury deals with instant VIN verification and digital invoices.',
    },
    {
      name: 'Vikramaditya Singh',
      role: 'Owner, Heritage Auto Hub',
      location: 'New Delhi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      vehicle: '2024 Porsche 911 Carrera',
      purchaseDate: 'July 2024',
      rating: 5,
      text: 'Customer satisfaction scores rose to 98% within two months of adopting Autovance. The platform gives buyers total transparency into car histories and real-time stock status.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Trust & Reputation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Delighting Dealerships & Buyers Nationwide
          </h2>
          <p className="text-base text-slate-600 mt-3">
            See how top automotive dealers across India leverage Autovance to accelerate sales and build buyer confidence.
          </p>
        </div>

        {/* Top Animated Statistics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center gap-2"
          >
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <div className="text-3xl font-extrabold font-heading text-slate-900">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Average Dealership Rating
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-slate-900">12,000+</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Happy Car Buyers
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center justify-center gap-2"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold font-heading text-emerald-600">98%</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Customer Retention Rate
            </div>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-normal italic mb-6">
                  "{t.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                  <span className="text-[10px] text-blue-600 font-bold block mt-0.5">
                    Purchased: {t.vehicle} ({t.purchaseDate})
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
