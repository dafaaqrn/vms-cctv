"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export interface AreaTrendChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  dataKey: string;
  color?: string;
  height?: number;
  valueSuffix?: string;
  yDomain?: [number, number];
  gradientId?: string;
}

export function AreaTrendChart({
  data,
  xKey,
  dataKey,
  color = "#3b82f6",
  height = 220,
  valueSuffix = "%",
  yDomain = [0, 100],
  gradientId = "areaTrendFill",
}: AreaTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.5} />
            <stop offset="95%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}${valueSuffix}`}
          domain={yDomain}
        />
        <Tooltip formatter={(v) => `${Number(v)}${valueSuffix}`} />
        <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#${gradientId})`} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}