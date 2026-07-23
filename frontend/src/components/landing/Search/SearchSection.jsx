import { useState } from 'react';
import { Search, SlidersHorizontal, RefreshCw, Car, Check } from 'lucide-react';

export default function SearchSection({ onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [fuel, setFuel] = useState('All');
  const [transmission, setTransmission] = useState('All');
  const [maxPrice, setMaxPrice] = useState(150); // In Lakhs (150 = 1.5 Cr)

  const brands = ['All', 'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Toyota', 'Mahindra', 'Tata', 'Hyundai'];
  const categories = ['All', 'SUV', 'Sedan', 'Luxury', 'Electric', 'Sports', 'Pickup'];
  const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['All', 'Automatic', 'Manual'];

  const handleReset = () => {
    setSearchQuery('');
    setCategory('All');
    setBrand('All');
    setFuel('All');
    setTransmission('All');
    setMaxPrice(150);
  };

  return (
    <section id="search" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md text-left">
          {/* Section Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Dealership Inventory Search Engine
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Filter through 450+ verified vehicle units across your dealer network
                </p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search Query Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Vehicle Keyword</label>
              <input
                type="text"
                placeholder="e.g. M4, Harrier, GT3, Nexon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>

            {/* Brand Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">OEM Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b === 'All' ? 'All OEM Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Vehicle Segment</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Segments' : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Powertrain</label>
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                {fuelTypes.map((f) => (
                  <option key={f} value={f}>
                    {f === 'All' ? 'All Fuel Types' : f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Price Range Slider & Search Action */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-200">
            {/* Price Slider */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Max Budget Range:</span>
                <span className="font-extrabold text-blue-600 font-heading text-sm">
                  Up to ₹{maxPrice >= 100 ? `${(maxPrice / 100).toFixed(1)} Crore` : `${maxPrice} Lakh`}
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="200"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>₹8 Lakh</span>
                <span>₹50 Lakh</span>
                <span>₹1.0 Crore</span>
                <span>₹2.0 Crore+</span>
              </div>
            </div>

            {/* Submit Search Button */}
            <button
              onClick={() => {
                const el = document.getElementById('inventory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              <span>Search Stock Inventory</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
