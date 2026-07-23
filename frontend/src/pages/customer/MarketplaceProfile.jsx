import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, MapPin, Key, CheckCircle2, Car } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MarketplaceProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="pt-28 sm:pt-36 pb-20 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Marketplace Account
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900 tracking-tight mt-2">
            Member Profile & Settings
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your personal preferences, preferred dealership hub, and security settings.
          </p>
        </div>

        {/* Profile Form Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900">
                {user?.username || 'Member Account'}
              </h2>
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider">
                {user?.role || 'Customer'} • VIP Account Active
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5 text-xs font-semibold text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 uppercase font-bold text-slate-500">Username</label>
                <input
                  type="text"
                  defaultValue={user?.username || ''}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold outline-none"
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-1.5 uppercase font-bold text-slate-500">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email || 'customer@autovance.io'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 uppercase font-bold text-slate-500">Preferred Dealership Hub</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold outline-none focus:border-blue-600">
                  <option value="mumbai">Mumbai Central Hub</option>
                  <option value="bengaluru">Bengaluru Flagship</option>
                  <option value="delhi">Delhi NCR Hub</option>
                  <option value="chennai">Chennai Hub</option>
                </select>
              </div>
              <div>
                <label className="block mb-1.5 uppercase font-bold text-slate-500">Preferred Fuel Type</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-bold outline-none focus:border-blue-600">
                  <option value="all">All Fuel Types</option>
                  <option value="electric">Electric (EV)</option>
                  <option value="petrol">Petrol Turbo</option>
                  <option value="diesel">Diesel</option>
                </select>
              </div>
            </div>

            {saved && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile settings updated successfully.</span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Back to Marketplace
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
              >
                Save Member Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
