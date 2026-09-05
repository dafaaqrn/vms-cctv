"use client";

import { useEffect, useState } from "react";
import DepartmentForm from "@/app/components/configuration/DepartmentForm";
import {
  type Department,
  type DepartmentInput,
  listDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/lib/department";

type ViewMode = { mode: "list" } | { mode: "create" } | { mode: "edit"; department: Department };

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [view, setView] = useState<ViewMode>({ mode: "list" });

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await listDepartments();
      setDepartments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data departemen");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function parentName(parentId: number | null) {
    if (parentId === null) return "-";
    return departments.find((d) => d.id === parentId)?.name ?? `#${parentId}`;
  }

  async function handleSubmit(values: DepartmentInput) {
    setSubmitting(true);
    setError(null);
    try {
      if (view.mode === "edit") {
        await updateDepartment(view.department.id, values);
      } else {
        await createDepartment(values);
      }
      await refresh();
      setView({ mode: "list" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan departemen");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(dept: Department) {
    if (!confirm(`Hapus departemen "${dept.name}"?`)) return;
    setError(null);
    try {
      await deleteDepartment(dept.id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus departemen");
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Manajemen Departemen</h2>
        {view.mode === "list" && (
          <button
            onClick={() => setView({ mode: "create" })}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Tambah Departemen
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {view.mode === "list" ? (
        <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
          {loading ? (
            <p className="p-6 text-sm text-slate-500">Memuat data...</p>
          ) : departments.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">Belum ada departemen.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-2 font-medium">Nama</th>
                  <th className="px-4 py-2 font-medium">Deskripsi</th>
                  <th className="px-4 py-2 font-medium">Parent</th>
                  <th className="px-4 py-2 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id} className="border-t border-slate-100">
                    <td className="px-4 py-2 text-slate-800">{dept.name}</td>
                    <td className="px-4 py-2 text-slate-600">{dept.description || "-"}</td>
                    <td className="px-4 py-2 text-slate-600">{parentName(dept.parentId)}</td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setView({ mode: "edit", department: dept })}
                          className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(dept)}
                          className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div className="max-w-xl rounded-md border border-slate-200 bg-white p-6">
          <DepartmentForm
            parentOptions={departments}
            initialValues={view.mode === "edit" ? view.department : undefined}
            onSubmit={handleSubmit}
            onCancel={() => setView({ mode: "list" })}
            submitting={submitting}
          />
        </div>
      )}
    </div>
  );
}
