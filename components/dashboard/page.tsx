"use client";

import {
  LayoutGrid,
  Download,
  Bell,
  Menu,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import SecurityMonitoring from "@/components/dashboard/security-monitoring/page";
import VcaSearch from "@/components/dashboard/vca-search/page";
import Arming from "@/components/dashboard/arming/page";
import Enforcement from "@/components/dashboard/enforcement/page";
import TrafficOrderManagement from "@/components/dashboard/traffic-order-management/page";
import DeviceMaintenance from "./device-maintenance/page";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-3 text-white shadow-sm">
        <div className="flex items-center gap-4">
          <button className="rounded p-1 hover:bg-white/10" aria-label="Menu grid">
            <LayoutGrid className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <span className="text-sm font-bold">C</span>
            </div>
            <span className="text-[15px] font-semibold tracking-wide">
              Dashboard Master Lite
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded p-1 hover:bg-white/10" aria-label="Download">
            <Download className="h-4 w-4" />
          </button>
          <button className="rounded p-1 hover:bg-white/10" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <button className="rounded p-1 hover:bg-white/10" aria-label="Menu">
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1 text-sm">
            <span>admin</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </div>
      </header>

      {/* Grid Content */}
      <main className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card yang sudah jadi komponen sendiri */}
        <SecurityMonitoring />
        <VcaSearch />
        <Arming />
        <Enforcement />
        <TrafficOrderManagement />
        <DeviceMaintenance />

      </main>
    </div>
  );
} 