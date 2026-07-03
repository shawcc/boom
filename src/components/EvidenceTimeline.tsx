import { FileText, Newspaper, ScrollText, UsersRound } from "lucide-react";
import type { Evidence } from "@/data/mockData";
import { cn } from "@/lib/utils";

const sourceMeta = {
  announcement: { label: "公告", icon: FileText, className: "text-cyan-100 bg-cyan-300/10 border-cyan-200/30" },
  news: { label: "新闻", icon: Newspaper, className: "text-amber-100 bg-amber-300/10 border-amber-200/30" },
  policy: { label: "政策", icon: ScrollText, className: "text-emerald-100 bg-emerald-300/10 border-emerald-200/30" },
  research: { label: "研报", icon: FileText, className: "text-blue-100 bg-blue-300/10 border-blue-200/30" },
  community: { label: "社区", icon: UsersRound, className: "text-rose-100 bg-rose-300/10 border-rose-200/30" },
};

export function EvidenceTimeline({ evidence }: { evidence: Evidence[] }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-5">
      <div className="mb-5">
        <p className="text-xs font-semibold text-cyan-200">证据链</p>
        <h2 className="mt-1 text-xl font-black text-white">不要只看结论，先看来源</h2>
      </div>

      <div className="space-y-4">
        {evidence.map((item) => {
          const meta = sourceMeta[item.sourceType];
          const Icon = meta.icon;
          return (
            <article key={item.id} className="relative rounded-3xl border border-white/10 bg-slate-950/35 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-3">
                  <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-2xl border", meta.className)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-white">{item.title}</h3>
                      <span className={cn("rounded-full border px-2.5 py-1 text-[11px]", meta.className)}>{meta.label}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.excerpt}</p>
                  </div>
                </div>
                <div className="shrink-0 rounded-2xl bg-white/[0.06] px-3 py-2 text-right text-xs text-slate-300">
                  <div>{item.source}</div>
                  <div className="mt-1 text-cyan-100">可信 {item.credibilityScore}</div>
                  <div className="mt-1 text-slate-500">{item.publishedAt}</div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
