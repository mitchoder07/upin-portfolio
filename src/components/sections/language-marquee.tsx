"use client";

export function LanguageMarquee() {
  // Tech-focused marquee — no language emphasis
  const items = [
    "Frontend Engineer",
    "UI/UX Designer",
    "Design Systems",
    "Type-Safe",
    "Accessible by Default",
    "Figma → Code",
    "Cybersecurity-Minded",
    "Ship → Iterate",
    "Open Source",
    "PWA-Ready",
    "Database → Pixel",
    "Open for Freelance Work",
  ];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-foreground/10 bg-foreground/[0.02] py-5">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-display text-lg font-semibold text-foreground/30 sm:text-xl">
              {item}
            </span>
            <span className="text-[var(--neon)]">✦</span>
          </div>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
