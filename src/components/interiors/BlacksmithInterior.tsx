import React, { useState } from 'react';
import { Hammer, Flame, Sparkles, X, Shield, Swords, Cpu, Terminal, Zap } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'weapons' | 'matrix'>('weapons');

  const handleStrikeAnvil = () => {
    soundManager.playAnvilClink();
    setAnvilStruck(true);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.65 },
      colors: ['#f97316', '#fde047', '#ef4444']
    });
    setTimeout(() => setAnvilStruck(false), 200);
    if (onGainXp) onGainXp(10);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#110c07] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#1f130b] border-b-2 border-[#472714] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#2e190d] border border-[#f97316] flex items-center justify-center text-[#f97316]">
            <Hammer className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#fb923c] tracking-wider uppercase">
            BLACKSMITH WORKSHOP
          </h1>
          <span className="text-[8px] text-[#fed7aa] hidden sm:inline">
            · Upgrade Skills & Weapons
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('weapons'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'weapons'
                ? 'bg-[#ea580c] text-white font-bold border-[#fed7aa]'
                : 'bg-[#29160d] text-[#a88265] border-[#472714] hover:text-white'
            }`}
          >
            WEAPON ARSENAL
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('matrix'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'matrix'
                ? 'bg-[#ea580c] text-white font-bold border-[#fed7aa]'
                : 'bg-[#29160d] text-[#a88265] border-[#472714] hover:text-white'
            }`}
          >
            SKILL MATRIX
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#2e190d] hover:bg-[#422212] text-[#fb923c] border border-[#f97316]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN FORGE CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {activeTab === 'weapons' && (
          <div className="w-full max-w-5xl bg-[#170e08] border-4 border-[#472714] shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row overflow-hidden">
            {/* LEFT: WEAPON SELECTION LIST */}
            <div className="w-full md:w-80 p-5 bg-[#140b06] border-b-4 md:border-b-0 md:border-r-4 border-[#472714] flex flex-col justify-between font-pixel">
              <div>
                <div className="pb-3 mb-3 border-b-2 border-[#3d2011] flex items-center justify-between">
                  <h3 className="text-xs text-[#fb923c] uppercase tracking-wider flex items-center gap-1.5">
                    <Swords className="w-4 h-4 text-[#fb923c]" />
                    <span>FORGED GEAR</span>
                  </h3>
                  <span className="text-[8px] text-slate-400 font-sans">Aryan's Tech</span>
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

              {/* Interactive Anvil in Sidebar */}
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
                  <span className="text-[8px] text-[#fb923c] block">ANVIL OF REFINEMENT</span>
                  <span className="text-[7px] text-slate-400 font-sans">Click to temper code</span>
                </div>
              </div>
            </div>

            {/* RIGHT: SELECTED WEAPON INSPECTOR */}
            <div className="flex-1 p-6 bg-[#1a110a] flex flex-col justify-between">
              <div>
                {/* Weapon Header */}
                <div className="flex items-start justify-between pb-4 mb-4 border-b-2 border-[#3d2011]">
                  <div>
                    <span className="text-[8px] font-pixel text-[#ea580c] tracking-widest uppercase">
                      LEVEL {Math.floor((selectedWeapon.masteryLevel || selectedWeapon.level) / 5)} ARTIFACT
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

                {/* Lore / Description */}
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
                <div className="p-3 bg-[#120b06] border border-[#3d2011]">
                  <div className="flex justify-between text-[8px] font-pixel text-slate-400 mb-1">
                    <span>TEMPERING PROGRESS</span>
                    <span className="text-[#fde047]">{selectedWeapon.masteryLevel || selectedWeapon.level} / 100</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#26150c] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#fde047]"
                      style={{ width: `${selectedWeapon.masteryLevel || selectedWeapon.level}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="mt-6 pt-3 border-t border-[#3d2011] flex items-center justify-between text-[8px] font-pixel text-[#a88265]">
                <span>BLACKSMITH TORVALD: "WELL-HONED ALGORITHMS NEVER DULL."</span>
                <span className="text-emerald-400">COMBAT READY</span>
              </div>
            </div>
          </div>
        )}

        {/* SKILL MATRIX TAB */}
        {activeTab === 'matrix' && (
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
        )}
      </div>
    </div>
  );
};
