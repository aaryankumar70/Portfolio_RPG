import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { GameCanvas } from './game/GameCanvas';
import { GameHUD } from './components/ui/GameHUD';
import { IntroSequence } from './components/ui/IntroSequence';
import { BUILDINGS, NPCS, INITIAL_QUESTS, ARYAN_STATS } from './data/portfolioData';
import { BuildingData, TimeOfDay, Quest, NPC } from './types';
import { soundManager } from './audio/SoundManager';

// Explorable Canvas RPG Interior Environment
import { InteriorGameCanvas } from './components/interiors/InteriorGameCanvas';

// Modals
import { AICompanionModal } from './components/modals/AICompanionModal';
import { WorldMapModal } from './components/modals/WorldMapModal';
import { QuestJournalModal } from './components/modals/QuestJournalModal';
import { InventoryModal } from './components/modals/InventoryModal';
import { SettingsModal } from './components/modals/SettingsModal';

export const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);
  const [nearBuilding, setNearBuilding] = useState<BuildingData | null>(null);
  const [nearNPC, setNearNPC] = useState<NPC | null>(null);
  const [activeModal, setActiveModal] = useState<'quests' | 'inventory' | 'map' | 'settings' | 'companion' | null>(null);

  // RPG Stats for Aryan (Level 18, 1280 XP, 24 Coffee Cups)
  const [playerLevel, setPlayerLevel] = useState<number>(ARYAN_STATS.level);
  const [playerXp, setPlayerXp] = useState<number>(ARYAN_STATS.xp);
  const maxXp = ARYAN_STATS.maxXp;
  const [coffeeCount, setCoffeeCount] = useState<number>(ARYAN_STATS.coffeeCups);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Gain XP & Level up mechanism
  const handleXpGain = useCallback((amount: number) => {
    setPlayerXp((prev) => {
      const next = prev + amount;
      if (next >= maxXp) {
        setPlayerLevel((lvl) => lvl + 1);
        soundManager.playLevelUp();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        return next - maxXp;
      }
      return next;
    });
  }, [maxXp]);

  // Handle buying a coffee at Coffee Shop (Rule 7C: Increments count, NO XP awarded)
  const handleBuyCoffee = useCallback(() => {
    setCoffeeCount((prev) => prev + 1);
  }, []);

  // Handle Entering a Building (Rule 7A: Entering does NOT auto-complete quests)
  const handleEnterBuilding = useCallback((buildingId: string) => {
    setIsTransitioning(true);
    soundManager.playEnterBuilding();

    setTimeout(() => {
      setActiveBuilding(buildingId);
      setActiveModal(null);
      setIsTransitioning(false);
    }, 350);
  }, []);

  // Back to Town Overworld (Rule 4: Teleports Aryan to exact exterior building doorstep)
  const handleBackToTown = useCallback(() => {
    setIsTransitioning(true);
    soundManager.playEnterBuilding();
    const b = BUILDINGS.find((bld) => bld.id === activeBuilding);
    if (b) {
      window.dispatchEvent(
        new CustomEvent('teleport-player', {
          detail: { x: b.doorX, y: b.doorY + 25 }
        })
      );
    }
    setTimeout(() => {
      setActiveBuilding(null);
      setIsTransitioning(false);
    }, 300);
  }, [activeBuilding]);

  // Fast Travel to Town Square Fountain
  const handleFastTravelToTownSquare = useCallback(() => {
    setActiveBuilding(null);
    setActiveModal(null);
    soundManager.playChime();
    // Dispatch custom event to recenter player if needed
    window.dispatchEvent(new CustomEvent('teleport-player', { detail: { x: 1200, y: 890 } }));
  }, []);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.code === 'Escape') {
        if (activeModal) {
          setActiveModal(null);
        } else if (activeBuilding) {
          handleBackToTown();
        }
      } else if (e.code === 'KeyM' && !activeBuilding) {
        setActiveModal((prev) => (prev === 'map' ? null : 'map'));
      } else if (e.code === 'KeyJ' && !activeBuilding) {
        setActiveModal((prev) => (prev === 'quests' ? null : 'quests'));
      } else if (e.code === 'KeyI' && !activeBuilding) {
        setActiveModal((prev) => (prev === 'inventory' ? null : 'inventory'));
      } else if (e.code === 'KeyC' && !activeBuilding) {
        setActiveModal((prev) => (prev === 'companion' ? null : 'companion'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, activeBuilding, handleBackToTown]);

  const handleToggleSound = () => {
    const enabled = soundManager.toggleSound();
    setIsSoundMuted(!enabled);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#090e17] font-sans">
      {/* 1. CINEMATIC INTRO SEQUENCE (Section 3 of User Prompt) */}
      {!gameStarted && (
        <IntroSequence
          onBegin={() => setGameStarted(true)}
          onFastTravel={() => {
            setGameStarted(true);
            setActiveModal('map');
          }}
        />
      )}

      {/* 2. MAIN EXPLORABLE TOWN OVERWORLD */}
      <div className={`w-full h-full relative ${activeBuilding ? 'invisible pointer-events-none' : 'visible'}`}>
        <GameCanvas
          buildings={BUILDINGS}
          npcs={NPCS}
          timeOfDay={timeOfDay}
          onEnterBuilding={handleEnterBuilding}
          onNearBuildingChange={setNearBuilding}
          onNearNPCChange={setNearNPC}
          playerLevel={playerLevel}
          playerXp={playerXp}
          onXpGain={handleXpGain}
          activeBuildingModal={activeBuilding}
        />

        {/* Persistent RPG HUD matching Reference Screenshot */}
        {gameStarted && (
          <GameHUD
            playerLevel={playerLevel}
            playerXp={playerXp}
            maxXp={maxXp}
            timeOfDay={timeOfDay}
            onTimeOfDayChange={setTimeOfDay}
            quests={quests}
            nearBuilding={nearBuilding}
            nearNPC={nearNPC}
            onEnterBuilding={handleEnterBuilding}
            onOpenQuests={() => setActiveModal('quests')}
            onOpenInventory={() => setActiveModal('inventory')}
            onOpenMap={() => setActiveModal('map')}
            onOpenSettings={() => setActiveModal('settings')}
            onOpenCompanion={() => setActiveModal('companion')}
            isSoundMuted={isSoundMuted}
            onToggleSound={handleToggleSound}
            onFastTravelToTownSquare={handleFastTravelToTownSquare}
          />
        )}
      </div>

      {/* 3. DEDICATED EXPLORABLE CANVAS INTERIORS (Physical Walking, Collisions, Depth Sorting, Mango Companion) */}
      {activeBuilding && (
        <div className="absolute inset-0 z-30 animate-in fade-in zoom-in-95 duration-300">
          <InteriorGameCanvas
            buildingId={activeBuilding}
            onExit={handleBackToTown}
            onBuyCoffee={handleBuyCoffee}
          />
        </div>
      )}

      {/* 4. RPG SYSTEM MODALS */}
      {activeModal === 'companion' && (
        <AICompanionModal
          onClose={() => setActiveModal(null)}
          onNavigateBuilding={handleEnterBuilding}
        />
      )}

      {activeModal === 'map' && (
        <WorldMapModal
          onClose={() => setActiveModal(null)}
          onFastTravel={(id) => {
            setActiveModal(null);
            handleEnterBuilding(id);
          }}
        />
      )}

      {activeModal === 'quests' && (
        <QuestJournalModal
          quests={quests}
          onClose={() => setActiveModal(null)}
          onSelectQuestBuilding={(bId) => {
            setActiveModal(null);
            handleEnterBuilding(bId);
          }}
        />
      )}

      {activeModal === 'inventory' && (
        <InventoryModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'settings' && (
        <SettingsModal
          onClose={() => setActiveModal(null)}
          timeOfDay={timeOfDay}
          onTimeOfDayChange={setTimeOfDay}
          isSoundMuted={isSoundMuted}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* 5. CINEMATIC SCENE TRANSITION SHUTTER */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-[#070b12] pointer-events-none transition-opacity duration-300 animate-in fade-in" />
      )}

      {/* Subtle Scanline Overlay */}
      <div className="pixel-scanlines fixed inset-0 pointer-events-none z-10 opacity-30" />
    </div>
  );
};

export default App;
