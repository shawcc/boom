import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { RiskSignal } from "@/data/mockData";
import { RiskBadge } from "@/components/RiskBadge";

export function RiskPanel({ risks }: { risks: RiskSignal[] }) {
  return (
    <section id="risk" className="rounded-[2rem] border border-rose-200/15 bg-rose-950/20 p-5">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-400/15 text-rose-100">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-rose-100">风险扫描</p>
          <h2 className="text-xl font-black text-white">先排雷，再谈机会</h2>
        </div>
      </div>

      <div className="space-y-3">
        {risks.map((risk) => (
          <article key={risk.id} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-bold text-white">{risk.title}</h3>
              <RiskBadge level={risk.level} />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{risk.description}</p>
            <div className="mt-4 flex gap-2 rounded-2xl bg-slate-950/35 p-3 text-sm text-slate-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
              <span>验证动作：{risk.verifyAction}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
