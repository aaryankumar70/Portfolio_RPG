import React, { useState } from 'react';
import { ArrowLeft, Hammer, Flame, Code2, BrainCircuit, Wrench, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { soundManager } from '../../audio/SoundManager';

interface BlacksmithInteriorProps {
  onBack: () => void;
}

export const BlacksmithInterior: React.FC<BlacksmithInteriorProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string>('languages');
  const [anvilStruck, setAnvilStruck] = useState<boolean>(false);

  const selectedCategory = SKILL_CATEGORIES.find((c) => c.id === activeCategory) || SKILL_CATEGORIES[0];

  const handleStrike = () => {
    soundManager.playAnvilClink();
    setAnvilStruck(true);
    setTimeout(() => setAnvilStruck(false), 250);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0f0c08] text-slate-100 overflow-hidden select-text">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#1a1209] border-b-2 border-[#3d240f] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#f97316]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE FORGE</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#f97316] tracking-wider">BLACKSMITH WORKSHOP</h1>
          <p className="text-[8px] text-[#a88265]">TEMPERED CODE & ARSENAL</p>
        </div>

        <button
          onClick={handleStrike}
          className="pixel-btn-gold px-3 py-1.5 text-[8px] flex items-center gap-1.5"
        >
          <Hammer className="w-3 h-3 text-[#fde047]" />
          <span>STRIKE ANVIL</span>
        </button>
      </header>

      {/* 2. MAIN FORGE INTERIOR CONTAINER */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl pixel-panel bg-[#17110a] p-6 sm:p-8 mb-6 border-2 border-[#452710] relative">
          {/* Active Furnace & Anvil Station Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 mb-6 border-b-2 border-[#2b190c]">
            <div className="flex items-center gap-4">
              {/* Interactive Pixel Anvil */}
              <div
                onClick={handleStrike}
                className={`w-16 h-16 bg-[#21160d] border-2 border-[#f97316] flex items-center justify-center cursor-pointer shadow-inner transition-transform ${
                  anvilStruck ? 'scale-90 rotate-3' : 'hover:scale-105'
                }`}
                title="Click to strike the anvil!"
              >
                <Hammer className="w-8 h-8 text-[#f97316]" />
                {anvilStruck && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Sparkles className="w-10 h-10 text-yellow-300 animate-ping" />
                  </div>
                )}
              </div>

              <div>
                <span className="text-[8px] font-pixel text-[#f97316] bg-[#2b170a] px-2 py-0.5 border border-[#f97316]/40 inline-block mb-1">
                  FORGE TEMPERATURE: 1400°C
                </span>
                <h2 className="text-xl font-pixel font-bold text-white">Technical Arsenal</h2>
                <p className="text-xs text-[#a88265] font-sans mt-0.5">
                  Languages, machine learning architectures, and tooling tempered across real-world systems.
                </p>
              </div>
            </div>

            {/* Pixel Anvil Spark Indicator */}
            <div className="flex items-center gap-2 bg-[#261408] px-3 py-1.5 border border-[#f97316]/40 text-[8px] font-pixel text-[#fde047]">
              <Flame className="w-3.5 h-3.5 text-[#f97316]" />
              <span>HAMMER READY</span>
            </div>
          </div>

          {/* 2-Column: Categories & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Category Buttons */}
            <div className="md:col-span-4 space-y-2 font-pixel">
              {SKILL_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { soundManager.playClick(); setActiveCategory(cat.id); }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-[8px] transition-all text-left ${
                      isActive ? 'pixel-btn-gold text-white font-bold' : 'pixel-btn text-[#a88265]'
                    }`}
                  >
                    <span>{cat.name.toUpperCase()}</span>
                    <span className="text-[7px] text-[#fde047]">{cat.skills.length}</span>
                  </button>
                );
              })}
            </div>

            {/* Skill Bars */}
            <div className="md:col-span-8 space-y-3 font-sans">
              <h3 className="font-pixel text-[10px] text-[#f97316] pb-2 border-b border-[#2b190c]">
                {selectedCategory.name.toUpperCase()} PROFICIENCY
              </h3>

              {selectedCategory.skills.map((skill) => (
                <div key={skill.name} className="bg-[#120d07] p-3 border border-[#2b190c]">
                  <div className="flex justify-between items-center mb-1 font-pixel text-[8px]">
                    <span className="text-white">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#a88265] text-[7px]">{skill.experience}</span>
                      <span className="text-[#fde047]">{skill.level}%</span>
                    </div>
                  </div>

                  {/* Tempered Steel Pixel Bar */}
                  <div className="w-full h-2.5 pixel-bar-container overflow-hidden">
                    <div
                      className="h-full pixel-bar-fill-gold transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <p className="text-xs text-[#94a3b8] mt-1.5 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
