"use client";

import Dropdown from "@/components/shared/Dropdown";
import { useState } from "react";

export interface CameraFormValues {
  name: string;
  ipAddress: string;
  cameraType: string;
  channelCount: number;
  username: string;
  password: string;
}

interface CameraFormProps {
  ipOptions: string[];
  initialValues?: CameraFormValues;
  onSubmit: (values: CameraFormValues) => void;
  onCancel?: () => void;
}

const cameraTypes = ["HIK Vision", "Dahua"];

const emptyValues: CameraFormValues = {
  name: "",
  ipAddress: "",
  cameraType: cameraTypes[0],
  channelCount: 1,
  username: "",
  password: "",
};

export default function CameraForm({
  ipOptions,
  initialValues,
  onSubmit,
  onCancel,
}: CameraFormProps) {
  const [values, setValues] = useState<CameraFormValues>(initialValues ?? emptyValues);

  function handleChange<K extends keyof CameraFormValues>(key: K, value: CameraFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Nama Kamera</label>
        <input
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Contoh: CCTV Simpang Sudirman"
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Alamat IP</label>
        <Dropdown
  options={ipOptions.map((ip) => ({ value: ip, label: ip }))}
  value={values.ipAddress}
  onChange={(val) => handleChange("ipAddress", val)}
  placeholder="Pilih alamat IP"
/>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Jenis CCTV</label>
          <Dropdown
            options={cameraTypes.map((type) => ({ value: type, label: type }))}
            value={values.cameraType}
            onChange={(val) => handleChange("cameraType", val)}
            placeholder="Pilih jenis CCTV"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Jumlah Channel</label>
          <input
            type="number"
            min={1}
            value={values.channelCount}
            onChange={(e) => handleChange("channelCount", Number(e.target.value))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Username</label>
          <input
            type="text"
            value={values.username}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
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