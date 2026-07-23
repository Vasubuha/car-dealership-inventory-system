export default function FilterBar({ filters, categories, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <select
        value={filters.category}
        onChange={(e) => onChange('category', e.target.value)}
        className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-2xs"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={filters.stock || ''}
        onChange={(e) => onChange('stock', e.target.value)}
        className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-2xs"
      >
        <option value="">All Stock Levels</option>
        <option value="in_stock">In Stock (&gt; 5)</option>
        <option value="low_stock">Low Stock (1–5)</option>
        <option value="out_of_stock">Out of Stock (0)</option>
      </select>
      <input
        value={filters.min}
        onChange={(e) => onChange('min', e.target.value)}
        type="number"
        min="0"
        placeholder="Min price ($)"
        className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-2xs"
      />
      <input
        value={filters.max}
        onChange={(e) => onChange('max', e.target.value)}
        type="number"
        min="0"
        placeholder="Max price ($)"
        className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-2xs"
      />
      <select
        value={filters.sort}
        onChange={(e) => onChange('sort', e.target.value)}
        className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50 shadow-2xs"
      >
        <option value="newest">Newest Added</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name">Make: A–Z</option>
      </select>
    </div>
  );
}
