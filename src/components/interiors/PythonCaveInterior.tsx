import React, { useState } from 'react';
import { Terminal, Code, Cpu, Sparkles, X, ChevronRight, CheckCircle2, ArrowRight, Eye, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';

interface PythonCaveInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const PythonCaveInterior: React.FC<PythonCaveInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [dialogueStep, setDialogueStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'scene' | 'projects' | 'snippets'>('scene');
  const [activeSnippetIdx, setActiveSnippetIdx] = useState<number>(0);
  const [crystalGlow, setCrystalGlow] = useState<boolean>(false);

  const sageQuotes = [
    "Python is a powerful language. It is simple, yet limitless.",
    "Aryan has forged many artifacts here: asynchronous FastAPI microservices, automated data pipelines, and PyTorch neural classifiers.",
    "In this cave, clean syntax meets algorithmic power. Remember: 'Readability counts, and simple is better than complex.'",
    "These glowing crystals represent vector embeddings—mapping semantic thought into high-dimensional geometries."
  ];

  const pythonProjects = [
    {
      title: 'Multimodal Neural Classification Pipeline',
      framework: 'PyTorch · HuggingFace · OpenCV',
      description: 'End-to-end Python pipeline processing image streams and text transcripts simultaneously with cross-attention fusion layers.',
      stars: '★ 94.2% Accuracy'
    },
    {
      title: 'High-Throughput Async REST & WebSocket API',
      framework: 'FastAPI · Uvicorn · Redis · Pydantic',
      description: 'Production-ready backend microservice handling 4,500+ requests/second with distributed rate limiting and JWT authentication.',
      stars: '★ Sub-15ms Latency'
    },
    {
      title: 'Automated Financial Data Extractor & ETL',
      framework: 'Pandas · NumPy · BeautifulSoup · SQLModel',
      description: 'Scrapes, cleanses, validates, and stages semi-structured market time-series directly into partitioned analytical tables.',
      stars: '★ Zero Data Drift'
    }
  ];

  const codeSnippets = [
    {
      title: 'FastAPI Multimodal Vector Ingestion',
      code: `@app.post("/api/v1/embed-stream")
async def process_multimodal_stream(payload: DataStreamRequest):
    """Aryan's high-speed vector ingestion endpoint with connection pooling"""
    async with db_pool.acquire() as conn:
        tensor_embeddings = await model_pipeline.infer_batch(payload.items)
        indexed_ids = await vector_index.upsert_async(
            vectors=tensor_embeddings,
            metadata=[{"src": it.source, "timestamp": time.time()} for it in payload.items]
        )
    return {"status": "success", "indexed_count": len(indexed_ids)}`
    },
    {
      title: 'Pandas Automated Data Sanitization',
      code: `def cleanse_sales_timeseries(df: pd.DataFrame) -> pd.DataFrame:
    """Idempotent data cleaning pipeline with windowed deduplication"""
    return (
        df.drop_duplicates(subset=["transaction_id"])
          .assign(cleaned_date=lambda d: pd.to_datetime(d["raw_timestamp"]))
          .query("amount > 0 and status == 'COMPLETED'")
          .sort_values(by="cleaned_date")
          .reset_index(drop=True)
    )`
    },
    {
      title: 'PyTorch Multimodal Cross-Attention Layer',
      code: `class MultimodalFusion(nn.Module):
    def __init__(self, d_model=512, n_heads=8):
        super().__init__()
        self.cross_attn = nn.MultiheadAttention(d_model, n_heads)
        self.norm = nn.LayerNorm(d_model)
        self.mlp = nn.Sequential(nn.Linear(d_model, 256), nn.GELU(), nn.Linear(256, 2))

    def forward(self, audio_feats, text_feats):
        attn_out, _ = self.cross_attn(query=text_feats, key=audio_feats, value=audio_feats)
        return self.mlp(self.norm(text_feats + attn_out))`
    }
  ];

  const handleTellMeMore = () => {
    soundManager.playCrystalChime();
    setDialogueStep((prev) => (prev + 1) % sageQuotes.length);
    if (onGainXp) onGainXp(25);
  };

  const handleTouchCrystal = () => {
    soundManager.playCrystalChime();
    setCrystalGlow(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#38bdf8', '#0284c7', '#7dd3fc', '#bae6fd']
    });
    setTimeout(() => setCrystalGlow(false), 900);
    if (onGainXp) onGainXp(20);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050911] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER BAR */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#0a1220] border-b-2 border-[#162744] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#102038] border border-[#38bdf8] flex items-center justify-center text-[#38bdf8] shadow-inner">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#38bdf8] tracking-wider uppercase flex items-center gap-2">
              <span>PYTHON CAVERN LABORATORY</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#93c5fd] font-sans">
              Cave Sage Aldous · Asynchronous Architectures & Neural Models
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('scene'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'scene'
                ? 'bg-[#0284c7] text-white font-bold border-[#7dd3fc] shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : 'bg-[#102038] text-[#94a3b8] border-[#162744] hover:text-white'
            }`}
          >
            <span>💎</span>
            <span>CAVERN LAB</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('projects'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'bg-[#0284c7] text-white font-bold border-[#7dd3fc] shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : 'bg-[#102038] text-[#94a3b8] border-[#162744] hover:text-white'
            }`}
          >
            <span>📜</span>
            <span>PYTHON PROJECTS</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('snippets'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'snippets'
                ? 'bg-[#0284c7] text-white font-bold border-[#7dd3fc] shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : 'bg-[#102038] text-[#94a3b8] border-[#162744] hover:text-white'
            }`}
          >
            <span>⚡</span>
            <span>CODE WORKBENCH</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#102038] hover:bg-[#1a345b] text-[#38bdf8] border border-[#38bdf8]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING CAVERN LABORATORY (Matching Reference Image!) */}
      {activeTab === 'scene' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#162744] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#070e1b]">
            {/* The Authentic Pixel Art Cavern Lab Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#070e1b]">
              <img
                src="/assets/interiors/cavern_lab_room.jpg"
                alt="Cavern Laboratory Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Cyan Crystal Light Glow */}
              <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-black/40 pointer-events-none" />
              {crystalGlow && (
                <div className="absolute inset-0 bg-cyan-400/20 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters inside the Cavern Lab */}
              {/* Cave Sage Aldous (Beside the Upper Stone Altar & Books) */}
              <div
                onClick={handleTellMeMore}
                className="absolute top-[28%] right-[28%] flex flex-col items-center cursor-pointer group z-10"
                title="Cave Sage Aldous (Click to consult)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#081220]/90 border border-[#38bdf8] text-[7px] font-pixel text-[#7dd3fc] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Consult Sage Aldous
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/60 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/data_sage_idle.png"
                    alt="Cave Sage Aldous"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#081220] text-[#38bdf8] border border-[#0284c7] mt-0.5">
                  Sage Aldous
                </span>
              </div>

              {/* Aryan Character (Standing on the timber platform inspecting the algorithms) */}
              <div className="absolute bottom-[28%] left-[48%] flex flex-col items-center z-10 pointer-events-none">
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-9 h-3 bg-black/60 rounded-full blur-[1px]" />
                  <img
                    src="/assets/characters/aryan/aryan_idle.png"
                    alt="Aryan"
                    className="w-10 h-15 object-contain [image-rendering:pixelated] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#081220] text-[#fde047] border border-[#eab308] mt-0.5">
                  Aryan
                </span>
              </div>

              {/* Mango the Cat Companion (Resting beside the lower glowing crystal cluster) */}
              <div
                onClick={() => {
                  soundManager.playCatMeow();
                  confetti({ particleCount: 20, spread: 45, origin: { y: 0.7 } });
                }}
                className="absolute bottom-[16%] left-[32%] flex flex-col items-center cursor-pointer group z-10"
                title="Mango the Cat (Click to pet)"
              >
                <div className="relative w-8 h-8 flex items-end justify-center">
                  <div className="absolute bottom-0 w-7 h-2 bg-black/60 rounded-full" />
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

              {/* Interactive Clickable Hotspots overlaying the Cavern */}
              {/* 1. GIANT GLOWING CRYSTAL HOTSPOT */}
              <button
                onClick={handleTouchCrystal}
                className={`absolute bottom-[18%] left-[28%] w-18 h-22 bg-cyan-500/10 hover:bg-cyan-500/25 border-2 border-dashed border-[#38bdf8] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20 ${
                  crystalGlow ? 'scale-110 bg-cyan-500/40' : 'hover:scale-105'
                }`}
                title="Glowing Data Crystal (Click to harvest insight!)"
              >
                <Sparkles className="w-5 h-5 text-[#38bdf8] animate-bounce" />
                <span className="text-[6px] font-pixel text-[#bae6fd] mt-0.5 bg-black/80 px-1 border border-cyan-600">
                  HARVEST
                </span>
              </button>

              {/* 2. LOWER CODE TERMINAL HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('snippets'); }}
                className="absolute bottom-[28%] left-[16%] w-20 h-16 bg-blue-600/10 hover:bg-blue-600/25 border-2 border-dashed border-[#0284c7] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Laboratory Terminal (Click to open code workbench)"
              >
                <Terminal className="w-5 h-5 text-[#38bdf8] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#7dd3fc] mt-0.5 bg-black/80 px-1 border border-blue-600">
                  WORKBENCH
                </span>
              </button>

              {/* 3. CENTRAL HEARTH HOTSPOT */}
              <button
                onClick={() => {
                  soundManager.playLevelUp();
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.6 } });
                }}
                className="absolute bottom-[28%] left-[49%] -translate-x-1/2 w-16 h-18 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Hearth of Focus (Click to meditate)"
              >
                <Flame className="w-4 h-4 text-[#f59e0b] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#fde047] mt-0.5 bg-black/80 px-1 border border-amber-600">
                  HEARTH
                </span>
              </button>
            </div>

            {/* Bottom RPG Dialogue Box (Matches Screenshot) */}
            <div className="p-4 bg-[#0a1220] border-t-4 border-[#162744] font-pixel">
              <div className="flex items-start gap-3 pb-3 mb-3 border-b border-[#14233c]">
                <div className="w-9 h-9 rounded bg-[#102038] border border-[#38bdf8] flex items-center justify-center text-lg shrink-0">
                  🧙‍♂️
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-[#38bdf8] font-bold">Cave Sage Aldous</span>
                    <span className="text-[7px] text-slate-400 font-sans">Python Sorcerer</span>
                  </div>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    "{sageQuotes[dialogueStep]}"
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleTellMeMore}
                    className="px-3.5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold border-2 border-[#38bdf8] shadow-[0_2px_0_#075985] text-[8px] flex items-center gap-1.5 cursor-pointer transition-all active:translate-y-0.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#bae6fd]" />
                    <span>TELL ME MORE (+25 XP)</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('projects');
                    }}
                    className="px-3 py-2 bg-[#102038] hover:bg-[#1a345b] text-[#93c5fd] border border-[#162744] text-[8px] flex items-center gap-1 transition-colors"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Cavern Stats Strip */}
              <div className="flex items-center justify-between text-[8px] text-[#93c5fd]">
                <span>CORE ENGINES: PYTHON 3.12 · FASTAPI · PYTORCH · VECTOR EMBEDDINGS</span>
                <span className="text-[#fde047]">PYTHON MASTERY: 92%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: PYTHON PROJECTS SHOWCASE */}
      {activeTab === 'projects' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#38bdf8] mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>PYTHON ARTIFACTS & ENGINES</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pythonProjects.map((p) => (
                <div
                  key={p.title}
                  className="bg-[#0a1220] p-5 border-2 border-[#162744] shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[8px] font-pixel text-[#f59e0b] block mb-1">
                      {p.stars}
                    </span>
                    <h4 className="font-bold text-white text-sm mb-2 leading-snug">
                      {p.title}
                    </h4>
                    <p className="text-[10px] text-[#38bdf8] font-mono mb-3">
                      {p.framework}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                      {p.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#162744] flex items-center justify-between text-[8px] font-pixel text-[#94a3b8]">
                    <span>STATUS: DEPLOYED</span>
                    <span className="text-emerald-400">PRODUCTION READY</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: CODE WORKBENCH */}
      {activeTab === 'snippets' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl bg-[#0a1220] p-5 border-2 border-[#162744] shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#162744]">
              <div className="flex gap-2">
                {codeSnippets.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveSnippetIdx(idx);
                    }}
                    className={`px-3 py-1.5 text-[8px] font-pixel border transition-colors ${
                      activeSnippetIdx === idx
                        ? 'bg-[#0284c7] text-white border-[#38bdf8]'
                        : 'bg-[#102038] text-[#94a3b8] border-[#162744]'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
              <span className="text-[8px] font-pixel text-[#38bdf8]">
                PYTHON 3.12 SYNTAX
              </span>
            </div>

            <pre className="p-4 bg-[#050911] border border-[#162744] rounded-sm text-xs text-[#bae6fd] font-mono overflow-x-auto leading-relaxed shadow-inner">
              <code>{codeSnippets[activeSnippetIdx].code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
