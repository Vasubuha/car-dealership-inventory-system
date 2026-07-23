import { motion } from 'framer-motion';

export default function BrandTicker() {
  const brands = [
    { name: 'BMW', origin: 'Germany' },
    { name: 'Mercedes-Benz', origin: 'Germany' },
    { name: 'Audi', origin: 'Germany' },
    { name: 'Porsche', origin: 'Germany' },
    { name: 'Toyota', origin: 'Japan' },
    { name: 'Honda', origin: 'Japan' },
    { name: 'Hyundai', origin: 'South Korea' },
    { name: 'Kia', origin: 'South Korea' },
    { name: 'Mahindra', origin: 'India' },
    { name: 'Tata Motors', origin: 'India' },
    { name: 'MG Motor', origin: 'UK/Global' },
    { name: 'Skoda', origin: 'Czechia' },
    { name: 'Volkswagen', origin: 'Germany' },
    { name: 'Jeep', origin: 'USA' },
    { name: 'Ford', origin: 'USA' },
    { name: 'Lexus', origin: 'Japan' },
    { name: 'Land Rover', origin: 'UK' },
    { name: 'Volvo', origin: 'Sweden' },
  ];

  // Duplicate for seamless infinite loop
  const tickerItems = [...brands, ...brands];

  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200/80 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
          Trusted by Premier Dealership Networks Representing Global Brands
        </p>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex items-center gap-8 whitespace-nowrap min-w-max"
        >
          {tickerItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              </div>
              <span className="text-sm font-extrabold font-heading text-slate-800 tracking-tight">
                {brand.name}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                {brand.origin}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
