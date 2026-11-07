// src/components/interiors/InteriorGameCanvas.tsx
// Explorable 60 FPS Canvas RPG Interior Environment with physical walking, collision, and interactive dialogues

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  X,
  Coffee,
  BookOpen,
  FileText,
  Code,
  Database,
  Sparkles,
  Award,
  Sword,
  Flame,
  Heart,
  ArrowRight,
  Shield,
  BarChart2,
  Cpu,
  Swords,
  Mail,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InteriorConfig, INTERIOR_CONFIGS } from '../../game/interiorConfig';
import { InteriorRenderer } from '../../game/InteriorRenderer';
import { PlayerCharacter } from '../../game/PlayerCharacter';
import { MangoPet } from '../../game/MangoPet';
import { soundManager } from '../../audio/SoundManager';
import {
  WEAPON_SKILLS,
  MAJOR_PROJECTS,
  ARYAN_STATS,
  INITIAL_QUESTS,
  EDUCATION_RECORDS,
  CERTIFICATIONS,
  GARDEN_FACTS
} from '../../data/portfolioData';
import { ActiveBuff } from '../../types';

interface InteriorGameCanvasProps {
  buildingId: string;
  onExit: () => void;
  onBuyCoffee?: () => void;
  onGainBuff?: (buff: ActiveBuff) => void;
}

export const InteriorGameCanvas: React.FC<InteriorGameCanvasProps> = ({
  buildingId,
  onExit,
  onBuyCoffee,
  onGainBuff
}) => {
  const config: InteriorConfig = INTERIOR_CONFIGS[buildingId] || INTERIOR_CONFIGS.coffee_shop;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<InteriorRenderer>(new InteriorRenderer());
  const playerRef = useRef<PlayerCharacter>(new PlayerCharacter());
  const mangoPetRef = useRef<MangoPet>(new MangoPet(config.entrySpawn.x + 35, config.entrySpawn.y + 10));
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const lastTimeRef = useRef<number>(performance.now());

  // Proximity states
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isNearExit, setIsNearExit] = useState<boolean>(false);

  // Active dialogue / interaction modal
  const [modalType, setModalType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Initialize player spawn in interior
  useEffect(() => {
    const player = playerRef.current;
    player.state.x = config.entrySpawn.x;
    player.state.y = config.entrySpawn.y;
    player.state.direction = config.entrySpawn.facing;
    player.state.path = [];
    mangoPetRef.current.x = config.entrySpawn.x + 30;
    mangoPetRef.current.y = config.entrySpawn.y + 10;
  }, [config]);

  // Smooth sliding collision resolution inside interior room
  const resolveInteriorMovement = useCallback(
    (currX: number, currY: number, targetX: number, targetY: number, radius = 12) => {
      let resolvedX = targetX;
      let resolvedY = targetY;

      // Check collision boxes
      const isColliding = (x: number, y: number) => {
        for (const box of config.collisionBoxes) {
          if (
            x + radius > box.x &&
            x - radius < box.x + box.w &&
            y + radius > box.y &&
            y - radius < box.y + box.h
          ) {
            return true;
          }
        }
        return false;
      };

      // Direct move
      if (!isColliding(targetX, targetY)) {
        return { x: targetX, y: targetY };
      }

      // Slide X
      if (!isColliding(targetX, currY)) {
        return { x: targetX, y: currY };
      }

      // Slide Y
      if (!isColliding(currX, targetY)) {
        return { x: currX, y: targetY };
      }

      return { x: currX, y: currY };
    },
    [config.collisionBoxes]
  );

  // Handle building exit with fade
  const triggerExit = useCallback(() => {
    soundManager.playEnterBuilding();
    setIsFadingOut(true);
    setTimeout(() => {
      onExit();
    }, 280);
  }, [onExit]);

  // Handle interaction action
  const handleInteraction = useCallback(
    (action: string) => {
      soundManager.playChime();

      if (action === 'exit_town') {
        triggerExit();
      } else if (action === 'buy_coffee') {
        soundManager.playCoffeePour();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#eab308', '#ca8a04', '#ffffff', '#78350f']
        });
        if (onBuyCoffee) onBuyCoffee();
        if (onGainBuff) {
          onGainBuff({
            id: 'coffee_lover',
            name: 'Coffee Lover',
            icon: '☕',
            description: 'Fresh roast brew grants razor-sharp clarity (+5 Focus).',
            statBonus: '+5 Focus'
          });
        }
        setModalType('coffee_bought');
      } else if (action === 'strike_anvil') {
        soundManager.playAnvilClink();
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#f97316', '#ea580c', '#ffffff', '#facc15']
        });
      } else {
        setModalType(action);
      }
    },
    [triggerExit, onBuyCoffee, onGainBuff]
  );

  // Keyboard navigation & interaction
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      keysRef.current[e.code] = true;

      // [E], [Space], [Enter] to interact
      if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') {
        if (modalType) {
          // If modal open, close or proceed
          return;
        }

        if (isNearExit) {
          e.preventDefault();
          triggerExit();
        } else if (activeHotspotId) {
          e.preventDefault();
          const hs = config.hotspots.find((h) => h.id === activeHotspotId);
          if (hs) {
            handleInteraction(hs.action);
          }
        }
      } else if (e.code === 'Escape') {
        if (modalType) {
          setModalType(null);
        } else {
          triggerExit();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [modalType, isNearExit, activeHotspotId, config.hotspots, triggerExit, handleInteraction]);

  // Main 60 FPS Delta-Time Game Loop
  useEffect(() => {
    let animId: number;
    lastTimeRef.current = performance.now();

    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const now = performance.now();
      const dt = Math.min(0.08, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      const player = playerRef.current;
      const renderer = rendererRef.current;
      const mango = mangoPetRef.current;

      // 1. Player Physics & Movement (Paused during dialogue modal)
      if (!modalType) {
        let dx = 0;
        let dy = 0;
        const keys = keysRef.current;
        if (keys['KeyW'] || keys['ArrowUp']) dy -= 1;
        if (keys['KeyS'] || keys['ArrowDown']) dy += 1;
        if (keys['KeyA'] || keys['ArrowLeft']) dx -= 1;
        if (keys['KeyD'] || keys['ArrowRight']) dx += 1;

        if (dx !== 0 || dy !== 0) {
          const len = Math.hypot(dx, dy);
          const speed = keys['ShiftLeft'] || keys['ShiftRight'] ? 240 : 160;
          const targetX = player.state.x + (dx / len) * speed * dt;
          const targetY = player.state.y + (dy / len) * speed * dt;

          const resolved = resolveInteriorMovement(player.state.x, player.state.y, targetX, targetY);
          player.state.x = resolved.x;
          player.state.y = resolved.y;
          player.state.isMoving = true;

          if (Math.abs(dx) > Math.abs(dy)) {
            player.state.direction = dx > 0 ? 'right' : 'left';
          } else {
            player.state.direction = dy > 0 ? 'down' : 'up';
          }
        } else {
          player.state.isMoving = false;
        }

        // 2. Mango Follow AI inside room
        mango.update(dt, player.state.x, player.state.y, player.state.isMoving);

        // 3. Proximity Checks for Hotspots & Exit
        let closestHs: string | null = null;
        let minDist = 999;
        for (const hs of config.hotspots) {
          const dist = Math.hypot(player.state.x - hs.x, player.state.y - hs.y);
          if (dist < hs.radius && dist < minDist) {
            minDist = dist;
            closestHs = hs.id;
          }
        }
        setActiveHotspotId(closestHs);

        const exitX = config.exitDoor.x + config.exitDoor.w / 2;
        const distExit = Math.hypot(player.state.x - exitX, player.state.y - config.exitDoor.y);
        setIsNearExit(distExit < 55);
      }

      // 4. Render Interior Scene
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderer.render(ctx, config, player, mango, activeHotspotId, isNearExit, dt);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [config, modalType, activeHotspotId, isNearExit, resolveInteriorMovement]);

  // Click-to-move handling inside room
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (modalType) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Direct hotspot click
    for (const hs of config.hotspots) {
      if (Math.hypot(clickX - hs.x, clickY - hs.y) < hs.radius) {
        handleInteraction(hs.action);
        return;
      }
    }

    // Direct pet click (Mango meows)
    if (Math.hypot(clickX - mangoPetRef.current.x, clickY - mangoPetRef.current.y) < 35) {
      mangoPetRef.current.meow();
      return;
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center bg-[#090604] overflow-hidden select-none transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* 1. RETRO TOP NAV BAR */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 bg-[#180f08]/90 border-b-2 border-[#3d2011] backdrop-blur-xs font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#2e180d] border border-[#f59e0b] flex items-center justify-center text-[#f59e0b] shadow-inner">
            {config.id === 'coffee_shop' && <Coffee className="w-4 h-4" />}
            {config.id === 'home' && <Heart className="w-4 h-4" />}
            {config.id === 'python_cave' && <Code className="w-4 h-4" />}
            {config.id === 'sql_mines' && <Database className="w-4 h-4" />}
            {config.id === 'blacksmith' && <Sword className="w-4 h-4" />}
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#fde047] tracking-wider uppercase">
              {config.name}
            </h1>
            <p className="text-[7px] text-[#a88265] font-sans">
              {config.subtitle} · Walk with WASD or Arrows · Press E to Interact
            </p>
          </div>
        </div>

        {/* Exit Button */}
        <button
          onClick={triggerExit}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2e180d] hover:bg-[#452312] text-[#fde047] border border-[#f59e0b] text-[8px] transition-colors shadow-md"
          title="Return to Town (Esc)"
        >
          <span>EXIT TO TOWN</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* 2. EXPLORABLE CANVAS ROOM */}
      <div className="relative border-4 border-[#3d2011] shadow-[0_20px_60px_rgba(0,0,0,0.95)] rounded overflow-hidden mt-10">
        <canvas
          ref={canvasRef}
          width={config.roomWidth}
          height={config.roomHeight}
          onClick={handleCanvasClick}
          className="cursor-pointer [image-rendering:pixelated]"
        />
      </div>

      {/* 3. DIALOGUE & INSPECTION MODAL OVERLAY */}
      {modalType && (
        <div className="absolute inset-0 z-40 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-2xl bg-[#120a06] border-3 border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.4)] p-6 font-pixel text-slate-100 flex flex-col gap-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#3d2011] pb-3">
              <h2 className="text-xs sm:text-sm font-bold text-[#fde047] uppercase tracking-wide flex items-center gap-2">
                <span>✦</span>
                <span>
                  {modalType === 'coffee_bought' && 'Fresh Roast Brewed!'}
                  {modalType === 'inspect_menu' && 'Coffee Tavern Musings'}
                  {modalType === 'open_github' && 'Terminal: GitHub Repositories'}
                  {(modalType === 'open_education' || modalType === 'inspect_education') && 'Academic Credentials: MCA & BCA'}
                  {(modalType === 'open_resume' || modalType === 'download_resume') && 'Aryan’s Curriculum Vitae'}
                  {modalType === 'open_achievements' && 'Achievement Wall & Hackathons'}
                  {modalType === 'inspect_quests' && 'Guild Quest Noticeboard'}
                  {modalType === 'inspect_certifications' && 'Verified Professional Certifications'}
                  {modalType === 'inspect_telemetry' && 'Telemetry Spire: Live KPI Core'}
                  {modalType === 'inspect_etl' && 'Data Warehouse & ETL Architecture'}
                  {modalType === 'inspect_ml_models' && 'Neural Embedding Models (CLIP & RoBERTa)'}
                  {modalType === 'inspect_gpu' && 'PyTorch GPU Cluster & ONNX Runtime'}
                  {modalType === 'inspect_garden_facts' && 'Village Lore: Aryan’s Quirks & Chess Tactics'}
                  {modalType === 'rest_gazebo' && 'Peaceful Arboretum Gazebo'}
                  {modalType === 'inspect_bosses' && 'Champions Colosseum: Boss Projects'}
                  {modalType === 'inspect_tactics' && 'Hackathon Tactical Playbook'}
                  {modalType === 'open_contact' && 'Dispatch Station: Send a Message'}
                  {modalType === 'open_socials' && 'Social Channels & Profiles'}
                  {modalType === 'warm_hearth' && 'Roaring Guild Hearth'}
                  {modalType === 'open_python_libs' && 'Python Microservices & Libraries'}
                  {modalType === 'open_sql_schemas' && 'Relational Database Schemas'}
                  {modalType === 'open_weapons' && 'Weaponsmith Skills Arsenal'}
                  {modalType.startsWith('talk_') && (config.npc ? `${config.npc.name} (${config.npc.role})` : 'Conversation')}
                </span>
              </h2>
              <button
                onClick={() => setModalType(null)}
                className="w-7 h-7 flex items-center justify-center bg-[#24130a] hover:bg-[#3d2011] text-[#f59e0b] border border-[#f59e0b]/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="font-sans text-xs text-slate-300 leading-relaxed max-h-[380px] overflow-y-auto pr-2 space-y-4">
              {/* Generic NPC Dialogue for any room */}
              {modalType.startsWith('talk_') && config.npc && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-20 bg-[#24130a] border-2 border-[#f59e0b] flex flex-col items-center justify-center p-1 text-center">
                      <span className="text-2xl">🧙</span>
                      <span className="text-[7px] font-pixel text-amber-300 mt-1 line-clamp-1">{config.npc.name.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-300 font-pixel text-[10px]">{config.npc.name}</span>
                        <span className="text-[8px] px-1.5 py-0.5 bg-amber-950/80 text-amber-400 border border-amber-700/50 rounded font-pixel">
                          {config.npc.role}
                        </span>
                      </div>
                      {config.npc.dialogues.map((d, idx) => (
                        <p key={idx} className="italic text-amber-100 font-pixel text-[9px] leading-relaxed">
                          "{d}"
                        </p>
                      ))}
                    </div>
                  </div>
                  {config.npc.choices && config.npc.choices.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-[#3d2011]">
                      {config.npc.choices.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => handleInteraction(c.action)}
                          className="px-3 py-2 bg-[#2e180d] hover:bg-[#452312] border border-[#f59e0b] text-[#fde047] font-pixel text-[8px] transition-colors flex items-center gap-1.5"
                        >
                          <ArrowRight className="w-3 h-3 text-amber-400" />
                          <span>{c.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Coffee Bought Confirmation */}
              {modalType === 'coffee_bought' && (
                <div className="text-center py-6 space-y-4 font-pixel">
                  <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/20 border-2 border-[#f59e0b] flex items-center justify-center text-amber-400">
                    <Coffee className="w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="text-xs text-[#fde047]">WARM ESPRESSO POURED!</h3>
                  <p className="font-sans text-xs text-slate-300 max-w-md mx-auto">
                    You drank a steaming cup of freshly roasted coffee. A warm buzz flows through your mind!
                  </p>
                  <div className="inline-block px-4 py-2 bg-[#2e180d] border border-amber-500 text-amber-300 text-[8px]">
                    ☕ ACTIVE BUFF: Coffee Lover (+5 Focus)
                  </div>
                </div>
              )}

              {/* Coffee Shop Musings */}
              {modalType === 'inspect_menu' && (
                <div className="space-y-4">
                  <p className="text-[11px] text-amber-300 font-pixel">
                    CHALKBOARD MUSINGS BY ARYAN:
                  </p>
                  <div className="p-3 bg-[#1e140d] border border-[#3d2011] rounded space-y-2">
                    <h4 className="text-amber-400 font-bold">Why Multimodal AI Changes Everything in 2026</h4>
                    <p className="text-[11px] text-slate-300">
                      Unifying speech acoustics with semantic embeddings allows models to detect vocal stress biomarkers that text alone cannot capture. This breakthrough powered the core diagnostic engine of MindPulse AI.
                    </p>
                  </div>
                  <div className="p-3 bg-[#1e140d] border border-[#3d2011] rounded space-y-2">
                    <h4 className="text-amber-400 font-bold">From Zero to Hackathon Winner</h4>
                    <p className="text-[11px] text-slate-300">
                      In rapid 36-hour sprints, focus on a single atomic "magic moment" and build seamless user feedback loops around it.
                    </p>
                  </div>
                </div>
              )}

              {/* Terminal: GitHub Projects */}
              {modalType === 'open_github' && (
                <div className="space-y-3 font-mono">
                  <p className="text-[10px] text-emerald-400 font-pixel">
                    $ aryan --list-repositories --featured
                  </p>
                  {MAJOR_PROJECTS.map((p) => (
                    <div key={p.id} className="p-3 bg-[#0d1424] border border-[#1e293b] rounded space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-400">{p.title}</span>
                        <span className="text-[9px] px-2 py-0.5 bg-sky-950 text-sky-300 border border-sky-700 font-pixel">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">{p.shortDesc}</p>
                      <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-400">
                        <span>Stack: {p.technologies.slice(0, 4).join(', ')}</span>
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                            [GitHub ↗]
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Scholar Bookshelf: Degrees */}
              {modalType === 'open_education' && (
                <div className="space-y-4">
                  <p className="text-[10px] text-amber-300 font-pixel">ACADEMIC CREDENTIALS:</p>
                  <div className="p-4 bg-[#1e140d] border border-[#3d2011] rounded space-y-1">
                    <div className="flex justify-between items-center text-amber-400 font-bold">
                      <span>Master of Computer Applications (MCA)</span>
                      <span className="font-pixel text-[8px] text-emerald-400">Graduating 2026</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Specialization: Advanced Data Science & Systems Architecture</p>
                    <p className="text-[11px] text-slate-300 pt-1">
                      Deep study in distributed systems, neural network optimization, asynchronous backend engineering, and relational database internals.
                    </p>
                  </div>
                  <div className="p-4 bg-[#1e140d] border border-[#3d2011] rounded space-y-1">
                    <div className="flex justify-between items-center text-amber-400 font-bold">
                      <span>Bachelor of Computer Applications (BCA)</span>
                      <span className="font-pixel text-[8px] text-emerald-400">Completed · 8.9 CGPA</span>
                    </div>
                    <p className="text-[11px] text-slate-400">Foundation: Object-Oriented Software & Algorithms</p>
                  </div>
                </div>
              )}

              {/* Wardrobe: Resume */}
              {modalType === 'open_resume' && (
                <div className="space-y-4 font-pixel text-center py-4">
                  <FileText className="w-12 h-12 mx-auto text-[#f59e0b]" />
                  <h3 className="text-xs text-[#fde047]">ARYAN'S CURRICULUM VITAE</h3>
                  <p className="font-sans text-xs text-slate-300 max-w-md mx-auto">
                    Full-Stack & Machine Learning Engineer with verified production experience across Python, FastAPI, React, SQL, and Docker microservices.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-5 py-2.5 bg-[#ca8a04] hover:bg-[#eab308] text-[#090604] font-bold text-[9px] border-2 border-[#fef08a] shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all"
                    >
                      DOWNLOAD RESUME (PDF) 📥
                    </a>
                  </div>
                </div>
              )}

              {/* Achievements Corkboard */}
              {modalType === 'open_achievements' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-amber-300 font-pixel">KEY CAREER ACHIEVEMENTS:</p>
                  <div className="p-3 bg-[#1e140d] border border-[#3d2011] rounded space-y-1">
                    <h4 className="font-bold text-amber-400">🏆 Hackathon First Place — MindPulse AI</h4>
                    <p className="text-[11px] text-slate-300">
                      Engineered a real-time vocal biomarker diagnostics system in 36 hours, beating 45 competing university teams.
                    </p>
                  </div>
                  <div className="p-3 bg-[#1e140d] border border-[#3d2011] rounded space-y-1">
                    <h4 className="font-bold text-amber-400">⚡ High-Throughput Relational ETL Migration</h4>
                    <p className="text-[11px] text-slate-300">
                      Migrated 1.2M rows of operational logs to optimized indexed PostgreSQL partitions, reducing dashboard latency by 72%.
                    </p>
                  </div>
                </div>
              )}

              {/* Cave Sage Aldous Dialogue */}
              {modalType === 'talk_sage' && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-20 bg-[#0c1322] border border-[#38bdf8] flex items-center justify-center text-sky-400 text-2xl font-pixel">
                      🧙‍♂️
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="italic text-sky-200 font-pixel text-[9px] leading-relaxed">
                        "Python is a simple language with limitless horizons. Here in the grotto, scripts run like eternal subterranean currents."
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Inspect the glowing altar to see Aryan’s asynchronous FastAPI microservices and NumPy algorithms.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Python Libraries */}
              {modalType === 'open_python_libs' && (
                <div className="space-y-3 font-mono">
                  <p className="text-[10px] text-sky-400 font-pixel">PYTHON CORE CAPABILITIES:</p>
                  <div className="p-3 bg-[#0d1726] border border-sky-900 rounded space-y-1">
                    <span className="font-bold text-sky-300">FastAPI & AsyncIO Microservices</span>
                    <p className="text-[11px] text-slate-300">
                      Zero-blocking async pipelines with Pydantic validation, JWT OAuth2 authentication, and Redis caching.
                    </p>
                  </div>
                  <div className="p-3 bg-[#0d1726] border border-sky-900 rounded space-y-1">
                    <span className="font-bold text-sky-300">NumPy & Pandas Data Processing</span>
                    <p className="text-[11px] text-slate-300">
                      Vectorized matrix transformations, windowed aggregations, and automated data quality validation.
                    </p>
                  </div>
                </div>
              )}

              {/* Weaponsmith Skills */}
              {modalType === 'open_weapons' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-amber-400 font-pixel">FORGED TECHNICAL WEAPONS:</p>
                  {WEAPON_SKILLS.map((w) => (
                    <div key={w.id} className="p-3 bg-[#1e140d] border border-[#3d2011] rounded space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-300">{w.name}</span>
                        <span className="font-pixel text-[8px] text-orange-400">Mastery: {w.level}%</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{w.description}</p>
                      <p className="text-[10px] text-amber-500 font-mono">Enchantments: {(w.enchantments || []).join(' · ')}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Guild Noticeboard: Quests */}
              {modalType === 'inspect_quests' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-purple-400 font-pixel">ACTIVE GUILD BOUNTIES & QUESTS:</p>
                  {INITIAL_QUESTS.map((q) => (
                    <div key={q.id} className="p-3 bg-[#1c1228] border border-[#3b1d54] rounded space-y-1.5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-400" />
                          <span className="font-bold text-purple-200">{q.title}</span>
                        </div>
                        <span className="text-[8px] px-2 py-0.5 bg-purple-900/60 text-purple-300 border border-purple-600 font-pixel">
                          +{q.rewardXp} XP
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">{q.description}</p>
                      {q.technologies && (
                        <p className="text-[10px] text-purple-400 font-mono">Tech: {q.technologies.join(', ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Academic Degrees: MCA & BCA */}
              {modalType === 'inspect_education' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-blue-400 font-pixel">APEX UNIVERSITY ACADEMIC DEGREES:</p>
                  {EDUCATION_RECORDS.map((edu, idx) => (
                    <div key={idx} className="p-3 bg-[#0d162b] border border-[#1e3a8a] rounded space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sky-300">{edu.degree}</span>
                        <span className="text-[8px] px-2 py-0.5 bg-blue-950 text-blue-300 border border-blue-700 font-pixel">
                          CGPA: {edu.cgpa}
                        </span>
                      </div>
                      <p className="text-[10px] text-amber-300 font-pixel">{edu.institution} · {edu.period}</p>
                      <p className="text-[11px] text-slate-300">{edu.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {edu.highlights.map((h, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 bg-sky-950/80 text-sky-400 border border-sky-800 rounded">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications Showcase */}
              {modalType === 'inspect_certifications' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-blue-400 font-pixel">VERIFIED CREDENTIALS:</p>
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div key={idx} className="p-3 bg-[#0d162b] border border-[#1e3a8a] rounded space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sky-300">{cert.title}</span>
                        <span className="text-[8px] font-mono text-emerald-400">{cert.date}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">Issuer: {cert.issuer} (ID: {cert.credentialId})</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cert.skillsCovered.map((s, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 bg-blue-900/40 text-blue-300 border border-blue-700/50 rounded font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Analytics Tower: Telemetry Console */}
              {modalType === 'inspect_telemetry' && (
                <div className="space-y-3 font-mono">
                  <p className="text-[10px] text-cyan-400 font-pixel">LIVE EXECUTIVE BI TELEMETRY:</p>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 bg-[#081b26] border border-cyan-800 rounded">
                      <div className="text-sm font-bold text-cyan-300 font-pixel">500,000+</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">Records Processed</div>
                    </div>
                    <div className="p-2.5 bg-[#081b26] border border-cyan-800 rounded">
                      <div className="text-sm font-bold text-emerald-400 font-pixel">&lt; 18ms</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">DirectQuery Latency</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#081b26] border border-cyan-800 rounded space-y-1">
                    <span className="font-bold text-cyan-300">Sales Analytics DirectQuery Pipeline</span>
                    <p className="text-[11px] text-slate-300">
                      Extracts transaction logs from distributed endpoints, cleanses anomalies via automated SQL staging jobs, and outputs dynamic Power BI dashboards with Prophet sales forecasting.
                    </p>
                  </div>
                </div>
              )}

              {/* Analytics Tower: ETL Staging */}
              {modalType === 'inspect_etl' && (
                <div className="space-y-3 font-mono">
                  <p className="text-[10px] text-cyan-400 font-pixel">POSTGRESQL STAR SCHEMA & ETL:</p>
                  <div className="p-3 bg-[#081b26] border border-cyan-800 rounded space-y-1 text-[11px] text-slate-300">
                    <p className="text-amber-300 font-bold">fact_retail_transactions</p>
                    <p className="text-slate-400">Dimensions: dim_customer, dim_product, dim_store, dim_date</p>
                    <p className="pt-1 text-slate-300">
                      Features recursive CTEs, window partitioned aggregations, and idempotent daily staging crons.
                    </p>
                  </div>
                </div>
              )}

              {/* ML Lab: Neural Models */}
              {modalType === 'inspect_ml_models' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-pink-400 font-pixel">MULTIMODAL NEURAL ARCHITECTURES:</p>
                  <div className="p-3 bg-[#240e1e] border border-pink-900 rounded space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-pink-300">MindPulse AI — Acoustic Transformer</span>
                      <span className="text-[8px] px-2 py-0.5 bg-pink-950 text-pink-300 border border-pink-700 font-pixel">94.2% Prec.</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Dual-branch architecture combining vocal biomarkers (MFCC, pitch jitter) with fine-tuned RoBERTa text transformers.
                    </p>
                  </div>
                  <div className="p-3 bg-[#240e1e] border border-pink-900 rounded space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-pink-300">Lost & Found AI — OpenAI CLIP Search</span>
                      <span className="text-[8px] px-2 py-0.5 bg-pink-950 text-pink-300 border border-pink-700 font-pixel">&lt; 50ms</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Zero-shot cross-modal vision-language retrieval using OpenAI CLIP ViT-B/32 and Qdrant high-dimensional vector index.
                    </p>
                  </div>
                </div>
              )}

              {/* ML Lab: GPU Cluster */}
              {modalType === 'inspect_gpu' && (
                <div className="space-y-3 font-mono">
                  <p className="text-[10px] text-pink-400 font-pixel">GPU TRAINING & RUNTIME OPTIMIZATION:</p>
                  <div className="p-3 bg-[#240e1e] border border-pink-900 rounded space-y-1 text-[11px] text-slate-300">
                    <p className="text-pink-300 font-bold">PyTorch Mixed Precision (AMP FP16)</p>
                    <p>Enables 2.4x higher batch throughput during transformer fine-tuning with zero precision loss.</p>
                    <p className="pt-1 text-sky-400 font-bold">ONNX Runtime Edge Scoring</p>
                    <p>Quantized CPU inference latency under 20ms for edge scoring in clinical client apps.</p>
                  </div>
                </div>
              )}

              {/* Garden: Facts */}
              {modalType === 'inspect_garden_facts' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-emerald-400 font-pixel">ARYAN’S HOBBIES & CODING RITUALS:</p>
                  {GARDEN_FACTS.map((fact, idx) => (
                    <div key={idx} className="p-3 bg-[#0a1f14] border border-emerald-800 rounded space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{fact.icon}</span>
                        <span className="font-bold text-emerald-300 font-pixel text-[9px]">{fact.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{fact.fact}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Garden: Gazebo Rest */}
              {modalType === 'rest_gazebo' && (
                <div className="text-center py-6 space-y-3 font-pixel">
                  <Heart className="w-10 h-10 mx-auto text-emerald-400 animate-pulse" />
                  <h3 className="text-xs text-emerald-300">PEACEFUL ARBORETUM REST</h3>
                  <p className="font-sans text-xs text-slate-300 max-w-md mx-auto">
                    The gentle breeze rustles through the herb beds. Your mind is cleared of compiler errors and algorithm fatigue (+5 Focus restored).
                  </p>
                </div>
              )}

              {/* Boss Arena: Boss Projects */}
              {modalType === 'inspect_bosses' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-rose-400 font-pixel">CHALLENGE FLAGSHIP BOSS PROJECTS:</p>
                  {MAJOR_PROJECTS.map((proj) => (
                    <div key={proj.id} className="p-3 bg-[#240e15] border border-rose-900 rounded space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-rose-300 text-sm">{proj.title}</span>
                        <span className="text-[8px] px-2 py-0.5 bg-rose-950 text-rose-300 border border-rose-700 font-pixel">
                          {proj.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">{proj.shortDesc}</p>
                      <div className="flex items-center gap-3 pt-1">
                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-600 rounded text-[9px] font-pixel flex items-center gap-1"
                          >
                            <span>LIVE DEMO</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-white text-[10px] font-mono flex items-center gap-1"
                          >
                            <span>[GitHub Repository]</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Boss Arena: Tactics */}
              {modalType === 'inspect_tactics' && (
                <div className="space-y-3">
                  <p className="text-[10px] text-rose-400 font-pixel">HACKATHON TACTICAL BLUEPRINT:</p>
                  <div className="p-3 bg-[#240e15] border border-rose-900 rounded space-y-1.5 text-[11px] text-slate-300">
                    <p className="text-rose-300 font-bold">1. The Atomic "Magic Moment"</p>
                    <p>Build the core innovative differentiator first. Don’t waste 12 hours styling navigation bars before the AI pipeline works.</p>
                    <p className="text-rose-300 font-bold pt-1">2. Zero-Fluff Architecture</p>
                    <p>Leverage FastAPI and React for typed, instant contracts between ML workers and the user interface.</p>
                  </div>
                </div>
              )}

              {/* Post Office: Contact Dispatch */}
              {modalType === 'open_contact' && (
                <div className="space-y-4">
                  <p className="text-[10px] text-teal-400 font-pixel">ROYAL COURIER DISPATCH TERMINAL:</p>
                  <div className="p-4 bg-[#0a211e] border border-teal-800 rounded space-y-3">
                    <p className="text-[11px] text-slate-300">
                      Reach out directly to Aryan for machine learning engineering roles, full-stack software development, or research collaborations.
                    </p>
                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="flex items-center gap-2 text-teal-300">
                        <Mail className="w-4 h-4" />
                        <span>Email: <a href="mailto:aryangupta@example.com" className="text-teal-400 underline hover:text-teal-200">aryangupta@example.com</a></span>
                      </div>
                      <div className="flex items-center gap-2 text-sky-300">
                        <Code className="w-4 h-4" />
                        <span>GitHub: <a href="https://github.com/aryan" target="_blank" rel="noreferrer" className="underline hover:text-sky-200">github.com/aryan</a></span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-300">
                        <Award className="w-4 h-4" />
                        <span>LinkedIn: <a href="https://linkedin.com/in/aryan" target="_blank" rel="noreferrer" className="underline hover:text-blue-200">linkedin.com/in/aryan</a></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Post Office / Wardrobe: Download Resume */}
              {modalType === 'download_resume' && (
                <div className="text-center py-6 space-y-4 font-pixel">
                  <FileText className="w-12 h-12 mx-auto text-teal-400 animate-bounce" />
                  <h3 className="text-xs text-teal-300">OFFICIAL RESUME PACKET</h3>
                  <p className="font-sans text-xs text-slate-300 max-w-md mx-auto">
                    Full-Stack & Machine Learning Engineer (MCA Data Science). Includes verified hackathon wins, GitHub repositories, and production systems.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-[9px] border-2 border-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all font-pixel"
                    >
                      DOWNLOAD RESUME PDF 📥
                    </a>
                  </div>
                </div>
              )}

              {/* Guild Hearth Warming */}
              {modalType === 'warm_hearth' && (
                <div className="text-center py-6 space-y-3 font-pixel">
                  <Flame className="w-10 h-10 mx-auto text-amber-400 animate-bounce" />
                  <h3 className="text-xs text-amber-300">WARMED BY THE GUILD HEARTH</h3>
                  <p className="font-sans text-xs text-slate-300 max-w-md mx-auto">
                    The roaring oak flames warm your fingertips. Your stamina is replenished and your resolve to conquer upcoming quests is doubled!
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-[#3d2011] flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 bg-[#2e180d] hover:bg-[#452312] text-[#fde047] border border-[#f59e0b] font-pixel text-[8px]"
              >
                RETURN TO EXPLORATION (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
