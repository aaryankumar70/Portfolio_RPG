import React from 'react';
import { ArrowLeft, Compass, Sparkles, Orbit, Eye, Cpu } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface ObservatoryInteriorProps {
  onBack: () => void;
}

export const ObservatoryInterior: React.FC<ObservatoryInteriorProps> = ({ onBack }) => {
  const directions = [
    {
      title: 'AUTONOMOUS MULTI-AGENT SYSTEMS',
      icon: Cpu,
      desc: 'Investigating recursive reflection, tool invocation safety, and multi-agent coordination frameworks that autonomously test and refine code.'
    },
    {
      title: 'MULTIMODAL EMBEDDINGS & MANIFOLDS',
      icon: Orbit,
      desc: 'Unifying prosodic speech biomarkers, vision features, and text embeddings into metric spaces representing authentic human emotional states.'
    },
    {
      title: 'EDGE AI & LOCAL MODEL INFERENCE',
      icon: Eye,
      desc: 'Low-bit quantization kernels (AWQ, GGUF) and WebGPU runtimes for running high-capability models locally on consumer devices.'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0b0814] text-slate-100 overflow-hidden select-text">
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#140f24] border-b-2 border-[#372459] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#c084fc]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE OBSERVATORY</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#c084fc] tracking-wider">CELESTIAL OBSERVATORY</h1>
          <p className="text-[8px] text-[#a855f7]">FUTURE AI HORIZONS</p>
        </div>

        <div className="text-[9px] text-[#94a3b8]">ESC: BACK</div>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-4 font-sans">
          <div className="pixel-panel bg-[#151026] p-5 border-2 border-[#452875]">
            <h2 className="font-pixel text-sm text-[#fde047] mb-1">GAZING BEYOND THE HORIZON</h2>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Research explorations and experimental prototypes in autonomous agents, multimodal intelligence, and edge inference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {directions.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="pixel-panel bg-[#151026] p-5 border border-[#3b2463] hover:border-[#a855f7] transition-all">
                  <div className="w-9 h-9 bg-[#23153d] border border-[#a855f7] flex items-center justify-center text-[#c084fc] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-pixel text-[9px] text-white mb-2">{d.title}</h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{d.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
