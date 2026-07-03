import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Lightbulb, Newspaper } from "lucide-react";
import { CompanyTable } from "@/components/CompanyTable";
import { EvidenceTimeline } from "@/components/EvidenceTimeline";
import { IntelligenceGraph } from "@/components/IntelligenceGraph";
import { RiskBadge } from "@/components/RiskBadge";
import { RiskPanel } from "@/components/RiskPanel";
import { ScoreBar } from "@/components/ScoreBar";
import { getHotspot } from "@/data/mockData";

export default function HotspotDetail() {
  const { id } = useParams();
  const hotspot = id ? getHotspot(id) : undefined;

  if (!hotspot) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-cyan-100">
        <ArrowLeft className="h-4 w-4" />
        返回热点榜
      </Link>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-slate-950/25">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-cyan-200/10 px-3 py-1 text-xs font-semibold text-cyan-100">{hotspot.category}</span>
            <RiskBadge level={hotspot.riskLevel} />
            <span className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-300">更新 {hotspot.updatedAt}</span>
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white">{hotspot.title}</h1>
          <p className="mt-5 text-base leading-8 text-slate-300">{hotspot.summary}</p>

          <div className="mt-6 rounded-3xl border border-amber-200/20 bg-amber-200/10 p-5">
            <div className="flex items-center gap-3 text-amber-100">
              <Lightbulb className="h-5 w-5" />
              <span className="text-sm font-black">新手解释</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-amber-50/85">{hotspot.beginnerBrief}</p>
          </div>
        </div>

        <aside className="rounded-[2.5rem] border border-white/10 bg-slate-950/35 p-6">
          <div className="grid gap-5">
            <ScoreBar label="热点强度" value={hotspot.heatScore} tone="amber" />
            <ScoreBar label="证据可信度" value={hotspot.credibilityScore} tone="cyan" />
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.06] p-4">
                <div className="text-2xl font-black text-white">{hotspot.sourceCount}</div>
                <div className="mt-1 text-xs text-slate-400">来源数量</div>
              </div>
              <div className="rounded-2xl bg-white/[0.06] p-4">
                <div className="text-2xl font-black text-white">{hotspot.companyCount}</div>
                <div className="mt-1 text-xs text-slate-400">相关公司</div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <IntelligenceGraph hotspot={hotspot} />

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
          <div className="mb-5 flex items-center gap-3">
            <Clock className="h-5 w-5 text-cyan-200" />
            <div>
              <p className="text-xs font-semibold text-cyan-200">时间线</p>
              <h2 className="font-black text-white">热点如何发酵</h2>
            </div>
          </div>
          <div className="space-y-4">
            {hotspot.timeline.map((item) => (
              <article key={`${item.time}-${item.title}`} className="rounded-3xl border border-white/10 bg-slate-950/35 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-white">
                  <span className="text-cyan-100">{item.time}</span>
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <CompanyTable companies={hotspot.companies} />

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <EvidenceTimeline evidence={hotspot.evidence} />
        <div className="space-y-6">
          <RiskPanel risks={hotspot.risks} />
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
            <div className="flex items-center gap-3 text-cyan-100">
              <Newspaper className="h-5 w-5" />
              <h2 className="font-black text-white">标签</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {hotspot.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/[0.08] px-3 py-1 text-xs text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
