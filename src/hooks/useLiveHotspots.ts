import { useEffect, useMemo, useState } from "react";
import type { Evidence, Hotspot } from "@/data/mockData";
import { hotspots as fallbackHotspots } from "@/data/mockData";

interface LiveHotspotPatch {
  id: string;
  liveSourceCount: number;
  updatedAt: string;
  evidence: Evidence[];
}

interface LiveHotspotsResponse {
  generatedAt: string;
  source: {
    name: string;
    status: "ok" | "empty" | "error";
  };
  hotspots: LiveHotspotPatch[];
  errors?: string[];
}

export type DataSourceStatus = "loading" | "live" | "fallback";

function mergeHotspots(livePatches: LiveHotspotPatch[]) {
  return fallbackHotspots.map((hotspot) => {
    const patch = livePatches.find((item) => item.id === hotspot.id);
    if (!patch || patch.evidence.length === 0) {
      return hotspot;
    }

    const liveEvidence = patch.evidence.map((item) => ({
      ...item,
      id: `${hotspot.id}-${item.id}`,
      sourceType: "news" as const,
      publishedAt: item.publishedAt ? new Date(item.publishedAt).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : patch.updatedAt,
    }));

    return {
      ...hotspot,
      sourceCount: Math.max(hotspot.sourceCount, patch.liveSourceCount + hotspot.evidence.length),
      updatedAt: patch.updatedAt,
      heatScore: Math.min(99, hotspot.heatScore + Math.min(5, patch.liveSourceCount)),
      evidence: [...liveEvidence, ...hotspot.evidence].slice(0, 8),
    };
  });
}

export function useLiveHotspots() {
  const [data, setData] = useState<LiveHotspotsResponse | null>(null);
  const [status, setStatus] = useState<DataSourceStatus>("loading");

  useEffect(() => {
    let canceled = false;

    async function loadLiveData() {
      try {
        const response = await fetch("/api/hotspots");
        if (!response.ok) {
          throw new Error(`live source failed: ${response.status}`);
        }
        const payload = (await response.json()) as LiveHotspotsResponse;
        if (!canceled) {
          setData(payload);
          setStatus(payload.hotspots.length > 0 ? "live" : "fallback");
        }
      } catch {
        if (!canceled) {
          setStatus("fallback");
        }
      }
    }

    loadLiveData();
    return () => {
      canceled = true;
    };
  }, []);

  const hotspots = useMemo(() => mergeHotspots(data?.hotspots ?? []), [data]);

  return {
    hotspots,
    status,
    sourceName: data?.source.name ?? "Mock 数据",
    generatedAt: data?.generatedAt,
  };
}

export function findLiveHotspot(hotspots: Hotspot[], id: string | undefined) {
  return hotspots.find((hotspot) => hotspot.id === id);
}
