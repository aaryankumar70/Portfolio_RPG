import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, MessageSquare, Compass, Award, Code2 } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';
import { ARYAN_STATS, MAJOR_PROJECTS, WEAPON_SKILLS } from '../../data/portfolioData';

interface AICompanionModalProps {
  onClose: () => void;
  onNavigateBuilding: (buildingId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  quickActions?: { label: string; action: () => void }[];
}

export const AICompanionModal: React.FC<AICompanionModalProps> = ({
  onClose,
  onNavigateBuilding
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'companion',
      text: "Beep-boop! Hello traveler! I'm Cipher, Aryan's AI Companion. I know all about his journey, skills, projects, and the secrets of this town. What would you like to discover?",
      quickActions: [
        {
          label: '⚔ Skills & Weapons',
          action: () => handleSendPrompt('What are Aryan\'s top technical skills?')
        },
        {
          label: '📜 Major Projects',
          action: () => handleSendPrompt('Tell me about Aryan\'s major projects.')
        },
        {
          label: '🎓 Education & Degree',
          action: () => handleSendPrompt('What is Aryan\'s educational background?')
        },
        {
          label: '☕ Why Coffee Shop?',
          action: () => handleSendPrompt('Tell me about the Coffee Shop.')
        }
      ]
    }
  ]);

  const [input, setInput] = useState<string>('');

  const generateAnswer = (query: string): { reply: string; buildingToVisit?: string } => {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('weapon') || q.includes('tech') || q.includes('stack')) {
      return {
        reply: `Aryan's primary arsenal consists of:
• Python Greatsword (92%): High-performance scripting, data wrangling, and backend APIs.
• SQL War Hammer (88%): Complex window functions, relational database architecture, and query optimization.
• Machine Learning Bow (86%): Neural network fine-tuning, transformers, and multimodal embeddings.
• Power BI Shield (80%): Executive KPI dashboards and data storytelling.
• Statistics Staff (85%): Probability modeling, hypothesis testing, and exploratory data analysis.

Would you like me to take you to the Blacksmith to inspect his weapons?`,
        buildingToVisit: 'blacksmith'
      };
    }

    if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('portfolio') || q.includes('mindpulse') || q.includes('lost')) {
      return {
        reply: `Aryan has engineered several standout applications:
1. MindPulse AI — An AI mental health & wellbeing companion utilizing multimodal sentiment and acoustic analysis.
2. Lost & Found AI — Intelligent visual-text retrieval engine built on OpenAI CLIP and vector databases.
3. Sales Analytics Engine — Predictive forecasting and real-time revenue analytics dashboard.
4. CONNEXA — Peer networking and automated matchmaking system based on skill embeddings.

You can battle these creations in the Boss Arena or inspect Python code in the Python Cave!`,
        buildingToVisit: 'boss_arena'
      };
    }

    if (q.includes('education') || q.includes('degree') || q.includes('mca') || q.includes('college') || q.includes('university') || q.includes('bca')) {
      return {
        reply: `Aryan is pursuing his Master of Computer Applications (MCA) in Data Science & Machine Learning, building upon his solid BCA foundation. He focuses heavily on deep learning systems, data engineering pipelines, and scalable software architecture. You can review his full credentials at the Library!`,
        buildingToVisit: 'library'
      };
    }

    if (q.includes('coffee') || q.includes('break') || q.includes('barista')) {
      return {
        reply: `Ah, the Coffee Shop! Aryan loves crafting code over a hot espresso. He currently has ${ARYAN_STATS.coffeeCups} coffee cups enjoyed, which grants him the 'Coffee Lover' buff (+5 Focus)! Visit the Coffee Shop to buy him a brew from Barista Marco!`,
        buildingToVisit: 'coffee_shop'
      };
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('resume') || q.includes('message')) {
      return {
        reply: `Aryan is actively open to impactful Data Science, Machine Learning, and Software Engineering roles! You can send him a direct message or download his resume at the Contact Post Office, or connect via LinkedIn and GitHub.`,
        buildingToVisit: 'post_office'
      };
    }

    if (q.includes('python') || q.includes('cave')) {
      return {
        reply: `The Python Cave is nestled in the northeast cliffside. The Cave Sage Aldous guards the secrets of Pythonic design patterns, automation scripts, and machine learning pipelines. Step inside to explore!`,
        buildingToVisit: 'python_cave'
      };
    }

    if (q.includes('sql') || q.includes('database') || q.includes('mine')) {
      return {
        reply: `The SQL Mines feature timber mine shafts and rail carts loaded with raw data crystals. Foreman Ironclad can guide you through query optimization and database schema engineering!`,
        buildingToVisit: 'sql_mines'
      };
    }

    return {
      reply: `Aryan is a dedicated Data Explorer and AI engineer who turns messy datasets into intelligent systems. Explore the town buildings—like the Guild Hall for quests, Blacksmith for skills, Boss Arena for major projects, or Your Home for personal stats! What would you like to see next?`
    };
  };

  const handleSendPrompt = (text: string) => {
    soundManager.playClick();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      soundManager.playChime();
      const answer = generateAnswer(text);
      const companionMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'companion',
        text: answer.reply,
        quickActions: answer.buildingToVisit
          ? [
              {
                label: `🚀 Fast Travel to ${answer.buildingToVisit.replace('_', ' ').toUpperCase()}`,
                action: () => {
                  onClose();
                  onNavigateBuilding(answer.buildingToVisit!);
                }
              }
            ]
          : undefined
      };
      setMessages((prev) => [...prev, companionMsg]);
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSendPrompt(input.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm select-none">
      <div className="w-full max-w-2xl bg-[#0e1622] border-4 border-[#2b3d54] shadow-[0_16px_50px_rgba(0,0,0,0.85),inset_0_0_0_2px_#38bdf8] flex flex-col max-h-[85vh] font-pixel relative">
        {/* Decorative corner brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#38bdf8]" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#38bdf8]" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#38bdf8]" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#38bdf8]" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#142030] border-b-2 border-[#1e2e42]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0284c7] border-2 border-[#38bdf8] flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.5)]">
              <Bot className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm text-[#38bdf8] tracking-wider flex items-center gap-2">
                CIPHER · AI COMPANION
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </h3>
              <p className="text-[8px] text-[#94a3b8] font-sans">
                Real-time interactive guide to Aryan's journey and portfolio
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-7 h-7 flex items-center justify-center bg-[#1e2e42] hover:bg-[#334760] text-slate-300 hover:text-white border border-[#38bdf8]/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-xs">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#0284c7] border border-[#38bdf8] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 leading-relaxed ${
                    isUser
                      ? 'bg-[#1e3a5f] text-white border border-[#0284c7] rounded-sm shadow-md'
                      : 'bg-[#131d2b] text-[#cbd5e1] border border-[#23354a] rounded-sm shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs">{m.text}</p>

                  {/* Quick Action buttons */}
                  {m.quickActions && m.quickActions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#1e2e42] flex flex-wrap gap-2">
                      {m.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          onClick={qa.action}
                          className="px-2.5 py-1 bg-[#1a293d] hover:bg-[#253a54] text-[#38bdf8] border border-[#0284c7]/50 text-[10px] font-pixel transition-colors flex items-center gap-1 active:translate-y-0.5"
                        >
                          <span>{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#f59e0b] border border-[#fef08a] flex items-center justify-center shrink-0 mt-1 text-[9px] font-pixel font-bold text-[#0f1722]">
                    YOU
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-3 sm:p-4 bg-[#142030] border-t-2 border-[#1e2e42] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Cipher anything about Aryan, skills, or projects..."
            className="flex-1 bg-[#0a111a] border border-[#2b3d54] focus:border-[#38bdf8] px-3 py-2 text-xs text-white placeholder-slate-500 outline-none font-sans"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white border border-[#38bdf8] text-[9px] font-pixel flex items-center gap-1.5 transition-colors cursor-pointer active:translate-y-0.5"
          >
            <span>SEND</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
