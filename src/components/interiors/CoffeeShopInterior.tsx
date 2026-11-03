import React, { useState } from 'react';
import { ArrowLeft, Coffee, Flame, Sparkles, BookOpen, Heart, X, Check } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'scene' | 'menu' | 'musings'>('scene');
  const [activeArticle, setActiveArticle] = useState<number>(0);

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
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#eab308', '#ca8a04', '#ffffff', '#78350f']
    });

    setLocalCoffeeCount((prev) => prev + 1);
    setDialogueState('bought');
    if (onBuyCoffee) onBuyCoffee();
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0d0906] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO BAR (Matches Screenshot Header) */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#1a100a] border-b-2 border-[#3d2315] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#2e190f] border border-[#f59e0b] flex items-center justify-center text-[#f59e0b]">
            <Coffee className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#f59e0b] tracking-wider uppercase">
            COFFEE SHOP
          </h1>
          <span className="text-[8px] text-[#a88265] hidden sm:inline">
            · Take a Break
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('scene'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'scene'
                ? 'bg-[#ca8a04] text-[#0f1722] font-bold border-[#fde047]'
                : 'bg-[#24130a] text-[#a88265] border-[#3d2315] hover:text-white'
            }`}
          >
            INTERIOR SCENE
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('musings'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'musings'
                ? 'bg-[#ca8a04] text-[#0f1722] font-bold border-[#fde047]'
                : 'bg-[#24130a] text-[#a88265] border-[#3d2315] hover:text-white'
            }`}
          >
            TECH ESSAYS
          </button>
        </div>

        {/* Close Button matching screenshot */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#2e190f] hover:bg-[#452516] text-[#f59e0b] border border-[#f59e0b]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {activeTab === 'scene' && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* PIXEL ART INTERIOR STAGE (Direct Match to Reference Screenshot Bottom-Left) */}
            <div className="w-full relative rounded-sm border-4 border-[#3d2315] shadow-[0_12px_40px_rgba(0,0,0,0.8)] bg-[#21140e] overflow-hidden">
              {/* Back wall: Wood panels, shelves, coffee sign */}
              <div className="h-64 sm:h-72 w-full relative bg-gradient-to-b from-[#2a170d] via-[#1f1109] to-[#26150c] flex items-center justify-center overflow-hidden">
                {/* Horizontal wooden planks & wall trim */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Coffee Signboard on Back Wall */}
                <div className="absolute top-6 px-4 py-1.5 bg-[#170c06] border-2 border-[#ca8a04] shadow-md font-pixel text-[#fde047] text-[10px] tracking-widest uppercase">
                  ☕ COFFEE
                </div>

                {/* Wooden Wall Shelves with Jars */}
                <div className="absolute top-16 left-12 right-12 flex justify-between px-6 pointer-events-none">
                  {/* Left Shelf */}
                  <div className="w-36 h-3 bg-[#422312] border-b-2 border-[#170c06] relative">
                    <div className="absolute -top-4 left-2 w-3 h-4 bg-[#78350f] border border-[#92400e]" />
                    <div className="absolute -top-5 left-8 w-4 h-5 bg-[#0284c7] border border-[#38bdf8]" />
                    <div className="absolute -top-4 left-16 w-3 h-4 bg-[#16a34a] border border-[#4ade80]" />
                    <div className="absolute -top-5 left-24 w-4 h-5 bg-[#ea580c] border border-[#fb923c]" />
                  </div>

                  {/* Right Shelf */}
                  <div className="w-36 h-3 bg-[#422312] border-b-2 border-[#170c06] relative">
                    <div className="absolute -top-5 left-4 w-4 h-5 bg-[#eab308] border border-[#fef08a]" />
                    <div className="absolute -top-4 left-12 w-3 h-4 bg-[#78350f] border border-[#92400e]" />
                    <div className="absolute -top-5 left-20 w-4 h-5 bg-[#0284c7] border border-[#38bdf8]" />
                    <div className="absolute -top-4 left-28 w-3 h-4 bg-[#a855f7] border border-[#c084fc]" />
                  </div>
                </div>

                {/* Warm Hearth / Window light */}
                <div className="absolute top-10 left-6 w-20 h-28 bg-[#fef08a]/10 border-2 border-[#5c3219] shadow-inner pointer-events-none" />
                <div className="absolute top-10 right-6 w-20 h-28 bg-[#fef08a]/10 border-2 border-[#5c3219] shadow-inner pointer-events-none" />

                {/* Wooden Counter in Center */}
                <div className="absolute bottom-16 w-3/4 max-w-lg h-14 bg-[#3d2011] border-2 border-[#5c3219] shadow-lg flex items-center justify-between px-6">
                  {/* Espresso Machine on Counter */}
                  <div className="w-10 h-10 bg-[#475569] border border-[#94a3b8] relative -top-3 shadow-md">
                    <div className="w-2 h-2 bg-[#ef4444] rounded-full mx-auto mt-1" />
                    <div className="w-6 h-1 bg-[#cbd5e1] mx-auto mt-1" />
                    {/* Steam rising */}
                    <div className="absolute -top-3 left-3 w-1.5 h-3 bg-white/40 rounded-full blur-[1px] animate-pulse" />
                  </div>

                  {/* Coffee Pots & Cups */}
                  <div className="flex gap-2 -top-2 relative">
                    <div className="w-4 h-5 bg-[#ca8a04] border border-[#fef08a]" />
                    <div className="w-3 h-3 bg-white border border-slate-300 rounded-sm" />
                    <div className="w-3 h-3 bg-white border border-slate-300 rounded-sm" />
                  </div>
                </div>

                {/* Barista NPC Behind Counter */}
                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                  {/* Barista pixel character */}
                  <div className="w-8 h-12 relative">
                    {/* Dark hair */}
                    <div className="absolute top-0 left-1 w-6 h-3 bg-[#1e293b]" />
                    {/* Face */}
                    <div className="absolute top-3 left-1.5 w-5 h-3.5 bg-[#fed7aa]" />
                    {/* Eyes */}
                    <div className="absolute top-4 left-2.5 w-1 h-1 bg-[#0f172a]" />
                    <div className="absolute top-4 right-2.5 w-1 h-1 bg-[#0f172a]" />
                    {/* Green Apron */}
                    <div className="absolute top-6 left-1 w-6 h-6 bg-[#15803d] border-t border-[#86efac]" />
                  </div>
                </div>

                {/* Aryan Pixel Character in Front of Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                  {/* Aryan back-view or front view */}
                  <div className="w-9 h-14 relative">
                    {/* Hair */}
                    <div className="absolute top-0 left-1.5 w-6 h-4 bg-[#0f172a]" />
                    {/* Blue jacket & white shirt */}
                    <div className="absolute top-4 left-1 w-7 h-5 bg-[#2563eb]" />
                    <div className="absolute top-4 left-3 w-2 h-5 bg-white" />
                    {/* Dark pants & shoes */}
                    <div className="absolute top-9 left-1.5 w-6 h-5 bg-[#1e293b]" />
                  </div>
                </div>

                {/* Potted Plants in Corners */}
                <div className="absolute bottom-6 left-6 pointer-events-none">
                  <div className="w-6 h-6 bg-[#16a34a] rounded-full mx-auto" />
                  <div className="w-8 h-6 bg-[#78350f] border border-[#92400e]" />
                </div>
                <div className="absolute bottom-6 right-6 pointer-events-none">
                  <div className="w-6 h-6 bg-[#16a34a] rounded-full mx-auto" />
                  <div className="w-8 h-6 bg-[#78350f] border border-[#92400e]" />
                </div>
              </div>

              {/* DIALOGUE BOX (Identical to Reference Screenshot) */}
              <div className="p-5 bg-[#140b07] border-t-4 border-[#3d2315] font-pixel">
                <div className="text-[10px] text-[#f59e0b] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span>Barista</span>
                  <span className="text-[8px] text-[#a88265] font-sans">
                    (Marco · Hearthside Coffee Master)
                  </span>
                </div>

                {dialogueState === 'initial' && (
                  <>
                    <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed mb-4">
                      "Hey Aryan! Long day of coding? Would you like to buy a coffee?"
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleBuyCoffee}
                        className="px-5 py-2.5 bg-[#ca8a04] hover:bg-[#eab308] text-[#0f1722] font-bold border-2 border-[#fef08a] shadow-[0_3px_0_#78350f] text-[9px] flex items-center gap-1.5 cursor-pointer transition-all active:translate-y-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Yes, please!</span>
                      </button>

                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setDialogueState('declined');
                        }}
                        className="px-4 py-2.5 bg-[#26150c] hover:bg-[#3d2011] text-[#cbd5e1] border-2 border-[#4a2610] text-[9px] cursor-pointer transition-all active:translate-y-1"
                      >
                        <span>No, thanks</span>
                      </button>
                    </div>
                  </>
                )}

                {dialogueState === 'bought' && (
                  <div className="animate-in fade-in duration-300">
                    <p className="text-xs sm:text-sm text-[#fde047] font-sans leading-relaxed mb-3">
                      ☕ "Fresh double-shot espresso poured! Focus has been boosted by +5. You've now conquered {localCoffeeCount} coffee cups across your journey!"
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleBuyCoffee}
                        className="px-4 py-2 bg-[#ca8a04] hover:bg-[#eab308] text-[#0f1722] font-bold border border-[#fef08a] text-[8px] flex items-center gap-1 cursor-pointer transition-all active:translate-y-0.5"
                      >
                        <Coffee className="w-3 h-3" />
                        <span>Order another cup!</span>
                      </button>
                      <button
                        onClick={() => setDialogueState('initial')}
                        className="px-3 py-2 bg-[#26150c] hover:bg-[#3d2011] text-[#a88265] border border-[#4a2610] text-[8px] cursor-pointer"
                      >
                        Reset Conversation
                      </button>
                    </div>
                  </div>
                )}

                {dialogueState === 'declined' && (
                  <div className="animate-in fade-in duration-300">
                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-3">
                      "No worries, friend! Take a seat by the bookshelf and read through Aryan's technical essays whenever you're ready."
                    </p>
                    <button
                      onClick={() => setDialogueState('initial')}
                      className="px-3 py-1.5 bg-[#ca8a04] text-[#0f1722] font-bold text-[8px] border border-[#fef08a]"
                    >
                      Talk to Barista again
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Cafe Stats Banner */}
            <div className="w-full mt-4 flex items-center justify-between px-4 py-2.5 bg-[#1a100a] border-2 border-[#3d2315] font-pixel text-[8px] text-[#f59e0b]">
              <span className="flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-[#eab308]" />
                TOTAL COFFEE CUPS: {localCoffeeCount}
              </span>
              <span className="flex items-center gap-1.5 text-[#38bdf8]">
                <Sparkles className="w-3.5 h-3.5" />
                ACTIVE BUFF: COFFEE LOVER (+5 FOCUS)
              </span>
            </div>
          </div>
        )}

        {/* TECH MUSINGS TAB */}
        {activeTab === 'musings' && (
          <div className="w-full max-w-4xl bg-[#170e08] p-6 border-2 border-[#3d2315] shadow-lg">
            <h3 className="font-pixel text-xs text-[#f59e0b] mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>ARYAN'S COFFEE HOUSE ESSAYS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 space-y-2 font-pixel">
                {articles.map((art, idx) => {
                  const isActive = activeArticle === idx;
                  return (
                    <div
                      key={art.title}
                      onClick={() => {
                        soundManager.playClick();
                        setActiveArticle(idx);
                      }}
                      className={`p-3 cursor-pointer transition-all border ${
                        isActive
                          ? 'bg-[#ca8a04] text-[#0f1722] font-bold border-[#fef08a]'
                          : 'bg-[#24130a] text-[#a88265] border-[#3d2315] hover:text-white'
                      }`}
                    >
                      <span className="text-[7px] text-[#fde047] block mb-1">{art.tag}</span>
                      <h4 className="text-[9px] leading-tight mb-1">{art.title}</h4>
                      <span className="text-[7px] text-slate-400 font-sans">{art.date}</span>
                    </div>
                  );
                })}
              </div>

              <div className="md:col-span-7 bg-[#0f0905] p-5 border border-[#2d1609] font-sans">
                <span className="text-[8px] font-pixel text-[#ca8a04] uppercase tracking-wider block mb-2">
                  {articles[activeArticle].tag}
                </span>
                <h2 className="text-base font-bold text-white mb-2">
                  {articles[activeArticle].title}
                </h2>
                <p className="text-[10px] text-[#a88265] mb-4">
                  {articles[activeArticle].date}
                </p>
                <div className="text-xs text-slate-300 leading-relaxed border-t border-[#2d1609] pt-3">
                  {articles[activeArticle].content}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
