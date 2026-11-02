import React, { useState } from 'react';
import { ArrowLeft, Mail, Send, Github, Linkedin, CheckCircle } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface AdventurersInnInteriorProps {
  onBack: () => void;
}

export const AdventurersInnInterior: React.FC<AdventurersInnInteriorProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [dispatched, setDispatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playLevelUp();
    setDispatched(true);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#07130e] text-slate-100 overflow-hidden select-text">
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#0e2119] border-b-2 border-[#1c4737] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#34d399]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE INN</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#34d399] tracking-wider">ADVENTURER’S INN</h1>
          <p className="text-[8px] text-[#6ee7b7]">DIRECT DISPATCH & CONTACT</p>
        </div>

        <div className="text-[9px] text-[#94a3b8]">ESC: BACK</div>
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 font-sans">
          <div className="md:col-span-5 space-y-3">
            <div className="pixel-panel bg-[#0c1f17] p-5 border-2 border-[#1d4d3b]">
              <h3 className="font-pixel text-[10px] text-[#34d399] mb-2">COMMUNICATION LODGE</h3>
              <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                Inquiries regarding full-time roles, freelance contracts, or research collaborations are warmly welcomed.
              </p>
              <div className="space-y-2 text-xs">
                <a href="mailto:thedevnomad@portfolio.rpg" className="flex items-center gap-2 p-2.5 bg-[#142e23] border border-[#235742] text-[#cbd5e1] hover:border-[#34d399]">
                  <Mail className="w-4 h-4 text-[#34d399]" />
                  <span>thedevnomad@portfolio.rpg</span>
                </a>
                <a href="https://github.com/thedevnomad" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2.5 bg-[#142e23] border border-[#235742] text-[#cbd5e1] hover:border-[#34d399]">
                  <Github className="w-4 h-4 text-[#34d399]" />
                  <span>github.com/thedevnomad</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2.5 bg-[#142e23] border border-[#235742] text-[#cbd5e1] hover:border-[#34d399]">
                  <Linkedin className="w-4 h-4 text-[#34d399]" />
                  <span>linkedin.com/in/thedevnomad</span>
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="pixel-panel bg-[#0c1f17] p-5 sm:p-6 border-2 border-[#1d4d3b]">
              <h3 className="font-pixel text-[10px] text-[#34d399] mb-3 flex items-center gap-2">
                <Send className="w-3.5 h-3.5" />
                DISPATCH PIGEON MISSIVE
              </h3>

              {dispatched ? (
                <div className="p-4 bg-[#143326] border border-[#34d399] text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-[#34d399] mx-auto" />
                  <h4 className="font-pixel text-[10px] text-white">DISPATCH DELIVERED!</h4>
                  <p className="text-xs text-[#cbd5e1]">Thank you, traveler! Your message will be answered swiftly.</p>
                  <button onClick={() => setDispatched(false)} className="pixel-btn text-[8px] font-pixel px-3 py-1.5 mt-2">
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-pixel text-[7px] text-[#94a3b8] block mb-1">TRAVELER NAME</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Recruiter Sarah or Engineering Lead Alex"
                      className="w-full p-2 bg-[#06100c] border border-[#1d4d3b] text-white focus:outline-none focus:border-[#34d399]"
                    />
                  </div>
                  <div>
                    <label className="font-pixel text-[7px] text-[#94a3b8] block mb-1">RETURN EMAIL</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="lead@techcompany.com"
                      className="w-full p-2 bg-[#06100c] border border-[#1d4d3b] text-white focus:outline-none focus:border-[#34d399]"
                    />
                  </div>
                  <div>
                    <label className="font-pixel text-[7px] text-[#94a3b8] block mb-1">YOUR MESSAGE</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Discuss open roles, project proposals, or hackathons..."
                      className="w-full p-2 bg-[#06100c] border border-[#1d4d3b] text-white focus:outline-none focus:border-[#34d399] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="pixel-btn-gold w-full py-2.5 font-pixel text-[8px] text-white"
                  >
                    SEND MISSIVE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
