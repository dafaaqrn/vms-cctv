"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

function formatLabel(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-4 py-2 text-sm text-slate-500"
    >
      <Link href="/dashboard" className="flex items-center gap-1 hover:text-blue-600">
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = formatLabel(segment);

        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            {isLast ? (
              <span className="font-medium text-slate-700">{label}</span>
            ) : (
              <Link href={href} className="hover:text-blue-600">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}