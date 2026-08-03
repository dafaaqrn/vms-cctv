import { Signpost, LayoutDashboard } from "lucide-react";

export default function TrafficOrderManagement() {
    return (
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition hover:shadow-md">
            <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-green-500 text-white">
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
    );
}