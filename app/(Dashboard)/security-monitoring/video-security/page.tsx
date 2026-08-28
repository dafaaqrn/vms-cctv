"use client";

import { useState } from "react";
import {
  RefreshCw,
  Search,
  Map as MapIcon,
  ChevronDown,
  ChevronRight,
  Building2,
  Video,
  Camera,
  LayoutGrid,
  Circle,
  Volume2,
  Star,
  Settings,
  Share2,
  Grid3x3,
  Maximize,
  PlayCircle,
} from "lucide-react";

/* ------------------------- Data Tree Kamera ------------------------- */

interface TreeCamera {
  id: string;
  label: string;
  online?: boolean;
}

interface TreeGroup {
  id: string;
  label: string;
  count?: string;
  cameras?: TreeCamera[];
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
        cameras: [
          { id: "cam-56", label: "IP Camera 56" },
          { id: "cam-90", label: "IP Camera 90 (Simpang Auri)" },
          { id: "cam-91", label: "IP Camera 91 (Stadion Batakan)" },
          { id: "cam-19", label: "IP Camera 19", online: false },
          { id: "cam-27", label: "IP Camera 27", online: false },
          { id: "cam-33", label: "IP Camera 33 (Ruas Rutan)" },
          { id: "cam-36", label: "IP Camera 36" },
        ],
      },
      {
        id: "balikpapan-barat",
        label: "Balikpapan Barat",
        count: "25/26",
      },
    ],
  },
];

/* ------------------------- Resource Sidebar ------------------------- */

function CameraRow({ camera }: { camera: TreeCamera }) {
  return (
    <button className="flex w-full items-center gap-2 rounded px-2 py-1.5 pl-10 text-left text-sm text-slate-600 hover:bg-slate-100">
      {camera.online === false ? (
        <Video className="h-3.5 w-3.5 text-rose-500" />
      ) : (
        <Camera className="h-3.5 w-3.5 text-slate-400" />
      )}
      <span className="truncate">{camera.label}</span>
    </button>
  );
}

function GroupRow({ group, depth = 0 }: { group: TreeGroup; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = !!(group.children?.length || group.cameras?.length);

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
        {group.count && (
          <span className="ml-auto text-xs text-slate-400">{group.count}</span>
        )}
      </button>

      {open && (
        <div>
          {group.children?.map((child) => (
            <GroupRow key={child.id} group={child} depth={depth + 1} />
          ))}
          {group.cameras?.map((camera) => (
            <CameraRow key={camera.id} camera={camera} />
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceSidebar() {
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center justify-between px-4 pt-4">
        <h2 className="text-base font-semibold text-slate-800">Resource Monitoring</h2>
        <button className="rounded p-1 text-slate-400 hover:bg-slate-100" aria-label="Refresh">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="px-4 pt-3">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" className="rounded border-slate-300" />
          Online Resource Only
        </label>
      </div>

      <div className="px-4 pt-3">
        <select className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600">
          <option>Kota Balikpapan</option>
        </select>
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-center rounded-md border border-slate-200 px-2 py-1.5">
          <input
            placeholder="Search"
            className="w-full text-sm text-slate-600 outline-none placeholder:text-slate-400"
          />
          <Search className="h-4 w-4 text-slate-400" />
        </div>
      </div>

      <div className="px-4 pt-3">
        <button className="flex w-full items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">
          <MapIcon className="h-4 w-4" />
          Map
        </button>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto px-2 pb-4">
        {treeData.map((group) => (
          <GroupRow key={group.id} group={group} />
        ))}
      </div>
    </aside>
  );
}

/* ------------------------------ Viewer ------------------------------ */

function Viewer() {
  const [mode, setMode] = useState<"live" | "playback">("live");

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600">
            Public Plan Group
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-md border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-slate-200 p-0.5">
          <button
            onClick={() => setMode("live")}
            className={`rounded px-3 py-1 text-sm ${
              mode === "live" ? "bg-blue-600 text-white" : "text-slate-600"
            }`}
          >
            Live View
          </button>
          <button
            onClick={() => setMode("playback")}
            className={`rounded px-3 py-1 text-sm ${
              mode === "playback" ? "bg-blue-600 text-white" : "text-slate-600"
            }`}
          >
            Playback
          </button>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <Camera className="h-4 w-4" />
          <Circle className="h-4 w-4" />
          <Volume2 className="h-4 w-4" />
          <Star className="h-4 w-4" />
          <Settings className="h-4 w-4" />
          <Share2 className="h-4 w-4" />
          <Grid3x3 className="h-4 w-4" />
          <Maximize className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-slate-900">
        <PlayCircle className="h-24 w-24 text-slate-700" strokeWidth={1} />
      </div>
    </div>
  );
}

/* -------------------------- Export Utama -------------------------- */

export default function VideoSecurity() {
  return (
    <div className="flex h-full min-h-0">
      <ResourceSidebar />
      <Viewer />
    </div>
  );
}