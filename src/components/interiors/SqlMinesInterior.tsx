import React, { useState } from 'react';
import { Database, Play, CheckCircle, Sparkles, X, Terminal, Cpu } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface SqlMinesInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const SqlMinesInterior: React.FC<SqlMinesInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [activeQueryIdx, setActiveQueryIdx] = useState<number>(0);
  const [queryOutput, setQueryOutput] = useState<string | null>(null);

  const queries = [
    {
      title: 'Customer Churn Window Analytics',
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
      title: 'Real-Time Inventory Reconciliation',
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
      result: `[SUCCESS] Low-stock alert trigger evaluated.
+----------------+------------+----------------+---------------+---------------+
| warehouse_code | sku        | stock_quantity | reserved_qty  | available_qty |
+----------------+------------+----------------+---------------+---------------+
| WH-CENTRAL-01  | GPU-RTX409 | 22             | 18            | 4 [ALERT]     |
| WH-EAST-02     | RAM-32GB-D | 35             | 25            | 10 [WARN]     |
+----------------+------------+----------------+---------------+---------------+`
    }
  ];

  const handleRunQuery = () => {
    soundManager.playAnvilClink();
    setQueryOutput(queries[activeQueryIdx].result);
    if (onGainXp) onGainXp(30);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#120d08] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#1f150e] border-b-2 border-[#452b1a] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#2b1c11] border border-[#f59e0b] flex items-center justify-center text-[#f59e0b]">
            <Database className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#f59e0b] tracking-wider uppercase">
            SQL MINES
          </h1>
          <span className="text-[8px] text-[#ca8a04] hidden sm:inline">
            · Explore SQL & Relational Schemas
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#2b1c11] hover:bg-[#3d2717] text-[#f59e0b] border border-[#f59e0b]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-[#17100a] border-4 border-[#452b1a] shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row overflow-hidden">
          {/* LEFT: MINE SHAFT PIXEL ART */}
          <div className="w-full md:w-80 min-h-[260px] bg-gradient-to-b from-[#21160e] via-[#1a110a] to-[#261910] border-b-4 md:border-b-0 md:border-r-4 border-[#452b1a] p-5 flex flex-col justify-between relative overflow-hidden">
            {/* Timber support frame */}
            <div className="absolute top-0 left-4 right-4 h-5 bg-[#543019] border-b-2 border-[#26150b]" />
            <div className="absolute top-5 left-4 w-4 bottom-0 bg-[#543019]" />
            <div className="absolute top-5 right-4 w-4 bottom-0 bg-[#543019]" />

            {/* Mine cart with glowing crystals */}
            <div className="relative z-10 mx-auto my-auto flex flex-col items-center">
              {/* Minecart */}
              <div className="w-24 h-14 bg-[#382012] border-2 border-[#784221] relative flex items-center justify-center shadow-lg">
                <span className="text-xs">💎💎💎</span>
                {/* Wheels */}
                <div className="absolute -bottom-3 left-2 w-5 h-5 rounded-full bg-[#1e293b] border border-slate-500" />
                <div className="absolute -bottom-3 right-2 w-5 h-5 rounded-full bg-[#1e293b] border border-slate-500" />
              </div>
              {/* Rail track */}
              <div className="w-36 h-2 bg-[#475569] mt-3 flex justify-between px-2">
                <div className="w-1.5 h-3 bg-[#78350f] -top-0.5 relative" />
                <div className="w-1.5 h-3 bg-[#78350f] -top-0.5 relative" />
                <div className="w-1.5 h-3 bg-[#78350f] -top-0.5 relative" />
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-[#382012] font-pixel text-[8px] text-[#f59e0b]">
              <span>FOREMAN IRONCLAD:</span>
              <p className="text-slate-300 font-sans text-xs mt-1">
                "Relational queries are the bedrock of reliable decision-making. No fluff, just optimized indexes."
              </p>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE SQL TERMINAL */}
          <div className="flex-1 p-5 bg-[#120c07] flex flex-col justify-between font-mono">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#382012]">
                <div className="flex gap-2">
                  {queries.map((q, idx) => (
                    <button
                      key={q.title}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveQueryIdx(idx);
                        setQueryOutput(null);
                      }}
                      className={`px-2.5 py-1 text-[8px] font-pixel border transition-colors ${
                        activeQueryIdx === idx
                          ? 'bg-[#ca8a04] text-[#0f1722] font-bold border-[#fde047]'
                          : 'bg-[#21160e] text-[#a88265] border-[#452b1a]'
                      }`}
                    >
                      {q.title}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleRunQuery}
                  className="px-3 py-1.5 bg-[#15803d] hover:bg-[#16a34a] text-white font-pixel text-[8px] border border-[#86efac] flex items-center gap-1 cursor-pointer active:translate-y-0.5"
                >
                  <Play className="w-3 h-3 text-[#fde047] fill-[#fde047]" />
                  <span>EXECUTE</span>
                </button>
              </div>

              {/* Code Editor Box */}
              <div className="p-3 bg-[#0a0704] border border-[#26170d] text-xs text-[#fed7aa] overflow-x-auto leading-relaxed max-h-48">
                <pre>{queries[activeQueryIdx].query}</pre>
              </div>

              {/* Query Output Box */}
              {queryOutput && (
                <div className="mt-3 p-3 bg-[#050402] border border-[#16a34a]/60 text-[11px] text-[#86efac] font-mono whitespace-pre-wrap animate-in fade-in">
                  {queryOutput}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#26170d] flex items-center justify-between font-pixel text-[8px] text-[#a88265]">
              <span>DIALECTS: POSTGRESQL · MYSQL · BIGQUERY</span>
              <span className="text-[#f59e0b]">SQL MASTERY: 88%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
