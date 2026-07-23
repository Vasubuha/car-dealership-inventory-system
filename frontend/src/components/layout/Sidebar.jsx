import {
  CarFront,
  LayoutDashboard,
  Menu,
  PlusCircle,
  ShoppingBag,
  Users,
  Warehouse,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const customer = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/vehicles', label: 'Vehicles', icon: CarFront },
  { to: '/purchases', label: 'My purchases', icon: ShoppingBag },
  { to: '/profile', label: 'Profile', icon: Users },
];
const admin = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/vehicles', label: 'Vehicles', icon: CarFront },
  { to: '/vehicles/add', label: 'Add vehicle', icon: PlusCircle },
  { to: '/inventory', label: 'Inventory', icon: Warehouse },
  { to: '/profile', label: 'Profile', icon: Users },
];
export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const items = isAdmin ? admin : customer;
  return (
    <>
      <button
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-xs transition-opacity lg:hidden ${open ? 'block opacity-100' : 'hidden opacity-0'}`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 px-4 py-6 text-slate-300 transition-transform duration-250 ease-out lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-8 flex items-center justify-between px-3">
          <NavLink to="/dashboard" className="flex items-center gap-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-900/40">
              <CarFront size={22} />
            </span>
            <span>
              <b className="block text-lg font-bold tracking-tight">AutoFleet</b>
              <small className="text-[11px] font-medium text-slate-400">Dealership Portal</small>
            </span>
          </NavLink>
          <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-1.5">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 backdrop-blur-xs">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Signed in as</p>
          <p className="mt-1 truncate text-sm font-bold text-white">
            {user?.username || user?.email || 'Customer'}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            {isAdmin ? 'Administrator' : 'Customer Account'}
          </div>
        </div>
      </aside>
    </>
  );
}
export function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open navigation"
      className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 transition lg:hidden"
    >
      <Menu size={20} />
    </button>
  );
}
