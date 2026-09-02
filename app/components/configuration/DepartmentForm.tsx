;"use client";

import { useState } from "react";

export interface DepartmentFormValues {
  id: string;
  name: string;
  description: string;
  parentId: string;
}

interface DepartmentOption {
  id: string;
  name: string;
}

interface DepartmentFormProps {
  parentOptions: DepartmentOption[];
  initialValues?: DepartmentFormValues;
  onSubmit: (values: DepartmentFormValues) => void;
  onCancel?: () => void;
}

const emptyValues: DepartmentFormValues = {
  id: "",
  name: "",
  description: "",
  parentId: "",
};

export default function DepartmentForm({
  parentOptions,
  initialValues,
  onSubmit,
  onCancel,
}: DepartmentFormProps) {
  const [values, setValues] = useState<DepartmentFormValues>(initialValues ?? emptyValues);

  function handleChange<K extends keyof DepartmentFormValues>(key: K, value: DepartmentFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">ID Departemen</label>
        <input
          type="text"
          value={values.id}
          onChange={(e) => handleChange("id", e.target.value)}
          placeholder="Contoh: DISHUB-001"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

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
          value={values.parentId}
          onChange={(e) => handleChange("parentId", e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Tidak ada (Root)</option>
          {parentOptions.map((opt) => (
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
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}