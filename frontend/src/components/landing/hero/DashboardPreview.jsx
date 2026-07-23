import { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Bell,
  RefreshCw,
  Plus,
  Car,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronDown,
  ShieldAlert,
} from 'lucide-react';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const mockVehicles = [
    {
      id: 'VIN-9042',
      make: 'Porsche',
      model: '911 GT3',
      year: 2024,
      status: 'In Stock',
      price: '$189,500',
      mileage: '1,200 mi',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      tagColor: 'bg-emerald-500',
    },
    {
      id: 'VIN-8120',
      make: 'BMW',
      model: 'M4 Competition',
      year: 2024,
      status: 'Reserved',
      price: '$84,900',
      mileage: '3,450 mi',
      statusColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      tagColor: 'bg-amber-500',
    },
    {
      id: 'VIN-7301',
      make: 'Audi',
      model: 'RS6 Avant',
      year: 2023,
      status: 'In Stock',
      price: '$124,000',
      mileage: '8,900 mi',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      tagColor: 'bg-emerald-500',
    },
    {
      id: 'VIN-6119',
      make: 'Mercedes-AMG',
      model: 'GT 63 S',
      year: 2024,
      status: 'Pending Purchase',
      price: '$162,300',
      mileage: '500 mi',
      statusColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      tagColor: 'bg-blue-500',
    },
  ];

  const filteredVehicles = mockVehicles.filter((v) => {
    const matchesSearch =
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'in_stock') return matchesSearch && v.status === 'In Stock';
    if (activeTab === 'reserved') return matchesSearch && v.status === 'Reserved';
    return matchesSearch;
  });

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-700/70 shadow-2xl shadow-slate-950/80 backdrop-blur-2xl overflow-hidden text-left font-sans transition-all duration-300">
      {/* Browser Window Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800 select-none">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-xs shadow-rose-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-xs shadow-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-xs shadow-emerald-500/50" />
        </div>

        {/* Browser URL Search Bar */}
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-400 w-60 sm:w-80 justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-mono text-[11px] truncate">
              https://app.autovance.io/inventory
            </span>
          </div>
          <LockIcon className="w-3 h-3 text-slate-500 shrink-0" />
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
            LIVE DATA
          </span>
        </div>
      </div>

      {/* Main App Workspace Layout */}
      <div className="flex min-h-[380px] text-xs">
        {/* Mini Sidebar */}
        <div className="hidden sm:flex flex-col items-center py-4 px-2.5 bg-slate-950/50 border-r border-slate-800/80 gap-4 text-slate-400">
          <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Car className="w-4 h-4" />
          </div>
          <div className="p-2 rounded-xl hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="p-2 rounded-xl hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer">
            <Activity className="w-4 h-4" />
          </div>
          <div className="p-2 rounded-xl hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
          </div>
        </div>

        {/* Main Dashboard Content Area */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-4 bg-slate-900/60">
          {/* Top Dashboard Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <h2 className="text-sm sm:text-base font-bold font-heading text-white flex items-center gap-2">
                <span>Vehicle Inventory Overview</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  450 Total
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Real-time stock monitoring & valuation feed
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter stock..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-[11px] text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-36 sm:w-44 transition-all"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] shadow-xs shadow-blue-600/30 transition-colors">
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Vehicle</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-medium">Total Valuation</div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">$2,840,500</div>
              <div className="text-[9px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5" /> +14.2% this month
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-medium">Turnover Rate</div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">18.4 Days</div>
              <div className="text-[9px] text-blue-400 font-semibold mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> Optimal Velocity
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-medium">Audit Accuracy</div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">99.8%</div>
              <div className="text-[9px] text-indigo-400 font-semibold mt-0.5 flex items-center gap-1">
                <ShieldAlert className="w-2.5 h-2.5" /> Automated Sync
              </div>
            </div>
          </div>

          {/* Vehicle Inventory Table */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-950/70 overflow-hidden shadow-inner">
            <table className="w-full text-left text-slate-300">
              <thead className="bg-slate-900/90 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Vehicle</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">VIN</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-[11px]">
                {filteredVehicles.map((item, idx) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedRow(selectedRow === idx ? null : idx)}
                    className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      selectedRow === idx ? 'bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-white">
                        {item.year} {item.make} {item.model}
                      </div>
                      <div className="text-[10px] text-slate-400">{item.mileage}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400 hidden sm:table-cell">
                      {item.id}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${item.statusColor}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.tagColor}`} />
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-white">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mini Analytics Footer */}
          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Live API Sync Active</span>
            </div>
            <span className="font-mono text-slate-500">Latency: 14ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LockIcon(props) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
