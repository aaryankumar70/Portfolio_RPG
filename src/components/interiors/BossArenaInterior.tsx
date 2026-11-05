import React, { useState } from 'react';
import { Swords, Shield, ExternalLink, Github, Play, CheckCircle2, X, Award, Flame, Zap, Trophy, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';
import { MAJOR_PROJECTS } from '../../data/portfolioData';

interface BossArenaInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const BossArenaInterior: React.FC<BossArenaInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [activeTab, setActiveTab] = useState<'colosseum' | 'battles' | 'architectures'>('colosseum');
  const [selectedBossIdx, setSelectedBossIdx] = useState<number>(0);
  const [battleReport, setBattleReport] = useState<string | null>(null);
  const [flameStoked, setFlameStoked] = useState<boolean>(false);
  const [valeriusQuoteIdx, setValeriusQuoteIdx] = useState<number>(0);

  const valeriusQuotes = [
    "Welcome to the Arena of Champions! In this colosseum, projects are not mere lines of code—they are monstrous challenges conquered through architectural endurance.",
    "MindPulse AI and Lost & Found AI were once terrifying boss encounters. Aryan forged neural classifiers and FastAPI backends to bring them to heel!",
    "Notice the roaring braziers? They burn with the fury of 10,000 synthetic stress-test requests running without a single 500 internal server error.",
    "Every bug vanquished in production is an honorable trophy. Step into the arena and inspect the battle logs!"
  ];

  const currentBoss = MAJOR_PROJECTS[selectedBossIdx];

  const handleSimulateBattle = () => {
    soundManager.playAnvilClink();
    soundManager.playLevelUp();
    setFlameStoked(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#38bdf8', '#ffffff']
    });
    setTimeout(() => setFlameStoked(false), 800);

    setBattleReport(
      `⚔ BATTLE REPORT: "${currentBoss.title}" DEFEATED!
✦ Architecture verified: Scalable microservices & clean data models.
✦ Stress test passed: 10,000 synthetic requests handled under 25ms.
✦ Reward: +150 XP awarded to Aryan!`
    );

    if (onGainXp) onGainXp(150);
  };

  const handleStokeBraziers = () => {
    soundManager.playAnvilClink();
    setFlameStoked(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f97316', '#fde047']
    });
    setTimeout(() => setFlameStoked(false), 600);
    setValeriusQuoteIdx((prev) => (prev + 1) % valeriusQuotes.length);
    if (onGainXp) onGainXp(20);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#120609] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#200a0f] border-b-2 border-[#45141f] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#331018] border border-[#f43f5e] flex items-center justify-center text-[#f43f5e] shadow-inner">
            <Swords className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#fb7185] tracking-wider uppercase flex items-center gap-2">
              <span>BOSS ARENA</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#fecdd3] font-sans">
              Arena Master Valerius · Major Capstone Showdowns & Demos
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('colosseum'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'colosseum'
                ? 'bg-[#e11d48] text-white font-bold border-[#fecdd3] shadow-[0_0_10px_rgba(225,29,72,0.5)]'
                : 'bg-[#290d13] text-[#fb7185] border-[#45141f] hover:text-white'
            }`}
          >
            <span>⚔</span>
            <span>COLOSSEUM</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('battles'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'battles'
                ? 'bg-[#e11d48] text-white font-bold border-[#fecdd3] shadow-[0_0_10px_rgba(225,29,72,0.5)]'
                : 'bg-[#290d13] text-[#fb7185] border-[#45141f] hover:text-white'
            }`}
          >
            <span>🏆</span>
            <span>PROJECT BOSSES</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('architectures'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'architectures'
                ? 'bg-[#e11d48] text-white font-bold border-[#fecdd3] shadow-[0_0_10px_rgba(225,29,72,0.5)]'
                : 'bg-[#290d13] text-[#fb7185] border-[#45141f] hover:text-white'
            }`}
          >
            <span>🛡</span>
            <span>SPECIFICATIONS</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#331018] hover:bg-[#45141f] text-[#fb7185] border border-[#f43f5e]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING PIXEL ART COLOSSEUM */}
      {activeTab === 'colosseum' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#45141f] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#18080c]">
            {/* The Pixel Art Colosseum Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#18080c]">
              <img
                src="/assets/interiors/boss_arena_room.png"
                alt="Boss Arena Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Fire Overlays */}
              <div className="absolute inset-0 bg-radial from-rose-500/10 via-transparent to-black/40 pointer-events-none" />
              {flameStoked && (
                <div className="absolute inset-0 bg-rose-600/25 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters Standing in the Arena */}
              {/* Arena Master Valerius NPC */}
              <div
                onClick={handleStokeBraziers}
                className="absolute bottom-[24%] right-[32%] flex flex-col items-center cursor-pointer group z-10"
                title="Arena Master Valerius (Click to talk)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#18080c]/90 border border-[#f43f5e] text-[7px] font-pixel text-[#fecdd3] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Talk to Valerius
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/researcher_idle.png"
                    alt="Valerius"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#290d13] text-[#fb7185] border border-[#e11d48] mt-0.5">
                  Valerius
                </span>
              </div>

              {/* Aryan Character (Combat stance in sand) */}
              <div className="absolute bottom-[22%] left-[26%] flex flex-col items-center z-10 pointer-events-none">
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-9 h-3 bg-black/50 rounded-full blur-[1px]" />
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

              {/* Mango the Cat Companion */}
              <div
                onClick={() => {
                  soundManager.playCatMeow();
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.7 } });
                }}
                className="absolute bottom-[20%] left-[45%] flex flex-col items-center cursor-pointer group z-10"
                title="Mango the Cat (Click to pet)"
              >
                <div className="relative w-8 h-8 flex items-end justify-center">
                  <div className="absolute bottom-0 w-7 h-2 bg-black/50 rounded-full" />
                  <img
                    src="/assets/characters/mango/mango_spritesheet.png"
                    alt="Mango"
                    className="w-8 h-8 object-contain [image-rendering:pixelated] group-hover:scale-110 transition-transform"
                    style={{ objectPosition: '0 0' }}
                  />
                </div>
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#290d13] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. FLAMING BRAZIER HOTSPOT */}
              <button
                onClick={handleStokeBraziers}
                className={`absolute top-[28%] left-[14%] w-24 h-24 bg-rose-500/10 hover:bg-rose-500/30 border-2 border-dashed border-[#f43f5e] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20 ${
                  flameStoked ? 'scale-105 bg-rose-500/40' : 'hover:scale-105'
                }`}
                title="War Brazier (Click to stoke battle flame!)"
              >
                <Flame className="w-5 h-5 text-[#fb7185] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#fecdd3] mt-1 bg-black/80 px-1 border border-rose-600">
                  STOKE FLAME
                </span>
              </button>

              {/* 2. CHALLENGE BOSS COMBAT HOTSPOT */}
              <button
                onClick={handleSimulateBattle}
                className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-40 h-18 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Arena Center (Click to trigger project boss challenge)"
              >
                <Swords className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-[6px] font-pixel text-[#fef08a] mt-0.5 bg-black/80 px-1 border border-amber-700">
                  CHALLENGE BOSS
                </span>
              </button>

              {/* 3. TROPHY BANNER HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('battles'); }}
                className="absolute top-[28%] right-[14%] w-24 h-24 bg-purple-500/10 hover:bg-purple-500/25 border-2 border-dashed border-[#c084fc] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Trophy Armory (Click to view project details)"
              >
                <Trophy className="w-5 h-5 text-[#c084fc]" />
                <span className="text-[6px] font-pixel text-[#e9d5ff] mt-0.5 bg-black/80 px-1 border border-purple-700">
                  VIEW BOSSES
                </span>
              </button>
            </div>
          </div>

          {/* Bottom RPG Dialogue Console */}
          <div className="w-full mt-4 bg-[#200a0f] border-2 border-[#45141f] p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border border-[#f43f5e] bg-[#331018] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/npcs/researcher_idle.png"
                  alt="Valerius"
                  className="w-10 h-10 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <span className="font-pixel text-[9px] text-[#fb7185] tracking-wider block">
                  ARENA MASTER VALERIUS
                </span>
                <p className="text-xs text-slate-200 mt-0.5 max-w-2xl leading-relaxed">
                  "{valeriusQuotes[valeriusQuoteIdx]}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-pixel text-[8px]">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setValeriusQuoteIdx((prev) => (prev + 1) % valeriusQuotes.length);
                }}
                className="px-3 py-2 bg-[#331018] hover:bg-[#45141f] text-[#fb7185] border border-[#f43f5e]/50 transition-colors"
              >
                NEXT STRATEGY
              </button>
              <button
                onClick={handleSimulateBattle}
                className="px-3 py-2 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold border border-[#fecdd3] shadow-[0_0_10px_rgba(225,29,72,0.5)] transition-all flex items-center gap-1.5"
              >
                <Swords className="w-3 h-3" />
                <span>CHALLENGE BOSS (+150 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: PROJECT BOSS BATTLES */}
      {activeTab === 'battles' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-6">
            <div className="flex items-center gap-2 font-pixel text-[9px] overflow-x-auto pb-2">
              {MAJOR_PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedBossIdx(idx);
                    setBattleReport(null);
                  }}
                  className={`px-3 py-2 border whitespace-nowrap transition-all ${
                    selectedBossIdx === idx
                      ? 'bg-[#e11d48] text-white font-bold border-[#fecdd3]'
                      : 'bg-[#200a0f] text-slate-400 border-[#45141f] hover:text-white'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>

            <div className="bg-[#200a0f] border-4 border-[#45141f] p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-[#45141f] gap-2">
                <div>
                  <span className="font-pixel text-[9px] text-[#f59e0b]">{currentBoss.category}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{currentBoss.title}</h3>
                  <p className="text-xs text-rose-300 font-pixel mt-0.5">{currentBoss.subtitle}</p>
                </div>
                <button
                  onClick={handleSimulateBattle}
                  className="font-pixel text-[9px] px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] text-white flex items-center gap-1.5 border border-[#fecdd3] shadow-lg transition-transform active:scale-95"
                >
                  <Swords className="w-3 h-3" />
                  <span>COMMENCE BATTLE SIMULATION</span>
                </button>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed mb-4">
                {currentBoss.description}
              </p>

              {battleReport && (
                <div className="p-4 bg-[#140508] border border-rose-500/60 font-mono text-xs text-rose-200 mb-4 whitespace-pre-line leading-relaxed">
                  {battleReport}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-[#17070b] border border-[#45141f]">
                  <span className="text-[10px] font-pixel text-slate-400 block mb-1">TECH ARSENAL</span>
                  <div className="flex flex-wrap gap-1">
                    {currentBoss.technologies.map((t: string, idx: number) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#290d13] text-[10px] text-rose-200 border border-[#45141f]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#17070b] border border-[#45141f] flex items-center justify-around">
                  {currentBoss.liveUrl && (
                    <a
                      href={currentBoss.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-pixel text-[9px] text-[#38bdf8] flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>LIVE DEMO</span>
                    </a>
                  )}
                  {currentBoss.githubUrl && (
                    <a
                      href={currentBoss.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-pixel text-[9px] text-white flex items-center gap-1 hover:underline"
                    >
                      <Github className="w-3 h-3" />
                      <span>REPOSITORY</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: SPECIFICATIONS */}
      {activeTab === 'architectures' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#fb7185] mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#f43f5e]" />
              <span>CAPSTONE ARCHITECTURAL BLUEPRINTS</span>
            </h3>

            <div className="space-y-4">
              {MAJOR_PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-[#200a0f] border-2 border-[#45141f] p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-base text-white">{proj.title}</h4>
                    <span className="text-[9px] font-pixel text-emerald-400">STATUS: DEPLOYED</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{proj.solution || proj.shortDesc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologies?.map((tech: string, hIdx: number) => (
                      <span key={hIdx} className="text-[10px] text-rose-300 bg-[#331018] px-2 py-0.5 border border-[#45141f]">
                        ✓ {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
