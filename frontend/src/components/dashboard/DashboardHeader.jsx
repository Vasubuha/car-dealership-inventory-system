import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export default function DashboardHeader({ count }) {
  const { user } = useAuth();
  const admin = user?.role === 'admin';

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-blue-600">Overview</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {user?.username || 'there'}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Here’s what’s happening with your dealership today.
        </p>
      </div>
      {admin && (
        <div className="flex gap-3">
          <Link to="/vehicles/add">
            <Button>
              <Plus size={17} />
              Add vehicle
            </Button>
          </Link>
        </div>
      )}
      <span className="sr-only">{count} vehicles</span>
    </div>
  );
}
