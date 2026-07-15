"use client";

import { useState } from "react";
import { ArrowLeft, Printer, Download, Mail, Phone, Github, Linkedin, Twitter, Dribbble, Figma } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SocialLink = {
  icon: LucideIcon;
  label: string;
  href: string;
  display: string;
};

const socials: SocialLink[] = [
  { icon: Github, label: "GitHub", href: "https://github.com/mitchoder07", display: "github.com/mitchoder07" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/mitchoder07", display: "linkedin.com/in/mitchoder07" },
  { icon: Twitter, label: "X", href: "https://x.com/mitchoder07", display: "x.com/mitchoder07" },
  { icon: Dribbble, label: "Dribbble", href: "https://dribbble.com/mitchoder07", display: "dribbble.com/mitchoder07" },
  { icon: Figma, label: "Figma", href: "https://figma.com/@mitchoder07", display: "figma.com/@mitchoder07" },
];

const experience = [
  {
    role: "Frontend Engineer",
    company: "Freelance",
    period: "2024 - Present",
    location: "Remote",
    summary:
      "Building production web apps with Next.js, TypeScript, and Tailwind. Led the Al-Hikmah education platform frontend, from Figma to deploy.",
    achievements: [
      "Designed a full component library and design system used across the platform",
      "Built analytics dashboards with Recharts and loading skeletons",
      "Implemented PWA, print CSS for certificates, and SEO/Metadata API",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Freelance",
    period: "2023 - Present",
    location: "Remote",
    summary:
      "Designing digital products in Figma. Design systems, wireframes, prototypes, and responsive layouts for web and mobile.",
    achievements: [
      "Built the Al-Hikmah design system (color tokens, typography, spacing)",
      "Delivered 20+ Figma projects across web and mobile",
      "Prototyped multi-step forms, dashboards, and mobile flows",
    ],
  },
  {
    role: "IT Support & Frontend Developer",
    company: "NYSC, Federal University of Health Sciences, Ila (FUHSI)",
    period: "2025",
    location: "Ila, Nigeria",
    summary:
      "IT support at FUHSI during NYSC. Solved real problems daily and built internal tools to automate repetitive tasks.",
    achievements: [
      "Resolved 200+ support tickets across hardware and software",
      "Built internal tools that automated repetitive support tasks",
      "Documented common fixes for the team knowledge base",
    ],
  },
  {
    role: "Frontend Engineering Journey",
    company: "Self-taught",
    period: "2021 - 2023",
    location: "Nigeria",
    summary:
      "Started learning HTML, CSS, and JavaScript. Built personal projects, leveled up to React and Next.js, and mastered responsive design.",
    achievements: [
      "Shipped 6+ personal projects in HTML, CSS, and JavaScript",
      "Leveled up to React and Next.js with TypeScript",
      "Mastered mobile-first responsive design across devices",
    ],
  },
  {
    role: "AI Intern",
    company: "AI4FS, Summit University",
    period: "2023",
    location: "Nigeria",
    summary:
      "AI for Females in STEM internship at Summit University. Built AI-powered prototypes and presented at the summit.",
    achievements: [
      "Built AI-powered prototypes during the internship",
      "Presented project work at the AI4FS summit",
      "Collaborated with a cross-disciplinary team of interns",
    ],
  },
];

const projects = [
  {
    name: "Al-Hikmah Education Platform",
    description:
      "Production education platform with course management, quiz builder, certificate generation (print CSS + QR), analytics dashboards (Recharts), multi-step forms, and PWA support.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
    role: "Frontend Engineer & UI/UX Designer",
  },
  {
    name: "Islam Baca",
    description:
      "Quran study tool with word-by-word analysis, reading, listening, and learning. Built mobile-first with accessible navigation.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    role: "Frontend Engineer & UI/UX Designer",
  },
  {
    name: "Crypto Vault",
    description:
      "AES-256 client-side encryption vault. Zero data leaves the browser. Clean key-management UX built around trust.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    role: "Frontend Engineer & UI/UX Designer",
  },
  {
    name: "Similarity Checker",
    description:
      "Multi-algorithm plagiarism checker (Cosine, Jaccard, Levenshtein) with visual gauge and citation assistant.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    role: "Frontend Engineer & UI/UX Designer",
  },
  {
    name: "Cyber Bot",
    description:
      "Cybersecurity Q&A bot with suggested-prompts pattern and readable answer cards. Mobile-first, keyboard-friendly.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    role: "Frontend Engineer & UI/UX Designer",
  },
  {
    name: "Cyber-Words Guess",
    description:
      "Word-guessing game built around cybersecurity terms. Game loop, on-screen keyboard, color-coded feedback.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    role: "Frontend Engineer & UI/UX Designer",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Three.js", "Vite", "HTML5", "CSS3", "JavaScript"],
  },
  {
    title: "UI/UX Design",
    items: ["Figma", "Design Systems", "Wireframing", "Prototyping", "Color Theory", "Typography", "Spacing Systems", "Component Libraries", "Accessibility", "Responsive Design"],
  },
  {
    title: "State & Data",
    items: ["Zustand", "React Context API", "TanStack Query", "Recharts", "React Hook Form", "Zod"],
  },
  {
    title: "Components",
    items: ["shadcn/ui", "Radix UI", "Custom Components", "Dialogs", "Dropdowns", "Sheets", "Accordions", "Forms"],
  },
  {
    title: "Tooling",
    items: ["Git", "GitHub Actions", "Vercel", "PWA", "SEO/Metadata API", "Print CSS", "Dark Mode", "Storybook"],
  },
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "Python", "SQL", "Bash"],
  },
];

export default function ResumePage() {
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrinting(false), 500);
    }, 100);
  };

  return (
    <div className="resume-root min-h-screen bg-background text-foreground">
      {/* Top toolbar (screen only, hidden in print) */}
      <div className="no-print sticky top-0 z-10 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to portfolio</span>
            <span className="sm:hidden">Back</span>
          </a>
          <button
            onClick={handlePrint}
            disabled={printing}
            className="flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {printing ? (
              <Download className="h-3.5 w-3.5 animate-bounce" />
            ) : (
              <Printer className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">Print / Save as PDF</span>
            <span className="sm:hidden">Print</span>
          </button>
        </div>
      </div>

      {/* Resume document */}
      <main className="resume-doc mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="resume-header border-b border-foreground/15 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Abdullah Yusuf
              </h1>
              <p className="mt-1 text-base font-medium text-muted-foreground sm:text-lg">
                Frontend Engineer & UI/UX Designer
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Known as <span className="font-semibold text-foreground">Upin</span> · Age 23 · Nigeria
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs sm:text-sm">
              <a
                href="mailto:olaniyiaremu2003@gmail.com"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="break-all">olaniyiaremu2003@gmail.com</span>
              </a>
              <a
                href="https://wa.me/2347088955340"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <span>+234 708 895 5340</span>
              </a>
              <div className="mt-1 flex flex-col gap-1">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="font-semibold">{s.label}:</span>
                    <span className="break-all">{s.display}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="resume-section mt-6">
          <h2 className="resume-section-title font-display text-sm font-bold uppercase tracking-[0.15em] text-foreground">
            Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85 sm:text-base">
            Frontend engineer and UI/UX designer with 5+ years turning ideas into interfaces users love.
            I design systems in Figma and build them in React, end to end. I have designed a full design
            system (color tokens, typography, spacing, 50+ components) and shipped it in production with
            Next.js, TypeScript, and Tailwind CSS. I obsess over the details: the 4px of padding, the
            200ms easing curve, the focus state that nobody notices but everyone feels.
          </p>
        </section>

        {/* Skills */}
        <section className="resume-section mt-6">
          <h2 className="resume-section-title font-display text-sm font-bold uppercase tracking-[0.15em] text-foreground">
            Skills
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-3">
                <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.title}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-foreground/10 bg-foreground/[0.04] px-1.5 py-0.5 text-[11px] font-medium text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="resume-section mt-6">
          <h2 className="resume-section-title font-display text-sm font-bold uppercase tracking-[0.15em] text-foreground">
            Experience
          </h2>
          <div className="mt-3 space-y-4">
            {experience.map((job, i) => (
              <div key={i} className="resume-job break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-foreground sm:text-base">
                    {job.role}
                    <span className="font-normal text-muted-foreground"> · {job.company}</span>
                  </h3>
                  <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">
                    {job.period} · {job.location}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-foreground/75 sm:text-sm">
                  {job.summary}
                </p>
                <ul className="mt-2 space-y-1">
                  {job.achievements.map((ach, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-xs text-foreground/80 sm:text-sm"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--neon)]" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="resume-section mt-6">
          <h2 className="resume-section-title font-display text-sm font-bold uppercase tracking-[0.15em] text-foreground">
            Selected Projects
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {projects.map((project, i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-lg border border-foreground/10 bg-foreground/[0.02] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-foreground">{project.name}</h3>
                </div>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
                  {project.role}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/75">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-foreground/10 bg-foreground/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="resume-section mt-6">
          <h2 className="resume-section-title font-display text-sm font-bold uppercase tracking-[0.15em] text-foreground">
            Education
          </h2>
          <div className="mt-3 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground sm:text-base">
                B.Sc. CyberSecurity
                <span className="font-normal text-muted-foreground">
                  {" "}· Al-Hikmah University, Ilorin
                </span>
              </h3>
              <span className="font-mono text-[11px] text-muted-foreground sm:text-xs">
                2020 - 2024 · CGPA 4.27/5.00
              </span>
            </div>
          </div>
        </section>

        {/* Footer note (screen only) */}
        <footer className="no-print mt-10 border-t border-foreground/10 pt-4 text-center text-xs text-muted-foreground">
          <p>
            Tip: Use the <span className="font-semibold text-foreground">Print / Save as PDF</span> button
            above to download an ATS-friendly version. The printed layout is clean white with proper page breaks.
          </p>
        </footer>
      </main>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 14mm 12mm;
          }

          html, body {
            background: #ffffff !important;
            color: #000000 !important;
          }

          .no-print {
            display: none !important;
          }

          .resume-root {
            background: #ffffff !important;
            color: #000000 !important;
          }

          .resume-doc {
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .resume-header {
            border-color: #000000 !important;
          }

          .resume-header h1,
          .resume-header p,
          .resume-section-title,
          .resume-job h3,
          .resume-section h3 {
            color: #000000 !important;
          }

          .resume-header p,
          .resume-header a,
          .resume-section p,
          .resume-job p,
          .resume-job li,
          .resume-job span {
            color: #1a1a1a !important;
          }

          .resume-section-title {
            border-bottom: 1px solid #000000 !important;
            padding-bottom: 2px !important;
          }

          /* Strip decorative backgrounds and borders for ATS-friendliness */
          .resume-section div[style],
          .resume-job div[style] {
            background: transparent !important;
            border-color: #cccccc !important;
          }

          .rounded-lg,
          .rounded {
            background: transparent !important;
            border: 1px solid #cccccc !important;
          }

          span[style],
          .resume-section span {
            background: transparent !important;
            border: 1px solid #999999 !important;
            color: #1a1a1a !important;
          }

          a {
            color: #000000 !important;
            text-decoration: none !important;
          }

          /* Avoid awkward breaks */
          .resume-section,
          .resume-job {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .resume-section-title {
            break-after: avoid;
            page-break-after: avoid;
          }
        }

        /* Subtle section title underline on screen */
        .resume-section-title {
          border-bottom: 1px solid color-mix(in oklch, var(--foreground) 15%, transparent);
          padding-bottom: 4px;
        }
      `}</style>
    </div>
  );
}
