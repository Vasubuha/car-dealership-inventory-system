import PageContainer from '../components/layout/PageContainer';
export default function Settings() {
  return (
    <PageContainer>
      <div className="rounded-2xl bg-white p-7 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-500">
          Account preferences will appear here as the API becomes available.
        </p>
      </div>
    </PageContainer>
  );
}
