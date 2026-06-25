import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Zap, Clock, CheckCircle2, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500/30">
      
      {/* 
        ========================================
        HERO SECTION 
        ========================================
      */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        {/* Decorative background blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl rounded-full mix-blend-multiply filter" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 border border-indigo-100 dark:border-indigo-500/20">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse"></span>
              Crack NEET & JEE with Confidence
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Master JEE & NEET with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Cramit</span>.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Revision is the key to top ranks. Cramit helps you memorize critical formulas, organic chemistry reactions, and biology diagrams through scientifically-proven active recall.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
              >
                Download the App <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all"
              >
                See how it works
              </a>
            </div>

            {/* Hero Mockup Placeholder */}
            <div className="mt-20 w-full max-w-5xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative aspect-[16/9] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
                <div className="text-slate-500 flex flex-col items-center gap-4">
                  <Image src="/next.svg" alt="App Mockup" width={100} height={100} className="opacity-50 dark:invert" />
                  <p className="text-lg font-medium">JEE & NEET Revision Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FEATURES SECTION ("Why you should choose Cramit")
        ========================================
      */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why you should choose Cramit
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Designed specifically to tackle the vast syllabus of JEE and NEET, helping you retain high-yield concepts and boost your speed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Formula & Reaction Mastery</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Revise Physics equations, Organic Chemistry mechanisms, and Physical Chemistry formulas using smart flashcards engineered for fast recall.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">High-Yield NCERT Focus</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Perfect for NEET aspirants. Master every single line, diagram label, and table from NCERT Biology and Chemistry with zero omissions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Targeted PYQ Revision</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Identify weak areas from past years' papers and prioritize reviewing them automatically before your actual test day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        BOTTOM CTA SECTION
        ========================================
      */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-900" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to secure your seat?
          </h2>
          <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">
            Start revision the smart way. Download Cramit now and stay ahead of the competition.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/login" 
              className="px-8 py-4 text-lg font-bold text-indigo-600 bg-white hover:bg-slate-50 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95"
            >
              Start Revising Now
            </Link>
            <span className="flex items-center gap-2 text-indigo-100 text-sm mt-4 sm:mt-0 sm:ml-4">
              <CheckCircle2 className="w-4 h-4" /> Best for JEE/NEET 2026/2027
            </span>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FOOTER
        ========================================
      */}
      <footer className="bg-white dark:bg-slate-950 py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Cramit
              </span>
              <span className="text-slate-400 text-sm ml-2">© {new Date().getFullYear()}</span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms</a>
              <Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold">Login</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
