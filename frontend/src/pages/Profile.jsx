import PageContainer from '../components/layout/PageContainer';
import { useAuth } from '../context/AuthContext';
import { Mail, Shield, User } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const initials = (user?.username || user?.email || 'U').slice(0, 1).toUpperCase();

  return (
    <PageContainer>
      <div className="max-w-2xl rounded-2xl border border-slate-200/80 bg-white/90 p-7 shadow-2xs backdrop-blur-2xs">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-2xl font-black text-white shadow-md shadow-blue-500/20">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">Profile Overview</h1>
            <p className="mt-1 text-sm text-slate-500 font-medium">Your account details and security settings.</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-600 border border-slate-200/60 shadow-2xs">
              <User size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Username</p>
              <p className="mt-0.5 font-bold text-slate-900 text-base">{user?.username || '—'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-600 border border-slate-200/60 shadow-2xs">
              <Mail size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</p>
              <p className="mt-0.5 font-bold text-slate-900 text-base">{user?.email || '—'}</p>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-center gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-blue-600 border border-slate-200/60 shadow-2xs">
                <Shield size={18} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Account Role</p>
                <p className="mt-0.5 font-bold text-slate-900 text-base capitalize">{user?.role || 'customer'}</p>
              </div>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200/60">
              {user?.role === 'admin' ? 'Administrator' : 'Verified Customer'}
            </span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
