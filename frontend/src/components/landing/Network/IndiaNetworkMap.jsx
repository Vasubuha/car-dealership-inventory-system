import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Car, TrendingUp, Users } from 'lucide-react';

export default function IndiaNetworkMap() {
  const [selectedCity, setSelectedCity] = useState(0);

  const cityHubs = [
    {
      id: 'mumbai',
      name: 'Mumbai Metro',
      state: 'Maharashtra',
      branches: 14,
      inventory: '94 Vehicles',
      sales: '₹42.5 Crore/mo',
      customers: '3,200 Buyers',
      topBrand: 'BMW & Porsche',
      coords: { x: '25%', y: '55%' },
    },
    {
      id: 'delhi',
      name: 'Delhi NCR Hub',
      state: 'Delhi / Haryana',
      branches: 18,
      inventory: '112 Vehicles',
      sales: '₹48.2 Crore/mo',
      customers: '4,100 Buyers',
      topBrand: 'Mercedes-Benz & Audi',
      coords: { x: '35%', y: '28%' },
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru Tech Park',
      state: 'Karnataka',
      branches: 12,
      inventory: '82 Vehicles',
      sales: '₹36.4 Crore/mo',
      customers: '2,800 Buyers',
      topBrand: 'EV & Electric SUVs',
      coords: { x: '42%', y: '78%' },
    },
    {
      id: 'chennai',
      name: 'Chennai Hub',
      state: 'Tamil Nadu',
      branches: 9,
      inventory: '58 Vehicles',
      sales: '₹24.8 Crore/mo',
      customers: '1,900 Buyers',
      topBrand: 'Hyundai & Toyota',
      coords: { x: '52%', y: '82%' },
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad Auto City',
      state: 'Telangana',
      branches: 10,
      inventory: '64 Vehicles',
      sales: '₹28.9 Crore/mo',
      customers: '2,100 Buyers',
      topBrand: 'Luxury SUVs & Sedans',
      coords: { x: '48%', y: '64%' },
    },
    {
      id: 'ahmedabad',
      name: 'Ahmedabad Hub',
      state: 'Gujarat',
      branches: 8,
      inventory: '48 Vehicles',
      sales: '₹21.5 Crore/mo',
      customers: '1,600 Buyers',
      topBrand: 'Skoda & Tata',
      coords: { x: '20%', y: '45%' },
    },
  ];

  const currentHub = cityHubs[selectedCity];

  return (
    <section className="py-20 lg:py-28 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Nationwide Presence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Indian Dealership Network Map
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Over 140+ showroom branches connected in real-time across 28 metro and tier-1 Indian cities.
          </p>
        </div>

        {/* Map & City Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Interactive Map Visual (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[380px] bg-slate-900 rounded-2xl overflow-hidden p-6 text-white flex flex-col justify-between shadow-inner">
            {/* Map Header */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400" /> India Live Hub Matrix
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                140+ Showrooms Online
              </span>
            </div>

            {/* City Hub Markers Overlay */}
            <div className="relative w-full h-72 my-4 bg-slate-950/60 rounded-xl border border-slate-800 overflow-hidden">
              {/* Subtle Grid Lines */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

              {cityHubs.map((hub, idx) => {
                const isSelected = selectedCity === idx;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setSelectedCity(idx)}
                    onMouseEnter={() => setSelectedCity(idx)}
                    style={{ left: hub.coords.x, top: hub.coords.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group transition-all duration-200 ${
                      isSelected ? 'z-30 scale-110' : 'z-10 hover:scale-105'
                    }`}
                  >
                    <div className="relative flex h-5 w-5 items-center justify-center">
                      {isSelected && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      )}
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                          isSelected
                            ? 'bg-blue-500 border-white shadow-[0_0_12px_rgba(59,130,246,0.9)]'
                            : 'bg-slate-700 border-slate-400 group-hover:bg-blue-400'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border shadow-md transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400'
                          : 'bg-slate-900/90 text-slate-300 border-slate-700 group-hover:text-white'
                      }`}
                    >
                      {hub.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Status */}
            <div className="text-[10px] text-slate-400 flex justify-between font-mono">
              <span>Click or hover on a hub pin</span>
              <span>Latency: 12ms</span>
            </div>
          </div>

          {/* City Hub Metrics Detail Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left h-full gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentHub.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {currentHub.state}
                  </span>
                  <h3 className="text-2xl font-extrabold font-heading text-slate-900 mt-0.5">
                    {currentHub.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Primary Demand OEM: <span className="text-slate-800 font-bold">{currentHub.topBrand}</span>
                  </p>
                </div>

                {/* Metrics 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <Building2 className="w-4 h-4 text-blue-600 mb-1" />
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Showrooms</div>
                    <div className="text-base font-extrabold text-slate-900">{currentHub.branches} Branches</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <Car className="w-4 h-4 text-indigo-600 mb-1" />
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Active Stock</div>
                    <div className="text-base font-extrabold text-slate-900">{currentHub.inventory}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <TrendingUp className="w-4 h-4 text-emerald-600 mb-1" />
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Monthly Sales</div>
                    <div className="text-base font-extrabold text-slate-900">{currentHub.sales}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <Users className="w-4 h-4 text-amber-600 mb-1" />
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Active Clients</div>
                    <div className="text-base font-extrabold text-slate-900">{currentHub.customers}</div>
                  </div>
                </div>

                {/* City Selection Pills */}
                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Select Metro Hub:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {cityHubs.map((hub, idx) => (
                      <button
                        key={hub.id}
                        onClick={() => setSelectedCity(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          selectedCity === idx
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {hub.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
