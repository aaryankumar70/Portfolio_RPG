import React from 'react';
import { ArrowLeft, Trophy, Crown, Medal, Award } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface ArenaInteriorProps {
  onBack: () => void;
}

export const ArenaInterior: React.FC<ArenaInteriorProps> = ({ onBack }) => {
  const achievements = [
    {
      title: '1st Place Grand Winner — HackOdyssey 2024',
      badge: 'NATIONAL LEVEL HACKATHON',
      icon: Crown,
      date: 'Dec 2024',
      description: 'Engineered VeriShield ZK, a privacy-preserving zero-knowledge identity credential bridge built with Circom circuits and Groth16 proofs.',
      color: '#eab308'
    },
    {
      title: 'Top 3 Finalist — AI Innovation Summit',
      badge: 'MULTIMODAL AI CATEGORY',
      icon: Trophy,
      date: 'Aug 2024',
      description: 'Showcased MindPulse AI to a jury of ML researchers, demonstrating on-device acoustic stress biomarker extraction without cloud data leakage.',
      color: '#f59e0b'
    },
    {
      title: 'Academic Excellence Award',
      badge: 'UNIVERSITY HONORS',
      icon: Medal,
      date: '2024',
      description: 'Awarded for attaining top rank in undergraduate computer applications with distinction in Data Structures, RDBMS, and Mathematics.',
      color: '#38bdf8'
    },
    {
      title: 'Open Source Vanguard Badge',
      badge: 'COMMUNITY CONTRIBUTOR',
      icon: Award,
      date: '2023 – Present',
      description: 'Author of open-source Python utilities and benchmark tools with active GitHub community stars and forks.',
      color: '#ec4899'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#120c06] text-slate-100 overflow-hidden select-text">
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#1e1308] border-b-2 border-[#452912] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#fde047]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE ARENA</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#fde047] tracking-wider">ACHIEVEMENT ARENA</h1>
          <p className="text-[8px] text-[#fbbf24]">HALL OF TRIUMPHS & HACKATHONS</p>
        </div>

        <div className="text-[9px] text-[#94a3b8]">ESC: BACK</div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.title}
                className="pixel-panel bg-[#1a1107] p-5 border-2 border-[#543315] hover:border-[#fde047] transition-all flex gap-4"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center shrink-0 border border-white/10"
                  style={{ backgroundColor: `${ach.color}20`, color: ach.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1 font-pixel text-[7px]">
                    <span className="text-[#fde047]">{ach.badge}</span>
                    <span className="text-[#a88265]">{ach.date}</span>
                  </div>
                  <h3 className="font-pixel text-xs text-white mb-1.5">{ach.title}</h3>
                  <p className="text-xs text-[#cbd5e1] font-sans leading-relaxed">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
