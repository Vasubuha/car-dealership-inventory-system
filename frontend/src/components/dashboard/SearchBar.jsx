import { Search } from 'lucide-react';
export default function SearchBar({ value, onChange }) {
  return (
    <label className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-2xs transition-all focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50">
      <Search size={19} className="text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search make or model..."
        className="w-full border-none bg-transparent p-0 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-0 focus:border-none"
      />
    </label>
  );
}
