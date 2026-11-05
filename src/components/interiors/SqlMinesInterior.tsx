import React, { useState } from 'react';
import { Database, Play, CheckCircle, Sparkles, X, Terminal, Cpu, Pickaxe, Flame, ChevronRight, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';

interface SqlMinesInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const SqlMinesInterior: React.FC<SqlMinesInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [activeTab, setActiveTab] = useState<'mines' | 'query' | 'schemas'>('mines');
  const [activeQueryIdx, setActiveQueryIdx] = useState<number>(0);
  const [queryOutput, setQueryOutput] = useState<string | null>(null);
  const [oreStruck, setOreStruck] = useState<boolean>(false);
  const [ironcladQuoteIdx, setIroncladQuoteIdx] = useState<number>(0);

  const ironcladQuotes = [
    "Down in the deep strata, an unindexed query can collapse an entire cluster. Always structure your B-Trees before you dig!",
    "Aryan's SQL Warhammer cuts clean through multi-million-row joins using window functions, CTEs, and partitioning.",
    "Notice those glowing crystals on the minecart? Those are clean, normalized relational records ready for real-time analytical ingest.",
    "A slow query is just an unmined index waiting for optimization. EXPLAIN ANALYZE is our pickaxe down here."
  ];

  const queries = [
    {
      title: 'Customer Churn & Retention Cohorts (Window Functions)',
      query: `WITH monthly_activity AS (
  SELECT
    user_id,
    DATE_TRUNC('month', transaction_date) AS txn_month,
    SUM(amount) AS monthly_spend,
    LAG(DATE_TRUNC('month', transaction_date)) OVER (
      PARTITION BY user_id ORDER BY DATE_TRUNC('month', transaction_date)
    ) AS prev_month
  FROM transactions
  GROUP BY 1, 2
)
SELECT 
  user_id,
  txn_month,
  monthly_spend,
  CASE 
    WHEN prev_month IS NULL THEN 'NEW'
    WHEN txn_month - prev_month > INTERVAL '1 month' THEN 'REACTIVATED'
    ELSE 'ACTIVE'
  END AS retention_cohort
FROM monthly_activity;`,
      result: `[SUCCESS] 4,820 rows analyzed in 18ms.
+---------+------------+---------------+------------------+
| user_id | txn_month  | monthly_spend | retention_cohort |
+---------+------------+---------------+------------------+
| U-10492 | 2025-10-01 | $1,420.50     | ACTIVE           |
| U-10493 | 2025-10-01 | $890.00       | REACTIVATED      |
| U-10494 | 2025-10-01 | $3,120.00     | ACTIVE           |
+---------+------------+---------------+------------------+`
    },
    {
      title: 'Real-Time Inventory Reconciliation & Depletion Alert',
      query: `SELECT 
  w.warehouse_code,
  i.sku,
  i.stock_quantity,
  COALESCE(SUM(o.pending_qty), 0) AS reserved_qty,
  (i.stock_quantity - COALESCE(SUM(o.pending_qty), 0)) AS available_qty
FROM warehouse_inventory i
JOIN warehouses w ON w.id = i.warehouse_id
LEFT JOIN order_line_items o ON o.sku = i.sku AND o.status = 'AWAITING_FULFILLMENT'
GROUP BY 1, 2, 3
HAVING (i.stock_quantity - COALESCE(SUM(o.pending_qty), 0)) < 15
ORDER BY available_qty ASC;`,
      result: `[SUCCESS] Low-stock alert evaluated across 42 warehouses.
+----------------+------------+----------------+---------------+---------------+
| warehouse_code | sku        | stock_quantity | reserved_qty  | available_qty |
+----------------+------------+----------------+---------------+---------------+
| WH-CENTRAL-01  | GPU-RTX409 | 22             | 18            | 4 [ALERT]     |
| WH-EAST-02     | RAM-32GB-D | 35             | 25            | 10 [WARN]     |
+----------------+------------+----------------+---------------+---------------+`
    }
  ];

  const schemas = [
    {
      name: 'Partitioned Analytics Data Lakehouse',
      engine: 'ClickHouse / DuckDB',
      type: 'Columnar Fact Table',
      description: 'Partitioned by ingestion date with z-order indexing on user_id and event_type for sub-second aggregations.'
    },
    {
      name: 'High-Concurrency Transactional Store',
      engine: 'PostgreSQL 16',
      type: 'ACID Relational Core',
      description: 'Strict foreign keys, partial indexes on pending states, and logical replication for zero-downtime ETL read replicas.'
    },
    {
      name: 'Vector & Relational Hybrid Schema',
      engine: 'pgvector / Supabase',
      type: 'HNSW Index + Metadata',
      description: 'Combines 1536-dimensional OpenAI/HuggingFace embeddings with relational enterprise authorization filters.'
    }
  ];

  const handleStrikeOre = () => {
    soundManager.playAnvilClink();
    setOreStruck(true);
    confetti({
      particleCount: 30,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#38bdf8', '#fbbf24', '#0284c7']
    });
    setTimeout(() => setOreStruck(false), 300);
    if (onGainXp) onGainXp(20);
  };

  const handleRunQuery = () => {
    soundManager.playAnvilClink();
    setQueryOutput(queries[activeQueryIdx].result);
    if (onGainXp) onGainXp(30);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0e0906] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#1a0f0a] border-b-2 border-[#452714] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#2c170d] border border-[#f59e0b] flex items-center justify-center text-[#f59e0b] shadow-inner">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#f59e0b] tracking-wider uppercase flex items-center gap-2">
              <span>SQL MINES</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#fcd34d] font-sans">
              Foreman Ironclad · Relational Schemas, Window Functions & ETL
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('mines'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'mines'
                ? 'bg-[#d97706] text-white font-bold border-[#fde68a] shadow-[0_0_10px_rgba(217,119,6,0.5)]'
                : 'bg-[#24130a] text-[#f59e0b] border-[#452714] hover:text-white'
            }`}
          >
            <span>⛏</span>
            <span>MINE SHAFT</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('query'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'query'
                ? 'bg-[#d97706] text-white font-bold border-[#fde68a] shadow-[0_0_10px_rgba(217,119,6,0.5)]'
                : 'bg-[#24130a] text-[#f59e0b] border-[#452714] hover:text-white'
            }`}
          >
            <span>⚡</span>
            <span>QUERY BENCHMARK</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('schemas'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'schemas'
                ? 'bg-[#d97706] text-white font-bold border-[#fde68a] shadow-[0_0_10px_rgba(217,119,6,0.5)]'
                : 'bg-[#24130a] text-[#f59e0b] border-[#452714] hover:text-white'
            }`}
          >
            <span>📊</span>
            <span>SCHEMAS</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#2c170d] hover:bg-[#452714] text-[#f59e0b] border border-[#f59e0b]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING PIXEL ART MINE SHAFT */}
      {activeTab === 'mines' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#452714] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#140b06]">
            {/* The Pixel Art SQL Mines Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#140b06]">
              <img
                src="/assets/interiors/sql_mines_room.png"
                alt="SQL Mines Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Glow Overlays */}
              <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/40 pointer-events-none" />
              {oreStruck && (
                <div className="absolute inset-0 bg-amber-600/25 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters Standing in the Mine */}
              {/* Foreman Ironclad NPC */}
              <div
                onClick={() => {
                  soundManager.playAnvilClink();
                  setIroncladQuoteIdx((prev) => (prev + 1) % ironcladQuotes.length);
                }}
                className="absolute bottom-[24%] right-[34%] flex flex-col items-center cursor-pointer group z-10"
                title="Foreman Ironclad (Click to talk)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#0f0a07]/90 border border-[#f59e0b] text-[7px] font-pixel text-[#fde047] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Talk to Ironclad
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/researcher_idle.png"
                    alt="Foreman Ironclad"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#1f1008] text-[#f59e0b] border border-[#d97706] mt-0.5">
                  Ironclad
                </span>
              </div>

              {/* Aryan Character (Beside minecart inspecting relational data crystals) */}
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
                className="absolute bottom-[20%] left-[44%] flex flex-col items-center cursor-pointer group z-10"
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
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#1f1008] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. DATA CRYSTAL VEIN HOTSPOT */}
              <button
                onClick={handleStrikeOre}
                className={`absolute top-[22%] left-[12%] w-24 h-24 bg-amber-500/10 hover:bg-amber-500/30 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20 ${
                  oreStruck ? 'scale-90 bg-amber-500/40' : 'hover:scale-105'
                }`}
                title="Crystal Ore Vein (Click to mine data records!)"
              >
                <Sparkles className="w-5 h-5 text-[#fde047] animate-bounce" />
                <span className="text-[6px] font-pixel text-[#fde047] mt-1 bg-black/80 px-1 border border-amber-600">
                  MINE ORE
                </span>
              </button>

              {/* 2. MINECART DATA PAYLOAD HOTSPOT */}
              <button
                onClick={() => { soundManager.playAnvilClink(); setActiveTab('schemas'); }}
                className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-32 h-20 bg-blue-500/10 hover:bg-blue-500/25 border-2 border-dashed border-[#38bdf8] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Minecart (Click to inspect data schema payloads)"
              >
                <Database className="w-5 h-5 text-[#38bdf8]" />
                <span className="text-[6px] font-pixel text-[#bae6fd] mt-0.5 bg-black/80 px-1 border border-sky-700">
                  DATA PAYLOAD
                </span>
              </button>

              {/* 3. MINING BLUEPRINT DESK HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('query'); }}
                className="absolute bottom-[22%] right-[10%] w-28 h-20 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#d97706] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Mining Blueprint Desk (Click to run queries)"
              >
                <Terminal className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-[6px] font-pixel text-[#fef08a] mt-0.5 bg-black/80 px-1 border border-amber-700">
                  RUN QUERIES
                </span>
              </button>
            </div>
          </div>

          {/* Bottom RPG Dialogue Console */}
          <div className="w-full mt-4 bg-[#1a0f0a] border-2 border-[#452714] p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border border-[#f59e0b] bg-[#2c170d] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/npcs/researcher_idle.png"
                  alt="Foreman Ironclad"
                  className="w-10 h-10 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <span className="font-pixel text-[9px] text-[#f59e0b] tracking-wider block">
                  FOREMAN IRONCLAD · MASTER MINER & DBA
                </span>
                <p className="text-xs text-slate-200 mt-0.5 max-w-2xl leading-relaxed">
                  "{ironcladQuotes[ironcladQuoteIdx]}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-pixel text-[8px]">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIroncladQuoteIdx((prev) => (prev + 1) % ironcladQuotes.length);
                }}
                className="px-3 py-2 bg-[#2c170d] hover:bg-[#452714] text-[#f59e0b] border border-[#d97706]/50 transition-colors"
              >
                NEXT MINING TIP
              </button>
              <button
                onClick={handleStrikeOre}
                className="px-3 py-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold border border-[#fde68a] shadow-[0_0_10px_rgba(217,119,6,0.5)] transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>MINE DATA ORE (+20 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: QUERY BENCHMARK */}
      {activeTab === 'query' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl space-y-6">
            <div className="flex items-center gap-3 font-pixel text-[9px]">
              {queries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveQueryIdx(idx);
                    setQueryOutput(null);
                  }}
                  className={`px-4 py-2 border transition-all ${
                    activeQueryIdx === idx
                      ? 'bg-[#d97706] text-white font-bold border-[#fde68a]'
                      : 'bg-[#1a0f0a] text-slate-400 border-[#452714] hover:text-white'
                  }`}
                >
                  QUERY 0{idx + 1}
                </button>
              ))}
            </div>

            <div className="bg-[#1a0f0a] border-4 border-[#452714] p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#452714]">
                <h3 className="font-pixel text-xs text-[#f59e0b] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#f59e0b]" />
                  <span>{queries[activeQueryIdx].title}</span>
                </h3>
                <button
                  onClick={handleRunQuery}
                  className="font-pixel text-[9px] px-4 py-1.5 bg-[#d97706] hover:bg-[#b45309] text-white flex items-center gap-1.5 border border-[#fde68a] transition-transform active:scale-95"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>EXECUTE</span>
                </button>
              </div>

              <pre className="p-4 bg-[#0e0805] border border-[#452714] text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                {queries[activeQueryIdx].query}
              </pre>

              {queryOutput && (
                <div className="mt-4 p-4 bg-[#140b06] border border-[#f59e0b]/50 animate-in fade-in">
                  <div className="text-[10px] font-pixel text-[#f59e0b] mb-2 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>QUERY EXECUTION RESULTS</span>
                  </div>
                  <pre className="text-xs font-mono text-slate-200 overflow-x-auto">
                    {queryOutput}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: SCHEMAS */}
      {activeTab === 'schemas' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#f59e0b] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#f59e0b]" />
              <span>PRODUCTION RELATIONAL & WAREHOUSE SCHEMAS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {schemas.map((s, idx) => (
                <div key={idx} className="bg-[#1a0f0a] p-5 border-2 border-[#452714] flex flex-col justify-between">
                  <div>
                    <div className="font-pixel text-[9px] text-[#f59e0b] mb-1">{s.engine}</div>
                    <h4 className="font-bold text-sm text-white mb-2">{s.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{s.description}</p>
                  </div>
                  <div className="pt-3 border-t border-[#452714] text-[10px] text-emerald-400 font-mono">
                    {s.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
