import React from 'react';
import { Compass, X, Zap } from 'lucide-react';
import { BUILDINGS } from '../../data/portfolioData';
import { soundManager } from '../../audio/SoundManager';

interface WorldMapModalProps {
  onClose: () => void;
  onFastTravel: (buildingId: string) => void;
}

export const WorldMapModal: React.FC<WorldMapModalProps> = ({ onClose, onFastTravel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="pixel-panel max-w-4xl w-full bg-[#120a22] p-6 border-2 border-[#22d3ee] shadow-[0_0_35px_rgba(34,211,238,0.25)] relative font-pixel">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3b1254]">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#22d3ee]" />
            <div>
              <h2 className="text-sm font-bold text-[#fdf4ff]">WORLD MAP & FAST TRAVEL</h2>
              <p className="text-[7px] text-[#22d3ee] font-sans">Instant traversal across districts & citadels</p>
            </div>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="pixel-btn px-2 py-1 text-[8px] text-[#94a3b8]"
          >
            ✕
          </button>
        </div>

        {/* Building Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[65vh] overflow-y-auto pr-1">
          {BUILDINGS.map((b) => (
            <div
              key={b.id}
              className="bg-[#1b0f30] p-3 border border-[#3b1254] flex flex-col justify-between group hover:border-[#22d3ee] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[9px] font-bold text-white group-hover:text-[#22d3ee]">{b.name}</h3>
                  <span className="w-2.5 h-2.5 shrink-0 shadow-[0_0_6px]" style={{ backgroundColor: b.themeColor, color: b.themeColor }} />
                </div>
                <p className="text-[7px] text-[#c084fc] mb-2">{b.subtitle}</p>
                <p className="text-xs text-[#cbd5e1] font-sans line-clamp-2 mb-3">
                  {b.description}
                </p>
              </div>

              <button
                onClick={() => {
                  soundManager.playEnterBuilding();
                  onFastTravel(b.id);
                }}
                className="py-1.5 text-[8px] text-white bg-[#86198f] hover:bg-[#a21caf] border border-[#22d3ee] flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all active:translate-y-0.5"
              >
                <Zap className="w-3 h-3 text-[#22d3ee]" />
                <span>TRAVEL HERE</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
