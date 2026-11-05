import React, { useState } from 'react';
import { Home as HomeIcon, Award, Terminal, Coffee, BookOpen, User, CheckCircle2, X, Download, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';
import { ARYAN_STATS } from '../../data/portfolioData';

interface HomeInteriorProps {
  onBack: () => void;
  onOpenQuests?: () => void;
  playerLevel?: number;
  playerXp?: number;
  coffeeCount?: number;
}

export const HomeInterior: React.FC<HomeInteriorProps> = ({
  onBack,
  onOpenQuests,
  playerLevel = 18,
  playerXp = 1280,
  coffeeCount = 24
}) => {
  const [activeTab, setActiveTab] = useState<'room' | 'bio'>('room');

  const handleInspectDesk = () => {
    soundManager.playClick();
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#0284c7', '#fde047']
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0c0806] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#1a0f0a] border-b-2 border-[#422617] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#2e1c12] border border-[#ef4444] flex items-center justify-center text-[#ef4444] shadow-inner">
            <HomeIcon className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#ef4444] tracking-wider uppercase flex items-center gap-2">
              <span>YOUR HOME</span>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#a88265] font-sans">
              Aryan's Sanctuary · Coding Station, Career Stats & Achievements
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('room'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'room'
                ? 'bg-[#b91c1c] text-white font-bold border-[#fca5a5] shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                : 'bg-[#26160e] text-[#a88265] border-[#422617] hover:text-white'
            }`}
          >
            <span>🏠</span>
            <span>BEDROOM SCENE</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('bio'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'bio'
                ? 'bg-[#b91c1c] text-white font-bold border-[#fca5a5] shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                : 'bg-[#26160e] text-[#a88265] border-[#422617] hover:text-white'
            }`}
          >
            <span>📜</span>
            <span>DEVELOPER BIO</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#2e1c12] hover:bg-[#45271a] text-[#fca5a5] border border-[#ef4444]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: BEDROOM & STATS LAYOUT (Exact Match to Reference Screenshot Bottom-Right) */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-center max-w-6xl mx-auto w-full">
        {activeTab === 'room' && (
          <div className="w-full bg-[#170e0a] border-4 border-[#422617] shadow-[0_16px_50px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row overflow-hidden">
            {/* LEFT / CENTER: ISOMETRIC BEDROOM SCENE (Exact Match to Reference Screenshot) */}
            <div className="flex-1 min-h-[380px] sm:min-h-[460px] relative bg-[#1c100a] flex items-center justify-center border-b-4 lg:border-b-0 lg:border-r-4 border-[#422617] overflow-hidden">
              {/* The Authentic Pixel-Art Isometric Bedroom Backdrop */}
              <div className="relative w-full h-full min-h-[380px] flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/interiors/home_room_upscaled.png"
                  alt="Aryan's Room"
                  className="w-full h-full object-cover [image-rendering:pixelated] select-none"
                />

                {/* Ambient Soft Sunbeams */}
                <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/30 pointer-events-none" />

                {/* Aryan Character Standing on Rug */}
                <div className="absolute bottom-[28%] left-[48%] -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="relative w-12 h-16 flex items-end justify-center">
                    <div className="absolute bottom-0 w-9 h-3 bg-black/60 rounded-full blur-[1px]" />
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

                {/* Mango the Cat Sleeping on the Rug */}
                <div
                  onClick={() => {
                    soundManager.playCatMeow();
                    confetti({ particleCount: 20, spread: 45, origin: { y: 0.7 } });
                  }}
                  className="absolute bottom-[22%] left-[36%] z-20 flex flex-col items-center cursor-pointer group"
                  title="Mango the Cat (Click to pet)"
                >
                  <div className="relative w-8 h-8 flex items-end justify-center">
                    <div className="absolute bottom-0 w-7 h-2 bg-black/60 rounded-full" />
                    <img
                      src="/assets/characters/mango/mango_spritesheet.png"
                      alt="Mango"
                      className="w-8 h-8 object-contain [image-rendering:pixelated] group-hover:scale-110 transition-transform"
                      style={{ objectPosition: '0 0' }}
                    />
                  </div>
                  <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#1a0f0a] text-[#fde047] border border-[#f59e0b] mt-0.5">
                    Mango 🐾
                  </span>
                </div>

                {/* Hotspots */}
                {/* 1. CODING STATION (Computer Desk) */}
                <button
                  onClick={handleInspectDesk}
                  className="absolute top-[18%] right-[16%] w-24 h-24 bg-sky-500/10 hover:bg-sky-500/30 border-2 border-dashed border-[#38bdf8] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20"
                  title="Dev Computer (Click to test terminal!)"
                >
                  <Terminal className="w-5 h-5 text-[#38bdf8] animate-pulse" />
                  <span className="text-[6px] font-pixel text-[#bae6fd] mt-1 bg-black/80 px-1 border border-sky-600">
                    DEV STATION
                  </span>
                </button>

                {/* 2. BOOKSHELF */}
                <button
                  onClick={() => { soundManager.playClick(); setActiveTab('bio'); }}
                  className="absolute bottom-[24%] right-[10%] w-20 h-24 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20"
                  title="Personal Bookshelf (Click to view bio)"
                >
                  <BookOpen className="w-4 h-4 text-[#f59e0b]" />
                  <span className="text-[6px] font-pixel text-[#fef08a] mt-0.5 bg-black/80 px-1 border border-amber-600">
                    BOOKSHELF
                  </span>
                </button>
              </div>
            </div>

            {/* RIGHT: RPG STATS & CAREER PROGRESSION CARD (Matches Screenshot) */}
            <div className="w-full lg:w-80 p-6 bg-[#140b07] flex flex-col justify-between font-pixel">
              <div>
                {/* Stats Header */}
                <div className="pb-3 mb-4 border-b-2 border-[#361a0d] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white tracking-wider">STATS</h3>
                  <span className="text-[9px] text-[#fde047]">Lv. {playerLevel}</span>
                </div>

                {/* Attribute List */}
                <div className="space-y-3 text-[9px] font-sans">
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-pixel text-[8px] text-[#fed7aa]">Level</span>
                    <span className="font-pixel text-white font-bold">{playerLevel}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-pixel text-[8px] text-[#fed7aa]">XP Progress</span>
                    <span className="font-pixel text-[#38bdf8]">{playerXp} / {ARYAN_STATS.maxXp}</span>
                  </div>

                  <div className="w-full h-2 bg-[#211108] border border-[#3d2011] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8]"
                      style={{ width: `${(playerXp / ARYAN_STATS.maxXp) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-[#29140b]">
                    <span className="font-pixel text-[8px] text-[#fed7aa]">Quests Completed</span>
                    <span className="font-pixel text-[#4ade80] font-bold">{ARYAN_STATS.questsCompleted}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-pixel text-[8px] text-[#fed7aa]">Projects Built</span>
                    <span className="font-pixel text-[#fde047] font-bold">{ARYAN_STATS.projectsBuilt}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-pixel text-[8px] text-[#fed7aa]">Skills Unlocked</span>
                    <span className="font-pixel text-[#c084fc] font-bold">{ARYAN_STATS.skillsUnlocked}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span className="font-pixel text-[8px] text-[#fed7aa]">Coffee Cups</span>
                    <span className="font-pixel text-[#ea580c] font-bold">{coffeeCount} ☕</span>
                  </div>
                </div>

                {/* ONGOING QUEST WIDGET (Matches Reference Screenshot) */}
                <div className="mt-6 pt-4 border-t-2 border-[#361a0d]">
                  <span className="text-[8px] text-slate-400 tracking-wider uppercase block mb-1">
                    ONGOING QUEST
                  </span>
                  <h4 className="text-[9px] font-bold text-white leading-tight">
                    Analyze Sales Dashboard
                  </h4>
                  <div className="mt-2">
                    <div className="flex justify-between text-[7px] text-[#fde047] mb-0.5">
                      <span>Progress</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full h-2 bg-[#211108] border border-[#3d2011] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] w-[60%]" />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      if (onOpenQuests) onOpenQuests();
                    }}
                    className="w-full mt-3 py-2 bg-[#24130a] hover:bg-[#361a0d] text-[#fde047] border border-[#f59e0b] text-[8px] cursor-pointer transition-colors text-center active:translate-y-0.5"
                  >
                    View Quest Journal
                  </button>
                </div>
              </div>

              {/* Resume Download CTA */}
              <div className="mt-5 pt-3 border-t border-[#29140b]">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="w-full py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white border border-[#fca5a5] text-[8px] flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <Download className="w-3 h-3" />
                  <span>DOWNLOAD ARYAN'S RESUME</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 3. TAB 2: DEVELOPER BIOGRAPHY & LORE */}
        {activeTab === 'bio' && (
          <div className="w-full max-w-4xl bg-[#170e0a] border-4 border-[#422617] p-6 shadow-2xl">
            <h3 className="font-pixel text-xs text-[#ef4444] mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>ARYAN · DATA EXPLORER & AI ARCHITECT</span>
            </h3>

            <div className="space-y-4 text-xs text-slate-200 leading-relaxed font-sans">
              <p>
                Welcome to my sanctuary! I am Aryan, an MCA (Data Science & Machine Learning) student, software engineer, and passionate problem solver based in India.
              </p>
              <p>
                My journey began with a curiosity for how algorithms understand complex human patterns. Today, I architect multimodal AI diagnostic systems (like MindPulse AI), high-throughput vector search engines, and real-time analytical dashboards.
              </p>
              <p>
                When I am not training transformer models or benchmarking PostgreSQL window queries, I love tinkering with indie 2D game loops, building tactile mechanical keyboards, and brewing specialty espresso.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
