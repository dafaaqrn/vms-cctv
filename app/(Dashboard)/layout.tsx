"use client";

import { useState, type ReactNode } from "react";
import Navbar from "./layout/horizontal/navbar";
import Sidebar, { mainNavItems, type SidebarKey } from "./layout/vertical/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState<SidebarKey>("dashboard");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <div className="flex flex-1">
        <Sidebar
          open={sidebarOpen}
          active={active}
          items={mainNavItems}
          onSelect={setActive}
        />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}