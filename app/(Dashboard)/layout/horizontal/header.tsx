"use client";

import { LayoutGrid, Download, Bell, Menu, ChevronDown } from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-3 text-white shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded p-1 hover:bg-white/10"
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
        >
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
  );
}