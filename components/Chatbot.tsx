'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type CtaAction = 'quote' | 'schedule' | 'call';

interface BotMsg {
  id: number;
  role: 'bot';
  text: string;
  ctas?: CtaAction[];
  replies?: string[];
}
interface UserMsg {
  id: number;
  role: 'user';
  text: string;
}
type Message = BotMsg | UserMsg;

// ─── CTA config ───────────────────────────────────────────────────────────────
const CTA_CONFIG: Record<CtaAction, { label: string; emoji: string }> = {
  quote:    { label: 'Get a Free Quote',     emoji: '💰' },
  schedule: { label: 'Schedule Appointment', emoji: '📅' },
  call:     { label: 'Call (971) 707-6604',  emoji: '📞' },
};

// ─── Conversation flow nodes ──────────────────────────────────────────────────
type FlowNode = { text: string; replies: string[]; ctas?: CtaAction[] };

const FLOW: Record<string, FlowNode> = {
  welcome: {
    text: "Hi there! 👋 I'm Sage, your renovation guide at Sumer Renovations.\n\nI can help you explore services, get pricing info, and connect you with our team. What brings you here today?",
    replies: ['💰 Get a Free Quote', '📅 Schedule Consultation', '🔨 Our Services', '📍 Service Areas', '💵 Pricing Info'],
  },
  quote: {
    text: "A free quote is the fastest way to get started — no pressure, no obligation. ✅\n\nJust fill out our quick form and we'll send you a detailed estimate within 24 hours.",
    ctas: ['quote'],
    replies: ['📅 Schedule a Consultation', '🔨 Our Services', '🏠 Back to Menu'],
  },
  schedule: {
    text: "We'd love to meet with you! 🤝\n\nA free consultation lets us walk through your space, understand your vision, and build an accurate plan. We're available 7 days a week, 8AM–8PM.",
    ctas: ['schedule'],
    replies: ['💰 Get a Free Quote Instead', '🔨 Our Services', '🏠 Back to Menu'],
  },
  call_info: {
    text: "You can reach us directly at:\n\n📞 (971) 707-6604\n📧 sumerrenovations@gmail.com\n🕐 Mon–Sun: 8:00 AM – 8:00 PM\n\nOr use the buttons below to get a quote or book online — takes under 2 minutes!",
    ctas: ['quote', 'schedule'],
    replies: ['🏠 Back to Menu'],
  },
  services: {
    text: "We cover the full spectrum of home renovation. ✨\n\nWhich service are you most interested in?",
    replies: ['🍳 Kitchen Remodeling', '🛁 Bathroom Remodeling', '🏠 Full Home Renovation', '🌿 Exterior & Outdoor', '🪵 Flooring & Painting', '🏗️ Custom Projects', '💰 Get a Free Quote', '🏠 Back to Menu'],
  },
  kitchen: {
    text: "Kitchen remodeling is one of our specialties! 🍳\n\nWe handle it all:\n• Custom cabinetry & countertops\n• Backsplash, flooring & lighting\n• Appliance upgrades\n• Open-concept transformations\n• Full gut renovations\n\nKitchens typically start at $20,000+. Ready for your custom estimate?",
    ctas: ['quote', 'schedule'],
    replies: ['🛁 Bathroom Remodeling', '🔨 More Services', '🏠 Back to Menu'],
  },
  bathroom: {
    text: "We create spa-like bathrooms you'll love. 🛁\n\n• Walk-in showers & soaking tubs\n• Double vanities & heated floors\n• Custom tile & premium fixtures\n• Master bath renovations\n\nBathrooms typically start at $10,000+. Let's talk about your vision!",
    ctas: ['quote', 'schedule'],
    replies: ['🍳 Kitchen Remodeling', '🔨 More Services', '🏠 Back to Menu'],
  },
  fullhome: {
    text: "A full home renovation is the ultimate transformation! 🏡\n\nWe coordinate every trade so you don't have to:\n• Start-to-finish project management\n• Kitchen, bathrooms, flooring & more\n• Interior & exterior upgrades\n• Design guidance included\n\nEvery whole-home project is custom-quoted.",
    ctas: ['quote', 'schedule'],
    replies: ['🔨 View All Services', '🏠 Back to Menu'],
  },
  exterior: {
    text: "Curb appeal matters — we nail it! 🌿\n\n• Siding replacement & exterior painting\n• New windows & entry doors\n• Roofing & gutters\n• Custom decks & outdoor living\n• Landscaping upgrades\n\nLet's give your home a stunning exterior!",
    ctas: ['quote', 'schedule'],
    replies: ['🔨 More Services', '🏠 Back to Menu'],
  },
  flooring: {
    text: "New floors can completely transform a home! 🪵\n\nWe install:\n• Hardwood & engineered wood\n• Luxury vinyl plank (LVP)\n• Tile & stone\n• Carpet & laminate\n\nWe also handle interior painting — walls, trim & cabinets.",
    ctas: ['quote'],
    replies: ['🔨 More Services', '🏠 Back to Menu'],
  },
  custom: {
    text: "Have something unique in mind? We love a challenge! 🏗️\n\nFrom home additions to one-of-a-kind builds — if you can dream it, we can build it. Tell us about your project and we'll figure out the best plan together.",
    ctas: ['quote', 'schedule'],
    replies: ['🔨 View All Services', '🏠 Back to Menu'],
  },
  areas: {
    text: "We proudly serve the Greater Portland metro and surrounding areas:\n\n📍 Portland, OR\n📍 Beaverton, OR\n📍 Hillsboro, OR\n📍 Lake Oswego, OR\n📍 Wilsonville, OR\n📍 Vancouver, WA\n📍 Eugene, OR\n📍 Corvallis, OR\n\nNot sure if we cover your location? Just ask — we're happy to check!",
    replies: ['💰 Get a Free Quote', '📅 Schedule Consultation', '🏠 Back to Menu'],
  },
  pricing: {
    text: "Here's a general ballpark to help you plan:\n\n💵 Bathroom Remodel: $10K – $40K+\n💵 Kitchen Remodel: $20K – $80K+\n💵 Full Home Reno: $50K – $200K+\n💵 Flooring (per room): $1.5K – $6K+\n💵 Exterior Refresh: $8K – $40K+\n\nThe most accurate number comes from a free, no-obligation quote. 😊",
    ctas: ['quote', 'schedule'],
    replies: ['🔨 View Our Services', '📍 Service Areas', '🏠 Back to Menu'],
  },
  fallback: {
    text: "That's a great question! For the most accurate answer, our team would love to help directly.\n\nYou can get a free quote or schedule a quick call — we respond within 24 hours. 😊",
    ctas: ['quote', 'schedule'],
    replies: ['📞 Call Us', '🔨 Our Services', '🏠 Back to Menu'],
  },
};

// ─── Keyword → flow router ────────────────────────────────────────────────────
function getNodeKey(input: string): string {
  const t = input.toLowerCase().replace(/[^\w\s]/g, ' ');
  if (/\b(back|menu|start|hello|^hi|help me|home)\b/.test(t)) return 'welcome';
  if (/\b(free quote|get quote|request quote|estimate|quote)\b/.test(t)) return 'quote';
  if (/\b(schedul|consult|appointment|meet|book)\b/.test(t)) return 'schedule';
  if (/\b(call|phone|number)\b/.test(t)) return 'call_info';
  if (/\b(service|offer|what do you|what you do)\b/.test(t)) return 'services';
  if (/\bkitchen\b/.test(t)) return 'kitchen';
  if (/\b(bathroom|bath |shower|spa)\b/.test(t)) return 'bathroom';
  if (/\b(full home|whole home|entire|all room)\b/.test(t)) return 'fullhome';
  if (/\b(exterior|outside|outdoor|deck|siding|roof|curb)\b/.test(t)) return 'exterior';
  if (/\b(floor|paint|carpet|hardwood|vinyl|tile)\b/.test(t)) return 'flooring';
  if (/\b(custom|unique|special|addition)\b/.test(t)) return 'custom';
  if (/\b(area|location|where|serve|portland|beaverton|hillsboro|eugene|corvallis|vancouver)\b/.test(t)) return 'areas';
  if (/\b(pric|cost|how much|budget|afford|expens)\b/.test(t)) return 'pricing';
  return 'fallback';
}

function stripEmoji(text: string): string {
  return text.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/u, '').trim();
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'bot', text: FLOW.welcome.text, replies: FLOW.welcome.replies } as BotMsg,
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [currentReplies, setCurrentReplies] = useState<string[]>(FLOW.welcome.replies);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openChat = useCallback(() => setOpen(true), []);
  useEffect(() => {
    window.addEventListener('openChatbot', openChat);
    return () => window.removeEventListener('openChatbot', openChat);
  }, [openChat]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const scrollToSection = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 150);
  };

  const handleCtaClick = (action: CtaAction) => {
    if (action === 'quote') scrollToSection('#contact');
    else if (action === 'schedule') scrollToSection('#schedule');
    else if (action === 'call') window.location.href = 'tel:+19717076604';
  };

  const processReply = useCallback((rawText: string) => {
    const displayText = stripEmoji(rawText);
    const userMsg: UserMsg = { id: Date.now(), role: 'user', text: displayText };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);
    setCurrentReplies([]);

    setTimeout(() => {
      const key = getNodeKey(rawText);
      const node = FLOW[key];
      const botMsg: BotMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: node.text,
        ctas: node.ctas,
        replies: node.replies,
      };
      setMessages((prev) => [...prev, botMsg]);
      setCurrentReplies(node.replies);
      setTyping(false);
    }, 750);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processReply(input.trim());
    setInput('');
  };

  return (
    <>
      {/* Robot button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-[6.25rem] right-4 z-[60] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 robot-btn-3d${open ? ' robot-btn-open' : ''}`}
        aria-label="Open chat assistant"
        aria-expanded={open}
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-gold-400 opacity-25 animate-ping" style={{ animationDuration: '2.5s' }} />
        )}
        {open ? (
          <svg className="w-7 h-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 48 48" className="w-12 h-12 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="rfGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#5a6a7e" />
                <stop offset="100%" stopColor="#1e2733" />
              </linearGradient>
            </defs>
            <line x1="24" y1="3" x2="24" y2="11" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" />
            <circle cx="24" cy="2.5" r="2.5" fill="#c9a84c" />
            <rect x="6" y="11" width="36" height="29" rx="7" fill="url(#rfGrad)" />
            <rect x="10" y="13" width="20" height="7" rx="3.5" fill="white" opacity="0.07" />
            <rect x="2" y="19" width="4" height="10" rx="2" fill="#3a4a58" />
            <rect x="42" y="19" width="4" height="10" rx="2" fill="#3a4a58" />
            <rect x="10" y="18" width="11" height="8" rx="3" fill="#c9a84c" />
            <circle cx="13.5" cy="20.5" r="2" fill="white" opacity="0.55" />
            <rect x="27" y="18" width="11" height="8" rx="3" fill="#c9a84c" />
            <circle cx="30.5" cy="20.5" r="2" fill="white" opacity="0.55" />
            <rect x="13" y="30" width="22" height="5" rx="2.5" fill="#c9a84c" opacity="0.85" />
            <circle cx="18" cy="32.5" r="1.3" fill="#1e2733" opacity="0.5" />
            <circle cx="24" cy="32.5" r="1.3" fill="#1e2733" opacity="0.5" />
            <circle cx="30" cy="32.5" r="1.3" fill="#1e2733" opacity="0.5" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed top-[9.5rem] right-4 z-[60] w-[calc(100vw-2rem)] max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 md:right-6 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        role="dialog"
        aria-label="Sumer Renovations chat assistant"
        aria-modal="true"
      >
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #0a1628, #0f2136)' }} className="px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)' }}
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold text-sm leading-tight">Sumer Renovations LLC</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-gray-400 text-xs">Online · Typically replies instantly</span>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1" aria-label="Close chat">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="h-72 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'bot' && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)' }}
                  >
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'text-white rounded-br-sm'
                      : 'bg-white text-charcoal shadow-sm rounded-bl-sm'
                  }`}
                  style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #0f2136, #0a1628)' } : {}}
                >
                  {msg.text}
                </div>
              </div>

              {/* CTA buttons after bot messages */}
              {msg.role === 'bot' && (msg as BotMsg).ctas && (
                <div className="flex flex-col gap-2 mt-2 ml-9">
                  {(msg as BotMsg).ctas!.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleCtaClick(action)}
                      className="flex items-center justify-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl w-full transition-all duration-150 active:scale-95"
                      style={{
                        background: action === 'call'
                          ? 'linear-gradient(135deg, #1a3a5c, #0f2136)'
                          : 'linear-gradient(135deg, #c9a84c, #a0742a)',
                        boxShadow: action === 'call' ? '0 4px 0 #0a1628' : '0 4px 0 #7a5c18',
                      }}
                    >
                      <span>{CTA_CONFIG[action].emoji}</span>
                      {CTA_CONFIG[action].label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #a0742a)' }}
              >
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic quick replies */}
        {currentReplies.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <p className="text-xs text-gray-400 mb-2 font-medium">Quick replies:</p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {currentReplies.map((r) => (
                <button
                  key={r}
                  onClick={() => processReply(r)}
                  className="text-xs bg-gray-50 hover:bg-gold-50 hover:text-gold-700 text-gray-600 px-3 py-1.5 rounded-full transition-all duration-150 border border-gray-200 hover:border-gold-300 font-medium"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text input */}
        <form onSubmit={handleSubmit} className="px-4 pb-4 pt-3 border-t border-gray-100 bg-white flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your renovation..."
            className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2.5 outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100 transition-all bg-gray-50"
            aria-label="Chat message"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 disabled:bg-gray-200 text-white rounded-full flex items-center justify-center transition-all duration-150 flex-shrink-0"
            style={{ background: input.trim() ? 'linear-gradient(135deg, #c9a84c, #a0742a)' : undefined }}
            aria-label="Send"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
