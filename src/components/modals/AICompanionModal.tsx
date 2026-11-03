import React, { useState } from 'react';
import { Send, X, Sparkles, Compass, Award, Code2, Wand2 } from 'lucide-react';
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
      text: "Greetings, noble traveler! I am Grand Wizard Eldrin, Guardian of Aryan's Chronicles and your mystical guide through this realm. Through the arcane weaves of Data Science and Machine Learning, I have chronicled his heroic journey, enchanted weapons, and academic trials. What wisdom from the archives do you seek?",
      quickActions: [
        {
          label: '⚔ Arcane Skills & Weapons',
          action: () => handleSendPrompt('What are Aryan\'s top technical skills and spells?')
        },
        {
          label: '📜 Legendary Quest Projects',
          action: () => handleSendPrompt('Tell me about Aryan\'s legendary projects.')
        },
        {
          label: '🎓 Academic Sorcery & Degree',
          action: () => handleSendPrompt('What is Aryan\'s academic background?')
        },
        {
          label: '☕ The Coffee Tavern Buff',
          action: () => handleSendPrompt('Tell me about the Coffee Shop and buffs.')
        }
      ]
    }
  ]);

  const [input, setInput] = useState<string>('');

  const generateAnswer = (query: string): { reply: string; buildingToVisit?: string } => {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('weapon') || q.includes('tech') || q.includes('stack') || q.includes('spell')) {
      return {
        reply: `By the stars, Aryan wields a formidable arcane arsenal:
• Python Greatsword (92%): Forged for rapid script enchantment, data manipulation, and high-concurrency microservices.
• SQL War Hammer (88%): Capable of shattering relational crypts with window functions and sub-second query indexing.
• Machine Learning Grimoire (86%): Conjuring multimodal embeddings, neural architectures, and transformer pipelines.
• Power BI Aegis (80%): Illuminating executive dashboards with crystal-clear visual storytelling.
• Statistical Staff (85%): Discerning mathematical truth through probability theory and exploratory hypotheses.

Shall I transport you to the Blacksmith so you may inspect his forged arsenal?`,
        buildingToVisit: 'blacksmith'
      };
    }

    if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('portfolio') || q.includes('mindpulse') || q.includes('lost')) {
      return {
        reply: `Aryan has channeled his arcane craft into several renowned artifacts:
1. MindPulse AI — A multimodal diagnostic talisman detecting emotional distress from acoustic voice biomarkers and sentiment embeddings.
2. Lost & Found AI — An all-seeing retrieval engine powered by OpenAI CLIP embeddings and vector search magic.
3. Sales Forecasting Engine — An oracle dashboard predicting revenue trajectories with high statistical precision.
4. CONNEXA — A guild networking tapestry matching collaborators through skill-based vector similarity.

You may challenge these creations in the Boss Arena or examine their inner scripts at the Python Cave!`,
        buildingToVisit: 'boss_arena'
      };
    }

    if (q.includes('education') || q.includes('degree') || q.includes('mca') || q.includes('college') || q.includes('university') || q.includes('bca') || q.includes('academic')) {
      return {
        reply: `Aryan was schooled in the high collegiate halls, currently mastering his Master of Computer Applications (MCA) in Data Science & Artificial Intelligence, building upon his Bachelor of Computer Applications (BCA) foundation. His studies center on deep learning architectures, scalable big-data engineering, and algorithmic rigor. All his certified diplomas and scrolls are enshrined in the Library!`,
        buildingToVisit: 'library'
      };
    }

    if (q.includes('coffee') || q.includes('break') || q.includes('barista') || q.includes('buff')) {
      return {
        reply: `Ah, the hearth of the Coffee Shop! Like many legendary sorcerers, Aryan channels intense cognitive focus through dark roasted brews. He has enjoyed ${ARYAN_STATS.coffeeCups} enchanted cups, granting him the 'Coffee Lover' buff (+5 Focus)! Visit Barista Marco at the tavern to sample a cup!`,
        buildingToVisit: 'coffee_shop'
      };
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('resume') || q.includes('message')) {
      return {
        reply: `Aryan is actively seeking impactful Data Science, Machine Learning, and Software Engineering quests! You may dispatch a raven, write a scroll at the Contact Post Office, or obtain his official parchment Resume.`,
        buildingToVisit: 'post_office'
      };
    }

    if (q.includes('python') || q.includes('cave')) {
      return {
        reply: `The Python Cave is nestled in the northeast cliffside. Cave Sage Aldous guards the glowing blue database crystals and automated pipelines. Venture forth to study the code scrolls!`,
        buildingToVisit: 'python_cave'
      };
    }

    if (q.includes('sql') || q.includes('database') || q.includes('mine')) {
      return {
        reply: `The SQL Mines plunge into the bedrock of relational data. Foreman Ironclad oversees the rail tracks and schema quarries. Step inside to witness high-throughput data pipelines!`,
        buildingToVisit: 'sql_mines'
      };
    }

    return {
      reply: `Aryan is a dedicated Data Explorer and Software Sorcerer who transforms unruly datasets into intelligent, beautiful realities. Seek out the Guild Hall for quests, the Blacksmith for armaments, or the Boss Arena for project battles. How may this humble Wizard assist your quest further?`
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
                label: `🔮 Fast Travel to ${answer.buildingToVisit.replace('_', ' ').toUpperCase()}`,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-2xl bg-[#0c0e18] border-4 border-[#7e22ce] shadow-[0_16px_60px_rgba(0,0,0,0.9),inset_0_0_0_2px_#c084fc] flex flex-col max-h-[85vh] font-pixel relative">
        {/* Decorative corner brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#f59e0b]" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#f59e0b]" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#f59e0b]" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#f59e0b]" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#1b102b] border-b-2 border-[#581c87]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3b0764] border-2 border-[#c084fc] flex items-center justify-center shadow-[0_0_14px_rgba(192,132,252,0.6)] overflow-hidden shrink-0">
              <img
                src="/assets/ui/portrait_data_sage.png"
                alt="Grand Wizard Eldrin"
                className="w-full h-full object-cover [image-rendering:pixelated]"
              />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm text-[#e9d5ff] tracking-wider flex items-center gap-2">
                <span>GRAND WIZARD ELDRIN · WIZARD GUIDE</span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              </h3>
              <p className="text-[8px] text-[#c084fc] font-sans">
                Master of Arcane Data Arts & Chronicler of Aryan's Journey
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-7 h-7 flex items-center justify-center bg-[#2e1065] hover:bg-[#3b0764] text-slate-300 hover:text-white border border-[#a855f7] transition-colors"
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
                  <div className="w-8 h-8 rounded-full bg-[#3b0764] border border-[#a855f7] flex items-center justify-center shrink-0 mt-1 overflow-hidden shadow-sm">
                    <img
                      src="/assets/ui/portrait_data_sage.png"
                      alt="Wizard Eldrin"
                      className="w-full h-full object-cover [image-rendering:pixelated]"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 leading-relaxed ${
                    isUser
                      ? 'bg-[#1e3a5f] text-white border border-[#0284c7] rounded-sm shadow-md'
                      : 'bg-[#150d24] text-[#e2e8f0] border border-[#4c1d95] rounded-sm shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs">{m.text}</p>

                  {/* Quick Action buttons */}
                  {m.quickActions && m.quickActions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#3b1263] flex flex-wrap gap-2">
                      {m.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          onClick={qa.action}
                          className="px-2.5 py-1 bg-[#25103d] hover:bg-[#3b1561] text-[#e9d5ff] border border-[#7e22ce] text-[10px] font-pixel transition-colors flex items-center gap-1 active:translate-y-0.5 cursor-pointer"
                        >
                          <span>{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#f59e0b] border border-[#fef08a] flex items-center justify-center shrink-0 mt-1 text-[9px] font-pixel font-bold text-[#0f1722]">
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
          className="p-3 sm:p-4 bg-[#1b102b] border-t-2 border-[#581c87] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Grand Wizard Eldrin about spells, technical projects, or quests..."
            className="flex-1 bg-[#0a0714] border border-[#4c1d95] focus:border-[#c084fc] px-3 py-2 text-xs text-white placeholder-slate-400 outline-none font-sans"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#7e22ce] hover:bg-[#6b21a8] text-[#fef08a] border border-[#c084fc] text-[9px] font-pixel flex items-center gap-1.5 transition-colors cursor-pointer active:translate-y-0.5"
          >
            <span>CAST</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
