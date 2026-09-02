"use client";

import { type LucideIcon } from "lucide-react";

export interface ListSidebarItem<T extends string = string> {
  key: T;
  label: string;
  icon?: LucideIcon;
}

interface ListSidebarProps<T extends string = string> {
  items: ListSidebarItem<T>[];
  active: T;
  onSelect: (key: T) => void;
  title?: string;
  className?: string;
}

export default function ListSidebar<T extends string = string>({
  items,
  active,
  onSelect,
  title,
  className = "",
}: ListSidebarProps<T>) {
  return (
    <aside
      className={`flex w-56 shrink-0 flex-col gap-1 border-r border-slate-200 bg-white py-4 ${className}`}
    >
      {title && (
        <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          {title}
        </p>
      )}
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${
              isActive
                ? "border-r-2 border-blue-600 bg-blue-50 font-medium text-blue-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}