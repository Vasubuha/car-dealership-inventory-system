import PageContainer from '../components/layout/PageContainer';
import { useAuth } from '../context/AuthContext';
export default function Profile() {
  const { user } = useAuth();
  return (
    <PageContainer>
      <div className="max-w-2xl rounded-2xl bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="mt-1 text-slate-500">Your account details are managed securely.</p>
        <dl className="mt-8 space-y-5">
          <div>
            <dt className="text-sm text-slate-500">Name</dt>
            <dd className="font-semibold text-slate-800">{user?.username || '—'}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Email</dt>
            <dd className="font-semibold text-slate-800">{user?.email || '—'}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Role</dt>
            <dd className="font-semibold capitalize text-slate-800">{user?.role || 'customer'}</dd>
          </div>
        </dl>
      </div>
    </PageContainer>
  );
}
