import { memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function InventoryPagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-2xs">
      {/* Range Metadata & Page Size */}
      <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
        <span>
          Displaying <b className="text-slate-900">{startItem}–{endItem}</b> of{' '}
          <b className="text-slate-900">{totalItems}</b> vehicle{totalItems === 1 ? '' : 's'}
        </span>
        <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3">
          <span className="text-slate-400 font-medium">Per page:</span>
          <select
            id="inventory-page-size-select"
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-800 shadow-2xs outline-none focus:border-blue-400"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Pagination Nav Buttons */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`h-7 min-w-7 rounded-lg px-2 text-xs font-bold transition ${
              pageNum === currentPage
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default memo(InventoryPagination);
