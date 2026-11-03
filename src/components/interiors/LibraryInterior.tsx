import React, { useState } from 'react';
import { BookOpen, Award, GraduationCap, FileText, ExternalLink, X, CheckCircle, Sparkles } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'certs' | 'education' | 'blogs'>('certs');

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

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0a0f1d] text-slate-100 overflow-hidden select-text font-sans">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-5 py-3.5 bg-[#101830] border-b-2 border-[#1e2f5c] shadow-lg font-pixel">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-[#18264c] border border-[#38bdf8] flex items-center justify-center text-[#38bdf8]">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-xs sm:text-sm font-bold text-[#38bdf8] tracking-wider uppercase">
            LIBRARY
          </h1>
          <span className="text-[8px] text-[#93c5fd] hidden sm:inline">
            · Certificates & Academic Grimoire
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('certs'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'certs'
                ? 'bg-[#0284c7] text-white font-bold border-[#38bdf8]'
                : 'bg-[#18264c] text-[#94a3b8] border-[#1e2f5c] hover:text-white'
            }`}
          >
            CERTIFICATES
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('education'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'education'
                ? 'bg-[#0284c7] text-white font-bold border-[#38bdf8]'
                : 'bg-[#18264c] text-[#94a3b8] border-[#1e2f5c] hover:text-white'
            }`}
          >
            EDUCATION
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('blogs'); }}
            className={`px-2.5 py-1 text-[8px] border transition-colors ${
              activeTab === 'blogs'
                ? 'bg-[#0284c7] text-white font-bold border-[#38bdf8]'
                : 'bg-[#18264c] text-[#94a3b8] border-[#1e2f5c] hover:text-white'
            }`}
          >
            TECH ARTICLES
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="w-7 h-7 flex items-center justify-center bg-[#18264c] hover:bg-[#25396f] text-[#38bdf8] border border-[#38bdf8]/50 transition-colors"
          title="Exit to Town (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {/* CERTIFICATES TAB */}
        {activeTab === 'certs' && (
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#38bdf8] mb-2 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS & HONORS</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((c) => (
                <div
                  key={c.name}
                  className="bg-[#101830] p-5 border-2 border-[#1e2f5c] shadow-lg flex flex-col justify-between"
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

                  <div className="pt-3 border-t border-[#1e2f5c] flex items-center justify-between text-[8px] font-pixel text-[#38bdf8]">
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
        )}

        {/* EDUCATION TAB */}
        {activeTab === 'education' && (
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#38bdf8] mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC FOUNDATION & DEGREES</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION_RECORDS.map((edu) => (
                <div
                  key={edu.degree}
                  className="bg-[#101830] p-6 border-2 border-[#1e2f5c] shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1e2f5c]">
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
                        className="px-2 py-0.5 bg-[#18264c] text-[#93c5fd] border border-[#25396f]"
                      >
                        ✦ {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOGS TAB */}
        {activeTab === 'blogs' && (
          <div className="w-full max-w-4xl space-y-4">
            <h3 className="font-pixel text-xs text-[#38bdf8] mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>TECHNICAL GRIMOIRE & BLOGS</span>
            </h3>

            <div className="space-y-3">
              {blogs.map((b) => (
                <div
                  key={b.title}
                  className="bg-[#101830] p-5 border-2 border-[#1e2f5c] shadow-md hover:border-[#38bdf8] transition-colors"
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
        )}
      </div>
    </div>
  );
};
