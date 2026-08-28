"use client";

import { useState } from "react";
import {
  FileDown,
  Grid2x2,
  List,
  Calendar,
  Plus,
  ChevronDown,
  ChevronsDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  SearchX,
} from "lucide-react";

/* ------------------------------ Sidebar ------------------------------ */

function ViolationSidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <nav className="flex flex-col gap-1 p-2">
        <button className="flex items-center gap-2.5 rounded-md bg-blue-50 px-3 py-2 text-left text-sm font-medium text-blue-600">
          Violation Search
        </button>
      </nav>
    </aside>
  );
}

/* ------------------------------ Filter Bar ---------------------------- */

interface Filters {
  plateNo: string;
  violationType: string;
  location: string;
  timeRange: string;
  verificationStatus: string;
}

function FilterBar({
  filters,
  setFilters,
  onSearch,
  onReset,
}: {
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
          <input
            value={filters.plateNo}
            onChange={(e) => setFilters({ ...filters, plateNo: e.target.value })}
            className="w-40 rounded-md border border-slate-200 px-2 py-1.5 text-sm text-slate-600 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Violation Type</label>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5">
            <select
              value={filters.violationType}
              onChange={(e) => setFilters({ ...filters, violationType: e.target.value })}
              className="w-36 text-sm text-slate-600 outline-none"
            >
              <option value="">Please select</option>
              <option>Illegal Parking</option>
              <option>Speeding</option>
              <option>Wrong Way</option>
              <option>Red Light Violation</option>
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Location</label>
          <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-sm text-slate-500 hover:bg-slate-50">
            <Plus className="h-3.5 w-3.5" />
            Click to select.
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Violation Time Period</label>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5">
            <span className="text-sm text-slate-600">{filters.timeRange}</span>
            <Calendar className="h-4 w-4 text-slate-400" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Verification Status</label>
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5">
            <select
              value={filters.verificationStatus}
              onChange={(e) => setFilters({ ...filters, verificationStatus: e.target.value })}
              className="w-28 text-sm text-slate-600 outline-none"
            >
              <option>All</option>
              <option>Verified</option>
              <option>Unverified</option>
              <option>Rejected</option>
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

/* ------------------------------- Toolbar ------------------------------ */

function Toolbar({ view, setView }: { view: "grid" | "list"; setView: (v: "grid" | "list") => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600">
        <FileDown className="h-4 w-4" />
        Export Data
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setView("grid")}
          className={`rounded p-1.5 ${view === "grid" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:bg-slate-100"}`}
          aria-label="Grid view"
        >
          <Grid2x2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => setView("list")}
          className={`rounded p-1.5 ${view === "list" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:bg-slate-100"}`}
          aria-label="List view"
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- Tabel -------------------------------- */

interface ViolationRow {
  id: string;
  capturedPicture?: string; // diisi dari API nanti
  plateNo: string;
  violationType: string;
  location: string;
  violationTime: string;
  verificationStatus: string;
  verificationResult: string;
  verifier: string;
}

const columns = [
  { key: "capturedPicture", label: "Captured Picture" },
  { key: "plateNo", label: "License Plate No." },
  { key: "violationType", label: "Violation Type" },
  { key: "location", label: "Location" },
  { key: "violationTime", label: "Violation Time", sortable: true },
  { key: "verificationStatus", label: "Verification Status" },
  { key: "verificationResult", label: "Verification Result" },
  { key: "verifier", label: "Verifier" },
  { key: "operation", label: "Operation" },
];

function ResultTable({ rows }: { rows: ViolationRow[] }) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full min-w-[1100px] border-collapse text-sm">
        <thead>
          <tr className="border-y border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
            {columns.map((col) => (
              <th key={col.key} className="whitespace-nowrap border-r border-slate-200 px-4 py-2.5 font-medium last:border-r-0">
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && <ArrowUpDown className="h-3 w-3 text-slate-400" />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-24 text-center text-sm text-slate-400">
                <div className="flex flex-col items-center gap-3">
                  <SearchX className="h-8 w-8 text-slate-300" strokeWidth={1.5} />
                  No data.
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 text-slate-700">
                <td className="border-r border-slate-100 px-4 py-2">
                  {/* Kotak placeholder — ganti dengan <img src={row.capturedPicture} /> saat API sudah siap */}
                  <div className="flex h-12 w-16 items-center justify-center rounded bg-slate-100 text-[10px] text-slate-300">
                    No Image
                  </div>
                </td>
                <td className="border-r border-slate-100 px-4 py-2">{row.plateNo}</td>
                <td className="border-r border-slate-100 px-4 py-2">{row.violationType}</td>
                <td className="border-r border-slate-100 px-4 py-2">{row.location}</td>
                <td className="border-r border-slate-100 px-4 py-2">{row.violationTime}</td>
                <td className="border-r border-slate-100 px-4 py-2">{row.verificationStatus}</td>
                <td className="border-r border-slate-100 px-4 py-2">{row.verificationResult}</td>
                <td className="border-r border-slate-100 px-4 py-2">{row.verifier}</td>
                <td className="px-4 py-2">
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-700">View</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------ Pagination ----------------------------- */

function Pagination({
  total,
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: {
  total: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) {
  const [goTo, setGoTo] = useState("");

  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2.5">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span>Total: {total}</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border border-slate-200 px-2 py-1 text-sm text-slate-600"
        >
          <option value={20}>20 /Page</option>
          <option value={50}>50 /Page</option>
          <option value={100}>100 /Page</option>
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-40"
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button className="h-7 w-7 rounded bg-blue-600 text-sm text-white">{currentPage}</button>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-40"
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="ml-2 flex items-center gap-1.5">
          <input
            value={goTo}
            onChange={(e) => setGoTo(e.target.value)}
            className="w-12 rounded-md border border-slate-200 px-2 py-1 text-sm text-slate-600 outline-none"
          />
          <span className="text-sm text-slate-500">/ {totalPages}</span>
          <button
            onClick={() => {
              const page = Number(goTo);
              if (page >= 1 && page <= totalPages) onPageChange(page);
              setGoTo("");
            }}
            className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Export Utama -------------------------- */

export default function VehicleViolationSearch() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [rows, setRows] = useState<ViolationRow[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<Filters>({
    plateNo: "",
    violationType: "",
    location: "",
    timeRange: "2026/07/27 00:00 - 2026/07/27 23:59",
    verificationStatus: "All",
  });

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handleSearch = () => {
    // TODO: ganti dengan pemanggilan API sungguhan
    setRows([]);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      plateNo: "",
      violationType: "",
      location: "",
      timeRange: "2026/07/27 00:00 - 2026/07/27 23:59",
      verificationStatus: "All",
    });
    setRows([]);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full min-h-0">
      <ViolationSidebar />

      <div className="flex min-h-0 flex-1 flex-col">
        <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} onReset={handleReset} />
        <Toolbar view={view} setView={setView} />
        <ResultTable rows={rows} />
        <Pagination
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}