import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, ChevronRight } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface IntroSequenceProps {
  onBegin: () => void;
  onFastTravel: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onBegin, onFastTravel }) => {
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  const dialogueLines = [
    "Greetings, traveler.",
    "You are about to witness the adventure of Aryan.",
    "This story is still being written.",
    "Would you like to explore?"
  ];

  // Auto step dialogue lines or click to advance
  useEffect(() => {
    if (dialogueIndex < dialogueLines.length - 1) {
      const timer = setTimeout(() => {
        setDialogueIndex((prev) => prev + 1);
        soundManager.playClick();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [dialogueIndex, dialogueLines.length]);

  const handleStart = () => {
    soundManager.playLevelUp();
    soundManager.startAmbient();
    setIsFadingOut(true);
    setTimeout(() => {
      onBegin();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center select-none bg-[#080d12]/90 backdrop-blur-md transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle pixel art background aura */}
      <div className="absolute inset-0 bg-radial from-[#1e3a5f]/40 via-[#0a1118]/80 to-[#05080c] pointer-events-none" />

      {/* Floating dust/light particles */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Dialogue Box */}
      <div className="relative z-10 w-full max-w-xl mx-4 font-pixel">
        {/* Top badge */}
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#16222f] border-2 border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.25)] text-[#fde047] text-[9px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b] animate-spin" />
            <span>Aryan's Adventure · Living RPG Portfolio</span>
          </div>
        </div>

        {/* Dialogue Card with Classic RPG Gold / Dark Navy Border */}
        <div className="bg-[#0f1722] border-4 border-[#2b3d54] shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_0_0_2px_#f59e0b] p-6 sm:p-8 relative">
          {/* Decorative corner brackets */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#f59e0b]" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#f59e0b]" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#f59e0b]" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#f59e0b]" />

          {/* Speaker Info Row */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-[#1e2c3e]">
            {/* Pixel Character Avatar Frame */}
            <div className="w-16 h-16 shrink-0 bg-[#16222f] border-2 border-[#f59e0b] flex items-center justify-center relative overflow-hidden shadow-inner">
              {/* Handcrafted pixel avatar representing Aryan */}
              <div className="w-10 h-10 relative">
                {/* Dark styled hair */}
                <div className="absolute top-0 left-2 w-6 h-3 bg-[#1e293b]" />
                <div className="absolute top-1 left-1 w-8 h-2 bg-[#0f172a]" />
                {/* Face */}
                <div className="absolute top-3 left-2 w-6 h-4 bg-[#fed7aa]" />
                {/* Eyes */}
                <div className="absolute top-4 left-3 w-1.5 h-1.5 bg-[#0284c7]" />
                <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-[#0284c7]" />
                {/* Blue blazer & white shirt */}
                <div className="absolute bottom-0 left-1 w-8 h-3 bg-[#2563eb]" />
                <div className="absolute bottom-0 left-4 w-2 h-3 bg-[#ffffff]" />
              </div>
              {/* Floating Companion wisp */}
              <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#38bdf8] rounded-full animate-ping opacity-75" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base text-[#fde047] font-bold tracking-wider">
                  Aryan
                </h2>
                <span className="text-[8px] px-1.5 py-0.5 bg-[#1e3a5f] text-[#38bdf8] border border-[#0284c7]">
                  Data Explorer · Lv. 18
                </span>
              </div>
              <p className="text-[8px] text-[#94a3b8] mt-1 font-sans">
                MCA in Data Science & AI · Welcome to my living fantasy world
              </p>
            </div>
          </div>

          {/* Dialogue Text Lines Display */}
          <div className="min-h-[100px] flex flex-col justify-center space-y-2.5 mb-6 text-slate-100">
            {dialogueLines.slice(0, dialogueIndex + 1).map((line, idx) => (
              <p
                key={idx}
                className={`text-xs sm:text-sm tracking-wide leading-relaxed font-sans transition-all duration-300 ${
                  idx === dialogueIndex
                    ? 'text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
                    : 'text-[#94a3b8]'
                }`}
              >
                <span className="text-[#f59e0b] mr-2 font-pixel text-[10px]">▶</span>
                "{line}"
              </p>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t-2 border-[#1e2c3e]">
            <button
              onClick={handleStart}
              className="w-full sm:flex-1 py-3 px-5 bg-gradient-to-r from-[#ca8a04] via-[#eab308] to-[#ca8a04] hover:brightness-110 text-[#0f1722] font-bold border-2 border-[#fef08a] shadow-[0_4px_0_#854d0e] text-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-1"
            >
              <span>BEGIN ADVENTURE</span>
              <ChevronRight className="w-4 h-4 text-[#0f1722]" />
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onFastTravel();
              }}
              className="w-full sm:w-auto py-3 px-4 bg-[#16222f] hover:bg-[#1e2e3f] text-[#93c5fd] border-2 border-[#3b82f6] text-[8px] flex items-center justify-center gap-1.5 cursor-pointer transition-all active:translate-y-1"
            >
              <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>RECRUITER / FAST TRAVEL</span>
            </button>
          </div>

          {/* Controls tip */}
          <div className="mt-4 text-center">
            <span className="text-[7px] text-[#64748b] tracking-wider uppercase">
              Controls: WASD / Arrows to Move · Click on ground to walk · [E] to Enter Buildings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
