"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Line = {
  type: "input" | "output" | "system" | "error" | "success";
  content: string | React.ReactNode;
};

// Wrapper that remounts the terminal when locale changes,
// so the welcome message re-renders in the new language.
export function InteractiveTerminal() {
  const { locale } = useI18n();
  return <TerminalInner key={locale} />;
}

function TerminalInner() {
  const { t } = useI18n();
  const [lines, setLines] = useState<Line[]>([
    { type: "system", content: t.terminal.welcome },
    { type: "system", content: t.terminal.helpLine2 },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const commands = useMemo(
    () => [
      { cmd: "help", desc: t.terminal.commands.help },
      { cmd: "whoami", desc: t.terminal.commands.whoami },
      { cmd: "about", desc: t.terminal.commands.about },
      { cmd: "skills", desc: t.terminal.commands.skills },
      { cmd: "projects", desc: t.terminal.commands.projects },
      { cmd: "experience", desc: t.terminal.commands.experience },
      { cmd: "contact", desc: t.terminal.commands.contact },
      { cmd: "social", desc: t.terminal.commands.social },
      { cmd: "features", desc: t.terminal.commands.features },
      { cmd: "ls", desc: t.terminal.commands.ls },
      { cmd: "clear", desc: t.terminal.commands.clear },
    ],
    [t]
  );

  const executeCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;

      // Special case: clear doesn't need prior lines
      if (cmd === "clear") {
        setLines([]);
        return;
      }

      const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      // Use functional updater so we don't depend on `lines`
      setLines((prevLines) => {
        const newLines: Line[] = [
          ...prevLines,
          { type: "input", content: raw },
        ];

        const addOutput = (
          content: string | React.ReactNode,
          type: Line["type"] = "output"
        ) => {
          newLines.push({ type, content });
        };

        switch (cmd) {
          case "help":
            addOutput(t.terminal.helpLine1);
            commands.forEach(({ cmd: c, desc }) => {
              addOutput(
                <span key={c}>
                  <span className="text-[var(--neon)]">{c.padEnd(14)}</span>
                  <span className="text-foreground/60">{desc}</span>
                </span>
              );
            });
            break;
          case "whoami":
            addOutput(t.terminal.outputs.whoami);
            break;
          case "about":
          case "cat about.md":
            addOutput(t.about.p1);
            addOutput("");
            addOutput(t.about.p2);
            setTimeout(() => scrollToSection("about"), 300);
            break;
          case "skills":
          case "cat skills.json":
            addOutput(
              <span>
                <span className="text-muted-foreground">{`{`}</span>
              </span>
            );
            Object.entries(t.skills.categories).forEach(([key, val]) => {
              addOutput(
                <span key={key}>
                  {"  "}
                  <span className="text-[var(--magenta)]">"{val.title}"</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-foreground/80">
                    [{val.items.join(", ")}]
                  </span>
                </span>
              );
            });
            addOutput(<span className="text-muted-foreground">{`}`}</span>);
            setTimeout(() => scrollToSection("skills"), 300);
            break;
          case "projects":
          case "ls projects/":
            t.projects.items.forEach((p, i) => {
              addOutput(
                <span key={i}>
                  <span className="text-[var(--neon)]">→</span>{" "}
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-muted-foreground"> — {p.tagline}</span>
                </span>
              );
            });
            setTimeout(() => scrollToSection("projects"), 300);
            break;
          case "experience":
          case "cat experience.log":
            t.experience.items.forEach((item) => {
              addOutput(
                <span key={item.role}>
                  <span className="text-[var(--magenta)]">
                    [{item.period}]
                  </span>{" "}
                  <span className="font-semibold">{item.role}</span> @{" "}
                  {item.company}
                </span>
              );
            });
            setTimeout(() => scrollToSection("experience"), 300);
            break;
          case "contact":
          case "cat contact.vcf":
            addOutput("Email: olaniyiaremu2003@gmail.com");
            addOutput("GitHub: github.com/mitchoder07");
            addOutput("LinkedIn: linkedin.com/in/mitchoder07");
            addOutput("X (Twitter): x.com/mitchoder07");
            addOutput("WhatsApp: wa.me/2347088955340");
            setTimeout(() => scrollToSection("contact"), 300);
            break;
          case "social":
            addOutput(t.terminal.outputs.social);
            break;
          case "features":
            // Tour of every feature the portfolio ships with. Tone is
            // casual and a little cheeky, not AI-corporate. No em dashes
            // (per user request), only regular hyphens.
            addOutput("here's what upin's portfolio is packing:");
            addOutput("");
            addOutput(
              <span>
                <span className="text-[var(--neon)]">languages</span>
                <span className="text-muted-foreground"> - </span>
                <span>7 of them. english, malay, hausa, yoruba, japanese, arabic (with proper RTL), and chinese. switch from the globe icon up top.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">hero scene</span>
                <span className="text-muted-foreground"> - </span>
                <span>a 3D playground where a tank rolls through cracking jokes, and a chibi man runs in looking for his puteri.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">this terminal</span>
                <span className="text-muted-foreground"> - </span>
                <span>type 'help' for the menu. there are also hidden easter eggs in here that i'm not gonna tell you about. go poke around.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">project likes</span>
                <span className="text-muted-foreground"> - </span>
                <span>heart any project you vibe with. one heart per device, so no spamming the counter.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">anonymous wall</span>
                <span className="text-muted-foreground"> - </span>
                <span>visitors can drop a note that everyone sees. messages vanish after 30 days.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">math corner</span>
                <span className="text-muted-foreground"> - </span>
                <span>a little puzzle zone because upin lowkey loves math and puzzles.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">themes</span>
                <span className="text-muted-foreground"> - </span>
                <span>dark mode and light mode, your call.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">custom cursor</span>
                <span className="text-muted-foreground"> - </span>
                <span>because default cursors are boring.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">scroll progress</span>
                <span className="text-muted-foreground"> - </span>
                <span>that bar at the very top tracking your journey.</span>
              </span>
            );
            addOutput(
              <span>
                <span className="text-[var(--neon)]">pwa ready</span>
                <span className="text-muted-foreground"> - </span>
                <span>installable on your phone or desktop for offline viewing.</span>
              </span>
            );
            addOutput("");
            addOutput(
              <span className="text-foreground/80">
                btw, upin is currently out here looking for his puteri. keep that between us, yeah?
              </span>
            );
            break;
          case "ls":
            addOutput(t.terminal.outputs.ls);
            break;
          case "sudo":
            addOutput(
              "Nice try 😏 — but you don't have sudo privileges here.",
              "error"
            );
            break;
          case "exit":
            addOutput(
              "There is no escape. Only more code. Type 'help'.",
              "error"
            );
            break;
          // ---- EASTER EGGS (not hinted in help / not in autocomplete) ----
          // These are intentionally not added to the `commands` array above
          // so they don't show up in `help` output or Tab autocomplete —
          // they only reveal themselves when the user types them. This
          // keeps the terminal feeling like there are hidden secrets to
          // discover rather than a complete menu of every interaction.

          // "upin" / "who is upin" / "who's upin" / "what is upin" → short bio.
          case "upin":
          case "who is upin":
          case "who is upin?":
          case "who's upin":
          case "who's upin?":
          case "what is upin":
          case "what is upin?":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Upin</span>{" "}
                <span className="text-foreground/80">
                  is the handle of Abdullah Yusuf. A frontend engineer & UI/UX
                  designer who turns Figma wireframes into pixel-perfect,
                  accessible React products. Polyglot builder (en / ms / ha /
                  yo / ja / ar / zh). Muslim, Weeb, and currently
                  available for select engagements.
                </span>
              </span>
            );
            addOutput(
              <span className="text-muted-foreground">
                (psst — try the other commands too: type 'help' for the menu)
              </span>
            );
            break;

          // Islamic greetings → respond appropriately.
          // "salam alaykum" / "assalam alaykum" / "salam" / "salaam"
          case "salam alaykum":
          case "assalam alaykum":
          case "assalamu alaykum":
          case "assalamu'alaykum":
          case "salam":
          case "salaam":
          case "salam alaikum":
          case "asalam alaykum":
          case "as-salam alaykum":
          case "assalam aleykum":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Wa alaykum salam</span>
                <span className="text-foreground/80"> wa rahmatullah 🤲</span>
              </span>
            );
            addOutput(
              <span className="text-muted-foreground">
                Peace be upon you too. Welcome — type 'help' to explore.
              </span>
            );
            break;

          // "jumu'ah mubarak" / "jumuat mubarak" → return the greeting.
          case "jumuat mubarak":
          case "jumuah mubarak":
          case "jumu'ah mubarak":
          case "jumua mubarak":
          case "jumu'a mubarak":
          case "jumah mubarak":
          case "jumuah mubarak!":
          case "jumuat mubarak!":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Jumu'ah Mubarak</span>
                <span className="text-foreground/80"> to you too 🤲</span>
              </span>
            );
            addOutput(
              <span className="text-muted-foreground">
                May the blessed day carry your good deeds forward. Barakallahu feek.
              </span>
            );
            break;

          // Generic greetings.
          case "hello":
          case "hi":
          case "hey":
          case "yo":
          case "hello upin":
          case "hi upin":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Hey there!</span>{" "}
                <span className="text-foreground/80">
                  Type 'help' to see what I can do, or 'upin' to learn about
                  the man behind the handle.
                </span>
              </span>
            );
            break;
          case "good morning":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Good morning!</span>{" "}
                <span className="text-foreground/80">☀️ Hope your day starts well.</span>
              </span>
            );
            break;
          case "good afternoon":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Good afternoon!</span>{" "}
                <span className="text-foreground/80">Hope the day's treating you well.</span>
              </span>
            );
            break;
          case "good evening":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Good evening!</span>{" "}
                <span className="text-foreground/80">Thanks for stopping by.</span>
              </span>
            );
            break;
          case "good night":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Good night!</span>{" "}
                <span className="text-foreground/80">Rest well. 🌙</span>
              </span>
            );
            break;

          // Ramadan / Eid easter eggs (seasonal but always available).
          case "ramadan mubarak":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Ramadan Mubarak</span>
                <span className="text-foreground/80">! 🌙 May it be a month of mercy and growth.</span>
              </span>
            );
            break;
          case "eid mubarak":
          case "barka da sallah":
            addOutput(
              <span>
                <span className="text-[var(--neon)]">Eid Mubarak</span>
                <span className="text-foreground/80">! 🕌 May the celebration bring you joy.</span>
              </span>
            );
            break;

          default:
            addOutput(
              <span>
                <span className="text-red-400">
                  command not found: {cmd}
                </span>
                <br />
                <span className="text-muted-foreground">
                  {t.terminal.outputs.unknown}
                </span>
              </span>,
              "error"
            );
        }

        return newLines;
      });
    },
    [commands, t]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
    setHistory((prev) => [...prev, input]);
    setHistoryIdx(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = commands
        .map((c) => c.cmd)
        .filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          { type: "input", content: input },
          { type: "output", content: matches.join("   ") },
        ]);
      }
    }
  };

  const lineColor = (type: Line["type"]) => {
    switch (type) {
      case "input":
        return "text-foreground";
      case "system":
        return "text-foreground/60";
      case "error":
        return "text-red-400";
      case "success":
        return "text-emerald-400";
      default:
        return "text-foreground/85";
    }
  };

  return (
    <section id="terminal" className="section-pad relative">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
              <TerminalIcon className="h-3 w-3 text-[var(--neon)]" />
              {t.terminal.title}
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {t.terminal.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {t.terminal.subtitle}
            </p>
          </div>

          {/* Terminal window */}
          <div
            className="overflow-hidden rounded-2xl glass-strong shadow-2xl shadow-black/20"
            onClick={() => inputRef.current?.focus()}
            data-cursor="pointer"
          >
            {/* Title bar */}
            <div className="flex min-w-0 items-center gap-2 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-3">
              <div className="flex shrink-0 gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-3 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                <TerminalIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate font-mono">upin@portfolio — zsh</span>
              </div>
              <div className="ml-auto hidden shrink-0 items-center gap-1 text-muted-foreground sm:flex">
                <Minus className="h-3.5 w-3.5" />
                <Square className="h-3 w-3" />
                <X className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Output area */}
            <div
              ref={scrollRef}
              className="max-h-[460px] min-h-[360px] overflow-x-hidden overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:p-6"
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn("min-w-0 whitespace-pre-wrap break-words", lineColor(line.type))}
                >
                  {line.type === "input" ? (
                    <div className="flex min-w-0 gap-2">
                      <span className="shrink-0 text-[var(--neon)]">{t.terminal.prompt}</span>
                      <span className="min-w-0 flex-1 break-words">{line.content as string}</span>
                    </div>
                  ) : (
                    line.content
                  )}
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleSubmit} className="mt-1 flex min-w-0 gap-2">
                <span className="shrink-0 text-[var(--neon)]">{t.terminal.prompt}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.terminal.placeholder}
                  className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-foreground outline-none placeholder:text-muted-foreground/50"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
                <span className="-ml-2 inline-block h-4 w-1.5 shrink-0 animate-blink bg-[var(--neon)]" />
              </form>
            </div>
          </div>

          {/* Quick commands */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Try:</span>
            {["help", "whoami", "ls", "projects", "skills"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  executeCommand(cmd);
                  inputRef.current?.focus();
                }}
                className="rounded-md glass px-2.5 py-1 font-mono text-xs text-foreground/70 transition-colors hover:bg-[var(--neon)]/10 hover:text-[var(--neon)]"
                data-cursor="pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
