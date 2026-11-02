import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { ProjectItem } from '../../types';
import { soundManager } from '../../audio/SoundManager';

interface ProjectBazaarInteriorProps {
  onBack: () => void;
}

export const ProjectBazaarInterior: React.FC<ProjectBazaarInteriorProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'All' | 'AI/ML' | 'Web' | 'Data' | 'Hackathon'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#110912] text-slate-100 overflow-hidden select-text">
      {/* 1. TOP HEADER */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#1e0f1f] border-b-2 border-[#451e47] shadow-md font-pixel">
        <button
          onClick={() => { soundManager.playClick(); onBack(); }}
          className="pixel-btn px-3 py-1.5 flex items-center gap-2 text-[9px] text-[#f472b6]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>LEAVE BAZAAR</span>
        </button>

        <div className="text-center">
          <h1 className="text-sm font-bold text-[#f472b6] tracking-wider">PROJECT BAZAAR</h1>
          <p className="text-[8px] text-[#c084fc]">INTERACTIVE MARKETPLACE OF WORKS</p>
        </div>

        <div className="text-[9px] text-[#94a3b8]">ESC: BACK</div>
      </header>

      {/* 2. MAIN BAZAAR STALLS CONTAINER */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          {/* Authentic Pixel Market Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6 font-pixel">
            {(['All', 'AI/ML', 'Web', 'Data', 'Hackathon'] as const).map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { soundManager.playClick(); setFilter(cat); }}
                  className={`px-3.5 py-2 text-[8px] transition-all ${
                    isActive ? 'pixel-btn-gold text-white font-bold' : 'pixel-btn text-[#94a3b8]'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Project Stalls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => { soundManager.playClick(); setSelectedProject(p); }}
                className="pixel-panel bg-[#1a0f1d] p-4 border-2 border-[#4a1c4e] hover:border-[#f472b6] cursor-pointer flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Striped Canopy Header over stall - Vibrant Magenta & Electric Cyan */}
                  <div className="h-2 w-full flex mb-3">
                    <div className="w-1/4 bg-[#c026d3]" />
                    <div className="w-1/4 bg-[#22d3ee]" />
                    <div className="w-1/4 bg-[#c026d3]" />
                    <div className="w-1/4 bg-[#22d3ee]" />
                  </div>

                  <div className="flex items-center justify-between mb-1.5 font-pixel text-[8px]">
                    <span className="text-[#f472b6]">{p.category}</span>
                    <span className="text-[#38bdf8]">{p.status}</span>
                  </div>

                  <h3 className="font-pixel text-xs text-white group-hover:text-[#fde047] transition-colors mb-1.5">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[#cbd5e1] font-sans leading-relaxed line-clamp-3 mb-4">
                    {p.shortDesc}
                  </p>
                </div>

                <div>
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mb-3 font-pixel text-[7px]">
                    {p.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="bg-[#2d1230] text-[#f472b6] px-1.5 py-0.5 border border-[#581c5e]">
                        {t}
                      </span>
                    ))}
                    {p.technologies.length > 3 && (
                      <span className="bg-[#1e0a21] text-[#94a3b8] px-1.5 py-0.5">
                        +{p.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#3b1540] flex justify-between items-center font-pixel text-[7px] text-[#f472b6]">
                    <span>INSPECT BLUEPRINT</span>
                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blueprint Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="pixel-panel max-w-2xl w-full bg-[#170e1a] p-6 border-2 border-[#f472b6] max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-3 mb-4 border-b border-[#3d1a42] font-pixel">
              <div>
                <span className="text-[8px] text-[#f472b6]">{selectedProject.category} · {selectedProject.status}</span>
                <h2 className="text-lg text-white mt-1">{selectedProject.title}</h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="pixel-btn px-2 py-1 text-[9px] text-[#94a3b8]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans leading-relaxed mb-4">
              {selectedProject.fullDesc}
            </p>

            {/* Problem & Solution */}
            <div className="space-y-3 font-sans mb-4">
              <div className="p-3 bg-[#260e15] border border-[#dc2626]/40 text-xs">
                <span className="font-pixel text-[8px] text-[#f87171] block mb-1">THE PROBLEM</span>
                <p className="text-[#e2e8f0]">{selectedProject.problem}</p>
              </div>

              <div className="p-3 bg-[#0c2417] border border-[#16a34a]/40 text-xs">
                <span className="font-pixel text-[8px] text-[#4ade80] block mb-1">THE SOLUTION</span>
                <p className="text-[#e2e8f0]">{selectedProject.solution}</p>
              </div>
            </div>

            {/* Tech stack */}
            <div className="mb-4">
              <span className="font-pixel text-[8px] text-[#94a3b8] block mb-1.5">TECHNOLOGIES USED</span>
              <div className="flex flex-wrap gap-1.5 font-pixel text-[7px]">
                {selectedProject.technologies.map((t) => (
                  <span key={t} className="bg-[#2b102e] text-[#f472b6] px-2 py-1 border border-[#581c5e]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3 border-t border-[#3d1a42] font-pixel text-[8px]">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn flex-1 py-2 text-center flex items-center justify-center gap-2"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn-gold flex-1 py-2 text-center flex items-center justify-center gap-2 text-white"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMONSTRATION</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
