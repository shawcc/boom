import { useMemo, useState } from "react";
import { BrainCircuit, DatabaseZap, Flame, Search, ShieldCheck, TrendingUp } from "lucide-react";
import { HotspotCard } from "@/components/HotspotCard";
import { MetricCard } from "@/components/MetricCard";
import { learningCards } from "@/data/mockData";
import { useLiveHotspots } from "@/hooks/useLiveHotspots";
import { cn } from "@/lib/utils";

type SortKey = "heat" | "change" | "credibility";

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("heat");
  const { hotspots, status, sourceName, generatedAt } = useLiveHotspots();

  const filteredHotspots = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const filtered = hotspots.filter((hotspot) => {
      const haystack = [hotspot.title, hotspot.category, hotspot.summary, ...hotspot.tags, ...hotspot.companies.map((item) => item.name)]
        .join(" ")
        .toLowerCase();
      return !keyword || haystack.includes(keyword);
    });

    return [...filtered].sort((a, b) => {
      if (sortKey === "change") return b.heatChange - a.heatChange;
      if (sortKey === "credibility") return b.credibilityScore - a.credibilityScore;
      return b.heatScore - a.heatScore;
    });
  }, [query, sortKey]);

  const avgCredibility = Math.round(hotspots.reduce((sum, item) => sum + item.credibilityScore, 0) / hotspots.length);
  const evidenceCount = hotspots.reduce((sum, item) => sum + item.sourceCount, 0);
  const companyCount = hotspots.reduce((sum, item) => sum + item.companyCount, 0);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-stretch">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <div className="absolute right-8 top-8 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            {status === "live" ? "实时数据源已连接" : status === "loading" ? "正在连接实时源" : "Mock 降级模式"}
          </div>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.28em] text-amber-100">FROM HOT TOPIC TO EVIDENCE</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
              把科技热点拆成
              <span className="text-cyan-200">可验证</span>
              的投资情报链
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
              面向炒股新人，不直接荐股，而是把新闻、公告、产业链、相关公司和风险信号整理成一套可以复盘的判断框架。
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
              <Search className="h-5 w-5 text-cyan-200" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索 AI、机器人、封装、公司名或股票代码"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <div className="flex rounded-2xl border border-white/10 bg-slate-950/40 p-1">
              {[
                ["heat", "热度"],
                ["change", "增速"],
                ["credibility", "可信"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortKey(key as SortKey)}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-semibold text-slate-400 transition",
                    sortKey === key && "bg-cyan-200 text-slate-950",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-white/[0.06] px-3 py-1">数据源：{sourceName}</span>
            <span className="rounded-full bg-white/[0.06] px-3 py-1">
              更新时间：{generatedAt ? new Date(generatedAt).toLocaleString("zh-CN") : "本地样例"}
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <MetricCard icon={Flame} label="今日热点" value={`${hotspots.length}`} caption="科技主线已聚类" />
          <MetricCard icon={ShieldCheck} label="平均可信度" value={`${avgCredibility}`} caption="公告与政策权重更高" />
          <MetricCard icon={DatabaseZap} label="证据来源" value={`${evidenceCount}`} caption={`${companyCount} 家相关公司`} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-cyan-200">今日热点榜</p>
              <h2 className="mt-1 text-2xl font-black text-white">先看热度，再看证据</h2>
            </div>
            <div className="text-sm text-slate-400">找到 {filteredHotspots.length} 条情报</div>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            {filteredHotspots.map((hotspot, index) => (
              <HotspotCard key={hotspot.id} hotspot={hotspot} rank={index + 1} />
            ))}
          </div>
        </div>

        <aside id="learn" className="space-y-5">
          <div className="rounded-[2rem] border border-amber-200/20 bg-amber-200/10 p-5">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-6 w-6 text-amber-100" />
              <div>
                <p className="text-xs font-semibold text-amber-100">新手解释模式</p>
                <h3 className="font-black text-white">看懂术语，不追概念</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-amber-50/80">
              每个热点都会回答四个问题：这是什么、为什么重要、怎么验证、最容易踩的坑是什么。
            </p>
          </div>

          {learningCards.map((card) => (
            <article key={card.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5">
              <div className="flex items-center gap-2 text-sm font-black text-white">
                <TrendingUp className="h-4 w-4 text-cyan-200" />
                {card.title}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{card.text}</p>
            </article>
          ))}
        </aside>
      </section>
    </div>
  );
}
