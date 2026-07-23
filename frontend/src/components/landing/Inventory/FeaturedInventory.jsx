import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Fuel, Gauge, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import QuickViewModal from './QuickViewModal';
import { useAuth } from '../../../context/AuthContext';
import { vehicleService } from '../../../services/vehicleService';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export default function FeaturedInventory({
  badge = 'Live Stock Inventory',
  title = 'Featured Dealership Vehicles',
  subtitle = 'Inspect current vehicle stock available for immediate acquisition across Indian dealer networks.',
  mode = 'public',
}) {
  const { isAuthenticated, openLogin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState([]);
  const [activeModalVehicle, setActiveModalVehicle] = useState(null);

  const { data: dbVehicles } = useQuery({
    queryKey: QUERY_KEYS.vehicles,
    queryFn: () => vehicleService.getVehicles(),
  });

  const inventoryData = [
    {
      id: 'c3a07a12-88f2-4b2a-874f-9011986fa801',
      vin: 'MH-04-2024-901',
      brand: 'BMW',
      model: 'M4 Competition Coupé',
      category: 'Sports',
      year: 2024,
      fuel: 'Petrol Turbo',
      transmission: '8-Speed Steptronic',
      mileage: '1,200 km',
      price: '₹1.53 Crore',
      priceNum: 153,
      status: 'In Stock',
      location: 'Mumbai Central Hub',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
      tagColor: 'bg-emerald-600',
    },
    {
      id: 'd4b18b23-99f3-4c3b-985f-0122097fa802',
      vin: 'KA-01-2024-442',
      brand: 'Mercedes-Benz',
      model: 'E-Class LWB E350d',
      category: 'Luxury',
      year: 2024,
      fuel: 'Diesel Mild-Hybrid',
      transmission: '9G-TRONIC',
      mileage: '4,500 km',
      price: '₹88.5 Lakh',
      priceNum: 88.5,
      status: 'In Stock',
      location: 'Bengaluru Flagship',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      tagColor: 'bg-emerald-600',
    },
    {
      id: 'e5c29c34-00a4-4d4c-a960-1233108fa803',
      vin: 'DL-03-2024-118',
      brand: 'Porsche',
      model: '911 Carrera GTS',
      category: 'Sports',
      year: 2024,
      fuel: 'Petrol Twin-Turbo',
      transmission: '8-Speed PDK',
      mileage: '850 km',
      price: '₹2.15 Crore',
      priceNum: 215,
      status: 'Reserved',
      location: 'New Delhi South',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      tagColor: 'bg-amber-600',
    },
    {
      id: 'f6d30d45-11b5-4e5d-b071-2344219fa804',
      vin: 'MH-02-2024-774',
      brand: 'Tata',
      model: 'Harrier Fearless+ Dark',
      category: 'SUV',
      year: 2024,
      fuel: 'Kryotec Diesel',
      transmission: '6-Speed AT',
      mileage: '6,200 km',
      price: '₹26.4 Lakh',
      priceNum: 26.4,
      status: 'In Stock',
      location: 'Pune Auto Hub',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
      tagColor: 'bg-emerald-600',
    },
    {
      id: 'a7e41e56-22c6-4f6e-c182-3455320fa805',
      vin: 'HR-26-2024-302',
      brand: 'Mahindra',
      model: 'XUV700 AX7 Luxury AWD',
      category: 'SUV',
      year: 2024,
      fuel: 'mHawk Diesel',
      transmission: '6-Speed Automatic',
      mileage: '8,400 km',
      price: '₹25.8 Lakh',
      priceNum: 25.8,
      status: 'In Stock',
      location: 'Gurugram Central',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      tagColor: 'bg-emerald-600',
    },
    {
      id: 'b8f52f67-33d7-407f-d293-4566431fa806',
      vin: 'TN-09-2024-551',
      brand: 'Hyundai',
      model: 'Ioniq 5 EV AWD',
      category: 'Electric',
      year: 2024,
      fuel: 'Electric 72.6 kWh',
      transmission: 'Single Speed Reduction',
      mileage: '2,100 km',
      price: '₹46.2 Lakh',
      priceNum: 46.2,
      status: 'In Stock',
      location: 'Chennai Tech Park',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
      tagColor: 'bg-emerald-600',
    },
    {
      id: 'c9063078-44e8-4180-e304-5677542fa807',
      vin: 'GJ-01-2024-912',
      brand: 'Skoda',
      model: 'Slavia 1.5 TSI Monte Carlo',
      category: 'Sedan',
      year: 2024,
      fuel: 'Petrol Turbo',
      transmission: '7-Speed DSG',
      mileage: '5,100 km',
      price: '₹18.6 Lakh',
      priceNum: 18.6,
      status: 'In Stock',
      location: 'Ahmedabad Highway',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
      tagColor: 'bg-emerald-600',
    },
    {
      id: 'd0174189-55f9-4291-f415-6788653fa808',
      vin: 'AP-16-2024-209',
      brand: 'Toyota',
      model: 'Hilux 4x4 High',
      category: 'Pickup',
      year: 2023,
      fuel: '2.8L Diesel',
      transmission: '6-Speed AT',
      mileage: '11,000 km',
      price: '₹37.9 Lakh',
      priceNum: 37.9,
      status: 'Pending Transfer',
      location: 'Hyderabad Hub',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      tagColor: 'bg-blue-600',
    },
  ];

  const activeInventory = dbVehicles && dbVehicles.length > 0
    ? dbVehicles.map((v) => ({
        id: String(v.id),
        vin: `VIN-${v.make.toUpperCase().slice(0, 2)}-${String(v.id).slice(0, 8).toUpperCase()}`,
        brand: v.make,
        model: v.model,
        category: v.category || 'Sedan',
        year: 2024,
        fuel: 'Hybrid / Gasoline',
        transmission: 'Automatic',
        mileage: 'Verified Stock',
        price: `₹${(Number(v.price) / 100000).toFixed(1)} Lakh`,
        priceNum: Number(v.price) / 100000,
        status: v.quantity > 0 ? 'In Stock' : 'Out of Stock',
        location: 'Main Marketplace Hub',
        image: v.image_url || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
        tagColor: v.quantity > 0 ? 'bg-emerald-600' : 'bg-rose-600',
      }))
    : inventoryData;

  const categories = ['All', 'SUV', 'Sedan', 'Luxury', 'Sports', 'Electric', 'Pickup'];

  const filteredInventory = activeInventory.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  return (
    <section id="inventory" className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
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

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredInventory.map((item, idx) => {
            const isWishlisted = wishlist.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
              >
                {/* Vehicle Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={`${item.brand} ${item.model}`}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${item.tagColor} shadow-md`}
                  >
                    {item.status}
                  </span>
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        openLogin(() => toggleWishlist(item.id));
                      } else {
                        toggleWishlist(item.id);
                      }
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-slate-600 hover:text-rose-600 transition-colors shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col gap-3 flex-1 justify-between text-left">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1">
                      <span className="text-blue-600 font-bold uppercase">{item.brand}</span>
                      <span>VIN #{item.vin.slice(-6)}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.model}
                    </h3>
                  </div>

                  {/* Specs Pill Row */}
                  <div className="grid grid-cols-3 gap-1 py-2 border-y border-slate-100 text-[10px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{item.fuel.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{item.mileage}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{item.year}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                        Stock Price
                      </span>
                      <div className="text-lg font-extrabold text-slate-900 font-heading">
                        {item.price}
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveModalVehicle(item)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        vehicle={activeModalVehicle}
        onClose={() => setActiveModalVehicle(null)}
        isWishlisted={activeModalVehicle && wishlist.includes(activeModalVehicle.id)}
        onToggleWishlist={toggleWishlist}
      />
    </section>
  );
}
