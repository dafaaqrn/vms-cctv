"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, Download, Bell, Menu, ChevronDown, Settings, Info, HelpCircle } from "lucide-react";

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const menuItems = [
  { label: "System Configuration", icon: Settings, href: "/device-maintenance/system-configuration" },
  { label: "About", icon: Info, href: "/about" },
  { label: "Help Center", icon: HelpCircle, href: "/help-center" },
];

export default function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-[#B01F26] via-[#E6262E] to-[#FF5C5C] px-4 py-3 text-white shadow-md">
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

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded p-1 hover:bg-white/10"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-md border border-black/5 bg-white text-gray-700 shadow-lg">
              {menuItems.map(({ label, icon: Icon, href }) => (
                <button
                  key={label}
                  onClick={() => {
                    setMenuOpen(false);
                    router.push(href);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-gray-100"
                >
                  <Icon className="h-4 w-4 text-gray-500" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span>admin</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      </div>
    </header>
  );
}