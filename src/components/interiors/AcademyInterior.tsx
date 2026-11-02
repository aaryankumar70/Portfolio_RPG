import React from 'react';
import { ArrowLeft, GraduationCap, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface AcademyInteriorProps {
  onBack: () => void;
}

export const AcademyInterior: React.FC<AcademyInteriorProps> = ({ onBack }) => {
  return (
    <div className="relative w-full h-full flex flex-col bg-[#081017] text-slate-100 overflow-hidden select-text">
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#0e1d2b] border-b-2 border-[#1c3e5c] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#38bdf8]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE ACADEMY</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#38bdf8] tracking-wider">GRAND ACADEMY</h1>
          <p className="text-[8px] text-[#7dd3fc]">ACADEMIC HONORS & DEGREES</p>
        </div>

        <div className="text-[9px] text-[#94a3b8]">ESC: BACK</div>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
          <div className="pixel-panel bg-[#0d1c29] p-5 border-2 border-[#1f4b73]">
            <span className="font-pixel text-[8px] text-[#38bdf8] bg-[#082238] px-2 py-0.5 border border-[#38bdf8]/40 inline-block mb-2">
              2024 — PRESENT · ACTIVE DEGREE
            </span>
            <h3 className="font-pixel text-xs text-white mb-1">
              Master of Computer Applications (MCA)
            </h3>
            <p className="text-xs text-[#38bdf8] font-semibold mb-3">Specialization in Data Science</p>
            <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
              Advanced graduate program diving into machine learning mathematics, neural architectures, distributed databases, and high-performance analytical pipelines.
            </p>
            <ul className="space-y-1.5 text-xs text-[#cbd5e1]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" /> Advanced Machine Learning & Deep Learning</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" /> Big Data Frameworks & Predictive Analytics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" /> Natural Language Processing & Computer Vision</li>
            </ul>
          </div>

          <div className="pixel-panel bg-[#0d1c29] p-5 border-2 border-[#1f4b73]">
            <span className="font-pixel text-[8px] text-emerald-400 bg-[#08291c] px-2 py-0.5 border border-emerald-400/40 inline-block mb-2">
              2021 — 2024 · FIRST CLASS DISTINCTION
            </span>
            <h3 className="font-pixel text-xs text-white mb-1">
              Bachelor of Computer Applications (BCA)
            </h3>
            <p className="text-xs text-[#38bdf8] font-semibold mb-3">Undergraduate Computer Applications</p>
            <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
              Graduated with distinction. Comprehensive studies covering algorithmic complexity, discrete mathematics, relational databases, and systems engineering.
            </p>
            <ul className="space-y-1.5 text-xs text-[#cbd5e1]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" /> Data Structures & Algorithms in C/C++</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" /> Database Management Systems & SQL Queries</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" /> Software Engineering & Web Architectures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
