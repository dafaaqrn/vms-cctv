"use client";

import DepartmentForm, { type DepartmentFormValues } from "@/app/components/configuration/DepartmentForm";

const existingDepartments = [
  { id: "dishub", name: "Dinas Perhubungan" },
  { id: "satpol-pp", name: "Satpol PP" },
  { id: "polresta", name: "Polresta" },
  { id: "bpbd", name: "BPBD" },
  { id: "dinkes", name: "Dinas Kesehatan" },
  { id: "dlhk", name: "DLHK" },
  { id: "diskominfo", name: "Diskominfo" },
];

export default function DepartmentManagement() {
  function handleSubmit(values: DepartmentFormValues) {
    console.log("Simpan departemen:", values);
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Manajemen Departemen</h2>
      <div className="max-w-xl rounded-md border border-slate-200 bg-white p-6">
        <DepartmentForm parentOptions={existingDepartments} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}