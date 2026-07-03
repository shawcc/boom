import { Link } from "react-router-dom";
import type { Hotspot } from "@/data/mockData";
import { cn } from "@/lib/utils";

const nodeStyles = {
  event: "border-amber-200/60 bg-amber-200/15 text-amber-50 shadow-amber-500/20",
  chain: "border-cyan-200/40 bg-cyan-200/10 text-cyan-50 shadow-cyan-500/10",
  stock: "border-white/20 bg-white/[0.08] text-white shadow-slate-950/20",
  evidence: "border-rose-200/40 bg-rose-300/10 text-rose-50 shadow-rose-500/10",
};

export function IntelligenceGraph({ hotspot }: { hotspot: Hotspot }) {
  const nodes = hotspot.graphNodes;
  const center = nodes[0];
  const satellites = nodes.slice(1);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-5 shadow-2xl shadow-slate-950/30">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-cyan-200">关系图谱</p>
          <h2 className="mt-1 text-xl font-black text-white">事件到个股的证据链</h2>
        </div>
        <span className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-300">可点击股票节点</span>
      </div>

      <div className="relative mt-6 min-h-[360px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#071926]/80 p-6">
        <div className="absolute inset-0 graph-grid opacity-45" />
        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-200/10" />

        <div className="relative grid min-h-[300px] place-items-center">
          <div className={cn("z-10 rounded-[1.5rem] border px-6 py-5 text-center shadow-2xl", nodeStyles[center.type])}>
            <div className="text-xs opacity-70">核心事件</div>
            <div className="mt-1 text-lg font-black">{center.label}</div>
          </div>

          {satellites.map((node, index) => {
            const angle = (Math.PI * 2 * index) / satellites.length - Math.PI / 2;
            const x = Math.cos(angle) * 42;
            const y = Math.sin(angle) * 42;
            const style = { left: `${50 + x}%`, top: `${50 + y}%` };
            const content = (
              <div
                className={cn(
                  "absolute z-10 w-32 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-3 text-center text-sm font-bold shadow-xl transition hover:scale-105",
                  nodeStyles[node.type],
                )}
                style={style}
              >
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] opacity-60">{node.type}</span>
                {node.label}
              </div>
            );

            if (node.type === "stock") {
              return (
                <Link to={`/stocks/${node.id}`} key={node.id} aria-label={`查看${node.label}`}>
                  {content}
                </Link>
              );
            }

            return <div key={node.id}>{content}</div>;
          })}

          {satellites.map((node, index) => {
            const angle = (Math.PI * 2 * index) / satellites.length - Math.PI / 2;
            const x = Math.cos(angle) * 21;
            const y = Math.sin(angle) * 21;
            return (
              <div
                key={`${node.id}-line`}
                className="absolute left-1/2 top-1/2 h-px w-[42%] origin-left bg-gradient-to-r from-cyan-200/40 to-transparent"
                style={{
                  transform: `rotate(${angle}rad)`,
                  opacity: 0.45 + (index % 2) * 0.25,
                  translate: `${x / 6}px ${y / 6}px`,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
