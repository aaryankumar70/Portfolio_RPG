import React, { useState } from 'react';
import { Shield, Sparkles, X, CheckSquare, Award, Compass, GraduationCap, ChevronRight } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';
import { INITIAL_QUESTS, ARYAN_STATS } from '../../data/portfolioData';

interface GuildHallInteriorProps {
  onBack: () => void;
  onOpenQuests?: () => void;
}

export const GuildHallInterior: React.FC<GuildHallInteriorProps> = ({
  onBack,
  onOpenQuests
}) => {
  const [activeTab, setActiveTab] = useState<'board' | 'journey' | 'hallOfFame'>('board');

  const journeyMilestones = [
    {
      year: '2024 – 2026',
      title: 'Master of Computer Applications (MCA) in Data Science',
      desc: 'Specialized in deep learning architectures, time-series forecasting, distributed databases, and high-performance AI inference pipelines.'
    },
    {
      year: '2024',
      title: 'Multimodal AI Innovation & Hackathon Champion',
      desc: 'Engineered MindPulse AI & VeriShield ZK, presenting real-time acoustic biomarker and zero-knowledge proof implementations.'
    },
    {
      year: '2021 – 2024',
      title: 'Bachelor of Computer Applications (BCA)',
      desc: 'Graduated with academic distinction, mastering C++, Python, Data Structures & Algorithms, and Relational Database Management Systems.'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0d0714] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#170c24] border-b-2 border-[#3b1759] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#27103d] border border-[#a855f7] flex items-center justify-center text-[#a855f7]">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#c084fc] tracking-wider uppercase">
            GUILD HALL
          </h1>
          <span className="text-[8px] text-[#e9d5ff] hidden sm:inline">
            · Quests Board & Developer Journey
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('board'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'board'
                ? 'bg-[#7e22ce] text-white font-bold border-[#e9d5ff]'
                : 'bg-[#27103d] text-[#c084fc] border-[#3b1759] hover:text-white'
            }`}
          >
            QUESTS BOARD
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('journey'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'journey'
                ? 'bg-[#7e22ce] text-white font-bold border-[#e9d5ff]'
                : 'bg-[#27103d] text-[#c084fc] border-[#3b1759] hover:text-white'
            }`}
          >
            ARYAN'S JOURNEY
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#27103d] hover:bg-[#3d185e] text-[#c084fc] border border-[#a855f7]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN GUILD CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {activeTab === 'board' && (
          <div className="w-full max-w-4xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#3b1759]">
              <h3 className="font-pixel text-xs text-[#c084fc] flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#a855f7]" />
                <span>ACTIVE & AVAILABLE GUILD QUESTS</span>
              </h3>
              <span className="font-pixel text-[8px] text-[#fde047]">
                COMPLETED: {INITIAL_QUESTS.filter(q => q.completed).length} / {INITIAL_QUESTS.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_QUESTS.map((q) => (
                <div
                  key={q.id}
                  className={`p-4 border-2 shadow-md flex flex-col justify-between ${
                    q.completed
                      ? 'bg-[#150a22]/70 border-emerald-500/50'
                      : 'bg-[#1a0c2c] border-[#3b1759]'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-1 font-pixel text-[8px]">
                      <span className="text-[#f59e0b]">{q.difficulty}</span>
                      <span className={q.completed ? 'text-emerald-400' : 'text-[#c084fc]'}>
                        {q.completed ? 'COMPLETED' : 'IN PROGRESS'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{q.title}</h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                      {q.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#3b1759] flex items-center justify-between font-pixel text-[8px]">
                    <span className="text-[#fde047]">REWARD: +{q.rewardXp} XP</span>
                    <span className="text-slate-400">LOC: {(q.buildingId || 'TOWN').toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'journey' && (
          <div className="w-full max-w-3xl bg-[#170b28] p-6 sm:p-8 border-4 border-[#3b1759] shadow-2xl">
            <h3 className="font-pixel text-xs text-[#c084fc] mb-6 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#a855f7]" />
              <span>CHRONOLOGICAL ADVENTURE LOG</span>
            </h3>

            <div className="relative pl-6 border-l-2 border-[#a855f7]/60 space-y-6">
              {journeyMilestones.map((m, idx) => (
                <div key={idx} className="relative">
                  {/* Glowing timeline node */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#7e22ce] border-2 border-[#c084fc] shadow-[0_0_8px_#c084fc]" />
                  <span className="font-pixel text-[8px] text-[#f59e0b] block mb-1">
                    {m.year}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-1">{m.title}</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
