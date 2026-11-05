import React, { useState } from 'react';
import { Mail, Send, Download, ExternalLink, X, CheckCircle2, User, Phone, MapPin, Sparkles, Printer, Stamp, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';
import { ARYAN_STATS, EDUCATION_RECORDS, CERTIFICATIONS, MAJOR_PROJECTS } from '../../data/portfolioData';

interface PostOfficeInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const PostOfficeInterior: React.FC<PostOfficeInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [activeTab, setActiveTab] = useState<'station' | 'message' | 'resume'>('station');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [waxStamped, setWaxStamped] = useState<boolean>(false);
  const [barnabyQuoteIdx, setBarnabyQuoteIdx] = useState<number>(0);

  const barnabyQuotes = [
    "Welcome to the Town Courier Hub! Whether it's a parchment scroll, carrier pigeon, or instantaneous WebSocket dispatch, your messages will find Aryan.",
    "Looking for the Royal Career Scroll? Aryan's complete resume is right here on the counter, freshly sealed in red wax.",
    "You can dispatch inquiries directly to Aryan's inbox, or connect via GitHub and LinkedIn. We guarantee zero packet drop across all postal routes!",
    "A clean message is like a well-formatted HTTP payload: concise headers, well-structured body, and polite protocol."
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    soundManager.playLevelUp();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#14b8a6', '#2dd4bf', '#f59e0b', '#ffffff']
    });

    setIsSent(true);
    if (onGainXp) onGainXp(50);
  };

  const handleStampWax = () => {
    soundManager.playAnvilClink();
    soundManager.playChime();
    setWaxStamped(true);
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.6 },
      colors: ['#14b8a6', '#2dd4bf', '#ef4444', '#fde047']
    });
    setTimeout(() => setWaxStamped(false), 800);
    if (onGainXp) onGainXp(20);
  };

  const handlePrintResume = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#071311] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP RETRO HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#0e221f] border-b-2 border-[#19453f] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#153631] border border-[#14b8a6] flex items-center justify-center text-[#14b8a6] shadow-inner">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#2dd4bf] tracking-wider uppercase flex items-center gap-2">
              <span>CONTACT POST OFFICE</span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#99f6e4] font-sans">
              Courier Chief Barnaby · Dispatch Inquiries, Resume & Social Links
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('station'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'station'
                ? 'bg-[#0d9488] text-white font-bold border-[#99f6e4] shadow-[0_0_10px_rgba(13,148,136,0.5)]'
                : 'bg-[#122b27] text-[#2dd4bf] border-[#19453f] hover:text-white'
            }`}
          >
            <span>📮</span>
            <span>COURIER STATION</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('message'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'message'
                ? 'bg-[#0d9488] text-white font-bold border-[#99f6e4] shadow-[0_0_10px_rgba(13,148,136,0.5)]'
                : 'bg-[#122b27] text-[#2dd4bf] border-[#19453f] hover:text-white'
            }`}
          >
            <span>✉</span>
            <span>SEND DISPATCH</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('resume'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'resume'
                ? 'bg-[#0d9488] text-white font-bold border-[#99f6e4] shadow-[0_0_10px_rgba(13,148,136,0.5)]'
                : 'bg-[#122b27] text-[#2dd4bf] border-[#19453f] hover:text-white'
            }`}
          >
            <span>📜</span>
            <span>RESUME ARCHIVE</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#153631] hover:bg-[#1f4c45] text-[#2dd4bf] border border-[#14b8a6]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: AUTHENTIC LIVING PIXEL ART COURIER STATION */}
      {activeTab === 'station' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#19453f] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#0a1a18]">
            {/* The Pixel Art Post Office Backdrop */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#0a1a18]">
              <img
                src="/assets/interiors/post_office_room.png"
                alt="Post Office Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Glow Overlays */}
              <div className="absolute inset-0 bg-radial from-teal-500/10 via-transparent to-black/40 pointer-events-none" />
              {waxStamped && (
                <div className="absolute inset-0 bg-teal-600/25 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Characters Standing in the Post Office */}
              {/* Courier Chief Barnaby NPC */}
              <div
                onClick={() => {
                  soundManager.playChime();
                  setBarnabyQuoteIdx((prev) => (prev + 1) % barnabyQuotes.length);
                }}
                className="absolute bottom-[24%] right-[32%] flex flex-col items-center cursor-pointer group z-10"
                title="Chief Barnaby (Click to talk)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#0a1a18]/90 border border-[#14b8a6] text-[7px] font-pixel text-[#99f6e4] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Talk to Barnaby
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/researcher_idle.png"
                    alt="Barnaby"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#122b27] text-[#2dd4bf] border border-[#0d9488] mt-0.5">
                  Barnaby
                </span>
              </div>

              {/* Aryan Character (Beside counter) */}
              <div className="absolute bottom-[22%] left-[26%] flex flex-col items-center z-10 pointer-events-none">
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-9 h-3 bg-black/50 rounded-full blur-[1px]" />
                  <img
                    src="/assets/characters/aryan/aryan_idle.png"
                    alt="Aryan"
                    className="w-10 h-15 object-contain [image-rendering:pixelated] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#0f172a] text-[#38bdf8] border border-[#0284c7] mt-0.5">
                  Aryan
                </span>
              </div>

              {/* Mango the Cat Companion */}
              <div
                onClick={() => {
                  soundManager.playCatMeow();
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.7 } });
                }}
                className="absolute bottom-[20%] left-[45%] flex flex-col items-center cursor-pointer group z-10"
                title="Mango the Cat (Click to pet)"
              >
                <div className="relative w-8 h-8 flex items-end justify-center">
                  <div className="absolute bottom-0 w-7 h-2 bg-black/50 rounded-full" />
                  <img
                    src="/assets/characters/mango/mango_spritesheet.png"
                    alt="Mango"
                    className="w-8 h-8 object-contain [image-rendering:pixelated] group-hover:scale-110 transition-transform"
                    style={{ objectPosition: '0 0' }}
                  />
                </div>
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#122b27] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. WAX STAMP & SCROLL (Click to stamp resume) */}
              <button
                onClick={handleStampWax}
                className={`absolute bottom-[22%] left-[16%] w-28 h-20 bg-teal-500/10 hover:bg-teal-500/30 border-2 border-dashed border-[#14b8a6] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20 ${
                  waxStamped ? 'scale-105 bg-teal-500/40' : 'hover:scale-105'
                }`}
                title="Wax Sealing Station (Click to stamp resume!)"
              >
                <Stamp className="w-5 h-5 text-[#2dd4bf] animate-bounce" />
                <span className="text-[6px] font-pixel text-[#99f6e4] mt-1 bg-black/80 px-1 border border-teal-600">
                  STAMP RESUME
                </span>
              </button>

              {/* 2. DIRECT DISPATCH HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('message'); }}
                className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-32 h-18 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Dispatch Counter (Click to write a message)"
              >
                <Mail className="w-5 h-5 text-[#f59e0b]" />
                <span className="text-[6px] font-pixel text-[#fef08a] mt-0.5 bg-black/80 px-1 border border-amber-700">
                  WRITE DISPATCH
                </span>
              </button>

              {/* 3. MAIL SORTING CUBBY GRID HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('resume'); }}
                className="absolute top-[28%] right-[14%] w-28 h-24 bg-teal-500/10 hover:bg-teal-500/25 border-2 border-dashed border-[#2dd4bf] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Resume Sorting Cubbies (Click to view official resume)"
              >
                <FileText className="w-5 h-5 text-[#2dd4bf]" />
                <span className="text-[6px] font-pixel text-[#99f6e4] mt-0.5 bg-black/80 px-1 border border-teal-700">
                  RESUME ARCHIVE
                </span>
              </button>
            </div>
          </div>

          {/* Bottom RPG Dialogue Console */}
          <div className="w-full mt-4 bg-[#0e221f] border-2 border-[#19453f] p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded border border-[#14b8a6] bg-[#153631] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/assets/npcs/researcher_idle.png"
                  alt="Barnaby"
                  className="w-10 h-10 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <span className="font-pixel text-[9px] text-[#2dd4bf] tracking-wider block">
                  COURIER CHIEF BARNABY
                </span>
                <p className="text-xs text-slate-200 mt-0.5 max-w-2xl leading-relaxed">
                  "{barnabyQuotes[barnabyQuoteIdx]}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-pixel text-[8px]">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setBarnabyQuoteIdx((prev) => (prev + 1) % barnabyQuotes.length);
                }}
                className="px-3 py-2 bg-[#153631] hover:bg-[#1f4c45] text-[#2dd4bf] border border-[#14b8a6]/50 transition-colors"
              >
                NEXT POSTAL NOTE
              </button>
              <button
                onClick={handleStampWax}
                className="px-3 py-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold border border-[#99f6e4] shadow-[0_0_10px_rgba(13,148,136,0.5)] transition-all flex items-center gap-1.5"
              >
                <Stamp className="w-3 h-3" />
                <span>STAMP SEAL (+20 XP)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: SEND DISPATCH MESSAGE */}
      {activeTab === 'message' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl bg-[#0e221f] border-4 border-[#19453f] p-6 sm:p-8 shadow-2xl">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#2dd4bf]" />
              <span>DISPATCH DIRECT MESSAGE TO ARYAN</span>
            </h2>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Have an opportunity, collaboration idea, or want to talk engineering? Send a dispatch directly to Aryan's inbox.
            </p>

            {isSent ? (
              <div className="p-6 bg-[#081715] border border-emerald-500 text-center animate-in zoom-in-95">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h3 className="font-pixel text-xs text-emerald-300 mb-1">DISPATCH SENT TO ARYAN!</h3>
                <p className="text-xs text-slate-300">
                  Your message has been stamped and dispatched. Aryan will reply promptly!
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-4 font-pixel text-[8px] px-4 py-2 bg-[#0d9488] hover:bg-[#0f766e] text-white border border-[#99f6e4]"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name or organization..."
                    className="w-full bg-[#081715] border border-[#19453f] px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#2dd4bf]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#081715] border border-[#19453f] px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#2dd4bf]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Aryan about your project, team, or opportunity..."
                    className="w-full bg-[#081715] border border-[#19453f] px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-[#2dd4bf] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white font-pixel text-xs tracking-wider border border-[#99f6e4] shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH MESSAGE (+50 XP)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 4. TAB 3: RESUME ARCHIVE */}
      {activeTab === 'resume' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-6">
            <div className="flex items-center justify-between bg-[#0e221f] border-2 border-[#19453f] p-4">
              <div>
                <h3 className="font-bold text-base text-white">Aryan's Official Career Resume</h3>
                <p className="text-xs text-teal-300">Data Science · AI / ML · Scalable Backend Architectures</p>
              </div>
              <button
                onClick={handlePrintResume}
                className="font-pixel text-[9px] px-4 py-2 bg-[#0d9488] hover:bg-[#0f766e] text-white flex items-center gap-1.5 border border-[#99f6e4] transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>PRINT / SAVE PDF</span>
              </button>
            </div>

            <div className="bg-[#0e221f] border-4 border-[#19453f] p-6 sm:p-8 space-y-6 text-slate-200">
              <div>
                <h2 className="text-xl font-bold text-white">ARYAN</h2>
                <p className="text-sm text-[#2dd4bf]">MCA (Data Science) Student & Applied AI Engineer</p>
                <p className="text-xs text-slate-400 mt-1">
                  Focus: High-throughput async architectures, multimodal embeddings, computer vision, and SQL data warehousing.
                </p>
              </div>

              <div className="border-t border-[#19453f] pt-4">
                <h4 className="font-pixel text-xs text-[#2dd4bf] mb-3">EDUCATION</h4>
                {EDUCATION_RECORDS.map((edu, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="flex justify-between text-xs font-bold text-white">
                      <span>{edu.degree} — {edu.specialization}</span>
                      <span className="font-mono text-teal-300">{edu.period}</span>
                    </div>
                    <div className="text-xs text-slate-400">{edu.institution}</div>
                    <p className="text-xs text-slate-300 mt-1">{edu.description}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#19453f] pt-4">
                <h4 className="font-pixel text-xs text-[#2dd4bf] mb-3">KEY PROJECTS & IMPACT</h4>
                {MAJOR_PROJECTS.map((proj) => (
                  <div key={proj.id} className="mb-3">
                    <div className="flex justify-between text-xs font-bold text-white">
                      <span>{proj.title}</span>
                      <span className="font-mono text-teal-300">{proj.category}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{proj.shortDesc || proj.description}</p>
                    <div className="text-[10px] text-teal-400 mt-1 font-mono">
                      Tech: {proj.technologies.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
