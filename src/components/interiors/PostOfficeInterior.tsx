import React, { useState } from 'react';
import { Mail, Send, Download, ExternalLink, X, CheckCircle2, User, Phone, MapPin, Sparkles, Printer } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'message' | 'resume'>('resume');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

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

  const handlePrintResume = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#071311] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#0f2420] border-b-2 border-[#19473f] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#163832] border border-[#14b8a6] flex items-center justify-center text-[#14b8a6]">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#2dd4bf] tracking-wider uppercase">
            CONTACT POST OFFICE & RESUME
          </h1>
          <span className="text-[8px] text-[#99f6e4] hidden sm:inline">
            · Courier Station & Official Archive
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('resume'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'resume'
                ? 'bg-[#0d9488] text-white font-bold border-[#2dd4bf]'
                : 'bg-[#163832] text-[#99f6e4] border-[#19473f] hover:text-white'
            }`}
          >
            OFFICIAL RESUME
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('message'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'message'
                ? 'bg-[#0d9488] text-white font-bold border-[#2dd4bf]'
                : 'bg-[#163832] text-[#99f6e4] border-[#19473f] hover:text-white'
            }`}
          >
            SEND MESSAGE
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#163832] hover:bg-[#20524a] text-[#2dd4bf] border border-[#14b8a6]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN POST OFFICE CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {/* OFFICIAL RESUME PARCHMENT VIEW */}
        {activeTab === 'resume' && (
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* Action Bar */}
            <div className="w-full mb-3 flex items-center justify-between font-pixel text-[9px]">
              <span className="text-[#2dd4bf] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                OFFICIAL RESUME PARCHMENT · VERIFIED CREDENTIALS
              </span>
              <button
                onClick={handlePrintResume}
                className="px-3.5 py-1.5 bg-[#0d9488] hover:bg-[#0f766e] text-white border border-[#2dd4bf] flex items-center gap-1.5 cursor-pointer shadow-md active:translate-y-0.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>DOWNLOAD / PRINT PDF</span>
              </button>
            </div>

            {/* Resume Parchment Paper */}
            <div className="w-full bg-[#fbf5e8] text-[#241a0e] p-8 sm:p-12 shadow-2xl border-4 border-[#b49767] relative font-serif">
              {/* Decorative Wax Seal Stamp */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-[#991b1b] border-2 border-[#fef08a] rounded-full flex items-center justify-center shadow-lg rotate-12">
                <span className="font-pixel text-[7px] text-[#fef08a] text-center leading-tight">
                  ARYAN<br />SEAL
                </span>
              </div>

              {/* Resume Header */}
              <div className="border-b-2 border-[#b49767] pb-4 mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-[#1e1308] font-sans">
                  Aryan
                </h2>
                <p className="text-sm font-semibold text-[#854d0e] mt-1 font-mono tracking-wider uppercase">
                  Data Scientist · Machine Learning Engineer · MCA Student
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-[#573d1f] mt-2 font-sans">
                  <span>📍 New Delhi, India</span>
                  <span>✉️ aryan.workmail@gmail.com</span>
                  <span>🌐 github.com/thedevnomad</span>
                  <span>💼 linkedin.com/in/thedevnomad</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-xs font-bold font-sans uppercase tracking-widest text-[#854d0e] mb-2 border-b border-[#e2d5bc] pb-1">
                  Professional Profile
                </h3>
                <p className="text-xs leading-relaxed text-[#382613] font-sans">
                  Detail-oriented Data Explorer and AI Developer pursuing Master of Computer Applications (MCA) in Data Science & Machine Learning. Experienced in training multimodal neural networks (PyTorch, CLIP), orchestrating high-throughput async APIs (FastAPI), designing complex relational data schemas (SQL), and crafting polished interactive user experiences.
                </p>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h3 className="text-xs font-bold font-sans uppercase tracking-widest text-[#854d0e] mb-3 border-b border-[#e2d5bc] pb-1">
                  Education & Academic Distinctions
                </h3>
                <div className="space-y-3 font-sans">
                  {EDUCATION_RECORDS.map((edu) => (
                    <div key={edu.degree}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-xs text-[#1e1308]">{edu.degree}</span>
                        <span className="text-[11px] text-[#854d0e]">{edu.period}</span>
                      </div>
                      <div className="text-xs text-[#573d1f]">{edu.institution} · CGPA: {edu.cgpa}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Technical Projects */}
              <div className="mb-6">
                <h3 className="text-xs font-bold font-sans uppercase tracking-widest text-[#854d0e] mb-3 border-b border-[#e2d5bc] pb-1">
                  Featured Engineering Projects
                </h3>
                <div className="space-y-3 font-sans">
                  {MAJOR_PROJECTS.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold text-xs text-[#1e1308]">{proj.title}</span>
                        <span className="text-[10px] font-mono text-[#854d0e]">{(proj.tags || proj.technologies || []).slice(0, 3).join(', ')}</span>
                      </div>
                      <p className="text-[11px] text-[#382613] leading-relaxed mt-0.5">
                        {proj.description || proj.shortDesc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Skills Summary */}
              <div>
                <h3 className="text-xs font-bold font-sans uppercase tracking-widest text-[#854d0e] mb-2 border-b border-[#e2d5bc] pb-1">
                  Core Technical Arsenal
                </h3>
                <div className="text-xs text-[#382613] font-sans space-y-1">
                  <div><strong>Languages & Frameworks:</strong> Python 3.12, SQL, PyTorch, FastAPI, Pandas, NumPy, Scikit-learn, React, TypeScript.</div>
                  <div><strong>Data & Infrastructure:</strong> PostgreSQL, MySQL, Redis, Docker, Git, Power BI, RESTful APIs, Vector Databases.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEND MESSAGE TAB */}
        {activeTab === 'message' && (
          <div className="w-full max-w-xl bg-[#0c1f1c] p-6 sm:p-8 border-4 border-[#19473f] shadow-2xl">
            <h3 className="font-pixel text-xs text-[#2dd4bf] mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>DISPATCH COURIER PIGEON TO ARYAN</span>
            </h3>
            <p className="text-xs text-slate-300 mb-6 font-sans">
              Have an exciting Data Science role, collaboration, or question? Send a message directly into Aryan's inbox!
            </p>

            {isSent ? (
              <div className="p-6 bg-[#081815] border-2 border-emerald-500 text-center animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-white mb-1">Message Dispatched!</h4>
                <p className="text-xs text-slate-300 font-sans mb-4">
                  The courier pigeon has taken flight! Aryan has received your transmission and will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-4 py-2 bg-[#0d9488] text-white text-[9px] font-pixel border border-[#2dd4bf]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova (Hiring Manager)"
                    className="w-full px-3 py-2 bg-[#06110f] border border-[#19473f] text-white outline-none focus:border-[#2dd4bf]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@company.com"
                    className="w-full px-3 py-2 bg-[#06110f] border border-[#19473f] text-white outline-none focus:border-[#2dd4bf]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi Aryan, we loved your interactive RPG portfolio and want to discuss a Data Science / ML opportunity..."
                    className="w-full px-3 py-2 bg-[#06110f] border border-[#19473f] text-white outline-none focus:border-[#2dd4bf]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white font-pixel text-[9px] border border-[#2dd4bf] shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:translate-y-0.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#fde047]" />
                  <span>DISPATCH MESSAGE</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
