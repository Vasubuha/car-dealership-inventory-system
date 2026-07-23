import type { ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
export default function SubmitButton({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-150 hover:from-blue-500 hover:to-blue-600 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:from-blue-600 disabled:hover:to-blue-700 disabled:active:scale-100"
    >
      {loading && <LoaderCircle className="animate-spin" size={17} />}
      {loading ? 'Please wait…' : children}
    </button>
  );
}
