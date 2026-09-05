"use client";

import { useEffect, useState } from "react";
import type { Department, DepartmentInput } from "@/lib/department";

interface DepartmentFormProps {
  parentOptions: Department[];
  initialValues?: Department;
  onSubmit: (values: DepartmentInput) => void;
  onCancel?: () => void;
  submitting?: boolean;
}

const emptyValues: DepartmentInput = {
  name: "",
  description: "",
  parentId: null,
};

export default function DepartmentForm({
  parentOptions,
  initialValues,
  onSubmit,
  onCancel,
  submitting,
}: DepartmentFormProps) {
  const [values, setValues] = useState<DepartmentInput>(toInput(initialValues));

  // keep the form in sync if the parent switches which department we're editing
  useEffect(() => {
    setValues(toInput(initialValues));
  }, [initialValues]);

  function toInput(dept?: Department): DepartmentInput {
    if (!dept) return emptyValues;
    return { name: dept.name, description: dept.description, parentId: dept.parentId };
  }

  function handleChange<K extends keyof DepartmentInput>(key: K, value: DepartmentInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  // a department can't be its own parent — filter itself out of the dropdown when editing
  const selectableParents = parentOptions.filter((d) => d.id !== initialValues?.id);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nama Departemen</label>
        <input
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Contoh: Dinas Perhubungan"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Deskripsi</label>
        <textarea
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          placeholder="Deskripsi singkat departemen"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Parent Departemen</label>
        <select
          value={values.parentId ?? ""}
          onChange={(e) =>
            handleChange("parentId", e.target.value === "" ? null : Number(e.target.value))
          }
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Tidak ada (Root)</option>
          {selectableParents.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
