"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Video,
  AlertTriangle,
  FileBarChart2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { DonutChart, ChartLegend } from "@/app/components/shared/DonutChart";
import { AreaTrendChart } from "@/app/components/shared/AreaTrendChart";
import { MultiLineChart } from "@/app/components/shared/MultiLineChart";

/* ------------------------------ Sidebar ------------------------------ */

type MenuKey = "overview" | "video-security" | "alarm-search" | "report-analysis";

const menuItems: { key: MenuKey; label: string; icon: typeof LayoutDashboard; expandable?: boolean }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "video-security", label: "Video Security", icon: Video, expandable: true },
  { key: "alarm-search", label: "Alarm Search", icon: AlertTriangle },
  { key: "report-analysis", label: "Report Analysis", icon: FileBarChart2, expandable: true },
];

function DeviceSidebar({ active, onSelect }: { active: MenuKey; onSelect: (key: MenuKey) => void }) {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <nav className="flex flex-col gap-1 p-2">
        {menuItems.map(({ key, label, icon: Icon, expandable }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition ${
              active === key ? "bg-blue-50 font-medium text-blue-600" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon className={`h-4 w-4 ${active === key ? "text-blue-600" : "text-slate-400"}`} />
            <span className="flex-1">{label}</span>
            {expandable && <ChevronRight className="h-3.5 w-3.5 text-slate-300" />}
          </button>
        ))}
      </nav>
    </aside>
  );
}

/* ------------------------------- Toolbar ------------------------------ */

function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">
          Kota Balikpapan
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button className="text-sm text-blue-600 hover:underline">Default Area Settings</button>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600">
          Video Overview
        </button>
        <button className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          Quick Maintain
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ Row 1 Card ------------------------------ */

function TopSummaryRow() {
  return (
    <div className="grid grid-cols-1 divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0">
      <div className="flex flex-col items-center justify-center gap-1 p-6">
        <p className="text-sm text-slate-500">Total Cameras</p>
        <p className="text-3xl font-semibold text-slate-800">301</p>
      </div>

      <div className="flex items-center justify-center gap-6 p-6">
        <DonutChart percentage={91.36} color="#22c55e" label="Camera Online Rate" />
        <ChartLegend
          items={[
            { label: "Online", value: 275, color: "#22c55e" },
            { label: "Offline", value: 26, color: "#ef4444" },
            { label: "Undetected", value: 0, color: "#94a3b8" },
          ]}
        />
      </div>

      <div className="flex items-center justify-center gap-6 p-6">
        <DonutChart percentage={0} color="#94a3b8" label="Image Normal Rate" />
        <ChartLegend
          items={[
            { label: "Normal Image", value: 0, color: "#22c55e" },
            { label: "Image Exception", value: 0, color: "#f59e0b" },
            { label: "Diagnosing Failed", value: 0, color: "#ef4444" },
            { label: "Undetected", value: 275, color: "#94a3b8" },
          ]}
        />
      </div>

      <div className="flex items-center justify-center gap-6 p-6">
        <DonutChart percentage={90.37} color="#22c55e" label="Video Integrity Rate" />
        <ChartLegend
          items={[
            { label: "Video Integrity", value: 272, color: "#22c55e" },
            { label: "Video Loss", value: 29, color: "#f59e0b" },
            { label: "Patrol Inspection Failed", value: 0, color: "#ef4444" },
            { label: "Undetected", value: 0, color: "#94a3b8" },
          ]}
        />
      </div>
    </div>
  );
}

/* --------------------------- Device Online Rate -------------------------- */

function DeviceOnlineRateCard() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-slate-700">Device Online Rate Statistics</h3>
      <div className="flex flex-wrap gap-10">
        <div className="flex items-center gap-6">
          <DonutChart percentage={95.58} color="#22c55e" label="Encoding Device" />
          <ChartLegend
            items={[
              { label: "Online", value: 173, color: "#22c55e" },
              { label: "Offline", value: 8, color: "#ef4444" },
              { label: "Undetected", value: 0, color: "#94a3b8" },
            ]}
          />
        </div>

        <div className="flex items-center gap-6">
          <DonutChart percentage={100} color="#22c55e" label="Storage Device" />
          <ChartLegend
            items={[
              { label: "Online", value: 2, color: "#22c55e" },
              { label: "Offline", value: 0, color: "#ef4444" },
              { label: "Undetected", value: 0, color: "#94a3b8" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Trend Chart ------------------------------ */

const trendData = [
  { date: "2026-07-20", cameraOnline: 85 },
  { date: "2026-07-21", cameraOnline: 88 },
  { date: "2026-07-22", cameraOnline: 91 },
  { date: "2026-07-23", cameraOnline: 87 },
  { date: "2026-07-24", cameraOnline: 84 },
  { date: "2026-07-25", cameraOnline: 89 },
  { date: "2026-07-26", cameraOnline: 91 },
];

function TrendChartCard() {
  const [range, setRange] = useState<"7d" | "1m">("7d");

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Camera Running Status Trend Chart</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full border border-blue-400" />
            Camera Online Rate
            <span className="ml-3 h-2 w-2 rounded-full bg-blue-500" />
            Image Normal Rate
          </div>
          <div className="flex overflow-hidden rounded-md border border-slate-200 text-xs">
            <button
              onClick={() => setRange("7d")}
              className={`px-2.5 py-1 ${range === "7d" ? "bg-blue-50 font-medium text-blue-600" : "text-slate-500"}`}
            >
              Recent 7 Days
            </button>
            <button
              onClick={() => setRange("1m")}
              className={`border-l border-slate-200 px-2.5 py-1 ${
                range === "1m" ? "bg-blue-50 font-medium text-blue-600" : "text-slate-500"
              }`}
            >
              Last 1 Month
            </button>
          </div>
        </div>
      </div>

      <AreaTrendChart data={trendData} xKey="date" dataKey="cameraOnline" color="#3b82f6" gradientId="fillCameraOnline" />
    </div>
  );
}

/* --------------------------- Area Resource Status ------------------------- */

const areaResourceData = [{ name: "unknown", cameraOnline: 0, imageNormal: 0, videoIntegrity: 0, encodingOnline: 0 }];

function AreaResourceStatusCard() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700">Area Resource Running Status</h3>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-violet-500" />
            Camera Online Rate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-fuchsia-500" />
            Image Normal Rate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-blue-500" />
            Video Integrity Rate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-cyan-400" />
            Encoding Device Online Rate
          </span>
        </div>
      </div>

      <MultiLineChart
        data={areaResourceData}
        xKey="name"
        lines={[
          { dataKey: "cameraOnline", color: "#8b5cf6" },
          { dataKey: "imageNormal", color: "#d946ef" },
          { dataKey: "videoIntegrity", color: "#3b82f6" },
          { dataKey: "encodingOnline", color: "#22d3ee" },
        ]}
      />
    </div>
  );
}

/* -------------------------- Export Utama -------------------------- */

export default function VideoDeviceOverviewPage() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("overview");

  return (
    <div className="flex h-full min-h-0">
      <DeviceSidebar active={activeMenu} onSelect={setActiveMenu} />

      <div className="flex min-h-0 flex-1 flex-col">
        <TopBar />

        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
          <TopSummaryRow />

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <DeviceOnlineRateCard />
            <TrendChartCard />
          </div>

          <AreaResourceStatusCard />
        </div>
      </div>
    </div>
  );
}