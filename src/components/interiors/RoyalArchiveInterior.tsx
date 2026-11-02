import React from 'react';
import { ArrowLeft, Download, Scroll, Mail, Globe, MapPin, Printer } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface RoyalArchiveInteriorProps {
  onBack: () => void;
}

export const RoyalArchiveInterior: React.FC<RoyalArchiveInteriorProps> = ({ onBack }) => {
  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#110d10] text-slate-100 overflow-hidden select-text">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#1e131b] border-b-2 border-[#45273d] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#fb7185]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE ARCHIVE</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#fb7185] tracking-wider">ROYAL ARCHIVE</h1>
          <p className="text-[8px] text-[#fda4af]">OFFICIAL DEVELOPER RESUME</p>
        </div>

        <button
          onClick={handlePrint}
          className="pixel-btn-gold px-3.5 py-1.5 text-[8px] flex items-center gap-2 text-white"
        >
          <Download className="w-3.5 h-3.5" />
          <span>PRINT / PDF</span>
        </button>
      </header>

      {/* 2. MAIN PARCHMENT RESUME CONTAINER */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-3xl pixel-panel-parchment p-8 sm:p-12 shadow-2xl relative font-sans text-[#2c1d11]">
          {/* Authentic Pixel Wax Seal Stamp */}
          <div className="absolute top-6 right-6 w-14 h-14 bg-[#881337] border-2 border-[#d4af37] flex items-center justify-center shadow-md rotate-6">
            <span className="font-pixel text-[6px] text-[#fef08a] text-center leading-tight">
              ROYAL<br />SEAL
            </span>
          </div>

          {/* Resume Header */}
          <div className="border-b-2 border-[#8a6438]/40 pb-4 mb-6">
            <h2 className="text-3xl font-pixel font-bold text-[#3a2012]">
              TheDevNomad
            </h2>
            <p className="text-xs font-semibold text-[#8a4a1d] mt-1 font-mono tracking-wider uppercase">
              Master of Computer Applications (Data Science) · AI & Full-Stack Developer
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-[#52341b] mt-3 font-medium">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> thedevnomad@portfolio.rpg</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> github.com/thedevnomad</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> India</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h3 className="font-pixel text-xs text-[#4a2612] pb-1 border-b border-[#8a6438]/30 mb-2">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-xs sm:text-sm text-[#3b2414] leading-relaxed">
              High-achieving MCA Data Science student with foundational rigor in Machine Learning, Statistical Analysis, NLP, and modern full-stack web architectures. Proven ability to architect end-to-end multimodal AI pipelines (PyTorch, CLIP, HuggingFace) and deploy production web applications. Winner of competitive hackathons with a focus on privacy-preserving algorithms and user-centric design.
            </p>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="font-pixel text-xs text-[#4a2612] pb-1 border-b border-[#8a6438]/30 mb-2">
              EDUCATION
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[#3a2012]">Master of Computer Applications — Data Science Specialization</h4>
                  <p className="text-[#593920]">Advanced Machine Learning, Deep Learning, Big Data Frameworks, NLP, Time Series</p>
                </div>
                <span className="font-mono text-xs font-bold text-[#8a4a1d] shrink-0">2024 – Present</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[#3a2012]">Bachelor of Computer Applications (BCA)</h4>
                  <p className="text-[#593920]">First Class Distinction | Data Structures & Algorithms, RDBMS, Software Engineering, C/C++</p>
                </div>
                <span className="font-mono text-xs font-bold text-[#8a4a1d] shrink-0">2021 – 2024</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h3 className="font-pixel text-xs text-[#4a2612] pb-1 border-b border-[#8a6438]/30 mb-2">
              TECHNICAL SKILLS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3b2414]">
              <p><strong>Languages:</strong> Python, SQL, C++, TypeScript, JavaScript</p>
              <p><strong>AI & ML:</strong> PyTorch, Scikit-Learn, HuggingFace, OpenCV, CLIP, Pandas, NumPy</p>
              <p><strong>Data & BI:</strong> Power BI (DAX), PostgreSQL, MongoDB, FAISS, Streamlit</p>
              <p><strong>Web & Tools:</strong> FastAPI, React, Node.js, Git, Docker, RESTful APIs, TailwindCSS</p>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-6">
            <h3 className="font-pixel text-xs text-[#4a2612] pb-1 border-b border-[#8a6438]/30 mb-2">
              KEY PROJECTS
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <div className="flex justify-between font-bold text-[#3a2012]">
                  <span>MindPulse AI — Multimodal Wellbeing Assistant</span>
                  <span className="font-mono text-xs text-[#8a4a1d]">Python, FastAPI, PyTorch, React</span>
                </div>
                <p className="text-xs text-[#593920] mt-0.5">
                  Engineered an AI emotional assessment platform using acoustic speech biomarkers and transformer text sentiment models with on-device zero-knowledge data privacy.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#3a2012]">
                  <span>Lost & Found AI — Cross-Modal Visual Retrieval Engine</span>
                  <span className="font-mono text-xs text-[#8a4a1d]">Python, CLIP, MongoDB, FAISS</span>
                </div>
                <p className="text-xs text-[#593920] mt-0.5">
                  Developed dual-encoder image-to-text semantic discovery system matching lost items via natural language queries with 94.6% top-5 retrieval precision.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#3a2012]">
                  <span>CONNEXA — Skill-Graph Matchmaking Network</span>
                  <span className="font-mono text-xs text-[#8a4a1d]">React, TypeScript, Node.js, WebSockets</span>
                </div>
                <p className="text-xs text-[#593920] mt-0.5">
                  Built real-time peer discovery and hackathon team builder platform incorporating bipartite graph matchmaking and live WebRTC collaboration channels.
                </p>
              </div>
            </div>
          </div>

          {/* Honors */}
          <div>
            <h3 className="font-pixel text-xs text-[#4a2612] pb-1 border-b border-[#8a6438]/30 mb-2">
              HONORS & CERTIFICATIONS
            </h3>
            <ul className="list-disc list-inside text-xs text-[#593920] space-y-1">
              <li>1st Place Winner — HackOdyssey 2024 for VeriShield ZK Identity Bridge.</li>
              <li>DeepLearning.AI Deep Learning Specialization (Coursera Verified).</li>
              <li>Microsoft Certified: Power BI Data Analyst Associate.</li>
              <li>Solved 300+ Algorithmic Data Structures problems across LeetCode & HackerRank.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
