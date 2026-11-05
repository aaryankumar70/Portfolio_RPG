import React, { useState } from 'react';
import { Flower2, Sparkles, X, Shuffle, Heart, Sprout, Award, Sun, Trees } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';
import { GARDEN_FACTS } from '../../data/portfolioData';

interface GardenInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const GardenInterior: React.FC<GardenInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [activeTab, setActiveTab] = useState<'sanctuary' | 'facts'>('sanctuary');
  const [currentFactIdx, setCurrentFactIdx] = useState<number>(0);
  const [harvestCount, setHarvestCount] = useState<number>(1);
  const [blossomShaken, setBlossomShaken] = useState<boolean>(false);

  const handleHarvestFact = () => {
    soundManager.playChime();
    setBlossomShaken(true);
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#86efac', '#fde047', '#f97316', '#ec4899']
    });
    setTimeout(() => setBlossomShaken(false), 800);
    setCurrentFactIdx((prev) => (prev + 1) % GARDEN_FACTS.length);
    setHarvestCount((prev) => prev + 1);
    if (onGainXp) onGainXp(15);
  };

  const currentFact = GARDEN_FACTS[currentFactIdx];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#061208] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#0f2214] border-b-2 border-[#1c4527] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#173820] border border-[#22c55e] flex items-center justify-center text-[#22c55e] shadow-inner">
            <Flower2 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#4ade80] tracking-wider uppercase flex items-center gap-2">
              <span>GARDEN SANCTUARY</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#86efac] font-sans">
              Master Gardener Willow · Random Facts, Lore & Blossoms of Wisdom
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('sanctuary'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'sanctuary'
                ? 'bg-[#16a34a] text-white font-bold border-[#86efac] shadow-[0_0_10px_rgba(22,163,74,0.5)]'
                : 'bg-[#122818] text-[#86efac] border-[#1c4527] hover:text-white'
            }`}
          >
            <span>🌿</span>
            <span>GARDEN SANCTUARY</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('facts'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'facts'
                ? 'bg-[#16a34a] text-white font-bold border-[#86efac] shadow-[0_0_10px_rgba(22,163,74,0.5)]'
                : 'bg-[#122818] text-[#86efac] border-[#1c4527] hover:text-white'
            }`}
          >
            <span>📜</span>
            <span>ALL LORE & FACTS</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#173820] hover:bg-[#204a2f] text-[#4ade80] border border-[#22c55e]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING PIXEL ART GARDEN SANCTUARY */}
      {activeTab === 'sanctuary' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#1c4527] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#0c1c10]">
            {/* The Pixel Art Garden Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#0c1c10]">
              <img
                src="/assets/interiors/garden_room.png"
                alt="Garden Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Sunlight Glow Overlay */}
              <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-black/30 pointer-events-none" />
              {blossomShaken && (
                <div className="absolute inset-0 bg-emerald-600/20 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters Standing in the Garden */}
              {/* Gardener Willow NPC */}
              <div
                onClick={handleHarvestFact}
                className="absolute bottom-[24%] right-[32%] flex flex-col items-center cursor-pointer group z-10"
                title="Gardener Willow (Click to talk & harvest a fact!)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#09170d]/90 border border-[#22c55e] text-[7px] font-pixel text-[#86efac] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Talk to Willow
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/researcher_idle.png"
                    alt="Gardener Willow"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#122818] text-[#4ade80] border border-[#16a34a] mt-0.5">
                  Willow
                </span>
              </div>

              {/* Aryan Character (Admirer of nature) */}
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

              {/* Mango the Cat Companion (Resting playfully on grass) */}
              <div
                onClick={() => {
                  soundManager.playCatMeow();
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.7 } });
                }}
                className="absolute bottom-[20%] left-[44%] flex flex-col items-center cursor-pointer group z-10"
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
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#122818] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. BLOSSOM PATCH (Click to harvest fun fact!) */}
              <button
                onClick={handleHarvestFact}
                className={`absolute bottom-[22%] left-[10%] w-28 h-24 bg-emerald-500/10 hover:bg-emerald-500/30 border-2 border-dashed border-[#22c55e] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20 ${
                  blossomShaken ? 'scale-105 bg-emerald-500/40' : 'hover:scale-105'
                }`}
                title="Wildflower Blossom (Click to harvest fun fact!)"
              >
                <Flower2 className="w-5 h-5 text-[#4ade80] animate-bounce" />
                <span className="text-[6px] font-pixel text-[#86efac] mt-1 bg-black/80 px-1 border border-emerald-600">
                  HARVEST FACT
                </span>
              </button>

              {/* 2. CROP PATCH HOTSPOT */}
              <button
                onClick={() => { soundManager.playChime(); setActiveTab('facts'); }}
                className="absolute bottom-[22%] right-[10%] w-28 h-20 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Cabbage & Carrot Beds (Click to inspect all facts)"
              >
                <Sprout className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-[6px] font-pixel text-[#fef08a] mt-0.5 bg-black/80 px-1 border border-amber-700">
                  TEND CROPS
                </span>
              </button>
            </div>
          </div>

          {/* Bottom RPG Dialogue Console */}
          <div className="w-full mt-4 bg-[#0f2214] border-2 border-[#1c4527] p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border border-[#22c55e] bg-[#173820] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/npcs/researcher_idle.png"
                  alt="Willow"
                  className="w-10 h-10 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[9px] text-[#4ade80] tracking-wider">
                    GARDENER WILLOW · SEEDLING OF WISDOM #{currentFactIdx + 1}
                  </span>
                  <span className="text-[8px] font-pixel text-amber-300">[{currentFact.category}]</span>
                </div>
                <p className="text-xs text-slate-100 font-medium mt-0.5 max-w-2xl leading-relaxed">
                  "{currentFact.fact}"
                </p>
                <p className="text-[10px] text-emerald-300/80 italic mt-0.5">
                  Lore: {currentFact.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-pixel text-[8px]">
              <button
                onClick={handleHarvestFact}
                className="px-3 py-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold border border-[#86efac] shadow-[0_0_10px_rgba(22,163,74,0.5)] transition-all flex items-center gap-1.5"
              >
                <Shuffle className="w-3 h-3" />
                <span>NEXT FACT (+15 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: ALL LORE & FACTS */}
      {activeTab === 'facts' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#4ade80] mb-3 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#22c55e]" />
              <span>ARYAN'S COMPENDIUM OF PERSONAL LORE & HABITS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GARDEN_FACTS.map((fact, idx) => (
                <div
                  key={idx}
                  className="bg-[#0f2214] border-2 border-[#1c4527] p-4 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-pixel text-[8px] text-[#f59e0b] block mb-1">
                      {fact.category.toUpperCase()}
                    </span>
                    <p className="text-xs text-white font-medium mb-2 leading-relaxed">
                      "{fact.fact}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#1c4527] text-[10px] text-emerald-300/80 italic">
                    {fact.title}
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
