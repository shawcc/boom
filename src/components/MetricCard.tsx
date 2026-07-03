import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  caption,
  icon: Icon,
}: {
  label: string;
  value: string;
  caption: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <Icon className="h-5 w-5 text-cyan-200" />
      </div>
      <div className="mt-4 text-3xl font-black tracking-tight text-white">{value}</div>
      <p className="mt-2 text-sm text-slate-400">{caption}</p>
    </div>
  );
}
