"use client";

import { useEffect, useRef, useState } from "react";

const ANNOTATION_TEXT =
  "Tap the card to flip it, then drag left if you missed it or right if recall felt easy.";

const TYPING_SPEED_MS = 22;
const ENTRANCE_DELAY_MS = 250;
const ARROW_DELAY_AFTER_TYPE_MS = 150;
const ARROW_DRAW_MS = 650;

/**
 * Hand-drawn annotation that only "performs" once it scrolls into view:
 * fades/slides in -> types the sentence out -> draws the arrow toward the
 * demo card -> fires a DOM event so the card can give a subtle response pulse.
 */
export function ScrollAnnotation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [arrowDrawn, setArrowDrawn] = useState(false);

  // Trigger once, when ~50% of the annotation is in view
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Respect reduced-motion users: just show everything immediately
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          if (prefersReducedMotion) {
            setIsVisible(true);
            setTypedText(ANNOTATION_TEXT);
            setArrowDrawn(true);
            window.dispatchEvent(new CustomEvent("cramit:demo-hint"));
          } else {
            setIsVisible(true);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Typewriter, starts a beat after the block has faded in
  useEffect(() => {
    if (!isVisible || typedText.length > 0) return;

    const startTimeout = window.setTimeout(() => {
      let index = 0;
      const interval = window.setInterval(() => {
        index += 1;
        setTypedText(ANNOTATION_TEXT.slice(0, index));

        if (index >= ANNOTATION_TEXT.length) {
          window.clearInterval(interval);
          window.setTimeout(() => setArrowDrawn(true), ARROW_DELAY_AFTER_TYPE_MS);
        }
      }, TYPING_SPEED_MS);
    }, ENTRANCE_DELAY_MS);

    return () => window.clearTimeout(startTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // Once the arrow finishes drawing, let the demo card know so it can pulse
  useEffect(() => {
    if (!arrowDrawn) return;
    const timeout = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("cramit:demo-hint"));
    }, ARROW_DRAW_MS);
    return () => window.clearTimeout(timeout);
  }, [arrowDrawn]);

  const isTypingDone = typedText.length >= ANNOTATION_TEXT.length;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute top-[25%] -left-12 z-20 hidden w-60 -rotate-3 text-left font-handwritten text-lg font-bold leading-snug text-[#5960d7] lg:block xl:-left-40"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 500ms ease, transform 500ms ease",
      }}
    >
      <span aria-hidden="true">
        {typedText}
        <span
          className="ml-0.5 -mb-0.5 inline-block w-[2px] bg-[#5960d7]"
          style={{
            height: "1em",
            opacity: isTypingDone ? 0 : 1,
            animation: isTypingDone ? "none" : "cramit-caret-blink 0.9s steps(1) infinite",
            transition: "opacity 200ms ease",
          }}
        />
      </span>
      {/* Full sentence for screen readers, no layout shift */}
      <span className="sr-only">{ANNOTATION_TEXT}</span>

      <svg
        className="absolute -right-32 top-10 h-24 w-40 overflow-visible text-[#5960d7]"
        viewBox="0 0 140 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M 10,10 C 60,-15 90,50 130,85"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: arrowDrawn ? 0 : 1,
            transition: `stroke-dashoffset ${ARROW_DRAW_MS}ms cubic-bezier(.65,0,.35,1)`,
          }}
        />
        <path
          d="M 110,80 L 130,85 L 125,65"
          style={{
            opacity: arrowDrawn ? 1 : 0,
            transform: arrowDrawn ? "scale(1)" : "scale(0.6)",
            transformOrigin: "130px 85px",
            transition: `opacity 200ms ease ${ARROW_DRAW_MS - 120}ms, transform 300ms ease ${ARROW_DRAW_MS - 120}ms`,
          }}
        />
      </svg>

      <style jsx global>{`
        @keyframes cramit-caret-blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}