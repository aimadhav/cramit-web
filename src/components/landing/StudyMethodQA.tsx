"use client";

import { useState } from "react";
import { ArrowUpRight, RotateCw } from "lucide-react";

const RetrievalSVG = () => (
  <svg viewBox="0 0 240 100" className="mx-auto h-24 w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="50" y="20" textAnchor="middle" fontSize="8" fontWeight="800" fill="#a0a2b5" letterSpacing="0.05em">FEELS FAMILIAR</text>
    <rect x="25" y="35" width="50" height="45" rx="6" fill="#f8f9fc" stroke="#e2e4ed" strokeWidth="1.5" />
    <line x1="35" y1="48" x2="65" y2="48" stroke="#d1d3e0" strokeWidth="2" strokeLinecap="round" />
    <line x1="35" y1="58" x2="55" y2="58" stroke="#d1d3e0" strokeWidth="2" strokeLinecap="round" />
    <line x1="35" y1="68" x2="60" y2="68" stroke="#d1d3e0" strokeWidth="2" strokeLinecap="round" />

    <path d="M 95 50 L 105 50 M 100 45 L 105 50 L 100 55" stroke="#a0a2b5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 95 62 L 105 62 M 100 57 L 105 62 L 100 67" stroke="#a0a2b5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    <text x="180" y="20" textAnchor="middle" fontSize="8" fontWeight="800" fill="#5960d7" letterSpacing="0.05em">NOT ACTUAL RECALL</text>
    <rect x="150" y="35" width="60" height="45" rx="22.5" fill="#eef0ff" />
    <path d="M 158 60 A 22 22 0 0 1 202 60" stroke="#b9bde8" strokeWidth="3" strokeLinecap="round" />
    <circle cx="180" cy="60" r="3" fill="#5960d7" />
    <line x1="180" y1="60" x2="165" y2="48" stroke="#5960d7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ExponentialDecaySVG = () => (
  <svg viewBox="0 0 240 100" className="mx-auto h-24 w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="10" x2="30" y2="80" stroke="#fad8cd" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="80" x2="220" y2="80" stroke="#fad8cd" strokeWidth="1.5" strokeLinecap="round" />
    
    <text x="22" y="15" textAnchor="end" fontSize="7" fontWeight="bold" fill="#b45739">100%</text>
    <text x="22" y="82" textAnchor="end" fontSize="7" fontWeight="bold" fill="#b45739">0%</text>
    
    <text x="70" y="95" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#d48a73">7</text>
    <text x="130" y="95" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#d48a73">14</text>
    <text x="210" y="95" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#d48a73">30</text>

    <path d="M 30 15 C 45 40, 60 70, 70 75" stroke="#f47250" strokeWidth="2" strokeLinecap="round" fill="none" />
    <line x1="70" y1="75" x2="70" y2="15" stroke="#f47250" strokeWidth="1" strokeDasharray="2 2" />
    
    <path d="M 70 15 C 90 35, 110 55, 130 65" stroke="#f47250" strokeWidth="2" strokeLinecap="round" fill="none" />
    <line x1="130" y1="65" x2="130" y2="15" stroke="#f47250" strokeWidth="1" strokeDasharray="2 2" />
    
    <path d="M 130 15 C 160 30, 190 40, 210 45" stroke="#f47250" strokeWidth="2" strokeLinecap="round" fill="none" />

    <circle cx="30" cy="15" r="2.5" fill="#f47250" />
    <circle cx="70" cy="15" r="2.5" fill="#f47250" />
    <circle cx="130" cy="15" r="2.5" fill="#f47250" />
  </svg>
);

const InvisibleLoadSVG = () => (
  <svg viewBox="0 0 240 120" className="mx-auto h-32 w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 5)">
      <text x="55" y="10" textAnchor="middle" fontSize="8" fontWeight="800" fill="#a0a2b5" letterSpacing="0.05em">TRADITIONAL PLAN</text>
      <rect x="35" y="20" width="40" height="48" rx="6" fill="#f8f9fc" stroke="#e2e4ed" strokeWidth="1.5" />
      <line x1="50" y1="30" x2="65" y2="30" stroke="#d1d3e0" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="42" x2="60" y2="42" stroke="#d1d3e0" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="54" x2="65" y2="54" stroke="#d1d3e0" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 28 l4 4 m0 -4 l-4 4" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M42 40 l4 4 m0 -4 l-4 4" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M42 52 l4 4 m0 -4 l-4 4" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" />

      <path d="M 95 44 L 115 44 M 110 39 L 115 44 L 110 49" stroke="#c5e0a5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      <text x="165" y="10" textAnchor="middle" fontSize="8" fontWeight="800" fill="#65a30d" letterSpacing="0.05em">CRAMIT PLAN</text>
      <rect x="140" y="20" width="50" height="48" rx="6" fill="#f4fbf0" stroke="#d9f99d" strokeWidth="1.5" />
      <rect x="145" y="25" width="40" height="12" rx="3" fill="#bef264" />
      <path d="M160 31 l2 2 l4 -4" stroke="#3f6212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="145" y="42" width="40" height="12" rx="3" fill="#d9f99d" opacity="0.5" />
      <rect x="145" y="59" width="30" height="4" rx="2" fill="#d9f99d" opacity="0.5" />
    </g>

    <g transform="translate(0, 95)">
      <rect x="35" y="0" width="45" height="16" rx="8" fill="#eef0ff" />
      <text x="57.5" y="11" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#5960d7">IIT-JEE</text>

      <circle cx="110" cy="8" r="10" fill="#fef08a" />
      <path d="M 106 18 l4 8 l4 -8" fill="#fca5a5" />
      <text x="110" y="10" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#ca8a04">1</text>

      <rect x="140" y="0" width="45" height="16" rx="8" fill="#f8f9fc" stroke="#e2e4ed" strokeWidth="1" />
      <text x="162.5" y="11" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#a0a2b5">UPSC</text>
    </g>
  </svg>
);

const cardsData = [
  {
    id: 1,
    number: "01",
    themeColor: "text-[#5960d7]",
    themeBg: "bg-[#eef0ff]",
    themeBorder: "border-[#dbe0ff]",
    titleFront: "THE RETRIEVAL ILLUSION",
    titleBack: "ACTIVE RECALL",
    question: "Why does rereading a chapter 3 times still lead to blanking out in the exam?",
    answer: "Because recognition is passive. Rereading feels fluent because the answer is already in front of you. But exams test retrieval.",
    elaborate: "Active recall forces your brain to retrieve the information from scratch, building and cementing neural pathways. Cramit replaces reading with active testing.",
    visual: RetrievalSVG,
  },
  {
    id: 2,
    number: "02",
    themeColor: "text-[#d96c4a]",
    themeBg: "bg-[#fff5f0]",
    themeBorder: "border-[#fee5d9]",
    titleFront: "THE EXPONENTIAL DECAY",
    titleBack: "SPACED REPETITION",
    question: "Why do I completely forget chapters I studied last week by the time the next test comes?",
    answer: "Because of the forgetting curve. Memory decays exponentially unless reinforced at calculated intervals.",
    elaborate: "If you revise too early, you waste effort. Too late, and you have to relearn. Cramit schedules reviews at the absolute limit of your memory, flattening the decay curve.",
    visual: ExponentialDecaySVG,
  },
  {
    id: 3,
    number: "03",
    themeColor: "text-[#65a30d]",
    themeBg: "bg-[#f4fbf0]",
    themeBorder: "border-[#e5f6db]",
    titleFront: "THE INVISIBLE LOAD",
    titleBack: "SMART QUEUES",
    question: "Why does revision feel so overwhelming and take hours of manual scheduling?",
    answer: "Because traditional timetables ask you to revise entire chapters regardless of your actual memory state.",
    elaborate: "Cramit tracks memory performance for individual concepts. It acts as an automated queue that serves only cards due for review today, saving you hours of unnecessary reading.",
    visual: InvisibleLoadSVG,
  },
];

export function StudyMethodQA() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div id="science-cards" className="w-full mt-10">
      <div className="grid gap-5 md:grid-cols-3">
        {cardsData.map((card) => {
          const Visual = card.visual;
          const isFlipped = !!flipped[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="group cursor-pointer perspective-1000 select-none relative h-[440px] w-full"
              role="button"
              tabIndex={0}
              aria-label={`Interactive flashcard: ${card.question}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleFlip(card.id);
                }
              }}
            >
              <div
                className="relative w-full h-full transform-style-3d duration-500 rounded-3xl border border-[#ececf4] bg-white shadow-sm hover:shadow-md transition-shadow"
                style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                {/* --- FRONT OF CARD --- */}
                <div className="absolute inset-0 backface-hidden w-full h-full flex flex-col p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${card.themeBg} ${card.themeColor}`}>
                        {card.number}
                      </span>
                      <span className={`text-[9px] font-extrabold uppercase tracking-widest ${card.themeColor} leading-tight`}>
                        {card.titleFront}
                      </span>
                    </div>
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${card.themeBorder} ${card.themeColor}`}>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-[17px] font-bold leading-snug text-[#171827] tracking-tight text-center mt-10 mb-4 px-2">
                    {card.question}
                  </h3>

                  {/* Visual SVG Diagram */}
                  <div className="w-full mt-auto mb-4">
                    <Visual />
                  </div>

                  {/* Footer Trigger */}
                  <div className={`mt-auto text-center text-[11px] font-bold ${card.themeColor} group-hover:translate-y-[-2px] transition-transform`}>
                    Read the science &rarr;
                  </div>
                </div>

                {/* --- BACK OF CARD --- */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full flex flex-col p-6 sm:p-7 bg-[#171827] text-white rounded-3xl">
                  
                  {/* Header (Fixed at top) */}
                  <div className="flex items-center justify-between shrink-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-[#aeb2ff]">
                      {card.titleBack}
                    </span>
                  </div>

                  {/* Scrollable Content Area (Scrollbars Hidden) */}
                  <div className="flex-1 mt-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <div className="flex flex-col gap-4 pb-2">
                      <p className="text-[17px] font-bold leading-snug text-[#aeb2ff] tracking-tight">
                        {card.answer}
                      </p>
                      <p className="text-[14px] leading-relaxed text-[#8f92a3]">
                        {card.elaborate}
                      </p>
                    </div>
                  </div>

                  {/* Action / Trigger (Fixed at bottom) */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-[#aeb2ff] hover:text-white transition-colors shrink-0">
                    <RotateCw size={12} />
                    <span>Tap to flip back</span>
                  </div>
                  
                </div>{/* --- BACK OF CARD --- */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full flex flex-col p-6 sm:p-7 bg-[#171827] text-white rounded-3xl">
                  
                  {/* Header (Fixed at top) */}
                  <div className="flex items-center justify-between shrink-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-[#aeb2ff]">
                      {card.titleBack}
                    </span>
                  </div>

                  {/* Scrollable Content Area (Scrollbars Hidden) */}
                  <div className="flex-1 mt-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <div className="flex flex-col gap-4 pb-2">
                      <p className="text-[17px] font-bold leading-snug text-[#aeb2ff] tracking-tight">
                        {card.answer}
                      </p>
                      <p className="text-[14px] leading-relaxed text-[#8f92a3]">
                        {card.elaborate}
                      </p>
                    </div>
                  </div>

                  {/* Action / Trigger (Fixed at bottom) */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-bold text-[#aeb2ff] hover:text-white transition-colors shrink-0">
                    <RotateCw size={12} />
                    <span>Tap to flip back</span>
                  </div>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}