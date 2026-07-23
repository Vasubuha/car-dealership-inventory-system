import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Shield, Sparkles } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const [tab, setTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 text-left p-6 sm:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Branding */}
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md shadow-blue-500/20">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold font-heading text-slate-900 tracking-tight">
                {tab === 'login' ? 'Welcome Back' : 'Create Member Account'}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {tab === 'login'
                  ? 'Sign in to access your dealership marketplace'
                  : 'Join Autovance VIP member marketplace'}
              </p>
            </div>

            {/* Auth Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-full mt-4 border border-slate-200">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === 'login'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  tab === 'register'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div>
            {tab === 'login' ? (
              <LoginForm onRegister={() => setTab('register')} onSuccess={onClose} />
            ) : (
              <RegisterForm onLogin={() => setTab('login')} />
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
