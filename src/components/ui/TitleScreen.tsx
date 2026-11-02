import React, { useState } from 'react';
import { ChevronRight, Info, Zap } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface TitleScreenProps {
  onStartAdventure: () => void;
  onOpenMap: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStartAdventure, onOpenMap }) => {
  const [showCredits, setShowCredits] = useState(false);

  const handleStart = () => {
    soundManager.playLevelUp();
    soundManager.startAmbient();
    onStartAdventure();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none bg-[#0c0517] overflow-hidden font-pixel">
      {/* Hyper Light Drifter Twilight Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140728] via-[#3b0c50] to-[#0c0517]" />

      {/* Billowing Pixel Clouds in Fuchsia & Magenta */}
      <div className="absolute top-10 -left-10 w-96 h-28 bg-[#c026d3]/30 blur-2xl pointer-events-none" />
      <div className="absolute top-28 -right-10 w-80 h-32 bg-[#f43f5e]/25 blur-2xl pointer-events-none" />
      <div className="absolute bottom-12 left-1/4 w-72 h-20 bg-[#22d3ee]/20 blur-xl pointer-events-none" />

      {/* Radiant Full Moon with Soft Magenta Aura */}
      <div className="absolute top-10 right-20 w-16 h-16 bg-[#fdf4ff] shadow-[0_0_50px_rgba(244,114,182,0.45)] pointer-events-none">
        <div className="absolute inset-1 border-2 border-[#f5d0fe]" />
      </div>

      {/* Center Box */}
      <div className="relative z-10 max-w-md w-full mx-4 text-center flex flex-col items-center">
        {/* Subtitle Badge */}
        <div className="px-3 py-1 bg-[#1e0c2b] border-2 border-[#22d3ee] text-[8px] text-[#22d3ee] mb-6 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          ✦ LIVING PIXEL-ART RPG PORTFOLIO ✦
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#fdf4ff] tracking-wider mb-2 drop-shadow-[0_4px_0_#4a0e4e]">
          TheDevNomad
        </h1>

        <p className="text-[9px] text-[#f472b6] tracking-widest uppercase mb-10 drop-shadow">
          A Developer’s Journey · Data Science & AI
        </p>

        {/* Menu Buttons */}
        <div className="w-full max-w-xs space-y-3 font-pixel">
          <button
            onClick={handleStart}
            className="w-full py-3.5 px-4 bg-[#86198f] hover:bg-[#a21caf] text-white border-2 border-[#22d3ee] shadow-[0_4px_0_#3b0764] text-[9px] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-1"
          >
            <span>START ADVENTURE</span>
            <ChevronRight className="w-4 h-4 text-[#22d3ee]" />
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenMap();
            }}
            className="w-full py-2.5 px-4 bg-[#1f1433] hover:bg-[#2d1b4a] text-[#fdf4ff] border-2 border-[#c026d3] text-[8px] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-1"
          >
            <Zap className="w-3.5 h-3.5 text-[#22d3ee]" />
            <span>FAST TRAVEL / RECRUITER</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setShowCredits(true);
            }}
            className="w-full py-2 px-4 bg-[#150a24] hover:bg-[#201036] text-[#c084fc] border border-[#581c87] text-[7px] flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Info className="w-3 h-3 text-[#22d3ee]" />
            <span>CREDITS & ENGINE</span>
          </button>
        </div>

        <p className="text-[7px] text-[#a855f7] mt-8 tracking-wider">
          WASD / ARROWS TO MOVE · CLICK-TO-MOVE · SHIFT TO SPRINT
        </p>
      </div>

      {/* Credits Modal */}
      {showCredits && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="pixel-panel max-w-md w-full bg-[#150a26] p-6 border-2 border-[#22d3ee] text-left shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            <h3 className="text-xs text-[#22d3ee] mb-3">ENGINE ARCHITECTURE</h3>
            <ul className="space-y-2 text-xs font-sans text-[#e2e8f0] mb-6">
              <li>✦ <strong>Visuals:</strong> Hyper Light Drifter & Eastward inspired pixel-art palette, volumetric clouds, bioluminescent lagoons, and animated campfire.</li>
              <li>✦ <strong>Movement:</strong> Delta-time 60 FPS character controller with wall sliding, A* pathfinding, and dash ghosting.</li>
              <li>✦ <strong>Audio:</strong> Procedural zero-dependency Web Audio API synthesizer.</li>
              <li>✦ <strong>Portfolio:</strong> 10 distinct interactive buildings, NPC schedule state machines, and quests.</li>
            </ul>
            <button
              onClick={() => setShowCredits(false)}
              className="w-full py-2 bg-[#86198f] hover:bg-[#a21caf] border-2 border-[#22d3ee] text-[8px] text-white"
            >
              CLOSE CREDITS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
