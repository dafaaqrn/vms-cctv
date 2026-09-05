export type Department = {
  id: number;
  name: string;
  description: string;
  parentId: number | null;
};

export type DepartmentInput = {
  name: string;
  description: string;
  parentId: number | null;
};

// Base URL of the Go backend. Set NEXT_PUBLIC_API_URL in .env.local if it
// runs somewhere other than localhost:8080.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request gagal (status ${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // response body wasn't JSON — keep the generic message
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function listDepartments(): Promise<Department[]> {
  const res = await fetch(`${API_URL}/api/departments`, { cache: "no-store" });
  return handleResponse<Department[]>(res);
}

export async function createDepartment(input: DepartmentInput): Promise<Department> {
  const res = await fetch(`${API_URL}/api/departments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Department>(res);
}

export async function updateDepartment(id: number, input: DepartmentInput): Promise<Department> {
  const res = await fetch(`${API_URL}/api/departments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Department>(res);
}

export async function deleteDepartment(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/departments/${id}`, { method: "DELETE" });
  return handleResponse<void>(res);
}
