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
        className={`fixed inset-0 z-30 bg-slate-900/30 lg:hidden ${open ? 'block' : 'hidden'}`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 px-4 py-6 text-slate-300 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="mb-10 flex items-center justify-between px-3">
          <NavLink to="/dashboard" className="flex items-center gap-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600">
              <CarFront size={22} />
            </span>
            <span>
              <b className="block text-lg">AutoFleet</b>
              <small className="text-xs text-slate-400">Dealership portal</small>
            </span>
          </NavLink>
          <button className="lg:hidden" onClick={onClose}>
            <X />
          </button>
        </div>
        <nav className="space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' : 'hover:bg-slate-800 hover:text-white'}`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs text-slate-400">Signed in as</p>
          <p className="mt-1 truncate text-sm font-semibold text-white">
            {user?.username || user?.email || 'Customer'}
          </p>
          <p className="mt-1 text-xs capitalize text-blue-300">
            {isAdmin ? 'Administrator' : 'Customer account'}
          </p>
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
      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
    >
      <Menu />
    </button>
  );
}
