import React from 'react';
import { Briefcase, Feather, Coffee, Book, Hammer, Scroll } from 'lucide-react';
import { INVENTORY_ITEMS } from '../../data/portfolioData';
import { InventoryItem } from '../../types';
import { soundManager } from '../../audio/SoundManager';

interface InventoryModalProps {
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({ onClose }) => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Feather': return Feather;
      case 'Coffee': return Coffee;
      case 'Book': return Book;
      case 'Hammer': return Hammer;
      default: return Scroll;
    }
  };

  const getRarityColor = (rarity: InventoryItem['rarity']) => {
    switch (rarity) {
      case 'legendary': return '#f59e0b';
      case 'epic': return '#a855f7';
      case 'rare': return '#38bdf8';
      default: return '#10b981';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="pixel-panel max-w-xl w-full bg-[#120a22] p-6 border-2 border-[#22d3ee] shadow-[0_0_35px_rgba(34,211,238,0.25)] relative font-pixel">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3b1254]">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#22d3ee]" />
            <div>
              <h2 className="text-sm font-bold text-[#fdf4ff]">ADVENTURER'S SATCHEL</h2>
              <p className="text-[7px] text-[#22d3ee] font-sans">Artifacts, power cells & equipped gear</p>
            </div>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="pixel-btn px-2 py-1 text-[8px] text-[#94a3b8]"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[60vh] overflow-y-auto pr-1 font-sans">
          {INVENTORY_ITEMS.map((item) => {
            const Icon = getIcon(item.icon);
            const rColor = getRarityColor(item.rarity);
            return (
              <div key={item.id} className="p-3 bg-[#1b0f30] border border-[#3b1254] flex gap-2.5 hover:border-[#22d3ee] transition-all">
                <div
                  className="w-10 h-10 border border-white/10 flex items-center justify-center shrink-0 shadow-[0_0_8px]"
                  style={{ backgroundColor: `${rColor}20`, color: rColor }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-pixel text-[8px] text-white">{item.name}</h4>
                  <span className="font-pixel text-[6px] uppercase block mb-1" style={{ color: rColor }}>
                    {item.rarity} {item.type}
                  </span>
                  <p className="text-xs text-[#cbd5e1] leading-tight mb-1">{item.description}</p>
                  <span className="text-[9px] text-[#c084fc] block font-mono">Found: {item.obtainedAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
