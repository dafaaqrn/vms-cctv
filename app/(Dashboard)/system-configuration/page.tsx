"use client";

import { useState } from "react";
import { Building2, Video } from "lucide-react";
import ListSidebar, { type ListSidebarItem } from "@/app/components/shared/ListSidebar";
import DepartmentManagement from "./DepartmentManagement";
import CameraManagement from "./CameraManagement";

type ConfigKey = "department" | "camera";

const configItems: ListSidebarItem<ConfigKey>[] = [
  { key: "department", label: "Department Management", icon: Building2 },
  { key: "camera", label: "Camera Management", icon: Video },
];

export default function SystemConfigurationPage() {
  const [active, setActive] = useState<ConfigKey>("department");

  return (
    <div className="flex h-full">
      <ListSidebar
        items={configItems}
        active={active}
        onSelect={setActive}
        title="System Configuration"
      />
      <div className="flex-1 overflow-auto bg-slate-50 p-6">
        {active === "department" ? <DepartmentManagement /> : <CameraManagement />}
      </div>
    </div>
  );
}