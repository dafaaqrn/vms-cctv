"use client";

import { useState } from "react";
import {
  Building2,
  Tag,
  Star,
  Compass,
  ChevronDown,
  ChevronRight,
  Search,
  RefreshCw,
  X,
  Camera,
  PlayCircle,
  MapPin,
  MoreHorizontal,
  Layers,
  Route,
  ShieldCheck,
  Maximize,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";



/* ------------------------- Data Tree Kamera ------------------------- */

interface TreeGroup {
  id: string;
  label: string;
  count: string;
  children?: TreeGroup[];
}

const treeData: TreeGroup[] = [
  {
    id: "kota-balikpapan",
    label: "Kota Balikpapan",
    count: "275/301",
    children: [
      {
        id: "dishub",
        label: "Dishub Balikpapan",
        count: "275/301",
      },
    ],
  },
];

function GroupRow({ group, depth = 0 }: { group: TreeGroup; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = !!group.children?.length;

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen((prev) => !prev)}
        className="flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100"
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {hasChildren ? (
          open ? (
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          )
        ) : (
          <span className="w-3.5" />
        )}
        <Building2 className="h-3.5 w-3.5 text-slate-400" />
        <span className="truncate">{group.label}</span>
        <span className="ml-auto text-xs text-slate-400">({group.count})</span>
      </button>

      {open && group.children && (
        <div>
          {group.children.map((child) => (
            <GroupRow key={child.id} group={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------- Sidebar Kiri ---------------------------- */

function DirectorySidebar() {
  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-sm font-semibold text-slate-800">Device Organization Directory</h2>
        <button className="rounded p-1 text-slate-400 hover:bg-slate-100" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-2 px-4 pt-3">
        <select className="w-1/2 rounded-md border border-slate-200 px-2 py-1.5 text-sm text-slate-600">
          <option>Kota Balikpapan</option>
        </select>
        <select className="w-1/2 rounded-md border border-slate-200 px-2 py-1.5 text-sm text-slate-600">
          <option>Camera</option>
        </select>
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-center rounded-md border border-slate-200 px-2 py-1.5">
          <input
            placeholder="Search Resource"
            className="w-full text-sm text-slate-600 outline-none placeholder:text-slate-400"
          />
          <Search className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="flex items-start justify-between gap-2 px-4 pt-3">
        <label className="flex items-start gap-2 text-xs text-slate-600">
          <input type="checkbox" className="mt-0.5 rounded border-slate-300" />
          Show Resource Without Latitude and Longitude Only
        </label>
        <button className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100" aria-label="Refresh">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex-1 overflow-y-auto px-2 pb-4">
        {treeData.map((group) => (
          <GroupRow key={group.id} group={group} />
        ))}
      </div>
    </aside>
  );
}

/* ------------------------------ Toolbar ------------------------------ */

function TopToolbar({ onlyDisplay, setOnlyDisplay }: { onlyDisplay: boolean; setOnlyDisplay: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
          <Building2 className="h-4 w-4 text-slate-400" />
          Organization
        </button>
        <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
          <Tag className="h-4 w-4 text-slate-400" />
          Tag
        </button>
        <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
          <Star className="h-4 w-4 text-slate-400" />
          Favorite
        </button>
        <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
          <Compass className="h-4 w-4 text-slate-400" />
          Spatial
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        <button className="ml-2 flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600">
          Global
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center rounded-md border border-slate-200 px-2 py-1.5">
          <input
            placeholder="Search Camera"
            className="w-48 text-sm text-slate-600 outline-none placeholder:text-slate-400"
          />
        </div>
        <button className="rounded-md bg-blue-600 p-1.5 text-white hover:bg-blue-700" aria-label="Search">
          <Search className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white">All</button>
        <label className="flex items-center gap-1.5 text-sm text-slate-600">
          Only Display:
          <input
            type="checkbox"
            checked={onlyDisplay}
            onChange={(e) => setOnlyDisplay(e.target.checked)}
            className="rounded border-slate-300"
          />
          Intelligent
        </label>
        <div className="ml-2 flex items-center gap-3 text-slate-400">
          <Layers className="h-4 w-4" />
          <Route className="h-4 w-4" />
          <ShieldCheck className="h-4 w-4" />
          <Maximize className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------- Data Marker ---------------------------- */

interface MapMarkerData {
  id: string;
  name: string;
  organization: string;
  laneQuantity: string;
  checkpointType: string;
  resourceId: string;
  markLocation: string;
  top: string;
  left: string;
  count?: number;
}

const markers: MapMarkerData[] = [
  { id: "m1", name: "Simpang M.T Haryono", organization: "Kota Balikpapan/Dishub Balikpapan", laneQuantity: "2", checkpointType: "Intercity Checkpoint", resourceId: "3a1c...", markLocation: "116.842,-1.235", top: "16%", left: "42%" },
  { id: "m2", name: "Putaran masuk perum pemda", organization: "Kota Balikpapan/Dishub Balikpapan", laneQuantity: "2", checkpointType: "Intercity Checkpoint", resourceId: "48e9542a39ba4a45b2ec381dea339f1d", markLocation: "116.870806,-1.239389", top: "18%", left: "46%", count: 2 },
  { id: "m3", name: "Jalan Sungai Ampal", organization: "Kota Balikpapan/Dishub Balikpapan", laneQuantity: "1", checkpointType: "Intersection Checkpoint", resourceId: "7fa2...", markLocation: "116.821,-1.256", top: "58%", left: "44%" },
  { id: "m4", name: "Jalan Mayor Polisi Zainal Arifin", organization: "Kota Balikpapan/Dishub Balikpapan", laneQuantity: "1", checkpointType: "Intersection Checkpoint", resourceId: "9c31...", markLocation: "116.815,-1.290", top: "72%", left: "50%" },
  { id: "m5", name: "Jalan Ruhui Rahayu", organization: "Kota Balikpapan/Dishub Balikpapan", laneQuantity: "2", checkpointType: "Intercity Checkpoint", resourceId: "1d4e...", markLocation: "116.890,-1.245", top: "60%", left: "72%", count: 2 },
  { id: "m6", name: "Jalan De Tuiy", organization: "Kota Balikpapan/Dishub Balikpapan", laneQuantity: "1", checkpointType: "Highway Checkpoint", resourceId: "2b8f...", markLocation: "116.900,-1.180", top: "20%", left: "78%" },
];

/* ------------------------------ Peta ---------------------------------- */

function MapMarker({
  marker,
  active,
  onClick,
}: {
  marker: MapMarkerData;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ top: marker.top, left: marker.left }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white p-1.5 shadow-md transition ${
        active ? "bg-blue-700 ring-2 ring-blue-300" : "bg-blue-600 hover:bg-blue-700"
      }`}
      aria-label={marker.name}
    >
      <Camera className="h-3.5 w-3.5 text-white" />
      {marker.count && (
        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[9px] font-bold text-blue-700">
          {marker.count}
        </span>
      )}
    </button>
  );
}

function MarkerPopup({ marker, onClose }: { marker: MapMarkerData; onClose: () => void }) {
  const fields: { label: string; value: string }[] = [
    { label: "Organization", value: marker.organization },
    { label: "Lane Qua...", value: marker.laneQuantity },
    { label: "Checkpoin...", value: marker.checkpointType },
    { label: "Resource ...", value: marker.resourceId },
    { label: "Mark Loc...", value: marker.markLocation },
  ];

  return (
    <div
      style={{ top: marker.top, left: marker.left }}
      className="absolute z-10 w-72 -translate-y-[calc(100%+16px)] translate-x-4 rounded-lg border border-slate-200 bg-white shadow-xl"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
        <h3 className="truncate text-sm font-semibold text-slate-800">{marker.name}</h3>
        <button onClick={onClose} className="rounded p-0.5 text-slate-400 hover:bg-slate-100" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-1.5 px-4 py-3">
        {fields.map((f) => (
          <div key={f.label} className="flex gap-2 text-xs">
            <span className="w-20 shrink-0 text-slate-400">{f.label}</span>
            <span className="truncate text-slate-700">{f.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-slate-100 px-4 py-2.5">
        <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
          <PlayCircle className="h-3.5 w-3.5" />
          Live View
        </button>
        <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
          <RotateCcw className="h-3.5 w-3.5" />
          Playback
        </button>
        <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
          <MapPin className="h-3.5 w-3.5" />
          Latitude
        </button>
        <button className="ml-auto rounded p-1 text-slate-400 hover:bg-slate-100" aria-label="More">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function MapCanvas() {
  const [activeId, setActiveId] = useState<string | null>("m2");
  const activeMarker = markers.find((m) => m.id === activeId) ?? null;

  return (
    <div className="relative flex-1 overflow-hidden bg-[#e8e4d8]">
      {/* Mock peta — ganti dengan Leaflet/Google Maps di sini */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 70%, #dcd6c2 0%, transparent 40%), radial-gradient(circle at 75% 20%, #cfe3d8 0%, transparent 35%)",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <line x1="40%" y1="0%" x2="55%" y2="100%" stroke="#f5a623" strokeWidth="3" />
        <line x1="0%" y1="55%" x2="100%" y2="45%" stroke="#f5c542" strokeWidth="2" />
      </svg>

      {markers.map((m) => (
        <MapMarker key={m.id} marker={m} active={activeId === m.id} onClick={() => setActiveId(m.id === activeId ? null : m.id)} />
      ))}

      {activeMarker && <MarkerPopup marker={activeMarker} onClose={() => setActiveId(null)} />}

      {/* Kontrol kanan bawah */}
      <div className="absolute bottom-6 right-6 flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        <button className="p-2 text-slate-500 hover:bg-slate-50" aria-label="Zoom in">
          <Plus className="h-4 w-4" />
        </button>
        <button className="border-t border-slate-100 p-2 text-slate-500 hover:bg-slate-50" aria-label="Zoom out">
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* Skala kiri bawah */}
      <div className="absolute bottom-4 left-4 rounded bg-white/80 px-2 py-1 text-[10px] text-slate-500 shadow-sm">
        477.62 m
      </div>

      {/* Panel utilitas kanan atas */}
      <div className="absolute right-6 top-6 rounded-md bg-white p-2 shadow-sm">
        <MapPin className="h-5 w-5 text-amber-500" />
      </div>
    </div>
  );
}

/* -------------------------- Export Utama -------------------------- */

export default function EMap() {
  const [onlyDisplay, setOnlyDisplay] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <TopToolbar onlyDisplay={onlyDisplay} setOnlyDisplay={setOnlyDisplay} />
      <div className="flex min-h-0 flex-1">
        <DirectorySidebar />
        <MapCanvas />
      </div>
    </div>
  );
}