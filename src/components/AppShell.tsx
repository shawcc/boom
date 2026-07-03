import { Link, NavLink } from "react-router-dom";
import { Activity, Github, Radar } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#06131f] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-18%] h-[440px] w-[440px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-[360px] w-[360px] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[32%] h-[380px] w-[380px] rounded-full bg-rose-500/10 blur-3xl" />
        <div className="scan-grid absolute inset-0 opacity-40" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#06131f]/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Radar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-black tracking-[0.24em] text-white">TECH ALPHA RADAR</div>
              <div className="text-xs text-slate-400">科技热点投资情报助手</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm text-slate-300 transition hover:text-white",
                  isActive && "bg-white text-slate-950 shadow-lg shadow-cyan-500/10 hover:text-slate-950",
                )
              }
            >
              热点雷达
            </NavLink>
            <a className="rounded-full px-4 py-2 text-sm text-slate-500" href="#learn">
              新手解释
            </a>
            <a className="rounded-full px-4 py-2 text-sm text-slate-500" href="#risk">
              风险扫描
            </a>
          </nav>

          <div className="hidden items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs text-amber-100 sm:flex">
            <Activity className="h-4 w-4" />
            模拟数据演示
          </div>
          <Github className="h-5 w-5 text-slate-500 sm:hidden" />
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-8">{children}</main>
    </div>
  );
}
