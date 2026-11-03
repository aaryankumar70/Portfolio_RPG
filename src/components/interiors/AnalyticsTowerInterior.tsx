import React, { useState } from 'react';
import { BarChart2, TrendingUp, PieChart, Activity, X, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface AnalyticsTowerInteriorProps {
  onBack: () => void;
}

export const AnalyticsTowerInterior: React.FC<AnalyticsTowerInteriorProps> = ({ onBack }) => {
  const [activeMetric, setActiveMetric] = useState<'domains' | 'productivity' | 'impact'>('domains');

  const domainBreakdown = [
    { label: 'Data Engineering & SQL', percentage: 35, color: '#f59e0b', details: 'ETL pipelines, data warehousing, window queries' },
    { label: 'Machine Learning & AI', percentage: 30, color: '#38bdf8', details: 'PyTorch, transformers, embeddings, neural classifiers' },
    { label: 'Backend Microservices', percentage: 20, color: '#10b981', details: 'FastAPI, async architectures, REST & Redis caching' },
    { label: 'Interactive Frontend', percentage: 15, color: '#a855f7', details: 'React, TypeScript, Canvas 2D engines, TailwindCSS' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#081119] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#0e1d2b] border-b-2 border-[#1c3954] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#162d42] border border-[#06b6d4] flex items-center justify-center text-[#06b6d4]">
            <BarChart2 className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#22d3ee] tracking-wider uppercase">
            ANALYTICS TOWER
          </h1>
          <span className="text-[8px] text-[#67e8f9] hidden sm:inline">
            · Real-Time Career & Project Metrics
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#162d42] hover:bg-[#204363] text-[#22d3ee] border border-[#06b6d4]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN ANALYTICS DASHBOARD */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-[#0b1722] border-4 border-[#1c3954] p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1c3954]">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#22d3ee]" />
                ENGINEERING TELEMETRY & BREAKDOWN
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Quantified summary of Aryan's technical hours and production systems
              </p>
            </div>
            <span className="font-pixel text-[9px] text-[#22d3ee] px-2 py-1 bg-[#162d42] border border-[#06b6d4]">
              LIVE STATS
            </span>
          </div>

          {/* 3 Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-pixel">
            <div className="p-4 bg-[#102232] border border-[#1c3954]">
              <span className="text-[8px] text-slate-400 block mb-1">TOTAL PRODUCTION QUERIES</span>
              <span className="text-xl text-[#f59e0b] font-bold">1.2M+</span>
              <span className="text-[7px] text-emerald-400 block mt-1 font-sans">99.98% uptime in production</span>
            </div>
            <div className="p-4 bg-[#102232] border border-[#1c3954]">
              <span className="text-[8px] text-slate-400 block mb-1">AVERAGE INFERENCE LATENCY</span>
              <span className="text-xl text-[#38bdf8] font-bold">14.2ms</span>
              <span className="text-[7px] text-emerald-400 block mt-1 font-sans">Optimized ONNX & TensorRT</span>
            </div>
            <div className="p-4 bg-[#102232] border border-[#1c3954]">
              <span className="text-[8px] text-slate-400 block mb-1">DATASETS PROCESSED</span>
              <span className="text-xl text-[#a855f7] font-bold">450+ GB</span>
              <span className="text-[7px] text-emerald-400 block mt-1 font-sans">Automated cleaning & partitioning</span>
            </div>
          </div>

          {/* Domain Breakdown Bars */}
          <div className="space-y-4">
            <h3 className="font-pixel text-[10px] text-[#22d3ee] tracking-wider uppercase mb-3">
              DOMAIN EXPERTISE ALLOCATION
            </h3>

            {domainBreakdown.map((d) => (
              <div key={d.label} className="p-3 bg-[#0e1d2b] border border-[#1c3954]">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-white">{d.label}</span>
                  <span className="font-pixel text-[9px]" style={{ color: d.color }}>
                    {d.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#162d42] overflow-hidden mb-1.5">
                  <div
                    className="h-full"
                    style={{ width: `${d.percentage}%`, backgroundColor: d.color }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-sans">{d.details}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
