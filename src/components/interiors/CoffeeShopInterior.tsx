import React, { useState } from 'react';
import { ArrowLeft, Coffee, Flame, BookOpen } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface CoffeeShopInteriorProps {
  onBack: () => void;
}

export const CoffeeShopInterior: React.FC<CoffeeShopInteriorProps> = ({ onBack }) => {
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

  return (
    <div className="relative w-full h-full flex flex-col bg-[#140b06] text-slate-100 overflow-hidden select-text">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#1f1008] border-b-2 border-[#45220f] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#f59e0b]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE TAVERN</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#f59e0b] tracking-wider">HEARTHSTONE TAVERN & COFFEE</h1>
          <p className="text-[8px] text-[#d97706]">ESSAYS & MUSINGS</p>
        </div>

        <div className="text-[9px] text-[#94a3b8]">ESC: BACK</div>
      </header>

      {/* 2. MAIN TAVERN CONTAINER */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl pixel-panel bg-[#1a0f07] p-6 sm:p-8 mb-6 border-2 border-[#4a2610] relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 mb-6 border-b-2 border-[#331a0b]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#2d1609] border border-[#f59e0b] flex items-center justify-center text-[#f59e0b]">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-pixel text-base text-white">The Nomad's Reading Hearth</h2>
                <p className="text-xs text-[#a88265] font-sans">Freshly brewed coffee, technical reflections, and engineering philosophy.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#2d1609] px-3 py-1 border border-[#f59e0b]/40 text-[8px] font-pixel text-[#fde047]">
              <Flame className="w-3 h-3 text-[#f97316]" />
              <span>HEARTH WARMTH</span>
            </div>
          </div>

          {/* 2-Column: Articles Menu & Reader */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 space-y-2 font-pixel">
              {articles.map((art, idx) => {
                const isActive = activeArticle === idx;
                return (
                  <div
                    key={art.title}
                    onClick={() => { soundManager.playClick(); setActiveArticle(idx); }}
                    className={`p-3 cursor-pointer transition-all border ${
                      isActive ? 'pixel-btn-gold text-white font-bold' : 'pixel-btn text-[#a88265]'
                    }`}
                  >
                    <span className="text-[7px] text-[#fde047] block mb-1">{art.tag}</span>
                    <h4 className="text-[8px] leading-tight mb-1">{art.title}</h4>
                    <span className="text-[7px] text-[#cbd5e1] font-sans">{art.date}</span>
                  </div>
                );
              })}
            </div>

            <div className="md:col-span-7 bg-[#100904] p-5 border border-[#2d1609] font-sans">
              <span className="font-pixel text-[8px] text-[#f59e0b] block mb-1">
                {articles[activeArticle].tag} · {articles[activeArticle].date}
              </span>
              <h3 className="font-pixel text-sm text-white leading-snug mb-3">
                {articles[activeArticle].title}
              </h3>
              <div className="w-full h-px bg-[#331a0b] mb-4" />
              <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                {articles[activeArticle].content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
