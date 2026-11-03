import React, { useState } from 'react';
import { Terminal, Code, Cpu, Sparkles, X, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
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

  const sageQuotes = [
    "Python is a powerful language. It is simple, yet limitless.",
    "Aryan has forged many artifacts here: asynchronous FastAPI microservices, automated data pipelines, and PyTorch neural classifiers.",
    "In this cave, clean syntax meets algorithmic power. Remember: 'Readability counts, and simple is better than complex.'"
  ];

  const pythonProjects = [
    {
      title: 'Multimodal Neural Classification Pipeline',
      framework: 'PyTorch · HuggingFace · OpenCV',
      description: 'End-to-end Python pipeline processing image streams and text transcripts simultaneously with cross-attention fusion layers.',
      stars: '★ 94% Accuracy'
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
    """Aryan's high-speed vector ingestion endpoint"""
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
    }
  ];

  const handleTellMeMore = () => {
    soundManager.playCrystalChime();
    setDialogueStep((prev) => (prev + 1) % sageQuotes.length);
    if (onGainXp) onGainXp(25);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#070b12] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER (Matches Screenshot) */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#0e1624] border-b-2 border-[#1e2f47] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#16253b] border border-[#38bdf8] flex items-center justify-center text-[#38bdf8]">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#38bdf8] tracking-wider uppercase">
            PYTHON CAVE
          </h1>
          <span className="text-[8px] text-[#64748b] hidden sm:inline">
            · Explore Python
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('scene'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'scene'
                ? 'bg-[#0284c7] text-white font-bold border-[#38bdf8]'
                : 'bg-[#121c2d] text-[#94a3b8] border-[#1e2f47] hover:text-white'
            }`}
          >
            CAVE SCENE
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('projects'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'projects'
                ? 'bg-[#0284c7] text-white font-bold border-[#38bdf8]'
                : 'bg-[#121c2d] text-[#94a3b8] border-[#1e2f47] hover:text-white'
            }`}
          >
            PYTHON PROJECTS
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('snippets'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'snippets'
                ? 'bg-[#0284c7] text-white font-bold border-[#38bdf8]'
                : 'bg-[#121c2d] text-[#94a3b8] border-[#1e2f47] hover:text-white'
            }`}
          >
            CODE WORKBENCH
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#16253b] hover:bg-[#1f3350] text-[#38bdf8] border border-[#38bdf8]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN CAVE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {activeTab === 'scene' && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* PIXEL ART CAVERN STAGE (Matches Reference Screenshot Bottom-Middle) */}
            <div className="w-full relative rounded-sm border-4 border-[#1e2f47] shadow-[0_12px_40px_rgba(0,0,0,0.85)] bg-[#0d1624] overflow-hidden">
              {/* Cave Back Wall: Deep Navy Rock, Glowing Crystals, Giant Python Emblem */}
              <div className="h-64 sm:h-72 w-full relative bg-gradient-to-b from-[#0b1320] via-[#09101b] to-[#0e1726] flex items-center justify-center overflow-hidden">
                {/* Rock Texture dithering */}
                <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />

                {/* Stalactites hanging from cave ceiling */}
                <div className="absolute top-0 left-0 right-0 flex justify-between px-8 pointer-events-none">
                  <div className="w-6 h-10 bg-[#16253b] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                  <div className="w-8 h-14 bg-[#111e30] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                  <div className="w-5 h-8 bg-[#16253b] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                  <div className="w-10 h-16 bg-[#111e30] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                  <div className="w-6 h-11 bg-[#16253b] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                </div>

                {/* GIANT GLOWING PIXEL PYTHON LOGO (On Cave Wall in Center) */}
                <div className="absolute top-10 flex flex-col items-center pointer-events-none drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
                  <div className="w-16 h-16 relative">
                    {/* Blue Snake (Top/Left) */}
                    <div className="absolute top-0 left-0 w-10 h-10 bg-[#38bdf8] border-2 border-[#bae6fd] rounded-tl-xl rounded-tr-md rounded-bl-md shadow-md">
                      {/* Eye */}
                      <div className="absolute top-2 left-2.5 w-2 h-2 bg-[#082f49] rounded-full" />
                    </div>
                    {/* Yellow/Gold Snake (Bottom/Right) */}
                    <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#eab308] border-2 border-[#fef08a] rounded-br-xl rounded-tl-md rounded-bl-md shadow-md">
                      {/* Eye */}
                      <div className="absolute bottom-2 right-2.5 w-2 h-2 bg-[#422006] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Glowing Blue Crystals on Left Wall */}
                <div className="absolute bottom-12 left-10 flex items-end gap-1 pointer-events-none drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
                  <div className="w-4 h-16 bg-gradient-to-t from-[#0284c7] to-[#7dd3fc] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
                  <div className="w-5 h-22 bg-gradient-to-t from-[#0369a1] to-[#38bdf8] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
                  <div className="w-3.5 h-12 bg-gradient-to-t from-[#0284c7] to-[#bae6fd] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
                </div>

                {/* Glowing Blue Crystals on Right Wall */}
                <div className="absolute bottom-12 right-12 flex items-end gap-1 pointer-events-none drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
                  <div className="w-3.5 h-12 bg-gradient-to-t from-[#0284c7] to-[#7dd3fc] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
                  <div className="w-5 h-20 bg-gradient-to-t from-[#0369a1] to-[#38bdf8] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
                </div>

                {/* Wooden Signpost near Sage */}
                <div className="absolute bottom-16 right-36 pointer-events-none flex flex-col items-center">
                  <div className="w-10 h-7 bg-[#451a03] border border-[#78350f] text-[6px] font-pixel text-[#fde047] flex items-center justify-center text-center leading-tight">
                    PEP-8<br/>DOCS
                  </div>
                  <div className="w-2 h-8 bg-[#78350f]" />
                </div>

                {/* Aryan Pixel Character on Left */}
                <div className="absolute bottom-6 left-1/3 flex flex-col items-center pointer-events-none">
                  <div className="w-9 h-14 relative">
                    <div className="absolute top-0 left-1.5 w-6 h-4 bg-[#0f172a]" />
                    <div className="absolute top-4 left-1 w-7 h-5 bg-[#2563eb]" />
                    <div className="absolute top-4 left-3 w-2 h-5 bg-white" />
                    <div className="absolute top-9 left-1.5 w-6 h-5 bg-[#1e293b]" />
                  </div>
                </div>

                {/* Cave Sage NPC on Right (Matches Screenshot) */}
                <div className="absolute bottom-6 right-1/3 flex flex-col items-center pointer-events-none">
                  <div className="w-10 h-16 relative">
                    {/* Pointed Wizard / Sage Hat */}
                    <div className="absolute top-0 left-2 w-6 h-4 bg-[#334155] [clip-path:polygon(50%_0%,100%_100%,0%_100%)]" />
                    <div className="absolute top-3 left-0 w-10 h-1.5 bg-[#475569]" />
                    {/* Long Grey Beard & Face */}
                    <div className="absolute top-4.5 left-2.5 w-5 h-2.5 bg-[#fed7aa]" />
                    <div className="absolute top-7 left-2 w-6 h-5 bg-[#e2e8f0] rounded-b-md" />
                    {/* Grey Robes */}
                    <div className="absolute top-7 left-1 w-8 h-8 bg-[#475569] border-t border-[#64748b]" />
                    {/* Wooden Staff with Blue Gem on top */}
                    <div className="absolute top-1 -right-2 w-1.5 h-15 bg-[#78350f]" />
                    <div className="absolute -top-1 -right-3 w-3 h-3 bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8]" />
                  </div>
                </div>
              </div>

              {/* DIALOGUE BOX (Identical to Reference Screenshot) */}
              <div className="p-5 bg-[#0a101a] border-t-4 border-[#1e2f47] font-pixel">
                <div className="text-[10px] text-[#38bdf8] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>Cave Sage</span>
                  <span className="text-[8px] text-[#64748b] font-sans">
                    (Aldous · Guardian of the Pythonic Arcana)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed mb-4 min-h-[40px]">
                  "{sageQuotes[dialogueStep]}"
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleTellMeMore}
                    className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold border-2 border-[#38bdf8] shadow-[0_3px_0_#075985] text-[9px] flex items-center gap-1.5 cursor-pointer transition-all active:translate-y-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#bae6fd]" />
                    <span>Tell me more!</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('projects');
                    }}
                    className="px-4 py-2.5 bg-[#16253b] hover:bg-[#1f3350] text-[#93c5fd] border-2 border-[#1e2f47] text-[9px] flex items-center gap-1 cursor-pointer transition-all active:translate-y-1"
                  >
                    <span>View Python Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cave Footer Stats */}
            <div className="w-full mt-4 flex items-center justify-between px-4 py-2.5 bg-[#0e1624] border-2 border-[#1e2f47] font-pixel text-[8px] text-[#38bdf8]">
              <span>CORE ARSENAL: PYTHON 3.12 · FASTAPI · PYTORCH · PANDAS</span>
              <span className="text-[#fde047]">PYTHON MASTERY LEVEL: 92%</span>
            </div>
          </div>
        )}

        {/* PYTHON PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#38bdf8] mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>PYTHON ARTIFACTS & ENGINES</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pythonProjects.map((p) => (
                <div
                  key={p.title}
                  className="bg-[#0e1624] p-5 border-2 border-[#1e2f47] shadow-lg flex flex-col justify-between"
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
                  <div className="pt-3 border-t border-[#1e2f47] flex items-center justify-between text-[8px] font-pixel text-[#94a3b8]">
                    <span>STATUS: DEPLOYED</span>
                    <span className="text-emerald-400">READY</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CODE WORKBENCH TAB */}
        {activeTab === 'snippets' && (
          <div className="w-full max-w-4xl bg-[#0a101a] p-5 border-2 border-[#1e2f47] shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1e2f47]">
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
                        : 'bg-[#121c2d] text-[#94a3b8] border-[#1e2f47]'
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

            <pre className="p-4 bg-[#05080f] border border-[#16253b] rounded-sm text-xs text-[#bae6fd] font-mono overflow-x-auto leading-relaxed">
              <code>{codeSnippets[activeSnippetIdx].code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
