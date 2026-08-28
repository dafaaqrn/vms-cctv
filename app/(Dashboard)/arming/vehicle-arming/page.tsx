"use client";

import { useState } from "react";
import {
  FileDown,
  Filter,
  Grid2x2,
  List,
  Lock,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  ImageOff,
} from "lucide-react";

/* ------------------------------ Sidebar ------------------------------ */

type MenuKey = "alarm" | "management";

const menuItems: { key: MenuKey; label: string }[] = [
  { key: "alarm", label: "Vehicle Arming Alarm" },
  { key: "management", label: "Vehicle Arming Management" },
];

function ArmingSidebar({ active, onSelect }: { active: MenuKey; onSelect: (key: MenuKey) => void }) {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <nav className="flex flex-col gap-1 p-2">
        {menuItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition ${
              active === key ? "bg-blue-50 font-medium text-blue-600" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

/* ------------------------------- Toolbar ------------------------------ */

function Toolbar({ view, setView }: { view: "grid" | "list"; setView: (v: "grid" | "list") => void }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">
      <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600">
        <FileDown className="h-4 w-4" />
        Export Data
      </button>

      <div className="flex items-center gap-1">
        <button className="rounded p-1.5 text-slate-400 hover:bg-slate-100" aria-label="Filter">
          <Filter className="h-4 w-4" />
        </button>
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

/* -------------------------------- Kartu -------------------------------- */

interface VehicleAlarmItem {
  id: string;
  plateNo: string;
  owner: string;
  location: string;
  time: string;
  imageUrl?: string; // diisi dari API nanti
}

function AlarmCard({ item }: { item: VehicleAlarmItem }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      {/* Kotak placeholder foto — ganti bg dengan <img src={item.imageUrl} /> saat API sudah siap */}
      <div className="flex aspect-video w-full items-center justify-center bg-slate-100">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.plateNo} className="h-full w-full object-cover" />
        ) : (
          <ImageOff className="h-8 w-8 text-slate-300" strokeWidth={1.5} />
        )}
      </div>

      <div className="space-y-1 px-3 py-2.5">
        <p className="text-sm font-semibold text-slate-800">{item.plateNo}</p>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <Lock className="h-3 w-3" />
          {item.owner}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{item.location}</span>
        </p>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-3 w-3" />
          {item.time}
        </p>
      </div>
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

  const pageNumbers = () => {
    const pages: (number | "...")[] = [];
    const windowSize = 5;
    if (totalPages <= windowSize + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    }
    return pages;
  };

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

        {pageNumbers().map((p, idx) =>
          p === "..." ? (
            <span key={`dots-${idx}`} className="px-1 text-sm text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`h-7 w-7 rounded text-sm ${
                p === currentPage ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          )
        )}

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

const mockItems: VehicleAlarmItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i}`,
  plateNo: "KT5139YJ",
  owner: "pak franklin",
  location: "Simpang 4 kebun sayar ANPR 2",
  time: "2026/07/27 13:10:08",
}));

export default function VehicleArmingAlarm() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("alarm");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const total = 317;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex h-full min-h-0">
      <ArmingSidebar active={activeMenu} onSelect={setActiveMenu} />

      <div className="flex min-h-0 flex-1 flex-col">
        <Toolbar view={view} setView={setView} />

        <div className="flex-1 overflow-y-auto p-4">
          {view === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {mockItems.map((item) => (
                <AlarmCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
                    <th className="px-4 py-2 font-medium">Plate No.</th>
                    <th className="px-4 py-2 font-medium">Owner</th>
                    <th className="px-4 py-2 font-medium">Location</th>
                    <th className="px-4 py-2 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {mockItems.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 text-slate-700">
                      <td className="px-4 py-2">{item.plateNo}</td>
                      <td className="px-4 py-2">{item.owner}</td>
                      <td className="px-4 py-2">{item.location}</td>
                      <td className="px-4 py-2">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

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