import { Bell, ChevronDown, LogOut, Search, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MobileMenuButton } from './Sidebar';
export default function Navbar({ onMenu }) {
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState(false);
  const initials = (user?.username || user?.email || 'C').slice(0, 1).toUpperCase();
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-3 border-b border-slate-200/80 bg-white/80 px-5 backdrop-blur-md lg:px-8">
      <MobileMenuButton onClick={onMenu} />
      <div className="hidden max-w-md flex-1 md:block">
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3.5 py-2 text-slate-400 transition-all focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
          <Search size={18} className="text-slate-400" />
          <input
            aria-label="Global search"
            placeholder="Search inventory..."
            className="w-full border-none bg-transparent p-0 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-0 focus:border-none"
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative rounded-xl border border-slate-200/70 bg-white p-2.5 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition shadow-2xs"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>
        <div className="relative">
          <button
            onClick={() => setMenu(!menu)}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white p-1.5 pr-3 hover:border-slate-300 hover:bg-slate-50 transition shadow-2xs"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-xs font-bold text-white shadow-xs">
              {initials}
            </span>
            <span className="hidden text-left sm:block">
              <b className="block max-w-32 truncate text-xs font-bold text-slate-900 leading-tight">
                {user?.username || 'My Account'}
              </b>
              <small className="text-[11px] font-medium capitalize text-slate-500 leading-none">{user?.role || 'customer'}</small>
            </span>
            <ChevronDown size={14} className="text-slate-400 transition-transform duration-200" />
          </button>
          {menu && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-xl animate-slide-up">
              <div className="px-3 py-2 border-b border-slate-100 mb-1 sm:hidden">
                <p className="text-xs font-bold text-slate-900">{user?.username}</p>
                <p className="text-[11px] text-slate-500 capitalize">{user?.role}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setMenu(false)}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <User size={15} />
                Profile
              </Link>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
