// src/components/ui/PortfolioView.tsx
// Clean, accessible, high-performance non-game portfolio view for recruiters & visitors

import React, { useState } from 'react';
import {
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  FileText,
  Gamepad2,
  Award,
  BookOpen,
  Cpu,
  Sparkles,
  Terminal,
  Download
} from 'lucide-react';
import {
  MAJOR_PROJECTS,
  SKILL_CATEGORIES,
  EDUCATION_RECORDS,
  CERTIFICATIONS,
  ARYAN_STATS
} from '../../data/portfolioData';

interface PortfolioViewProps {
  onReturnToGame: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onReturnToGame }) => {
  const [filterTag, setFilterTag] = useState<string>('all');

  const allTags = ['all', 'Python', 'Machine Learning', 'NLP', 'Computer Vision', 'FastAPI', 'Full-Stack'];

  const filteredProjects = filterTag === 'all'
    ? MAJOR_PROJECTS
    : MAJOR_PROJECTS.filter((p) => {
        const tags = p.tags || p.technologies || [];
        return tags.some((t) => t.toLowerCase().includes(filterTag.toLowerCase()));
      });

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0c1427]/90 backdrop-blur-md border-b border-slate-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold font-mono text-sm shadow-[0_0_12px_rgba(245,158,11,0.4)]">
            A
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 tracking-wide">Aryan Gupta</h1>
            <p className="text-[11px] text-amber-400 font-mono">Machine Learning & Data Science Engineer</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs transition"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Resume PDF</span>
          </a>

          <button
            onClick={onReturnToGame}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded text-xs shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all transform hover:scale-105"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Return to RPG Adventure</span>
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <header className="space-y-6 border-b border-slate-800/80 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs text-amber-300 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Level {ARYAN_STATS.level} Data Explorer · MCA Data Science</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Building intelligent multimodal models & scalable data architectures.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Welcome to the direct resume and portfolio index. I design end-to-end machine learning systems,
            deep neural networks, and robust full-stack software applications. Explore verified projects,
            academic milestones, and production deployments below.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="mailto:aryangupta@example.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded text-sm transition"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Aryan</span>
            </a>
            <a
              href="https://github.com/aryan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-sm transition"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/aryan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-sm transition"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-sm transition"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Download Resume</span>
            </a>
          </div>
        </header>

        {/* Featured Projects Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Terminal className="w-6 h-6 text-amber-400" />
                <span>Featured Engineering Projects</span>
              </h3>
              <p className="text-sm text-slate-400">Deployed architectures, models, and full-stack software.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition capitalize ${
                    filterTag === tag
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p) => {
              const tags = p.tags || p.technologies || [];
              const desc = p.description || p.shortDesc || p.fullDesc;
              const link = p.demoUrl || p.liveUrl;

              return (
                <div
                  key={p.id}
                  className="bg-[#0f172a] border border-slate-800 hover:border-amber-500/50 rounded-xl p-6 flex flex-col justify-between transition group shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-amber-400 px-2 py-0.5 bg-amber-500/10 rounded">
                        {p.category.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400">
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-amber-400 transition"
                            title="View Source Code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-amber-400 transition"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                      {p.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {desc}
                    </p>

                    {p.solution && (
                      <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded font-mono text-[11px] text-teal-300">
                        ✦ Solution: {p.solution}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-slate-800 rounded text-[10px] text-slate-300 font-mono"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Technical Skills Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-teal-400" />
              <span>Technical Skills & Disciplines</span>
            </h3>
            <p className="text-sm text-slate-400">Frameworks, languages, and distributed systems tooling.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 space-y-4"
              >
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <span className="text-lg">{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                <div className="space-y-2.5">
                  {cat.skills.map((s) => (
                    <div key={s.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{s.name}</span>
                        <span className="text-amber-400 font-mono text-[11px]">{s.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-teal-400 rounded-full"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              <span>Education</span>
            </h3>
            <div className="space-y-4">
              {EDUCATION_RECORDS.map((edu, idx) => (
                <div key={idx} className="p-5 bg-[#0f172a] border border-slate-800 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                    <span className="text-xs font-mono text-amber-400">{edu.period}</span>
                  </div>
                  <p className="text-xs text-sky-300">{edu.institution} · {edu.specialization}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{edu.description}</p>
                  {edu.cgpa && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-800 text-[10px] font-mono text-teal-300 rounded">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Verified Certifications</span>
            </h3>
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-5 bg-[#0f172a] border border-slate-800 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                    <span className="text-xs font-mono text-amber-400">{cert.date}</span>
                  </div>
                  <p className="text-xs text-amber-300">{cert.issuer}</p>
                  <p className="text-xs text-slate-400 font-mono text-[11px]">{cert.credentialId}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA to return to game */}
        <footer className="pt-8 pb-12 border-t border-slate-800 text-center space-y-4">
          <p className="text-xs text-slate-400 font-mono">
            Aryan’s Adventure · Custom Canvas 2D Engine · React 18 + TypeScript + Vite
          </p>
          <div>
            <button
              onClick={onReturnToGame}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] transition transform hover:scale-105"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Explore Interactive 16-Bit Town Map</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};
