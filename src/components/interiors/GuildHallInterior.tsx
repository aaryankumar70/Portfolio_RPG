import React, { useState } from 'react';
import { ArrowLeft, Compass, GraduationCap, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface GuildHallInteriorProps {
  onBack: () => void;
}

export const GuildHallInterior: React.FC<GuildHallInteriorProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'journey' | 'education' | 'interests'>('journey');

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0c0817] text-slate-100 overflow-hidden select-text">
      {/* 1. TOP PIXEL NAVIGATION BAR */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#140b24] border-b-2 border-[#86198f] shadow-lg font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="px-3 py-1.5 flex items-center gap-2 text-[9px] bg-[#1e0f33] hover:bg-[#2b164a] text-[#22d3ee] border border-[#22d3ee] cursor-pointer transition-all active:translate-y-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE GUILD HALL</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#fdf4ff] tracking-wider">GUILD CITADEL</h1>
          <p className="text-[8px] text-[#22d3ee]">HEADQUARTERS & PROFILE</p>
        </div>

        <div className="text-[9px] text-[#a855f7]">[ESC] RETURN</div>
      </header>

      {/* 2. MAIN INTERIOR ENVIRONMENT CONTAINER */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        {/* PIXEL ROOM ENVIRONMENT BACKDROP */}
        <div className="w-full max-w-4xl bg-[#140b24] p-6 sm:p-8 mb-6 border-2 border-[#22d3ee] relative overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          {/* Decorative Pixel Heraldry Banners on Hall Walls */}
          <div className="flex justify-between items-start mb-6 pb-6 border-b-2 border-[#3b1254]">
            <div className="flex items-center gap-4">
              {/* Pixel Character Guild Portrait */}
              <div className="w-16 h-16 bg-[#1f1035] border-2 border-[#22d3ee] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <div className="w-10 h-10 bg-[#86198f] relative">
                  <div className="w-7 h-5 bg-[#0f172a] mx-auto" />
                  <div className="w-4 h-1.5 bg-[#22d3ee] absolute top-2 left-3 shadow-[0_0_6px_#22d3ee]" />
                </div>
              </div>

              <div>
                <div className="text-[9px] font-pixel text-[#22d3ee] bg-[#220d38] px-2 py-0.5 inline-block border border-[#22d3ee]/60 mb-1">
                  MCA (DATA SCIENCE) · AI DEVELOPER
                </div>
                <h2 className="text-xl sm:text-2xl font-pixel font-bold text-white tracking-wide">
                  TheDevNomad
                </h2>
                <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans mt-1 max-w-xl leading-relaxed">
                  Data scientist, full-stack engineer and algorithmic problem solver crafting multimodal AI architectures, semantic search systems, and high-throughput data pipelines.
                </p>
              </div>
            </div>

            {/* Fireplace pixel accent */}
            <div className="hidden sm:flex flex-col items-center p-2 bg-[#220d38] border border-[#f43f5e]/50">
              <div className="w-8 h-6 bg-[#f43f5e] flex items-center justify-center relative shadow-[0_0_12px_#f43f5e]">
                <div className="w-5 h-4 bg-[#f97316]" />
                <div className="w-2 h-2 bg-[#fef08a]" />
              </div>
              <span className="text-[7px] font-pixel text-[#fef08a] mt-1">HEARTH</span>
            </div>
          </div>

          {/* Authentic Pixel Tab Navigation */}
          <div className="flex gap-2 mb-6 font-pixel">
            <button
              onClick={() => { soundManager.playClick(); setActiveTab('journey'); }}
              className={`px-4 py-2 text-[9px] transition-all cursor-pointer ${activeTab === 'journey' ? 'bg-[#86198f] text-white border-2 border-[#22d3ee] font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'bg-[#1b0d2e] text-[#a855f7] border border-[#3b1254]'}`}
            >
              MY JOURNEY
            </button>
            <button
              onClick={() => { soundManager.playClick(); setActiveTab('education'); }}
              className={`px-4 py-2 text-[9px] transition-all cursor-pointer ${activeTab === 'education' ? 'bg-[#86198f] text-white border-2 border-[#22d3ee] font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'bg-[#1b0d2e] text-[#a855f7] border border-[#3b1254]'}`}
            >
              EDUCATION
            </button>
            <button
              onClick={() => { soundManager.playClick(); setActiveTab('interests'); }}
              className={`px-4 py-2 text-[9px] transition-all cursor-pointer ${activeTab === 'interests' ? 'bg-[#86198f] text-white border-2 border-[#22d3ee] font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]' : 'bg-[#1b0d2e] text-[#a855f7] border border-[#3b1254]'}`}
            >
              INTERESTS
            </button>
          </div>

          {/* TAB 1: JOURNEY & TIMELINE */}
          {activeTab === 'journey' && (
            <div className="space-y-6 font-sans">
              <div className="bg-[#101420] p-4 border border-[#232a3f]">
                <h3 className="font-pixel text-[10px] text-[#fde047] mb-2 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#fde047]" />
                  THE DEVELOPER'S ORIGIN
                </h3>
                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  My quest began with curiosity about how mathematical structures translate into autonomous intelligent programs. Specializing in Data Science at the postgraduate level, I combine deep theoretical modeling (PyTorch, transformers, embeddings) with robust production engineering (FastAPI, SQL, Docker, React) to build accessible solutions.
                </p>
              </div>

              {/* Pixel Timeline */}
              <div className="border-l-2 border-[#d4af37] ml-2 pl-4 space-y-6">
                <div>
                  <span className="font-pixel text-[8px] text-[#fde047] bg-[#271b0b] px-2 py-0.5 border border-[#d4af37]/40">
                    2024 — PRESENT
                  </span>
                  <h4 className="font-pixel text-xs text-white mt-1">Master of Computer Applications (Data Science)</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Researching multimodal representations, self-attention mechanisms, and developing MindPulse AI and Lost & Found AI.
                  </p>
                </div>

                <div>
                  <span className="font-pixel text-[8px] text-[#38bdf8] bg-[#0c1e2e] px-2 py-0.5 border border-[#38bdf8]/40">
                    2021 — 2024
                  </span>
                  <h4 className="font-pixel text-xs text-white mt-1">Bachelor of Computer Applications (BCA)</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    First Class Distinction. Foundational mastery in Data Structures, Relational Databases, Algorithms, and Systems Architecture.
                  </p>
                </div>

                <div>
                  <span className="font-pixel text-[8px] text-[#a855f7] bg-[#1a0f2b] px-2 py-0.5 border border-[#a855f7]/40">
                    COMPETITIVE HACKATHONS
                  </span>
                  <h4 className="font-pixel text-xs text-white mt-1">1st Place Hackathon Winner</h4>
                  <p className="text-xs text-[#94a3b8] mt-0.5">
                    Champion at HackOdyssey 2024 for VeriShield ZK, alongside multiple high-ranking prototype finishes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
              <div className="bg-[#101420] p-4 border border-[#232a3f]">
                <div className="flex items-center gap-2 mb-2 font-pixel text-xs text-[#fde047]">
                  <GraduationCap className="w-4 h-4 text-[#fde047]" />
                  <span>MCA (DATA SCIENCE)</span>
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed mb-3">
                  Comprehensive graduate coursework covering Machine Learning, Neural Networks with PyTorch, Natural Language Processing, Big Data Engineering, and Statistical Inference.
                </p>
                <div className="flex flex-wrap gap-1 font-pixel text-[7px]">
                  {['ML', 'PYTORCH', 'NLP', 'STATISTICS', 'BIG DATA'].map(t => (
                    <span key={t} className="bg-[#192238] text-[#38bdf8] px-1.5 py-0.5 border border-[#2b3a5e]">{t}</span>
                  ))}
                </div>
              </div>

              <div className="bg-[#101420] p-4 border border-[#232a3f]">
                <div className="flex items-center gap-2 mb-2 font-pixel text-xs text-[#38bdf8]">
                  <BookOpen className="w-4 h-4 text-[#38bdf8]" />
                  <span>BCA (UNDERGRADUATE)</span>
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed mb-3">
                  Graduated with First Class Distinction. Rigorous grounding in C/C++, Data Structures, RDBMS, Computer Networks, and Software Engineering.
                </p>
                <div className="flex flex-wrap gap-1 font-pixel text-[7px]">
                  {['DATA STRUCTURES', 'SQL', 'C/C++', 'RDBMS', 'ALGORITHMS'].map(t => (
                    <span key={t} className="bg-[#192238] text-[#fde047] px-1.5 py-0.5 border border-[#2b3a5e]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERESTS */}
          {activeTab === 'interests' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
              <div className="bg-[#101420] p-4 border border-[#232a3f] text-center">
                <div className="w-8 h-8 bg-[#2a1c0d] border border-[#d4af37] mx-auto mb-2 flex items-center justify-center text-[#d4af37]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-pixel text-[9px] text-[#fde047] mb-1">MULTIMODAL AI</h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Fusing acoustic speech biomarkers, vision features, and text embeddings into unified reasoning agents.
                </p>
              </div>

              <div className="bg-[#101420] p-4 border border-[#232a3f] text-center">
                <div className="w-8 h-8 bg-[#0c1e2e] border border-[#38bdf8] mx-auto mb-2 flex items-center justify-center text-[#38bdf8]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-pixel text-[9px] text-[#38bdf8] mb-1">DATA PIPELINES</h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Architecting resilient SQL/Python ETL flows and interactive executive Power BI dashboards.
                </p>
              </div>

              <div className="bg-[#101420] p-4 border border-[#232a3f] text-center">
                <div className="w-8 h-8 bg-[#1f1015] border border-[#f43f5e] mx-auto mb-2 flex items-center justify-center text-[#f43f5e]">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="font-pixel text-[9px] text-[#f43f5e] mb-1">INDIE RETRO GAMES</h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Pixel art environments, 60fps canvas engines, procedural Web Audio generation, and game design.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
