import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/AppShell";
import Home from "@/pages/Home";
import HotspotDetail from "@/pages/HotspotDetail";
import StockDetail from "@/pages/StockDetail";

export default function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotspots/:id" element={<HotspotDetail />} />
          <Route path="/stocks/:symbol" element={<StockDetail />} />
        </Routes>
      </AppShell>
    </Router>
  );
}
