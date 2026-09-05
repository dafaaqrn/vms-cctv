import { PageContent } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function getPageContent(): Promise<PageContent> {
  const res = await fetch(`${API_URL}/api/content`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load content: ${res.status}`);
  }

  return res.json();
}