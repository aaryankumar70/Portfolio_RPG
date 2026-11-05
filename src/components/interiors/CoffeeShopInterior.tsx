import React, { useState } from 'react';
import { Coffee, Flame, Sparkles, BookOpen, Heart, X, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';
import { ARYAN_STATS } from '../../data/portfolioData';

interface CoffeeShopInteriorProps {
  onBack: () => void;
  onBuyCoffee?: () => void;
  coffeeCount?: number;
}

export const CoffeeShopInterior: React.FC<CoffeeShopInteriorProps> = ({
  onBack,
  onBuyCoffee,
  coffeeCount = 24
}) => {
  const [localCoffeeCount, setLocalCoffeeCount] = useState<number>(coffeeCount);
  const [dialogueState, setDialogueState] = useState<'initial' | 'bought' | 'declined'>('initial');
  const [activeTab, setActiveTab] = useState<'scene' | 'musings'>('scene');
  const [activeArticle, setActiveArticle] = useState<number>(0);
  const [brewing, setBrewing] = useState<boolean>(false);

  const articles = [
    {
      title: 'Why Multimodal AI Changes Everything in 2026',
      date: 'Oct 2025 · 6 min read',
      tag: 'AI ARCHITECTURE',
      content: 'For decades, machine learning treated audio, vision, and text as segregated silos. Now, unified transformer representations allow models to understand acoustic biomarkers in voice journals and correlate them directly with linguistic stress markers. In developing MindPulse AI, this cross-attention capability was what transformed a generic sentiment classifier into an empathetic companion.'
    },
    {
      title: 'Building Resilient Data Pipelines with SQL & Python',
      date: 'Aug 2025 · 4 min read',
      tag: 'DATA ENGINEERING',
      content: 'A machine learning model is only as sturdy as the dirtiest row in its training dataset. By combining modular Python ingestion with idempotent SQL staging tables and windowed deduplication, you prevent silent data drift from corrupting downstream inference.'
    },
    {
      title: 'From Zero to Hackathon Winner: The Art of Rapid Prototyping',
      date: 'May 2025 · 5 min read',
      tag: 'PRODUCT & CODE',
      content: 'In 36-hour hackathons, perfectionism is the enemy of victory. You must identify the single core "magic moment" of your solution—whether that is a zero-knowledge circuit verification or an instant vector search—and construct a seamless UI around that atomic truth.'
    },
    {
      title: 'Why Every Developer Should Learn Indie Game Mechanics',
      date: 'Jan 2025 · 3 min read',
      tag: 'CREATIVE CODING',
      content: 'Game development teaches state management, 60fps frame budgeting, sound design, and player feedback loops in ways traditional CRUD web applications never can. Building interactive worlds makes you a dramatically better UI/UX engineer.'
    }
  ];

  const handleBuyCoffee = () => {
    soundManager.playCoffeePour();
    soundManager.playLevelUp();
    setBrewing(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#eab308', '#ca8a04', '#ffffff', '#78350f']
    });

    setTimeout(() => setBrewing(false), 900);
    setLocalCoffeeCount((prev) => prev + 1);
    setDialogueState('bought');
    if (onBuyCoffee) onBuyCoffee();
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0b0805] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#190f09] border-b-2 border-[#3d2011] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#2e180d] border border-[#f59e0b] flex items-center justify-center text-[#f59e0b] shadow-inner">
            <Coffee className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#f59e0b] tracking-wider uppercase flex items-center gap-2">
              <span>COZY COFFEE TAVERN</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#a88265] font-sans">
              Barista Marco · Roast Brews, Focus Buffs & Tech Musings
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('scene'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'scene'
                ? 'bg-[#ca8a04] text-[#0f1722] font-bold border-[#fde047] shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                : 'bg-[#24130a] text-[#a88265] border-[#3d2011] hover:text-white'
            }`}
          >
            <span>☕</span>
            <span>CAFE ROOM</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('musings'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'musings'
                ? 'bg-[#ca8a04] text-[#0f1722] font-bold border-[#fde047] shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                : 'bg-[#24130a] text-[#a88265] border-[#3d2011] hover:text-white'
            }`}
          >
            <span>📖</span>
            <span>TECH MUSINGS</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#2e180d] hover:bg-[#452312] text-[#f59e0b] border border-[#f59e0b]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: COZY PIXEL ART CAFE ROOM */}
      {activeTab === 'scene' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#3d2011] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#120a06]">
            {/* Handcrafted Pixel-Art Cafe Interior */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#180f08]">
              <img
                src="/assets/interiors/coffee_shop_room_full.png"
                alt="Coffee Shop Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Sunlight / Warm Glow Overlay */}
              <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/35 pointer-events-none" />

              {/* Barista Marco NPC (Standing behind the Counter) */}
              <div
                onClick={handleBuyCoffee}
                className="absolute bottom-[28%] left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group z-10"
                title="Barista Marco (Click to order coffee!)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#120a06]/90 border border-[#f59e0b] text-[7px] font-pixel text-[#fde047] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Order from Marco
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/60 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/barista_idle.png"
                    alt="Barista Marco"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#1a0f08] text-[#f59e0b] border border-[#d97706] mt-0.5">
                  Marco
                </span>
              </div>

              {/* Aryan Character (Standing in front of counter) */}
              <div className="absolute bottom-[22%] left-[26%] flex flex-col items-center z-10 pointer-events-none">
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

              {/* Mango the Cat Companion (Resting on floor) */}
              <div
                onClick={() => {
                  soundManager.playCatMeow();
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.7 } });
                }}
                className="absolute bottom-[20%] right-[30%] flex flex-col items-center cursor-pointer group z-10"
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
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#1a0f08] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. ESPRESSO MACHINE (Click to brew!) */}
              <button
                onClick={handleBuyCoffee}
                className="absolute bottom-[22%] left-[22%] w-20 h-20 bg-amber-500/10 hover:bg-amber-500/30 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20"
                title="Espresso Machine (Click to brew!)"
              >
                <Coffee className="w-5 h-5 text-[#fde047] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#fde047] mt-0.5 bg-black/80 px-1 border border-amber-600">
                  BREW COFFEE
                </span>
              </button>

              {/* 2. CHALKBOARD MENU (Click to view musings) */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('musings'); }}
                className="absolute top-[18%] left-1/2 -translate-x-1/2 w-44 h-24 bg-yellow-500/10 hover:bg-yellow-500/25 border-2 border-dashed border-[#eab308] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20"
                title="Chalkboard Menu (Click to read tech reflections)"
              >
                <Sparkles className="w-4 h-4 text-[#fde047]" />
                <span className="text-[6px] font-pixel text-[#fef08a] mt-0.5 bg-black/80 px-1 border border-yellow-600">
                  CHALKBOARD MENU
                </span>
              </button>

              {/* 3. TABLE SEATING */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('musings'); }}
                className="absolute bottom-[22%] right-[12%] w-24 h-20 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#d97706] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Cafe Table (Click to sit & reflect)"
              >
                <span className="text-sm">🪑</span>
                <span className="text-[6px] font-pixel text-[#fed7aa] mt-0.5 bg-black/80 px-1 border border-amber-700">
                  TAKE A SEAT
                </span>
              </button>
            </div>

            {/* Bottom RPG Dialogue Box (Matches Screenshot) */}
            <div className="p-4 bg-[#140b06] border-t-4 border-[#3d2011] font-pixel">
              <div className="flex items-start gap-3 pb-3 mb-3 border-b border-[#30180c]">
                <div className="w-9 h-9 rounded bg-[#24130a] border border-[#f59e0b] flex items-center justify-center text-lg shrink-0">
                  ☕
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-[#f59e0b] font-bold">Barista Marco</span>
                    <span className="text-[7px] text-slate-400 font-sans">Tavern Host</span>
                  </div>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    {dialogueState === 'initial' && "Hey Aryan! Long day of coding algorithms? Would you like to buy a freshly brewed roast? Grants the 'Coffee Lover' buff (+5 Focus)!"}
                    {dialogueState === 'bought' && "Here is your fresh dark roast! Hot, fragrant, and brimming with focus. The Coffee Lover buff is renewed!"}
                    {dialogueState === 'declined' && "No worries traveler! Take a rest on the cushioned chairs or browse Aryan's engineering musings on the table."}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleBuyCoffee}
                    className="px-4 py-2 bg-[#ca8a04] hover:bg-[#a16207] text-[#0f1722] font-bold border-2 border-[#fde047] text-[8px] flex items-center gap-1.5 transition-colors cursor-pointer active:translate-y-0.5 shadow-md"
                  >
                    <Coffee className="w-3.5 h-3.5 text-[#0f1722]" />
                    <span>BUY COFFEE</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('musings');
                    }}
                    className="px-3 py-2 bg-[#24130a] hover:bg-[#381a0d] text-[#fde047] border border-[#3d2011] text-[8px] flex items-center gap-1 transition-colors"
                  >
                    <span>Read Musings</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Coffee Buff Status */}
              <div className="flex items-center justify-between text-[8px] text-[#fed7aa]">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>ACTIVE BUFF: COFFEE LOVER (+5 FOCUS)</span>
                </span>
                <span className="text-[#fde047]">CUPS ENJOYED: {localCoffeeCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: TECH MUSINGS & ARTICLES */}
      {activeTab === 'musings' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl bg-[#140b06] border-4 border-[#3d2011] shadow-2xl p-6">
            <h3 className="font-pixel text-xs text-[#f59e0b] mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>ARYAN'S HEARTHSIDE TECH REFLECTIONS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((art, idx) => (
                <div
                  key={art.title}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveArticle(idx);
                  }}
                  className={`p-4 border transition-all cursor-pointer ${
                    activeArticle === idx
                      ? 'bg-[#29140a] border-[#fde047] shadow-lg'
                      : 'bg-[#190e07] border-[#30180c] hover:bg-[#221109]'
                  }`}
                >
                  <span className="text-[8px] font-pixel text-[#ea580c] block mb-1">
                    {art.tag} · {art.date}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {art.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
