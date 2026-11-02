import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameCanvas } from './game/GameCanvas';
import { GameHUD } from './components/ui/GameHUD';
import { TitleScreen } from './components/ui/TitleScreen';
import { BUILDINGS, NPCS, INITIAL_QUESTS } from './data/portfolioData';
import { BuildingData, TimeOfDay, Quest, NPC } from './types';
import { soundManager } from './audio/SoundManager';

// Interior Scenes
import { GuildHallInterior } from './components/interiors/GuildHallInterior';
import { BlacksmithInterior } from './components/interiors/BlacksmithInterior';
import { ProjectBazaarInterior } from './components/interiors/ProjectBazaarInterior';
import { LibraryInterior } from './components/interiors/LibraryInterior';
import { CoffeeShopInterior } from './components/interiors/CoffeeShopInterior';
import { RoyalArchiveInterior } from './components/interiors/RoyalArchiveInterior';
import { ArenaInterior } from './components/interiors/ArenaInterior';
import { ObservatoryInterior } from './components/interiors/ObservatoryInterior';
import { AcademyInterior } from './components/interiors/AcademyInterior';
import { AdventurersInnInterior } from './components/interiors/AdventurersInnInterior';

// Modals
import { WorldMapModal } from './components/modals/WorldMapModal';
import { QuestJournalModal } from './components/modals/QuestJournalModal';
import { InventoryModal } from './components/modals/InventoryModal';
import { SettingsModal } from './components/modals/SettingsModal';

export const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('sunset');
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);
  const [nearBuilding, setNearBuilding] = useState<BuildingData | null>(null);
  const [nearNPC, setNearNPC] = useState<NPC | null>(null);
  const [activeModal, setActiveModal] = useState<'quests' | 'inventory' | 'map' | 'settings' | null>(null);

  // RPG Stats
  const [playerLevel, setPlayerLevel] = useState<number>(12);
  const [playerXp, setPlayerXp] = useState<number>(3240);
  const maxXp = 4000;
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

  // Handle Entering a Building
  const handleEnterBuilding = useCallback((buildingId: string) => {
    setIsTransitioning(true);

    // Complete corresponding quest if active
    setQuests((prevQuests) =>
      prevQuests.map((q) => {
        if (!q.completed && q.buildingId === buildingId) {
          handleXpGain(q.rewardXp);
          return { ...q, completed: true };
        }
        return q;
      })
    );

    setTimeout(() => {
      setActiveBuilding(buildingId);
      setActiveModal(null);
      setIsTransitioning(false);
    }, 350);
  }, [handleXpGain]);

  // Back to Town Overworld
  const handleBackToTown = useCallback(() => {
    setIsTransitioning(true);
    soundManager.playEnterBuilding();
    setTimeout(() => {
      setActiveBuilding(null);
      setIsTransitioning(false);
    }, 300);
  }, []);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    <div className="relative w-screen h-screen overflow-hidden bg-[#0c0e17] font-sans">
      {/* 1. TITLE SCREEN (Initial Game Entrance) */}
      {!gameStarted && (
        <TitleScreen
          onStartAdventure={() => setGameStarted(true)}
          onOpenMap={() => {
            setGameStarted(true);
            setActiveModal('map');
          }}
        />
      )}

      {/* 2. MAIN LIVING TOWN OVERWORLD */}
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

        {/* Persistent RPG HUD */}
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
            isSoundMuted={isSoundMuted}
            onToggleSound={handleToggleSound}
          />
        )}
      </div>

      {/* 3. DEDICATED BUILDING INTERIORS */}
      {activeBuilding && (
        <div className="absolute inset-0 z-30 animate-in fade-in zoom-in-95 duration-300">
          {activeBuilding === 'guild_hall' && (
            <GuildHallInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'blacksmith' && (
            <BlacksmithInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'project_bazaar' && (
            <ProjectBazaarInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'library' && (
            <LibraryInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'coffee_shop' && (
            <CoffeeShopInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'royal_archive' && (
            <RoyalArchiveInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'arena' && (
            <ArenaInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'observatory' && (
            <ObservatoryInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'academy' && (
            <AcademyInterior onBack={handleBackToTown} />
          )}
          {activeBuilding === 'adventurers_inn' && (
            <AdventurersInnInterior onBack={handleBackToTown} />
          )}
        </div>
      )}

      {/* 4. RPG SYSTEM MODALS */}
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
        <div className="fixed inset-0 z-50 bg-[#090b14] pointer-events-none transition-opacity duration-300 animate-in fade-in" />
      )}

      {/* Subtle RPG Vignette & Scanline Overlay */}
      <div className="pixel-scanlines fixed inset-0 pointer-events-none z-10 opacity-40" />
    </div>
  );
};

export default App;
