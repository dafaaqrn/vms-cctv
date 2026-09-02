"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Pilih",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <span className={selectedLabel ? "text-slate-800" : "text-slate-400"}>
          {selectedLabel ?? placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border border-slate-200 bg-white text-sm shadow-lg">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left hover:bg-slate-50 ${
                  opt.value === value ? "bg-blue-50 font-medium text-blue-600" : "text-slate-700"
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}