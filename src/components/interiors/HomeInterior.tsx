import React, { useState } from 'react';
import { Home, User, CheckSquare, Sparkles, BookOpen, Coffee, Award, ExternalLink, X, Code2 } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';
import { ARYAN_STATS } from '../../data/portfolioData';

interface HomeInteriorProps {
  onBack: () => void;
  onOpenQuests: () => void;
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
  const [activeTab, setActiveTab] = useState<'room' | 'bio' | 'gear'>('room');

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0e0a08] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO BAR (Matches Screenshot Header) */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#1b120c] border-b-2 border-[#422617] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#2e1c12] border border-[#ef4444] flex items-center justify-center text-[#ef4444]">
            <Home className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#fca5a5] tracking-wider uppercase">
            YOUR HOME
          </h1>
          <span className="text-[8px] text-[#a88265] hidden sm:inline">
            · View Stats & Sanctuary
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('room'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'room'
                ? 'bg-[#b91c1c] text-white font-bold border-[#fca5a5]'
                : 'bg-[#26160e] text-[#a88265] border-[#422617] hover:text-white'
            }`}
          >
            BEDROOM & STATS
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('bio'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'bio'
                ? 'bg-[#b91c1c] text-white font-bold border-[#fca5a5]'
                : 'bg-[#26160e] text-[#a88265] border-[#422617] hover:text-white'
            }`}
          >
            ABOUT ARYAN
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

      {/* 2. MAIN BEDROOM & STATS LAYOUT (Matches Reference Screenshot Bottom-Right) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {activeTab === 'room' && (
          <div className="w-full max-w-5xl bg-[#170e0a] border-4 border-[#422617] shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row overflow-hidden">
            {/* LEFT / CENTER: ISOMETRIC BEDROOM SCENE */}
            <div className="flex-1 min-h-[300px] sm:min-h-[360px] relative bg-gradient-to-b from-[#24150e] via-[#1c100a] to-[#2b1911] flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-[#422617] overflow-hidden">
              {/* Wooden floor tile grid */}
              <div className="absolute inset-0 opacity-25 pointer-events-none bg-[linear-gradient(to_right,#5c321d_1px,transparent_1px),linear-gradient(to_bottom,#5c321d_1px,transparent_1px)] bg-[size:28px_28px]" />

              {/* Sunny Double Window with Daylight */}
              <div className="absolute top-6 left-12 w-28 h-24 bg-[#38bdf8]/20 border-4 border-[#78350f] shadow-inner pointer-events-none">
                <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-[#38bdf8]/30 to-[#86efac]/20">
                  {/* Window frame cross */}
                  <div className="absolute inset-y-0 left-1/2 w-1.5 bg-[#78350f] -translate-x-1/2" />
                  <div className="absolute inset-x-0 top-1/2 h-1.5 bg-[#78350f] -translate-y-1/2" />
                  {/* Sun ray cast */}
                  <div className="absolute -top-10 -left-10 w-44 h-44 bg-yellow-200/15 rotate-45 blur-md" />
                </div>
              </div>

              {/* Cozy Blue Bed on Left */}
              <div className="absolute bottom-12 left-10 w-28 h-40 bg-[#1e3a5f] border-2 border-[#0284c7] shadow-xl pointer-events-none">
                {/* White Pillow */}
                <div className="w-24 h-10 bg-slate-100 border border-slate-300 mx-auto mt-2 shadow-sm" />
                {/* Blue Blanket */}
                <div className="w-full h-24 bg-[#2563eb] border-t-2 border-[#60a5fa] mt-3" />
              </div>

              {/* Computer Desk with Dual Monitors & Chair on Right */}
              <div className="absolute top-10 right-10 w-36 h-28 bg-[#3d2011] border-2 border-[#5c321d] shadow-lg pointer-events-none p-2 flex flex-col justify-between">
                {/* Dual Monitors on Desk */}
                <div className="flex justify-around items-end">
                  <div className="w-14 h-10 bg-[#0f172a] border border-[#38bdf8] flex items-center justify-center">
                    <span className="text-[6px] text-[#38bdf8] font-mono">VS_CODE</span>
                  </div>
                  <div className="w-14 h-10 bg-[#0f172a] border border-[#f59e0b] flex items-center justify-center">
                    <span className="text-[6px] text-[#f59e0b] font-mono">DASHBOARD</span>
                  </div>
                </div>
                {/* Keyboard & Mousepad */}
                <div className="w-24 h-3 bg-[#1e293b] border border-slate-600 mx-auto" />
              </div>

              {/* Tall Bookshelf on Right Wall */}
              <div className="absolute bottom-10 right-10 w-24 h-44 bg-[#3d2011] border-2 border-[#5c321d] shadow-xl pointer-events-none flex flex-col justify-around p-1.5">
                {/* Shelf 1 */}
                <div className="flex gap-1 border-b-2 border-[#2b160b] pb-1">
                  <div className="w-3 h-8 bg-[#b91c1c]" />
                  <div className="w-4 h-9 bg-[#0284c7]" />
                  <div className="w-3 h-8 bg-[#15803d]" />
                  <div className="w-4 h-7 bg-[#ca8a04]" />
                </div>
                {/* Shelf 2 */}
                <div className="flex gap-1 border-b-2 border-[#2b160b] pb-1">
                  <div className="w-3.5 h-8 bg-[#7e22ce]" />
                  <div className="w-3 h-9 bg-[#0f766e]" />
                  <div className="w-4 h-7 bg-[#b91c1c]" />
                </div>
                {/* Shelf 3 */}
                <div className="flex gap-1">
                  <div className="w-4 h-8 bg-[#0284c7]" />
                  <div className="w-3 h-7 bg-[#ca8a04]" />
                </div>
              </div>

              {/* Small Potted Plant in Corner */}
              <div className="absolute bottom-6 left-44 pointer-events-none">
                <div className="w-5 h-5 bg-[#22c55e] rounded-full mx-auto" />
                <div className="w-6 h-5 bg-[#78350f] border border-[#92400e]" />
              </div>

              {/* Aryan Pixel Character in Center of Bedroom */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-16 relative shadow-lg">
                  <div className="absolute top-0 left-2 w-6 h-4 bg-[#0f172a]" />
                  <div className="absolute top-4 left-2 w-6 h-4 bg-[#fed7aa]" />
                  <div className="absolute top-5 left-3 w-1.5 h-1.5 bg-[#0284c7]" />
                  <div className="absolute top-5 right-3 w-1.5 h-1.5 bg-[#0284c7]" />
                  <div className="absolute top-8 left-1 w-8 h-5 bg-[#2563eb]" />
                  <div className="absolute top-8 left-3.5 w-3 h-5 bg-white" />
                  <div className="absolute top-13 left-2 w-6 h-5 bg-[#1e293b]" />
                </div>
                <div className="mt-2 px-2 py-0.5 bg-[#170e0a]/80 border border-[#f59e0b] text-[8px] font-pixel text-[#fde047]">
                  Aryan
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: STATS & ONGOING QUEST (Matches Reference Screenshot Exactly) */}
            <div className="w-full md:w-80 p-6 bg-[#140b07] flex flex-col justify-between font-pixel">
              <div>
                {/* STATS HEADER */}
                <div className="pb-3 mb-4 border-b-2 border-[#3d2315] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#f59e0b] tracking-wider uppercase flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#f59e0b]" />
                    <span>STATS</span>
                  </h3>
                  <span className="text-[8px] text-[#38bdf8] font-sans">
                    Data Explorer
                  </span>
                </div>

                {/* STATS ROWS */}
                <div className="space-y-2.5 text-xs text-slate-200 font-sans mb-6">
                  <div className="flex justify-between items-center py-1 border-b border-[#2b170d]">
                    <span className="text-slate-400">Level</span>
                    <span className="font-pixel text-[10px] text-[#fde047]">{playerLevel}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#2b170d]">
                    <span className="text-slate-400">XP</span>
                    <span className="font-pixel text-[9px] text-[#38bdf8]">{playerXp} / 2000</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#2b170d]">
                    <span className="text-slate-400">Quests Completed</span>
                    <span className="font-pixel text-[10px] text-white">12</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#2b170d]">
                    <span className="text-slate-400">Projects Built</span>
                    <span className="font-pixel text-[10px] text-white">8</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-[#2b170d]">
                    <span className="text-slate-400">Skills Unlocked</span>
                    <span className="font-pixel text-[10px] text-white">15</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Coffee Cups</span>
                    <span className="font-pixel text-[10px] text-[#f59e0b]">{coffeeCount} ☕</span>
                  </div>
                </div>

                {/* ONGOING QUEST (Matches Screenshot) */}
                <div className="pt-4 border-t-2 border-[#3d2315]">
                  <h4 className="text-[10px] text-[#f59e0b] font-pixel tracking-wider uppercase mb-2">
                    ONGOING QUEST
                  </h4>

                  <div className="p-3 bg-[#1e1008] border border-[#4a2610] mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white font-sans">
                        Analyze Sales Dashboard
                      </span>
                      <span className="text-[9px] text-[#fde047] font-pixel">60%</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans mb-2">
                      Collect data and build insights
                    </p>
                    <div className="w-full h-2 bg-[#2d1609] border border-[#5c321d] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] w-[60%]" />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onOpenQuests();
                    }}
                    className="w-full py-2.5 bg-[#ca8a04] hover:bg-[#eab308] text-[#0f1722] font-bold border-2 border-[#fef08a] shadow-[0_3px_0_#78350f] text-[9px] font-pixel flex items-center justify-center gap-1.5 cursor-pointer transition-all active:translate-y-1"
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>View Quest</span>
                  </button>
                </div>
              </div>

              {/* Bottom bio link */}
              <div className="mt-6 pt-3 border-t border-[#2d1609] flex items-center justify-between text-[8px] font-pixel text-[#94a3b8]">
                <span>MCA DATA SCIENCE</span>
                <span className="text-emerald-400">OPEN TO WORK</span>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT ARYAN BIO TAB */}
        {activeTab === 'bio' && (
          <div className="w-full max-w-4xl bg-[#170e0a] p-6 sm:p-8 border-4 border-[#422617] shadow-xl font-sans">
            <h3 className="font-pixel text-sm text-[#f59e0b] mb-4 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>THE ADVENTURER'S CHRONICLE: ARYAN</span>
            </h3>

            <div className="space-y-4 text-xs text-slate-200 leading-relaxed">
              <p>
                Aryan is a Data Explorer, MCA student specializing in Data Science & Machine Learning, and dedicated full-stack AI developer.
              </p>
              <p>
                From architecting end-to-end multimodal retrieval pipelines to building high-throughput FastAPI microservices and responsive game engines, he approaches engineering with curiosity, rigor, and design polish.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-pixel text-[9px]">
                <div className="p-3 bg-[#1e1008] border border-[#4a2610]">
                  <span className="text-[#f59e0b] block mb-1">🎓 EDUCATION</span>
                  <p className="text-white font-sans text-xs">MCA in Data Science & ML</p>
                  <p className="text-slate-400 font-sans text-[10px]">BCA in Computer Science</p>
                </div>
                <div className="p-3 bg-[#1e1008] border border-[#4a2610]">
                  <span className="text-[#38bdf8] block mb-1">🚀 CORE FOCUS</span>
                  <p className="text-white font-sans text-xs">Deep Learning & Data Engineering</p>
                  <p className="text-slate-400 font-sans text-[10px]">Multimodal AI, Transformers & SQL</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
