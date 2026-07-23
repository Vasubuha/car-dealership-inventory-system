import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function VehicleCategories({
  badge = 'Fleet Classification',
  title = 'Explore Vehicles by Segment',
  subtitle = 'Browse structured inventory categories tailored for Indian dealership portfolios.',
}) {
  const categories = [
    {
      id: 'suv',
      name: 'SUV & Crossovers',
      count: '142 Vehicles',
      startingPrice: '₹14 Lakh',
      popular: 'Tata Harrier, Mahindra XUV700, Hyundai Creta',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
      tag: 'Most Popular',
      tagColor: 'bg-emerald-600',
    },
    {
      id: 'sedan',
      name: 'Executive Sedans',
      count: '98 Vehicles',
      startingPrice: '₹12 Lakh',
      popular: 'Skoda Slavia, Honda City, Hyundai Verna',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      tag: 'Comfort',
      tagColor: 'bg-blue-600',
    },
    {
      id: 'luxury',
      name: 'Luxury & Ultra Premium',
      count: '64 Vehicles',
      startingPrice: '₹55 Lakh',
      popular: 'Mercedes-Benz E-Class, BMW 5 Series, Audi A6',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      tag: 'Premium',
      tagColor: 'bg-indigo-600',
    },
    {
      id: 'electric',
      name: 'Electric Vehicles (EV)',
      count: '52 Vehicles',
      startingPrice: '₹15 Lakh',
      popular: 'Tata Nexon EV, MG ZS EV, Hyundai Ioniq 5',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
      tag: 'Eco-Friendly',
      tagColor: 'bg-emerald-500',
    },
    {
      id: 'sports',
      name: 'Sports & Performance',
      count: '38 Vehicles',
      startingPrice: '₹85 Lakh',
      popular: 'Porsche 718 Cayman, Mustang GT, BMW M4',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      tag: 'High Velocity',
      tagColor: 'bg-rose-600',
    },
    {
      id: 'pickup',
      name: 'Pickups & Off-Roaders',
      count: '46 Vehicles',
      startingPrice: '₹18 Lakh',
      popular: 'Isuzu D-Max, Toyota Hilux, Mahindra Thar',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      tag: 'Heavy Duty',
      tagColor: 'bg-amber-600',
    },
    {
      id: 'convertible',
      name: 'Convertibles & Roadsters',
      count: '24 Vehicles',
      startingPrice: '₹72 Lakh',
      popular: 'BMW Z4, Mini Cooper Convertible, Audi A5',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      tag: 'Open Top',
      tagColor: 'bg-purple-600',
    },
    {
      id: 'hatchback',
      name: 'Premium Hatchbacks',
      count: '86 Vehicles',
      startingPrice: '₹8 Lakh',
      popular: 'Hyundai i20 N Line, Tata Altroz, Baleno',
      image: 'https://images.unsplash.com/photo-1609521263047-f8d205293f24?auto=format&fit=crop&w=800&q=80',
      tag: 'Urban Mobility',
      tagColor: 'bg-sky-600',
    },
    {
      id: 'hybrid',
      name: 'Hybrid Systems',
      count: '40 Vehicles',
      startingPrice: '₹19 Lakh',
      popular: 'Toyota Urban Cruiser Hyryder, Maruti Grand Vitara',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      tag: 'Efficient',
      tagColor: 'bg-teal-600',
    },
  ];

  return (
    <section id="categories" className="py-20 lg:py-28 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
              {title}
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-xl">
              {subtitle}
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('inventory');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors self-start md:self-auto"
          >
            <span>View All Stock</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider ${cat.tagColor} shadow-md`}
                >
                  {cat.tag}
                </span>
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30">
                    {cat.count}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col gap-3 flex-1 justify-between text-left">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Popular: <span className="text-slate-700 font-semibold">{cat.popular}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Starting At
                    </span>
                    <div className="text-base font-extrabold text-slate-900 font-heading">
                      {cat.startingPrice}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
