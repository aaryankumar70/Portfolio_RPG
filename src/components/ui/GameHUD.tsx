import React, { useState } from 'react';
import {
  Heart,
  Zap,
  Gem,
  BookOpen,
  Compass,
  Settings,
  Volume2,
  VolumeX,
  Bot,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  User,
  Swords,
  Briefcase,
  Home
} from 'lucide-react';
import { TimeOfDay, Quest, BuildingData, NPC, ActiveBuff, PlayerStats } from '../../types';
import { soundManager } from '../../audio/SoundManager';
import { ARYAN_STATS, INITIAL_BUFFS } from '../../data/portfolioData';

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
  onOpenCompanion: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onFastTravelToTownSquare: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  playerLevel = 18,
  playerXp = 1280,
  maxXp = 2000,
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
  onOpenCompanion,
  isSoundMuted,
  onToggleSound,
  onFastTravelToTownSquare
}) => {
  const [showMobileControls, setShowMobileControls] = useState<boolean>(true);

  // Active ongoing quest (e.g. Analyze Sales Dashboard)
  const ongoingQuest = quests.find(q => q.id === 'quest_sales') || quests[0];

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-20 font-pixel">
      {/* ============================================================== */}
      {/* 1. TOP NAVIGATION BAR (Exact Match to Reference Screenshot)    */}
      {/* ============================================================== */}
      <nav className="absolute top-0 inset-x-0 h-12 bg-[#090e17]/90 backdrop-blur-sm border-b border-[#1e2a3a] px-4 sm:px-6 flex items-center justify-between pointer-events-auto shadow-md">
        {/* Brand Title with Star */}
        <div
          onClick={() => {
            soundManager.playClick();
            onFastTravelToTownSquare();
          }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-[#f59e0b] text-xs">✨</span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-100 group-hover:text-[#fde047] transition-colors">
            ARYAN'S ADVENTURE
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-4 text-[9px] sm:text-[10px] text-slate-300">
          <button
            onClick={() => {
              soundManager.playClick();
              onFastTravelToTownSquare();
            }}
            className="px-2 py-1 hover:text-[#fde047] flex items-center gap-1 transition-colors"
          >
            <span>🏠</span>
            <span className="hidden sm:inline">Home</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onEnterBuilding('home');
            }}
            className="px-2 py-1 hover:text-[#fde047] flex items-center gap-1 transition-colors"
          >
            <span>👤</span>
            <span className="hidden sm:inline">About</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onEnterBuilding('blacksmith');
            }}
            className="px-2 py-1 hover:text-[#fde047] flex items-center gap-1 transition-colors"
          >
            <span>⚔</span>
            <span className="hidden sm:inline">Skills</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onEnterBuilding('boss_arena');
            }}
            className="px-2 py-1 hover:text-[#fde047] flex items-center gap-1 transition-colors"
          >
            <span>📜</span>
            <span className="hidden sm:inline">Projects</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onEnterBuilding('guild_hall');
            }}
            className="px-2 py-1 hover:text-[#fde047] flex items-center gap-1 transition-colors"
          >
            <span>💼</span>
            <span className="hidden sm:inline">Experience</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onEnterBuilding('post_office');
            }}
            className="px-2.5 py-1 bg-[#16273b] hover:bg-[#203750] text-[#38bdf8] border border-[#0284c7] rounded-sm flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3 h-3 text-[#38bdf8]" />
            <span>Resume</span>
          </button>

          <button
            onClick={onToggleSound}
            className="p-1 text-slate-400 hover:text-white transition-colors ml-1"
            title={isSoundMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isSoundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </nav>

      {/* ============================================================== */}
      {/* 2. TOP-LEFT PLAYER PROFILE CARD (Exact Match to Screenshot)    */}
      {/* ============================================================== */}
      <div className="absolute top-16 left-4 pointer-events-auto w-64 sm:w-72 bg-[#0c141f]/95 border-2 border-[#22354c] shadow-[0_8px_30px_rgba(0,0,0,0.85)] p-4 rounded-sm">
        {/* Profile Header Row */}
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar Box with Production Pixel Art Portrait */}
          <div className="w-12 h-12 bg-[#16222f] border-2 border-[#38bdf8] flex items-center justify-center shrink-0 shadow-inner relative overflow-hidden">
            <img
              src="/assets/ui/portrait_aryan.png"
              alt="Aryan"
              className="w-10 h-10 object-contain [image-rendering:pixelated]"
            />
            <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#38bdf8] rounded-full animate-ping opacity-60" />
          </div>

          {/* Name, Subtitle, Level & XP */}
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-bold text-white tracking-wide">Aryan</h3>
              <span className="text-[9px] text-[#fde047]">Lv. {playerLevel}</span>
            </div>
            <p className="text-[9px] text-[#38bdf8] font-sans font-medium">Data Explorer</p>
            {/* XP Bar */}
            <div className="mt-1">
              <div className="flex justify-between text-[7px] text-[#94a3b8] mb-0.5">
                <span>XP</span>
                <span>{playerXp} / {maxXp}</span>
              </div>
              <div className="w-full h-1.5 bg-[#16222f] border border-[#23354a] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8]"
                  style={{ width: `${Math.min(100, (playerXp / maxXp) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vital Attribute Meters (HP, Energy, Focus) */}
        <div className="space-y-1.5 py-2 border-t border-[#1e2e42] text-[8px] text-slate-300 font-sans">
          {/* HP */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-400">
              <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
              <span>HP</span>
            </span>
            <span className="font-pixel text-[8px] text-slate-200">100 / 100</span>
          </div>

          {/* Energy */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>Energy</span>
            </span>
            <span className="font-pixel text-[8px] text-slate-200">80 / 100</span>
          </div>

          {/* Focus */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-400">
              <Gem className="w-3 h-3 fill-sky-400 text-sky-400" />
              <span>Focus</span>
            </span>
            <span className="font-pixel text-[8px] text-slate-200">70 / 100</span>
          </div>
        </div>

        {/* CURRENT QUEST SECTION */}
        <div className="pt-2 border-t border-[#1e2e42]">
          <span className="text-[8px] text-slate-400 tracking-wider uppercase block mb-1">
            CURRENT QUEST
          </span>
          <h4 className="text-[9px] font-bold text-white leading-tight">
            Analyze Sales Dashboard
          </h4>
          <p className="text-[8px] text-slate-400 font-sans mt-0.5">
            Collect data and build insights
          </p>
          <div className="mt-1.5">
            <div className="flex justify-between text-[7px] text-[#fde047] mb-0.5">
              <span>Progress</span>
              <span>60%</span>
            </div>
            <div className="w-full h-1.5 bg-[#16222f] border border-[#23354a] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#d97706] to-[#f59e0b] w-[60%]" />
            </div>
          </div>
        </div>

        {/* ACTIVE BUFFS SECTION */}
        <div className="pt-2.5 mt-2 border-t border-[#1e2e42] space-y-1 text-[8px]">
          <span className="text-slate-400 tracking-wider uppercase block mb-1">
            ACTIVE BUFFS
          </span>
          <div className="flex items-center justify-between text-amber-300">
            <span className="flex items-center gap-1">
              <span>☕</span>
              <span>Coffee Lover</span>
            </span>
            <span className="text-[7px] text-slate-400 font-sans">+5 Focus</span>
          </div>
          <div className="flex items-center justify-between text-sky-300">
            <span className="flex items-center gap-1">
              <span>📖</span>
              <span>Night Owl</span>
            </span>
            <span className="text-[7px] text-slate-400 font-sans">+10 XP from quests</span>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. TOP-RIGHT WIZARD GUIDE CARD (Replaces AI Companion)         */}
      {/* ============================================================== */}
      <div className="absolute top-16 right-4 pointer-events-auto w-56 sm:w-64 bg-[#0c141f]/95 border-2 border-[#a855f7] shadow-[0_8px_30px_rgba(0,0,0,0.85),0_0_15px_rgba(168,85,247,0.25)] p-3 rounded-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[8px] text-[#c084fc] tracking-wider uppercase font-bold flex items-center gap-1">
            <span>✨</span>
            <span>Wizard Guide</span>
          </span>
          <span className="text-[7px] px-1 py-0.5 bg-[#581c87] text-[#e9d5ff] rounded-xs border border-[#9333ea]">
            Lorekeeper
          </span>
        </div>

        <div className="flex items-start gap-2.5 mb-2.5">
          <div className="w-9 h-9 rounded-full bg-[#3b0764] border-2 border-[#a855f7] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)] overflow-hidden">
            <img
              src="/assets/ui/portrait_data_sage.png"
              alt="Grand Wizard Eldrin"
              className="w-full h-full object-cover [image-rendering:pixelated]"
            />
          </div>
          <p className="text-[9px] text-slate-200 font-sans leading-tight">
            I am Grand Wizard Eldrin. Ask of Aryan's arcane spells & quests!
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenCompanion();
          }}
          className="w-full py-1.5 bg-[#2e1065] hover:bg-[#3b0764] text-[#e9d5ff] hover:text-white border border-[#a855f7] text-[8px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors active:translate-y-0.5 shadow-sm"
        >
          <span>🔮</span>
          <span>Consult Wizard</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 4. PROXIMITY INTERACTION BANNER (Center Viewport Floating)      */}
      {/* ============================================================== */}
      {nearBuilding && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-auto z-30 animate-bounce">
          <div
            onClick={() => onEnterBuilding(nearBuilding.id)}
            className="px-5 py-2.5 bg-[#0f1722]/95 border-2 border-[#f59e0b] shadow-[0_6px_25px_rgba(0,0,0,0.9)] flex items-center gap-3 cursor-pointer hover:brightness-110 active:translate-y-1"
          >
            <div className="px-1.5 py-0.5 bg-[#f59e0b] text-[#0f1722] text-[9px] font-bold">
              PRESS E
            </div>
            <div>
              <div className="text-xs text-white font-bold tracking-wider">
                ENTER {nearBuilding.name.toUpperCase()}
              </div>
              <div className="text-[8px] text-[#fde047] font-sans">
                {nearBuilding.subtitle}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. ON-SCREEN MOBILE TOUCH CONTROLS (D-Pad & Action Button)      */}
      {/* ============================================================== */}
      <div className="sm:hidden absolute bottom-14 left-4 pointer-events-auto z-20 flex flex-col items-center gap-1 opacity-85">
        <button
          onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }))}
          onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyW' }))}
          className="w-10 h-10 bg-[#16222f] border border-[#2b3d54] text-white flex items-center justify-center active:bg-[#0284c7]"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button
            onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }))}
            onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyA' }))}
            className="w-10 h-10 bg-[#16222f] border border-[#2b3d54] text-white flex items-center justify-center active:bg-[#0284c7]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyS' }))}
            onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyS' }))}
            className="w-10 h-10 bg-[#16222f] border border-[#2b3d54] text-white flex items-center justify-center active:bg-[#0284c7]"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
          <button
            onPointerDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyD' }))}
            onPointerUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyD' }))}
            className="w-10 h-10 bg-[#16222f] border border-[#2b3d54] text-white flex items-center justify-center active:bg-[#0284c7]"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Action button for mobile */}
      <div className="sm:hidden absolute bottom-16 right-4 pointer-events-auto z-20">
        <button
          onClick={() => {
            if (nearBuilding) onEnterBuilding(nearBuilding.id);
            else soundManager.playClick();
          }}
          className="w-14 h-14 rounded-full bg-[#f59e0b] text-[#0f1722] border-2 border-[#fef08a] font-bold text-xs shadow-lg flex items-center justify-center active:scale-95"
        >
          ENTER
        </button>
      </div>

      {/* ============================================================== */}
      {/* 6. BOTTOM FOOTER BAR (Exact Match to Reference Screenshot)     */}
      {/* ============================================================== */}
      <footer className="absolute bottom-0 inset-x-0 h-9 bg-[#090e17]/95 border-t border-[#1e2a3a] px-4 sm:px-6 flex items-center justify-between text-[8px] text-slate-400 pointer-events-auto">
        {/* Left: Built with love by Aryan */}
        <div className="flex items-center gap-1.5">
          <span>Built with</span>
          <span className="text-rose-500">❤️</span>
          <span>by Aryan</span>
        </div>

        {/* Center: Social Icons */}
        <div className="flex items-center gap-4 text-slate-300">
          <a
            href="https://github.com/thedevnomad"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            title="GitHub"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href="https://linkedin.com/in/thedevnomad"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            title="LinkedIn"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
            title="Twitter / X"
          >
            Twitter
          </a>
          <span>·</span>
          <button
            onClick={() => onEnterBuilding('post_office')}
            className="hover:text-white transition-colors"
            title="Contact Post Office"
          >
            Email
          </button>
        </div>

        {/* Right: Copyright */}
        <div>
          <span>© 2024 Aryan's Adventure</span>
        </div>
      </footer>
    </div>
  );
};
