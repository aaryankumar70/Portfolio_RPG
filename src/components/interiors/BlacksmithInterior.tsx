import React, { useState } from 'react';
import { Hammer, Flame, Sparkles, X, Shield, Swords, Cpu, Terminal, Zap, Eye, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';
import { WEAPON_SKILLS, SKILL_CATEGORIES } from '../../data/portfolioData';
import { WeaponSkill } from '../../types';

interface BlacksmithInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const BlacksmithInterior: React.FC<BlacksmithInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponSkill>(WEAPON_SKILLS[0]);
  const [anvilStruck, setAnvilStruck] = useState<boolean>(false);
  const [forgeStoked, setForgeStoked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'room' | 'weapons' | 'matrix'>('room');
  const [torvaldQuoteIdx, setTorvaldQuoteIdx] = useState<number>(0);

  const torvaldQuotes = [
    "The anvil never lies! Every line of code is tempered in real-world projects.",
    "Looking to upgrade your arsenal? The Python Greatsword has been folded over 50,000 lines of asynchronous code.",
    "A dull query slows the entire kingdom. That's why Aryan forged the SQL Warhammer with window functions and sub-second indexing!",
    "Striking hot steel purifies impurities—just like unit tests eliminate edge-case bugs."
  ];

  const handleStrikeAnvil = () => {
    soundManager.playAnvilClink();
    setAnvilStruck(true);
    confetti({
      particleCount: 30,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fde047', '#ef4444', '#ea580c']
    });
    setTimeout(() => setAnvilStruck(false), 260);
    if (onGainXp) onGainXp(15);
  };

  const handleStokeForge = () => {
    soundManager.playClick();
    setForgeStoked(true);
    setTimeout(() => setForgeStoked(false), 800);
    setTorvaldQuoteIdx((prev) => (prev + 1) % torvaldQuotes.length);
    if (onGainXp) onGainXp(10);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0d0805] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#1a0e08] border-b-2 border-[#45200d] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#2e170c] border border-[#f97316] flex items-center justify-center text-[#f97316] shadow-inner">
            <Hammer className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#fb923c] tracking-wider uppercase flex items-center gap-2">
              <span>BLACKSMITH WORKSHOP</span>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#a88265] font-sans">
              Master Armorer Torvald · Forged Skills & Weapons
            </p>
          </div>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('room'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'room'
                ? 'bg-[#ea580c] text-white font-bold border-[#fed7aa] shadow-[0_0_10px_rgba(234,88,12,0.5)]'
                : 'bg-[#29140b] text-[#a88265] border-[#45200d] hover:text-white'
            }`}
          >
            <span>🔨</span>
            <span>FORGE ROOM</span>
          </button>

          <button
            onClick={() => { soundManager.playClick(); setActiveTab('weapons'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'weapons'
                ? 'bg-[#ea580c] text-white font-bold border-[#fed7aa] shadow-[0_0_10px_rgba(234,88,12,0.5)]'
                : 'bg-[#29140b] text-[#a88265] border-[#45200d] hover:text-white'
            }`}
          >
            <span>⚔</span>
            <span>WEAPON ARSENAL</span>
          </button>

          <button
            onClick={() => { soundManager.playClick(); setActiveTab('matrix'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-[#ea580c] text-white font-bold border-[#fed7aa] shadow-[0_0_10px_rgba(234,88,12,0.5)]'
                : 'bg-[#29140b] text-[#a88265] border-[#45200d] hover:text-white'
            }`}
          >
            <span>📊</span>
            <span>SKILL MATRIX</span>
          </button>
        </div>

        {/* Exit Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#2e170c] hover:bg-[#45200d] text-[#fb923c] border border-[#f97316]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING PIXEL ART FORGE ROOM (Matching Reference Image!) */}
      {activeTab === 'room' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#45200d] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#150c07]">
            {/* The Authentic Pixel Art Blacksmith Room Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#150c07]">
              <img
                src="/assets/interiors/blacksmith_room.png"
                alt="Blacksmith Workshop Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Lighting Overlays */}
              <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/40 pointer-events-none" />
              {forgeStoked && (
                <div className="absolute inset-0 bg-orange-600/20 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters Standing Inside the Workshop */}
              {/* Blacksmith Torvald NPC (Near the Forge & Anvil) */}
              <div
                onClick={handleStokeForge}
                className="absolute bottom-[24%] right-[42%] flex flex-col items-center cursor-pointer group z-10"
                title="Blacksmith Torvald (Click to talk)"
              >
                {/* Overhead Speech Bubble Cue */}
                <div className="mb-1 px-1.5 py-0.5 bg-[#0f0a07]/90 border border-[#f59e0b] text-[7px] font-pixel text-[#fde047] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Talk to Torvald
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  {/* Drop Shadow */}
                  <div className="absolute bottom-0 w-10 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/blacksmith_idle.png"
                    alt="Blacksmith Torvald"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#1f1008] text-[#fb923c] border border-[#f97316] mt-0.5">
                  Torvald
                </span>
              </div>

              {/* Aryan Character (Beside Workbench inspecting weapon designs) */}
              <div className="absolute bottom-[22%] left-[24%] flex flex-col items-center z-10 pointer-events-none">
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

              {/* Mango the Cat Companion (Resting near the warm hearth) */}
              <div
                onClick={() => {
                  soundManager.playCatMeow();
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.7 } });
                }}
                className="absolute bottom-[20%] left-[45%] flex flex-col items-center cursor-pointer group z-10"
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
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#1f1008] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Clickable Hotspots overlaying the Room */}
              {/* 1. ANVIL HOTSPOT (Click to strike steel!) */}
              <button
                onClick={handleStrikeAnvil}
                className={`absolute bottom-[16%] right-[32%] w-16 h-14 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20 ${
                  anvilStruck ? 'scale-90 bg-amber-500/40' : 'hover:scale-105'
                }`}
                title="The Sacred Anvil (Click to strike & temper code!)"
              >
                <Hammer className="w-5 h-5 text-[#fde047] animate-bounce" />
                <span className="text-[6px] font-pixel text-[#fde047] mt-0.5 bg-black/80 px-1 border border-amber-600">
                  STRIKE
                </span>
              </button>

              {/* 2. FORGE HEARTH HOTSPOT */}
              <button
                onClick={handleStokeForge}
                className="absolute top-[28%] right-[32%] w-20 h-24 bg-orange-600/10 hover:bg-orange-600/25 border-2 border-dashed border-[#ea580c] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Blazing Forge (Click to stoke flames)"
              >
                <Flame className="w-5 h-5 text-[#fb923c] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#fed7aa] mt-0.5 bg-black/80 px-1 border border-orange-700">
                  FORGE
                </span>
              </button>

              {/* 3. BLUEPRINT WORKBENCH HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('weapons'); }}
                className="absolute bottom-[28%] left-[18%] w-24 h-16 bg-blue-500/10 hover:bg-blue-500/25 border-2 border-dashed border-[#38bdf8] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Blueprint Table (Click to inspect weapon specs)"
              >
                <Eye className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-[6px] font-pixel text-[#bae6fd] mt-0.5 bg-black/80 px-1 border border-sky-700">
                  BLUEPRINTS
                </span>
              </button>
            </div>

            {/* Bottom RPG Dialogue & Weapon Selector Strip */}
            <div className="p-4 bg-[#140b06] border-t-4 border-[#45200d] font-pixel">
              {/* Torvald Dialogue */}
              <div className="flex items-start gap-3 pb-3 mb-3 border-b border-[#381a0b]">
                <div className="w-9 h-9 rounded bg-[#2e170c] border border-[#f97316] flex items-center justify-center text-lg shrink-0">
                  🔨
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-[#fb923c] font-bold">Blacksmith Torvald</span>
                    <span className="text-[7px] text-slate-400 font-sans">Master Craftsman</span>
                  </div>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    "{torvaldQuotes[torvaldQuoteIdx]}"
                  </p>
                </div>
                <button
                  onClick={handleStrikeAnvil}
                  className="px-3 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white border border-[#fed7aa] text-[8px] font-pixel flex items-center gap-1.5 transition-colors shrink-0 shadow-md active:translate-y-0.5"
                >
                  <Hammer className="w-3.5 h-3.5" />
                  <span>STRIKE ANVIL (+15 XP)</span>
                </button>
              </div>

              {/* Quick Weapon Carousel Pills */}
              <div>
                <div className="flex items-center justify-between text-[8px] text-[#fed7aa] mb-1.5">
                  <span className="uppercase tracking-wider">Aryan's Forged Weapons (Click to inspect):</span>
                  <button
                    onClick={() => { soundManager.playClick(); setActiveTab('weapons'); }}
                    className="text-[#fb923c] hover:underline flex items-center gap-1"
                  >
                    <span>Full Specs</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {WEAPON_SKILLS.slice(0, 4).map((w) => {
                    const isSelected = selectedWeapon.id === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedWeapon(w);
                        }}
                        className={`p-2 text-left border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#ea580c] border-[#fef08a] text-white shadow-md'
                            : 'bg-[#1f1008] border-[#381a0b] text-slate-300 hover:bg-[#2e170c]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[8px] font-bold">
                          <span className="truncate">{w.name}</span>
                          <span className="text-[#fde047]">{w.masteryLevel}%</span>
                        </div>
                        <span className="text-[7px] text-slate-400 font-sans truncate mt-0.5">
                          {w.techStack}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: DETAILED WEAPON ARSENAL INSPECTOR */}
      {activeTab === 'weapons' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl bg-[#170e08] border-4 border-[#472714] shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row overflow-hidden">
            {/* Left: Weapon Selection List */}
            <div className="w-full md:w-80 p-5 bg-[#140b06] border-b-4 md:border-b-0 md:border-r-4 border-[#472714] flex flex-col justify-between font-pixel">
              <div>
                <div className="pb-3 mb-3 border-b-2 border-[#3d2011] flex items-center justify-between">
                  <h3 className="text-xs text-[#fb923c] uppercase tracking-wider flex items-center gap-1.5">
                    <Swords className="w-4 h-4 text-[#fb923c]" />
                    <span>FORGED GEAR</span>
                  </h3>
                  <span className="text-[8px] text-slate-400 font-sans">Aryan's Arsenal</span>
                </div>

                <div className="space-y-2">
                  {WEAPON_SKILLS.map((w) => {
                    const isSelected = selectedWeapon.id === w.id;
                    return (
                      <div
                        key={w.id}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedWeapon(w);
                        }}
                        className={`p-3 cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-[#ea580c] text-white border-[#fef08a] shadow-md'
                            : 'bg-[#211209] text-[#cbd5e1] border-[#381c0d] hover:bg-[#2b170c]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">{w.name}</span>
                          <span className="text-[9px] text-[#fef08a]">{w.masteryLevel}%</span>
                        </div>
                        <div className="flex items-center justify-between text-[8px] text-slate-300 font-sans">
                          <span>{w.techStack}</span>
                          <span className="uppercase text-[#fde047]">{w.category}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Anvil Strike Widget */}
              <div className="mt-5 pt-4 border-t border-[#3d2011] flex items-center gap-3">
                <button
                  onClick={handleStrikeAnvil}
                  className={`w-12 h-12 bg-[#2e190d] border-2 border-[#f97316] flex items-center justify-center cursor-pointer transition-transform ${
                    anvilStruck ? 'scale-90 rotate-3' : 'hover:scale-105'
                  }`}
                  title="Click to strike anvil!"
                >
                  <Hammer className="w-6 h-6 text-[#fde047]" />
                </button>
                <div>
                  <span className="text-[8px] text-[#fb923c] block font-pixel">TEMPER THE BLADE</span>
                  <span className="text-[7px] text-slate-400 font-sans">Click to strike anvil (+15 XP)</span>
                </div>
              </div>
            </div>

            {/* Right: Selected Weapon Deep Dive Card */}
            <div className="flex-1 p-6 bg-[#1a110a] flex flex-col justify-between">
              <div>
                {/* Weapon Header */}
                <div className="flex items-start justify-between pb-4 mb-4 border-b-2 border-[#3d2011]">
                  <div>
                    <span className="text-[8px] font-pixel text-[#ea580c] tracking-widest uppercase">
                      LEVEL {Math.floor((selectedWeapon.masteryLevel || selectedWeapon.level || 85) / 5)} ARTIFACT
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">
                      {selectedWeapon.name}
                    </h2>
                    <p className="text-xs text-[#fb923c] font-mono mt-0.5">
                      Tech Core: {selectedWeapon.techStack || selectedWeapon.type}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#fde047] font-pixel">
                      {selectedWeapon.masteryLevel || selectedWeapon.level}%
                    </span>
                    <span className="text-[8px] block text-slate-400 font-pixel">
                      PROFICIENCY
                    </span>
                  </div>
                </div>

                {/* Lore / Engineering Description */}
                <p className="text-xs text-slate-200 leading-relaxed font-sans mb-6">
                  {selectedWeapon.description}
                </p>

                {/* Enchantments / Key Capabilities */}
                <div className="mb-6">
                  <h4 className="font-pixel text-[9px] text-[#f59e0b] tracking-wider uppercase mb-2">
                    WEAPON ENCHANTMENTS & ATTRIBUTES
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedWeapon.enchantments || ['High Precision', 'Modular Core', 'Production Tested']).map((ench, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#26150c] border border-[#f97316]/50 text-xs text-[#fed7aa] font-sans flex items-center gap-1.5"
                      >
                        <Zap className="w-3 h-3 text-[#fde047]" />
                        <span>{ench}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mastery Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[8px] font-pixel text-[#a88265]">
                    <span>FORGE REFINEMENT</span>
                    <span className="text-[#fde047]">{selectedWeapon.masteryLevel || selectedWeapon.level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#140b06] border border-[#3d2011] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ea580c] to-[#fde047] transition-all duration-500"
                      style={{ width: `${selectedWeapon.masteryLevel || selectedWeapon.level}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="mt-6 pt-3 border-t border-[#3d2011] flex items-center justify-between text-[8px] font-pixel text-[#a88265]">
                <span>BLACKSMITH TORVALD: "WELL-HONED ALGORITHMS NEVER DULL."</span>
                <span className="text-emerald-400">PRODUCTION TESTED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: FULL SKILL MATRIX */}
      {activeTab === 'matrix' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl bg-[#170e08] p-6 border-4 border-[#472714] shadow-xl">
            <h3 className="font-pixel text-xs text-[#fb923c] mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>COMPREHENSIVE TECHNICAL CAPABILITIES</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-4 bg-[#140b06] border border-[#3d2011]">
                  <h4 className="font-pixel text-[10px] text-[#f59e0b] mb-3 uppercase tracking-wider">
                    {cat.name}
                  </h4>
                  <div className="space-y-2.5">
                    {cat.skills.map((s) => (
                      <div key={s.name} className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-200">
                          <span>{s.name}</span>
                          <span className="font-pixel text-[9px] text-[#fde047]">{s.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#26150c] overflow-hidden">
                          <div
                            className="h-full bg-[#f97316]"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
