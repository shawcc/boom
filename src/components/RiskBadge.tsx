import type { RiskLevel } from "@/data/mockData";
import { cn } from "@/lib/utils";

const riskCopy: Record<RiskLevel, string> = {
  low: "低风险",
  medium: "中风险",
  high: "高风险",
};

const riskClass: Record<RiskLevel, string> = {
  low: "border-cyan-300/40 bg-cyan-300/10 text-cyan-100",
  medium: "border-amber-300/50 bg-amber-300/10 text-amber-100",
  high: "border-rose-300/50 bg-rose-400/10 text-rose-100",
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", riskClass[level], className)}>
      {riskCopy[level]}
    </span>
  );
}
