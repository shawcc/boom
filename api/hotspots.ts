const TOPICS = [
  {
    id: "ai-compute-order",
    query: "AI算力 股票 服务器 光模块 液冷",
    category: "AI 算力",
  },
  {
    id: "humanoid-robot-policy",
    query: "人形机器人 股票 减速器 丝杠 具身智能",
    category: "机器人",
  },
  {
    id: "advanced-packaging",
    query: "先进封装 股票 Chiplet HBM 封测",
    category: "半导体",
  },
];

function decodeHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function pickTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return decodeHtml(match?.[1] ?? "");
}

function parseRss(xml: string) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  return items.slice(0, 6).map((item, index) => ({
    id: `live-${Date.now()}-${index}`,
    title: pickTag(item, "title"),
    source: "Google News RSS",
    sourceType: "news",
    publishedAt: pickTag(item, "pubDate"),
    credibilityScore: 68,
    excerpt: pickTag(item, "description").slice(0, 180),
    url: pickTag(item, "link"),
  }));
}

async function fetchTopic(topic: (typeof TOPICS)[number]) {
  const url = new URL("https://news.google.com/rss/search");
  url.searchParams.set("q", topic.query);
  url.searchParams.set("hl", "zh-CN");
  url.searchParams.set("gl", "CN");
  url.searchParams.set("ceid", "CN:zh-Hans");

  const response = await fetch(url, {
    headers: {
      "user-agent": "tech-alpha-radar/0.1",
      accept: "application/rss+xml,text/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`${topic.id} news source failed: ${response.status}`);
  }

  const xml = await response.text();
  const evidence = parseRss(xml);
  return {
    id: topic.id,
    category: topic.category,
    liveSourceCount: evidence.length,
    updatedAt: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    evidence,
  };
}

export default async function handler(_request: any, response: any) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

  try {
    const settled = await Promise.allSettled(TOPICS.map(fetchTopic));
    const hotspots = settled
      .filter((item): item is PromiseFulfilledResult<Awaited<ReturnType<typeof fetchTopic>>> => item.status === "fulfilled")
      .map((item) => item.value);

    response.status(200).json({
      generatedAt: new Date().toISOString(),
      source: {
        name: "Google News RSS",
        status: hotspots.length > 0 ? "ok" : "empty",
      },
      hotspots,
      errors: settled
        .filter((item): item is PromiseRejectedResult => item.status === "rejected")
        .map((item) => item.reason?.message ?? "unknown error"),
    });
  } catch (error: any) {
    response.status(500).json({
      generatedAt: new Date().toISOString(),
      source: {
        name: "Google News RSS",
        status: "error",
      },
      hotspots: [],
      errors: [error?.message ?? "unknown error"],
    });
  }
}
