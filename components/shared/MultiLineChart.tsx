"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export interface LineSeriesConfig {
  dataKey: string;
  color: string;
  label?: string;
}

export interface MultiLineChartProps {
  data: Record<string, string | number>[];
  xKey: string;
  lines: LineSeriesConfig[];
  height?: number;
  yDomain?: [number, number];
  yTickFormatter?: (value: number | string) => string;
}

export function MultiLineChart({
  data,
  xKey,
  lines,
  height = 220,
  yDomain = [0, 1],
  yTickFormatter = (v) => `${v} %`,
}: MultiLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          domain={yDomain}
          tickFormatter={yTickFormatter}
        />
        <Tooltip />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}