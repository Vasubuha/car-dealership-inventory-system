import { Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function DashboardHeader({ count }) {
  const { user } = useAuth();
  const admin = user?.role === 'admin';

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-200/50 mb-2">
          <Sparkles size={13} className="text-blue-500" />
          <span>Inventory Overview</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {user?.username || 'there'} 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          Here’s what’s happening with your dealership inventory today.
        </p>
      </div>
      {admin && (
        <div className="flex gap-3">
          <Link to="/vehicles/add">
            <Button className="shadow-md shadow-blue-500/20">
              <Plus size={17} />
              Add Vehicle
            </Button>
          </Link>
        </div>
      )}
      <span className="sr-only">{count} vehicles</span>
    </div>
  );
}
