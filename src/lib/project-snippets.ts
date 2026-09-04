export type CodeSnippet = {
  language: string;
  filename: string;
  code: string;
};

// Project order (9 projects total):
//   0. Al-Bashir Academy LMS Portal
//   1. Rafaab
//   2. Your Studio: Logo Portfolio
//   3. Cybersecurity Engineer Portfolio
//   4. Baca
//   5. Is There Light? (Coming Soon — null)
//   6. Cyber Bot
//   7. Cyber-Words Guess
//   8. Portfolio v1
export const projectCodeSnippets: (CodeSnippet | null)[] = [
  // 1. Al-Bashir Academy LMS — course analytics dashboard card (TypeScript)
  {
    language: "typescript",
    filename: "al-bashir/analytics-card.tsx",
    code: `import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

interface CourseAnalyticsProps {
  courseTitle: string;
  completionData: { week: string; completions: number }[];
  activeStudents: number;
}

/**
 * Al-Bashir Academy LMS — Course analytics card.
 * Part of the instructor-facing dashboard, built with Recharts.
 */
export function CourseAnalyticsCard(props: CourseAnalyticsProps) {
  const { courseTitle, completionData, activeStudents } = props;

  return (
    <div className="analytics-card">
      <header className="analytics-header">
        <h3>{courseTitle}</h3>
        <span className="active-count">{activeStudents} active students</span>
      </header>

      <div className="analytics-chart">
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={completionData}>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="completions"
              stroke="var(--brand-gold)"
              fill="var(--brand-gold)"
              fillOpacity={0.15}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <footer className="analytics-footer">
        <span>Weekly completions</span>
      </footer>
    </div>
  );
}`,
  },

  // 2. Rafaab — AI shopping assistant + flash sale countdown (TypeScript/React)
  {
    language: "typescript",
    filename: "rafaab/flash-sale.tsx",
    code: `"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Rafaab — Flash sale countdown.
 * Live countdown + Paystack-ready CTA. Mobile-first.
 */
export function FlashSaleCountdown({ endsAt }: { endsAt: string }) {
  const [remaining, setRemaining] = useState(() => msLeft(endsAt));

  useEffect(() => {
    const id = setInterval(() => setRemaining(msLeft(endsAt)), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  if (remaining <= 0) {
    return <div className="flash-ended">Sale ended</div>;
  }

  const parts = splitDuration(remaining);

  return (
    <motion.div
      className="flash-countdown"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {parts.map((p) => (
        <div key={p.label} className="flash-part">
          <span className="flash-value">{p.value}</span>
          <span className="flash-label">{p.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

function msLeft(iso: string) {
  return Math.max(0, new Date(iso).getTime() - Date.now());
}

function splitDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  return [
    { label: "HRS", value: pad(Math.floor(s / 3600)) },
    { label: "MIN", value: pad(Math.floor((s % 3600) / 60)) },
    { label: "SEC", value: pad(s % 60) },
  ];
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}`,
  },

  // 3. Your Studio — LogoCard component with masonry grid + lightbox (TypeScript/React)
  {
    language: "typescript",
    filename: "your-studio/logo-card.tsx",
    code: `'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Logo } from '@/data/logos';

interface LogoCardProps {
  logo: Logo;
  index: number;
  onOpen: (logo: Logo) => void;
}

/**
 * Your Studio — LogoCard.
 * Masonry grid card with hover overlay, palette swatches,
 * and click-to-open lightbox behavior.
 */
export function LogoCard({ logo, index, onOpen }: LogoCardProps) {
  return (
    <article
      className="group relative cursor-pointer animate-fade-up"
      style={{ animationDelay: \`\${Math.min(index, 12) * 0.04}s\` }}
      onClick={() => onOpen(logo)}
    >
      <div className={cn(
        'relative aspect-square overflow-hidden bg-card border border-border',
        'transition-all duration-500 group-hover:border-gold'
      )}>
        <Image
          src={\`/logos/\${logo.slug}.png\`}
          alt={\`\${logo.name} — \${logo.style} logo for \${logo.industry}\`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="text-white text-base truncate" style={{ fontFamily: 'var(--font-serif)' }}>
            {logo.name}
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-white/60 truncate">
            {logo.industry} · {logo.style}
          </div>
        </div>
      </div>
    </article>
  );
}`,
  },

  // 3.5 Cybersecurity Engineer Portfolio — matrix rain + CTF challenge (TypeScript)
  {
    language: "typescript",
    filename: "cyber-portfolio/matrix-rain.ts",
    code: `/**
 * Cybersecurity Portfolio — Matrix rain effect on canvas.
 * Pure Canvas API, no dependencies. Lightweight and creepy.
 */
export function initMatrixRain(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  const chars = "01<>/{}[]()#$%&*+-=ABCDEF0123456789".split("");
  const fontSize = 14;
  let columns: number[] = [];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Array(Math.floor(canvas.width / fontSize)).fill(1);
  };
  resize();
  window.addEventListener("resize", resize);

  const draw = () => {
    // Trail effect — semi-transparent black overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < columns.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = columns[i] * fontSize;

      ctx.fillText(char, x, y);

      // Reset column to top randomly, or advance
      if (y > canvas.height && Math.random() > 0.975) {
        columns[i] = 0;
      }
      columns[i]++;
    }
  };

  setInterval(draw, 50);
}`,
  },

  // 4. Baca — word-by-word Quran reader component (JavaScript)
  {
    language: "javascript",
    filename: "baca/word-reader.js",
    code: `/**
 * Baca — Word-by-word Quran reader.
 * Highlights the active word, plays audio, and respects focus.
 */
export class WordByWordReader {
  constructor(container, verses) {
    this.container = container;
    this.verses = verses;
    this.activeIndex = -1;
    this.audio = new Audio();
    this.render();
  }

  render() {
    this.container.innerHTML = "";
    this.verses.forEach((verse, vIdx) => {
      const vEl = document.createElement("article");
      vEl.className = "verse";
      vEl.setAttribute("aria-label", \`Verse \${verse.number}\`);

      verse.words.forEach((word, wIdx) => {
        const wEl = document.createElement("button");
        wEl.type = "button";
        wEl.className = "word";
        wEl.textContent = word.text;
        wEl.setAttribute("data-verse", vIdx);
        wEl.setAttribute("data-word", wIdx);
        wEl.setAttribute(
          "aria-label",
          \`\${word.translation}, word \${wIdx + 1}\`
        );
        wEl.addEventListener("click", () => this.activate(vIdx, wIdx));
        vEl.appendChild(wEl);
      });

      this.container.appendChild(vEl);
    });
  }

  activate(vIdx, wIdx) {
    this.clearActive();
    const el = this.container.querySelector(
      \`[data-verse="\${vIdx}"][data-word="\${wIdx}"]\`
    );
    if (!el) return;
    el.classList.add("word--active");
    el.focus({ preventScroll: false });
    this.activeIndex = wIdx;

    const word = this.verses[vIdx].words[wIdx];
    if (word.audio) {
      this.audio.src = word.audio;
      this.audio.play().catch(() => {});
    }
  }

  clearActive() {
    this.container
      .querySelectorAll(".word--active")
      .forEach((el) => el.classList.remove("word--active"));
  }
}`,
  },

  // 5.5 Is There Light? — Coming Soon (no source code yet)
  null,

  // 7. Cyber Bot — chatbot suggested prompts (JavaScript)
  {
    language: "javascript",
    filename: "cyber-bot/prompts.js",
    code: `/**
 * Cyber Bot — suggested-prompts engine.
 * Returns the most relevant follow-up prompts for a given answer.
 */

const PROMPT_LIBRARY = [
  {
    id: "phishing",
    text: "How do I spot a phishing email?",
    keywords: ["phishing", "email", "scam", "spoof"],
  },
  {
    id: "passwords",
    text: "What makes a strong password?",
    keywords: ["password", "credential", "auth"],
  },
  {
    id: "2fa",
    text: "Why should I enable two-factor auth?",
    keywords: ["2fa", "mfa", "factor", "otp"],
  },
  {
    id: "vpn",
    text: "Does a VPN actually protect me?",
    keywords: ["vpn", "tunnel", "encrypt", "network"],
  },
  {
    id: "ransomware",
    text: "How does ransomware spread?",
    keywords: ["ransomware", "malware", "encrypt", "virus"],
  },
  {
    id: "updates",
    text: "Why are software updates important?",
    keywords: ["update", "patch", "vulnerability", "cve"],
  },
];

export function suggestPrompts(answerText, limit = 3) {
  const lower = answerText.toLowerCase();
  const scored = PROMPT_LIBRARY.map((p) => {
    let score = 0;
    for (const kw of p.keywords) {
      if (lower.includes(kw)) score += 1;
    }
    return { ...p, score };
  });

  return scored
    .filter((p) => p.score >= 0)
    .sort((a, b) => b.score - a.score || Math.random() - 0.5)
    .slice(0, limit)
    .map((p) => ({ id: p.id, text: p.text }));
}

export function formatAnswerCard(answer) {
  return {
    title: answer.title,
    summary: answer.summary,
    bullets: answer.bullets ?? [],
    source: answer.source ?? "Cyber Bot knowledge base",
    prompts: suggestPrompts(\`\${answer.title} \${answer.summary}\`),
  };
}`,
  },

  // 8. Cyber-Words — game loop (JavaScript)
  {
    language: "javascript",
    filename: "cyber-words/game.js",
    code: `/**
 * Cyber-Words Guess — game loop.
 * 5-letter word guessing with color-coded feedback.
 */

const WORDS = [
  "PHISH",
  "VIRUS",
  "PATCH",
  "CIPHER",
  "TOKEN",
  "SPOOF",
  "BREACH",
  "PROXY",
  "WORMS",
  "FIREW",
];

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export function createGame() {
  const answer = WORDS[Math.floor(Math.random() * WORDS.length)];
  return {
    answer,
    guesses: [],
    status: "playing",
    current: "",
  };
}

export function submitGuess(game, guess) {
  if (game.status !== "playing") return game;
  const g = guess.toUpperCase().slice(0, WORD_LENGTH);
  if (g.length !== WORD_LENGTH) return game;

  const feedback = evaluateGuess(g, game.answer);
  const guesses = [...game.guesses, { word: g, feedback }];

  let status = "playing";
  if (g === game.answer) status = "won";
  else if (guesses.length >= MAX_GUESSES) status = "lost";

  return { ...game, guesses, status, current: "" };
}

function evaluateGuess(guess, answer) {
  const result = Array(WORD_LENGTH).fill("absent");
  const answerChars = answer.split("");
  const guessChars = guess.split("");

  // First pass: correct positions
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = "correct";
      answerChars[i] = null;
    }
  }

  // Second pass: present but misplaced
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    const idx = answerChars.indexOf(guessChars[i]);
    if (idx !== -1) {
      result[i] = "present";
      answerChars[idx] = null;
    }
  }

  return result;
}

export function nextKeyState(feedback) {
  // Map letter -> best state across all guesses
  return feedback.reduce((acc, f) => {
    if (!acc[f]) acc[f] = true;
    return acc;
  }, {});
}`,
  },

  // 12. Portfolio v1 — color theming + password-locked secret area (JavaScript)
  {
    language: "javascript",
    filename: "portfolio-v1/app.js",
    code: `/**
 * Portfolio v1 — Color theming + secret code unlock.
 * The playful old portfolio: splash any color, crack the code.
 */

// === Color theming — splash any color across the screen ===
const ColorTheme = {
  root: document.documentElement,
  picker: document.getElementById("color-picker"),

  init() {
    // Load saved color or default to cyan
    const saved = localStorage.getItem("portfolio-color") || "#00d9ff";
    this.apply(saved);
    this.picker.value = saved;
    this.picker.addEventListener("input", (e) => this.apply(e.target.value));
  },

  apply(hex) {
    // Convert hex to CSS custom properties so the whole page re-themes
    const rgb = this.hexToRgb(hex);
    this.root.style.setProperty("--accent", hex);
    this.root.style.setProperty("--accent-rgb", \`\${rgb.r}, \${rgb.g}, \${rgb.b}\`);
    localStorage.setItem("portfolio-color", hex);
  },

  hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  },
};

// === Secret code unlock — crack the code to reveal the secret area ===
const SecretLock = {
  overlay: document.getElementById("secret-overlay"),
  input: document.getElementById("code-input"),
  hint: document.getElementById("code-hint"),

  // The code is "open sesame" — simple but playful
  CODE: "open sesame",

  init() {
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.check();
    });
  },

  check() {
    const guess = this.input.value.trim().toLowerCase();
    if (guess === this.CODE) {
      this.unlock();
    } else {
      this.hint.textContent = "nope, try again";
      this.hint.style.color = "#ff4757";
      this.input.value = "";
      // Shake animation on wrong guess
      this.overlay.classList.add("shake");
      setTimeout(() => this.overlay.classList.remove("shake"), 400);
    }
  },

  unlock() {
    this.hint.textContent = "welcome to the secret area";
    this.hint.style.color = "#2ed573";
    this.overlay.classList.add("unlocked");
    setTimeout(() => {
      this.overlay.style.display = "none";
      document.getElementById("secret-content").classList.add("visible");
    }, 800);
  },
};

// === Boot ===
ColorTheme.init();
SecretLock.init();`,
  },

  // Solarin — auction catalogue kinetic typography (CSS/JS)
  {
    language: "javascript",
    filename: "solarin/catalogue.js",
    code: `/**
 * Solarin — Auction catalogue interaction.
 * Rubber stamp animation + kinetic hero typography.
 */
const Stamp = {
  el: document.querySelector(".lot-stamp"),
  fired: false,
  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.fired) { this.slam(); this.fired = true; }
        });
      }, { threshold: 0.6 }
    );
    observer.observe(this.el);
  },
  slam() {
    this.el.classList.add("stamp--slam");
    document.body.classList.add("shake");
    setTimeout(() => document.body.classList.remove("shake"), 400);
  },
};

const KineticHero = {
  init() {
    document.querySelectorAll(".hero-letter").forEach((l, i) => {
      l.style.animationDelay = (i * 0.04) + "s";
    });
  },
};

Stamp.init();
KineticHero.init();`,
  },

  // Solhem — breathing hero animation (CSS/JS)
  {
    language: "javascript",
    filename: "solhem/breathing-hero.js",
    code: `/**
 * Solhem — Breathing hero animation.
 * The sun breathes on a real 4s in, 4s out cycle.
 */
const BreathingHero = {
  sun: document.querySelector(".hero-sun"),
  caption: document.querySelector(".breath-caption"),
  init() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    this.breathe();
  },
  breathe() {
    let phase = "inhale";
    const cycle = () => {
      if (phase === "inhale") {
        this.sun.classList.add("sun--expanded");
        this.sun.classList.remove("sun--contracted");
        this.caption.textContent = "inhale";
        phase = "exhale";
        setTimeout(cycle, 4000);
      } else {
        this.sun.classList.add("sun--contracted");
        this.sun.classList.remove("sun--expanded");
        this.caption.textContent = "exhale";
        phase = "inhale";
        setTimeout(cycle, 4000);
      }
    };
    cycle();
  },
};

const TypewriterQuote = {
  init() {
    document.querySelectorAll("[data-quote]").forEach((el) => {
      el.addEventListener("mouseenter", () => this.type(el));
    });
  },
  type(el) {
    const text = el.dataset.quote;
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { el.textContent += text[i]; i++; }
      else { clearInterval(interval); }
    }, 50);
  },
};

BreathingHero.init();
TypewriterQuote.init();`,
  },

  // Hale — ECG line sweep + care menu booking (CSS/JS)
  {
    language: "javascript",
    filename: "hale/ecg-sweep.js",
    code: `/**
 * Hale — ECG line sweep + chart-tab navigation.
 * The hero vitals strip has an ECG line that sweeps forever.
 */

// === ECG line sweep ===
const ECGSweep = {
  canvas: document.querySelector(".ecg-canvas"),
  ctx: null,
  points: [],
  x: 0,

  init() {
    if (!this.canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.animate();
  },

  resize() {
    this.canvas.width = this.canvas.offsetWidth * 2;
    this.canvas.height = this.canvas.offsetHeight * 2;
    this.ctx.scale(2, 2);
  },

  generatePoint(x) {
    // Simulate ECG waveform — flat line with periodic spikes
    const cycle = x % 120;
    if (cycle > 50 && cycle < 55) return -15; // QRS spike up
    if (cycle >= 55 && cycle < 58) return 25;  // S dip
    if (cycle > 58 && cycle < 62) return -5;   // recovery
    return Math.sin(x * 0.02) * 1;             // baseline noise
  },

  animate() {
    const w = this.canvas.width / 2;
    const h = this.canvas.height / 2;
    const midY = h / 2;

    // Fade trail
    this.ctx.fillStyle = "rgba(248, 249, 250, 0.08)";
    this.ctx.fillRect(0, 0, w, h);

    // Draw new segment
    const y = midY + this.generatePoint(this.x);
    this.points.push({ x: this.x % w, y });
    if (this.points.length > w) this.points.shift();

    this.ctx.strokeStyle = "#dc2626";
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.points.forEach((p, i) => {
      if (i === 0) this.ctx.moveTo(p.x, p.y);
      else this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.stroke();

    this.x += 2;
    requestAnimationFrame(() => this.animate());
  },
};

// === Chart divider tabs — fill red on scroll ===
const ChartTabs = {
  init() {
    const tabs = document.querySelectorAll(".chart-tab");
    const sections = document.querySelectorAll("section[data-chart]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.chart;
            tabs.forEach((tab) => {
              if (tab.dataset.chart === id) tab.classList.add("tab--filled");
              else tab.classList.remove("tab--filled");
            });
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
  },
};

// === Visit steps — tick off checkboxes as you read ===
const VisitSteps = {
  init() {
    const steps = document.querySelectorAll(".visit-step");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("step--done");
          }
        });
      },
      { threshold: 0.7 }
    );
    steps.forEach((s) => observer.observe(s));
  },
};

// === Care Menu — expandable + one-tap booking ===
const CareMenu = {
  init() {
    document.querySelectorAll(".care-item").forEach((item) => {
      const header = item.querySelector(".care-header");
      header?.addEventListener("click", () => item.classList.toggle("care--open"));
      const bookBtn = item.querySelector(".care-book");
      bookBtn?.addEventListener("click", () => this.book(item));
    });
  },

  book(item) {
    const name = item.dataset.visit;
    const form = document.getElementById("appointment-form");
    if (form) {
      form.querySelector("[name=visit]").value = name;
      form.scrollIntoView({ behavior: "smooth" });
    }
  },
};

ECGSweep.init();
ChartTabs.init();
VisitSteps.init();
CareMenu.init();`,
  },
];
