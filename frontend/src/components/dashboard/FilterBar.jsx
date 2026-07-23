export default function FilterBar({ filters, categories, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <select value={filters.category} onChange={(e) => onChange('category', e.target.value)}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input
        value={filters.min}
        onChange={(e) => onChange('min', e.target.value)}
        type="number"
        min="0"
        placeholder="Min price"
      />
      <input
        value={filters.max}
        onChange={(e) => onChange('max', e.target.value)}
        type="number"
        min="0"
        placeholder="Max price"
      />
      <select value={filters.sort} onChange={(e) => onChange('sort', e.target.value)}>
        <option value="newest">Newest added</option>
        <option value="price-low">Price: low to high</option>
        <option value="price-high">Price: high to low</option>
        <option value="name">Make: A–Z</option>
      </select>
    </div>
  );
}
