import React, { useState } from 'react';
import { Cpu, Sparkles, Brain, Network, X, Play, CheckCircle } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface MLLaboratoryInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const MLLaboratoryInterior: React.FC<MLLaboratoryInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [inputText, setInputText] = useState<string>('I am extremely excited about deploying multimodal AI models into production!');
  const [inferenceResult, setInferenceResult] = useState<{
    sentiment: string;
    confidence: number;
    embeddingVector: number[];
  } | null>(null);

  const handleRunInference = () => {
    soundManager.playCrystalChime();
    setInferenceResult({
      sentiment: 'POSITIVE (High Energy & Enthusiasm)',
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
      desc: 'Jointly maps image patches and token embeddings into a unified metric space for zero-shot image classification.'
    },
    {
      name: 'Bi-Directional Acoustic & Text Classifier',
      type: 'Mental Health Emotion Classifier',
      metrics: 'F1 Score: 0.91 · Low False Negative Rate',
      desc: 'Evaluates vocal biomarkers and transcript semantics to provide empathetic support feedback.'
    },
    {
      name: 'Prophet & LSTM Hybrid Forecaster',
      type: 'Time Series Regression',
      metrics: 'MAPE: 3.8% across seasonal cohorts',
      desc: 'Predicts future sales volume and supply chain inventory depletion curves.'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#110715] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#200c28] border-b-2 border-[#451854] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#331140] border border-[#ec4899] flex items-center justify-center text-[#ec4899]">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#f472b6] tracking-wider uppercase">
            ML LABORATORY
          </h1>
          <span className="text-[8px] text-[#fbcfe8] hidden sm:inline">
            · AI, Neural Embeddings & Transformers
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#331140] hover:bg-[#4a185e] text-[#f472b6] border border-[#ec4899]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN LAB CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl space-y-6">
          {/* INTERACTIVE INFERENCE BENCH */}
          <div className="bg-[#1a0a22] p-6 border-4 border-[#451854] shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#451854]">
              <h3 className="font-pixel text-xs text-[#f472b6] flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#ec4899]" />
                <span>INTERACTIVE NEURAL INFERENCE BENCHMARK</span>
              </h3>
              <span className="text-[8px] font-pixel text-emerald-400">MODEL ONLINE</span>
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
                  className="flex-1 px-3 py-2 bg-[#0e0413] border border-[#451854] text-xs text-white outline-none focus:border-[#ec4899]"
                />
                <button
                  onClick={handleRunInference}
                  className="px-4 py-2 bg-[#db2777] hover:bg-[#be185d] text-white font-pixel text-[8px] border border-[#fbcfe8] flex items-center gap-1.5 cursor-pointer active:translate-y-0.5"
                >
                  <Play className="w-3 h-3 text-[#fde047] fill-[#fde047]" />
                  <span>INFER</span>
                </button>
              </div>
            </div>

            {inferenceResult && (
              <div className="p-4 bg-[#0d0412] border border-[#db2777]/50 rounded-sm font-mono text-xs text-slate-200 animate-in fade-in">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#f472b6] font-bold">PREDICTED CLASSIFICATION:</span>
                  <span className="text-emerald-400 font-pixel text-[9px]">
                    CONFIDENCE: {(inferenceResult.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <p className="text-white font-bold mb-3">{inferenceResult.sentiment}</p>
                <div className="text-[10px] text-slate-400">
                  <span className="text-[#a855f7] block mb-1">EMBEDDING VECTOR (First 6 dims):</span>
                  <code>[{inferenceResult.embeddingVector.join(', ')}...]</code>
                </div>
              </div>
            )}
          </div>

          {/* PRODUCTION ARCHITECTURES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {models.map((m) => (
              <div key={m.name} className="p-4 bg-[#180920] border-2 border-[#451854] shadow-md flex flex-col justify-between">
                <div>
                  <span className="text-[7px] font-pixel text-[#f59e0b] block mb-1">{m.type}</span>
                  <h4 className="font-bold text-white text-sm mb-2 leading-tight">{m.name}</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">{m.desc}</p>
                </div>
                <div className="pt-2 border-t border-[#451854] text-[8px] font-pixel text-[#f472b6]">
                  {m.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
