import React, { useState } from 'react';
import { Flower2, Sparkles, X, Shuffle, Heart, Sprout, Award } from 'lucide-react';
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
  const [currentFactIdx, setCurrentFactIdx] = useState<number>(0);
  const [harvestCount, setHarvestCount] = useState<number>(1);

  const handleHarvestFact = () => {
    soundManager.playChime();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#86efac', '#fde047', '#f97316']
    });

    setCurrentFactIdx((prev) => (prev + 1) % GARDEN_FACTS.length);
    setHarvestCount((prev) => prev + 1);
    if (onGainXp) onGainXp(15);
  };

  const currentFact = GARDEN_FACTS[currentFactIdx];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#08120b] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#0f1f14] border-b-2 border-[#1e3b27] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#163320] border border-[#22c55e] flex items-center justify-center text-[#22c55e]">
            <Flower2 className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#4ade80] tracking-wider uppercase">
            GARDEN
          </h1>
          <span className="text-[8px] text-[#86efac] hidden sm:inline">
            · Random Facts & Personal Lore
          </span>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#163320] hover:bg-[#204a2f] text-[#4ade80] border border-[#22c55e]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN GARDEN CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-[#0d1a11] border-4 border-[#1e3b27] shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row overflow-hidden">
          {/* LEFT: PIXEL ART GARDEN PATCH SCENE */}
          <div className="flex-1 min-h-[300px] relative bg-gradient-to-b from-[#14281a] via-[#0f2015] to-[#182e1f] flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-[#1e3b27] overflow-hidden">
            {/* Wooden Fence perimeter */}
            <div className="absolute inset-4 border-2 border-dashed border-[#78350f]/60 pointer-events-none" />

            {/* Soil crop beds */}
            <div className="absolute top-12 left-10 w-32 h-20 bg-[#3b1f0b] border border-[#582d10] p-1.5 flex flex-col justify-around">
              <div className="flex justify-around">
                <span className="text-xs">🥕</span>
                <span className="text-xs">🥕</span>
                <span className="text-xs">🥕</span>
              </div>
              <div className="flex justify-around">
                <span className="text-xs">🥕</span>
                <span className="text-xs">🥕</span>
                <span className="text-xs">🥕</span>
              </div>
            </div>

            <div className="absolute top-12 right-10 w-32 h-20 bg-[#3b1f0b] border border-[#582d10] p-1.5 flex flex-col justify-around">
              <div className="flex justify-around">
                <span className="text-xs">🥬</span>
                <span className="text-xs">🥬</span>
                <span className="text-xs">🥬</span>
              </div>
              <div className="flex justify-around">
                <span className="text-xs">🥬</span>
                <span className="text-xs">🥬</span>
                <span className="text-xs">🥬</span>
              </div>
            </div>

            {/* Old Gardener Barnaby NPC */}
            <div className="absolute bottom-10 left-16 flex flex-col items-center pointer-events-none">
              <div className="w-9 h-14 relative">
                {/* Straw Hat */}
                <div className="absolute top-0 -left-1 w-11 h-2.5 bg-[#ca8a04]" />
                <div className="absolute -top-2 left-2 w-5 h-3 bg-[#eab308]" />
                {/* Face & White Beard */}
                <div className="absolute top-2.5 left-2 w-5 h-3 bg-[#fed7aa]" />
                <div className="absolute top-5 left-1.5 w-6 h-4 bg-[#f1f5f9] rounded-b-md" />
                {/* Brown Overalls */}
                <div className="absolute top-7 left-1 w-7 h-7 bg-[#78350f]" />
              </div>
              <span className="mt-1 text-[7px] font-pixel text-[#86efac]">Barnaby</span>
            </div>

            {/* Aryan Character on Right */}
            <div className="absolute bottom-10 right-20 flex flex-col items-center pointer-events-none">
              <div className="w-9 h-14 relative">
                <div className="absolute top-0 left-1.5 w-6 h-4 bg-[#0f172a]" />
                <div className="absolute top-4 left-1 w-7 h-5 bg-[#2563eb]" />
                <div className="absolute top-4 left-3 w-2 h-5 bg-white" />
                <div className="absolute top-9 left-1.5 w-6 h-5 bg-[#1e293b]" />
              </div>
              <span className="mt-1 text-[7px] font-pixel text-[#fde047]">Aryan</span>
            </div>
          </div>

          {/* RIGHT: FACT HARVESTER & LORE */}
          <div className="w-full md:w-88 p-6 bg-[#0a160d] flex flex-col justify-between font-pixel">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#1e3b27]">
                <h3 className="text-xs text-[#4ade80] tracking-wider uppercase flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-[#4ade80]" />
                  <span>GARDEN OF TRIVIA</span>
                </h3>
                <span className="text-[8px] text-[#86efac] font-sans">
                  Fact #{currentFactIdx + 1} of {GARDEN_FACTS.length}
                </span>
              </div>

              {/* Current Fact Card */}
              <div className="p-4 bg-[#112415] border-2 border-[#22c55e]/50 shadow-md mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{currentFact.icon}</span>
                  <h4 className="text-xs font-bold text-[#fde047]">
                    {currentFact.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  "{currentFact.fact}"
                </p>
              </div>

              {/* Harvest Button */}
              <button
                onClick={handleHarvestFact}
                className="w-full py-3 bg-[#15803d] hover:bg-[#16a34a] text-white font-bold border-2 border-[#86efac] shadow-[0_3px_0_#14532d] text-[9px] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-1 mb-3"
              >
                <Shuffle className="w-3.5 h-3.5 text-[#fde047]" />
                <span>HARVEST ANOTHER FACT</span>
              </button>
            </div>

            <div className="pt-3 border-t border-[#1e3b27] flex items-center justify-between text-[8px] text-[#86efac]">
              <span>TOTAL HARVESTS: {harvestCount}</span>
              <span className="text-[#fde047]">+15 XP EACH HARVEST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
