import { ArrowUpRight, Building2, Clock, Flame, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import type { Hotspot } from "@/data/mockData";
import { RiskBadge } from "@/components/RiskBadge";
import { ScoreBar } from "@/components/ScoreBar";

export function HotspotCard({ hotspot, rank }: { hotspot: Hotspot; rank: number }) {
  return (
    <article className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-white/[0.09]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-200/30 bg-amber-200/10 text-lg font-black text-amber-100">
            {rank}
          </div>
          <div>
            <div className="text-xs font-semibold text-cyan-200">{hotspot.category}</div>
            <h3 className="mt-1 text-lg font-black tracking-tight text-white">{hotspot.title}</h3>
          </div>
        </div>
        <RiskBadge level={hotspot.riskLevel} />
      </div>

      <p className="mt-4 min-h-12 text-sm leading-6 text-slate-300">{hotspot.summary}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400 sm:grid-cols-4">
        <span className="flex items-center gap-1.5">
          <Flame className="h-4 w-4 text-amber-200" />
          热度 +{hotspot.heatChange}
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-cyan-200" />
          可信 {hotspot.credibilityScore}
        </span>
        <span className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4 text-slate-300" />
          {hotspot.companyCount} 公司
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-slate-300" />
          {hotspot.updatedAt}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <ScoreBar label="热点强度" value={hotspot.heatScore} tone="amber" />
        <ScoreBar label="证据可信度" value={hotspot.credibilityScore} tone="cyan" />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {hotspot.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`/hotspots/${hotspot.id}`}
        className="mt-5 flex items-center justify-between rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-200 hover:text-slate-950"
      >
        查看情报链路
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </article>
  );
}
