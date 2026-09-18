"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Story = {
  id: number;
  title: string;
  url: string;
  score: number;
  author: string;
  publishedAt: string | null;
  source: string;
};

async function loadStories(): Promise<Story[]> {
  const res = await fetch("/api/tech-news");
  const data = await res.json();
  return data.stories ?? [];
}

function Skeleton() {
  return (
    <div className="space-y-3 p-5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="animate-pulse space-y-2">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/3 rounded opacity-70" />
        </div>
      ))}
    </div>
  );
}

export function TechNews() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setStories(await loadStories());
    } catch {
      setStories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        const next = await loadStories();
        if (alive) setStories(next);
      } catch {
        if (alive) setStories([]);
      } finally {
        if (alive) setLoading(false);
      }
    };
    void run();
    const timer = setInterval(() => void run(), 5 * 60 * 1000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      <Reveal>
        <div className="card overflow-hidden rounded-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3 p-6 pb-2">
            <div>
              <h2 className="text-xl font-bold">Tech pulse</h2>
              <p className="text-xs opacity-60">Live Hacker News headlines · refreshes every 5 min</p>
            </div>
            <button
              onClick={refresh}
              disabled={loading}
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold hover:scale-105 disabled:opacity-50"
            >
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Refreshing" : "Refresh"}
            </button>
          </div>
          {loading && stories.length === 0 ? (
            <Skeleton />
          ) : stories.length === 0 ? (
            <p className="p-6 text-sm opacity-60">Could not load news right now.</p>
          ) : (
            <ul className="max-h-[320px] divide-y divide-[var(--border-subtle)] overflow-y-auto">
              {stories.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="group flex flex-col gap-1 px-6 py-3.5 transition-colors hover:bg-[var(--surface)]">
                    <span className="text-sm font-medium leading-snug group-hover:underline">{s.title}</span>
                    <span className="text-[11px] opacity-60">{s.source} · {s.score} pts · by {s.author}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </section>
  );
}
