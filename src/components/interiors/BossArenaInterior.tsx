import React, { useState } from 'react';
import { Swords, Shield, ExternalLink, Github, Play, CheckCircle2, X, Award, Flame, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';
import { MAJOR_PROJECTS } from '../../data/portfolioData';

interface BossArenaInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const BossArenaInterior: React.FC<BossArenaInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [selectedBossIdx, setSelectedBossIdx] = useState<number>(0);
  const [battleReport, setBattleReport] = useState<string | null>(null);

  const currentBoss = MAJOR_PROJECTS[selectedBossIdx];

  const handleSimulateBattle = () => {
    soundManager.playAnvilClink();
    soundManager.playLevelUp();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#38bdf8', '#ffffff']
    });

    setBattleReport(
      `⚔ BATTLE REPORT: "${currentBoss.title}" DEFEATED!
✦ Architecture verified: Scalable microservices & clean data models.
✦ Stress test passed: 10,000 synthetic requests handled under 25ms.
✦ Reward: +150 XP awarded to Aryan!`
    );

    if (onGainXp) onGainXp(150);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#120709] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#220d11] border-b-2 border-[#471720] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#381119] border border-[#f43f5e] flex items-center justify-center text-[#f43f5e]">
            <Swords className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#fb7185] tracking-wider uppercase">
            BOSS ARENA
          </h1>
          <span className="text-[8px] text-[#fecdd3] hidden sm:inline">
            · Major Project Battles & Architectural Showdowns
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#381119] hover:bg-[#4f1823] text-[#fb7185] border border-[#f43f5e]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN ARENA CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl bg-[#1a0a0f] border-4 border-[#471720] shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row overflow-hidden">
          {/* LEFT: BOSS SELECTION ROSTER */}
          <div className="w-full md:w-80 p-5 bg-[#14070b] border-b-4 md:border-b-0 md:border-r-4 border-[#471720] flex flex-col justify-between font-pixel">
            <div>
              <div className="pb-3 mb-3 border-b-2 border-[#381119] flex items-center justify-between">
                <h3 className="text-xs text-[#fb7185] tracking-wider uppercase flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#ef4444]" />
                  <span>PROJECT ROSTER</span>
                </h3>
                <span className="text-[8px] text-slate-400 font-sans">4 Major Bosses</span>
              </div>

              <div className="space-y-2">
                {MAJOR_PROJECTS.map((p, idx) => {
                  const isSelected = selectedBossIdx === idx;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedBossIdx(idx);
                        setBattleReport(null);
                      }}
                      className={`p-3 cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#e11d48] text-white border-[#fecdd3] shadow-md'
                          : 'bg-[#220c12] text-[#cbd5e1] border-[#381119] hover:bg-[#2b0f17]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold leading-tight">{p.title}</span>
                        <span className="text-[9px] text-[#fde047]">{p.difficulty || 'Boss'}</span>
                      </div>
                      <div className="text-[8px] text-slate-300 font-sans truncate">
                        {(p.tags || p.technologies || []).slice(0, 3).join(' · ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#381119] text-[8px] text-slate-400">
              <span>STATUS: PRODUCTION TESTED</span>
            </div>
          </div>

          {/* RIGHT: ACTIVE BOSS INSPECTOR & BATTLE ARENA */}
          <div className="flex-1 p-6 bg-[#1f0d13] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 mb-4 border-b-2 border-[#381119] gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-pixel text-[#f59e0b] px-2 py-0.5 bg-[#2b0f17] border border-[#f59e0b]/40">
                      BOSS ENCOUNTER
                    </span>
                    <span className="text-[8px] font-pixel text-[#fb7185]">
                      {currentBoss.category.toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{currentBoss.title}</h2>
                  <p className="text-xs text-[#f43f5e] font-sans mt-0.5">{currentBoss.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSimulateBattle}
                    className="px-4 py-2 bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:brightness-110 text-white font-pixel text-[8px] border border-[#fecdd3] flex items-center gap-1.5 cursor-pointer shadow-md active:translate-y-0.5"
                  >
                    <Swords className="w-3.5 h-3.5 text-[#fde047]" />
                    <span>CHALLENGE BOSS</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-200 font-sans leading-relaxed mb-4">
                {currentBoss.longDescription || currentBoss.description}
              </p>

              {/* Tech Stack Badges */}
              <div className="mb-4">
                <span className="text-[8px] font-pixel text-[#f59e0b] block mb-1.5 uppercase">
                  ARMAMENT & TECH STACK
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {(currentBoss.tags || currentBoss.technologies || []).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#2b0f17] border border-[#f43f5e]/40 text-[#fecdd3]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Battle Report Result Banner */}
              {battleReport && (
                <div className="p-4 bg-[#120508] border-2 border-emerald-500/60 font-mono text-xs text-emerald-300 whitespace-pre-line leading-relaxed animate-in fade-in mb-4">
                  {battleReport}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="pt-4 border-t border-[#381119] flex items-center justify-between text-xs">
              <div className="flex gap-3">
                {currentBoss.demoUrl && (
                  <a
                    href={currentBoss.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#38bdf8] hover:underline font-pixel text-[8px]"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>LIVE DEMO</span>
                  </a>
                )}
                {currentBoss.githubUrl && (
                  <a
                    href={currentBoss.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-slate-300 hover:text-white font-pixel text-[8px]"
                  >
                    <Github className="w-3 h-3" />
                    <span>SOURCE REPO</span>
                  </a>
                )}
              </div>
              <span className="text-[8px] font-pixel text-slate-400">
                100% REPRODUCIBLE BUILDS
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
