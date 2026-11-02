import React from 'react';
import { BookOpen, CheckCircle2, Circle } from 'lucide-react';
import { Quest } from '../../types';
import { soundManager } from '../../audio/SoundManager';

interface QuestJournalModalProps {
  quests: Quest[];
  onClose: () => void;
  onSelectQuestBuilding: (buildingId: string) => void;
}

export const QuestJournalModal: React.FC<QuestJournalModalProps> = ({
  quests,
  onClose,
  onSelectQuestBuilding
}) => {
  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="pixel-panel max-w-xl w-full bg-[#120a22] p-6 border-2 border-[#22d3ee] shadow-[0_0_35px_rgba(34,211,238,0.25)] relative font-pixel">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3b1254]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#22d3ee]" />
            <div>
              <h2 className="text-sm font-bold text-[#fdf4ff]">QUEST JOURNAL</h2>
              <p className="text-[7px] text-[#22d3ee] font-sans">
                Progress: {completedCount} / {quests.length} Objectives Cleared
              </p>
            </div>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="pixel-btn px-2 py-1 text-[8px] text-[#94a3b8]"
          >
            ✕
          </button>
        </div>

        {/* Quests list */}
        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 font-sans">
          {quests.map((q) => (
            <div
              key={q.id}
              className={`p-3 border flex items-center justify-between gap-3 ${
                q.completed
                  ? 'bg-[#0f1d17] border-emerald-500/50 text-[#94a3b8]'
                  : 'bg-[#1b0f30] border-[#3b1254]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">
                  {q.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#22d3ee]" />
                  )}
                </div>
                <div>
                  <h4 className={`font-pixel text-[9px] ${q.completed ? 'line-through text-[#64748b]' : 'text-white'}`}>
                    {q.title}
                  </h4>
                  <p className="text-xs text-[#cbd5e1] mt-0.5 leading-relaxed">
                    {q.description}
                  </p>
                  <span className="font-pixel text-[7px] text-[#22d3ee] inline-block mt-1">
                    +{q.rewardXp} EXP
                  </span>
                </div>
              </div>

              {!q.completed && q.buildingId && (
                <button
                  onClick={() => {
                    soundManager.playEnterBuilding();
                    onSelectQuestBuilding(q.buildingId!);
                  }}
                  className="pixel-btn px-2.5 py-1 text-[7px] font-pixel shrink-0 text-[#fde047]"
                >
                  TRACK
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
