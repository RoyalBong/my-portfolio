"use client";

import { useCallback, useEffect, useState } from "react";
import type { ThemeStyles } from "../theme-config";

type TechStory = {
  id: number;
  title: string;
  url: string;
  score: number;
  author: string;
  publishedAt: string | null;
  source: string;
};

export function TechNewsSection({ theme }: { theme: ThemeStyles }) {
  const [stories, setStories] = useState<TechStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tech-news");
      const data: { stories?: TechStory[]; updatedAt?: string } = await res.json();
      setStories(data.stories ?? []);
      setUpdatedAt(data.updatedAt ?? null);
    } catch {
      setStories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadNews]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <h3 className={`text-2xl md:text-3xl font-semibold ${theme.sectionTitle}`}>Tech News</h3>
          <p className={`mt-1 text-sm ${theme.sectionText}`}>
            Live updates from the global tech community (refreshes every 5 minutes)
          </p>
        </div>
        <button
          type="button"
          onClick={loadNews}
          disabled={loading}
          className={`text-sm font-medium rounded-full border px-4 py-1.5 transition-all duration-200 motion-safe:hover:scale-105 disabled:opacity-50 ${theme.githubLink}`}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      <div className={`rounded-2xl border overflow-hidden ${theme.panel}`}>
        {loading && stories.length === 0 ? (
          <p className={`px-6 py-8 text-center ${theme.panelText}`}>Loading tech headlines…</p>
        ) : stories.length === 0 ? (
          <p className={`px-6 py-8 text-center ${theme.panelText}`}>Could not load news right now. Try again shortly.</p>
        ) : (
          <ul className="divide-y divide-current/10 max-h-[420px] overflow-y-auto">
            {stories.map((story) => (
              <li key={story.id}>
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col gap-1 px-5 py-4 transition-all duration-200 motion-safe:hover:bg-white/10 ${theme.panelText}`}
                >
                  <span className={`font-medium leading-snug transition-colors ${theme.panelTitle} motion-safe:group-hover:underline`}>
                    {story.title}
                  </span>
                  <span className="text-xs opacity-75">
                    {story.source} · {story.score} points · by {story.author}
                    {story.publishedAt
                      ? ` · ${new Date(story.publishedAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}`
                      : ""}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {updatedAt ? (
          <p className={`px-5 py-2 text-xs border-t border-current/10 ${theme.panelText}`}>
            Last updated: {new Date(updatedAt).toLocaleString()}
          </p>
        ) : null}
      </div>
    </section>
  );
}
