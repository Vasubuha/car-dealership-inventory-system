import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, MapPin, Fuel, Gauge, Calendar, Shield, ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { vehicleService } from '../../../services/vehicleService';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export default function QuickViewModal({ vehicle, onClose, isWishlisted, onToggleWishlist }) {
  const { user, isAuthenticated, openLogin } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const purchaseMutation = useMutation({
    mutationFn: async () => {
      if (!vehicle?.id) throw new Error('No vehicle selected');
      return await vehicleService.purchaseVehicle(vehicle.id, 1);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.purchases(user?.id) });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vehicles });
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.featuredVehicles });
      toast.success(`Successfully reserved ${vehicle?.make || vehicle?.brand} ${vehicle?.model}!`);
      onClose();
      navigate('/home/purchases');
    },
    onError: (error) => {
      const detail = error.response?.data?.detail;
      let msg = 'Failed to complete vehicle reservation.';
      if (typeof detail === 'string') {
        msg = detail;
      } else if (Array.isArray(detail)) {
        msg = detail.map((d) => d.msg || JSON.stringify(d)).join(', ');
      } else if (detail && typeof detail === 'object') {
        msg = detail.msg || JSON.stringify(detail);
      } else if (error.message) {
        msg = error.message;
      }
      toast.error(msg);
    },
  });

  if (!vehicle) return null;

  const triggerReservation = () => {
    purchaseMutation.mutate();
  };

  const handlePrimaryAction = () => {
    if (!isAuthenticated) {
      openLogin(triggerReservation);
    } else {
      triggerReservation();
    }
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      openLogin(() => {
        if (onToggleWishlist) onToggleWishlist(vehicle.id);
      });
    } else if (onToggleWishlist) {
      onToggleWishlist(vehicle.id);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 text-left text-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
                {vehicle.brand} Stock # {vehicle.vin}
              </span>
              <span className="text-xs text-slate-500 font-semibold">• {vehicle.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlistClick}
                className={`p-2 rounded-full border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Image Side (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${
                    vehicle.status === 'In Stock'
                      ? 'bg-emerald-600'
                      : vehicle.status === 'Reserved'
                      ? 'bg-amber-600'
                      : 'bg-blue-600'
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <Fuel className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Fuel</div>
                  <div className="text-xs font-bold text-slate-800">{vehicle.fuel}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <Gauge className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Mileage</div>
                  <div className="text-xs font-bold text-slate-800">{vehicle.mileage}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <Calendar className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Year</div>
                  <div className="text-xs font-bold text-slate-800">{vehicle.year}</div>
                </div>
              </div>
            </div>

            {/* Info Side (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {vehicle.brand}
                </span>
                <h2 className="text-2xl font-extrabold font-heading text-slate-900 mt-1">
                  {vehicle.model}
                </h2>
                <div className="text-2xl font-black text-blue-600 font-heading mt-2">
                  {vehicle.price}
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
                  {vehicle.description ||
                    'Verified OEM stock unit with full digital service history, multi-point inspection certificate, and immediate dealership transfer availability.'}
                </p>

                {/* Location & Dealer Tag */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>Location: {vehicle.location || 'Mumbai Dealership Hub #4'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Transmission: {vehicle.transmission}</span>
                  </div>
                </div>
              </div>

              {/* Reservation Status Notification */}
              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrimaryAction}
                  disabled={purchaseMutation.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-blue-500/20 transition-all"
                >
                  {purchaseMutation.isPending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Reserving Vehicle...</span>
                    </>
                  ) : (
                    <>
                      <span>{isAuthenticated ? 'Reserve Vehicle' : 'Login to Reserve'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {isAuthenticated && (
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/home/purchases');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    <span>My Purchases</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
