"use client";

import { useState } from "react";
import ListSidebar, { type ListSidebarItem } from "@/app/components/shared/ListSidebar";

type DepartmentKey =
  | "dishub"
  | "satpol-pp"
  | "polresta"
  | "bpbd"
  | "dinkes"
  | "dlhk"
  | "diskominfo";

const departments: ListSidebarItem<DepartmentKey>[] = [
  { key: "dishub", label: "Dinas Perhubungan" },
  { key: "satpol-pp", label: "Satpol PP" },
  { key: "polresta", label: "Polresta" },
  { key: "bpbd", label: "BPBD" },
  { key: "dinkes", label: "Dinas Kesehatan" },
  { key: "dlhk", label: "DLHK" },
  { key: "diskominfo", label: "Diskominfo" },
];

export default function CameraManagement() {
  const [activeDept, setActiveDept] = useState<DepartmentKey>("dishub");
  const activeLabel = departments.find((d) => d.key === activeDept)?.label;

  return (
    <div className="flex h-full gap-4">
      <ListSidebar
        items={departments}
        active={activeDept}
        onSelect={setActiveDept}
        title="Departemen"
        className="rounded-md border"
      />
      <div className="flex-1">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Kamera - {activeLabel}
        </h2>
        <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Belum ada data kamera untuk departemen ini.
        </div>
      </div>
    </div>
  );
}