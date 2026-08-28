"use client";

import { useState } from "react";
import {
  AlignJustify,
  CarFront,
  Footprints,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronsDown,
  Plus,
  Search,
} from "lucide-react";

/* ------------------------------ Sidebar ------------------------------ */

type MenuKey = "features" | "track" | "statistics";

const menuItems: { key: MenuKey; label: string; icon: typeof CarFront }[] = [
  { key: "features", label: "Search by Features", icon: CarFront },
  { key: "track", label: "Search by Track", icon: Footprints },
  { key: "statistics", label: "Passing Vehicle Statistics", icon: BarChart3 },
];

function SearchSidebar({ active, onSelect }: { active: MenuKey; onSelect: (key: MenuKey) => void }) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center px-4 py-3">
        <button className="rounded p-1 text-slate-400 hover:bg-slate-100" aria-label="Toggle sidebar">
          <AlignJustify className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-col px-2 pb-4">
        {menuItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition ${
              active === key ? "bg-blue-50 font-medium text-blue-600" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon className={`h-4 w-4 ${active === key ? "text-blue-600" : "text-slate-400"}`} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

/* ------------------------------ Filter Bar ---------------------------- */

interface Filters {
  searchType: string;
  plateNo: string;
  timeRange: string;
  checkpoint: string;
  vehicleType: string;
}

function FilterBar({ filters, setFilters, onSearch, onReset }: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  onSearch: () => void;
  onReset: () => void;
}) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">License Plate No.</label>
          <div className="flex">
            <select
              value={filters.searchType}
              onChange={(e) => setFilters({ ...filters, searchType: e.target.value })}
              className="rounded-l-md border border-r-0 border-slate-200 bg-slate-50 px-2 py-1.5 text-sm text-slate-600"
            >
              <option>Precise Search</option>
              <option>Fuzzy Search</option>
            </select>
            <input
              value={filters.plateNo}
              onChange={(e) => setFilters({ ...filters, plateNo: e.target.value })}
              placeholder=""
              className="w-40 rounded-r-md border border-slate-200 px-2 py-1.5 text-sm text-slate-600 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Select Time</label>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5">
            <span className="text-sm text-slate-600">{filters.timeRange}</span>
            <Calendar className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Checkpoint Range</label>
          <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-sm text-slate-500 hover:bg-slate-50">
            <Plus className="h-3.5 w-3.5" />
            Please click to select checkpoint.
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Passing Vehicle Type</label>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5">
            <select
              value={filters.vehicleType}
              onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })}
              className="w-40 text-sm text-slate-600 outline-none"
            >
              <option>Normal Passing Vehicle</option>
              <option>Suspicious Vehicle</option>
              <option>Blacklist Vehicle</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onSearch}
            className="rounded-md bg-blue-600 px-5 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Search
          </button>
          <button
            onClick={onReset}
            className="rounded-md border border-slate-200 px-5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Reset
          </button>
          <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Expand filters">
            <ChevronsDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Empty State --------------------------- */

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-slate-400">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <Search className="h-8 w-8 text-blue-300" strokeWidth={1.5} />
      </div>
      <p className="text-sm">Please enter conditions and click Search.</p>
    </div>
  );
}

/* ------------------------------ Result Table --------------------------- */

interface VehicleResult {
  id: string;
  plateNo: string;
  checkpoint: string;
  passTime: string;
  vehicleType: string;
}

function ResultTable({ results }: { results: VehicleResult[] }) {
  if (results.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
        No results found for the selected conditions.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
            <th className="py-2 pr-4 font-medium">License Plate No.</th>
            <th className="py-2 pr-4 font-medium">Checkpoint</th>
            <th className="py-2 pr-4 font-medium">Pass Time</th>
            <th className="py-2 pr-4 font-medium">Vehicle Type</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id} className="border-b border-slate-100 text-slate-700">
              <td className="py-2 pr-4">{r.plateNo}</td>
              <td className="py-2 pr-4">{r.checkpoint}</td>
              <td className="py-2 pr-4">{r.passTime}</td>
              <td className="py-2 pr-4">{r.vehicleType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------- Export Utama -------------------------- */

export default function PassingVehicleSearch() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("features");
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<VehicleResult[]>([]);

  const [filters, setFilters] = useState<Filters>({
    searchType: "Precise Search",
    plateNo: "",
    timeRange: "2026/07/21 00:00:00 - 2026/07/27 23:59:59",
    checkpoint: "",
    vehicleType: "Normal Passing Vehicle",
  });

  const handleSearch = () => {
    setHasSearched(true);
    // TODO: ganti dengan pemanggilan API sungguhan
    setResults([]);
  };

  const handleReset = () => {
    setFilters({
      searchType: "Precise Search",
      plateNo: "",
      timeRange: "2026/07/21 00:00:00 - 2026/07/27 23:59:59",
      checkpoint: "",
      vehicleType: "Normal Passing Vehicle",
    });
    setHasSearched(false);
    setResults([]);
  };

  return (
    <div className="flex h-full min-h-0">
      <SearchSidebar active={activeMenu} onSelect={setActiveMenu} />
      <div className="flex min-h-0 flex-1 flex-col">
        <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} onReset={handleReset} />
        {hasSearched ? <ResultTable results={results} /> : <EmptyState />}
      </div>
    </div>
  );
}