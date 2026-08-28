"use client";

import dynamic from "next/dynamic";
import type { MapPoint } from "./LeafletMap";
export type { MapPoint } from "./LeafletMap";

// dynamic import wajib: Leaflet gagal render kalau kena SSR
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-400">
      Memuat peta...
    </div>
  ),
});

interface MapWrapperProps {
  points: MapPoint[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (point: MapPoint) => void;
  className?: string;
}

export default function MapWrapper(props: MapWrapperProps) {
  return <LeafletMap {...props} />;
}