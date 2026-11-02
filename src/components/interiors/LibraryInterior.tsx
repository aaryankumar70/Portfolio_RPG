import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Award, FileText, Calendar, CheckCircle } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';

interface LibraryInteriorProps {
  onBack: () => void;
}

export const LibraryInterior: React.FC<LibraryInteriorProps> = ({ onBack }) => {
  const [selectedTome, setSelectedTome] = useState<'certifications' | 'courses' | 'notes' | 'studyPlan'>('certifications');

  const tomes = [
    { id: 'certifications', title: 'CERTIFICATIONS', icon: Award, desc: 'Verified credentials.' },
    { id: 'courses', title: 'COURSES', icon: BookOpen, desc: 'Academic curricula.' },
    { id: 'notes', title: 'NOTES', icon: FileText, desc: 'Technical grimoire.' },
    { id: 'studyPlan', title: 'ROADMAP', icon: Calendar, desc: 'AI research plan.' }
  ] as const;

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0b0e17] text-slate-100 overflow-hidden select-text">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#111728] border-b-2 border-[#202d4f] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#60a5fa]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE LIBRARY</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#60a5fa] tracking-wider">ANCIENT LIBRARY</h1>
          <p className="text-[8px] text-[#93c5fd]">KNOWLEDGE & CERTIFICATIONS</p>
        </div>

        <div className="text-[9px] text-[#94a3b8]">ESC: BACK</div>
      </header>

      {/* 2. MAIN LIBRARY ENVIRONMENT */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl pixel-panel bg-[#121829] p-6 sm:p-8 mb-6 border-2 border-[#263761] relative">
          {/* 4 Tome Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-pixel">
            {tomes.map((t) => {
              const Icon = t.icon;
              const isSelected = selectedTome === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => { soundManager.playClick(); setSelectedTome(t.id); }}
                  className={`p-3 text-center cursor-pointer transition-all border ${
                    isSelected
                      ? 'pixel-btn-gold text-white font-bold'
                      : 'pixel-btn text-[#94a3b8]'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1 text-[#fde047]" />
                  <span className="text-[8px] block">{t.title}</span>
                  <span className="text-[7px] text-[#94a3b8] font-sans mt-0.5 block">{t.desc}</span>
                </div>
              );
            })}
          </div>

          {/* Reader Content */}
          <div className="bg-[#0c101c] p-5 border border-[#1e2a4a] font-sans">
            {selectedTome === 'certifications' && (
              <div className="space-y-4">
                <h3 className="font-pixel text-[10px] text-[#60a5fa] pb-2 border-b border-[#1e2a4a] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#60a5fa]" />
                  VERIFIED INDUSTRY CREDENTIALS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { title: 'Deep Learning Specialization', org: 'DeepLearning.AI', date: '2024', tag: 'CNNs, Transformers, Optimization' },
                    { title: 'Machine Learning with Python', org: 'IBM', date: '2023', tag: 'Classification, Regression, Scikit-Learn' },
                    { title: 'Power BI Data Analyst Associate', org: 'Microsoft', date: '2024', tag: 'DAX, ETL, Semantic Modeling' },
                    { title: 'Python for Data Science & EDA', org: 'DataCamp', date: '2023', tag: 'Pandas, NumPy, Statistics' }
                  ].map((c) => (
                    <div key={c.title} className="p-3 bg-[#131b2e] border border-[#26365c]">
                      <div className="flex justify-between items-start">
                        <h4 className="font-pixel text-[8px] text-white">{c.title}</h4>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      </div>
                      <span className="text-xs text-[#38bdf8] font-mono block mt-1">{c.org} · {c.date}</span>
                      <p className="text-xs text-[#94a3b8] mt-1">{c.tag}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTome === 'courses' && (
              <div className="space-y-3">
                <h3 className="font-pixel text-[10px] text-[#60a5fa] pb-2 border-b border-[#1e2a4a] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#60a5fa]" />
                  COMPLETED CURRICULA & TOPICS
                </h3>
                {[
                  { name: 'Advanced Machine Learning & Pattern Recognition', score: 'Grade A+', desc: 'Support Vector Machines, Ensemble Methods, Expectation-Maximization, Loss Formulations.' },
                  { name: 'Relational Database Management Systems & SQL', score: 'Grade A', desc: 'B-Tree Indexing, Query Plan Optimization, ACID Transaction Semantics.' },
                  { name: 'NLP with Transformers & Attention Mechanisms', score: 'Distinction', desc: 'Self-Attention Math, Positional Encodings, Tokenizers, HuggingFace fine-tuning.' }
                ].map((course) => (
                  <div key={course.name} className="p-3 bg-[#131b2e] border border-[#26365c] flex justify-between items-center">
                    <div>
                      <h4 className="font-pixel text-[8px] text-white">{course.name}</h4>
                      <p className="text-xs text-[#94a3b8] mt-0.5">{course.desc}</p>
                    </div>
                    <span className="font-pixel text-[8px] text-[#fde047] bg-[#221c0b] px-2 py-1 border border-[#d4af37]/40 shrink-0 ml-3">
                      {course.score}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {selectedTome === 'notes' && (
              <div className="space-y-3">
                <h3 className="font-pixel text-[10px] text-[#60a5fa] pb-2 border-b border-[#1e2a4a] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#60a5fa]" />
                  TECHNICAL SYNTHESIS & GRIMOIRE
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Transformer Self-Attention Matrix Derivation',
                    'Vector Indexing: HNSW vs IVFFlat trade-offs',
                    'Efficient DAX Calculate Filter Modifiers in Power BI',
                    'Handling High Dimensionality in Logistic Regression',
                    'Zero-Knowledge Groth16 Verification on EVM',
                    'Asynchronous Concurrency in FastAPI with UVLoop'
                  ].map((n) => (
                    <div key={n} className="p-2.5 bg-[#131b2e] border border-[#26365c] text-[#cbd5e1] flex items-center gap-2">
                      <span className="text-[#60a5fa]">✦</span>
                      <span>{n}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTome === 'studyPlan' && (
              <div className="space-y-3">
                <h3 className="font-pixel text-[10px] text-[#60a5fa] pb-2 border-b border-[#1e2a4a] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#60a5fa]" />
                  ACTIVE 2026-2027 AI RESEARCH ROADMAP
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#131b2e] border border-[#26365c]">
                    <span className="font-pixel text-[8px] text-[#38bdf8] block mb-1">AUTONOMOUS MULTI-AGENT ORCHESTRATION</span>
                    <p className="text-[#cbd5e1]">Developing recursive planning loops, isolated execution environments, and tool-augmented agents.</p>
                  </div>
                  <div className="p-3 bg-[#131b2e] border border-[#26365c]">
                    <span className="font-pixel text-[8px] text-[#38bdf8] block mb-1">LOCAL INFERENCE OPTIMIZATION</span>
                    <p className="text-[#cbd5e1]">Low-bit quantization kernels (AWQ, GGUF) for running edge language models on consumer hardware.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
