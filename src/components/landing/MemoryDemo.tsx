"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import {
  Bookmark,
  Brain,
  Check,
  Clock3,
  FileText,
  Maximize2,
  MousePointerClick,
  RotateCcw,
  RotateCw,
  TrendingUp,
  Zap,
} from "lucide-react";

const cards = [
  {
    subject: "Chemistry · Equilibrium",
    question: "What is the only factor that changes the equilibrium constant?",
    answer: "Temperature.",
  },
  {
    subject: "Physics · Electrostatics",
    question: "What is the electric field inside a conductor in electrostatic equilibrium?",
    answer: "Zero.",
  },
  {
    subject: "Mathematics · Calculus",
    question: "What does a derivative represent geometrically at a point?",
    answer: "The slope of the tangent to the curve.",
  },
];

const SWIPE_THRESHOLD = 82;
const TOTAL_DUE = 18;
const HINT_PULSE_DURATION_MS = 1400;

const outcomeBadges = [
  { icon: Zap, label: "Active Recall", sub: "Strengthens memory" },
  { icon: Clock3, label: "Spaced Repetition", sub: "Perfect timing" },
  { icon: TrendingUp, label: "Better Retention", sub: "Remember longer" },
];

export function MemoryDemo() {
  const [cardIndex, setCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [latestResult, setLatestResult] = useState<{ rating: "Again" | "Easy"; due: string } | null>(null);
  const [hintPulse, setHintPulse] = useState(false);
  const pointerStart = useRef(0);
  const card = cards[cardIndex];
  const dueNumber = cardIndex + 7;
  const progressPercent = Math.round((dueNumber / TOTAL_DUE) * 100);

  const direction = dragX > 20 ? "easy" : dragX < -20 ? "again" : null;

  // Respond to the scroll-triggered annotation finishing its arrow draw:
  // give the card a brief glow so attention actually lands on it.
  useEffect(() => {
    function handleDemoHint() {
      setHintPulse(true);
      window.setTimeout(() => setHintPulse(false), HINT_PULSE_DURATION_MS);
    }

    window.addEventListener("cramit:demo-hint", handleDemoHint);
    return () => window.removeEventListener("cramit:demo-hint", handleDemoHint);
  }, []);

  function rate(directionToRate: "again" | "easy") {
    if (isAnimatingOut) return;

    const isEasy = directionToRate === "easy";
    setIsAnimatingOut(true);
    setDragX(isEasy ? 720 : -720);
    setLatestResult({ rating: isEasy ? "Easy" : "Again", due: isEasy ? "In 4 days" : "Tomorrow" });

    window.setTimeout(() => {
      setCardIndex((current) => (current + 1) % cards.length);
      setShowBack(false);
      setBookmarked(false);
      setNoteOpen(false);
      setIsAnimatingOut(false);
      setDragX(0);
    }, 330);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (isAnimatingOut) return;
    setHintPulse(false);
    pointerStart.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging || isAnimatingOut) return;
    setDragX(event.clientX - pointerStart.current);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!isDragging || isAnimatingOut) return;
    setIsDragging(false);

    const distance = event.clientX - pointerStart.current;
    if (distance > SWIPE_THRESHOLD) {
      rate("easy");
    } else if (distance < -SWIPE_THRESHOLD) {
      rate("again");
    } else {
      setDragX(0);
      if (Math.abs(distance) < 8) setShowBack((current) => !current);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setShowBack((current) => !current);
    }
    if (event.key === "ArrowLeft") rate("again");
    if (event.key === "ArrowRight") rate("easy");
  }

  function resetDemo() {
    setCardIndex(0);
    setShowBack(false);
    setDragX(0);
    setLatestResult(null);
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl" aria-label="Interactive Cramit review demo">
      <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-[#e8e9ff] opacity-75 blur-2xl" />
      <div className="overflow-hidden rounded-[1.75rem] border border-[#dfe1ee] bg-white shadow-[0_32px_90px_-42px_rgba(37,38,75,0.42)]">
        <div className="flex flex-col border-b border-[#e8e9f0] bg-[#f8f8fc] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#6269e8] shadow-[0_0_0_5px_#e5e6ff]" />
            <span className="text-sm font-semibold text-[#24253a]">Real Cramit-style Review</span>
          </div>
          <span className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full border border-[#e2e4ed] bg-white px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#656779] sm:mt-0 sm:self-auto">
            <span aria-hidden="true">👆</span> Tap to flip · Drag to rate
          </span>
        </div>

        <div className="grid bg-[#fbfbfe] lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative min-h-[610px] overflow-hidden px-5 py-8 sm:px-10">
            <div className="mx-auto flex max-w-2xl items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a8c9b]">{card.subject}</p>
                <p className="mt-1 text-sm font-semibold text-[#656779]">{String(dueNumber).padStart(2, "0")} of {TOTAL_DUE} due</p>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-1.5 w-28 overflow-hidden rounded-full bg-[#eceef5]">
                  <div className="h-full rounded-full bg-[#6269e8] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                </div>
                <span className="font-mono text-[11px] font-bold text-[#8a8c9b]">{progressPercent}%</span>
              </div>
            </div>

            <div className="relative mx-auto mt-8 h-[405px] max-w-[570px]">
              <div className="absolute inset-x-5 top-4 h-full rounded-[2rem] border border-[#e5e6ef] bg-[#f4f5fa]" aria-hidden="true" />
              <div
                role="button"
                tabIndex={0}
                aria-label={`${showBack ? "Explanation" : "Question"}: ${showBack ? card.answer : card.question}. Tap to flip, arrow left for Again, arrow right for Easy.`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => { setIsDragging(false); setDragX(0); }}
                onKeyDown={handleKeyDown}
                className={`landing-study-card absolute inset-0 select-none overflow-hidden rounded-[2rem] border-[3px] bg-white text-[#171827] shadow-[0_28px_70px_-30px_rgba(37,38,75,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6269e8] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{
                  transform: `translateX(${dragX}px) rotate(${dragX / 30}deg) scale(${hintPulse ? 1.012 : 1})`,
                  borderColor: direction === "easy" ? "#10b981" : direction === "again" ? "#f59e0b" : "#e5e6ef",
                  boxShadow: hintPulse
                    ? "0 0 0 8px rgba(98,105,232,0.14), 0 28px 70px -30px rgba(37,38,75,0.28)"
                    : "0 28px 70px -30px rgba(37,38,75,0.28)",
                  transition: isDragging
                    ? "none"
                    : "transform 320ms cubic-bezier(.2,.8,.2,1), border-color 160ms ease, box-shadow 420ms ease",
                  touchAction: "pan-y",
                }}
              >
                <div className={`landing-swipe-label landing-swipe-label-left ${direction === "again" ? "opacity-100" : "opacity-0"}`}>AGAIN</div>
                <div className={`landing-swipe-label landing-swipe-label-right ${direction === "easy" ? "opacity-100" : "opacity-0"}`}>EASY</div>

                <div className="flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-[#eef0ff] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#5960d7]">
                      {showBack ? "Explanation" : "Question"}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => { event.stopPropagation(); setNoteOpen((current) => !current); }}
                        className={`grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#f1f3f9] ${noteOpen ? "text-[#6269e8]" : "text-[#a0a2b5]"}`}
                        aria-label="Toggle card note"
                      >
                        <FileText size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => { event.stopPropagation(); setBookmarked((current) => !current); }}
                        className={`grid h-9 w-9 place-items-center rounded-full transition hover:bg-[#f1f3f9] ${bookmarked ? "text-[#6269e8]" : "text-[#a0a2b5]"}`}
                        aria-label={bookmarked ? "Remove bookmark" : "Bookmark card"}
                      >
                        <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} aria-hidden="true" />
                      </button>
                      <span className="grid h-9 w-9 place-items-center text-[#a0a2b5]" aria-hidden="true"><Maximize2 size={16} /></span>
                    </div>
                  </div>

                  {noteOpen ? (
                    <div className="mt-3 animate-[landing-rise_250ms_ease-out] rounded-xl border border-[#e2e4ed] bg-[#f8f8fc] px-4 py-3 text-xs leading-5 text-[#656779]">
                      Notes and bookmarks stay attached to the card for the next review.
                    </div>
                  ) : null}

                  <div className="relative flex flex-1 flex-col items-center justify-center px-2 py-8 text-center">
                    <p key={`${cardIndex}-${showBack}`} className={`animate-[landing-rise_250ms_ease-out] text-balance font-semibold leading-relaxed ${showBack ? "text-3xl text-[#5960d7] sm:text-4xl" : "text-xl text-[#171827] sm:text-2xl"}`}>
                      {showBack ? card.answer : card.question}
                    </p>

                    {/* Visual cue: this card is tappable to reveal the answer */}
                    {!showBack ? (
                      <div className="mt-6 inline-flex animate-pulse items-center gap-1.5 rounded-full border border-[#dbe0ff] bg-[#eef0ff] px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#5960d7]">
                        <MousePointerClick size={14} aria-hidden="true" />
                        Tap to reveal answer
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-center gap-2 border-t border-[#f1f3f9] pt-4 text-[10px] font-medium text-[#a0a2b5]">
                    <RotateCw size={12} aria-hidden="true" /> Tap content to flip
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-7 flex max-w-[570px] items-center justify-between gap-3">
              <button type="button" onClick={() => rate("again")} className="landing-rate-button border-[#fbe1b8] bg-[#fff8ec] text-[#b4700f] hover:bg-[#fff1da]">
                <span aria-hidden="true">←</span> Didn&apos;t know
              </button>
              <p className="hidden text-[10px] font-bold uppercase tracking-[0.14em] text-[#a0a2b5] sm:block">or swipe the card</p>
              <button type="button" onClick={() => rate("easy")} className="landing-rate-button border-[#bfe8d4] bg-[#effaf4] text-[#1f9d64] hover:bg-[#e2f6eb]">
                Knew it <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* --- Right Column (Hidden on Mobile, Visible on Desktop) --- */}
          <div className="hidden lg:flex border-[#e8e9f0] bg-[#f8f8fc] px-6 py-9 text-[#171827] sm:px-8 lg:border-l flex-col">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#6269e8]">Smart review schedule</p>
              <Brain className="text-[#6269e8] shrink-0" size={22} aria-hidden="true" />
            </div>
            <h4 className="mt-3 text-2xl font-bold tracking-tight text-[#171827]">We&apos;ll show this card again at the right time.</h4>
            <p className="mt-3 text-sm leading-relaxed text-[#656779]">
              Built on Spaced Repetition science.
            </p>

            {latestResult ? (
              <div className="mt-6 animate-[landing-rise_300ms_ease-out] rounded-2xl border border-[#dbe0ff] bg-[#eef0ff] p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#5960d7] shadow-sm"><Check size={16} strokeWidth={3} aria-hidden="true" /></span>
                  <div><p className="text-sm font-bold text-[#24253a]">Marked {latestResult.rating}</p><p className="mt-1 text-xs leading-5 text-[#656779]">That card returns {latestResult.due.toLowerCase()}.</p></div>
                </div>
              </div>
            ) : null}

            <div className="mt-8 space-y-1" aria-label="Example spaced repetition schedule">
              {[
                ["Today", "Memory Scheduled", true],
                ["2 days", "Ideal Time", true],
                ["5 days", "Reinforcement", true],
                ["10 days", "Long-term Review", false],
              ].map(([time, label, active], index) => (
                <div key={String(time)} className="grid grid-cols-[70px_20px_1fr] items-start gap-2">
                  <span className="pt-0.5 font-mono text-[11px] font-bold uppercase text-[#8a8c9b]">{time}</span>
                  <div className="flex flex-col items-center">
                    <span className={`h-3 w-3 rounded-full ${active ? "bg-[#6269e8]" : "border-2 border-[#c7c9d6] bg-white"}`} />
                    {index < 3 ? <span className="h-10 w-px bg-[#dfe1ee]" /> : null}
                  </div>
                  <span className="text-sm font-semibold text-[#24253a]">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8 grid grid-cols-3 gap-2.5" aria-label="Why this works">
              {outcomeBadges.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="rounded-xl border border-[#e2e4ed] bg-white px-2.5 py-3 text-center">
                  <Icon size={16} className="mx-auto text-[#6269e8]" aria-hidden="true" />
                  <p className="mt-2 text-[10px] font-extrabold leading-tight text-[#24253a]">{label}</p>
                  <p className="mt-0.5 text-[9px] font-semibold leading-tight text-[#a0a2b5]">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Global Footer (Visible on both Mobile and Desktop) --- */}
        <div className="border-t border-[#e8e9f0] bg-[#f8f8fc] px-5 py-4 sm:px-7 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8a8c9b]">
            <span>⚡</span>
            <span>Powered by Spaced Repetition</span>
          </div>
          <button type="button" onClick={resetDemo} className="inline-flex items-center gap-2 text-xs font-bold text-[#5960d7] transition hover:text-[#171827]">
            <RotateCcw size={14} aria-hidden="true" /> Replay
          </button>
        </div>

      </div>
    </div>
  );
}