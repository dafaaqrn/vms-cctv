"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface DonutChartProps {
  percentage: number;
  color: string;
  label: string;
  size?: number;
}

export function DonutChart({ percentage, color, label, size = 128 }: DonutChartProps) {
  const data = [{ value: percentage }, { value: Math.max(0, 100 - percentage) }];

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius={size * 0.36}
            outerRadius={size * 0.46}
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-semibold text-slate-800">{percentage.toFixed(2)}%</span>
        <span className="mt-0.5 text-center text-[11px] leading-tight text-slate-500">{label}</span>
      </div>
    </div>
  );
}

export interface LegendItem {
  label: string;
  value: number;
  color: string;
}

export function ChartLegend({ items }: { items: LegendItem[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-sm text-slate-600">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span>{item.label}</span>
          <span className="font-medium text-slate-800">{item.value}</span>
        </div>
      ))}
    </div>
  );
}