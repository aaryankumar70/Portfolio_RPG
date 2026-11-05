import React, { useState } from 'react';
import { Shield, Sparkles, X, CheckSquare, Award, Compass, GraduationCap, ChevronRight, Scroll, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  const [activeTab, setActiveTab] = useState<'chamber' | 'quests' | 'journey'>('chamber');
  const [boardInspected, setBoardInspected] = useState<boolean>(false);
  const [kendrickQuoteIdx, setKendrickQuoteIdx] = useState<number>(0);

  const kendrickQuotes = [
    "Welcome to the Grand Adventurers' Guild! Every great developer embarks on heroic quests to master clean code and resilient architectures.",
    "Aryan has already slain 12 monumental project dragons, unlocking level 18 status and mastery across the data engineering spectrum.",
    "Take a look at the Quest Board: whether it's building multimodal neural classifiers or fine-tuning database partitions, no challenge goes unrewarded.",
    "True craftsmanship isn't just about finishing code—it's about tempering it until it withstands the harshest production fires."
  ];

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

  const handleInspectBoard = () => {
    soundManager.playChime();
    setBoardInspected(true);
    confetti({
      particleCount: 30,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#c084fc', '#f59e0b', '#fde047']
    });
    setTimeout(() => setBoardInspected(false), 800);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0e0717] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#180c26] border-b-2 border-[#3c175b] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#27103e] border border-[#a855f7] flex items-center justify-center text-[#a855f7] shadow-inner">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#c084fc] tracking-wider uppercase flex items-center gap-2">
              <span>GUILD HALL</span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#e9d5ff] font-sans">
              Guild Master Kendrick · Quest Archives & Career Milestones
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('chamber'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'chamber'
                ? 'bg-[#7e22ce] text-white font-bold border-[#e9d5ff] shadow-[0_0_10px_rgba(126,34,206,0.5)]'
                : 'bg-[#210d35] text-[#c084fc] border-[#3c175b] hover:text-white'
            }`}
          >
            <span>🏛</span>
            <span>GUILD CHAMBER</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('quests'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'quests'
                ? 'bg-[#7e22ce] text-white font-bold border-[#e9d5ff] shadow-[0_0_10px_rgba(126,34,206,0.5)]'
                : 'bg-[#210d35] text-[#c084fc] border-[#3c175b] hover:text-white'
            }`}
          >
            <span>📜</span>
            <span>QUEST BOARD</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('journey'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'journey'
                ? 'bg-[#7e22ce] text-white font-bold border-[#e9d5ff] shadow-[0_0_10px_rgba(126,34,206,0.5)]'
                : 'bg-[#210d35] text-[#c084fc] border-[#3c175b] hover:text-white'
            }`}
          >
            <span>🎖</span>
            <span>CAREER JOURNEY</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#27103e] hover:bg-[#3c175b] text-[#c084fc] border border-[#a855f7]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING PIXEL ART GUILD CHAMBER */}
      {activeTab === 'chamber' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#3c175b] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#12071d]">
            {/* The Pixel Art Guild Hall Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#12071d]">
              <img
                src="/assets/interiors/guild_hall_room_full.png"
                alt="Guild Hall Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Glow Overlays */}
              <div className="absolute inset-0 bg-radial from-purple-500/10 via-transparent to-black/40 pointer-events-none" />
              {boardInspected && (
                <div className="absolute inset-0 bg-purple-600/25 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters Standing in the Guild Hall */}
              {/* Guild Master Kendrick NPC */}
              <div
                onClick={() => {
                  soundManager.playChime();
                  setKendrickQuoteIdx((prev) => (prev + 1) % kendrickQuotes.length);
                }}
                className="absolute bottom-[24%] right-[32%] flex flex-col items-center cursor-pointer group z-10"
                title="Guild Master Kendrick (Click to talk)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#12071d]/90 border border-[#a855f7] text-[7px] font-pixel text-[#e9d5ff] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Talk to Kendrick
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/researcher_idle.png"
                    alt="Kendrick"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#210d35] text-[#c084fc] border border-[#a855f7] mt-0.5">
                  Kendrick
                </span>
              </div>

              {/* Aryan Character (Near center banquet table) */}
              <div className="absolute bottom-[22%] left-[26%] flex flex-col items-center z-10 pointer-events-none">
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
                className="absolute bottom-[20%] left-[46%] flex flex-col items-center cursor-pointer group z-10"
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
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#210d35] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. QUEST BOARD HOTSPOT */}
              <button
                onClick={() => { soundManager.playChime(); setActiveTab('quests'); }}
                className="absolute top-[32%] left-[10%] w-28 h-32 bg-purple-500/10 hover:bg-purple-500/30 border-2 border-dashed border-[#a855f7] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20"
                title="Quest Notice Board (Click to view bounties)"
              >
                <Scroll className="w-5 h-5 text-[#c084fc] animate-bounce" />
                <span className="text-[6px] font-pixel text-[#e9d5ff] mt-1 bg-black/80 px-1 border border-purple-600">
                  QUEST BOARD
                </span>
              </button>

              {/* 2. GUILD MASTER TABLE / LEDGER HOTSPOT */}
              <button
                onClick={handleInspectBoard}
                className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-44 h-18 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Guild Ledger (Click to inspect guild records)"
              >
                <Award className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-[6px] font-pixel text-[#fef08a] mt-0.5 bg-black/80 px-1 border border-amber-700">
                  GUILD LEDGER
                </span>
              </button>

              {/* 3. CAREER JOURNEY BANNER HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('journey'); }}
                className="absolute top-[28%] right-[10%] w-24 h-28 bg-purple-500/10 hover:bg-purple-500/25 border-2 border-dashed border-[#c084fc] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Guild Heraldry (Click to inspect career journey)"
              >
                <GraduationCap className="w-5 h-5 text-[#c084fc]" />
                <span className="text-[6px] font-pixel text-[#e9d5ff] mt-0.5 bg-black/80 px-1 border border-purple-700">
                  JOURNEY
                </span>
              </button>
            </div>
          </div>

          {/* Bottom RPG Dialogue Console */}
          <div className="w-full mt-4 bg-[#180c26] border-2 border-[#3c175b] p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border border-[#a855f7] bg-[#27103e] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/npcs/researcher_idle.png"
                  alt="Kendrick"
                  className="w-10 h-10 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <span className="font-pixel text-[9px] text-[#c084fc] tracking-wider block">
                  GUILD MASTER KENDRICK
                </span>
                <p className="text-xs text-slate-200 mt-0.5 max-w-2xl leading-relaxed">
                  "{kendrickQuotes[kendrickQuoteIdx]}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-pixel text-[8px]">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setKendrickQuoteIdx((prev) => (prev + 1) % kendrickQuotes.length);
                }}
                className="px-3 py-2 bg-[#27103e] hover:bg-[#3c175b] text-[#c084fc] border border-[#a855f7]/50 transition-colors"
              >
                NEXT GUILD CREED
              </button>
              <button
                onClick={handleInspectBoard}
                className="px-3 py-2 bg-[#7e22ce] hover:bg-[#6b21a8] text-white font-bold border border-[#e9d5ff] shadow-[0_0_10px_rgba(126,34,206,0.5)] transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3" />
                <span>INSPECT RECORD (+20 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: ACTIVE QUESTS */}
      {activeTab === 'quests' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#c084fc] mb-3 flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#a855f7]" />
              <span>OFFICIAL GUILD QUEST BOARD</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_QUESTS.map((quest) => (
                <div
                  key={quest.id}
                  className="bg-[#180c26] border-2 border-[#3c175b] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-pixel text-[9px] text-[#f59e0b]">{quest.category || 'QUEST'}</span>
                      <span className={`text-[8px] font-pixel px-2 py-0.5 border ${
                        quest.completed
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                          : 'bg-amber-950 text-amber-400 border-amber-600'
                      }`}>
                        {quest.completed ? 'COMPLETED' : 'IN PROGRESS'}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white mb-1">{quest.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">{quest.description}</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{quest.progress || (quest.completed ? 100 : 50)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#0d0714] border border-[#3c175b] overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${quest.progress || (quest.completed ? 100 : 50)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-purple-300 font-pixel">Reward: +{quest.rewardXp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: CAREER JOURNEY */}
      {activeTab === 'journey' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#c084fc] mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#a855f7]" />
              <span>ARYAN'S ACADEMIC & PROFESSIONAL EXPEDITIONS</span>
            </h3>

            <div className="space-y-4">
              {journeyMilestones.map((m, idx) => (
                <div key={idx} className="bg-[#180c26] border-2 border-[#3c175b] p-5">
                  <span className="font-pixel text-[9px] text-[#f59e0b] block mb-1">{m.year}</span>
                  <h4 className="font-bold text-base text-white mb-2">{m.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
