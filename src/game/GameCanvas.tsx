import React, { useEffect, useRef } from 'react';
import { BuildingData, TimeOfDay, NPC } from '../types';
import { WorldRenderer } from './WorldRenderer';
import { PlayerCharacter } from './PlayerCharacter';
import { ParticleSystem } from './particles';
import { NPCManager } from './NPCManager';
import { soundManager } from '../audio/SoundManager';
import { MangoPet } from './MangoPet';
import { TUNING } from './TUNING';

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
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<{ scale: number; destX: number; destY: number }>({ scale: 1, destX: 0, destY: 0 });
  const showDebugRef = useRef<boolean>(false);
  const fpsRef = useRef<number>(60);

  const rendererRef = useRef<WorldRenderer>(new WorldRenderer());
  const playerRef = useRef<PlayerCharacter>(new PlayerCharacter());
  const npcManagerRef = useRef<NPCManager>(new NPCManager(npcs));
  const mangoPetRef = useRef<MangoPet>(new MangoPet(1235, 1025));
  const particlesRef = useRef<ParticleSystem>(new ParticleSystem());

  const cameraRef = useRef<{ x: number; y: number }>({ x: 700, y: 550 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const lastTimeRef = useRef<number>(performance.now());
  const activeNearBuildingRef = useRef<BuildingData | null>(null);
  const activeNearNPCRef = useRef<NPC | null>(null);

  // Initialize offscreen low-res rendering canvas (640x360 pixel art buffer)
  useEffect(() => {
    if (!offscreenRef.current) {
      const off = document.createElement('canvas');
      off.width = TUNING.RENDER.INTERNAL_WIDTH;
      off.height = TUNING.RENDER.INTERNAL_HEIGHT;
      const oCtx = off.getContext('2d');
      if (oCtx) oCtx.imageSmoothingEnabled = false;
      offscreenRef.current = off;
    }
  }, []);

  // Resize handling with devicePixelRatio & integer scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'F3') {
        e.preventDefault();
        showDebugRef.current = !showDebugRef.current;
        return;
      }

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
        mangoPetRef.current.x = customEvent.detail.x + 35;
        mangoPetRef.current.y = customEvent.detail.y + 12;
      }
    };
    window.addEventListener('teleport-player', handleTeleport);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('teleport-player', handleTeleport);
    };
  }, [onEnterBuilding, activeBuildingModal]);

  // Click-to-move handling via A* Pathfinding (Scaled through pixel viewport)
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    soundManager.startAmbient();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const canvasPxX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const canvasPxY = (e.clientY - rect.top) * (canvas.height / rect.height);

    const { scale, destX, destY } = viewportRef.current;
    const internalX = Math.floor((canvasPxX - destX) / scale);
    const internalY = Math.floor((canvasPxY - destY) / scale);

    // Ignore clicks on letterbox borders
    if (
      internalX < 0 ||
      internalX >= TUNING.RENDER.INTERNAL_WIDTH ||
      internalY < 0 ||
      internalY >= TUNING.RENDER.INTERNAL_HEIGHT
    ) {
      return;
    }

    const worldTargetX = internalX + Math.round(cameraRef.current.x);
    const worldTargetY = internalY + Math.round(cameraRef.current.y);

    // Direct Mango pet interaction check (Mango meows and stretches!)
    const distToMango = Math.hypot(worldTargetX - mangoPetRef.current.x, worldTargetY - mangoPetRef.current.y);
    if (distToMango < 40) {
      mangoPetRef.current.meow();
      return;
    }

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
      const offscreen = offscreenRef.current;
      if (!canvas || !offscreen) return;

      const ctx = canvas.getContext('2d');
      const offCtx = offscreen.getContext('2d');
      if (!ctx || !offCtx) return;

      // Delta Time calculation (seconds)
      const now = performance.now();
      const dt = Math.min(TUNING.RENDER.MAX_DELTA_TIME, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      const player = playerRef.current;
      const renderer = rendererRef.current;
      const npcManager = npcManagerRef.current;
      const particles = particlesRef.current;

      const viewW = TUNING.RENDER.INTERNAL_WIDTH;
      const viewH = TUNING.RENDER.INTERNAL_HEIGHT;

      // 1. Update Player Physics & Collisions (Delta Time based)
      const isPaused = activeBuildingModal !== null;
      player.update(dt, keysRef.current, isPaused);

      // 2. Update Autonomous NPC Simulation
      npcManager.update(dt, player.state.x, player.state.y);

      // 2b. Update Mango Pet Companion (Delta-Time follow AI & animations)
      mangoPetRef.current.update(dt, player.state.x, player.state.y, player.state.isMoving);

      // 3. Camera follow (Exponential decay, frame-rate independent)
      const targetCamX = player.state.x - viewW / 2;
      const targetCamY = player.state.y - viewH / 2;

      const maxCamX = Math.max(0, renderer.worldWidth - viewW);
      const maxCamY = Math.max(0, renderer.worldHeight - viewH);
      const clampedTargetX = Math.max(0, Math.min(maxCamX, targetCamX));
      const clampedTargetY = Math.max(0, Math.min(maxCamY, targetCamY));

      const camDecay = 1 - Math.exp(-TUNING.CAMERA.DAMPING * dt);
      cameraRef.current.x += (clampedTargetX - cameraRef.current.x) * camDecay;
      cameraRef.current.y += (clampedTargetY - cameraRef.current.y) * camDecay;

      // Snap camera to whole pixels
      const camX = Math.round(cameraRef.current.x);
      const camY = Math.round(cameraRef.current.y);

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
        activeNearNPCRef.current = closestNPC;
        onNearNPCChange(closestNPC);
      }

      // 6. Update Particle System
      particles.update(renderer.worldWidth, renderer.worldHeight, timeOfDay);

      // 7. Render Low-Res Frame to Offscreen Pixel-Art Canvas (640x360)
      offCtx.imageSmoothingEnabled = false;
      offCtx.clearRect(0, 0, viewW, viewH);

      // Render Layered & Y-Sorted Town Scene
      renderer.render(offCtx, camX, camY, timeOfDay, buildings, npcManager, player, mangoPetRef.current);

      // Foreground Particles
      particles.render(offCtx, camX, camY);

      // Day / Night Lighting Shader with single cached lightmap & additive light pools
      renderer.renderLightingShader(offCtx, camX, camY, timeOfDay, player);

      // F3 Debug Overlay & Hitbox Visualizer
      fpsRef.current = fpsRef.current * 0.92 + (1 / Math.max(0.001, dt)) * 0.08;
      if (showDebugRef.current) {
        offCtx.save();
        offCtx.lineWidth = 1;

        // 1. Wireframe Collision Hitboxes
        // Buildings: Cyan outlines
        offCtx.strokeStyle = 'rgba(34, 211, 238, 0.85)';
        for (const b of buildings) {
          offCtx.strokeRect(
            Math.round(b.collisionBox.x - camX),
            Math.round(b.collisionBox.y - camY),
            b.collisionBox.w,
            b.collisionBox.h
          );
        }

        // Town Fountain: Amber outline
        offCtx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
        offCtx.beginPath();
        offCtx.arc(Math.round(1200 - camX), Math.round(960 - camY), 44, 0, Math.PI * 2);
        offCtx.stroke();

        // Player foot capsule: Green outline
        offCtx.strokeStyle = 'rgba(34, 197, 94, 0.95)';
        offCtx.beginPath();
        offCtx.ellipse(
          Math.round(player.state.x - camX),
          Math.round(player.state.y + TUNING.PLAYER.HITBOX.OFFSET_Y - camY),
          TUNING.PLAYER.HITBOX.RADIUS_X,
          TUNING.PLAYER.HITBOX.RADIUS_Y,
          0,
          0,
          Math.PI * 2
        );
        offCtx.stroke();

        // Mango pet: Rose outline
        offCtx.strokeStyle = 'rgba(244, 63, 94, 0.95)';
        offCtx.beginPath();
        offCtx.ellipse(
          Math.round(mangoPetRef.current.x - camX),
          Math.round(mangoPetRef.current.y - camY),
          8,
          5,
          0,
          0,
          Math.PI * 2
        );
        offCtx.stroke();

        // 2. Translucent Debug Metrics HUD
        const panelX = 8;
        const panelY = 8;
        const panelW = 270;
        const panelH = 74;
        offCtx.fillStyle = 'rgba(15, 23, 42, 0.90)';
        offCtx.fillRect(panelX, panelY, panelW, panelH);
        offCtx.strokeStyle = '#22d3ee';
        offCtx.strokeRect(panelX, panelY, panelW, panelH);

        offCtx.font = '700 7px "Press Start 2P", monospace';
        offCtx.fillStyle = '#fde047';
        offCtx.fillText('[F3 DEBUG OVERLAY]', panelX + 8, panelY + 13);

        offCtx.fillStyle = '#38bdf8';
        const ms = (1000 / Math.max(1, fpsRef.current)).toFixed(1);
        offCtx.fillText(`FPS: ${fpsRef.current.toFixed(1)} (${ms}ms) | 640x360`, panelX + 8, panelY + 27);

        offCtx.fillStyle = '#a7f3d0';
        offCtx.fillText(`Player: X:${player.state.x.toFixed(0)} Y:${player.state.y.toFixed(0)} | ${player.state.direction}`, panelX + 8, panelY + 41);

        offCtx.fillStyle = '#e2e8f0';
        offCtx.fillText(`Camera: X:${camX} Y:${camY}`, panelX + 8, panelY + 55);

        offCtx.fillStyle = '#f472b6';
        const entCount = buildings.length + npcManager.npcs.length + 2 + 34;
        offCtx.fillText(`Entities: ${entCount} | Hitboxes: ACTIVE`, panelX + 8, panelY + 67);

        offCtx.restore();
      }

      // 8. Integer-Scale Offscreen Buffer to Window Canvas with Letterboxing
      const scaleX = canvas.width / viewW;
      const scaleY = canvas.height / viewH;
      const integerScale = Math.max(1, Math.floor(Math.min(scaleX, scaleY)));
      const destW = viewW * integerScale;
      const destH = viewH * integerScale;
      const destX = Math.floor((canvas.width - destW) / 2);
      const destY = Math.floor((canvas.height - destH) / 2);

      viewportRef.current = { scale: integerScale, destX, destY };

      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#090e17';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreen, 0, 0, viewW, viewH, destX, destY, destW, destH);

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
