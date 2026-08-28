"use client";

import Header from "./header";
//import Breadcrumb from "./breadcrumb";

interface NavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function Navbar({ sidebarOpen, onToggleSidebar }: NavbarProps) {
  return (
    <div className="sticky top-0 z-20">
      <Header sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar} />
      {/* <Breadcrumb /> */}
    </div>
  );
}