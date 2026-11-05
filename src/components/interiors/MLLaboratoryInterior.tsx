import React, { useState } from 'react';
import { Cpu, Sparkles, Brain, Network, X, Play, CheckCircle, Eye, Activity, Terminal, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';

interface MLLaboratoryInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const MLLaboratoryInterior: React.FC<MLLaboratoryInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [activeTab, setActiveTab] = useState<'chamber' | 'inference' | 'models'>('chamber');
  const [inputText, setInputText] = useState<string>('I am extremely excited about deploying multimodal AI models into production!');
  const [inferenceResult, setInferenceResult] = useState<{
    sentiment: string;
    confidence: number;
    embeddingVector: number[];
  } | null>(null);
  const [corePulsing, setCorePulsing] = useState<boolean>(false);
  const [lyraQuoteIdx, setLyraQuoteIdx] = useState<number>(0);

  const lyraQuotes = [
    "Neural embeddings map continuous semantic thought into high-dimensional geometries. In this chamber, concepts become vectors.",
    "Aryan's multimodal architecture fuses image patches and textual tokens with cross-attention layers, reaching 94.2% top-1 accuracy!",
    "Observe the floating neural core: that represents a fine-tuned CLIP model running zero-shot inference in under 18 milliseconds.",
    "Clean data curation is the bedrock of machine learning. Garbage in, garbage out—even for 70-billion-parameter transformers."
  ];

  const handlePulseCore = () => {
    soundManager.playCrystalChime();
    setCorePulsing(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#38bdf8', '#a855f7', '#f472b6']
    });
    setTimeout(() => setCorePulsing(false), 900);
    if (onGainXp) onGainXp(25);
  };

  const handleRunInference = () => {
    soundManager.playCrystalChime();
    setInferenceResult({
      sentiment: 'POSITIVE (High Energy & Technical Curiosity)',
      confidence: 0.984,
      embeddingVector: [0.842, -0.194, 0.521, 0.912, -0.402, 0.731]
    });
    if (onGainXp) onGainXp(20);
  };

  const models = [
    {
      name: 'Multimodal Transformer (CLIP-Based)',
      type: 'Vision-Language Cross-Attention',
      metrics: 'Top-1 Accuracy: 94.2% · Latency: 18ms',
      desc: 'Jointly maps image patches and token embeddings into a unified metric space for zero-shot image classification and retrieval.',
      tech: 'PyTorch · HuggingFace · Vision Transformer (ViT)'
    },
    {
      name: 'Bi-Directional Acoustic & Text Classifier',
      type: 'Emotion & Vocal Biomarker Classifier',
      metrics: 'F1 Score: 0.91 · Low False Negative Rate',
      desc: 'Evaluates vocal biomarkers and transcript semantics to provide empathetic support feedback and mental state analysis.',
      tech: 'Torchaudio · RoBERTa · FastAPI'
    },
    {
      name: 'Prophet & LSTM Hybrid Forecaster',
      type: 'Time Series Demand Regression',
      metrics: 'MAPE: 3.8% across seasonal cohorts',
      desc: 'Predicts future sales volume and supply chain inventory depletion curves with automated hyperparameter tuning.',
      tech: 'Python · Pandas · Prophet · PyTorch LSTM'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0d0714] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#180a24] border-b-2 border-[#3d1858] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#2a1040] border border-[#ec4899] flex items-center justify-center text-[#ec4899] shadow-inner">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#f472b6] tracking-wider uppercase flex items-center gap-2">
              <span>ML LABORATORY</span>
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#e9d5ff] font-sans">
              Chief Neural Researcher Dr. Lyra · Deep Learning & Transformers
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('chamber'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'chamber'
                ? 'bg-[#db2777] text-white font-bold border-[#fbcfe8] shadow-[0_0_10px_rgba(219,39,119,0.5)]'
                : 'bg-[#220d33] text-[#c084fc] border-[#3d1858] hover:text-white'
            }`}
          >
            <span>🔬</span>
            <span>LAB CHAMBER</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('inference'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'inference'
                ? 'bg-[#db2777] text-white font-bold border-[#fbcfe8] shadow-[0_0_10px_rgba(219,39,119,0.5)]'
                : 'bg-[#220d33] text-[#c084fc] border-[#3d1858] hover:text-white'
            }`}
          >
            <span>⚡</span>
            <span>INFERENCE BENCH</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('models'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'models'
                ? 'bg-[#db2777] text-white font-bold border-[#fbcfe8] shadow-[0_0_10px_rgba(219,39,119,0.5)]'
                : 'bg-[#220d33] text-[#c084fc] border-[#3d1858] hover:text-white'
            }`}
          >
            <span>🧠</span>
            <span>ARCHITECTURES</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#2a1040] hover:bg-[#3d1858] text-[#f472b6] border border-[#ec4899]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING PIXEL ART LAB CHAMBER */}
      {activeTab === 'chamber' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#3d1858] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#13071f]">
            {/* The Pixel Art Laboratory Room Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#13071f]">
              <img
                src="/assets/interiors/ml_lab_room.png"
                alt="ML Laboratory Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Glow Overlays */}
              <div className="absolute inset-0 bg-radial from-pink-500/10 via-transparent to-black/40 pointer-events-none" />
              {corePulsing && (
                <div className="absolute inset-0 bg-pink-600/25 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters Standing in the Laboratory */}
              {/* Dr. Lyra Researcher NPC */}
              <div
                onClick={() => {
                  soundManager.playCrystalChime();
                  setLyraQuoteIdx((prev) => (prev + 1) % lyraQuotes.length);
                }}
                className="absolute bottom-[24%] right-[32%] flex flex-col items-center cursor-pointer group z-10"
                title="Dr. Lyra (Click to talk)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#0f0a1c]/90 border border-[#f472b6] text-[7px] font-pixel text-[#fbcfe8] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Talk to Dr. Lyra
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/researcher_idle.png"
                    alt="Dr. Lyra"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#200d33] text-[#f472b6] border border-[#ec4899] mt-0.5">
                  Dr. Lyra
                </span>
              </div>

              {/* Aryan Character (Beside Workbench inspecting neural weights) */}
              <div className="absolute bottom-[22%] left-[22%] flex flex-col items-center z-10 pointer-events-none">
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
                className="absolute bottom-[20%] left-[42%] flex flex-col items-center cursor-pointer group z-10"
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
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#200d33] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. NEURAL CORE HOTSPOT */}
              <button
                onClick={handlePulseCore}
                className={`absolute top-[28%] left-1/2 -translate-x-1/2 w-28 h-36 bg-pink-500/10 hover:bg-pink-500/30 border-2 border-dashed border-[#ec4899] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20 ${
                  corePulsing ? 'scale-105 bg-pink-500/40' : 'hover:scale-105'
                }`}
                title="Neural Core (Click to pulse vector embeddings!)"
              >
                <Brain className="w-6 h-6 text-[#f472b6] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#fbcfe8] mt-1 bg-black/80 px-1 border border-pink-600">
                  PULSE CORE
                </span>
              </button>

              {/* 2. INFERENCE BENCH HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('inference'); }}
                className="absolute bottom-[24%] left-[12%] w-24 h-16 bg-blue-500/10 hover:bg-blue-500/25 border-2 border-dashed border-[#38bdf8] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Inference Bench (Click to benchmark live model)"
              >
                <Play className="w-5 h-5 text-[#38bdf8]" />
                <span className="text-[6px] font-pixel text-[#bae6fd] mt-0.5 bg-black/80 px-1 border border-sky-700">
                  TEST BENCH
                </span>
              </button>

              {/* 3. SERVER MATRIX HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('models'); }}
                className="absolute top-[38%] right-[12%] w-28 h-24 bg-purple-500/10 hover:bg-purple-500/25 border-2 border-dashed border-[#a855f7] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Server Matrix (Click to view architectures)"
              >
                <Network className="w-5 h-5 text-[#c084fc] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#e9d5ff] mt-0.5 bg-black/80 px-1 border border-purple-700">
                  ARCHITECTURES
                </span>
              </button>
            </div>
          </div>

          {/* Bottom RPG Dialogue Console */}
          <div className="w-full mt-4 bg-[#180a24] border-2 border-[#3d1858] p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border border-[#ec4899] bg-[#2a1040] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/npcs/researcher_idle.png"
                  alt="Dr. Lyra"
                  className="w-10 h-10 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <span className="font-pixel text-[9px] text-[#f472b6] tracking-wider block">
                  DR. LYRA · CHIEF NEURAL RESEARCHER
                </span>
                <p className="text-xs text-slate-200 mt-0.5 max-w-2xl leading-relaxed">
                  "{lyraQuotes[lyraQuoteIdx]}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-pixel text-[8px]">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setLyraQuoteIdx((prev) => (prev + 1) % lyraQuotes.length);
                }}
                className="px-3 py-2 bg-[#2a1040] hover:bg-[#3d1858] text-[#f472b6] border border-[#ec4899]/50 transition-colors"
              >
                NEXT RESEARCH NOTE
              </button>
              <button
                onClick={handlePulseCore}
                className="px-3 py-2 bg-[#db2777] hover:bg-[#be185d] text-white font-bold border border-[#fbcfe8] shadow-[0_0_10px_rgba(219,39,119,0.5)] transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>PULSE CORE (+25 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: LIVE INFERENCE BENCHMARK */}
      {activeTab === 'inference' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl space-y-6">
            <div className="bg-[#180a24] p-6 border-4 border-[#3d1858] shadow-xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3d1858]">
                <h3 className="font-pixel text-xs text-[#f472b6] flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#ec4899]" />
                  <span>INTERACTIVE NEURAL INFERENCE BENCHMARK</span>
                </h3>
                <span className="text-[8px] font-pixel text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-500">
                  MODEL ONLINE (ViT-CLIP)
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <label className="text-xs text-slate-300 font-sans block">
                  Input Text for Emotion / Sentiment Embeddings:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-[#100619] border border-[#3d1858] px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#ec4899]"
                    placeholder="Enter sentence to classify..."
                  />
                  <button
                    onClick={handleRunInference}
                    className="font-pixel text-[9px] px-4 py-2 bg-[#db2777] hover:bg-[#be185d] text-white flex items-center gap-1.5 transition-colors border border-[#fbcfe8]"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>RUN INFERENCE</span>
                  </button>
                </div>
              </div>

              {inferenceResult && (
                <div className="p-4 bg-[#100619] border border-[#ec4899]/50 rounded animate-in fade-in space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Classified Sentiment:</span>
                    <span className="font-bold text-[#f472b6]">{inferenceResult.sentiment}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Model Confidence:</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {(inferenceResult.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">
                      Normalized Embedding Vector Projection (6D slice):
                    </span>
                    <div className="grid grid-cols-6 gap-2">
                      {inferenceResult.embeddingVector.map((val, idx) => (
                        <div key={idx} className="bg-[#1f0d30] p-1.5 text-center border border-[#3d1858]">
                          <span className="block text-[8px] text-slate-400">Dim {idx}</span>
                          <span className="text-[10px] font-mono text-[#38bdf8]">{val.toFixed(3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: MODEL ARCHITECTURES */}
      {activeTab === 'models' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#f472b6] mb-3 flex items-center gap-2">
              <Network className="w-4 h-4 text-[#ec4899]" />
              <span>PRODUCTION DEEP LEARNING ARCHITECTURES</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {models.map((m, idx) => (
                <div key={idx} className="bg-[#180a24] p-5 border-2 border-[#3d1858] flex flex-col justify-between">
                  <div>
                    <div className="font-pixel text-[9px] text-[#f472b6] mb-1">{m.type}</div>
                    <h4 className="font-bold text-sm text-white mb-2">{m.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{m.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-[#3d1858] space-y-1 text-[10px]">
                    <span className="text-[#38bdf8] font-mono block">{m.metrics}</span>
                    <span className="text-slate-400 block">{m.tech}</span>
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
