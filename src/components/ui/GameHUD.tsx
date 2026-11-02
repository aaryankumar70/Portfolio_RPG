import React, { useState } from 'react';
import {
  Heart,
  BookOpen,
  Briefcase,
  Compass,
  Settings,
  Volume2,
  VolumeX,
  Sun,
  Sunset,
  Moon,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { TimeOfDay, Quest, BuildingData, NPC } from '../../types';
import { soundManager } from '../../audio/SoundManager';

interface GameHUDProps {
  playerLevel: number;
  playerXp: number;
  maxXp: number;
  timeOfDay: TimeOfDay;
  onTimeOfDayChange: (time: TimeOfDay) => void;
  quests: Quest[];
  nearBuilding: BuildingData | null;
  nearNPC: NPC | null;
  onEnterBuilding: (id: string) => void;
  onOpenQuests: () => void;
  onOpenInventory: () => void;
  onOpenMap: () => void;
  onOpenSettings: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  playerLevel,
  timeOfDay,
  onTimeOfDayChange,
  quests,
  nearBuilding,
  nearNPC,
  onEnterBuilding,
  onOpenQuests,
  onOpenInventory,
  onOpenMap,
  onOpenSettings,
  isSoundMuted,
  onToggleSound
}) => {
  const [questExpanded, setQuestExpanded] = useState(false);
  const nextUncompletedQuest = quests.find(q => !q.completed) || quests[0];

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-20 font-pixel">
      {/* 1. TOP-LEFT: MINIMAL AUTHENTIC PIXEL RPG HEALTH & LEVEL BADGE */}
      <div className="absolute top-3 left-3 pointer-events-auto flex items-center gap-2 pixel-panel px-3 py-2 bg-[#12141f]/95 shadow-md">
        {/* Pixel Avatar Pip */}
        <div className="w-7 h-7 bg-[#1c2236] border border-[#3b4668] flex items-center justify-center shrink-0">
          <div className="w-4 h-4 bg-[#831b26] relative">
            <div className="w-3 h-2 bg-[#f5cda4] mx-auto" />
            <div className="w-1 h-1 bg-[#38bdf8] absolute top-1 left-1" />
          </div>
        </div>

        {/* Name & Pips */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3 text-[9px] text-[#e2e8f0]">
            <span className="text-[#fde047] tracking-wider">TheDevNomad</span>
            <span className="text-[8px] text-[#94a3b8]">LV.{playerLevel}</span>
          </div>

          {/* Minimal 3-pip Health Indicator */}
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-[#e11d48] fill-[#e11d48]" />
            <div className="w-20 h-2 pixel-bar-container overflow-hidden">
              <div className="h-full w-full pixel-bar-fill-hp" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP-RIGHT: COMPACT RETRO ACTION TOOLBAR */}
      <div className="absolute top-3 right-3 pointer-events-auto flex items-center gap-1.5">
        <button
          onClick={() => { soundManager.playClick(); onOpenQuests(); }}
          className="pixel-btn px-2.5 py-1.5 flex items-center gap-1.5 text-[9px]"
          title="Quests [J]"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#fde047]" />
          <span className="hidden sm:inline">QUESTS</span>
          <span className="text-[7px] text-[#94a3b8]">[J]</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); onOpenInventory(); }}
          className="pixel-btn px-2.5 py-1.5 flex items-center gap-1.5 text-[9px]"
          title="Inventory [I]"
        >
          <Briefcase className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span className="hidden sm:inline">ITEMS</span>
          <span className="text-[7px] text-[#94a3b8]">[I]</span>
        </button>

        <button
          onClick={() => { soundManager.playClick(); onOpenMap(); }}
          className="pixel-btn px-2.5 py-1.5 flex items-center gap-1.5 text-[9px]"
          title="World Map [M]"
        >
          <Compass className="w-3.5 h-3.5 text-[#a855f7]" />
          <span className="hidden sm:inline">MAP</span>
          <span className="text-[7px] text-[#94a3b8]">[M]</span>
        </button>

        {/* Time of Day Cycle Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            const cycle: TimeOfDay[] = ['morning', 'afternoon', 'sunset', 'night'];
            const nextIdx = (cycle.indexOf(timeOfDay) + 1) % cycle.length;
            onTimeOfDayChange(cycle[nextIdx]);
          }}
          className="pixel-btn px-2 py-1.5 text-[9px]"
          title="Cycle Day/Night Time"
        >
          {timeOfDay === 'morning' && <Sun className="w-3.5 h-3.5 text-[#fde047]" />}
          {timeOfDay === 'afternoon' && <Sun className="w-3.5 h-3.5 text-[#f97316]" />}
          {timeOfDay === 'sunset' && <Sunset className="w-3.5 h-3.5 text-[#f43f5e]" />}
          {timeOfDay === 'night' && <Moon className="w-3.5 h-3.5 text-[#93c5fd]" />}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="pixel-btn px-2 py-1.5 text-[9px]"
          title={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isSoundMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#f43f5e]" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#38bdf8]" />
          )}
        </button>

        <button
          onClick={() => { soundManager.playClick(); onOpenSettings(); }}
          className="pixel-btn px-2 py-1.5 text-[9px]"
          title="Settings"
        >
          <Settings className="w-3.5 h-3.5 text-[#94a3b8]" />
        </button>
      </div>

      {/* 3. SUBTLE COLLAPSIBLE 1-LINE QUEST NOTIFICATION (NOT A GIANT CARD!) */}
      {nextUncompletedQuest && (
        <div className="absolute top-14 right-3 pointer-events-auto">
          <div
            onClick={() => { soundManager.playClick(); setQuestExpanded(!questExpanded); }}
            className="pixel-panel px-3 py-1.5 bg-[#12141f]/90 text-[8px] text-[#cbd5e1] flex items-center gap-2 cursor-pointer hover:bg-[#1c2236] transition-colors"
          >
            <span className="text-[#fde047]">✦</span>
            <span className="text-[#94a3b8]">QUEST:</span>
            <span className="text-[#f8fafc] font-bold">{nextUncompletedQuest.title}</span>
            {questExpanded ? <ChevronDown className="w-3 h-3 text-[#94a3b8]" /> : <ChevronRight className="w-3 h-3 text-[#94a3b8]" />}
          </div>

          {/* Collapsible mini quest view */}
          {questExpanded && (
            <div className="pixel-panel p-3 mt-1 w-64 bg-[#0d0f18]/95 text-[8px] text-[#94a3b8] space-y-2">
              <p className="text-[#e2e8f0] leading-relaxed">{nextUncompletedQuest.description}</p>
              <div className="flex justify-between items-center pt-1 border-t border-[#23283b]">
                <span className="text-[#fde047]">+{nextUncompletedQuest.rewardXp} EXP</span>
                <button
                  onClick={() => { soundManager.playClick(); onOpenQuests(); }}
                  className="text-[#38bdf8] underline"
                >
                  View Journal [J]
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. CONTEXT-SENSITIVE INTERACTION PROMPT (GLOWING HYPER LIGHT DRIFTER ACTION PILL) */}
      {nearBuilding && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button
            onClick={() => {
              soundManager.playEnterBuilding();
              onEnterBuilding(nearBuilding.id);
            }}
            className="px-4 py-2.5 flex items-center gap-2.5 text-[10px] text-white tracking-wider cursor-pointer bg-[#86198f] hover:bg-[#a21caf] border-2 border-[#22d3ee] shadow-[0_0_25px_rgba(34,211,238,0.45)] transition-all active:translate-y-0.5"
          >
            <span className="bg-[#120824] px-1.5 py-0.5 text-[#22d3ee] border border-[#22d3ee] text-[9px] shadow-[0_0_6px_#22d3ee]">
              [E]
            </span>
            <span>ENTER {nearBuilding.name.toUpperCase()}</span>
          </button>
        </div>
      )}

      {nearNPC && !nearBuilding && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="px-4 py-2 bg-[#140b24]/95 text-[9px] text-[#fdf4ff] border-2 border-[#22d3ee] flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.35)]">
            <span className="bg-[#1e0e36] px-1.5 py-0.5 text-[#22d3ee] border border-[#22d3ee] text-[8px]">
              [E]
            </span>
            <span>TALK TO {nearNPC.name.toUpperCase()}</span>
          </div>
        </div>
      )}

      {/* 5. MINIMAL BOTTOM-LEFT CONTROLS REMINDER */}
      <div className="absolute bottom-3 left-3 pointer-events-auto text-[8px] text-[#64748b] bg-[#090b12]/80 px-2 py-1 border border-[#1e2436] hidden md:block">
        WASD/ARROWS: MOVE · SHIFT: SPRINT · [E]: INTERACT · CLICK TO MOVE
      </div>
    </div>
  );
};
