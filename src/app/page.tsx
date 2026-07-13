import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  Calendar,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  Layers3,
  Medal,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  WifiOff,
} from "lucide-react";

import { MemoryDemo } from "@/components/landing/MemoryDemo";
import { StudyMethodQA } from "@/components/landing/StudyMethodQA";
import { HeroVisualStack } from "@/components/landing/HeroVisualStack";
import { ScrollAnnotation } from "@/components/landing/ScrollAnnotation"; // add this

const ForgettingCurveGraphicSVG = () => (
  <svg viewBox="0 0 450 220" className="mx-auto h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="450" height="220" rx="16" fill="white" />
    
    {/* Grid Lines */}
    <line x1="45" y1="20" x2="420" y2="20" stroke="#f1f3f9" strokeWidth="1" />
    <line x1="45" y1="55" x2="420" y2="55" stroke="#f1f3f9" strokeWidth="1" />
    <line x1="45" y1="90" x2="420" y2="90" stroke="#f1f3f9" strokeWidth="1" />
    <line x1="45" y1="125" x2="420" y2="125" stroke="#f1f3f9" strokeWidth="1" />
    <line x1="45" y1="160" x2="420" y2="160" stroke="#f1f3f9" strokeWidth="1" />
    
    {/* Axes */}
    <line x1="45" y1="15" x2="45" y2="175" stroke="#dbe0eb" strokeWidth="2" strokeLinecap="round" />
    <line x1="45" y1="175" x2="425" y2="175" stroke="#dbe0eb" strokeWidth="2" strokeLinecap="round" />
    
    {/* Axes Labels */}
    <text x="38" y="24" textAnchor="end" fontSize="9" fontWeight="bold" fill="#656779">100%</text>
    <text x="38" y="94" textAnchor="end" fontSize="9" fontWeight="bold" fill="#656779">50%</text>
    <text x="38" y="164" textAnchor="end" fontSize="9" fontWeight="bold" fill="#656779">0%</text>
    
    <text x="45" y="192" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#656779">Day 0</text>
    <text x="110" y="192" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#656779">Day 1</text>
    <text x="180" y="192" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#656779">Day 3</text>
    <text x="250" y="192" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#656779">Day 7</text>
    <text x="320" y="192" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#656779">Day 15</text>
    <text x="390" y="192" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#656779">Day 30</text>
    
    {/* Dotted Exponential decay 1 (No revision) */}
    <path d="M45 20 C100 110, 160 140, 390 162" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />
    <text x="150" y="128" fontSize="9" fontWeight="bold" fill="#94a3b8" transform="rotate([-12 150 128])">Without revision</text>
    
    {/* Spaced reviews curve */}
    <path d="M45 20 C70 50, 95 85, 110 90" stroke="#6269e8" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M110 90 L110 20" stroke="#6269e8" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
    
    <path d="M110 20 C135 48, 165 72, 180 75" stroke="#6269e8" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M180 75 L180 20" stroke="#6269e8" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
    
    <path d="M180 20 C205 45, 235 60, 250 64" stroke="#6269e8" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M250 64 L250 20" stroke="#6269e8" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
    
    <path d="M250 20 C275 35, 305 48, 320 52" stroke="#6269e8" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M320 52 L320 20" stroke="#6269e8" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" />
    
    <path d="M320 20 C345 32, 375 42, 390 45" stroke="#6269e8" strokeWidth="3" strokeLinecap="round" fill="none" />
    
    {/* Indicators at spikes */}
    <circle cx="110" cy="90" r="3.5" fill="#aeb2ff" stroke="#6269e8" strokeWidth="1.5" />
    <circle cx="180" cy="75" r="3.5" fill="#aeb2ff" stroke="#6269e8" strokeWidth="1.5" />
    <circle cx="250" cy="64" r="3.5" fill="#aeb2ff" stroke="#6269e8" strokeWidth="1.5" />
    <circle cx="320" cy="52" r="3.5" fill="#aeb2ff" stroke="#6269e8" strokeWidth="1.5" />
    
    <circle cx="45" cy="20" r="4" fill="#6269e8" />
    <circle cx="110" cy="20" r="4" fill="#6269e8" />
    <circle cx="180" cy="20" r="4" fill="#6269e8" />
    <circle cx="250" cy="20" r="4" fill="#6269e8" />
    <circle cx="320" cy="20" r="4" fill="#6269e8" />
    
    {/* Handwritten label "With Cramit" */}
    <g className="font-handwritten text-xl font-bold fill-[#5960d7]">
      <text x="355" y="85">With</text>
      <text x="350" y="105">Cramit</text>
      <path d="M375 68 C 375 50, 360 48, 345 42" stroke="#5960d7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M352 46 l-8 -3 4 -6" stroke="#5960d7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const BETA_URL = "https://github.com/aimadhav/cramit_madhav/releases";

export const metadata: Metadata = {
  title: "Cramit — Remember what matters",
  description:
    "Active recall and spaced repetition for JEE, NEET, and Computer Science. Review the right card at the right time.",
  openGraph: {
    title: "Cramit — Remember what matters",
    description: "Your syllabus is huge. Your memory does not have to handle it alone.",
    type: "website",
  },
};

const features = [
  {
    icon: Clock3,
    number: "01",
    title: "A queue that knows what is due",
    copy: "Open the app and start. Cramit prioritises the cards most at risk instead of asking you to revise an entire chapter again.",
    accent: "bg-[#eef0ff] text-[#5960d7]",
  },
  {
    icon: Brain,
    number: "02",
    title: "Recall before you reveal",
    copy: "Questions make your brain retrieve the answer. Mark it Again or Easy, and the next review changes with your memory.",
    accent: "bg-[#fff0ea] text-[#b45739]",
  },
  {
    icon: Layers3,
    number: "03",
    title: "Built around your preparation",
    copy: "Choose JEE, NEET, or Computer Science, then focus on the subjects and chapters that are actually part of your goal.",
    accent: "bg-[#eef9d9] text-[#58721f]",
  },
];

export default function HomePage() {
  return (
    <main className="landing-shell overflow-x-clip bg-[#fbfbfe] text-[#171827]">
      <header className="sticky top-0 z-50 border-b border-[#e8e9ef]/90 bg-[#fbfbfe]/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main navigation">
          <a href="#top" className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-[-0.05em] text-[#171827] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#686fe9]">
            <span className="text-[#6269e8]" aria-hidden="true">✦</span>
            <span>Cramit<span className="text-[#6269e8]">.</span></span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#5f6171] md:flex">
            <a className="transition hover:text-[#171827]" href="#why">Why Cramit</a>
            <a className="transition hover:text-[#171827]" href="#features">Features</a>
            <a className="transition hover:text-[#171827]" href="#demo">For Students</a>
            <a className="transition hover:text-[#171827]" href="#demo">How it works</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link className="hidden text-sm font-bold text-[#4d4f61] transition hover:text-[#171827] sm:inline-flex" href="/login">
              Teacher / Admin
            </Link>
            <a
              href={BETA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#171827] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#292a42]"
            >
              Get the App
            </a>
          </div>
        </nav>
      </header>

      <section id="top" className="landing-grid relative isolate px-5 pb-8 pt-0 sm:px-8 sm:pb-12 sm:pt-6 overflow-hidden">
        
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">  {/* Left Column (Main Copy & CTAs) */}
            <div className="lg:col-span-6 text-left flex flex-col items-start">
              <div className="inline-flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f3f9] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#656779] border border-[#e2e4ed]">
                  <span>⚡</span>
                  <span>A memory system for competitive exams</span>
                </div>
              </div>

              <h1 className="mt-4 text-balance text-[clamp(2.5rem,5.5vw,4.2rem)] font-extrabold leading-[1.25] tracking-[-0.05em] text-[#171827] font-display-serif">
                Stop forgetting<br/>
                what you<br/>
                <span className="relative inline-block text-[#5960d7] mt-1">
                  already studied.
                  <svg className="absolute left-0 bottom-[-6px] w-full h-2.5 text-[#b0b5ff]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" preserveAspectRatio="none">
                    <path d="M3 7 C 30 4, 70 9, 97 6" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-[#5e6070] sm:text-lg sm:leading-8">
                Cramit is based on the memory system used and trusted by <strong>Chirag Falor (AIR 1, JEE Adv 2020)</strong> and toppers of <strong>JEE, NEET & UPSC.</strong><br/>Master any syllabus using Active Recall + Spaced Repetition.
              </p>

              {/* Target Badges */}
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-extrabold text-[#5c5d6e]">
                {["JEE Advanced", "JEE Main", "NEET", "UPSC CSE", "Trusted by Toppers"].map((b) => (
                  <span key={b} className="inline-flex items-center rounded-full bg-[#f3f4f6]/85 border border-[#e5e7eb] px-3.5 py-1">
                    {b}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-9 flex flex-col items-center justify-start gap-3 sm:flex-row w-full sm:w-auto">
                <a
                  href={BETA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="landing-primary-cta inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#171827] px-7 text-sm font-extrabold text-white shadow-[0_14px_35px_-16px_rgba(23,24,39,0.3)] transition hover:-translate-y-1 hover:bg-[#282a44] sm:w-auto"
                >
                  Download Android App <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a
                  href="#demo"
                  className="inline-flex min-h-13 w-full items-center justify-center rounded-full border border-[#d9dbe7] bg-white px-7 text-sm font-extrabold text-[#292a3d] transition hover:-translate-y-1 hover:border-[#bfc2d5] sm:w-auto"
                >
                  <svg className="w-4 h-4 mr-2 text-[#656779] fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  See How It Works
                </a>
              </div>
              
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#656779]">
                <span className="flex items-center gap-1.5"><CreditCard size={14} className="text-[#a0a2b5]" /> No credit card required</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#a0a2b5]" /> Free forever plan</span>
              </div>

              {/* Mobile-Only Topper Achievement Card (Asset 2) */}
<div className="mt-10 block md:hidden w-full max-w-[340px]">
  <div className="relative overflow-hidden rounded-[1.5rem] bg-[#171827] p-5 shadow-[0_20px_45px_rgba(23,24,39,0.35)]">
    <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[#5960d7] opacity-20 blur-xl" aria-hidden="true" />

    <div className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" aria-hidden="true" />
      <span className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#9aa0af]">
        Verified rank · JEE Advanced 2020
      </span>
    </div>

    <div className="relative z-10 mt-3.5 flex items-end justify-between">
      <div>
        <div className="text-[44px] font-black leading-none tracking-tight text-white">AIR 1</div>
        <div className="mt-1.5 text-[13px] font-bold text-[#c7c9ff]">Chirag Falor</div>
      </div>
      <div className="grid h-13 w-13 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f5b13d] to-[#d9861a] shadow-[0_6px_14px_rgba(217,134,26,0.4)]">
        <Medal size={22} className="text-white" aria-hidden="true" />
      </div>
    </div>

    <div className="mt-4 border-t border-white/10 pt-3.5">
      <p className="mb-2 text-[10px] font-bold text-[#8f92a8]">Technique used by toppers</p>
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-[#5960d7]/35 px-2.5 py-1 text-[10px] font-bold text-[#e5e6ff]">
          Active recall
        </span>
        <span className="rounded-full bg-[#5960d7]/35 px-2.5 py-1 text-[10px] font-bold text-[#e5e6ff]">
          Spaced repetition
        </span>
      </div>
    </div>

    <p className="mt-3.5 text-[11px] font-semibold leading-5 text-[#b9bac7]">
      Built 1,700+ flashcards with this method to lock in Inorganic Chemistry — zero wasted rereads.
    </p>
  </div>
</div>
            </div>

            <HeroVisualStack />
          </div>

          {/* Topper Achievements Bar */}
          <div className="mt-5 mb-5  w-full">
    <p className="text-center text-xm font-semibold tracking-normal text-[#5960d7]">
  Technique Trusted by Toppers of
</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-25 text-sm font-semibold text-[#5f6171]">
              {[
                { label: "AIR 1", sub: "JEE Advanced", emoji: "🥇" },
                { label: "Top 50", sub: "JEE Main", emoji: "🏆" },
                { label: "NEET Rankers", sub: "MBBS Seats", emoji: "🩺" },
                { label: "UPSC CSE", sub: "Top Rankers", emoji: "🎖️" },
              ].map(({ label, sub, emoji }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-2xl leading-none shrink-0">{emoji}</span>
                  <div className="text-left">
                    <p className="text-sm font-extrabold text-[#171827] leading-tight">{label}</p>
                    <p className="text-xs font-semibold text-[#656779] leading-tight">{sub}</p>
                  </div>
                </div>
              ))}
              {/* 50K+ Students — avatar stack */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2 shrink-0">
                  <img src="https://i.pravatar.cc/40?img=12" alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/40?img=32" alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/40?img=45" alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-extrabold text-[#171827] leading-tight">50K+ Students</p>
                  <p className="text-xs font-semibold text-[#656779] leading-tight">Across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Replace the existing <section id="demo" ...> block in page.tsx with this */}

<section id="demo" className="px-5 pb-24 sm:px-8 sm:pb-32">
  <div className="mx-auto max-w-7xl">
    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f3f9] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#656779] border border-[#e2e4ed]">
          <span>⚡</span>
          <span>This is the actual habit</span>
        </div>
        <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-[-0.045em] sm:text-5xl">
          Tap. Recall. Swipe.{" "}
          <span className="relative inline-block text-[#5960d7]">
            Remember.
            <svg className="absolute left-0 bottom-[-6px] w-full h-2 text-[#b0b5ff]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" preserveAspectRatio="none">
              <path d="M3 7 C 30 4, 70 9, 97 6" />
            </svg>
          </span>
        </h2>
      </div>
      <p className="max-w-md text-base leading-7 text-[#666879]">
        Active Recall + Spaced Repetition turn short-term study into long-term memory.
      </p>
    </div>

{/* Hand-drawn annotation pointing at the demo */}
    {/* Hand-drawn annotation pointing at the demo — animates in on scroll */}
<div className="relative mx-auto w-full max-w-6xl">
  <ScrollAnnotation />
  <MemoryDemo />
</div>
  </div>
</section>

      <section id="why" className="border-y border-[#e3e4ec] bg-[#fafafc] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-16">
            
            {/* Left Column (Main copy & Q&A grid) */}
            <div className="flex flex-col items-start text-left w-full">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#5960d7]">
                <span className="text-base leading-none">+</span> WHY CRAMIT WORKS
              </div>
              <h2 className="mt-4 text-balance text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#171827] font-display-serif">
                Reading feels fluent.<br/>Exams ask for<br/>
                <span className="relative inline-block text-[#5960d7]">
                  retrieval.
                  <svg className="absolute left-0 bottom-[-4px] w-full h-3 text-[#5960d7]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" preserveAspectRatio="none">
                    <path d="M2 7 C 30 4, 70 8, 98 5" />
                  </svg>
                </span>
              </h2>
              <p className="mt-6 text-[15px] leading-7 text-[#5e6070] max-w-md font-medium">
                Cramit is based on the memory science used and tested by <strong>Chirag Falor (AIR 1, JEE Adv 2020)</strong> and toppers of JEE, NEET & UPSC. Master active recall to go 2x further. Forgetting is optional.
              </p>
              
              {/* Badges */}
              <div className="mt-8 flex flex-wrap gap-2 text-[11px] font-bold text-[#5c5d6e]">
                {["JEE Advanced", "JEE Main", "NEET", "UPSC CSE Toppers"].map((b) => (
                  <span key={b} className="inline-flex items-center rounded-full bg-white border border-[#e5e7eb] px-4 py-1.5 shadow-sm">
                    {b}
                  </span>
                ))}
              </div>
              
              {/* Study Science Cards Grid */}
              <div className="mt-10 w-full">
                <StudyMethodQA />
              </div>
            </div>

            {/* Right Column (Forgetting Curve SVG & Quote Card) */}
            <div className="space-y-6 text-left">
              
              {/* Forgetting Curve Widget */}
              <div className="rounded-3xl border border-[#e2e4ed] bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex justify-between items-center pb-4">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#5960d7]">THE FORGETTING CURVE</span>
                    <h3 className="text-[17px] font-bold text-[#171827] mt-1 tracking-tight">Memory fades. Every useful recall pushes it back.</h3>
                  </div>
                  <Brain className="text-[#6269e8] shrink-0" size={24} />
                </div>
                
                <div className="w-full mt-4">
                  <ForgettingCurveGraphicSVG />
                </div>
                <p className="mt-6 text-[11px] leading-5 text-[#858798] font-medium">
                  Each recall creates mental checkpoints that make memories stick for the long run.
                </p>
              </div>

              {/* Topper Quote Card */}
              <div className="texture-lined bg-white border border-[#e2e4ed] rounded-3xl p-8 shadow-sm">
                <span className="text-5xl font-serif text-[#5960d7] font-black leading-none block mb-2">“</span>
                <blockquote className="font-handwritten text-3xl font-bold text-[#171827] leading-relaxed">
                  I didn&apos;t study more.<br/>
                  I just remembered <span className="relative inline-block">better.<svg className="absolute left-0 bottom-[-4px] w-full h-2 text-[#5960d7]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M2 7 C 30 5, 70 8, 98 4" /></svg></span>&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef0ff] text-[#5960d7]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#171827]">Anshul Yadav</div>
                    <div className="text-[11px] font-semibold text-[#858798] mt-0.5">Top ranker, JEE ADVANCED 2024</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section id="features" className="px-5 py-24 sm:px-8 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column (Highlights Copy) */}
            <div className="lg:col-span-5 text-left flex flex-col items-start">
              <p className="landing-kicker">FEWER DECISIONS. BETTER FOCUS.</p>
              <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.052em] sm:text-6xl font-display-serif">
                Everything you need.<br/>Nothing you don&apos;t.
              </h2>
              
              <div className="mt-10 space-y-6">
                {[
                  { title: "Algorithmic scheduling", desc: "Smart reviews at the right time.", icon: Clock3, color: "text-[#5960d7] bg-[#eef0ff] border-[#dbe0ff]" },
                  { title: "Chapter & topic based decks", desc: "Curated for JEE, NEET & UPSC.", icon: Layers3, color: "text-[#b45739] bg-[#fff0ea] border-[#ffdcd2]" },
                  { title: "Progress that matters", desc: "Track memory strength, not just marks.", icon: Brain, color: "text-[#58721f] bg-[#eef9d9] border-[#e1ecc8]" },
                  { title: "Works offline", desc: "Learn anytime, anywhere.", icon: WifiOff, color: "text-[#5960d7] bg-[#eef0ff] border-[#dbe0ff]" },
                ].map(({ title, desc, icon: Icon, color }) => (
                  <div key={title} className="flex gap-4">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${color}`}>
                      <Icon size={18} />
                    </span>
                    <div>
                      <h4 className="text-base font-extrabold text-[#171827]">{title}</h4>
                      <p className="mt-1 text-sm text-[#656779] font-medium">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (2x2 Dashboard Analytics Grid) */}
            <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2 text-left">
              
              {/* Card 1: Memory Strength (Dark card) */}
              <div className="rounded-3xl border border-white/10 bg-[#171827] p-6 text-white shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#9aa0af]">Memory strength</p>
                  <span className="text-xs font-bold text-[#9ea3ff] bg-[#222444] px-2.5 py-1 rounded-full border border-[#2d3062]">Excellent</span>
                </div>
                <div className="relative mt-5 flex justify-center items-center py-4">
                  <svg className="w-24 h-24" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#8c92ff]"
                      strokeWidth="3.5"
                      strokeDasharray="83, 100"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute font-mono text-2xl font-black">83%</div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-[#b9bac7]">
                  <span>83% Retained</span>
                  <span>17% Vulnerable</span>
                </div>
              </div>

              {/* Card 2: Streak (Light card) */}
              <div className="rounded-3xl border border-[#e2e4ed] bg-white p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center pb-3 border-b border-[#f1f3f9]">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#9aa0af]">Streak</p>
                  <span className="text-xs font-extrabold text-[#ca8a04] bg-[#fffcf0] px-2 py-0.5 rounded-full border border-[#fef08a] flex items-center gap-1">
                    🔥 Active
                  </span>
                </div>
                <div className="my-5 flex flex-col items-center py-2">
                  <div className="text-5xl font-black text-[#171827] tracking-tight">12</div>
                  <div className="text-xs font-extrabold text-[#5960d7] uppercase tracking-wider mt-1">days streak</div>
                </div>
                <div className="flex justify-between items-center gap-1 border-t border-[#f1f3f9] pt-4">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-[9px] font-extrabold text-[#9aa0af]">{day}</span>
                      <span className={`h-2.5 w-2.5 rounded-full ${i < 6 ? "bg-[#6269e8]" : "bg-[#e2e4ed]"}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Subject Progress (Light card) */}
              <div className="rounded-3xl border border-[#e2e4ed] bg-white p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center pb-3 border-b border-[#f1f3f9] mb-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#9aa0af]">Subject progress</p>
                  <span className="text-[10px] font-bold text-[#656779]">3 Subjects</span>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Physics", percent: 88, width: "w-[88%]", color: "bg-[#6269e8]" },
                    { name: "Mathematics", percent: 72, width: "w-[72%]", color: "bg-[#2563eb]" },
                    { name: "Chemistry", percent: 65, width: "w-[65%]", color: "bg-[#b45739]" },
                  ].map((sub) => (
                    <div key={sub.name}>
                      <div className="flex justify-between text-xs font-bold text-[#24253a]">
                        <span>{sub.name}</span>
                        <span>{sub.percent}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full bg-[#f1f3f9] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${sub.color} ${sub.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Weekly Review (Light card) */}
              <div className="rounded-3xl border border-[#e2e4ed] bg-white p-6 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center pb-3 border-b border-[#f1f3f9]">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#9aa0af]">Weekly review</p>
                  <span className="text-[10px] font-bold text-[#656779]">This Week</span>
                </div>
                <div className="my-3 flex flex-col items-center">
                  <div className="text-3xl font-black text-[#171827] tracking-tight">128</div>
                  <div className="text-[10px] font-bold text-[#656779]">cards reviewed</div>
                </div>
                {/* SVG bar chart */}
                <div className="h-14 w-full flex items-end justify-between gap-1 mt-2">
                  {[20, 35, 15, 45, 60, 25, 40].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="w-full bg-[#eef0ff] rounded-t-sm relative h-10 overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-[#6269e8] rounded-t-sm" style={{ height: `${h}%` }} />
                      </div>
                      <span className="text-[8px] font-extrabold text-[#9aa0af]">{['M','T','W','T','F','S','S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <section id="teachers" className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-[#d8dae6] bg-[#f1f2ff]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="landing-kicker">For classes and coaching</p>
              <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[1.03] tracking-[-0.05em] sm:text-5xl">You teach. Cramit shows where the class is slipping.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6173]">One teacher can run multiple classes, share a code with students, and see recall, backlog, activity, and chapter-level trouble before the next test reveals it.</p>
              <Link href="/login" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#171827] px-6 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#292a42]">
                Teacher access <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="relative min-h-[430px] overflow-hidden bg-[#6269e8] p-6 sm:p-10">
              <div className="landing-teacher-card mx-auto max-w-xl rounded-2xl bg-white p-5 shadow-2xl sm:p-6">
                <div className="flex items-center justify-between border-b border-[#ececf2] pb-5">
                  <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8a8c9b]">Class overview</p><h3 className="mt-1 text-xl font-bold">JEE 2027 · Evening</h3></div>
                  <span className="rounded-lg bg-[#eef0ff] px-3 py-2 font-mono text-xs font-bold text-[#555cce]">K8R2PX</span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[[Users,"38","Students"],[BarChart3,"76%","Recall"],[Clock3,"312","Reviews"]].map(([Icon, value, label]) => {
                    const MetricIcon = Icon as typeof Users;
                    return <div key={String(label)} className="rounded-xl bg-[#f7f7fa] p-3 sm:p-4"><MetricIcon size={16} className="text-[#6269e8]" aria-hidden="true" /><p className="mt-4 text-xl font-extrabold">{String(value)}</p><p className="mt-1 text-[11px] font-semibold text-[#858795]">{String(label)}</p></div>;
                  })}
                </div>
                <div className="mt-5 rounded-xl border border-[#e6e7ef] p-4">
                  <div className="flex items-center justify-between"><p className="text-sm font-bold">Needs attention</p><span className="text-xs font-bold text-[#aa503d]">3 chapters</span></div>
                  <div className="mt-4 space-y-4">
                    {[["Rotational Motion","58%","w-[58%]"],["Organic Reactions","64%","w-[64%]"],["Probability","68%","w-[68%]"]].map(([name, value, width]) => (
                      <div key={name}><div className="flex justify-between text-xs"><span className="font-semibold text-[#555768]">{name}</span><span className="font-bold">{value}</span></div><div className="mt-2 h-1.5 rounded-full bg-[#edeef3]"><div className={`h-full rounded-full bg-[#f08a72] ${width}`} /></div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="landing-final mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-[#171827] px-7 py-16 text-center text-white sm:px-12 sm:py-24 relative isolate">
          {/* Sparkles & Floaters */}
          <div className="absolute top-8 left-8 text-white/20 animate-float-slow hidden md:block">
            <Sparkles size={28} />
          </div>
          <div className="absolute bottom-8 left-12 text-white/20 animate-float-medium hidden md:block">
            <Clock3 size={28} />
          </div>
          <div className="absolute top-8 right-12 text-white/20 animate-float-fast hidden md:block">
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M24 6 C15 6 12 15 12 24 C12 30 18 34 24 38 C30 34 36 30 36 24 C36 15 33 6 24 6 Z" />
              <path d="M24 6 L24 38" />
              <path d="M12 24 L36 24" />
            </svg>
          </div>
          <div className="absolute bottom-8 right-16 text-white/20 animate-float-slow hidden md:block">
            <Sparkles size={20} />
          </div>

          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl font-display-serif relative">
              Give tomorrow&apos;s brain<br/>
              <span className="relative inline-block mt-2">
                a fair chance.
                <svg className="absolute left-0 bottom-[-10px] w-full h-2.5 text-[#8c92ff]" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M3 7 C 30 2, 70 8, 97 5" />
                </svg>
              </span>
            </h2>
            <p className="mt-10 max-w-xl text-base sm:text-lg leading-8 text-[#b9bac7] font-semibold">
              Start building a memory that lasts. Join 50K+ students already using Cramit.
            </p>
            <div className="mt-8">
              <a
                href={BETA_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#5960d7] px-8 text-sm font-extrabold text-white transition hover:-translate-y-1 hover:bg-[#6e75e6] shadow-[0_12px_30px_rgba(89,96,215,0.3)]"
              >
                Download Android App <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-[#858798]">
              <span className="flex items-center gap-1">✓ No credit card required</span>
              <span className="flex items-center gap-1">✓ Free forever plan</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e3eb] bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="inline-flex items-center gap-2 text-xl font-extrabold tracking-[-0.04em]"><span className="text-[#6269e8]">✦</span> <span>Cramit<span className="text-[#6269e8]">.</span></span></a>
          <p className="text-[#7b7d8c]">We remember what you forget.</p>
          <div className="flex items-center gap-5 font-semibold text-[#565868]">
            <Link href="/login" className="hover:text-[#171827]">Portal login</Link>
            <a href={BETA_URL} target="_blank" rel="noreferrer" className="hover:text-[#171827]">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
