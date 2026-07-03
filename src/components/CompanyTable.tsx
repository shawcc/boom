import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { RelatedCompany } from "@/data/mockData";
import { RiskBadge } from "@/components/RiskBadge";
import { ScoreBar } from "@/components/ScoreBar";

export function CompanyTable({ companies }: { companies: RelatedCompany[] }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
      <div className="mb-5">
        <p className="text-xs font-semibold text-cyan-200">相关公司</p>
        <h2 className="mt-1 text-xl font-black text-white">按相关性和证据强度排序</h2>
      </div>

      <div className="space-y-3">
        {companies.map((company) => (
          <Link
            key={company.symbol}
            to={`/stocks/${company.symbol}`}
            className="group block rounded-3xl border border-white/10 bg-slate-950/35 p-4 transition hover:border-cyan-200/35 hover:bg-white/[0.08]"
          >
            <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-black text-white">{company.name}</h3>
                  <span className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-300">{company.symbol}</span>
                  <RiskBadge level={company.riskLevel} />
                </div>
                <div className="mt-2 text-sm font-semibold text-cyan-100">{company.industryRole}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{company.reason}</p>
              </div>
              <div className="space-y-3">
                <ScoreBar label="相关性" value={company.relevanceScore} tone="cyan" />
                <div className="text-xs text-slate-400">证据数量：{company.evidenceCount} 条 · 市场：{company.market}</div>
              </div>
              <div className="flex items-center justify-end">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-slate-300 transition group-hover:bg-cyan-200 group-hover:text-slate-950">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
