import React from 'react';
import { Settings, Volume2, VolumeX, Keyboard, Sun, CloudRain, RefreshCw } from 'lucide-react';
import { TimeOfDay, WeatherType } from '../../types';
import { soundManager } from '../../audio/SoundManager';

interface SettingsModalProps {
  onClose: () => void;
  timeOfDay: TimeOfDay;
  onTimeOfDayChange: (time: TimeOfDay) => void;
  weather: WeatherType;
  onWeatherChange: (weather: WeatherType) => void;
  autoCycleEnabled: boolean;
  onToggleAutoCycle: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  timeOfDay,
  onTimeOfDayChange,
  weather,
  onWeatherChange,
  autoCycleEnabled,
  onToggleAutoCycle,
  isSoundMuted,
  onToggleSound
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="pixel-panel max-w-md w-full bg-[#120a22] p-6 border-2 border-[#22d3ee] shadow-[0_0_35px_rgba(34,211,238,0.25)] relative font-pixel">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3b1254]">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#22d3ee]" />
            <div>
              <h2 className="text-sm font-bold text-[#fdf4ff]">SETTINGS</h2>
              <p className="text-[7px] text-[#22d3ee] font-sans">Audio, time cycle & controls</p>
            </div>
          </div>
          <button
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="pixel-btn px-2 py-1 text-[8px] text-[#94a3b8]"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 font-sans text-xs">
          {/* Audio */}
          <div className="p-3 bg-[#1b0f30] border border-[#3b1254] flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              {isSoundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#22d3ee]" />}
              <div>
                <h4 className="font-pixel text-[8px] text-white">PROCEDURAL WEB AUDIO</h4>
                <p className="text-[10px] text-[#c084fc]">Footsteps, anvil strikes, chimes</p>
              </div>
            </div>
            <button
              onClick={onToggleSound}
              className={`pixel-btn px-3 py-1 font-pixel text-[7px] ${!isSoundMuted ? 'text-[#22d3ee]' : 'text-rose-400'}`}
            >
              {isSoundMuted ? 'MUTED' : 'ENABLED'}
            </button>
          </div>

          {/* Auto-Cycle Toggle */}
          <div className="p-3 bg-[#1b0f30] border border-[#3b1254] flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <RefreshCw className={`w-4 h-4 ${autoCycleEnabled ? 'text-emerald-400 animate-spin' : 'text-slate-400'}`} style={{ animationDuration: '6s' }} />
              <div>
                <h4 className="font-pixel text-[8px] text-white">DYNAMIC WORLD CYCLES</h4>
                <p className="text-[10px] text-[#c084fc]">Auto-advance time & weather</p>
              </div>
            </div>
            <button
              onClick={() => { soundManager.playClick(); onToggleAutoCycle(); }}
              className={`pixel-btn px-3 py-1 font-pixel text-[7px] ${autoCycleEnabled ? 'text-emerald-400' : 'text-slate-400'}`}
            >
              {autoCycleEnabled ? 'AUTO' : 'MANUAL'}
            </button>
          </div>

          {/* Time */}
          <div className="p-3 bg-[#1b0f30] border border-[#3b1254]">
            <h4 className="font-pixel text-[8px] text-white mb-2 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>TIME OF DAY</span>
            </h4>
            <div className="grid grid-cols-5 gap-1 font-pixel text-[6px]">
              {(['morning', 'day', 'afternoon', 'sunset', 'night'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { soundManager.playClick(); onTimeOfDayChange(t); }}
                  className={`py-1.5 uppercase transition-all cursor-pointer ${
                    timeOfDay === t ? 'bg-[#86198f] text-white border border-[#22d3ee] font-bold shadow-[0_0_8px_rgba(34,211,238,0.4)]' : 'bg-[#120a22] text-[#a855f7] border border-[#3b1254]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Weather */}
          <div className="p-3 bg-[#1b0f30] border border-[#3b1254]">
            <h4 className="font-pixel text-[8px] text-white mb-2 flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-sky-400" />
              <span>WEATHER ATMOSPHERE</span>
            </h4>
            <div className="grid grid-cols-5 gap-1 font-pixel text-[6px]">
              {([
                { id: 'clear', label: 'CLEAR' },
                { id: 'sakura_breeze', label: 'BREEZE' },
                { id: 'mist', label: 'MIST' },
                { id: 'rain', label: 'RAIN' },
                { id: 'storm', label: 'STORM' }
              ] as const).map((w) => (
                <button
                  key={w.id}
                  onClick={() => { soundManager.playClick(); onWeatherChange(w.id); }}
                  className={`py-1.5 uppercase transition-all cursor-pointer ${
                    weather === w.id ? 'bg-[#0284c7] text-white border border-[#fde047] font-bold shadow-[0_0_8px_rgba(56,189,248,0.4)]' : 'bg-[#120a22] text-sky-300 border border-[#3b1254]'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="p-3 bg-[#1b0f30] border border-[#3b1254]">
            <h4 className="font-pixel text-[8px] text-[#22d3ee] mb-2 flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-[#22d3ee]" />
              <span>KEYBOARD CONTROLS</span>
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#cbd5e1]">
              <div><strong>WASD / Arrows:</strong> Move</div>
              <div><strong>Shift:</strong> Sprint Run</div>
              <div><strong>[E]:</strong> Enter / Talk</div>
              <div><strong>[M]:</strong> World Map</div>
              <div><strong>[J]:</strong> Quest Journal</div>
              <div><strong>ESC:</strong> Exit Interiors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
