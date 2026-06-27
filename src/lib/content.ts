import { useEffect, useState } from "react";

export type ContentKey = "achievements" | "certifications" | "experience" | "education";

const lsKey = (key: ContentKey) => `portfolio_content_${key}`;

export async function fetchContent<T>(key: ContentKey): Promise<T[]> {
  // localStorage override wins (admin edits)
  try {
    const raw = localStorage.getItem(lsKey(key));
    if (raw) return JSON.parse(raw) as T[];
  } catch {
    // ignore
  }
  // fallback to bundled JSON (use BASE_URL so GitHub Pages subpath works)
  const base = import.meta.env.BASE_URL || "/";
  const res = await fetch(`${base}content/${key}.json`);
  if (!res.ok) return [];
  return (await res.json()) as T[];
}

export function saveContent<T>(key: ContentKey, data: T[]) {
  localStorage.setItem(lsKey(key), JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("content-updated", { detail: key }));
}

export function clearContent(key: ContentKey) {
  localStorage.removeItem(lsKey(key));
  window.dispatchEvent(new CustomEvent("content-updated", { detail: key }));
}

export function useContent<T>(key: ContentKey): [T[], (data: T[]) => void, boolean] {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = () => {
      setLoading(true);
      fetchContent<T>(key).then((d) => {
        if (alive) {
          setData(d);
          setLoading(false);
        }
      });
    };
    load();
    const handler = (e: Event) => {
      const ce = e as CustomEvent;
      if (ce.detail === key) load();
    };
    window.addEventListener("content-updated", handler);
    return () => {
      alive = false;
      window.removeEventListener("content-updated", handler);
    };
  }, [key]);

  return [data, (d: T[]) => saveContent(key, d), loading];
}
