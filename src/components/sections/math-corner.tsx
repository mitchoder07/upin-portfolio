"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, RefreshCw, Lightbulb } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ===== MathCorner =====
// A small section that reveals the user is a mathematician at heart
// and loves puzzles. Visitors get a rotating math riddle with a
// "reveal answer" button, plus a Sierpinski triangle that builds itself
// with the chaos-game algorithm.

interface Puzzle {
  question: string;
  answer: string;
  hint?: string;
  source?: string;
}

const PUZZLES: Puzzle[] = [
  {
    question: "what's the next number? 1, 1, 2, 3, 5, 8, ...",
    answer: "13. each term is the sum of the two before it. this is the fibonacci sequence, where the ratio between consecutive terms approaches the golden ratio.",
    hint: "add the previous two",
    source: "fibonacci, 1202 AD",
  },
  {
    question: "a bat and a ball cost $1.10 total. the bat costs $1.00 more than the ball. how much does the ball cost?",
    answer: "$0.05. the quick-instinct answer is $0.10, but then the bat would be $1.10 (a dollar more than a dime) and the total would be $1.20. the ball is a nickel, the bat is $1.05.",
    hint: "it's not 10 cents",
    source: "classic cognitive reflection test",
  },
  {
    question: "what's special about the number 1729?",
    answer: "it's the smallest positive integer expressible as the sum of two cubes in two different ways. 1729 = 1³ + 12³ = 9³ + 10³. ramanujan told hardy this off the top of his head in a taxi. the number is now called the 'hardy-ramanujan number'.",
    hint: "ramanujan knew it cold",
    source: "the hardy-ramanujan taxi ride, 1918",
  },
  {
    question: "sum the integers from 1 to 100. quickly.",
    answer: "5050. gauss figured this out as a kid: pair 1 with 100, 2 with 99, 3 with 98, and so on. you get 50 pairs each summing to 101. 50 × 101 = 5050.",
    hint: "pair them up",
    source: "young gauss, ~1785",
  },
  {
    question: "you have 3 apples. you take away 2. how many apples do you have?",
    answer: "2. you took them. the trick is the verb 'take' — you're left holding the 2 you took, not the 1 that remained in the pile.",
    hint: "read it carefully",
    source: "a riddle that has angered many",
  },
  {
    question: "what's the only number whose english letter-spelling is in alphabetical order?",
    answer: "40. 'forty' — f, o, r, t, y. all five letters appear in alphabetical order. no other english number-word has this property.",
    hint: "it's between 30 and 50",
    source: "trivia that has delighted nerds for decades",
  },
  {
    question: "what's the next letter? O, T, T, F, F, S, S, ...",
    answer: "E. they're the first letters of the cardinal numbers: one, two, three, four, five, six, seven... so next is eight. E.",
    hint: "say the numbers out loud",
    source: "a sequence that clicks once you hear it",
  },
  {
    question: "if you fold a piece of paper 50 times, how thick is it?",
    answer: "roughly the distance from here to the sun. each fold doubles the thickness. 2⁵⁰ layers of 0.1mm paper is about 113 million km. in practice you can't fold paper more than ~7-12 times, but mathematically the explosion is real.",
    hint: "exponential growth is no joke",
    source: "the classic 'fold to the moon' problem",
  },
];

function SierpinskiViz() {
  const POINTS_PER_FRAME = 200;
  const MAX_POINTS = 4000;
  const seed = useMemo(() => {
    let s = 12345;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }, []);

  const vertices = useMemo(
    () => [
      { x: 50, y: 8 },
      { x: 8, y: 92 },
      { x: 92, y: 92 },
    ],
    []
  );

  const allPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    let p = { x: 50, y: 50 };
    for (let i = 0; i < MAX_POINTS; i++) {
      const v = vertices[Math.floor(seed() * 3)];
      p = { x: (p.x + v.x) / 2, y: (p.y + v.y) / 2 };
      if (i > 5) pts.push(p);
    }
    return pts;
  }, [seed, vertices]);

  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    if (visibleCount >= allPoints.length) return;
    const id = setInterval(() => {
      setVisibleCount((c) => Math.min(c + POINTS_PER_FRAME, allPoints.length));
    }, 50);
    return () => clearInterval(id);
  }, [allPoints.length, visibleCount]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-background/40">
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {vertices.map((v, i) => (
          <circle key={i} cx={v.x} cy={v.y} r={1.4} fill="var(--neon)" opacity={0.9} />
        ))}
        {allPoints.slice(0, visibleCount).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={0.18} fill="var(--neon)" opacity={0.65} />
        ))}
      </svg>
      <div className="absolute bottom-2 left-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        sierpinski · chaos game · {visibleCount} pts
      </div>
    </div>
  );
}

export function MathCorner() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * PUZZLES.length));
  const [revealed, setRevealed] = useState(false);
  const puzzle = PUZZLES[idx];

  const next = () => {
    setIdx((i) => (i + 1) % PUZZLES.length);
    setRevealed(false);
  };

  useEffect(() => {
    setRevealed(false);
  }, [idx]);

  return (
    <section id="math" className="section-pad relative overflow-hidden">
      <div className="container-max">
        <SectionHeading
          badge="Math & puzzles"
          heading="Frontend by day, math nerd by night."
          subheading="A little corner for the part of me that geeks out over fibonacci, ramanujan, and riddles that look easy until they aren't. try one below — there's no shame in peeking at the answer."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
          <div className="space-y-3">
            <SierpinskiViz />
            <p className="text-xs leading-relaxed text-muted-foreground">
              three vertices, one random point, one rule: jump halfway to a random vertex. repeat thousands of times and this fractal emerges from chaos. no drawing, just a single rule.
            </p>
          </div>

          <div className="flex flex-col rounded-2xl border border-border bg-background/40 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--neon)]/30 bg-[var(--neon)]/5 px-3 py-1 text-xs font-medium text-[var(--neon)]">
                <Lightbulb className="h-3.5 w-3.5" />
                puzzle of the visit
              </div>
              <button
                onClick={next}
                data-cursor="pointer"
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <RefreshCw className="h-3 w-3" />
                try another
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-1 flex-col"
              >
                <p className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
                  {puzzle.question}
                </p>

                {puzzle.hint && !revealed && (
                  <p className="mt-3 text-xs italic text-muted-foreground">
                    hint: {puzzle.hint}
                  </p>
                )}

                <div className="mt-4 flex-1">
                  <AnimatePresence>
                    {revealed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl border border-[var(--neon)]/30 bg-[var(--neon)]/5 p-4">
                          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--neon)]">
                            <Sparkles className="h-3 w-3" />
                            answer
                          </div>
                          <p className="text-sm leading-relaxed text-foreground/90">
                            {puzzle.answer}
                          </p>
                          {puzzle.source && (
                            <p className="mt-2 text-[11px] italic text-muted-foreground">
                              — {puzzle.source}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {!revealed ? (
                    <Button
                      onClick={() => setRevealed(true)}
                      size="sm"
                      variant="outline"
                      className="h-9 rounded-full"
                      data-cursor="pointer"
                    >
                      <Eye className="mr-2 h-3.5 w-3.5" />
                      reveal answer
                    </Button>
                  ) : (
                    <Button
                      onClick={next}
                      size="sm"
                      className="h-9 rounded-full bg-foreground text-background hover:bg-foreground/90"
                      data-cursor="pointer"
                    >
                      <RefreshCw className="mr-2 h-3.5 w-3.5" />
                      next puzzle
                    </Button>
                  )}
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {idx + 1} / {PUZZLES.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
