import React, { useEffect, useRef } from 'react';
import { BuildingData, TimeOfDay, NPC } from '../types';
import { WorldRenderer } from './WorldRenderer';
import { PlayerCharacter } from './PlayerCharacter';
import { ParticleSystem } from './particles';
import { NPCManager } from './NPCManager';
import { soundManager } from '../audio/SoundManager';

interface GameCanvasProps {
  buildings: BuildingData[];
  npcs: NPC[];
  timeOfDay: TimeOfDay;
  onEnterBuilding: (buildingId: string) => void;
  onNearBuildingChange: (building: BuildingData | null) => void;
  onNearNPCChange: (npc: NPC | null) => void;
  playerLevel: number;
  playerXp: number;
  onXpGain: (amount: number) => void;
  activeBuildingModal: string | null;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  buildings,
  npcs,
  timeOfDay,
  onEnterBuilding,
  onNearBuildingChange,
  onNearNPCChange,
  activeBuildingModal
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<WorldRenderer>(new WorldRenderer());
  const playerRef = useRef<PlayerCharacter>(new PlayerCharacter());
  const npcManagerRef = useRef<NPCManager>(new NPCManager(npcs));
  const particlesRef = useRef<ParticleSystem>(new ParticleSystem());

  const cameraRef = useRef<{ x: number; y: number }>({ x: 700, y: 550 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const lastTimeRef = useRef<number>(performance.now());
  const activeNearBuildingRef = useRef<BuildingData | null>(null);
  const activeNearNPCRef = useRef<NPC | null>(null);

  // Resize handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      keysRef.current[e.code] = true;
      soundManager.startAmbient();

      // [E] or [Space] or [Enter] to enter building
      if ((e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') && !activeBuildingModal) {
        if (activeNearBuildingRef.current) {
          e.preventDefault();
          soundManager.playEnterBuilding();
          onEnterBuilding(activeNearBuildingRef.current.id);
        } else if (activeNearNPCRef.current) {
          e.preventDefault();
          soundManager.playChime();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Teleport player listener (e.g. clicking Home in Nav bar)
    const handleTeleport = (e: Event) => {
      const customEvent = e as CustomEvent<{ x: number; y: number }>;
      if (customEvent.detail) {
        playerRef.current.state.x = customEvent.detail.x;
        playerRef.current.state.y = customEvent.detail.y;
        playerRef.current.state.path = [];
      }
    };
    window.addEventListener('teleport-player', handleTeleport);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('teleport-player', handleTeleport);
    };
  }, [onEnterBuilding, activeBuildingModal]);

  // Click-to-move handling via A* Pathfinding
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    soundManager.startAmbient();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickScreenX = e.clientX - rect.left;
    const clickScreenY = e.clientY - rect.top;

    const worldTargetX = clickScreenX + cameraRef.current.x;
    const worldTargetY = clickScreenY + cameraRef.current.y;

    // Direct door click check
    for (const b of buildings) {
      const distToDoor = Math.hypot(worldTargetX - b.doorX, worldTargetY - b.doorY);
      if (distToDoor < b.interactionRadius) {
        soundManager.playEnterBuilding();
        onEnterBuilding(b.id);
        return;
      }
    }

    // A* Pathfinding target calculation
    playerRef.current.setTarget(worldTargetX, worldTargetY);
  };

  // Main 60 FPS Delta-Time Game Loop
  useEffect(() => {
    let animId: number;
    lastTimeRef.current = performance.now();

    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Delta Time calculation (seconds)
      const now = performance.now();
      const dt = Math.min(0.08, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      const player = playerRef.current;
      const renderer = rendererRef.current;
      const npcManager = npcManagerRef.current;
      const particles = particlesRef.current;

      // 1. Update Player Physics & Collisions (Delta Time based)
      const isPaused = activeBuildingModal !== null;
      player.update(dt, keysRef.current, isPaused);

      // 2. Update Autonomous NPC Simulation
      npcManager.update(dt, player.state.x, player.state.y);

      // 3. Camera smoothing tracking player
      const targetCamX = player.state.x - canvas.width / 2;
      const targetCamY = player.state.y - canvas.height / 2;

      const maxCamX = Math.max(0, renderer.worldWidth - canvas.width);
      const maxCamY = Math.max(0, renderer.worldHeight - canvas.height);
      const clampedTargetX = Math.max(0, Math.min(maxCamX, targetCamX));
      const clampedTargetY = Math.max(0, Math.min(maxCamY, targetCamY));

      // Delta-time smoothed camera lerp
      const cameraLerpSpeed = 6.0; // factor
      cameraRef.current.x += (clampedTargetX - cameraRef.current.x) * (cameraLerpSpeed * dt);
      cameraRef.current.y += (clampedTargetY - cameraRef.current.y) * (cameraLerpSpeed * dt);

      const camX = cameraRef.current.x;
      const camY = cameraRef.current.y;

      // 4. Proximity detection to buildings
      let closestBuilding: BuildingData | null = null;
      for (const b of buildings) {
        const dist = Math.hypot(player.state.x - b.doorX, player.state.y - b.doorY);
        if (dist <= b.interactionRadius) {
          closestBuilding = b;
          break;
        }
      }

      if (closestBuilding !== activeNearBuildingRef.current) {
        if (closestBuilding && !activeNearBuildingRef.current) {
          soundManager.playChime();
        }
        activeNearBuildingRef.current = closestBuilding;
        onNearBuildingChange(closestBuilding);
      }

      // 5. Proximity detection to NPCs
      let closestNPC: NPC | null = null;
      for (const npc of npcManager.npcs) {
        const dist = Math.hypot(player.state.x - npc.x, player.state.y - npc.y);
        if (dist <= 60) {
          closestNPC = npc;
          break;
        }
      }
      if (closestNPC !== activeNearNPCRef.current) {
        if (closestNPC && closestNPC.id === 'npc_cat') {
          soundManager.playCatMeow();
        }
        activeNearNPCRef.current = closestNPC;
        onNearNPCChange(closestNPC);
      }

      // 6. Update Particle System
      particles.update(renderer.worldWidth, renderer.worldHeight, timeOfDay);

      // 7. Render Frame with Crisp Nearest-Neighbor Scaling
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Layered & Y-Sorted Town Scene (Player, NPCs, Trees, Buildings sorted by depth!)
      renderer.render(ctx, camX, camY, timeOfDay, buildings, npcManager, player);

      // Foreground Particles
      particles.render(ctx, camX, camY);

      // Day / Night Lighting Shader
      renderer.renderLightingShader(ctx, camX, camY, timeOfDay);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [timeOfDay, buildings, onEnterBuilding, onNearBuildingChange, onNearNPCChange, activeBuildingModal]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none cursor-crosshair">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="block w-full h-full touch-none"
      />
    </div>
  );
};
