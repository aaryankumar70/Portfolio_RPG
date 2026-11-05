import React, { useState } from 'react';
import { BarChart2, TrendingUp, PieChart, Activity, X, ArrowUpRight, Sparkles, Eye, Compass, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';

interface AnalyticsTowerInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const AnalyticsTowerInterior: React.FC<AnalyticsTowerInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [activeTab, setActiveTab] = useState<'spire' | 'telemetry' | 'impact'>('spire');
  const [chartCycled, setChartCycled] = useState<boolean>(false);
  const [cartographerQuoteIdx, setCartographerQuoteIdx] = useState<number>(0);

  const cartographerQuotes = [
    "From the summit of the Analytics Tower, the entire data landscape unfolds. We turn nebulous streams into crystalline intelligence.",
    "Aryan's production pipelines have processed over 1.2 million queries with 99.98% uptime across partitioned analytical clusters.",
    "Look into the holographic column: that live telemetry represents latency distributions, ingestion throughput, and data drift safeguards.",
    "A metric without context is just a number. The true art of data science lies in extracting actionable strategic velocity."
  ];

  const domainBreakdown = [
    { label: 'Data Engineering & SQL', percentage: 35, color: '#f59e0b', details: 'ETL pipelines, data warehousing, window queries' },
    { label: 'Machine Learning & AI', percentage: 30, color: '#38bdf8', details: 'PyTorch, transformers, embeddings, neural classifiers' },
    { label: 'Backend Microservices', percentage: 20, color: '#10b981', details: 'FastAPI, async architectures, REST & Redis caching' },
    { label: 'Interactive Frontend', percentage: 15, color: '#a855f7', details: 'React, TypeScript, Canvas 2D engines, TailwindCSS' }
  ];

  const handleCycleChart = () => {
    soundManager.playCrystalChime();
    setChartCycled(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#38bdf8', '#22d3ee', '#67e8f9']
    });
    setTimeout(() => setChartCycled(false), 800);
    if (onGainXp) onGainXp(20);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#060c14] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#0c1826] border-b-2 border-[#162e48] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#13263d] border border-[#06b6d4] flex items-center justify-center text-[#06b6d4] shadow-inner">
            <BarChart2 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#22d3ee] tracking-wider uppercase flex items-center gap-2">
              <span>ANALYTICS TOWER</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#a5f3fc] font-sans">
              Grand Cartographer Thaddeus · Telemetry, Dashboards & Visualizations
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('spire'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'spire'
                ? 'bg-[#0891b2] text-white font-bold border-[#a5f3fc] shadow-[0_0_10px_rgba(8,145,178,0.5)]'
                : 'bg-[#102235] text-[#22d3ee] border-[#162e48] hover:text-white'
            }`}
          >
            <span>🔭</span>
            <span>OBSERVATION DECK</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('telemetry'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'telemetry'
                ? 'bg-[#0891b2] text-white font-bold border-[#a5f3fc] shadow-[0_0_10px_rgba(8,145,178,0.5)]'
                : 'bg-[#102235] text-[#22d3ee] border-[#162e48] hover:text-white'
            }`}
          >
            <span>📊</span>
            <span>TELEMETRY</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('impact'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'impact'
                ? 'bg-[#0891b2] text-white font-bold border-[#a5f3fc] shadow-[0_0_10px_rgba(8,145,178,0.5)]'
                : 'bg-[#102235] text-[#22d3ee] border-[#162e48] hover:text-white'
            }`}
          >
            <span>⚡</span>
            <span>IMPACT & UPTIME</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#13263d] hover:bg-[#1c3859] text-[#22d3ee] border border-[#06b6d4]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING PIXEL ART OBSERVATION DECK */}
      {activeTab === 'spire' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#162e48] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#09131f]">
            {/* The Pixel Art Analytics Tower Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#09131f]">
              <img
                src="/assets/interiors/analytics_tower_room.png"
                alt="Analytics Tower Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Glow Overlays */}
              <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-black/40 pointer-events-none" />
              {chartCycled && (
                <div className="absolute inset-0 bg-cyan-600/25 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters Standing in the Observatory */}
              {/* Grand Cartographer Thaddeus NPC */}
              <div
                onClick={() => {
                  soundManager.playCrystalChime();
                  setCartographerQuoteIdx((prev) => (prev + 1) % cartographerQuotes.length);
                }}
                className="absolute bottom-[24%] right-[32%] flex flex-col items-center cursor-pointer group z-10"
                title="Grand Cartographer Thaddeus (Click to talk)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#0a1524]/90 border border-[#06b6d4] text-[7px] font-pixel text-[#a5f3fc] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Talk to Thaddeus
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/data_sage_idle.png"
                    alt="Cartographer Thaddeus"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#0e2034] text-[#22d3ee] border border-[#0891b2] mt-0.5">
                  Thaddeus
                </span>
              </div>

              {/* Aryan Character (Beside Holographic Column analyzing metrics) */}
              <div className="absolute bottom-[22%] left-[26%] flex flex-col items-center z-10 pointer-events-none">
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-9 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/characters/aryan/aryan_idle.png"
                    alt="Aryan"
                    className="w-10 h-15 object-contain [image-rendering:pixelated] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#0f172a] text-[#38bdf8] border border-[#0284c7] mt-0.5">
                  Aryan
                </span>
              </div>

              {/* Mango the Cat Companion */}
              <div
                onClick={() => {
                  soundManager.playCatMeow();
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.7 } });
                }}
                className="absolute bottom-[20%] right-[16%] flex flex-col items-center cursor-pointer group z-10"
                title="Mango the Cat (Click to pet)"
              >
                <div className="relative w-8 h-8 flex items-end justify-center">
                  <div className="absolute bottom-0 w-7 h-2 bg-black/50 rounded-full" />
                  <img
                    src="/assets/characters/mango/mango_spritesheet.png"
                    alt="Mango"
                    className="w-8 h-8 object-contain [image-rendering:pixelated] group-hover:scale-110 transition-transform"
                    style={{ objectPosition: '0 0' }}
                  />
                </div>
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#0e2034] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. HOLOGRAPHIC TELEMETRY PILLAR */}
              <button
                onClick={handleCycleChart}
                className={`absolute top-[28%] left-1/2 -translate-x-1/2 w-28 h-36 bg-cyan-500/10 hover:bg-cyan-500/30 border-2 border-dashed border-[#06b6d4] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20 ${
                  chartCycled ? 'scale-105 bg-cyan-500/40' : 'hover:scale-105'
                }`}
                title="Holographic Projection (Click to cycle metric telemetry!)"
              >
                <BarChart2 className="w-6 h-6 text-[#22d3ee] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#a5f3fc] mt-1 bg-black/80 px-1 border border-cyan-600">
                  CYCLE METRICS
                </span>
              </button>

              {/* 2. TELESCOPE OBSERVATION HOTSPOT */}
              <button
                onClick={() => { soundManager.playCrystalChime(); setActiveTab('impact'); }}
                className="absolute bottom-[24%] right-[8%] w-24 h-16 bg-blue-500/10 hover:bg-blue-500/25 border-2 border-dashed border-[#38bdf8] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Brass Telescope (Click to scan production horizons)"
              >
                <Eye className="w-5 h-5 text-[#38bdf8]" />
                <span className="text-[6px] font-pixel text-[#bae6fd] mt-0.5 bg-black/80 px-1 border border-sky-700">
                  SCAN HORIZON
                </span>
              </button>

              {/* 3. CELESTIAL BOOKSHELF HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('telemetry'); }}
                className="absolute bottom-[24%] left-[10%] w-24 h-20 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Telemetry Archives (Click to view full data)"
              >
                <Compass className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-[6px] font-pixel text-[#fef08a] mt-0.5 bg-black/80 px-1 border border-amber-700">
                  TELEMETRY
                </span>
              </button>
            </div>
          </div>

          {/* Bottom RPG Dialogue Console */}
          <div className="w-full mt-4 bg-[#0c1826] border-2 border-[#162e48] p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border border-[#06b6d4] bg-[#13263d] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/npcs/data_sage_idle.png"
                  alt="Thaddeus"
                  className="w-10 h-10 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <span className="font-pixel text-[9px] text-[#22d3ee] tracking-wider block">
                  GRAND CARTOGRAPHER THADDEUS
                </span>
                <p className="text-xs text-slate-200 mt-0.5 max-w-2xl leading-relaxed">
                  "{cartographerQuotes[cartographerQuoteIdx]}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-pixel text-[8px]">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setCartographerQuoteIdx((prev) => (prev + 1) % cartographerQuotes.length);
                }}
                className="px-3 py-2 bg-[#13263d] hover:bg-[#1c3859] text-[#22d3ee] border border-[#06b6d4]/50 transition-colors"
              >
                NEXT OBSERVATION
              </button>
              <button
                onClick={handleCycleChart}
                className="px-3 py-2 bg-[#0891b2] hover:bg-[#0e7490] text-white font-bold border border-[#a5f3fc] shadow-[0_0_10px_rgba(8,145,178,0.5)] transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>CYCLE TELEMETRY (+20 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: TELEMETRY DASHBOARD */}
      {activeTab === 'telemetry' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl bg-[#0c1826] border-4 border-[#162e48] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#162e48]">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#22d3ee]" />
                  <span>ENGINEERING TELEMETRY & BREAKDOWN</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Quantified summary of Aryan's technical hours and production systems
                </p>
              </div>
              <span className="font-pixel text-[9px] text-[#22d3ee] px-2 py-1 bg-[#13263d] border border-[#06b6d4]">
                LIVE STATS
              </span>
            </div>

            {/* Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-pixel">
              <div className="p-4 bg-[#102235] border border-[#162e48]">
                <span className="text-[8px] text-slate-400 block mb-1">TOTAL PRODUCTION QUERIES</span>
                <span className="text-xl text-[#f59e0b] font-bold">1.2M+</span>
              </div>
              <div className="p-4 bg-[#102235] border border-[#162e48]">
                <span className="text-[8px] text-slate-400 block mb-1">AVERAGE INFERENCE LATENCY</span>
                <span className="text-xl text-[#38bdf8] font-bold">14ms</span>
              </div>
              <div className="p-4 bg-[#102235] border border-[#162e48]">
                <span className="text-[8px] text-slate-400 block mb-1">SYSTEM RELIABILITY & UPTIME</span>
                <span className="text-xl text-emerald-400 font-bold">99.98%</span>
              </div>
            </div>

            {/* Domain Breakdown Progress Bars */}
            <div className="space-y-4">
              <h3 className="font-pixel text-xs text-[#22d3ee] mb-2">DOMAIN WEIGHTS & TIME INVESTMENT</h3>
              {domainBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-200">{item.label}</span>
                    <span className="font-mono text-slate-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#08121d] border border-[#162e48] overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{item.details}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: IMPACT & UPTIME */}
      {activeTab === 'impact' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#22d3ee] mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#06b6d4]" />
              <span>DEPLOYMENT IMPACT & ENGINEERING RELIABILITY</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0c1826] p-5 border-2 border-[#162e48]">
                <h4 className="font-bold text-sm text-[#f59e0b] mb-2">High-Throughput Ingestion</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Architected asynchronous FastAPI pipelines handling 4,500+ requests/second with distributed rate limiting and connection pooling.
                </p>
                <div className="text-[10px] text-emerald-400 font-mono">Zero Message Loss during burst traffic</div>
              </div>

              <div className="bg-[#0c1826] p-5 border-2 border-[#162e48]">
                <h4 className="font-bold text-sm text-[#38bdf8] mb-2">Predictive Inventory Optimization</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Trained hybrid Prophet-LSTM forecasters reducing warehouse stockouts by 28% across 42 regional distribution nodes.
                </p>
                <div className="text-[10px] text-emerald-400 font-mono">3.8% MAPE across seasonal demand curves</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
