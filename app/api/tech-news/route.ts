export const revalidate = 300;

type HnItem = {
  id: number;
  title?: string;
  url?: string;
  score?: number;
  time?: number;
  by?: string;
};

export async function GET() {
  try {
    const idsRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
      next: { revalidate: 300 },
    });

    if (!idsRes.ok) {
      return Response.json({ stories: [], error: "Failed to fetch story list" }, { status: 502 });
    }

    const ids: number[] = await idsRes.json();
    const topIds = ids.slice(0, 15);

    const items = await Promise.all(
      topIds.map(async (id) => {
        const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
          next: { revalidate: 300 },
        });
        if (!itemRes.ok) return null;
        return itemRes.json() as Promise<HnItem | null>;
      }),
    );

    const stories = items
      .filter((item): item is HnItem => Boolean(item?.title && item?.url))
      .slice(0, 10)
      .map((item) => ({
        id: item.id,
        title: item.title as string,
        url: item.url as string,
        score: item.score ?? 0,
        author: item.by ?? "unknown",
        publishedAt: item.time ? new Date(item.time * 1000).toISOString() : null,
        source: "Hacker News",
      }));

    return Response.json({ stories, updatedAt: new Date().toISOString() });
  } catch {
    return Response.json({ stories: [], error: "Tech news unavailable" }, { status: 500 });
  }
}
