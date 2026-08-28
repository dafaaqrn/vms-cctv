// components/shared/LeafletMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix ikon default Leaflet yang suka hilang di Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  popupContent?: React.ReactNode;
}

interface LeafletMapProps {
  points: MapPoint[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (point: MapPoint) => void;
  className?: string;
}

export default function LeafletMap({
  points,
  center = [-1.2379, 116.8529], // Balikpapan
  zoom = 13,
  onMarkerClick,
  className = "",
}: LeafletMapProps) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom className={`h-full w-full ${className}`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          eventHandlers={{ click: () => onMarkerClick?.(point) }}
        >
          {point.popupContent && <Popup>{point.popupContent}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
}