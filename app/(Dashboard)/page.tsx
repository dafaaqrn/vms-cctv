import Link from "next/link";
import {
  Video,
  Map,
  LayoutDashboard,
  ScanSearch,
  CarFront,
  ShieldAlert,
  Car,
  Gavel,
  CarTaxiFront,
  Signpost,
  Wrench,
  FaceAngryIcon,
  ScanFace,
  ScanFaceIcon,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Security Monitoring */}
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-sky-500 text-white">
              <Video className="h-4 w-4" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-700">Security Monitoring</h2>
          </div>

          <ul className="space-y-3">
            <li>
              <Link
                href="/security-monitoring/video-security"
                className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600"
              >
                <Video className="h-4 w-4 text-blue-500" />
                Video Security
              </Link>
            </li>
            <li>
              <Link
                href="/security-monitoring/e-map"
                className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600"
              >
                <Map className="h-4 w-4 text-blue-500" />
                E-Map
              </Link>
            </li>
            <li>
              <Link
                href="/security-monitoring/real-time-dashboard"
                className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600"
              >
                <LayoutDashboard className="h-4 w-4 text-blue-500" />
                Real-Time Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* VCA Search */}
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-500 text-white">
              <ScanSearch className="h-4 w-4" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-700">VCA Search</h2>
          </div>

          <ul className="space-y-3">
            <li>
              <Link
                href="/vca-search/passing-vehicle"
                className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600"
              >
                <CarFront className="h-4 w-4 text-blue-500" />
                Passing Vehicle Search
              </Link>
            </li>
          </ul>
        </div>

        {/* Arming */}
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 text-white">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-700">Arming</h2>
          </div>

          <ul className="space-y-3">
            <li>
              <Link
                href="/arming/vehicle-arming"
                className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600"
              >
                <Car className="h-4 w-4 text-blue-500" />
                Vehicle Arming
              </Link>
            </li>
          </ul>
        </div>

        {/* Enforcement */}
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-rose-500 text-white">
              <Gavel className="h-4 w-4" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-700">Enforcement</h2>
          </div>

          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600">
                <CarTaxiFront className="h-4 w-4 text-blue-500" />
                Vehicle Violation
              </a>
            </li>
          </ul>
        </div>

        {/* Traffic Order Management */}
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-purple-500 text-white">
              <Signpost className="h-4 w-4" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-700">Traffic Order Management</h2>
          </div>

          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600">
                <LayoutDashboard className="h-4 w-4 text-blue-500" />
                Traffic Order Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Device Maintenance */}
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-gray-500 text-white">
              <Wrench className="h-4 w-4" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-700">Device Maintenance</h2>
          </div>

          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600">
                <Video className="h-4 w-4 text-blue-500" />
                Video Device
              </a>
            </li>
          </ul>
        </div>

        {/* Fast Recognition */}
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-500 text-white">
              <ScanSearch className="h-4 w-4" />
            </div>
            <h2 className="text-[15px] font-semibold text-slate-700">Face Recognition</h2>
          </div>

          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600">
                <ScanFaceIcon className="h-4 w-4 text-blue-500" />
                Face Recognition
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}