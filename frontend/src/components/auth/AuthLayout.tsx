import type { ReactNode } from 'react';
import { CarFront } from 'lucide-react';

export default function AuthLayout({
  children,
  mode,
}: {
  children: ReactNode;
  mode: 'login' | 'register';
}) {
  const login = mode === 'login';
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-50 px-4 py-10 text-slate-900">
      <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-28 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
      <section className="relative w-full max-w-md rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-md sm:p-9 animate-fade-in">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20">
            <CarFront size={24} />
          </div>
          <p className="mb-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-blue-600">
            AutoFleet
          </p>
          <h1 className="text-2xl font-black text-slate-900 sm:text-3xl">{login ? 'Welcome back' : 'Create your account'}</h1>
          <p className="mt-2 text-sm text-slate-500 font-medium">
            {login
              ? 'Sign in to access your dealership workspace.'
              : 'Get started with your dealership account.'}
          </p>
        </header>
        {children}
      </section>
    </main>
  );
}
