import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Check, Zap, Gauge, Fuel, DollarSign } from 'lucide-react';

export default function ComparisonSection() {
  const comparisonVehicles = [
    {
      id: 'v1',
      name: 'BMW M4 Competition',
      brand: 'BMW',
      price: '₹1.53 Crore',
      hp: '510 HP',
      acceleration: '3.8 seconds',
      topSpeed: '290 km/h',
      fuel: 'Petrol Twin-Turbo',
      mileage: '10.2 km/l',
      transmission: '8-Speed AT',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'v2',
      name: 'Porsche 911 Carrera GTS',
      brand: 'Porsche',
      price: '₹2.15 Crore',
      hp: '480 HP',
      acceleration: '3.3 seconds',
      topSpeed: '311 km/h',
      fuel: 'Petrol Twin-Turbo',
      mileage: '9.8 km/l',
      transmission: '8-Speed PDK',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'v3',
      name: 'Hyundai Ioniq 5 EV',
      brand: 'Hyundai',
      price: '₹46.2 Lakh',
      hp: '305 HP',
      acceleration: '5.2 seconds',
      topSpeed: '185 km/h',
      fuel: 'Electric (72.6 kWh)',
      mileage: '500 km range',
      transmission: 'Single Speed',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const [leftCar, setLeftCar] = useState(comparisonVehicles[0]);
  const [rightCar, setRightCar] = useState(comparisonVehicles[1]);

  return (
    <section id="comparison" className="py-20 bg-white border-b border-slate-200 text-slate-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Interactive Decision Tool
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-3">
            Side-by-Side Vehicle Comparison
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Compare performance specifications, powertrain metrics, and pricing between vehicles.
          </p>
        </div>

        {/* Selectors Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold text-slate-700">Vehicle 1</label>
            <select
              value={leftCar.id}
              onChange={(e) => setLeftCar(comparisonVehicles.find((c) => c.id === e.target.value) || leftCar)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
            >
              {comparisonVehicles.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.price})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label className="text-xs font-bold text-slate-700">Vehicle 2</label>
            <select
              value={rightCar.id}
              onChange={(e) => setRightCar(comparisonVehicles.find((c) => c.id === e.target.value) || rightCar)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
            >
              {comparisonVehicles.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.price})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Showcase Box */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left">
          <div className="grid grid-cols-2 gap-6 pb-6 border-b border-slate-200">
            {/* Left Car Header */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 border border-slate-300 shadow-sm">
                <img src={leftCar.image} alt={leftCar.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">{leftCar.name}</h3>
              <span className="text-base font-black text-blue-600 font-heading">{leftCar.price}</span>
            </div>

            {/* Right Car Header */}
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 border border-slate-300 shadow-sm">
                <img src={rightCar.image} alt={rightCar.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">{rightCar.name}</h3>
              <span className="text-base font-black text-blue-600 font-heading">{rightCar.price}</span>
            </div>
          </div>

          {/* Specs Rows */}
          <div className="divide-y divide-slate-200/80 text-xs sm:text-sm font-medium text-slate-700">
            <div className="grid grid-cols-3 py-3 text-center items-center">
              <span className="font-bold text-slate-900">{leftCar.hp}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Horsepower</span>
              <span className="font-bold text-slate-900">{rightCar.hp}</span>
            </div>

            <div className="grid grid-cols-3 py-3 text-center items-center">
              <span className="font-bold text-slate-900">{leftCar.acceleration}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">0-100 km/h</span>
              <span className="font-bold text-slate-900">{rightCar.acceleration}</span>
            </div>

            <div className="grid grid-cols-3 py-3 text-center items-center">
              <span className="font-bold text-slate-900">{leftCar.topSpeed}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Top Speed</span>
              <span className="font-bold text-slate-900">{rightCar.topSpeed}</span>
            </div>

            <div className="grid grid-cols-3 py-3 text-center items-center">
              <span className="font-bold text-slate-900">{leftCar.fuel}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Powertrain</span>
              <span className="font-bold text-slate-900">{rightCar.fuel}</span>
            </div>

            <div className="grid grid-cols-3 py-3 text-center items-center">
              <span className="font-bold text-slate-900">{leftCar.transmission}</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Transmission</span>
              <span className="font-bold text-slate-900">{rightCar.transmission}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
