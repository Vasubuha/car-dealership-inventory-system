import { ArrowUpDown, Filter, RotateCcw, Search, X } from 'lucide-react';

export default function InventoryToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories = [],
  stockFilter,
  onStockFilterChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  sortKey,
  onSortKeyChange,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-2xs space-y-3 backdrop-blur-2xs">
      <div className="grid gap-3 md:grid-cols-12 items-center">
        {/* Search Input */}
        <div className="relative md:col-span-4 xl:col-span-4">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={17}
          />
          <input
            id="inventory-search-input"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search make or model..."
            className="w-full rounded-xl border border-slate-200/90 bg-white py-2 pl-9 pr-8 text-xs font-medium text-slate-800 shadow-2xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative md:col-span-3 xl:col-span-2">
          <select
            id="inventory-category-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200/90 bg-white py-2 px-3 text-xs font-semibold text-slate-700 shadow-2xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Status Filter */}
        <div className="relative md:col-span-3 xl:col-span-2">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Filter size={14} />
          </div>
          <select
            id="inventory-stock-filter-select"
            value={stockFilter}
            onChange={(e) => onStockFilterChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200/90 bg-white py-2 pl-8 pr-3 text-xs font-semibold text-slate-700 shadow-2xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          >
            <option value="all">All Stock Status</option>
            <option value="in_stock">In Stock (&gt; 5)</option>
            <option value="low_stock">Low Stock (1–5)</option>
            <option value="out_of_stock">Out of Stock (0)</option>
          </select>
        </div>

        {/* Sort Selector */}
        <div className="relative md:col-span-4 xl:col-span-3">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <ArrowUpDown size={14} />
          </div>
          <select
            id="inventory-sort-select"
            value={sortKey}
            onChange={(e) => onSortKeyChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200/90 bg-white py-2 pl-8 pr-3 text-xs font-semibold text-slate-700 shadow-2xs outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"
          >
            <option value="updated_desc">Recently Updated</option>
            <option value="make_asc">Make (A–Z)</option>
            <option value="category_asc">Category (A–Z)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="stock_desc">Stock: High to Low</option>
            <option value="stock_asc">Stock: Low to High</option>
          </select>
        </div>

        {/* Reset Action */}
        {hasActiveFilters && (
          <div className="md:col-span-2 xl:col-span-1 flex justify-end">
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition shadow-2xs"
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
