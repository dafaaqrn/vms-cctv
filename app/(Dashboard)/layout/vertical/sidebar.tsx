"use client";

import { Home, Globe, Star, Clock, type LucideIcon } from "lucide-react";

export type SidebarKey = "dashboard" | "network" | "favorite" | "history";

export interface SidebarItem<T extends string = string> {
  key: T;
  label: string;
  icon: LucideIcon;
}

export const mainNavItems: SidebarItem<SidebarKey>[] = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "network", label: "Network", icon: Globe },
  { key: "favorite", label: "Favorite", icon: Star },
  { key: "history", label: "History", icon: Clock },
];

interface SidebarProps<T extends string = string> {
  open: boolean;
  active: T;
  items: SidebarItem<T>[];
  onSelect: (key: T) => void;
}

export default function Sidebar<T extends string = string>({
  open,
  active,
  items,
  onSelect,
}: SidebarProps<T>) {
  return (
    <aside
      className={`flex flex-col items-center gap-2 overflow-hidden border-r border-slate-200 bg-white py-4 transition-all duration-200 ${
        open ? "w-14" : "w-0"
      }`}
      aria-hidden={!open}
    >
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            title={item.label}
            aria-current={isActive ? "page" : undefined}
            className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-blue-600" />
            )}
            <item.icon className="h-5 w-5" />
          </button>
        );
      })}
    </aside>
  );
}