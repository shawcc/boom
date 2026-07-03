import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Building2, Link2, Sparkles } from "lucide-react";
import { EvidenceTimeline } from "@/components/EvidenceTimeline";
import { RiskPanel } from "@/components/RiskPanel";
import { getStock } from "@/data/mockData";
import { findLiveHotspot, useLiveHotspots } from "@/hooks/useLiveHotspots";

export default function StockDetail() {
  const { symbol } = useParams();
  const stock = symbol ? getStock(symbol) : undefined;
  const { hotspots, status, sourceName } = useLiveHotspots();

  if (!stock) {
    return <Navigate to="/" replace />;
  }

  const relatedHotspots = stock.relatedHotspots.map((id) => findLiveHotspot(hotspots, id)).filter(Boolean);
  const liveEvidence = relatedHotspots.flatMap((hotspot) => hotspot?.evidence.slice(0, 2) ?? []);
  const evidence = [...liveEvidence, ...stock.evidence].slice(0, 8);

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" />
        返回热点榜
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-slate-950/25">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-300">{stock.market}</span>
            <span className="rounded-full bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">{stock.sector}</span>
            <span className="rounded-full bg-amber-200/10 px-3 py-1 text-xs font-semibold text-amber-100">{stock.symbol}</span>
            <span className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-300">
              {status === "live" ? sourceName : "Mock 降级"}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white">{stock.name}</h1>
          <p className="mt-5 text-base leading-8 text-slate-300">{stock.summary}</p>

          <div className="mt-6 rounded-3xl border border-cyan-200/20 bg-cyan-200/10 p-5">
            <div className="flex items-center gap-3 text-cyan-100">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-black">AI 解读样式</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-cyan-50/85">{stock.aiBrief}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-5">
            <div className="flex items-center gap-3 text-white">
              <Building2 className="h-5 w-5 text-amber-100" />
              <h2 className="font-black">收入验证线索</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{stock.revenueClue}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
            <div className="flex items-center gap-3">
              <Link2 className="h-5 w-5 text-cyan-200" />
              <h2 className="font-black text-white">关联热点</h2>
            </div>
            <div className="mt-4 space-y-3">
              {relatedHotspots.map((hotspot) =>
                hotspot ? (
                  <Link
                    key={hotspot.id}
                    to={`/hotspots/${hotspot.id}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-200/40 hover:text-cyan-100"
                  >
                    {hotspot.title}
                    <BadgeCheck className="h-4 w-4" />
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </aside>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <EvidenceTimeline evidence={evidence} />
        <RiskPanel risks={stock.risks} />
      </div>
    </div>
  );
}
