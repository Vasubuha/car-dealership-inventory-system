import { ShieldX } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Unauthorized() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
      <div>
        <ShieldX className="mx-auto mb-4 text-rose-500" size={50} />
        <h1 className="text-3xl font-bold text-slate-900">Access denied</h1>
        <p className="mt-2 text-slate-500">You do not have permission to view this page.</p>
        <Link className="mt-6 inline-block font-semibold text-blue-600" to="/dashboard">
          Return to dashboard
        </Link>
      </div>
    </div>
  );
}
