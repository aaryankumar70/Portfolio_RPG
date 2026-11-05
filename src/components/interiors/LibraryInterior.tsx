import React, { useState } from 'react';
import { BookOpen, Award, GraduationCap, FileText, ExternalLink, X, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../audio/SoundManager';
import { CERTIFICATIONS, EDUCATION_RECORDS } from '../../data/portfolioData';

interface LibraryInteriorProps {
  onBack: () => void;
  onGainXp?: (amt: number) => void;
}

export const LibraryInterior: React.FC<LibraryInteriorProps> = ({
  onBack,
  onGainXp
}) => {
  const [activeTab, setActiveTab] = useState<'scene' | 'certs' | 'education' | 'blogs'>('scene');
  const [dialogueIdx, setDialogueIdx] = useState<number>(0);

  const librarianQuotes = [
    "Welcome to the Grand Archives of Knowledge! Here lie Aryan's verified degrees, diplomas, and research papers.",
    "Aryan pursued his Master of Computer Applications (MCA) in Data Science & Artificial Intelligence with high academic rigor.",
    "The scrolls on the mahogany table detail modern vector search, deep multimodal transformers, and idempotent database engineering.",
    "Knowledge without implementation is like a sword without an edge. That's why every certificate here is backed by production projects!"
  ];

  const blogs = [
    {
      title: 'Architecting Scalable Vector Search in 2026',
      date: 'Dec 2025 · 8 min read',
      summary: 'A deep dive into HNSW vs IVF indexing, cosine quantization, and optimizing retrieval latency in modern LLM RAG pipelines.'
    },
    {
      title: 'Demystifying Window Functions in PostgreSQL',
      date: 'Oct 2025 · 6 min read',
      summary: 'How to utilize LEAD, LAG, DENSE_RANK, and sliding window frames to solve complex cohort analysis without subquery bloat.'
    },
    {
      title: 'Building Resilient FastAPI Microservices with Redis',
      date: 'Jul 2025 · 5 min read',
      summary: 'Implementing token-bucket rate limiters, non-blocking asynchronous database connection pooling, and circuit breaker patterns.'
    }
  ];

  const handleConsultLibrarian = () => {
    soundManager.playCrystalChime();
    setDialogueIdx((prev) => (prev + 1) % librarianQuotes.length);
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.65 },
      colors: ['#38bdf8', '#818cf8', '#c084fc']
    });
    if (onGainXp) onGainXp(15);
  };

  const [candleLit, setCandleLit] = useState<boolean>(false);

  const handleLightCandle = () => {
    soundManager.playCrystalChime();
    setCandleLit(true);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fde047', '#fed7aa']
    });
    setTimeout(() => setCandleLit(false), 800);
    if (onGainXp) onGainXp(10);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#080d19] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3 bg-[#0f172c] border-b-2 border-[#1c2e56] shadow-lg font-pixel shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#162445] border border-[#38bdf8] flex items-center justify-center text-[#38bdf8] shadow-inner">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#38bdf8] tracking-wider uppercase flex items-center gap-2">
              <span>ACADEMY LIBRARY</span>
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping hidden sm:inline-block" />
            </h1>
            <p className="text-[8px] text-[#93c5fd] font-sans">
              Head Scholar Althea · Certified Degrees & Technical Grimoires
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('scene'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'scene'
                ? 'bg-[#0284c7] text-white font-bold border-[#7dd3fc] shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : 'bg-[#162445] text-[#94a3b8] border-[#1c2e56] hover:text-white'
            }`}
          >
            <span>🏛</span>
            <span>READING HALL</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('certs'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'certs'
                ? 'bg-[#0284c7] text-white font-bold border-[#7dd3fc] shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : 'bg-[#162445] text-[#94a3b8] border-[#1c2e56] hover:text-white'
            }`}
          >
            <span>📜</span>
            <span>CERTIFICATES</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('education'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'education'
                ? 'bg-[#0284c7] text-white font-bold border-[#7dd3fc] shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : 'bg-[#162445] text-[#94a3b8] border-[#1c2e56] hover:text-white'
            }`}
          >
            <span>🎓</span>
            <span>DEGREES</span>
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('blogs'); }}
            className={`px-3 py-1.5 text-[8px] border transition-colors flex items-center gap-1.5 ${
              activeTab === 'blogs'
                ? 'bg-[#0284c7] text-white font-bold border-[#7dd3fc] shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                : 'bg-[#162445] text-[#94a3b8] border-[#1c2e56] hover:text-white'
            }`}
          >
            <span>📖</span>
            <span>TECH ARTICLES</span>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#162445] hover:bg-[#203666] text-[#38bdf8] border border-[#38bdf8]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. TAB 1: ACADEMY READING HALL SCENE */}
      {activeTab === 'scene' && (
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 flex flex-col items-center justify-between max-w-6xl mx-auto w-full">
          {/* Main Visual Stage Frame */}
          <div className="w-full relative rounded border-4 border-[#1c2e56] shadow-[0_16px_50px_rgba(0,0,0,0.95)] overflow-hidden bg-[#0c1527]">
            {/* Handcrafted Stone & Stained Glass Library Interior */}
            <div className="relative w-full aspect-[2/1] max-h-[520px] overflow-hidden flex items-center justify-center bg-[#0e172a]">
              <img
                src="/assets/interiors/library_room_full.png"
                alt="Library Interior"
                className="w-full h-full object-cover [image-rendering:pixelated] select-none"
              />

              {/* Dynamic Glow Overlay */}
              <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-black/40 pointer-events-none" />
              {candleLit && (
                <div className="absolute inset-0 bg-blue-600/20 animate-pulse pointer-events-none transition-opacity duration-300" />
              )}

              {/* Head Scholar Althea (Beside the reading table) */}
              <div
                onClick={handleConsultLibrarian}
                className="absolute bottom-[24%] right-[34%] flex flex-col items-center cursor-pointer group z-10"
                title="Librarian Althea (Click to talk)"
              >
                <div className="mb-1 px-1.5 py-0.5 bg-[#081224]/90 border border-[#38bdf8] text-[7px] font-pixel text-[#7dd3fc] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs whitespace-nowrap shadow-md">
                  Consult Scholar Althea
                </div>
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-10 h-3 bg-black/60 rounded-full blur-[1px]" />
                  <img
                    src="/assets/npcs/librarian_idle.png"
                    alt="Librarian Althea"
                    className="w-11 h-15 object-contain [image-rendering:pixelated] group-hover:scale-105 transition-transform drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <span className="font-pixel text-[7px] px-1 py-0.5 bg-[#091122] text-[#38bdf8] border border-[#0284c7] mt-0.5">
                  Althea
                </span>
              </div>

              {/* Aryan Character (Studying credentials on table) */}
              <div className="absolute bottom-[22%] left-[26%] flex flex-col items-center z-10 pointer-events-none">
                <div className="relative w-12 h-16 flex items-end justify-center">
                  <div className="absolute bottom-0 w-9 h-3 bg-black/60 rounded-full blur-[1px]" />
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

              {/* Mango the Cat (Curled up by the table) */}
              <div
                onClick={() => {
                  soundManager.playCatMeow();
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.7 } });
                }}
                className="absolute bottom-[20%] left-[45%] flex flex-col items-center cursor-pointer group z-10"
                title="Mango the Cat (Click to pet)"
              >
                <div className="relative w-8 h-8 flex items-end justify-center">
                  <div className="absolute bottom-0 w-7 h-2 bg-black/60 rounded-full" />
                  <img
                    src="/assets/characters/mango/mango_spritesheet.png"
                    alt="Mango"
                    className="w-8 h-8 object-contain [image-rendering:pixelated] group-hover:scale-110 transition-transform"
                    style={{ objectPosition: '0 0' }}
                  />
                </div>
                <span className="font-pixel text-[6px] px-1 py-0.2 bg-[#091122] text-[#fde047] border border-[#f59e0b] mt-0.5">
                  Mango 🐾
                </span>
              </div>

              {/* Interactive Hotspots */}
              {/* 1. CANDLESTICK / ILLUMINATION */}
              <button
                onClick={handleLightCandle}
                className="absolute top-[34%] left-1/2 -translate-x-1/2 w-16 h-20 bg-amber-500/10 hover:bg-amber-500/25 border-2 border-dashed border-[#f59e0b] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-20"
                title="Study Candlestick (Click to brighten illumination!)"
              >
                <Sparkles className="w-4 h-4 text-[#fde047] animate-pulse" />
                <span className="text-[6px] font-pixel text-[#fde047] mt-0.5 bg-black/80 px-1 border border-amber-600">
                  CANDLE
                </span>
              </button>

              {/* 2. SCHOLASTIC TOMES HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('certs'); }}
                className="absolute bottom-[22%] left-[10%] w-24 h-24 bg-blue-500/10 hover:bg-blue-500/25 border-2 border-dashed border-[#38bdf8] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Ancient Tomes (Click to view certificates)"
              >
                <Award className="w-5 h-5 text-[#38bdf8]" />
                <span className="text-[6px] font-pixel text-[#bae6fd] mt-0.5 bg-black/80 px-1 border border-sky-700">
                  CREDENTIALS
                </span>
              </button>

              {/* 3. RESEARCH ARCHIVES HOTSPOT */}
              <button
                onClick={() => { soundManager.playClick(); setActiveTab('blogs'); }}
                className="absolute bottom-[22%] right-[10%] w-24 h-24 bg-purple-500/10 hover:bg-purple-500/25 border-2 border-dashed border-[#a855f7] rounded flex flex-col items-center justify-center cursor-pointer group transition-all z-10"
                title="Scholarly Manuscripts (Click to read articles)"
              >
                <BookOpen className="w-5 h-5 text-[#c084fc]" />
                <span className="text-[6px] font-pixel text-[#e9d5ff] mt-0.5 bg-black/80 px-1 border border-purple-700">
                  ARTICLES
                </span>
              </button>
            </div>

            {/* Bottom RPG Dialogue Box */}
            <div className="p-4 bg-[#0a1120] border-t-4 border-[#1c2e56] font-pixel">
              <div className="flex items-start gap-3 pb-3 mb-3 border-b border-[#182647]">
                <div className="w-9 h-9 rounded bg-[#162445] border border-[#38bdf8] flex items-center justify-center text-lg shrink-0">
                  📜
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-[#38bdf8] font-bold">Head Scholar Althea</span>
                    <span className="text-[7px] text-slate-400 font-sans">Academy Archivist</span>
                  </div>
                  <p className="text-xs text-slate-200 font-sans leading-relaxed">
                    "{librarianQuotes[dialogueIdx]}"
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={handleConsultLibrarian}
                    className="px-3.5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold border-2 border-[#38bdf8] shadow-[0_2px_0_#075985] text-[8px] flex items-center gap-1.5 cursor-pointer transition-all active:translate-y-0.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#bae6fd]" />
                    <span>CONSULT SCHOLAR (+15 XP)</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveTab('certs');
                    }}
                    className="px-3 py-2 bg-[#162445] hover:bg-[#203666] text-[#93c5fd] border border-[#1c2e56] text-[8px] flex items-center gap-1 transition-colors"
                  >
                    <span>View Certificates</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Archive Stats */}
              <div className="flex items-center justify-between text-[8px] text-[#93c5fd]">
                <span>ACADEMIC FOUNDATION: MCA (DATA SCIENCE) · BCA (COMPUTER APPLICATIONS)</span>
                <span className="text-emerald-400">STATUS: VERIFIED CANDIDATE</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: CERTIFICATES */}
      {activeTab === 'certs' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#38bdf8] mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS & HONORS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((c) => (
                <div
                  key={c.name}
                  className="bg-[#0f172c] p-5 border-2 border-[#1c2e56] shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[8px] font-pixel text-[#f59e0b]">
                        {c.issuer}
                      </span>
                      <span className="text-[8px] font-pixel text-[#94a3b8]">
                        {c.date}
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm mb-2">
                      {c.name}
                    </h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                      {c.skillsCovered.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1c2e56] flex items-center justify-between text-[8px] font-pixel text-[#38bdf8]">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      VERIFIED CREDENTIAL
                    </span>
                    <span>ID: {c.credentialId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 3: EDUCATION */}
      {activeTab === 'education' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#38bdf8] mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC FOUNDATION & DEGREES</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_RECORDS.map((edu) => (
                <div
                  key={edu.degree}
                  className="bg-[#0f172c] p-6 border-2 border-[#1c2e56] shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1c2e56]">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-[#38bdf8] font-mono">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-pixel text-[9px] text-[#f59e0b] block">
                        {edu.period}
                      </span>
                      <span className="text-[10px] text-slate-300 font-sans">
                        CGPA: {edu.cgpa}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 font-sans leading-relaxed mb-3">
                    {edu.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 font-pixel text-[8px]">
                    {edu.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#162445] text-[#93c5fd] border border-[#203666]"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 4: BLOGS & RESEARCH */}
      {activeTab === 'blogs' && (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#38bdf8] mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>TECHNICAL GRIMOIRE & RESEARCH ARTICLES</span>
            </h3>

            <div className="space-y-3">
              {blogs.map((b) => (
                <div
                  key={b.title}
                  className="bg-[#0f172c] p-5 border-2 border-[#1c2e56] shadow-md hover:border-[#38bdf8] transition-colors"
                >
                  <div className="flex justify-between items-center text-[8px] font-pixel text-[#94a3b8] mb-1">
                    <span>{b.date}</span>
                    <span className="text-[#38bdf8]">READ ARTICLE</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{b.title}</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {b.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
