import { Video, Map, LayoutDashboard } from "lucide-react";

export default function SecurityMonitoring() {
  return (
    <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-sky-500 text-white">
          <Video className="h-4 w-4" />
        </div>
        <h2 className="text-[15px] font-semibold text-slate-700">Security Monitoring</h2>
      </div>

      <ul className="space-y-3">
        <li>
          <a href="#" className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600">
            <Video className="h-4 w-4 text-blue-500" />
            Video Security
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600">
            <Map className="h-4 w-4 text-blue-500" />
            E-Map
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-blue-600">
            <LayoutDashboard className="h-4 w-4 text-blue-500" />
            Real-Time Dashboard
          </a>
        </li>
      </ul>
    </div>
  );
}