"use client";

import { useState } from "react";
import Image from "next/image";
import { Printer, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export default function ResumePage() {
  const { t } = useI18n();
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Print/Download button — hidden when printing */}
      <div className="mx-auto mb-8 flex max-w-4xl items-center justify-between print:hidden">
        <a
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to portfolio
        </a>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="gap-2">
            <a href="/resume.pdf" download="Abdullah-Yusuf-Resume.pdf">
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
          <Button
            onClick={handlePrint}
            disabled={printing}
            className="gap-2"
          >
            {printing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                Preparing...
              </>
            ) : (
              <>
                <Printer className="h-4 w-4" />
                Print / Save as PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Resume content — A4-friendly, prints clean white */}
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 text-black shadow-xl sm:p-12 print:rounded-none print:p-0 print:shadow-none">
        {/* Header with profile picture */}
        <div className="flex flex-col items-center gap-6 border-b border-gray-200 pb-8 sm:flex-row sm:items-start">
          {/* Profile picture */}
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-gray-100 sm:h-40 sm:w-40">
            <Image
              src="/portfolio-images/profile.jpeg"
              alt="Abdullah Yusuf"
              fill
              sizes="160px"
              className="object-cover"
              priority
            />
          </div>

          {/* Name and title */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Abdullah Yusuf
            </h1>
            <p className="mt-1 text-lg font-medium text-gray-600">
              Frontend Engineer & UI/UX Designer
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Known as Upin · Nigeria
            </p>

            {/* Contact info */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600 sm:justify-start">
              <a
                href="mailto:olaniyiaremu2003@gmail.com"
                className="hover:text-gray-900"
              >
                olaniyiaremu2003@gmail.com
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://github.com/mitchoder07"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                github.com/mitchoder07
              </a>
              <span className="text-gray-300">|</span>
              <span>+234 708 895 5340</span>
            </div>
            <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-600 sm:justify-start">
              <a
                href="https://linkedin.com/in/mitchoder07"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                linkedin.com/in/mitchoder07
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://wa.me/2347088955340"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Summary */}
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Frontend Engineer and UI/UX Designer with 5+ years of experience
            turning ideas into interfaces users love. Skilled in Next.js,
            TypeScript, Tailwind CSS, and Figma. I design and build production
            web applications with design systems, responsive layouts, and
            accessible components. Seeking roles where I can own both design
            and implementation.
          </p>
        </section>

        {/* Skills */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 sm:grid-cols-3">
            <div>
              <span className="font-semibold">Frontend:</span> Next.js, React,
              TypeScript, Tailwind CSS, Framer Motion
            </div>
            <div>
              <span className="font-semibold">Design:</span> Figma, Design
              Systems, Wireframing, Prototyping, Accessibility
            </div>
            <div>
              <span className="font-semibold">State:</span> Zustand, TanStack
              Query, React Context, Recharts
            </div>
            <div>
              <span className="font-semibold">Components:</span> shadcn/ui,
              Radix UI, Custom Component Libraries
            </div>
            <div>
              <span className="font-semibold">Tooling:</span> Git, GitHub
              Actions, Vercel, PWA, SEO
            </div>
            <div>
              <span className="font-semibold">Languages:</span> TypeScript,
              JavaScript, HTML, CSS, Python, SQL
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
            Experience
          </h2>
          <div className="space-y-4">
            {t.experience.items.map((item, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-gray-900">
                    {item.role}
                  </h3>
                  <span className="text-xs text-gray-500">{item.period}</span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {item.company}
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {item.description}
                </p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-gray-700">
                  {item.achievements.map((ach, j) => (
                    <li key={j}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
            Selected Projects
          </h2>
          <div className="space-y-2">
            {t.projects.items.slice(0, 5).map((project, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-gray-900">
                    {project.name}
                    {project.confidential && (
                      <span className="ml-2 text-xs font-normal text-amber-600">
                        (Confidential)
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {project.tech.slice(0, 4).join(", ")}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{project.tagline}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
            Education
          </h2>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-900">
                B.Sc. CyberSecurity
              </h3>
              <span className="text-xs text-gray-500">2020 — 2024</span>
            </div>
            <p className="text-sm font-medium text-gray-600">
              Al-Hikmah University, Ilorin, Kwara State, Nigeria
            </p>
            <p className="text-sm text-gray-700">
              Second Class Honours (Upper Division) · CGPA: 4.27/5.00
            </p>
          </div>
        </section>
      </div>

      {/* Print styles — clean white, proper page breaks */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }
          section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
