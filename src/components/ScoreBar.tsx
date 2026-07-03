import { cn } from "@/lib/utils";

export function ScoreBar({
  label,
  value,
  tone = "cyan",
}: {
  label: string;
  value: number;
  tone?: "cyan" | "amber" | "rose";
}) {
  const toneClass = {
    cyan: "from-cyan-300 to-blue-400",
    amber: "from-amber-200 to-yellow-400",
    rose: "from-rose-300 to-red-500",
  }[tone];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={cn("h-full rounded-full bg-gradient-to-r", toneClass)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
