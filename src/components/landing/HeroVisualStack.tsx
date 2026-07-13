// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { Check } from 'lucide-react';

// // Natural design width — the pixel canvas everything was designed on.
// // Change this if you ever redesign at a different base width.
// const DESIGN_WIDTH = 620;
// const DESIGN_HEIGHT = 620;

// export function HeroVisualStack() {
//   const outerRef = useRef<HTMLDivElement>(null);
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     if (!outerRef.current) return;
//     const el = outerRef.current;

//     const update = () => {
//       const w = el.getBoundingClientRect().width;
//       setScale(Math.min(1, w / DESIGN_WIDTH));
//     };

//     update();
//     const ro = new ResizeObserver(update);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   return (
//     // Outer column — fills the grid cell, reserves scaled height so sibling layout isn't collapsed
//     <div
//       ref={outerRef}
//       className="lg:col-span-6 relative hidden md:block select-none overflow-visible"
//       style={{ height: DESIGN_HEIGHT * scale }}
//     >
//       {/* Inner fixed canvas — all pixel positions live here */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: DESIGN_WIDTH,
//           height: DESIGN_HEIGHT,
//           transformOrigin: 'top left',
//           transform: `scale(${scale})`,
//         }}
//       >
//         {/* Rays above circular Rotate card */}
//         <div className="absolute top-[135px] left-[478px] z-10 text-[#6269e8]">
//           <svg className="w-8 h-8" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//             <path d="M15 5 L15 10" />
//             <path d="M7 10 L11 13" />
//             <path d="M23 10 L19 13" />
//           </svg>
//         </div>

//         {/* Rotate Card (Circular) */}
//         <div className="absolute top-[165px] left-[460px] z-20 w-16 h-16 rounded-full border border-[#dfe1ee] bg-white flex items-center justify-center shadow-[0_10px_25px_rgba(28,29,54,0.06)] transition-all hover:scale-[1.05] duration-300">
//           <svg className="w-7 h-7 text-[#5960d7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M23 4v6h-6" />
//             <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
//           </svg>
//         </div>

//         {/* Topper Achievement Card */}
//         <div className="absolute top-[30px] left-[10px] z-30 w-[235px] rounded-[1.5rem] border border-[#e2e4ed] bg-white p-5 shadow-[0_15px_35px_rgba(98,105,232,0.08)] rotate-[-1.5deg] transition-all hover:rotate-[-3deg] hover:scale-[1.02] duration-300">
//           <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#9aa0af]">Loved by toppers</h4>
//           <h3 className="text-lg font-black text-[#171827] tracking-tight mt-1 flex items-center gap-1.5">
//             <span>Chirag Falor</span>
//             <svg className="w-5 h-4 text-[#6269e8] shrink-0" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M12 30 C18 32 32 32 38 30 L44 14 L33 22 L25 8 L17 22 L6 14 Z" />
//               <circle cx="6" cy="14" r="1.5" fill="currentColor" />
//               <circle cx="25" cy="8" r="1.5" fill="currentColor" />
//               <circle cx="44" cy="14" r="1.5" fill="currentColor" />
//             </svg>
//           </h3>
//           <div className="text-[26px] font-black text-[#5960d7] tracking-tighter leading-none mt-1">AIR 1</div>
//           <p className="text-xs font-bold text-[#656779] mt-0.5">JEE Advanced 2020</p>
//           <div className="mt-5 space-y-2 text-xs font-extrabold text-[#242538]">
//             <div className="flex items-center gap-1.5 text-[#22c55e]">
//               <Check size={14} strokeWidth={3.5} />
//               <span className="text-[#24253a]">Uses Active Recall</span>
//             </div>
//             <div className="text-[#6269e8] pl-6 font-black text-sm">+</div>
//             <div className="flex items-center gap-1.5 text-[#22c55e]">
//               <Check size={14} strokeWidth={3.5} />
//               <span className="text-[#24253a]">Spaced Repetition</span>
//             </div>
//           </div>
//         </div>

//         {/* Physics Card */}
//         <div className="absolute top-[65px] left-[255px] z-10 w-[205px] rounded-2xl border border-[#dfe1ee] bg-white p-4 shadow-[0_15px_35px_rgba(28,29,54,0.08)] rotate-[-5deg] transition-all hover:rotate-[-7deg] hover:scale-[1.02] duration-300">
//           <div className="flex justify-between items-center">
//             <span className="inline-flex rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[9px] font-extrabold text-[#656779]">Physics</span>
//             <div className="flex gap-1 text-[#b5b7c8]">
//               <span className="w-1.5 h-1.5 rounded-full bg-current" />
//               <span className="w-1.5 h-1.5 rounded-full bg-current" />
//             </div>
//           </div>
//           <h4 className="mt-3 text-xs font-extrabold text-[#171827] leading-snug">Electromagnetic Induction</h4>
//           <div className="mt-3.5 flex items-center justify-between text-[9px] font-extrabold text-[#656779]">
//             <span>74 / 120 cards</span>
//           </div>
//           <div className="mt-1.5 h-1.5 w-full bg-[#e2e4ed] rounded-full overflow-hidden">
//             <div className="h-full bg-[#6269e8] rounded-full" style={{ width: '62%' }} />
//           </div>
//         </div>

//         {/* Today's Review Widget */}
//         <div className="absolute top-[225px] left-[160px] z-30 w-[160px] rounded-2xl border border-[#dfe1ee] bg-white p-4 shadow-[0_15px_35px_rgba(28,29,54,0.08)] rotate-[-1.5deg] transition-all hover:rotate-[-3deg] hover:scale-[1.02] duration-300">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#9aa0af]">Today&apos;s Review</p>
//               <p className="mt-1 text-2xl font-black text-[#171827] leading-none">32</p>
//               <p className="text-[10px] font-bold text-[#656779] mt-0.5">cards due</p>
//             </div>
//             <span className="rounded-xl bg-[#eef0ff] p-1.5 text-[#5960d7] border border-[#dbe0ff] shrink-0">
//               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                 <path d="M12 22 C17.5 22 22 17.5 22 12 C22 6.5 17.5 2 12 2 C6.5 2 2 6.5 2 12 C2 17.5 6.5 22 12 22 Z" />
//                 <path d="M12 6 C10.5 8 10.5 11 12 13 C13.5 11 13.5 8 12 6 Z" />
//                 <path d="M8 12 C10 10.5 13 10.5 15 12" />
//               </svg>
//             </span>
//           </div>
//           <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold text-[#22c55e]">
//             <span className="w-1.5 h-1.5 rounded-full bg-current" />
//             <span className="text-[#656779]">~ 18 min</span>
//           </div>
//         </div>

//         {/* Memory Strength Card */}
//         <div className="absolute top-[230px] left-[340px] z-20 w-[145px] rounded-2xl border border-white/10 bg-[#171827] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] rotate-[3deg] transition-all hover:rotate-[5deg] hover:scale-[1.02] duration-300 text-white">
//           <p className="text-[8px] font-bold uppercase tracking-wider text-[#9aa0af]">Memory strength</p>
//           <div className="relative mt-3 flex justify-center items-center">
//             <svg className="w-16 h-16" viewBox="0 0 36 36">
//               <path className="text-white/10" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
//               <path className="text-[#8c92ff]" strokeWidth="3.5" strokeDasharray="83, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
//             </svg>
//             <div className="absolute font-mono text-xs font-black">83%</div>
//           </div>
//           <p className="mt-2.5 text-center text-[9px] font-bold text-[#b9bac7]">Keep it up!</p>
//         </div>

//         {/* Brain/Cloud Doodle */}
//         <div className="absolute top-[315px] left-[522px] z-30 text-[#6269e8]">
//           <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M28 45 C20 45 14 42 12 36 C10 30 12 24 16 22 C12 18 16 10 24 12 C28 10 30 14 30 18" />
//             <path d="M32 18 C32 14 34 10 38 12 C46 10 50 18 46 22 C50 24 52 30 50 36 C48 42 42 45 34 45" />
//             <path d="M30 18 L30 42" />
//             <path d="M20 20 Q16 22 22 26" />
//             <path d="M42 20 Q46 22 40 26" />
//             <path d="M18 32 Q24 30 22 36" />
//             <path d="M44 32 Q38 30 40 36" />
//           </svg>
//         </div>

//         {/* Doodle 1: Trusted by the best */}
//         <div className="absolute top-[-30px] left-[235px] z-10 font-handwritten text-sm font-black text-[#6269e8] rotate-[-5deg] text-center leading-tight">
//           <span>Trusted by<br/>the best</span>
//         </div>
//         <div className="absolute top-[-10px] left-[205px] z-10 text-[#6269e8] rotate-[10deg]">
//           <svg className="w-10 h-8" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//             <path d="M40 5 C30 5 20 12 12 22" />
//             <path d="M12 14 L12 22 L20 20" />
//           </svg>
//         </div>

//         {/* Doodle 2: Track your progress */}
//         <div className="absolute top-[20px] left-[485px] z-10 font-handwritten text-sm font-black text-[#6269e8] rotate-[4deg] text-center leading-tight">
//           <span>Track your<br/>progress</span>
//         </div>
//         <div className="absolute top-[48px] left-[465px] z-10 text-[#6269e8] rotate-[-5deg]">
//           <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//             <path d="M35 10 C28 10 26 18 29 22 C32 26 36 22 30 18 C24 14 16 22 10 28" />
//             <path d="M16 27 L10 28 L11 20" />
//           </svg>
//         </div>

//         {/* Doodle 3: Daily goals — U-shape arrow */}
//         <div className="absolute top-[300px] left-[5px] z-10 font-handwritten text-[13px] font-black text-[#6269e8] rotate-[-6deg] max-w-[110px] text-right leading-tight">
//           <span>Daily goals<br/>to stay on track</span>
//         </div>
//         <div className="absolute top-[328px] left-[112px] z-10 text-[#6269e8]">
//           <svg className="w-16 h-16" viewBox="0 0 70 65" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M8 5 C8 30 30 55 58 35" />
//             <path d="M50 28 L58 35 L52 42" />
//           </svg>
//         </div>

//         {/* Doodle 4: Proven techniques */}
//         <div className="absolute bottom-[-70px] left-[150px] z-50 font-handwritten text-[13px] font-black text-[#6269e8] rotate-[2deg] text-center leading-tight">
//           <span>Proven techniques<br/>that work</span>
//         </div>
//         <div className="absolute bottom-[-60px] left-[265px] z-50 text-[#6269e8] rotate-[2deg]">
//           <svg className="w-12 h-10" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
//             <path d="M10 30 C20 30 35 22 42 10" />
//             <path d="M35 10 L42 10 L40 18" />
//           </svg>
//         </div>

//         {/* Doodle 5: Revise Today */}
//         <div className="absolute top-[247px] left-[562px] z-10 font-handwritten text-sm font-black text-[#6269e8] rotate-[6deg] text-center leading-tight">
//           <span>Revise<br/>Today</span>
//         </div>
//         {/* Arrow → Rotate card */}
//         <div className="absolute top-[198px] left-[539px] z-10 text-[#6269e8]">
//           <svg className="w-16 h-11" viewBox="0 0 62 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//             <path d="M58 40 C48 28 32 14 8 6" />
//             <path d="M18 4 L8 6 L11 16" />
//           </svg>
//         </div>
//         {/* Arrow → brain doodle */}
//         <div className="absolute top-[280px] left-[545px] z-10 text-[#6269e8]">
//           <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//             <path d="M32 6 C24 14 16 22 6 34" />
//             <path d="M6 24 L6 34 L16 31" />
//           </svg>
//         </div>

//         {/* Doodle 6: Stronger memory */}
//         <div className="absolute top-[372px] left-[523px] z-10 font-handwritten text-sm font-black text-[#6269e8] rotate-[-5deg] text-center leading-tight">
//           <span>Stronger<br/>memory</span>
//         </div>
//         <div className="absolute top-[405px] left-[508px] z-10 text-[#6269e8]">
//           <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//             <path d="M35 10 C28 12 18 22 10 32" />
//             <path d="M10 24 L10 32 L18 30" />
//           </svg>
//         </div>

//         {/* Bottom Horizontal Features Bar */}
//         <div className="absolute bottom-[-20px] left-[-20px] right-[-20px] z-40 bg-white/95 rounded-full border border-[#e2e4ed] px-6 py-3.5 shadow-[0_15px_35px_rgba(98,105,232,0.08)] flex items-center justify-between gap-2.5">
//           {/* Active Recall */}
//           <div className="flex items-center gap-2.5">
//             <span className="rounded-full bg-[#f0f2ff] p-2 text-[#5960d7] shrink-0">
//               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//               </svg>
//             </span>
//             <div>
//               <h5 className="text-[11px] font-black text-[#171827] leading-tight">Active Recall</h5>
//               <p className="text-[9px] font-bold text-[#656779] leading-none mt-0.5">Builds strong memory</p>
//             </div>
//           </div>

//           {/* Spaced Repetition */}
//           <div className="flex items-center gap-2.5">
//             <span className="rounded-full bg-[#f0f2ff] p-2 text-[#5960d7] shrink-0">
//               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="10" />
//                 <polyline points="12 6 12 12 16 14" />
//               </svg>
//             </span>
//             <div>
//               <h5 className="text-[11px] font-black text-[#171827] leading-tight">Spaced Repetition</h5>
//               <p className="text-[9px] font-bold text-[#656779] leading-none mt-0.5">Perfectly timed reviews</p>
//             </div>
//           </div>

//           {/* Better Retention */}
//           <div className="flex items-center gap-2.5">
//             <span className="rounded-full bg-[#f0f2ff] p-2 text-[#5960d7] shrink-0">
//               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
//                 <polyline points="17 6 23 6 23 12" />
//               </svg>
//             </span>
//             <div>
//               <h5 className="text-[11px] font-black text-[#171827] leading-tight">Better Retention</h5>
//               <p className="text-[9px] font-bold text-[#656779] leading-none mt-0.5">Remember longer</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

// Natural design width — the pixel canvas everything was designed on.
// Change this if you ever redesign at a different base width.
const DESIGN_WIDTH = 620;
const DESIGN_HEIGHT = 620;

// How far the real artwork bleeds past the nominal 0..DESIGN_HEIGHT box,
// because several doodles/bars are positioned with negative offsets
// (top-[-30px], bottom-[-70px], bottom-[-20px] etc). Reserving space for
// this bleed keeps the illustration from overlapping the sections above
// and below it, or getting clipped by an ancestor's overflow-hidden.
const BLEED_TOP = 40;
const BLEED_BOTTOM = 20;

export function HeroVisualStack() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!outerRef.current) return;
    const el = outerRef.current;

    const update = () => {
      const w = el.getBoundingClientRect().width;
      setScale(Math.min(1, w / DESIGN_WIDTH));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    // Outer column — fills the grid cell, reserves scaled height (including
    // bleed) so sibling layout below it isn't overlapped or collapsed
    <div
      ref={outerRef}
      className="lg:col-span-6 relative hidden md:block select-none overflow-visible flex justify-center mt-2"   
       style={{ height: (DESIGN_HEIGHT + BLEED_TOP + BLEED_BOTTOM) * scale }}
    >
      {/* Inner fixed canvas — all pixel positions live here */}
      <div
        style={{
        position: 'absolute',
        top: BLEED_TOP * scale,
        left: '50%',
        marginLeft: -(DESIGN_WIDTH * scale) / 2,
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
      }}
      >
        {/* Rays above circular Rotate card */}
        <div className="absolute top-[135px] left-[478px] z-10 text-[#6269e8]">
          <svg className="w-8 h-8" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 5 L15 10" />
            <path d="M7 10 L11 13" />
            <path d="M23 10 L19 13" />
          </svg>
        </div>

        {/* Rotate Card (Circular) */}
        <div className="absolute top-[165px] left-[460px] z-20 w-16 h-16 rounded-full border border-[#dfe1ee] bg-white flex items-center justify-center shadow-[0_10px_25px_rgba(28,29,54,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_32px_rgba(28,29,54,0.12)]">
          <svg className="w-7 h-7 text-[#5960d7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </div>

        {/* Topper Achievement Card */}
        <div className="absolute top-[30px] left-[10px] z-30 w-[235px] rounded-[1.5rem] border border-[#e2e4ed] bg-white p-5 shadow-[0_15px_35px_rgba(98,105,232,0.08)] rotate-[-1.5deg] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(98,105,232,0.14)]">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#9aa0af]">Loved by toppers</h4>
          <h3 className="text-lg font-black text-[#171827] tracking-tight mt-1 flex items-center gap-1.5">
            <span>Chirag Falor</span>
            <svg className="w-5 h-4 text-[#6269e8] shrink-0" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 30 C18 32 32 32 38 30 L44 14 L33 22 L25 8 L17 22 L6 14 Z" />
              <circle cx="6" cy="14" r="1.5" fill="currentColor" />
              <circle cx="25" cy="8" r="1.5" fill="currentColor" />
              <circle cx="44" cy="14" r="1.5" fill="currentColor" />
            </svg>
          </h3>
          <div className="text-[26px] font-black text-[#5960d7] tracking-tighter leading-none mt-1">AIR 1</div>
          <p className="text-xs font-bold text-[#656779] mt-0.5">JEE Advanced 2020</p>
          <div className="mt-5 space-y-2 text-xs font-extrabold text-[#242538]">
            <div className="flex items-center gap-1.5 text-[#22c55e]">
              <Check size={14} strokeWidth={3.5} />
              <span className="text-[#24253a]">Uses Active Recall</span>
            </div>
            <div className="text-[#6269e8] pl-6 font-black text-sm">+</div>
            <div className="flex items-center gap-1.5 text-[#22c55e]">
              <Check size={14} strokeWidth={3.5} />
              <span className="text-[#24253a]">Spaced Repetition</span>
            </div>
          </div>
        </div>

        {/* Physics Card */}
        <div className="absolute top-[65px] left-[255px] z-10 w-[205px] rounded-2xl border border-[#dfe1ee] bg-white p-4 shadow-[0_15px_35px_rgba(28,29,54,0.08)] rotate-[-5deg] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(28,29,54,0.14)]">
          <div className="flex justify-between items-center">
            <span className="inline-flex rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[9px] font-extrabold text-[#656779]">Physics</span>
            <div className="flex gap-1 text-[#b5b7c8]">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>
          </div>
          <h4 className="mt-3 text-xs font-extrabold text-[#171827] leading-snug">Electromagnetic Induction</h4>
          <div className="mt-3.5 flex items-center justify-between text-[9px] font-extrabold text-[#656779]">
            <span>74 / 120 cards</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full bg-[#e2e4ed] rounded-full overflow-hidden">
            <div className="h-full bg-[#6269e8] rounded-full" style={{ width: '62%' }} />
          </div>
        </div>

        {/* Today's Review Widget */}
        <div className="absolute top-[225px] left-[160px] z-30 w-[160px] rounded-2xl border border-[#dfe1ee] bg-white p-4 shadow-[0_15px_35px_rgba(28,29,54,0.08)] rotate-[-1.5deg] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(28,29,54,0.14)]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#9aa0af]">Today&apos;s Review</p>
              <p className="mt-1 text-2xl font-black text-[#171827] leading-none">32</p>
              <p className="text-[10px] font-bold text-[#656779] mt-0.5">cards due</p>
            </div>
            <span className="rounded-xl bg-[#eef0ff] p-1.5 text-[#5960d7] border border-[#dbe0ff] shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 22 C17.5 22 22 17.5 22 12 C22 6.5 17.5 2 12 2 C6.5 2 2 6.5 2 12 C2 17.5 6.5 22 12 22 Z" />
                <path d="M12 6 C10.5 8 10.5 11 12 13 C13.5 11 13.5 8 12 6 Z" />
                <path d="M8 12 C10 10.5 13 10.5 15 12" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold text-[#22c55e]">
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span className="text-[#656779]">~ 18 min</span>
          </div>
        </div>

        {/* Memory Strength Card */}
        <div className="absolute top-[230px] left-[340px] z-20 w-[145px] rounded-2xl border border-white/10 bg-[#171827] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] rotate-[3deg] transition-shadow duration-300 hover:shadow-[0_26px_50px_rgba(0,0,0,0.22)] text-white">
          <p className="text-[8px] font-bold uppercase tracking-wider text-[#9aa0af]">Memory strength</p>
          <div className="relative mt-3 flex justify-center items-center">
            <svg className="w-16 h-16" viewBox="0 0 36 36">
              <path className="text-white/10" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-[#8c92ff]" strokeWidth="3.5" strokeDasharray="83, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute font-mono text-xs font-black">83%</div>
          </div>
          <p className="mt-2.5 text-center text-[9px] font-bold text-[#b9bac7]">Keep it up!</p>
        </div>

        {/* Brain/Cloud Doodle */}
        <div className="absolute top-[315px] left-[522px] z-30 text-[#6269e8]">
          <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M28 45 C20 45 14 42 12 36 C10 30 12 24 16 22 C12 18 16 10 24 12 C28 10 30 14 30 18" />
            <path d="M32 18 C32 14 34 10 38 12 C46 10 50 18 46 22 C50 24 52 30 50 36 C48 42 42 45 34 45" />
            <path d="M30 18 L30 42" />
            <path d="M20 20 Q16 22 22 26" />
            <path d="M42 20 Q46 22 40 26" />
            <path d="M18 32 Q24 30 22 36" />
            <path d="M44 32 Q38 30 40 36" />
          </svg>
        </div>

        {/* Doodle 1: Trusted by the best */}
        <div className="absolute top-[-30px] left-[235px] z-10 font-handwritten text-sm font-black text-[#6269e8] rotate-[-5deg] text-center leading-tight">
          <span>Trusted by<br/>the best</span>
        </div>
        <div className="absolute top-[-10px] left-[205px] z-10 text-[#6269e8] rotate-[10deg]">
          <svg className="w-10 h-8" viewBox="0 0 50 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M40 5 C30 5 20 12 12 22" />
            <path d="M12 14 L12 22 L20 20" />
          </svg>
        </div>

        {/* Doodle 2: Track your progress */}
        <div className="absolute top-[20px] left-[485px] z-10 font-handwritten text-sm font-black text-[#6269e8] rotate-[4deg] text-center leading-tight">
          <span>Track your<br/>progress</span>
        </div>
        <div className="absolute top-[48px] left-[465px] z-10 text-[#6269e8] rotate-[-5deg]">
          <svg className="w-10 h-10" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M35 10 C28 10 26 18 29 22 C32 26 36 22 30 18 C24 14 16 22 10 28" />
            <path d="M16 27 L10 28 L11 20" />
          </svg>
        </div>

        {/* Doodle 3: Daily goals — U-shape arrow */}
        <div className="absolute top-[300px] left-[5px] z-10 font-handwritten text-[13px] font-black text-[#6269e8] rotate-[-6deg] max-w-[110px] text-right leading-tight">
          <span>Daily goals<br/>to stay on track</span>
        </div>
        <div className="absolute top-[328px] left-[112px] z-10 text-[#6269e8]">
          <svg className="w-16 h-16" viewBox="0 0 70 65" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 5 C8 30 30 55 58 35" />
            <path d="M50 28 L58 35 L52 42" />
          </svg>
        </div>

        {/* Doodle 4: Proven techniques */}
        <div className="absolute bottom-[60px] left-[150px] z-50 font-handwritten text-[13px] font-black text-[#6269e8] rotate-[2deg] text-center leading-tight">
          <span>Proven techniques<br/>that work</span>
        </div>
        <div className="absolute bottom-[70px] left-[265px] z-50 text-[#6269e8] rotate-[2deg]">
          <svg className="w-12 h-10" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M10 30 C20 30 35 22 42 10" />
            <path d="M35 10 L42 10 L40 18" />
          </svg>
        </div>

        {/* Doodle 5: Revise Today */}
        <div className="absolute top-[247px] left-[562px] z-10 font-handwritten text-sm font-black text-[#6269e8] rotate-[6deg] text-center leading-tight">
          <span>Revise<br/>Today</span>
        </div>
        {/* Arrow → Rotate card */}
        <div className="absolute top-[198px] left-[539px] z-10 text-[#6269e8]">
          <svg className="w-16 h-11" viewBox="0 0 62 44" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M58 40 C48 28 32 14 8 6" />
            <path d="M18 4 L8 6 L11 16" />
          </svg>
        </div>
        {/* Arrow → brain doodle */}
        <div className="absolute top-[280px] left-[545px] z-10 text-[#6269e8]">
          <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M32 6 C24 14 16 22 6 34" />
            <path d="M6 24 L6 34 L16 31" />
          </svg>
        </div>

        {/* Doodle 6: Stronger memory */}
        <div className="absolute top-[372px] left-[523px] z-10 font-handwritten text-sm font-black text-[#6269e8] rotate-[-5deg] text-center leading-tight">
          <span>Stronger<br/>memory</span>
        </div>
        <div className="absolute top-[405px] left-[508px] z-10 text-[#6269e8]">
          <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M35 10 C28 12 18 22 10 32" />
            <path d="M10 24 L10 32 L18 30" />
          </svg>
        </div>

        {/* Bottom Horizontal Features Bar */}
         <div className="absolute bottom-[110px] left-[10px] right-[10px] z-40 bg-white/95 rounded-full border border-[#e2e4ed] px-4 py-2.5 shadow-[0_15px_35px_rgba(98,105,232,0.08)] flex items-center justify-between gap-x-5">
          {/* Active Recall */}
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-[#f0f2ff] p-2 text-[#5960d7] shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <div>
              <h5 className="text-[10px] font-black text-[#171827] leading-tight">Active Recall</h5>
              <p className="text-[8px] font-bold text-[#656779] leading-none mt-0.5">Builds strong memory</p>
            </div>
          </div>

          {/* Spaced Repetition */}
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-[#f0f2ff] p-2 text-[#5960d7] shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <div>
              <h5 className="text-[10px] font-black text-[#171827] leading-tight">Spaced Repetition</h5>
              <p className="text-[8px] font-bold text-[#656779] leading-none mt-0.5">Perfectly timed reviews</p>
            </div>
          </div>

          {/* Better Retention */}
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-[#f0f2ff] p-2 text-[#5960d7] shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </span>
            <div>
              <h5 className="text-[10px] font-black text-[#171827] leading-tight">Better Retention</h5>
              <p className="text-[8px] font-bold text-[#656779] leading-none mt-0.5">Remember longer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}