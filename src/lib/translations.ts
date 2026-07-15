export type Locale = "en" | "ms" | "ha" | "yo" | "ja" | "ar" | "zh";

export const locales: Locale[] = ["en", "ms", "ha", "yo", "ja", "ar", "zh"];

export const localeMeta: Record<
 Locale,
 { label: string; nativeLabel: string; flag: string; dir: "ltr" | "rtl" }
> = {
 en: { label: "English", nativeLabel: "English", flag: "EN", dir: "ltr" },
 ms: { label: "Malay", nativeLabel: "Bahasa Melayu", flag: "MS", dir: "ltr" },
 ha: { label: "Hausa", nativeLabel: "Hausa", flag: "HA", dir: "ltr" },
 yo: { label: "Yoruba", nativeLabel: "Yorùbá", flag: "YO", dir: "ltr" },
 ja: { label: "Japanese", nativeLabel: "日本語", flag: "JA", dir: "ltr" },
 ar: { label: "Arabic", nativeLabel: "العربية", flag: "AR", dir: "rtl" },
 zh: { label: "Chinese", nativeLabel: "中文", flag: "ZH", dir: "ltr" },
};

export type Translation = {
 nav: {
 home: string;
 about: string;
 skills: string;
 projects: string;
 experience: string;
 openSource: string;
 design: string;
 testimonials: string;
 contact: string;
 menu: string;
 };
 hero: {
 badge: string;
 greeting: string;
 name: string;
 akaLabel: string;
 brandName: string;
 title: string;
 tagline: string;
 ctaPrimary: string;
 ctaSecondary: string;
 availability: string;
 stat1Label: string;
 stat2Label: string;
 stat3Label: string;
 scroll: string;
 };
 terminal: {
 title: string;
 subtitle: string;
 prompt: string;
 welcome: string;
 helpLine1: string;
 helpLine2: string;
 commands: {
 help: string;
 about: string;
 skills: string;
 projects: string;
 experience: string;
 contact: string;
 clear: string;
 whoami: string;
 ls: string;
 social: string;
 };
 outputs: {
 whoami: string;
 ls: string;
 social: string;
 unknown: string;
 };
 placeholder: string;
 };
 about: {
 badge: string;
 heading: string;
 p1: string;
 p2: string;
 p3: string;
 highlights: { label: string; value: string }[];
 coreTitle: string;
 coreDesc: string;
 coreItems: { title: string; desc: string }[];
 };
 skills: {
 badge: string;
 heading: string;
 subheading: string;
 categories: {
 frontend: { title: string; items: string[] };
 design: { title: string; items: string[] };
 state: { title: string; items: string[] };
 components: { title: string; items: string[] };
 tooling: { title: string; items: string[] };
 languages: { title: string; items: string[] };
 };
 };
 projects: {
 badge: string;
 heading: string;
 subheading: string;
 viewCode: string;
 viewLive: string;
 caseStudy: string;
 role: string;
 impact: string;
 tech: string;
 featured: string;
 items: {
 name: string;
 tagline: string;
 description: string;
 role: string;
 impact: string;
 tech: string[];
 image?: string;
 gradient?: string;
 }[];
 };
 experience: {
 badge: string;
 heading: string;
 subheading: string;
 items: {
 role: string;
 company: string;
 period: string;
 description: string;
 achievements: string[];
 }[];
 };
 openSource: {
 badge: string;
 heading: string;
 subheading: string;
 reposLabel: string;
 starsLabel: string;
 contribsLabel: string;
 repos: {
 name: string;
 description: string;
 language: string;
 stars: string;
 }[];
 viewGithub: string;
 };
 design: {
 badge: string;
 heading: string;
 subheading: string;
 readMore: string;
 cases: {
 title: string;
 category: string;
 excerpt: string;
 gradient: string;
 }[];
 };
 testimonials: {
 badge: string;
 heading: string;
 subheading: string;
 items: {
 quote: string;
 name: string;
 role: string;
 }[];
 };
 contact: {
 badge: string;
 heading: string;
 subheading: string;
 nameLabel: string;
 emailLabel: string;
 messageLabel: string;
 namePlaceholder: string;
 emailPlaceholder: string;
 messagePlaceholder: string;
 send: string;
 sending: string;
 success: string;
 orText: string;
 emailMe: string;
 bookCall: string;
 downloadResume: string;
 followTitle: string;
 };
 footer: {
 tagline: string;
 builtWith: string;
 rights: string;
 backToTop: string;
 quickLinks: string;
 connect: string;
 };
};

export const translations: Record<Locale, Translation> = {
 en: {
 nav: {
 home: "Home",
 about: "About",
 skills: "Skills",
 projects: "Projects",
 experience: "Experience",
 openSource: "Open Source",
 design: "Design",
 testimonials: "Testimonials",
 contact: "Contact",
 menu: "Menu",
 },
 hero: {
 badge: "Available for select engagements",
 greeting: "Hello, I'm",
 name: "Abdullah Yusuf",
 akaLabel: "known as",
 brandName: "Upin",
 title: "Frontend Engineer & UI/UX Designer",
 tagline:
 "I design and build beautiful, accessible interfaces. From Figma wireframes to pixel-perfect React, I craft products users love.",
 ctaPrimary: "View My Work",
 ctaSecondary: "Open Terminal",
 availability: "Open to frontend & design roles, and contract work",
 stat1Label: "Frontend",
 stat2Label: "Designs",
 stat3Label: "OS Stars",
 scroll: "Scroll to explore",
 },
 terminal: {
 title: "Interactive Terminal",
 subtitle:
 "This isn't a portfolio. It's a shell. Type a command and explore. every section is a file you can read.",
 prompt: "upin@portfolio:~$",
 welcome:
 "Welcome to Upin's interactive portfolio terminal. Type 'help' to see available commands.",
 helpLine1: "Available commands:",
 helpLine2: "Tip: commands are case-insensitive. Try 'whoami' to start.",
 commands: {
 help: "Show this help message",
 about: "Read about.md",
 skills: "List skills.json",
 projects: "List projects/",
 experience: "Show experience.log",
 contact: "Print contact.vcf",
 clear: "Clear the terminal",
 whoami: "Who am I?",
 ls: "List directory contents",
 social: "Show social links",
 },
 outputs: {
 whoami:
 "Abdullah Yusuf (Upin). Frontend Engineer & UI/UX Designer with 5+ years shipping production interfaces. I design systems in Figma and build them in React, end to end.",
 ls: "about.md skills.json projects/ experience.log contact.vcf social.txt",
 social:
 "GitHub: github.com/mitchoder07 · LinkedIn: linkedin.com/in/mitchoder07 · X: x.com/mitchoder07 · Dribbble: dribbble.com/mitchoder07 · Figma: figma.com/@mitchoder07 · Email: olaniyiaremu2003@gmail.com",
 unknown: "command not found. Type 'help' for available commands.",
 },
 placeholder: "Type a command and press Enter...",
 },
 about: {
 badge: "About",
 heading: "Designer who codes. Engineer who designs.",
 p1: "I'm Abdullah Yusuf, known as Upin. A frontend engineer and UI/UX designer who has spent the last five years turning ideas into interfaces users love. My work lives at the intersection of design and code: I sketch wireframes in Figma in the morning, build them in React by afternoon, and polish the animations by evening. I believe great products come from engineers who understand design and designers who understand code.",
 p2: "What sets me apart is that I own both sides. I've designed design systems (color tokens, typography scales, spacing, component libraries) and I've implemented them in production. I've built analytics dashboards with Recharts, multi-step forms with validation, certificate generators with print CSS, and PWAs that work offline. Whether it's making a button feel right or architecting a component library, I bring the same craft.",
 p3: "When I'm not shipping, I'm learning. I write about design systems and frontend architecture, mentor aspiring developers, and contribute to open source. I believe the best frontend engineers are obsessive about details. the 4px of padding, the 200ms easing curve, the focus state that nobody notices but everyone feels. This portfolio is my attempt to show you what that obsession looks like.",
 highlights: [
 { label: "Years frontend", value: "5+" },
 { label: "Figma designs", value: "20+" },
 { label: "Components built", value: "50+" },
 { label: "p99 latency cut", value: "8x" },
 ],
 coreTitle: "What I bring to the table.",
 coreDesc: "Design and engineering, shipped together.",
 coreItems: [
 { title: "Design Systems", desc: "Color tokens, typography scales, spacing systems, component libraries. Built for Al-Hikmah, reusable across products." },
 { title: "Frontend Architecture", desc: "Next.js App Router, React Server Components, route groups, type-safe APIs. Production-grade structure." },
 { title: "Responsive Design", desc: "Mobile-first, 44px+ tap targets, bottom sheets, hamburger menus. Tested across devices." },
 { title: "Data Visualization", desc: "Recharts dashboards: revenue trends, enrollment distribution, pass rates. Real-time with loading skeletons." },
 { title: "Accessibility", desc: "Accessible form labels, keyboard navigation, focus states, screen-reader friendly. WCAG-aware." },
 { title: "Performance", desc: "PWA, SEO/Metadata API, Suspense, error boundaries, print CSS. Fast and reliable." },
 ],
 },
 skills: {
 badge: "Skills",
 heading: "Design and engineering, end to end.",
 subheading:
 "I don't pick a side. I own both. From Figma artboards to React component trees. Here's what I reach for daily.",
 categories: {
 frontend: {
 title: "Frontend",
 items: [
 "Next.js 16",
 "React 19",
 "TypeScript",
 "Tailwind CSS 4",
 "Framer Motion",
 "Three.js",
 "Vite",
 "HTML5",
 "CSS3",
 "JavaScript",
 ],
 },
 design: {
 title: "UI/UX Design",
 items: [
 "Figma",
 "Design Systems",
 "Wireframing",
 "Prototyping",
 "Color Theory",
 "Typography",
 "Spacing Systems",
 "Component Libraries",
 "Accessibility",
 "Responsive Design",
 ],
 },
 state: {
 title: "State & Data",
 items: [
 "Zustand",
 "React Context API",
 "TanStack Query",
 "Recharts",
 "React Hook Form",
 "Zod",
 ],
 },
 components: {
 title: "Components",
 items: [
 "shadcn/ui",
 "Radix UI",
 "Custom Components",
 "Dialogs",
 "Dropdowns",
 "Sheets",
 "Accordions",
 "Forms",
 ],
 },
 tooling: {
 title: "Tooling",
 items: [
 "Git",
 "GitHub Actions",
 "Vercel",
 "PWA",
 "SEO/Metadata API",
 "Print CSS",
 "Dark Mode",
 "Storybook",
 ],
 },
 languages: {
 title: "Languages",
 items: [
 "TypeScript",
 "JavaScript",
 "HTML",
 "CSS",
 "Python",
 "SQL",
 "Bash",
 ],
 },
 },
 },
 projects: {
 badge: "Selected Work",
 heading: "Projects that shipped, scaled, and taught me something.",
 subheading:
 "A curated selection of products I've designed and built. from education platforms to security tools. Each one changed how I think about craft.",
 viewCode: "View Code",
 viewLive: "Live Demo",
 caseStudy: "Case Study",
 role: "Role",
 impact: "Impact",
 tech: "Tech",
 featured: "Featured",
 items: [
 {
 name: "Al-Hikmah Education Platform",
 tagline: "Production education platform with quizzes, certificates, and analytics",
 description:
 "A full education platform with course management, a quiz builder, certificate generation using print CSS and QR verification, analytics dashboards built with Recharts, multi-step forms with validation, and PWA support. Designed the entire system in Figma first, then shipped it in Next.js.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "Full design system, 50+ reusable components, mobile-first responsive",
 tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
 },
 {
 name: "Rafaab",
 tagline: "Premium e-commerce marketplace with AI shopping assistant",
 description:
 "A premium e-commerce marketplace built to outshine Jumia and AliExpress. Features an AI shopping assistant called Rafi, flash sales with live countdowns, full order tracking with visual timelines, a seller dashboard, and Paystack payment integration. Distinctive gold-amulet brand identity across 8 product categories.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "AI assistant, flash sales, real-time tracking, Paystack payments",
 tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Paystack"],
 image: "/portfolio-images/rafaab.png",
 },
 {
 name: "Islam Baca",
 tagline: "Quran study tool with word-by-word analysis",
 description:
 "A Quran study web app that lets users read, listen, and learn with word-by-word breakdowns. Built with semantic HTML, accessible navigation, and a reading mode that respects focus. Designed the layout mobile-first.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "Word-by-word reader, audio playback, accessible study flow",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/islam-baca.png",
 },
 {
 name: "Crypto Vault",
 tagline: "AES-256 encryption in the browser",
 description:
 "A client-side encryption vault that encrypts and decrypts secrets with AES-256, fully in the browser. Zero data leaves the device. Designed the UX around trust: clear states, copy-to-clipboard, and zero-confusion empty states.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "Zero-server encryption, clean key-management UX",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/crypto-vault.jpeg",
 },
 {
 name: "Similarity Checker",
 tagline: "Multi-algorithm plagiarism checker with visual gauge",
 description:
 "A plagiarism checker that runs multiple text-similarity algorithms and renders results on a visual gauge. Includes a citation assistant that suggests proper attribution. Designed the comparison UI and the gauge component from scratch.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "Multi-algorithm scoring, visual gauge, citation assistant",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/similarity-checker.jpeg",
 },
 {
 name: "Cyber Bot",
 tagline: "Ask anything about cybersecurity, get instant answers",
 description:
 "A cybersecurity Q&A bot that gives instant answers on common security topics. Designed the conversational UI, the suggested-prompts pattern, and the readable answer cards. Built mobile-first with keyboard-friendly input.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "Instant answers, suggested prompts, readable response cards",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-bot.jpg",
 },
 {
 name: "Cyber-Words Guess",
 tagline: "Guess the cyber word game",
 description:
 "A word-guessing game built around cybersecurity terms. Designed the game loop, the on-screen keyboard, and the color-coded feedback states. Shipped as a single-page app with smooth state transitions.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "Game loop, on-screen keyboard, color-coded feedback",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-words.jpg",
 },
 {
 name: "[Your Next Design]",
 tagline: "A slot waiting for your next Figma case study",
 description:
 "This is a placeholder slot for a future design case study. Swap it with your next Figma project. open the projects data file, replace the name, description, role, impact, and tech tags. The case study layout will adapt automatically.",
 role: "Your Role Here",
 impact: "Your impact metrics here",
 tech: ["Figma", "Next.js", "Tailwind CSS"],
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
 },
 ],
 },
 experience: {
 badge: "Experience",
 heading: "Five years of designing, building, and shipping.",
 subheading:
 "From freelance frontend to in-house design systems. Each role taught me a different facet of the craft.",
 items: [
 {
 role: "Frontend Engineer",
 company: "Freelance",
 period: "2024 - Present",
 description:
 "Building production web apps with Next.js, TypeScript, and Tailwind. Led the Al-Hikmah education platform frontend, from Figma to deploy.",
 achievements: [
 "Designed a full component library and design system",
 "Built analytics dashboards with Recharts and loading skeletons",
 "Implemented PWA, print CSS for certificates, and SEO/Metadata API",
 ],
 },
 {
 role: "UI/UX Designer",
 company: "Freelance",
 period: "2023 - Present",
 description:
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
 description:
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
 description:
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
 description:
 "AI for Females in STEM internship at Summit University. Built AI-powered prototypes and presented at the summit.",
 achievements: [
 "Built AI-powered prototypes during the internship",
 "Presented project work at the AI4FS summit",
 "Collaborated with a cross-disciplinary team of interns",
 ],
 },
 ],
 },
 openSource: {
 badge: "Open Source",
 heading: "Giving back to the craft.",
 subheading:
 "Open source is how the frontend community levels up. I contribute, maintain, and document. because someone did it for me first.",
 reposLabel: "Public repos",
 starsLabel: "GitHub stars",
 contribsLabel: "Contributions / year",
 repos: [
 {
 name: "shadcn-extensions",
 description: "Headless extensions for shadcn/ui: data tables, command palettes, and composite inputs.",
 language: "TypeScript",
 stars: "1.8k",
 },
 {
 name: "tailwind-print-css",
 description: "A Tailwind CSS plugin for print-perfect PDFs. Page breaks, margins, and @media print utilities.",
 language: "TypeScript",
 stars: "1.2k",
 },
 {
 name: "figma-design-tokens",
 description: "Sync Figma variables to Tailwind config and CSS custom properties. Type-safe token pipelines.",
 language: "TypeScript",
 stars: "820",
 },
 {
 name: "react-quiz-builder",
 description: "An accessible, headless quiz builder for React. ARIA-compliant and keyboard-friendly.",
 language: "TypeScript",
 stars: "410",
 },
 ],
 viewGithub: "View GitHub Profile",
 },
 design: {
 badge: "Design",
 heading: "Case studies from the design file.",
 subheading:
 "A look behind the Figma file. Design systems, mobile flows, dashboards, and landing pages. each one shipped to production.",
 readMore: "View case study",
 cases: [
 {
 title: "Al-Hikmah Design System",
 category: "Design System",
 excerpt:
 "Color tokens, typography scale, spacing system, and 50+ reusable components. Built once, shipped across the entire education platform.",
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
 },
 {
 title: "Islam Baca Mobile Flow",
 category: "Mobile App",
 excerpt:
 "Word-by-word Quran study UX. Bottom-sheet navigation, 44px tap targets, and a reading mode that respects focus.",
 gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
 },
 {
 title: "Analytics Dashboard",
 category: "Dashboard",
 excerpt:
 "Revenue trends, enrollment distribution, and pass-rate visualizations. Recharts dashboards with loading skeletons and real-time updates.",
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
 },
 {
 title: "Certificate & Print UX",
 category: "Landing Page",
 excerpt:
 "Print-perfect certificate generator with QR verification. CSS @media print, page breaks, and ATS-friendly layouts.",
 gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
 },
 ],
 },
 testimonials: {
 badge: "Testimonials",
 heading: "What people I've worked with say.",
 subheading:
 "Receipts. Because a portfolio without them is just a résumé with a domain name.",
 items: [
 {
 quote:
 "Upin is the rare designer who ships production React. He designed our design system in Figma and then built it himself in Next.js. The handoff was instant because there was no handoff.",
 name: "Sarah Chen",
 role: "Product Lead, Al-Hikmah",
 },
 {
 quote:
 "We hired Upin to design and build our education platform frontend. He delivered a full design system, 50+ components, and analytics dashboards. The polish on every interaction was unreal.",
 name: "Tunde Adebayo",
 role: "Founder, EduTech Startup",
 },
 {
 quote:
 "His eye for spacing and typography is unmatched in our team. He rebuilt our dashboard with Recharts and the data finally tells a story. Engineers who can design are a different breed.",
 name: "Yuki Tanaka",
 role: "Design Lead, Osaka Labs",
 },
 ],
 },
 contact: {
 badge: "Contact",
 heading: "Let's build something users love.",
 subheading:
 "I'm currently open to frontend roles, UI/UX design contracts, and select freelance work. Tell me what you're designing or building.",
 nameLabel: "Your name",
 emailLabel: "Email address",
 messageLabel: "Your message",
 namePlaceholder: "Your name",
 emailPlaceholder: "your@email.com",
 messagePlaceholder: "Tell me about your project, role, or idea...",
 send: "Send Message",
 sending: "Sending...",
 success: "Message sent. I'll get back to you within 48 hours.",
 orText: "or",
 emailMe: "Email me directly",
 bookCall: "Book a 30-min intro call",
 downloadResume: "View résumé",
 followTitle: "Find me elsewhere",
 },
 footer: {
 tagline: "Frontend Engineer & UI/UX Designer. Builder. Shipper.",
 builtWith: "Designed & built with care. Next.js, TypeScript, Tailwind CSS, Figma.",
 rights: "All rights reserved.",
 backToTop: "Back to top",
 quickLinks: "Quick Links",
 connect: "Connect",
 },
 },

 ms: {
 nav: {
 home: "Laman Utama",
 about: "Tentang",
 skills: "Kemahiran",
 projects: "Projek",
 experience: "Pengalaman",
 openSource: "Sumber Terbuka",
 design: "Reka Bentuk",
 testimonials: "Testimoni",
 contact: "Hubungi",
 menu: "Menu",
 },
 hero: {
 badge: "Terbuka untuk kerja terpilih",
 greeting: "Helo, saya",
 name: "Abdullah Yusuf",
 akaLabel: "dikenali sebagai",
 brandName: "Upin",
 title: "Jurutera Frontend & Pereka UI/UX",
 tagline:
 "Saya merekabentuk dan membina antara muka yang cantik dan boleh diakses. Dari wireframe Figma ke React yang sempurna pixel, saya mencipta produk yang disukai pengguna.",
 ctaPrimary: "Lihat Kerja Saya",
 ctaSecondary: "Buka Terminal",
 availability: "Terbuka untuk peranan frontend & reka bentuk, dan kerja kontrak",
 stat1Label: "Frontend",
 stat2Label: "Reka Bentuk",
 stat3Label: "Bintang OS",
 scroll: "Tatal untuk terokai",
 },
 terminal: {
 title: "Terminal Interaktif",
 subtitle:
 "Ini bukan portfolio. Ini shell. Taip arahan dan terokai. setiap bahagian adalah fail yang boleh dibaca.",
 prompt: "upin@portfolio:~$",
 welcome:
 "Selamat datang ke terminal portfolio interaktif Upin. Taip 'help' untuk melihat arahan yang tersedia.",
 helpLine1: "Arahan tersedia:",
 helpLine2: "Tip: arahan tidak sensitif huruf. Cuba 'whoami' untuk mula.",
 commands: {
 help: "Tunjuk mesej bantuan ini",
 about: "Baca about.md",
 skills: "Senarai skills.json",
 projects: "Senarai projects/",
 experience: "Tunjuk experience.log",
 contact: "Cetak contact.vcf",
 clear: "Kosongkan terminal",
 whoami: "Siapa saya?",
 ls: "Senarai kandungan direktori",
 social: "Tunjuk pautan sosial",
 },
 outputs: {
 whoami:
 "Abdullah Yusuf (Upin). Jurutera Frontend & Pereka UI/UX dengan 5+ tahun menghantar antara muka production. Saya mereka sistem dalam Figma dan membina mereka dalam React, hujung ke hujung.",
 ls: "about.md skills.json projects/ experience.log contact.vcf social.txt",
 social:
 "GitHub: github.com/mitchoder07 · LinkedIn: linkedin.com/in/mitchoder07 · X: x.com/mitchoder07 · Dribbble: dribbble.com/mitchoder07 · Figma: figma.com/@mitchoder07 · Email: olaniyiaremu2003@gmail.com",
 unknown: "arahan tidak dijumpai. Taip 'help' untuk arahan tersedia.",
 },
 placeholder: "Taip arahan dan tekan Enter...",
 },
 about: {
 badge: "Tentang",
 heading: "Pereka yang mengekod. Jurutera yang merekabentuk.",
 p1: "Saya Abdullah Yusuf, dikenali sebagai Upin. Jurutera frontend dan pereka UI/UX yang telah menghabiskan lima tahun lalu menukar idea menjadi antara muka yang disukai pengguna. Kerja saya berada di persimpangan reka bentuk dan kod: saya melakar wireframe dalam Figma pada waktu pagi, membina mereka dalam React pada waktu petang, dan menggilap animasi pada waktu malam. Saya percaya produk hebat datang dari jurutera yang memahami reka bentuk dan pereka yang memahami kod.",
 p2: "Apa yang membezakan saya ialah saya memiliki kedua-dua belah pihak. Saya telah merekabentuk sistem reka bentuk (token warna, skala tipografi, jarak, pustaka komponen) dan saya telah melaksanakannya dalam production. Saya telah membina papan pemuka analitik dengan Recharts, borang pelbagai langkah dengan pengesahan, penjana sijil dengan print CSS, dan PWA yang berfungsi luar talian. Sama ada menjadikan butang berasa betul atau mereka bentuk pustaka komponen, saya membawa kerajinan yang sama.",
 p3: "Apabila saya tidak menghantar, saya sedang belajar. Saya menulis tentang sistem reka bentuk dan senibina frontend, membimbing pembangun yang bercita-cita, dan menyumbang kepada sumber terbuka. Saya percaya jurutera frontend terbaik obses terhadap butiran. padding 4px, lengkung easing 200ms, keadaan fokus yang tiada siapa perasan tetapi semua orang rasakan. Portfolio ini adalah cubaan saya untuk menunjukkan kepada anda apa rupa obsesif itu.",
 highlights: [
 { label: "Tahun frontend", value: "5+" },
 { label: "Reka Figma", value: "20+" },
 { label: "Komponen dibina", value: "50+" },
 { label: "Pendaman dikurangkan", value: "8x" },
 ],
 coreTitle: "Apa yang saya bawa.",
 coreDesc: "Reka bentuk dan kejuruteraan, dihantar bersama.",
 coreItems: [
 { title: "Sistem Reka Bentuk", desc: "Token warna, skala tipografi, sistem jarak, pustaka komponen. Dibina untuk Al-Hikmah, boleh diguna semula merentasi produk." },
 { title: "Senibina Frontend", desc: "Next.js App Router, React Server Components, route groups, API type-safe. Struktur gred production." },
 { title: "Reka Bentuk Responsif", desc: "Mobile-first, sasaran ketuk 44px+, bottom sheets, menu hamburger. Diuji merentasi peranti." },
 { title: "Visualisasi Data", desc: "Papan pemuda Recharts: trend hasil, pengagihan pendaftaran, kadar lulus. Masa nyata dengan skeleton memuatkan." },
 { title: "Kebolehcapaian", desc: "Label borang boleh diakses, navigasi papan kekunci, keadaan fokus, mesra pembaca skrin. Sedar WCAG." },
 { title: "Prestasi", desc: "PWA, SEO/Metadata API, Suspense, sempadan ralat, print CSS. Pantas dan boleh dipercayai." },
 ],
 },
 skills: {
 badge: "Kemahiran",
 heading: "Reka bentuk dan kejuruteraan, hujung ke hujung.",
 subheading:
 "Saya tidak memilih belah. Saya memiliki kedua-duanya. Dari artboard Figma ke pokok komponen React. Inilah yang saya gunakan setiap hari.",
 categories: {
 frontend: {
 title: "Frontend",
 items: [
 "Next.js 16",
 "React 19",
 "TypeScript",
 "Tailwind CSS 4",
 "Framer Motion",
 "Three.js",
 "Vite",
 "HTML5",
 "CSS3",
 "JavaScript",
 ],
 },
 design: {
 title: "Reka Bentuk UI/UX",
 items: [
 "Figma",
 "Sistem Reka Bentuk",
 "Wireframing",
 "Prototaip",
 "Teori Warna",
 "Tipografi",
 "Sistem Jarak",
 "Pustaka Komponen",
 "Kebolehcapaian",
 "Reka Bentuk Responsif",
 ],
 },
 state: {
 title: "Status & Data",
 items: [
 "Zustand",
 "React Context API",
 "TanStack Query",
 "Recharts",
 "React Hook Form",
 "Zod",
 ],
 },
 components: {
 title: "Komponen",
 items: [
 "shadcn/ui",
 "Radix UI",
 "Komponen Tersuai",
 "Dialog",
 "Dropdown",
 "Sheet",
 "Accordion",
 "Borang",
 ],
 },
 tooling: {
 title: "Alatan",
 items: [
 "Git",
 "GitHub Actions",
 "Vercel",
 "PWA",
 "SEO/Metadata API",
 "Print CSS",
 "Mod Gelap",
 "Storybook",
 ],
 },
 languages: {
 title: "Bahasa",
 items: [
 "TypeScript",
 "JavaScript",
 "HTML",
 "CSS",
 "Python",
 "SQL",
 "Bash",
 ],
 },
 },
 },
 projects: {
 badge: "Kerja Terpilih",
 heading: "Projek yang dihantar, berskala, dan mengajar saya sesuatu.",
 subheading:
 "Pilihan produk yang saya reka dan bina. dari platform pendidikan hingga alat keselamatan. Setiap satu mengubah cara saya berfikir tentang kerajinan.",
 viewCode: "Lihat Kod",
 viewLive: "Demo Langsung",
 caseStudy: "Kajian Kes",
 role: "Peranan",
 impact: "Impak",
 tech: "Teknologi",
 featured: "Pilihan",
 items: [
 {
 name: "Platform Pendidikan Al-Hikmah",
 tagline: "Platform pendidikan production dengan kuiz, sijil, dan analitik",
 description:
 "Platform pendidikan penuh dengan pengurusan kursus, pembina kuiz, penjana sijil menggunakan print CSS dan pengesahan QR, papan pemuka analitik dibina dengan Recharts, borang pelbagai langkah dengan pengesahan, dan sokongan PWA. Direka seluruh sistem dalam Figma dahulu, kemudian dihantar dalam Next.js.",
 role: "Jurutera Frontend & Pereka UI/UX",
 impact: "Sistem reka bentuk penuh, 50+ komponen boleh guna semula, responsif mobile-first",
 tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
 },
 {
 name: "Rafaab",
 tagline: "Premium e-commerce marketplace with AI shopping assistant",
 description:
 "A premium e-commerce marketplace built to outshine Jumia and AliExpress. Features an AI shopping assistant called Rafi, flash sales with live countdowns, full order tracking with visual timelines, a seller dashboard, and Paystack payment integration. Distinctive gold-amulet brand identity across 8 product categories.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "AI assistant, flash sales, real-time tracking, Paystack payments",
 tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Paystack"],
 image: "/portfolio-images/rafaab.png",
 },
 {
 name: "Islam Baca",
 tagline: "Alat kaji Quran dengan analisis perkataan-demi-perkataan",
 description:
 "Aplikasi web kaji Quran yang membenarkan pengguna membaca, mendengar, dan belajar dengan pecahan perkataan-demi-perkataan. Dibina dengan HTML semantik, navigasi boleh capai, dan mod membaca yang menghormati fokus. Direka susun atur mobile-first.",
 role: "Jurutera Frontend & Pereka UI/UX",
 impact: "Pembaca perkataan-demi-perkataan, main balik audio, aliran kaji boleh capai",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/islam-baca.png",
 },
 {
 name: "Crypto Vault",
 tagline: "Penyulitan AES-256 dalam pelayar",
 description:
 "Peti penyulitan sisi-klien yang menyulitkan dan menyahsulit rahsia dengan AES-256, sepenuhnya dalam pelayar. Tiada data meninggalkan peranti. Direka UX sekitar kepercayaan: keadaan jelas, salin-ke-clipboard, dan keadaan kosong tanpa kekeliruan.",
 role: "Jurutera Frontend & Pereka UI/UX",
 impact: "Penyulitan tanpa-pelayan, UX pengurusan kunci yang bersih",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/crypto-vault.jpeg",
 },
 {
 name: "Pemeriksa Persamaan",
 tagline: "Pemeriksa plagiarism pelbagai-algoritma dengan tolok visual",
 description:
 "Pemeriksa plagiarism yang menjalankan pelbagai algoritma persamaan teks dan memaparkan keputusan pada tolok visual. Termasuk pembantu petikan yang mencadangkan atribusi yang betul. Direka UI perbandingan dan komponen tolok dari awal.",
 role: "Jurutera Frontend & Pereka UI/UX",
 impact: "Pemarkahan pelbagai-algoritma, tolok visual, pembantu petikan",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/similarity-checker.jpeg",
 },
 {
 name: "Cyber Bot",
 tagline: "Tanya apa-apa tentang keselamatan siber, dapatkan jawapan serta-merta",
 description:
 "Bot Q&A keselamatan siber yang memberikan jawapan serta-merta tentang topik keselamatan biasa. Direka UI perbualan, corak cadangan-prompt, dan kad jawapan boleh baca. Dibina mobile-first dengan input mesra papan kekunci.",
 role: "Jurutera Frontend & Pereka UI/UX",
 impact: "Jawapan serta-merta, cadangan prompt, kad respons boleh baca",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-bot.jpg",
 },
 {
 name: "Cyber-Words Guess",
 tagline: "Tebak permainan perkataan siber",
 description:
 "Permainan meneka perkataan dibina sekitar istilah keselamatan siber. Direka gelung permainan, papan kekunci atas-skrin, dan keadaan maklum balas berkod warna. Dihantar sebagai aplikasi halaman-tunggal dengan peralihan keadaan lancar.",
 role: "Jurutera Frontend & Pereka UI/UX",
 impact: "Gelung permainan, papan kekunci atas-skrin, maklum balas berkod warna",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-words.jpg",
 },
 {
 name: "[Reka Bentuk Seterusnya Anda]",
 tagline: "Slot menunggu kajian kes Figma seterusnya anda",
 description:
 "Ini adalah slot ruang letak untuk kajian kes reka bentuk akan datang. Tukar dengan projek Figma seterusnya anda. buka fail data projek, gantikan nama, penerangan, peranan, impak, dan tag teknologi. Susun atur kajian kes akan menyesuaikan secara automatik.",
 role: "Peranan Anda Di Sini",
 impact: "Metrik impak anda di sini",
 tech: ["Figma", "Next.js", "Tailwind CSS"],
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
 },
 ],
 },
 experience: {
 badge: "Pengalaman",
 heading: "Lima tahun merekabentuk, membina, dan menghantar.",
 subheading:
 "Dari frontend bebas ke sistem reka bentuk dalaman. Setiap peranan mengajar saya aspek berbeza kerajinan.",
 items: [
 {
 role: "Jurutera Frontend",
 company: "Freelance",
 period: "2024 - Kini",
 description:
 "Membina aplikasi web production dengan Next.js, TypeScript, dan Tailwind. Memimpin frontend platform pendidikan Al-Hikmah, dari Figma ke deploy.",
 achievements: [
 "Mereka pustaka komponen penuh dan sistem reka bentuk",
 "Membina papan pemuda analitik dengan Recharts dan skeleton memuatkan",
 "Melaksanakan PWA, print CSS untuk sijil, dan SEO/Metadata API",
 ],
 },
 {
 role: "Pereka UI/UX",
 company: "Freelance",
 period: "2023 - Kini",
 description:
 "Merekabentuk produk digital dalam Figma. Sistem reka bentuk, wireframe, prototaip, dan susun atur responsif untuk web dan mudah alih.",
 achievements: [
 "Membina sistem reka bentuk Al-Hikmah (token warna, tipografi, jarak)",
 "Menyampaikan 20+ projek Figma merentasi web dan mudah alih",
 "Membuat prototaip borang pelbagai langkah, papan pemuda, dan aliran mudah alih",
 ],
 },
 {
 role: "Sokongan IT & Pembangun Frontend",
 company: "NYSC, Universiti Sains Kesihatan Persekutuan, Ila (FUHSI)",
 period: "2025",
 description:
 "Sokongan IT di FUHSI semasa NYSC. Menyelesaikan masalah sebenar setiap hari dan membina alatan dalaman untuk mengautomasikan tugas berulang.",
 achievements: [
 "Menyelesaikan 200+ tiket sokongan merentasi perkakasan dan perisian",
 "Membina alatan dalaman yang mengautomasikan tugas sokongan berulang",
 "Mendokumenkan pembaikan biasa untuk pangkalan pengetahuan pasukan",
 ],
 },
 {
 role: "Perjalanan Kejuruteraan Frontend",
 company: "Pembelajaran kendiri",
 period: "2021 - 2023",
 description:
 "Mula belajar HTML, CSS, dan JavaScript. Membina projek peribadi, meningkat ke React dan Next.js, dan menguasai reka bentuk responsif.",
 achievements: [
 "Menghantar 6+ projek peribadi dalam HTML, CSS, dan JavaScript",
 "Meningkat ke React dan Next.js dengan TypeScript",
 "Menguasai reka bentuk responsif mobile-first merentasi peranti",
 ],
 },
 {
 role: "Pelatih AI",
 company: "AI4FS, Universiti Summit",
 period: "2023",
 description:
 "Latihan AI for Females in STEM di Universiti Summit. Membina prototaip berkuasa AI dan membentang di sidang.",
 achievements: [
 "Membina prototaip berkuasa AI semasa latihan",
 "Membentang kerja projek di sidang AI4FS",
 "Bekerjasama dengan pasukan pelbagai-disiplin pelatih",
 ],
 },
 ],
 },
 openSource: {
 badge: "Sumber Terbuka",
 heading: "Memberi kembali kepada kerajinan.",
 subheading:
 "Sumber terbuka adalah cara komuniti frontend meningkatkan tahap. Saya menyumbang, mengekalkan, dan mendokumenkan. kerana seseorang melakukannya untuk saya dahulu.",
 reposLabel: "Repo awam",
 starsLabel: "Bintang GitHub",
 contribsLabel: "Sumbangan / tahun",
 repos: [
 {
 name: "shadcn-extensions",
 description: "Sambungan headless untuk shadcn/ui: jadual data, palet arahan, dan input komposit.",
 language: "TypeScript",
 stars: "1.8k",
 },
 {
 name: "tailwind-print-css",
 description: "Plugin Tailwind CSS untuk PDF sempurna-cetak. Pemisah halaman, jidar, dan utiliti @media print.",
 language: "TypeScript",
 stars: "1.2k",
 },
 {
 name: "figma-design-tokens",
 description: "Segerakkan pembolehubah Figma ke konfigurasi Tailwind dan sifat tersuai CSS. Saluran token type-safe.",
 language: "TypeScript",
 stars: "820",
 },
 {
 name: "react-quiz-builder",
 description: "Pembina kuiz headless boleh capai untuk React. Mematuhi ARIA dan mesra papan kekunci.",
 language: "TypeScript",
 stars: "410",
 },
 ],
 viewGithub: "Lihat Profil GitHub",
 },
 design: {
 badge: "Reka Bentuk",
 heading: "Kajian kes dari fail reka bentuk.",
 subheading:
 "Pandangan di sebalik fail Figma. Sistem reka bentuk, aliran mudah alih, papan pemuda, dan halaman pendaratan. setiap satu dihantar ke production.",
 readMore: "Lihat kajian kes",
 cases: [
 {
 title: "Sistem Reka Bentuk Al-Hikmah",
 category: "Sistem Reka Bentuk",
 excerpt:
 "Token warna, skala tipografi, sistem jarak, dan 50+ komponen boleh guna semula. Dibina sekali, dihantar merentasi seluruh platform pendidikan.",
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
 },
 {
 title: "Aliran Mudah Alih Islam Baca",
 category: "Aplikasi Mudah Alih",
 excerpt:
 "UX kaji Quran perkataan-demi-perkataan. Navigasi bottom-sheet, sasaran ketuk 44px, dan mod membaca yang menghormati fokus.",
 gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
 },
 {
 title: "Papan Pemuda Analitik",
 category: "Papan Pemuda",
 excerpt:
 "Trend hasil, pengagihan pendaftaran, dan visualisasi kadar lulus. Papan pemuda Recharts dengan skeleton memuatkan dan kemas kini masa nyata.",
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
 },
 {
 title: "Sijil & UX Cetak",
 category: "Halaman Pendaratan",
 excerpt:
 "Penjana sijil sempurna-cetak dengan pengesahan QR. CSS @media print, pemisah halaman, dan susun atur mesra ATS.",
 gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
 },
 ],
 },
 testimonials: {
 badge: "Testimoni",
 heading: "Apa kata orang yang pernah saya bekerja dengan mereka.",
 subheading:
 "Resit. Kerana portfolio tanpa mereka hanyalah resume dengan nama domain.",
 items: [
 {
 quote:
 "Upin adalah pereka jarang yang menghantar React production. Dia mereka sistem reka bentuk kami dalam Figma dan kemudian membina sendiri dalam Next.js. Serah terima adalah serta-merta kerana tiada serah terima.",
 name: "Sarah Chen",
 role: "Ketua Produk, Al-Hikmah",
 },
 {
 quote:
 "Kami menggaji Upin untuk mereka dan membina frontend platform pendidikan kami. Dia menghantar sistem reka bentuk penuh, 50+ komponen, dan papan pemuda analitik. Gilap pada setiap interaksi adalah luar biasa.",
 name: "Tunde Adebayo",
 role: "Pengasas, Startup EduTech",
 },
 {
 quote:
 "Matanya untuk jarak dan tipografi tiada tandingan dalam pasukan kami. Dia membina semula papan pemuda kami dengan Recharts dan akhirnya data menceritakan kisah. Jurutera yang boleh mereka adalah bangsa berbeza.",
 name: "Yuki Tanaka",
 role: "Ketua Reka Bentuk, Osaka Labs",
 },
 ],
 },
 contact: {
 badge: "Hubungi",
 heading: "Mari bina sesuatu yang disukai pengguna.",
 subheading:
 "Saya sedang terbuka untuk peranan frontend, kontrak reka bentuk UI/UX, dan kerja freelance terpilih. Beritahu saya apa yang anda reka atau bina.",
 nameLabel: "Nama anda",
 emailLabel: "Alamat emel",
 messageLabel: "Mesej anda",
 namePlaceholder: "Nama anda",
 emailPlaceholder: "email@anda.com",
 messagePlaceholder: "Beritahu saya tentang projek, peranan, atau idea anda...",
 send: "Hantar Mesej",
 sending: "Menghantar...",
 success: "Mesej dihantar. Saya akan kembali kepada anda dalam 48 jam.",
 orText: "atau",
 emailMe: "Emel saya terus",
 bookCall: "Tempah panggilan intro 30-minit",
 downloadResume: "Lihat resume",
 followTitle: "Cari saya di tempat lain",
 },
 footer: {
 tagline: "Jurutera Frontend & Pereka UI/UX. Pembina. Penghantar.",
 builtWith: "Direka & dibina dengan penuh perhatian. Next.js, TypeScript, Tailwind CSS, Figma.",
 rights: "Hak cipta terpelihara.",
 backToTop: "Kembali ke atas",
 quickLinks: "Pautan Pantas",
 connect: "Sambung",
 },
 },

 ha: {
 nav: {
 home: "Gida",
 about: "Game da",
 skills: "Kwarewa",
 projects: "Ayyuka",
 experience: "Kwarewar Aiki",
 openSource: "Tushen Buɗe",
 design: "Tsari",
 testimonials: "Shaidu",
 contact: "Tuntuɓar",
 menu: "Menu",
 },
 hero: {
 badge: "Bude don zaɓaɓɓun ayyuka",
 greeting: "Sannu, ni",
 name: "Abdullah Yusuf",
 akaLabel: "wanda aka sani da",
 brandName: "Upin",
 title: "Injiniyan Frontend & Mai Tsara UI/UX",
 tagline:
 "Ina tsara da gina kyawun mu'amala da za a iya isa. Daga tsarin Figma zuwa React mai cikakken pixel, ina ƙirƙirar kayayyakin da masu amfani ke so.",
 ctaPrimary: "Duba Aikina",
 ctaSecondary: "Bude Tasha",
 availability: "Bude don mukaman frontend & tsari, da aikin kwangila",
 stat1Label: "Frontend",
 stat2Label: "Tsari",
 stat3Label: "Taurari OS",
 scroll: "Sauƙaƙa don bincika",
 },
 terminal: {
 title: "Tasha Mai Hulɗa",
 subtitle:
 "Wannan ba portfolio ba ne. Shi kebul ne. Rubuta umarni ka bincika. kowane sashe fayil ne da za ka iya karantawa.",
 prompt: "upin@portfolio:~$",
 welcome:
 "Barka da zuwa tasha portfolio mai hulɗa ta Upin. Rubuta 'help' don ganin umarnin da ke akwai.",
 helpLine1: "Umarni da ke akwai:",
 helpLine2: "Tip: umarni ba sa nuna girma. Gwada 'whoami' don farawa.",
 commands: {
 help: "Nuna wannan saƙon taimako",
 about: "Karanta about.md",
 skills: "Jerin skills.json",
 projects: "Jerin projects/",
 experience: "Nuna experience.log",
 contact: "Bugawa contact.vcf",
 clear: "Share tasha",
 whoami: "Wanene ni?",
 ls: "Jerin abubuwan da ke cikin directory",
 social: "Nuna hanyoyin sadarwar jama'a",
 },
 outputs: {
 whoami:
 "Abdullah Yusuf (Upin). Injiniyan Frontend & Mai Tsara UI/UX da shekaru 5+ na tura mu'amalar production. Ina tsara tsari a cikin Figma kuma ina gina su a cikin React, daga ƙarshe zuwa ƙarshe.",
 ls: "about.md skills.json projects/ experience.log contact.vcf social.txt",
 social:
 "GitHub: github.com/mitchoder07 · LinkedIn: linkedin.com/in/mitchoder07 · X: x.com/mitchoder07 · Dribbble: dribbble.com/mitchoder07 · Figma: figma.com/@mitchoder07 · Email: olaniyiaremu2003@gmail.com",
 unknown: "umarni ba a same ba. Rubuta 'help' don umarnin da ke akwai.",
 },
 placeholder: "Rubuta umarni ka danna Enter...",
 },
 about: {
 badge: "Game da",
 heading: "Mai tsari wanda yake tsara lamba. Injiniya wanda yake tsara.",
 p1: "Ni Abdullah Yusuf ne (Upin). Injiniyan frontend da mai tsara UI/UX wanda ya kwashe shekaru biyar da suka waje canza ra'ayoyi zuwa mu'amala da masu amfani ke so. Aikina yana tsakanin tsari da lamba: ina zana tsari a Figma da safe, ina gina su a React da yamma, kuma ina gyara motsi da dare. Na gaskata kyawun kayayyakin injiniyoyi suka gina waɗanda suka fahimta tsarin kuma masu tsarin da suka fahimta lamba.",
 p2: "Abin da ya banbance ni shine nina duk ɓangarorin biyu. Na tsara tsarin tsari (launi tokens, sikelin rubutu, wuri, ɗakunan karatu na components) kuma na aiwatar da su a production. Na gina pano na analytics da Recharts, fom na matakai da yawa tare da tabbatarwa, janareta na takaddun shaida tare da print CSS, da PWA wanda ke aiki offline. Ko dai yin maɓalli ya ji daɗi ko gina tsarin components, ina kawo wannan fasaha.",
 p3: "Lokacin da ban taɓa ba, ina koyo. Ina rubutu game da tsarin tsari da gine-ginen frontend, ina taimakon masu haɓaka, kuma ina bayar da gudummawa ga tushen buɗe. Na gaskia mafi kyawun injiniyoyin frontend suna da ƙwazo game da cikakkun bayanai. wuri 4px, madauki easing 200ms, yanayin mayar da hankali wanda babu wanda ya lura amma kowa yana ji. Wannan portfolio ƙoƙatina ne na nuna muku irin wannan ƙwazon.",
 highlights: [
 { label: "Shekaru frontend", value: "5+" },
 { label: "Tsarin Figma", value: "20+" },
 { label: "Components da aka gina", value: "50+" },
 { label: "Jinkiri da aka rage", value: "8x" },
 ],
 coreTitle: "Abin da na kawo.",
 coreDesc: "Tsari da injiniya, an kawo tare.",
 coreItems: [
 { title: "Tsarin Tsarin", desc: "Launi tokens, sikelin rubutu, tsarin wuri, ɗakunan karatu na components. An gina don Al-Hikmah, ana iya sake amfani da shi a cikin kayayyaki." },
 { title: "Gine-ginen Frontend", desc: "Next.js App Router, React Server Components, rukunin hanyoyi, APIs masu aminci-type. Tsarin matakin production." },
 { title: "Tsari Mai Amsawa", desc: "Mobile-first, Manufar tab 44px+, takardun kasa, menu hamburger. An gwada a cikin na'urori." },
 { title: "Bayanin Bayani", desc: "Pano na Recharts: yanayin kudin shiga, rarraba rajista, adadin wucewa. A lokaci gaskiya tare da skeleton loading." },
 { title: "Sauƙin Samun", desc: "Label na fom mai sauƙi, kewayon keyboard, yanayin mayar da hankali, abokantaka mai karanta allo. Sanin WCAG." },
 { title: "Aiki", desc: "PWA, SEO/Metadata API, Suspense, iyakar kuskure, print CSS. Sauri da aminci." },
 ],
 },
 skills: {
 badge: "Kwarewa",
 heading: "Tsari da injiniya, daga ƙarshe zuwa ƙarshe.",
 subheading:
 "Bana zaɓe ɓangare. Nina duka biyu. Daga artboard na Figma zuwa tsarin components na React. Ga abin da nake kaiwa kullum.",
 categories: {
 frontend: {
 title: "Frontend",
 items: [
 "Next.js 16",
 "React 19",
 "TypeScript",
 "Tailwind CSS 4",
 "Framer Motion",
 "Three.js",
 "Vite",
 "HTML5",
 "CSS3",
 "JavaScript",
 ],
 },
 design: {
 title: "Tsarin UI/UX",
 items: [
 "Figma",
 "Tsarin Tsarin",
 "Wireframing",
 "Prototyping",
 "Ka'idar Launi",
 "Rubutu",
 "Tsarin Wuri",
 "Ɗakunan karatu na Components",
 "Sauƙin Samun",
 "Tsari Mai Amsawa",
 ],
 },
 state: {
 title: "Jiha & Bayani",
 items: [
 "Zustand",
 "React Context API",
 "TanStack Query",
 "Recharts",
 "React Hook Form",
 "Zod",
 ],
 },
 components: {
 title: "Components",
 items: [
 "shadcn/ui",
 "Radix UI",
 "Components na Musamman",
 "Tattaunawa",
 "Dropdowns",
 "Takardu",
 "Accordion",
 "Fom",
 ],
 },
 tooling: {
 title: "Kayan Aiki",
 items: [
 "Git",
 "GitHub Actions",
 "Vercel",
 "PWA",
 "SEO/Metadata API",
 "Print CSS",
 "Duhu Yanayi",
 "Storybook",
 ],
 },
 languages: {
 title: "Harsuna",
 items: [
 "TypeScript",
 "JavaScript",
 "HTML",
 "CSS",
 "Python",
 "SQL",
 "Bash",
 ],
 },
 },
 },
 projects: {
 badge: "Ayyuka da aka Zaɓa",
 heading: "Ayyuka da aka tura, suka girma, suka koya min wani abu.",
 subheading:
 "Zaɓin kayayyakin da na tsara kuma na gina. daga manhajojin ilimi zuwa kayan aikin tsaro. Kowanne ya canza yadda nake tunani game da fasaha.",
 viewCode: "Duba Lamba",
 viewLive: "Demo kai tsaye",
 caseStudy: "Nazari Kan Harka",
 role: "Matsayi",
 impact: "Tasiri",
 tech: "Teknoloji",
 featured: "Da aka zaɓa",
 items: [
 {
 name: "Manhajar Ilimi ta Al-Hikmah",
 tagline: "Manhajar ilimi ta production tare da quiz, takaddun shaida, da analytics",
 description:
 "Cikakkiyar manhajar ilimi tare da sarrafa darasi, gina quiz, janareta takaddun shaida ta amfani da print CSS da tabbatarwa QR, pano na analytics da aka gina da Recharts, fom na matakai da yawa tare da tabbatarwa, da goyon bayan PWA. An tsara dukan tsarin a Figma da farko, sa'an nan aka tura a Next.js.",
 role: "Injiniyan Frontend & Mai Tsara UI/UX",
 impact: "Cikakken tsarin tsari, 50+ components masu sake amfani, amsawa mobile-first",
 tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
 },
 {
 name: "Rafaab",
 tagline: "Premium e-commerce marketplace with AI shopping assistant",
 description:
 "A premium e-commerce marketplace built to outshine Jumia and AliExpress. Features an AI shopping assistant called Rafi, flash sales with live countdowns, full order tracking with visual timelines, a seller dashboard, and Paystack payment integration. Distinctive gold-amulet brand identity across 8 product categories.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "AI assistant, flash sales, real-time tracking, Paystack payments",
 tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Paystack"],
 image: "/portfolio-images/rafaab.png",
 },
 {
 name: "Islam Baca",
 tagline: "Kayan aikin nazari Al-Qurani tare da binciken kalma-da-kalma",
 description:
 "Aikace-aikacen web na nazari Al-Qurani wanda ke bawa masu amfani damar karantawa, sauraro, da koyo tare da rushewar kalma-da-kalma. An gina da HTML semantic, kewayon mai sauƙi, da yanayin karantawa wanda ke girmama hankali. An tsara tsari mobile-first.",
 role: "Injiniyan Frontend & Mai Tsara UI/UX",
 impact: "Karanta kalma-da-kalma, kunna sauti, tsari na nazari mai sauƙi",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/islam-baca.png",
 },
 {
 name: "Crypto Vault",
 tagline: "Rufewa AES-256 a cikin browser",
 description:
 "Peti na rufewa na client-side wanda ke rufewa da buɗewa asiri da AES-256, gabaɗaya a cikin browser. Babu bayanan da ke fita daga na'urar. An tsara UX game da amana: yanayi mai kyau, kwafi-zuwa-clipboard, da yanayin babu-kome ba tare da rudani ba.",
 role: "Injiniyan Frontend & Mai Tsara UI/UX",
 impact: "Rufewa ba tare da-server ba, UX na sarrafa maɓalli mai tsabta",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/crypto-vault.jpeg",
 },
 {
 name: "Mai Duba Kamanceceniya",
 tagline: "Mai duba plagiarism mai yawan-algorithm tare da gauge na gani",
 description:
 "Mai duba plagiarism wanda ke gudanar da algorithms da yawa na kamanceceniya na rubutu kuma yana nuna sakamako akan gauge na gani. Ya haɗa da mataimaki na citation wanda ke ba da shawarar kyakkyawar attribution. An tsara UI na kwatanta da component na gauge daga farawa.",
 role: "Injiniyan Frontend & Mai Tsara UI/UX",
 impact: "Tsarin alama mai yawa-algorithm, gauge na gani, mataimaki na citation",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/similarity-checker.jpeg",
 },
 {
 name: "Cyber Bot",
 tagline: "Tambaya kome game da cybersecurity, sami amsa nan take",
 description:
 "Bot na Q&A na cybersecurity wanda ke bayar da amsoshi nan take akan batutuwan tsaro na yau da kullun. An tsara UI na magana, tsarin sake-tambayar, da katunan amsa masu karantawa. An gina mobile-first tare da shigarwar mai sauƙin keyboard.",
 role: "Injiniyan Frontend & Mai Tsara UI/UX",
 impact: "Amsoshi nan take, sake-tambaya, katunan amsa masu karantawa",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-bot.jpg",
 },
 {
 name: "Cyber-Words Guess",
 tagline: "Tsammani kalmar wasan siber",
 description:
 "Wasan guess-word da aka gina game da kalmomin cybersecurity. An tsara zagayen wasan, keyboard na akan-ekran, da yanayin amsa mai launi. An tura azaman app guda-shafi tare da sauyin yanayi mai santsi.",
 role: "Injiniyan Frontend & Mai Tsara UI/UX",
 impact: "Zagayen wasan, keyboard na akan-ekran, amsa mai launi",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-words.jpg",
 },
 {
 name: "[Tsarin Ku Na Gaba]",
 tagline: "Wurin da ke jiran nazari kan aikin Figma na gaba",
 description:
 "Wannan wuri ne na wucin gadi don nazari kan tsarin zai zo. Sauƙaƙe shi da aikin Figma na gaba. buɗe fayil ɗin bayanan ayyuka, maye gurbin suna, kwatancen, matsayi, tasiri, da alamun teknoloji. Tsarin nazari zai daida da kansa.",
 role: "Matsayinka Anan",
 impact: "Metrik na tasirin ku anan",
 tech: ["Figma", "Next.js", "Tailwind CSS"],
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
 },
 ],
 },
 experience: {
 badge: "Kwarewa",
 heading: "Shekaru biyar na tsarawa, gini, da turawa.",
 subheading:
 "Daga freelance frontend zuwa tsarin tsarin cikin gida. Kowane matsayi ya koya min wani sashi na fasaha.",
 items: [
 {
 role: "Injiniyan Frontend",
 company: "Freelance",
 period: "2024 - Yanzu",
 description:
 "Gina app na web na production da Next.js, TypeScript, da Tailwind. Jagorancin frontend na manhajar ilimi ta Al-Hikmah, daga Figma zuwa deploy.",
 achievements: [
 "Tsara cikakken ɗakin karatu na components da tsarin tsari",
 "Gina pano na analytics da Recharts da skeleton loading",
 "Aiwatar da PWA, print CSS don takaddun shaida, da SEO/Metadata API",
 ],
 },
 {
 role: "Mai Tsara UI/UX",
 company: "Freelance",
 period: "2023 - Yanzu",
 description:
 "Tsara kayan aikin dijital a Figma. Tsarin tsari, wireframes, prototypes, da tsari mai amsawa don web da waya.",
 achievements: [
 "Gina tsarin tsarin Al-Hikmah (launi tokens, rubutu, wuri)",
 "Bayar da ayyuka 20+ na Figma a cikin web da waya",
 "Samfurori na fom na matakai, pano, da hanyoyin waya",
 ],
 },
 {
 role: "Taimako IT & Mai Haɓaka Frontend",
 company: "NYSC, Jami'ar Kimiyyar Lafiya ta Tarayya, Ila (FUHSI)",
 period: "2025",
 description:
 "Taimako IT a FUHSI a lokacin NYSC. Magance matsalolin gaske kullum da kuma gina kayan aikin cikin gida don sarrafa ayyuka masu maimaitawa.",
 achievements: [
 "Magance tikiti 200+ na taimako a fadin hardware da software",
 "Gina kayan aikin cikin gida waɗanda ke sarrafa ayyukan taimako masu maimaitawa",
 "Rubuta magunguna na yau da kullun don tushen ilimin ƙungiyar",
 ],
 },
 {
 role: "Tafiyar Injiniyan Frontend",
 company: "Koyarwar kai",
 period: "2021 - 2023",
 description:
 "Fara koyo da HTML, CSS, da JavaScript. Gina ayyukan kansa, ƙaura zuwa React da Next.js, da kuma kwarewa akan tsari mai amsawa.",
 achievements: [
 "Tura ayyuka 6+ na kansa a HTML, CSS, da JavaScript",
 "Hawan zuwa React da Next.js da TypeScript",
 "Kwarewa akan tsari mai amsawa mobile-first a cikin na'urori",
 ],
 },
 {
 role: "Mai horar da AI",
 company: "AI4FS, Jami'ar Summit",
 period: "2023",
 description:
 "Horar da AI for Females in STEM a Jami'ar Summit. Gina prototypes masu ƙarfin AI da gabatarwa a taron.",
 achievements: [
 "Gina prototypes masu ƙarfin AI a lokacin horarwa",
 "Gabatar da aikin a taron AI4FS",
 "Hadin gwiwa da ƙungiya ta mutane da yawa na masu horarwa",
 ],
 },
 ],
 },
 openSource: {
 badge: "Tushen Buɗe",
 heading: "Mayar da ita ga fasaha.",
 subheading:
 "Tushen buɗe shine yadda al'ummar frontend ke tasowa. Ina bayar da gudummawa, kula, da rubuta takardun. domin wani ya yi min shi da farko.",
 reposLabel: "Repo na jama'a",
 starsLabel: "Taurari GitHub",
 contribsLabel: "Gudummawa / shekara",
 repos: [
 {
 name: "shadcn-extensions",
 description: "Ƙari na headless don shadcn/ui: tebur na data, palet na umarni, da input na hadaddun.",
 language: "TypeScript",
 stars: "1.8k",
 },
 {
 name: "tailwind-print-css",
 description: "Plugin na Tailwind CSS don PDF cikakken-safiya. Rarraba shafi, gefe, da kayan aikin @media print.",
 language: "TypeScript",
 stars: "1.2k",
 },
 {
 name: "figma-design-tokens",
 description: "Daidaita variables na Figma zuwa config na Tailwind da CSS custom properties. Tsarin token mai aminci-type.",
 language: "TypeScript",
 stars: "820",
 },
 {
 name: "react-quiz-builder",
 description: "Mai gina quiz na headless mai sauƙi don React. Mai biye da ARIA da mai sauƙin keyboard.",
 language: "TypeScript",
 stars: "410",
 },
 ],
 viewGithub: "Duba Bayanin GitHub",
 },
 design: {
 badge: "Tsari",
 heading: "Nazari daga fayil ɗin tsari.",
 subheading:
 "Duba bayan fayil ɗin Figma. Tsarin tsari, hanyoyin waya, pano, da shafuka. kowanne aka kai zuwa production.",
 readMore: "Duba nazari",
 cases: [
 {
 title: "Tsarin Tsarin Al-Hikmah",
 category: "Tsarin Tsari",
 excerpt:
 "Launi tokens, sikelin rubutu, tsarin wuri, da 50+ components masu sake amfani. An gina sau ɗaya, an tura a cikin dukkan manhajar ilimi.",
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
 },
 {
 title: "Hanyar Waya Islam Baca",
 category: "App na Waya",
 excerpt:
 "UX na nazari Al-Qurani kalma-da-kalma. Kewayon takardun kasa, manufa tab 44px+, da yanayin karantawa wanda ke girmama hankali.",
 gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
 },
 {
 title: "Pano na Analytics",
 category: "Pano",
 excerpt:
 "Yanayin kudin shiga, rarraba rajista, da bayanin adadin wucewa. Pano na Recharts tare da skeleton loading da sabuntawa a lokaci gaskiya.",
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
 },
 {
 title: "Takaddun Shaida & UX na Print",
 category: "Shafin Sauka",
 excerpt:
 "Janareta takaddun shaida cikakken-safiya tare da tabbatarwa QR. CSS @media print, rarraba shafi, da tsari mai sauƙin ATS.",
 gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
 },
 ],
 },
 testimonials: {
 badge: "Shaidu",
 heading: "Abin da mutanen da na yi aiki tare da su ke cewa.",
 subheading:
 "Kwatancen. Domin portfolio ba tare da su resume ne kawai tare da sunan yanki.",
 items: [
 {
 quote:
 "Upin mai tsari ne kaɗan wanda zai iya tura React production. Ya tsara tsarin tsarin mu a Figma sannan ya gina shi da kai a Next.js. Mika-miki ya kasance nan take saboda babu maka-miki.",
 name: "Sarah Chen",
 role: "Shugaban Kayayyaki, Al-Hikmah",
 },
 {
 quote:
 "Mun ɗauki Upin don tsara da gina frontend na manhajar ilimi mu. Ya bayar da cikakken tsarin tsari, 50+ components, da pano na analytics. Kyakkyawan aiki akan kowane mu'amala ba kasafai ake gani ba.",
 name: "Tunde Adebayo",
 role: "Wanda ya kafa, Startup EduTech",
 },
 {
 quote:
 "Idanunsa na wuri da rubutu ba za a iya gwammanta ba a cikin ƙungiyarmu. Ya sake gina pano mu da Recharts kuma a ƙarshe bayanai suna fada labari. Injiniyoyi da za su iya tsara wani iri ne na musamman.",
 name: "Yuki Tanaka",
 role: "Shugaban Tsari, Osaka Labs",
 },
 ],
 },
 contact: {
 badge: "Tuntuɓar",
 heading: "Bari mu gina wani abu da masu amfani ke so.",
 subheading:
 "A halin yanzu ina bude don mukaman frontend, kwangila na tsara UI/UX, da zaɓaɓɓen aikin freelance. Faɗa min abin da kake tsara ko gina.",
 nameLabel: "Sunanka",
 emailLabel: "Adireshin imel",
 messageLabel: "Saƙonka",
 namePlaceholder: "Sunanka",
 emailPlaceholder: "email@anka.com",
 messagePlaceholder: "Faɗa min game da aikinka, matsayi, ko ra'ayi...",
 send: "Aika Saƙo",
 sending: "Ana aikawa...",
 success: "Saƙon aka aika. Zan dawo maka cikin awanni 48.",
 orText: "ko",
 emailMe: "Imel ni kai tsaye",
 bookCall: "Book kiran intro na minti 30",
 downloadResume: "Duba resume",
 followTitle: "Sani ni wani wuri",
 },
 footer: {
 tagline: "Injiniyan Frontend & Mai Tsara UI/UX. Mai ginawa. Mai turawa.",
 builtWith: "An tsara & ginawa da kulawa. Next.js, TypeScript, Tailwind CSS, Figma.",
 rights: "Dukkan haƙƙoƙin an tanada.",
 backToTop: "Komawa sama",
 quickLinks: "Hanyoyi Masu Sauri",
 connect: "Haɗa",
 },
 },

 yo: {
 nav: {
 home: "Ilé",
 about: "Nípa",
 skills: "Ọgbọ́n",
 projects: "Iṣẹ́",
 experience: "Ìrírí",
 openSource: "Orísun Ìmọ̀",
 design: "Ìdàgbà",
 testimonials: "Ẹ̀rín",
 contact: "Ìbámu",
 menu: "Atẹ",
 },
 hero: {
 badge: "Ṣíṣe fún iṣẹ́ tí a yàn",
 greeting: "Ẹ n lẹ́, mo jẹ́",
 name: "Abdullah Yusuf",
 akaLabel: "tí a mọ̀ sí",
 brandName: "Upin",
 title: "Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX",
 tagline:
 "Mo n ṣètò àti kíkọ́ àwọn ìjápọ̀ tó lẹ́wà̀ tó sì wúlò fún lílo. Láti inú àkópamọ́ Figma sí React tó láàyè pixel, mo ń ṣèdá ọjà tí àwọn olùjẹwọ́ nífẹ̀.",
 ctaPrimary: "Wo Iṣẹ́ Mi",
 ctaSecondary: "Ṣí Tẹ́mínálì",
 availability: "Ṣíṣe fún ipò frontend & ìdàgbà, àti iṣẹ́ àdání",
 stat1Label: "Frontend",
 stat2Label: "Ìdàgbà",
 stat3Label: "Ìràwọ̀ OS",
 scroll: "Yọ fún ìwárí",
 },
 terminal: {
 title: "Tẹ́mínálì Ìfarahàn",
 subtitle:
 "Èyí kì í ṣe portfolio. Ó jẹ́ shẹ́lì. Tẹ àṣẹ kí o wárí. gbogbo abala jẹ́ fáìlì tí o lè kà.",
 prompt: "upin@portfolio:~$",
 welcome:
 "Káàbọ̀ sí tẹ́mínálì portfolio ìfarahàn Upin. Tẹ 'help' láti rí àwọn àṣẹ tó wà.",
 helpLine1: "Àwọn àṣẹ tó wà:",
 helpLine2: "Ìmọ̀ràn: àwọn àṣẹ kò ṣe pàtàkì bẹ́bẹ̀. Gbìyànjú 'whoami' láti bẹ̀rẹ̀.",
 commands: {
 help: "Fíhàn ìrànwọ́ yìí",
 about: "Ka about.md",
 skills: "Atokọ skills.json",
 projects: "Atokọ projects/",
 experience: "Fíhàn experience.log",
 contact: "Ìwé contact.vcf",
 clear: "Pa tẹ́mínálì mọ́",
 whoami: "Ta ni èmi?",
 ls: "Atokọ àwọn nkan inú directory",
 social: "Fíhàn àwọn ìjápọ̀ ayélujára",
 },
 outputs: {
 whoami:
 "Abdullah Yusuf (Upin). Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX pẹ̀lú ọdún 5+ n fí ìjápọ̀ production jáde. Mo ń ṣètò àwọn ọ̀nà ní Figma kí n sì kọ́ wọn ní React, láti ìbẹ̀rẹ̀ sí òpin.",
 ls: "about.md skills.json projects/ experience.log contact.vcf social.txt",
 social:
 "GitHub: github.com/mitchoder07 · LinkedIn: linkedin.com/in/mitchoder07 · X: x.com/mitchoder07 · Dribbble: dribbble.com/mitchoder07 · Figma: figma.com/@mitchoder07 · Email: olaniyiaremu2003@gmail.com",
 unknown: "àṣẹ kò rí. Tẹ 'help' fún àwọn àṣẹ tó wà.",
 },
 placeholder: "Tẹ àṣẹ kí o tẹ Enter...",
 },
 about: {
 badge: "Nípa",
 heading: "Atọ́nà tó ń kọ́ kóòdù. Onímọ̀-ẹrọ tó ń ṣètò.",
 p1: "Mo jẹ́ Abdullah Yusuf, bíbí Upin. Onímọ̀-ẹrọ frontend àti atọ́nà UI/UX tí ó ti lo ọdún márùn-ún tó kọjá n yí ìrònú di àwọn ìjápọ̀ tí àwọn olùjẹwọ́ nífẹ̀. Iṣẹ́ mi wà ní àárín ìdàgbà àti kóòdù: mo n ṣe àkópamọ́ ní Figma ní òwúrọ̀, mo n kọ́ ní React ní ọ̀sán, àti mo n yí ìmọ̀ṣẹ́ ìrìn padà ní alẹ́. Mo gbagbọ pé ọjà tó dára jẹ́ ti àwọn onímọ̀-ẹrọ tó mọ ìdàgbà àti àwọn atọ́nà tó mọ kóòdù.",
 p2: "Èyí tó yà mí sótọ̀ ní pé mo ní àwọn ẹgbẹ́ méjèèjì. Mo ti ṣètò àwọn ọ̀nà ìdàgbà (àwọn nǹkan àwọ̀, ìṣedérokò ìkọ̀wé, ìyàsọ́tọ̀, àwọn ìkòwé components) àti mo ti ṣe àmúlò wọn ní production. Mo ti kọ́ àwọn pano ìdàní-lórí pẹ̀lú Recharts, àwọn fọ́mù ìlera-mẹ́wàà pẹ̀lú ìmọ̀ràn, àwọn onímọ̀-ṣẹ̀dá ìwé-ẹ̀rí pẹ̀lú print CSS, àti PWA tó ń ṣiṣẹ́ offline. Bóyá ó jẹ́ ṣíṣe bọ́tínì jẹ́ òde tàbí ṣíṣe àkóónú ìkòwé components, mo mú ìmọ̀-ṣẹ́ kanna wá.",
 p3: "Nígbà tí n kò ń rán, mo ń koyo. Mo ń kọ̀wé nípa àwọn ọ̀nà ìdàgbà àti àkóónú frontend, mo ń ṣàkóbá fún àwọn tó ń bẹ̀rẹ̀, àti mo ń ṣe ìrànwọ́ sí orísun ìmọ̀. Mo gbagbọ pé àwọn onímọ̀-ẹrọ frontend tó dára jù jẹ́ àwọn tó ń rín ìrònú lórí àwọn nǹnà. ìyàsọ́tọ̀ 4px, ìyípadà 200ms, ìpò fókìsì tí kò ṣe àkíyèsí ṣùgbọ́n tí gbogbo ènìyàn ń rí. Portfolio yìí ìgbìyànjú mi láti fihàn ọ̀rọ̀ tó lè jẹ́ ìrònú yẹn.",
 highlights: [
 { label: "Ọdún frontend", value: "5+" },
 { label: "Àwọn ìdàgbà Figma", value: "20+" },
 { label: "Àwọn components a kọ́", value: "50+" },
 { label: "Ìdálẹ́wọ̀sí tó kéré", value: "8x" },
 ],
 coreTitle: "Èyí tí mo mú wá.",
 coreDesc: "Ìdàgbà àti ìmọ̀-ẹrọ, a fi rán pọ̀.",
 coreItems: [
 { title: "Àwọn Ọ̀nà Ìdàgbà", desc: "Àwọn nǹkan àwọ̀, ìṣedérokò ìkọ̀wé, àwọn ọ̀nà ìyàsọ́tọ̀, àwọn ìkòwé components. A kọ́ fún Al-Hikmah, a lè lo padà ká àwọn ọjà." },
 { title: "Àkóónú Frontend", desc: "Next.js App Router, React Server Components, àwọn ẹ̀ka ọ̀nà, àwọn API aàyọ-type. Ìlànà ìpele production." },
 { title: "Ìdàgbà Ìdákọsọ", desc: "Mobile-first, àwọn ìlérí tàb 44px+, àwọn ìwé-ìsàlẹ̀, àwọn atẹ hamburger. A dán wò ká àwọn ẹrọ." },
 { title: "Ìfihàn Dátà", desc: "Àwọn pano Recharts: àwọn ìrìn owó, ìpín ìforúkọ, àwọn ìpele ìwọ̀n. Pẹ̀lú àwọn skeleton kíkọ̀sí àti àwọn àyípadà gidi." },
 { title: "Ìrànwọ́ Fún Ìmọ̀ra", desc: "Àwọn label fọ́mù tó wúlò, ìmọ̀ra keyboard, àwọn ìpò fókìsì, ìwé tí kíkà-rọ̀rùn. Ìmọ̀ WCAG." },
 { title: "Iṣẹ́", desc: "PWA, SEO/Metadata API, Suspense, àwọn ìlà kìlò, print CSS. Yára àti ìfaramọ́." },
 ],
 },
 skills: {
 badge: "Ọgbọ́n",
 heading: "Ìdàgbà àti ìmọ̀-ẹrọ, láti òpin sí òpin.",
 subheading:
 "N kò yan ẹgbẹ́. Mo ní méjèèjì. Láti artboard Figma sí igi components React. Èyí ní mo máa ń fọwọ́ lọ́ọ̀dẹ̀ lójoojúmọ́.",
 categories: {
 frontend: {
 title: "Frontend",
 items: [
 "Next.js 16",
 "React 19",
 "TypeScript",
 "Tailwind CSS 4",
 "Framer Motion",
 "Three.js",
 "Vite",
 "HTML5",
 "CSS3",
 "JavaScript",
 ],
 },
 design: {
 title: "Ìdàgbà UI/UX",
 items: [
 "Figma",
 "Àwọn Ọ̀nà Ìdàgbà",
 "Wireframing",
 "Prototyping",
 "Ìmọ̀ Àwọ̀",
 "Ìkọ̀wé",
 "Àwọn Ọ̀nà Ìyàsọ́tọ̀",
 "Àwọn Ìkòwé Components",
 "Ìrànwọ́ Fún Ìmọ̀ra",
 "Ìdàgbà Ìdákọsọ",
 ],
 },
 state: {
 title: "Ìpò & Dátà",
 items: [
 "Zustand",
 "React Context API",
 "TanStack Query",
 "Recharts",
 "React Hook Form",
 "Zod",
 ],
 },
 components: {
 title: "Àwọn Components",
 items: [
 "shadcn/ui",
 "Radix UI",
 "Àwọn Components Tó yàtọ̀",
 "Àwọn Ọ̀rọ̀-Sọ̀rọ̀",
 "Àwọn Dropdown",
 "Àwọn Ìwé",
 "Àwọn Accordion",
 "Àwọn Fọ́mù",
 ],
 },
 tooling: {
 title: "Àwọn Ohun Èlò",
 items: [
 "Git",
 "GitHub Actions",
 "Vercel",
 "PWA",
 "SEO/Metadata API",
 "Print CSS",
 "Ìrìn Dúdú",
 "Storybook",
 ],
 },
 languages: {
 title: "Àwọn Èdè",
 items: [
 "TypeScript",
 "JavaScript",
 "HTML",
 "CSS",
 "Python",
 "SQL",
 "Bash",
 ],
 },
 },
 },
 projects: {
 badge: "Iṣẹ́ Tí a Yàn",
 heading: "Àwọn iṣẹ́ tí a rán, tó tòrò, tó sì kọ́ mi.",
 subheading:
 "Àtòjọ àwọn ọjà tí mo ti ṣètò àti kíkọ́. láti inú àwọn manhà ẹ̀kọ́ sí àwọn ohun èlò àbò. Ọ̀kọ̀ọ̀kan wọn yí ìrònú mi nípa ìmọ̀-ṣẹ́ padà.",
 viewCode: "Wo Kóòdù",
 viewLive: "Demo Live",
 caseStudy: "Ìwádìí Iṣẹ́",
 role: "Ipò",
 impact: "Ìbámu",
 tech: "Teknọ́lọ́jì",
 featured: "Tí a yàn",
 items: [
 {
 name: "Manhà Ẹ̀kọ́ Al-Hikmah",
 tagline: "Manhà ẹ̀kọ́ production pẹ̀lú àwọn quiz, ìwé-ẹ̀rí, àti analytics",
 description:
 "Manhà ẹ̀kọ́ kíkankín pẹ̀lú ìṣàkóso ẹ̀kọ́, kíkọ́ quiz, ṣíṣẹ̀dá ìwé-ẹ̀rí pẹ̀lú print CSS àti ìmọ̀ràn QR, àwọn pano analytics pẹ̀lú Recharts, àwọn fọ́mù ìlera-mẹ́wàà pẹ̀lú ìmọ̀ràn, àti ìtìlẹ́yìn PWA. A ṣètò gbogbo ọ̀nà ní Figma kí ó tó di a fi rán ní Next.js.",
 role: "Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX",
 impact: "Àkóónú ìdàgbà kíkankín, 50+ àwọn components tó lè lo padà, ìdákọsọ mobile-first",
 tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
 },
 {
 name: "Rafaab",
 tagline: "Premium e-commerce marketplace with AI shopping assistant",
 description:
 "A premium e-commerce marketplace built to outshine Jumia and AliExpress. Features an AI shopping assistant called Rafi, flash sales with live countdowns, full order tracking with visual timelines, a seller dashboard, and Paystack payment integration. Distinctive gold-amulet brand identity across 8 product categories.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "AI assistant, flash sales, real-time tracking, Paystack payments",
 tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Paystack"],
 image: "/portfolio-images/rafaab.png",
 },
 {
 name: "Islam Baca",
 tagline: "Ohun èlò kọ́kọ́-Quran pẹ̀lú ìyẹ̀wò ọ̀rọ̀-lórọ̀rọ̀",
 description:
 "Aplíkẹ́shàn web kọ́kọ́-Quran tó ń fún àwọn olùjẹwọ̀ ní àṣẹ kíkà, ìgbọ́ràn, àti kíkọ́ pẹ̀lú ìpín ọ̀rọ̀-lórọ̀rọ̀. A kọ́ pẹ̀lú HTML àmì, ìmọ̀ra tó wúlò, àti ìpò kíkà tó ń gbé fókìsì yẹ. A ṣètò ìlànà mobile-first.",
 role: "Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX",
 impact: "Ọ̀rọ̀-lórọ̀rọ̀ kíkà, ìfọ̀rọ̀-lórìí ohun, ìlànà kíkọ́ tó wúlò",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/islam-baca.png",
 },
 {
 name: "Crypto Vault",
 tagline: "Ìfipamọ́ AES-256 nínú browser",
 description:
 "Peti ìfipamọ́ client-side tó ń fi AES-256 pamọ́ àti ìmọ̀ra, gogbo nínú browser. Kò sí dátà tó ń jáde kúrò nínú ẹrọ. A ṣètò UX lórí ìgbàgbo: àwọn ìpò tó yé, ìdákọ́-sí-clipboard, àti àwọn ìpò àìsùn-ìkọ̀kọ̀ láìsí ìdàrò.",
 role: "Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX",
 impact: "Ìfipamọ́ láìsí-server, ìmọ̀ra ìṣàkóso bọ́tínì tó mọ́",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/crypto-vault.jpeg",
 },
 {
 name: "Olùyẹ̀wò Ìbámu",
 tagline: "Olùyẹ̀wò plagiarism ọ̀pọ̀lọpọ̀-ìmọ̀-ẹrọ pẹ̀lú gauge tó ń fihàn",
 description:
 "Olùyẹ̀wò plagiarism tó ń ṣiṣẹ́ ọ̀pọ̀lọpọ̀ ìmọ̀-ẹrọ ìbámu kóòdù àti tó ń fi èsì hàn lórí gauge tó ń fihàn. Ó ní ìrànwọ́ citation tó ń ṣàbá nítorí ìjápọ̀ tó yẹ. A ṣètò UI ìyẹ̀wò àti component gauge láti ìbẹ̀rẹ̀.",
 role: "Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX",
 impact: "Ìṣirò ọ̀pọ̀lọpọ̀-ìmọ̀-ẹrọ, gauge tó ń fihàn, ìrànwọ́ citation",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/similarity-checker.jpeg",
 },
 {
 name: "Cyber Bot",
 tagline: "Béèrè ohunkóhun nípa àbò siber, gba èsì lọ́nàìyára",
 description:
 "Bot Q&A àbò siber tó ń fún èsì lọ́nàìyára lórí àwọn àkọlé àbò tó wọ́pọ̀. A ṣètò UI ìsọ̀rọ̀-sọ̀rọ̀, ìlànà ìdámọ̀ràn-prompt, àti àwọn káàdì èsì tó rọ̀ láti kà. A kọ́ mobile-first pẹ̀lú ìmọ̀ra keyboard tó wúlò.",
 role: "Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX",
 impact: "Èsì lọ́nàìyára, àwọn ìdámọ̀ràn prompt, àwọn káàdì èsì tó rọ̀ láti kà",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-bot.jpg",
 },
 {
 name: "Cyber-Words Guess",
 tagline: "Tẹ ọ̀rọ̀ siber náà ṣe é ṣe",
 description:
 "Eré títẹ̀-ọ̀rọ̀ tó kọ́nà àwọn ọ̀rọ̀ àbò siber. A ṣètò ìlànà eré, keyboard lórí-ẹ̀rọ, àti àwọn ìpò ìdámọ̀ràn tó ní àwọ̀. A fi jáde gẹ́gẹ́ bíi ápó ojú-ìwé-kan pẹ̀lú àwọn ìyípadà ìpò tó rọ̀.",
 role: "Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX",
 impact: "Ìlànà eré, keyboard lórí-ẹ̀rọ, ìdámọ̀ràn tó ní àwọ̀",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-words.jpg",
 },
 {
 name: "[Ìdàgbà Rẹ Tó Ń Bọ̀]",
 tagline: "Ibi tí ó ń retí ìwádìí iṣẹ́ Figma rẹ tó nbọ̀",
 description:
 "Èyí jẹ́ iṣẹ́ àìní fún ìwádìí ìdàgbà tó nbọ̀. Pa á mọ́ pẹ̀lú iṣẹ́ Figma rẹ tó nbọ̀. ṣí fáìlì dáta iṣẹ́, yí orúkọ, ìwọ̀n, ipò, ìbámu, àti àwọn aṣàyè teknọ́lọ́jì. Ìlànà ìwádìí yóò dálá lórí rẹ̀ pẹ̀lú ìmọ̀ra.",
 role: "Ipò Rẹ Níbí",
 impact: "Àwọn ìwọ̀n ìbámu rẹ níbí",
 tech: ["Figma", "Next.js", "Tailwind CSS"],
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
 },
 ],
 },
 experience: {
 badge: "Ìrírí",
 heading: "Ọdún márùn-ún kíkọ́, fífi rán, àti ìṣàkóso.",
 subheading:
 "Láti inú àwọn ìbẹ̀rẹ̀ freelance frontend sí àwọn ọ̀nà ìdàgbà inú. Ipò kọ̀ọ̀kan kọ́ mi ọ̀nà ìmọ̀-ṣẹ́ tó yàtọ̀.",
 items: [
 {
 role: "Onímọ̀-Ẹrọ Frontend",
 company: "Freelance",
 period: "2024 - Lọ́wọ́lọ́wọ́",
 description:
 "Kíkọ́ àwọn ápó web production pẹ̀lú Next.js, TypeScript, àti Tailwind. Mo ṣàkóso frontend manhà ẹ̀kọ́ Al-Hikmah, láti Figma sí ìràn.",
 achievements: [
 "Ṣètò ìkòwé components kíkankín àti ọ̀nà ìdàgbà",
 "Kọ́ àwọn pano analytics pẹ̀lú Recharts àti skeleton kíkọ̀sí",
 "Ṣe àmúlò PWA, print CSS fún àwọn ìwé-ẹ̀rí, àti SEO/Metadata API",
 ],
 },
 {
 role: "Atọ́nà UI/UX",
 company: "Freelance",
 period: "2023 - Lọ́wọ́lọ́wọ́",
 description:
 "Ṣíṣètò àwọn ọjà dijítál ní Figma. Àwọn ọ̀nà ìdàgbà, àwọn wireframe, àwọn prototype, àti àwọn ìlànà ìdákọsọ fún web àti ẹ̀rọ-aládani.",
 achievements: [
 "Kọ́ ọ̀nà ìdàgbà Al-Hikmah (àwọn nǹkan àwọ̀, ìkọ̀wé, ìyàsọ́tọ̀)",
 "Pèsè àwọn iṣẹ́ Figma 20+ ká web àti ẹ̀rọ-aládani",
 "Ṣe àwọn prototype fún àwọn fọ́mù, pano, àti àwọn ìrìn ẹ̀rọ-aládani",
 ],
 },
 {
 role: "Ìrànwọ́ IT & Onímọ̀-ẹrọ Frontend",
 company: "NYSC, Jami'ar Ìmọ̀-Ìlera Federal, Ila (FUHSI)",
 period: "2025",
 description:
 "Ìrànwọ́ IT ní FUHSI nígbà NYSC. Ìyàsọ́tọ̀ àwọn ìṣòro gidi ní kọ̀ọ̀kan ọjọ́ àti kíkọ́ àwọn ohun èlò inú fún ìmọ́ṣẹ́ àwọn iṣẹ́ tó ń yípadà.",
 achievements: [
 "Yàsọ́ àwọn tícẹ̀tì ìrànwọ́ 200+ ká hardware àti software",
 "Kọ́ àwọn ohun èlò inú tó ń ṣe àmúlò àwọn iṣẹ́ ìrànwọ́ tó ń yípadà",
 "Kọ̀wé àwọn ìyàsọ́tọ̀ tó wọ́pọ̀ fún tùmọ̀ ìmọ̀ ẹgbẹ́",
 ],
 },
 {
 role: "Ìrìn Onímọ̀-ẹrọ Frontend",
 company: "Kọ́kọ́-ara-ẹni",
 period: "2021 - 2023",
 description:
 "Ìbẹ̀rẹ̀ kíkọ́ HTML, CSS, àti JavaScript. Kíkọ́ àwọn iṣẹ́ ara-ẹni, yípadà sí React àti Next.js, àti ìmọ̀ ìdàgbà ìdákọsọ.",
 achievements: [
 "Fi àwọn iṣẹ́ ara-ẹni 6+ jáde ní HTML, CSS, àti JavaScript",
 "Yípadà sí React àti Next.js pẹ̀lú TypeScript",
 "Ìmọ̀ ìdàgbà ìdákọsọ mobile-first ká àwọn ẹrọ",
 ],
 },
 {
 role: "Ọmọ-iṣẹ́ AI",
 company: "AI4FS, Jami'ar Summit",
 period: "2023",
 description:
 "Ọmọ-iṣẹ́ AI for Females in STEM ní Jami'ar Summit. Kíkọ́ àwọn prototype AI-àgbára àti ìfihàn ní àpérì.",
 achievements: [
 "Kọ́ àwọn prototype AI-àgbára nígbà ọmọ-iṣẹ́",
 "Fihàn ìṣẹ́ iṣẹ́ ní àpérì AI4FS",
 "Ṣe àjùmọ̀ṣe pẹ̀lú ẹgbẹ́ tó yàtọ̀-ìyàsọ́tọ̀ àwọn ọmọ-iṣẹ́",
 ],
 },
 ],
 },
 openSource: {
 badge: "Orísun Ìmọ̀",
 heading: "Fífún ìmọ̀-ẹrọ padà.",
 subheading:
 "Orísun ìmọ̀ ni ọ̀nà tí àwọn ẹgbẹ́ frontend ń dàgbà-sókè. Mo ń ṣe ìrànwọ́, bámú, àti kọ̀wé. nítorí wọn ṣe fún mi tẹ́lẹ̀.",
 reposLabel: "Àwọn repo gbogbo-ènìyàn",
 starsLabel: "Àwọn ìràwọ̀ GitHub",
 contribsLabel: "Àwọn ìrànwọ́ / ọdún",
 repos: [
 {
 name: "shadcn-extensions",
 description: "Àwọn ẹ̀yà headless fún shadcn/ui: àwọn tábìlì dátà, àwọn paletì àṣẹ, àti àwọn ìmọ̀ra ìpìlẹ̀.",
 language: "TypeScript",
 stars: "1.8k",
 },
 {
 name: "tailwind-print-css",
 description: "Plugin Tailwind CSS fún àwọn PDF tó wálé-dájú. Ìyàsọ́tọ̀ ojú-ìwé, àwọnẹpẹ, àti àwọn ohun èlò @media print.",
 language: "TypeScript",
 stars: "1.2k",
 },
 {
 name: "figma-design-tokens",
 description: "Ṣe àdájọ́ àwọn variables Figma sí config Tailwind àti àwọn àbájáde CSS. Ìlànà token aàyọ-type.",
 language: "TypeScript",
 stars: "820",
 },
 {
 name: "react-quiz-builder",
 description: "Olùkọ́ quiz headless tó wúlò fún React. Tó bá àṣẹ ARIA àti tó wúlò pẹ̀lú keyboard.",
 language: "TypeScript",
 stars: "410",
 },
 ],
 viewGithub: "Wo Ìwé GitHub",
 },
 design: {
 badge: "Ìdàgbà",
 heading: "Àwọn ìwádìí láti inú fáìlì ìdàgbà.",
 subheading:
 "Ìwòye sókè fáìlì Figma. Àwọn ọ̀nà ìdàgbà, àwọn ìrìn ẹ̀rọ-aládani, àwọn pano, àti àwọn ojú-ìwé ìsùn. ọ̀kọ̀ọ̀kan a fi rán sí production.",
 readMore: "Wo ìwádìí iṣẹ́",
 cases: [
 {
 title: "Ọ̀nà Ìdàgbà Al-Hikmah",
 category: "Ọ̀nà Ìdàgbà",
 excerpt:
 "Àwọn nǹkan àwọ̀, ìṣedérokò ìkọ̀wé, ọ̀nà ìyàsọ́tọ̀, àti 50+ àwọn components tó lè lo padà. A kọ́ lẹ́ẹ̀kan, a fi rán ká manhà ẹ̀kọ́ kíkankín.",
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
 },
 {
 title: "Ìrìn Ẹ̀rọ-aládani Islam Baca",
 category: "Ápó Ẹ̀rọ-aládani",
 excerpt:
 "UX kọ́kọ́-Quran ọ̀rọ̀-lórọ̀rọ̀. Ìmọ̀ra ìwé-ìsàlẹ̀, àwọn ìlérí tàb 44px+, àti ìpò kíkà tó ń gbé fókìsì yẹ.",
 gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
 },
 {
 title: "Pano Analytics",
 category: "Pano",
 excerpt:
 "Àwọn ìrìn owó, ìpín ìforúkọ, àti àwọn ìfihàn ìpele ìwọ̀n. Àwọn pano Recharts pẹ̀lú àwọn skeleton kíkọ̀sí àti àwọn àyípadà gidi.",
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
 },
 {
 title: "Ìwé-ẹ̀rí & UX Print",
 category: "Ojú-ìwé Ìsùn",
 excerpt:
 "Olùṣẹ̀dá ìwé-ẹ̀rí tó wálé-dájú pẹ̀lú ìmọ̀ràn QR. CSS @media print, ìyàsọ́tọ̀ ojú-ìwé, àti àwọn ìlànà tó wúlò fún ATS.",
 gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
 },
 ],
 },
 testimonials: {
 badge: "Ẹ̀rín",
 heading: "Ìró tí àwọn tó ti bá mi ṣiṣẹ́ ń sọ.",
 subheading:
 "Ìwé-ẹ̀rí. Nítorí portfolio láìsí wọn, résumé ni pẹ̀lú orúkọ ìdáná.",
 items: [
 {
 quote:
 "Upin jẹ́ atọ́nà tó yàtọ̀ tó lè fi React production rán. Ó ṣètò ọ̀nà ìdàgbà wa ní Figma lẹ́yìn náà ó kọ́ ọ̀ pẹ̀lú ara rẹ̀ ní Next.js. Ìfúnni-jọwọ́ jẹ́ lọ́nàìyára nítorí kò sí ìfúnni-jọwọ́.",
 name: "Sarah Chen",
 role: "Ìṣàkóso Ọjà, Al-Hikmah",
 },
 {
 quote:
 "A gbé Upin láti ṣètò àti kíkọ́ frontend manhà ẹ̀kọ́ wa. Ó pèsè ọ̀nà ìdàgbà kíkankín, 50+ àwọn components, àti àwọn pano analytics. Ìdárí wà lórí kọ̀ọ̀kan ìfarahàn, èyí tó kò wọ́pọ̀.",
 name: "Tunde Adebayo",
 role: "Atẹ̀rín, Startup EduTech",
 },
 {
 quote:
 "Ọjú rẹ̀ fún ìyàsọ́tọ̀ àti ìkọ̀wé kò ní ìdójú-òde nínú ẹgbẹ́ wa. Ó tún kọ́ pano wa pẹ̀lú Recharts kí ó sì jẹ́ kí dátà sọ ìtàn. Àwọn onímọ̀-ẹrọ tó lè ṣètò jẹ́ irú àwọn ènìyàn tó yàtọ̀.",
 name: "Yuki Tanaka",
 role: "Ìṣàkóso Ìdàgbà, Osaka Labs",
 },
 ],
 },
 contact: {
 badge: "Ìbámu",
 heading: "Ẹ jẹ́ ká bẹ̀rẹ̀ ohun tó yẹ ká rán.",
 subheading:
 "Lọ́wọ́lọ́wọ́ mo wà fún àwọn ipò frontend, àwọn ìdàgbà UI/UX, àti iṣẹ́ àdání tó a yàn. Sọ fún mi ohun tó ń bẹ̀.",
 nameLabel: "Orúkọ rẹ",
 emailLabel: "Adírẹ́sì emaili",
 messageLabel: "Àṣẹ́ rẹ",
 namePlaceholder: "Orúkọ rẹ",
 emailPlaceholder: "email@rẹ.com",
 messagePlaceholder: "Sọ fún mi nípa iṣẹ́ rẹ, ipò, tàbí ìrònú...",
 send: "Fi Àṣẹ́ Rán",
 sending: "Ìfí-rán...",
 success: "Àṣẹ́ rán. Mo ó dáhùn pẹ̀lú rẹ láìjẹ́ gba àwọ̀ 48.",
 orText: "tàbí",
 emailMe: "Emaili mi lọ́wọ́-dọ́tọ́",
 bookCall: "Pè pẹ̀lú ọ̀pọ̀-mínítì 30",
 downloadResume: "Wo résumé",
 followTitle: "Rí mi níbi mìíràn",
 },
 footer: {
 tagline: "Onímọ̀-Ẹrọ Frontend & Atọ́nà UI/UX. Oníkọ́. Onífí-rán.",
 builtWith: "A ṣètò & kọ́ pẹ̀lú ìtọ́jú. Next.js, TypeScript, Tailwind CSS, Figma.",
 rights: "Gbogbo ẹ̀tọ̀ dábàbà.",
 backToTop: "Padà sí òkè",
 quickLinks: "Àwọn Ìjápọ̀ Yara",
 connect: "Dá pọ̀",
 },
 },

 ja: {
 nav: {
 home: "ホーム",
 about: "私について",
 skills: "スキル",
 projects: "プロジェクト",
 experience: "経歴",
 openSource: "オープンソース",
 design: "デザイン",
 testimonials: "推薦の声",
 contact: "お問い合わせ",
 menu: "メニュー",
 },
 hero: {
 badge: "厳選された案件の依頼を受付中",
 greeting: "こんにちは、",
 name: "Abdullah Yusuf",
 akaLabel: "通称",
 brandName: "Upin",
 title: "フロントエンドエンジニア & UI/UXデザイナー",
 tagline:
 "美しくアクセシブルなインターフェースを設計し構築します。FigmaのワイヤーフレームからピクセルパーフェクトなReactまで、ユーザーが愛するプロダクトを作ります。",
 ctaPrimary: "作品を見る",
 ctaSecondary: "ターミナルを開く",
 availability: "フロントエンド・デザインのポジションと契約業務募集中",
 stat1Label: "フロントエンド",
 stat2Label: "デザイン",
 stat3Label: "OS Stars",
 scroll: "スクロールして探検",
 },
 terminal: {
 title: "インタラクティブターミナル",
 subtitle:
 "これはポートフォリオではありません。シェルです。コマンドを入力して探検してください. 各セクションは読めるファイルです。",
 prompt: "upin@portfolio:~$",
 welcome:
 "Upinのインタラクティブポートフォリオターミナルへようこそ。「help」と入力すると使用可能なコマンドが表示されます。",
 helpLine1: "使用可能なコマンド:",
 helpLine2: "ヒント: コマンドは大文字小文字を区別しません。「whoami」から始めてみてください。",
 commands: {
 help: "このヘルプメッセージを表示",
 about: "about.mdを読む",
 skills: "skills.jsonを一覧表示",
 projects: "projects/を一覧表示",
 experience: "experience.logを表示",
 contact: "contact.vcfを印刷",
 clear: "ターミナルをクリア",
 whoami: "私は誰?",
 ls: "ディレクトリの内容を一覧表示",
 social: "ソーシャルリンクを表示",
 },
 outputs: {
 whoami:
 "Abdullah Yusuf (Upin). フロントエンドエンジニア & UI/UXデザイナー。5年以上プロダクション品質のインターフェースを出荷。Figmaでシステムを設計し、Reactで構築します。エンドツーエンド。",
 ls: "about.md skills.json projects/ experience.log contact.vcf social.txt",
 social:
 "GitHub: github.com/mitchoder07 · LinkedIn: linkedin.com/in/mitchoder07 · X: x.com/mitchoder07 · Dribbble: dribbble.com/mitchoder07 · Figma: figma.com/@mitchoder07 · Email: olaniyiaremu2003@gmail.com",
 unknown: "コマンドが見つかりません。「help」と入力して使用可能なコマンドを確認してください。",
 },
 placeholder: "コマンドを入力してEnterを押してください...",
 },
 about: {
 badge: "私について",
 heading: "コードを書くデザイナー。デザインするエンジニア。",
 p1: "私はAbdullah Yusuf、通称Upin。過去5年間、アイデアをユーザーが愛するインターフェースに変えてきたフロントエンドエンジニアでありUI/UXデザイナーです。私の仕事はデザインとコードの交差点にあります。朝にFigmaでワイヤーフレームを描き、午後にReactで構築し、夜にアニメーションを磨きます。偉大なプロダクトは、デザインを理解するエンジニアとコードを理解するデザイナーから生まれると信じています。",
 p2: "私を際立たせるのは、両方を所有していることです。デザインシステム（カラートークン、タイポグラフィスケール、スペーシング、コンポーネントライブラリ）を設計し、それをプロダクションで実装してきました。Rechartsでのアナリティクスダッシュボード、バリデーション付きマルチステップフォーム、print CSSを使った証明書ジェネレーター、オフラインで動くPWAを構築してきました。ボタンの手触りを整えるにも、コンポーネントライブラリを設計するにも、同じ職人技を持ち込みます。",
 p3: "出荷していない時は学んでいます。デザインシステムとフロントエンドアーキテクチャについて書き、志す開発者をメンターし、オープンソースに貢献しています。最高のフロントエンドエンジニアは細部に執着すると信じています。4pxのパディング、200msのイージングカーブ、誰も気づかないが誰もが感じるフォーカス状態。このポートフォリオは、その執着がどのようなものかをお見せする試みです。",
 highlights: [
 { label: "フロントエンド年数", value: "5+" },
 { label: "Figmaデザイン", value: "20+" },
 { label: "構築コンポーネント", value: "50+" },
 { label: "レイテンシ削減", value: "8x" },
 ],
 coreTitle: "私がもたらすもの。",
 coreDesc: "デザインとエンジニアリング、一緒に届ける。",
 coreItems: [
 { title: "デザインシステム", desc: "カラートークン、タイポグラフィスケール、スペーシングシステム、コンポーネントライブラリ。Al-Hikmahのために構築、プロダクト全体で再利用可能。" },
 { title: "フロントエンドアーキテクチャ", desc: "Next.js App Router、React Server Components、ルートグループ、型安全なAPI。プロダクション級の構造。" },
 { title: "レスポンシブデザイン", desc: "モバイルファースト、44px+のタップターゲット、ボトムシート、ハンバーガーメニュー。デバイス横断でテスト済み。" },
 { title: "データ可視化", desc: "Rechartsダッシュボード: 売上トレンド、登録分布、合格率。ローディングスケルトン付きでリアルタイム。" },
 { title: "アクセシビリティ", desc: "アクセシブルなフォームラベル、キーボードナビゲーション、フォーカス状態、スクリーンリーダー対応。WCAG対応。" },
 { title: "パフォーマンス", desc: "PWA、SEO/Metadata API、Suspense、エラーバウンダリ、print CSS。速くて信頼できる。" },
 ],
 },
 skills: {
 badge: "スキル",
 heading: "デザインとエンジニアリング、エンドツーエンド。",
 subheading:
 "どちらかを選びません。両方を所有します。FigmaのアートボードからReactのコンポーネントツリーまで。これが毎日使っているものです。",
 categories: {
 frontend: {
 title: "フロントエンド",
 items: [
 "Next.js 16",
 "React 19",
 "TypeScript",
 "Tailwind CSS 4",
 "Framer Motion",
 "Three.js",
 "Vite",
 "HTML5",
 "CSS3",
 "JavaScript",
 ],
 },
 design: {
 title: "UI/UXデザイン",
 items: [
 "Figma",
 "デザインシステム",
 "ワイヤーフレーミング",
 "プロトタイピング",
 "カラー理論",
 "タイポグラフィ",
 "スペーシングシステム",
 "コンポーネントライブラリ",
 "アクセシビリティ",
 "レスポンシブデザイン",
 ],
 },
 state: {
 title: "状態 & データ",
 items: [
 "Zustand",
 "React Context API",
 "TanStack Query",
 "Recharts",
 "React Hook Form",
 "Zod",
 ],
 },
 components: {
 title: "コンポーネント",
 items: [
 "shadcn/ui",
 "Radix UI",
 "カスタムコンポーネント",
 "ダイアログ",
 "ドロップダウン",
 "シート",
 "アコーディオン",
 "フォーム",
 ],
 },
 tooling: {
 title: "ツール",
 items: [
 "Git",
 "GitHub Actions",
 "Vercel",
 "PWA",
 "SEO/Metadata API",
 "Print CSS",
 "ダークモード",
 "Storybook",
 ],
 },
 languages: {
 title: "言語",
 items: [
 "TypeScript",
 "JavaScript",
 "HTML",
 "CSS",
 "Python",
 "SQL",
 "Bash",
 ],
 },
 },
 },
 projects: {
 badge: "選考作品",
 heading: "出荷され、スケールし、私に教訓を与えたプロジェクト。",
 subheading:
 "私が設計し構築したプロダクトの厳選コレクション. 教育プラットフォームからセキュリティツールまで。それぞれが私の職人観を変えました。",
 viewCode: "コードを見る",
 viewLive: "ライブデモ",
 caseStudy: "ケーススタディ",
 role: "役割",
 impact: "インパクト",
 tech: "技術",
 featured: "注目",
 items: [
 {
 name: "Al-Hikmah教育プラットフォーム",
 tagline: "クイズ、証明書、アナリティクス付きプロダクション教育プラットフォーム",
 description:
 "コース管理、クイズビルダー、print CSSとQR検証を使った証明書ジェネレーター、Rechartsで構築したアナリティクスダッシュボード、バリデーション付きマルチステップフォーム、PWAサポートを備えた完全な教育プラットフォーム。まずFigmaでシステム全体を設計し、その後Next.jsで出荷しました。",
 role: "フロントエンドエンジニア & UI/UXデザイナー",
 impact: "完全なデザインシステム、50以上の再利用可能コンポーネント、モバイルファーストレスポンシブ",
 tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
 },
 {
 name: "Rafaab",
 tagline: "Premium e-commerce marketplace with AI shopping assistant",
 description:
 "A premium e-commerce marketplace built to outshine Jumia and AliExpress. Features an AI shopping assistant called Rafi, flash sales with live countdowns, full order tracking with visual timelines, a seller dashboard, and Paystack payment integration. Distinctive gold-amulet brand identity across 8 product categories.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "AI assistant, flash sales, real-time tracking, Paystack payments",
 tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Paystack"],
 image: "/portfolio-images/rafaab.png",
 },
 {
 name: "Islam Baca",
 tagline: "単語ごと分析するクルアーン学習ツール",
 description:
 "ユーザーが読み、聞き、単語ごとの分解で学べるクルアーン学習Webアプリ。セマンティックHTML、アクセシブルなナビゲーション、集中を尊重する読書モードで構築。モバイルファーストでレイアウトを設計。",
 role: "フロントエンドエンジニア & UI/UXデザイナー",
 impact: "単語ごとのリーダー、音声再生、アクセシブルな学習フロー",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/islam-baca.png",
 },
 {
 name: "Crypto Vault",
 tagline: "ブラウザ内のAES-256暗号化",
 description:
 "シークレットをAES-256で完全にブラウザ内で暗号化・復号するクライアントサイドの暗号化ボールト。デバイスからデータが外に出ません。信頼を中心にUXを設計: 明確な状態、クリップボードコピー、混乱のない空状態。",
 role: "フロントエンドエンジニア & UI/UXデザイナー",
 impact: "サーバーレス暗号化、クリーンなキー管理UX",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/crypto-vault.jpeg",
 },
 {
 name: "Similarity Checker",
 tagline: "視覚的ゲージ付きマルチアルゴリズム剽窃チェッカー",
 description:
 "複数のテキスト類似度アルゴリズムを実行し、結果を視覚的ゲージに表示する剽窃チェッカー。適切な引用を提案する引用アシスタント付き。比較UIとゲージコンポーネントをゼロから設計。",
 role: "フロントエンドエンジニア & UI/UXデザイナー",
 impact: "マルチアルゴリズムスコアリング、視覚的ゲージ、引用アシスタント",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/similarity-checker.jpeg",
 },
 {
 name: "Cyber Bot",
 tagline: "サイバーセキュリティについて何でも聞ける、即座に回答",
 description:
 "一般的なセキュリティトピックについて即座に回答するサイバーセキュリティQ&Aボット。会話UI、サジェストプロンプトパターン、読みやすい回答カードを設計。キーボードフレンドリーな入力でモバイルファーストに構築。",
 role: "フロントエンドエンジニア & UI/UXデザイナー",
 impact: "即座の回答、サジェストプロンプト、読みやすい回答カード",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-bot.jpg",
 },
 {
 name: "Cyber-Words Guess",
 tagline: "サイバーアルースを当てるゲーム",
 description:
 "サイバーセキュリティ用語を中心に構築された単語推測ゲーム。ゲームループ、オンスクリーンキーボード、色分けされたフィードバック状態を設計。スムーズな状態遷移でシングルページアプリとして出荷。",
 role: "フロントエンドエンジニア & UI/UXデザイナー",
 impact: "ゲームループ、オンスクリーンキーボード、色分けフィードバック",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-words.jpg",
 },
 {
 name: "[あなたの次のデザイン]",
 tagline: "あなたの次のFigmaケーススタディを待つスロット",
 description:
 "これは将来のデザインケーススタディ用のプレースホルダースロットです。次のFigmaプロジェクトと差し替えてください. プロジェクトデータファイルを開き、名前、説明、役割、インパクト、技術タグを置き換えます。ケーススタディレイアウトは自動的に適応します。",
 role: "あなたの役割",
 impact: "あなたのインパクト指標",
 tech: ["Figma", "Next.js", "Tailwind CSS"],
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
 },
 ],
 },
 experience: {
 badge: "経歴",
 heading: "設計、構築、出荷の5年間。",
 subheading:
 "フリーランスのフロントエンドから社内デザインシステムまで。各役割が職務の異なる側面を教えてくれました。",
 items: [
 {
 role: "フロントエンドエンジニア",
 company: "フリーランス",
 period: "2024 - 現在",
 description:
 "Next.js、TypeScript、Tailwindでプロダクション品質のWebアプリを構築。Al-Hikmah教育プラットフォームのフロントエンドをFigmaからデプロイまでリード。",
 achievements: [
 "完全なコンポーネントライブラリとデザインシステムを設計",
 "Rechartsとローディングスケルトンでアナリティクスダッシュボードを構築",
 "PWA、証明書用print CSS、SEO/Metadata APIを実装",
 ],
 },
 {
 role: "UI/UXデザイナー",
 company: "フリーランス",
 period: "2023 - 現在",
 description:
 "Figmaでデジタルプロダクトを設計。Webとモバイル向けのデザインシステム、ワイヤーフレーム、プロトタイプ、レスポンシブレイアウト。",
 achievements: [
 "Al-Hikmahデザインシステム（カラートークン、タイポグラフィ、スペーシング）を構築",
 "Webとモバイルにわたり20以上のFigmaプロジェクトを納品",
 "マルチステップフォーム、ダッシュボード、モバイルフローをプロトタイプ",
 ],
 },
 {
 role: "ITサポート & フロントエンド開発者",
 company: "NYSC、連邦保健科学大学イラ (FUHSI)",
 period: "2025",
 description:
 "NYSC期間中のFUHSIでのITサポート。毎日リアルな問題を解決し、反復タスクを自動化する社内ツールを構築。",
 achievements: [
 "ハードウェアとソフトウェアにわたり200以上のサポートチケットを解決",
 "反復するサポートタスクを自動化する社内ツールを構築",
 "チームのナレッジベース向けに一般的な修正手順を文書化",
 ],
 },
 {
 role: "フロントエンドエンジニアリングの旅",
 company: "独学",
 period: "2021 - 2023",
 description:
 "HTML、CSS、JavaScriptの学習から開始。個人プロジェクトを構築し、ReactとNext.jsにレベルアップし、レスポンシブデザインを習得。",
 achievements: [
 "HTML、CSS、JavaScriptで6以上の個人プロジェクトを出荷",
 "TypeScript付きのReactとNext.jsにレベルアップ",
 "デバイス横断でモバイルファーストのレスポンシブデザインを習得",
 ],
 },
 {
 role: "AIインターン",
 company: "AI4FS、サミット大学",
 period: "2023",
 description:
 "サミット大学でのAI for Females in STEMインターンシップ。AI駆動のプロトタイプを構築し、サミットで発表。",
 achievements: [
 "インターンシップ中にAI駆動のプロトタイプを構築",
 "AI4FSサミットでプロジェクト作品を発表",
 "分野をまたぐインターンのチームと協力",
 ],
 },
 ],
 },
 openSource: {
 badge: "オープンソース",
 heading: "職人技に還元する。",
 subheading:
 "オープンソースはフロントエンドコミュニティがレベルアップする方法です。私は貢献し、メンテナンスし、ドキュメントを書きます. 最初に私のために誰かがやってくれたからです。",
 reposLabel: "公開リポジトリ",
 starsLabel: "GitHubスター",
 contribsLabel: "年間貢献",
 repos: [
 {
 name: "shadcn-extensions",
 description: "shadcn/uiのヘッドレス拡張: データテーブル、コマンドパレット、複合入力。",
 language: "TypeScript",
 stars: "1.8k",
 },
 {
 name: "tailwind-print-css",
 description: "印刷完璧なPDFのためのTailwind CSSプラグイン。ページ分割、マージン、@media printユーティリティ。",
 language: "TypeScript",
 stars: "1.2k",
 },
 {
 name: "figma-design-tokens",
 description: "Figma変数をTailwind設定とCSSカスタムプロパティに同期。型安全なトークンパイプライン。",
 language: "TypeScript",
 stars: "820",
 },
 {
 name: "react-quiz-builder",
 description: "React向けアクセシブルなヘッドレスクイズビルダー。ARIA準拠、キーボードフレンドリー。",
 language: "TypeScript",
 stars: "410",
 },
 ],
 viewGithub: "GitHubプロフィールを見る",
 },
 design: {
 badge: "デザイン",
 heading: "デザインファイルからのケーススタディ。",
 subheading:
 "Figmaファイルの裏側を見る。デザインシステム、モバイルフロー、ダッシュボード、ランディングページ。それぞれプロダクションに出荷済み。",
 readMore: "ケーススタディを見る",
 cases: [
 {
 title: "Al-Hikmahデザインシステム",
 category: "デザインシステム",
 excerpt:
 "カラートークン、タイポグラフィスケール、スペーシングシステム、50以上の再利用可能コンポーネント。一度構築し、教育プラットフォーム全体に出荷。",
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
 },
 {
 title: "Islam Bacaモバイルフロー",
 category: "モバイルアプリ",
 excerpt:
 "単語ごとのクルアーン学習UX。ボトムシートナビゲーション、44pxタップターゲット、集中を尊重する読書モード。",
 gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
 },
 {
 title: "アナリティクスダッシュボード",
 category: "ダッシュボード",
 excerpt:
 "売上トレンド、登録分布、合格率の可視化。ローディングスケルトンとリアルタイム更新付きのRechartsダッシュボード。",
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
 },
 {
 title: "証明書 & 印刷UX",
 category: "ランディングページ",
 excerpt:
 "QR検証付きの印刷完璧な証明書ジェネレーター。CSS @media print、ページ分割、ATSフレンドリーなレイアウト。",
 gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
 },
 ],
 },
 testimonials: {
 badge: "推薦の声",
 heading: "一緒に働いた人々の言葉。",
 subheading:
 "証拠。それらのないポートフォリオは、ドメイン名を持つレジュメに過ぎません。",
 items: [
 {
 quote:
 "Upinはプロダクション品質のReactを出荷できる稀なデザイナーです。Figmaでデザインシステムを設計し、自らNext.jsで構築しました。引き継ぎは瞬時でした。引き継ぎがなかったからです。",
 name: "Sarah Chen",
 role: "プロダクトリード、Al-Hikmah",
 },
 {
 quote:
 "Upinを教育プラットフォームのフロントエンドの設計と構築のために雇いました。完全なデザインシステム、50以上のコンポーネント、アナリティクスダッシュボードを納品しました。すべてのインタラクションの磨きは並外れていました。",
 name: "Tunde Adebayo",
 role: "創業者、EduTechスタートアップ",
 },
 {
 quote:
 "スペーシングとタイポグラフィへの目はチーム内で比類ありません。Rechartsでダッシュボードを再構築し、データがついに物語を語ります。デザインできるエンジニアは別格です。",
 name: "Yuki Tanaka",
 role: "デザインリード、Osaka Labs",
 },
 ],
 },
 contact: {
 badge: "お問い合わせ",
 heading: "ユーザーが愛するものを一緒に作りましょう。",
 subheading:
 "現在、フロントエンドポジション、UI/UXデザイン契約、厳選されたフリーランス業務にオープンです。何を設計または構築しているか教えてください。",
 nameLabel: "お名前",
 emailLabel: "メールアドレス",
 messageLabel: "メッセージ",
 namePlaceholder: "お名前",
 emailPlaceholder: "your@email.com",
 messagePlaceholder: "プロジェクト、ポジション、アイデアについて教えてください...",
 send: "メッセージを送信",
 sending: "送信中...",
 success: "メッセージが送信されました。48時間以内に返信します。",
 orText: "または",
 emailMe: "直接メールする",
 bookCall: "30分の初回通話を予約",
 downloadResume: "履歴書を見る",
 followTitle: "他の場所で見つけてください",
 },
 footer: {
 tagline: "フロントエンドエンジニア & UI/UXデザイナー。ビルダー。シッパー。",
 builtWith: "丁寧に設計・構築。Next.js、TypeScript、Tailwind CSS、Figma。",
 rights: "全著作権所有。",
 backToTop: "トップに戻る",
 quickLinks: "クイックリンク",
 connect: "つながる",
 },
 },

 ar: {
 nav: {
 home: "الرئيسية",
 about: "نبذة",
 skills: "المهارات",
 projects: "المشاريع",
 experience: "الخبرة",
 openSource: "المصدر المفتوح",
 design: "التصميم",
 testimonials: "التوصيات",
 contact: "تواصل",
 menu: "القائمة",
 },
 hero: {
 badge: "متاح لمشاريع مختارة",
 greeting: "مرحباً، أنا",
 name: "عبد الله يوسف",
 akaLabel: "المعروف بـ",
 brandName: "Upin",
 title: "مهندس واجهات أمامية & مصمم UI/UX",
 tagline:
 "أصمم وأبني واجهات جميلة وقابلة للوصول. من مخططات Figma إلى React بدقة البكسل، أصنع منتجات يحبها المستخدمون.",
 ctaPrimary: "شاهد أعمالي",
 ctaSecondary: "افتح الطرفية",
 availability: "منفتح على أدوار الواجهة الأمامية والتصميم، وعمل العقود",
 stat1Label: "الواجهة الأمامية",
 stat2Label: "التصاميم",
 stat3Label: "نجوم OS",
 scroll: "مرر للاستكشاف",
 },
 terminal: {
 title: "طرفية تفاعلية",
 subtitle:
 "هذه ليست معرض أعمال. إنها صدفة. اكتب أمراً واستكشف. كل قسم هو ملف يمكنك قراءته.",
 prompt: "upin@portfolio:~$",
 welcome:
 "مرحباً بك في طرفية معرض Upin التفاعلي. اكتب 'help' لرؤية الأوامر المتاحة.",
 helpLine1: "الأوامر المتاحة:",
 helpLine2: "نصيحة: الأوامر غير حساسة لحالة الأحرف. جرب 'whoami' للبدء.",
 commands: {
 help: "اعرض رسالة المساعدة هذه",
 about: "اقرأ about.md",
 skills: "اعرض skills.json",
 projects: "اعرض projects/",
 experience: "اعرض experience.log",
 contact: "اطبع contact.vcf",
 clear: "امسح الطرفية",
 whoami: "من أنا؟",
 ls: "اعرض محتويات الدليل",
 social: "اعرض روابط التواصل",
 },
 outputs: {
 whoami:
 "عبد الله يوسف (Upin). مهندس واجهات أمامية & مصمم UI/UX بخبرة 5+ سنوات في تسليم واجهات بجودة الإنتاج. أصمم الأنظمة في Figma وأبنيها في React، من البداية للنهاية.",
 ls: "about.md skills.json projects/ experience.log contact.vcf social.txt",
 social:
 "GitHub: github.com/mitchoder07 · LinkedIn: linkedin.com/in/mitchoder07 · X: x.com/mitchoder07 · Dribbble: dribbble.com/mitchoder07 · Figma: figma.com/@mitchoder07 · Email: olaniyiaremu2003@gmail.com",
 unknown: "الأمر غير موجود. اكتب 'help' للأوامر المتاحة.",
 },
 placeholder: "اكتب أمراً واضغط Enter...",
 },
 about: {
 badge: "نبذة",
 heading: "مصمم يكتب الكود. مهندس يصمم.",
 p1: "أنا عبد الله يوسف، المعروف بـ Upin. مهندس واجهات أمامية ومصمم UI/UX قضى السنوات الخمس الماضية في تحويل الأفكار إلى واجهات يحبها المستخدمون. عملي يعيش عند تقاطع التصميم والكود: أرسم المخططات في Figma صباحاً، وأبنيها في React بعد الظهر، وأصقل الحركات مساءً. أؤمن أن المنتجات العظيمة تأتي من مهندسين يفهمون التصميم ومصممين يفهمون الكود.",
 p2: "ما يميزني هو أنني أملك الجانبين. لقد صممت أنظمة تصميم (رموز الألوان، مقاييس الطباعة، التباعد، مكتبات المكونات) ونفذتها في الإنتاج. لقد بنيت لوحات تحليلات بـ Recharts، نماذج متعددة الخطوات مع تحقق، مولدات شهادات بـ print CSS، وتطبيقات PWA تعمل دون اتصال. سواء كان الأمر إتقان إحساس زر أو تصميم مكتبة مكونات، أجلب الحرفية نفسها.",
 p3: "عندما لا أكون أطلق المنتجات، أكون أتعلم. أكتب عن أنظمة التصميم ومعمارية الواجهات الأمامية، أرشد المطورين الطموحين، وأساهم في المصدر المفتوح. أؤمن أن أفضل مهندسي الواجهات الأمامية مهووسون بالتفاصيل. مسافة 4px، منحنى التخفيف 200ms، حالة التركيز التي لا يلاحظها أحد ولكن يشعر بها الجميع. هذا المعرض محاولتي لأريك كيف يبدو هذا الهوس.",
 highlights: [
 { label: "سنوات الواجهة الأمامية", value: "5+" },
 { label: "تصاميم Figma", value: "20+" },
 { label: "مكونات مبنية", value: "50+" },
 { label: "تقليل زمن الاستجابة", value: "8x" },
 ],
 coreTitle: "ما أقدمه.",
 coreDesc: "التصميم والهندسة، تسليم معاً.",
 coreItems: [
 { title: "أنظمة التصميم", desc: "رموز الألوان، مقاييس الطباعة، أنظمة التباعد، مكتبات المكونات. بُنيت لـ Al-Hikmah، قابلة لإعادة الاستخدام عبر المنتجات." },
 { title: "معمارية الواجهة الأمامية", desc: "Next.js App Router، React Server Components، مجموعات المسارات، واجهات برمجة آمنة النوع. بنية بمستوى الإنتاج." },
 { title: "التصميم المتجاوب", desc: "الأولوية للجوال، أهداف نقر 44px+، الأوراق السفلية، قوائم الهامبرغر. مُختبرة عبر الأجهزة." },
 { title: "تصور البيانات", desc: "لوحات Recharts: اتجاهات الإيرادات، توزيع التسجيل، معدلات النجاح. في الوقت الفعلي مع هياكل التحميل." },
 { title: "إمكانية الوصول", desc: "تسميات نماذج قابلة للوصول، تنقل بلوحة المفاتيح، حالات التركيز، متوافقة مع قارئات الشاشة. واعٍ بـ WCAG." },
 { title: "الأداء", desc: "PWA، SEO/Metadata API، Suspense، حدود الأخطاء، print CSS. سريع وموثوق." },
 ],
 },
 skills: {
 badge: "المهارات",
 heading: "التصميم والهندسة، من البداية للنهاية.",
 subheading:
 "لا أختار جانباً. أملك الاثنين. من لوحات Figma الفنية إلى أشجار مكونات React. هذا ما أستخدمه يومياً.",
 categories: {
 frontend: {
 title: "الواجهة الأمامية",
 items: [
 "Next.js 16",
 "React 19",
 "TypeScript",
 "Tailwind CSS 4",
 "Framer Motion",
 "Three.js",
 "Vite",
 "HTML5",
 "CSS3",
 "JavaScript",
 ],
 },
 design: {
 title: "تصميم UI/UX",
 items: [
 "Figma",
 "أنظمة التصميم",
 "المخططات الأولية",
 "النماذج الأولية",
 "نظرية الألوان",
 "الطباعة",
 "أنظمة التباعد",
 "مكتبات المكونات",
 "إمكانية الوصول",
 "التصميم المتجاوب",
 ],
 },
 state: {
 title: "الحالة والبيانات",
 items: [
 "Zustand",
 "React Context API",
 "TanStack Query",
 "Recharts",
 "React Hook Form",
 "Zod",
 ],
 },
 components: {
 title: "المكونات",
 items: [
 "shadcn/ui",
 "Radix UI",
 "مكونات مخصصة",
 "حوارات",
 "قوائم منسدلة",
 "أوراق",
 "أكورديون",
 "نماذج",
 ],
 },
 tooling: {
 title: "الأدوات",
 items: [
 "Git",
 "GitHub Actions",
 "Vercel",
 "PWA",
 "SEO/Metadata API",
 "Print CSS",
 "الوضع الداكن",
 "Storybook",
 ],
 },
 languages: {
 title: "اللغات",
 items: [
 "TypeScript",
 "JavaScript",
 "HTML",
 "CSS",
 "Python",
 "SQL",
 "Bash",
 ],
 },
 },
 },
 projects: {
 badge: "أعمال مختارة",
 heading: "مشاريع أُطلقت، توسعت، وعلّمتني شيئاً.",
 subheading:
 "مجموعة منتقاة من المنتجات التي صممتها وبنيتها. من منصات التعليم إلى أدوات الأمان. كل واحد غيّر طريقة تفكيري في الحرفة.",
 viewCode: "عرض الكود",
 viewLive: "عرض مباشر",
 caseStudy: "دراسة حالة",
 role: "الدور",
 impact: "الأثر",
 tech: "التقنيات",
 featured: "مميز",
 items: [
 {
 name: "منصة التعليم Al-Hikmah",
 tagline: "منصة تعليم إنتاجية مع اختبارات وشهادات وتحليلات",
 description:
 "منصة تعليم كاملة مع إدارة الدورات، منشئ الاختبارات، مولد الشهادات باستخدام print CSS والتحقق QR، لوحات التحليلات المبنية بـ Recharts، نماذج متعددة الخطوات مع تحقق، ودعم PWA. صممت النظام بأكمله في Figma أولاً، ثم أطلقته في Next.js.",
 role: "مهندس واجهات أمامية & مصمم UI/UX",
 impact: "نظام تصميم كامل، 50+ مكون قابل لإعادة الاستخدام، تجاوب الأولوية للجوال",
 tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
 },
 {
 name: "Rafaab",
 tagline: "Premium e-commerce marketplace with AI shopping assistant",
 description:
 "A premium e-commerce marketplace built to outshine Jumia and AliExpress. Features an AI shopping assistant called Rafi, flash sales with live countdowns, full order tracking with visual timelines, a seller dashboard, and Paystack payment integration. Distinctive gold-amulet brand identity across 8 product categories.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "AI assistant, flash sales, real-time tracking, Paystack payments",
 tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Paystack"],
 image: "/portfolio-images/rafaab.png",
 },
 {
 name: "Islam Baca",
 tagline: "أداة دراسة القرآن مع تحليل كلمة بكلمة",
 description:
 "تطبيق ويب لدراسة القرآن يتيح للمستخدمين القراءة والاستماع والتعلم مع تفكيك كلمة بكلمة. بُني بـ HTML دلالي، تنقل قابل للوصول، ووضع قراءة يحترم التركيز. صُمم التخطيط بالأولوية للجوال.",
 role: "مهندس واجهات أمامية & مصمم UI/UX",
 impact: "قارئ كلمة بكلمة، تشغيل صوتي، تدفق دراسة قابل للوصول",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/islam-baca.png",
 },
 {
 name: "Crypto Vault",
 tagline: "تشفير AES-256 في المتصفح",
 description:
 "خزنة تشفير من جانب العميل تشفر وتفك تشفير الأسرار بـ AES-256، بالكامل في المتصفح. لا تغادر أي بيانات الجهاز. صُمم تجربة المستخدم حول الثقة: حالات واضحة، نسخ إلى الحافظة، وحالات فارغة بلا لبس.",
 role: "مهندس واجهات أمامية & مصمم UI/UX",
 impact: "تشفير بلا خادم، تجربة مستخدم نظيفة لإدارة المفاتيح",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/crypto-vault.jpeg",
 },
 {
 name: "مدقق التشابه",
 tagline: "مدقق انتحال متعدد الخوارزميات مع مقياس بصري",
 description:
 "مدقق انتحال يشغل خوارزميات متعددة لتشابه النص ويعرض النتائج على مقياس بصري. يتضمن مساعد استشهاد يقترح الإسناد المناسب. صُمم واجهة المقارنة ومكون المقياس من الصفر.",
 role: "مهندس واجهات أمامية & مصمم UI/UX",
 impact: "تقييم متعدد الخوارزميات، مقياس بصري، مساعد استشهاد",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/similarity-checker.jpeg",
 },
 {
 name: "Cyber Bot",
 tagline: "اسأل أي شيء عن الأمن السيبراني، احصل على إجابات فورية",
 description:
 "روبوت أسئلة وأجوبة للأمن السيبراني يعطي إجابات فورية حول مواضيع الأمان الشائعة. صُمم واجهة المحادثة، نمط الاقتراحات، وبطاقات الإجابات القابلة للقراءة. بُني بالأولوية للجوال مع إدخال ودود للوحة المفاتيح.",
 role: "مهندس واجهات أمامية & مصمم UI/UX",
 impact: "إجابات فورية، اقتراحات، بطاقات إجابة قابلة للقراءة",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-bot.jpg",
 },
 {
 name: "Cyber-Words Guess",
 tagline: "لعبة تخمين الكلمة السيبرانية",
 description:
 "لعبة تخمين كلمات بُنيت حول مصطلحات الأمن السيبراني. صُمم حلقة اللعبة، لوحة المفاتيح على الشاشة، وحالات التغذية الراجعة المشفرة بالألوان. أُطلقت كتطبيق صفحة واحدة مع انتقالات حالة سلسة.",
 role: "مهندس واجهات أمامية & مصمم UI/UX",
 impact: "حلقة اللعبة، لوحة مفاتيح على الشاشة، تغذية راجعة مشفرة بالألوان",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-words.jpg",
 },
 {
 name: "[تصميمك القادم]",
 tagline: "فتحة تنتظر دراسة حالة Figma القادمة",
 description:
 "هذه فتحة مؤقتة لدراسة حالة تصميم مستقبلية. استبدلها بمشروع Figma القادم. افتح ملف بيانات المشاريع، استبدل الاسم والوصف والدور والأثر وعلامات التقنية. تخطيط دراسة الحالة سيتكيف تلقائياً.",
 role: "دورك هنا",
 impact: "مقاييس أثرك هنا",
 tech: ["Figma", "Next.js", "Tailwind CSS"],
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
 },
 ],
 },
 experience: {
 badge: "الخبرة",
 heading: "خمس سنوات من التصميم والبناء والإطلاق.",
 subheading:
 "من الواجهات الأمامية المستقلة إلى أنظمة التصميم الداخلية. كل دور علّمني جانباً مختلفاً من الحرفة.",
 items: [
 {
 role: "مهندس واجهات أمامية",
 company: "عمل حر",
 period: "2024 - حتى الآن",
 description:
 "بناء تطبيقات ويب إنتاجية بـ Next.js وTypeScript وTailwind. قُدت واجهة منصة التعليم Al-Hikmah، من Figma إلى النشر.",
 achievements: [
 "صممت مكتبة مكونات كاملة ونظام تصميم",
 "بنيت لوحات تحليلات بـ Recharts مع هياكل تحميل",
 "نفذت PWA، print CSS للشهادات، وSEO/Metadata API",
 ],
 },
 {
 role: "مصمم UI/UX",
 company: "عمل حر",
 period: "2023 - حتى الآن",
 description:
 "تصميم المنتجات الرقمية في Figma. أنظمة تصميم، مخططات أولية، نماذج أولية، وتخطيطات متجاوبة للويب والجوال.",
 achievements: [
 "بنيت نظام تصميم Al-Hikmah (رموز الألوان، الطباعة، التباعد)",
 "سلّمت 20+ مشروع Figma عبر الويب والجوال",
 "صممت نماذج أولية للنماذج متعددة الخطوات واللوحات وتدفقات الجوال",
 ],
 },
 {
 role: "دعم تقني & مطور واجهات أمامية",
 company: "NYSC، الجامعة الاتحادية للعلوم الصحية، إيلا (FUHSI)",
 period: "2025",
 description:
 "دعم تقني في FUHSI خلال NYSC. حل مشاكل حقيقية يومياً وبناء أدوات داخلية لأتمتة المهام المتكررة.",
 achievements: [
 "حل 200+ تذكرة دعم عبر الأجهزة والبرمجيات",
 "بناء أدوات داخلية أتمتت مهام الدعم المتكررة",
 "توثيق الإصلاحات الشائعة لقاعدة معرفة الفريق",
 ],
 },
 {
 role: "رحلة هندسة الواجهات الأمامية",
 company: "تعليم ذاتي",
 period: "2021 - 2023",
 description:
 "بدأت بتعلم HTML وCSS وJavaScript. بنيت مشاريع شخصية، تطورت إلى React وNext.js، وأتقنت التصميم المتجاوب.",
 achievements: [
 "أطلقت 6+ مشاريع شخصية بـ HTML وCSS وJavaScript",
 "تطورت إلى React وNext.js مع TypeScript",
 "أتقنت التصميم المتجاوب بالأولوية للجوال عبر الأجهزة",
 ],
 },
 {
 role: "متدرب ذكاء اصطناعي",
 company: "AI4FS، جامعة summit",
 period: "2023",
 description:
 "تدريب AI for Females in STEM في جامعة summit. بناء نماذج أولية مدعومة بالذكاء الاصطناعي وتقديمها في القمة.",
 achievements: [
 "بناء نماذج أولية مدعومة بالذكاء الاصطناعي خلال التدريب",
 "تقديم عمل المشروع في قمة AI4FS",
 "التعاون مع فريق متدربين متعدد التخصصات",
 ],
 },
 ],
 },
 openSource: {
 badge: "المصدر المفتوح",
 heading: "العطاء للحرفة.",
 subheading:
 "المصدر المفتوح هو كيف تتطور مجتمع الواجهات الأمامية. أساهم وأحافظ وأوثّق. لأن شخصاً ما فعل ذلك من أجلي أولاً.",
 reposLabel: "مستودعات عامة",
 starsLabel: "نجوم GitHub",
 contribsLabel: "مساهمات / سنة",
 repos: [
 {
 name: "shadcn-extensions",
 description: "امتدادات headless لـ shadcn/ui: جداول البيانات، لوحات الأوامر، والمدخلات المركبة.",
 language: "TypeScript",
 stars: "1.8k",
 },
 {
 name: "tailwind-print-css",
 description: "إضافة Tailwind CSS لملفات PDF مثالية الطباعة. فواصل الصفحات، الهوامش، وأدوات @media print.",
 language: "TypeScript",
 stars: "1.2k",
 },
 {
 name: "figma-design-tokens",
 description: "مزامنة متغيرات Figma إلى إعدادات Tailwind وخصائص CSS المخصصة. خطوط رموز آمنة النوع.",
 language: "TypeScript",
 stars: "820",
 },
 {
 name: "react-quiz-builder",
 description: "منشئ اختبارات headless قابل للوصول لـ React. متوافق مع ARIA وودود مع لوحة المفاتيح.",
 language: "TypeScript",
 stars: "410",
 },
 ],
 viewGithub: "عرض ملف GitHub",
 },
 design: {
 badge: "التصميم",
 heading: "دراسات حالة من ملف التصميم.",
 subheading:
 "نظرة خلف ملف Figma. أنظمة تصميم، تدفقات الجوال، لوحات معلومات، وصفحات هبوط. كل واحد أُطلق للإنتاج.",
 readMore: "عرض دراسة الحالة",
 cases: [
 {
 title: "نظام تصميم Al-Hikmah",
 category: "نظام تصميم",
 excerpt:
 "رموز الألوان، مقياس الطباعة، نظام التباعد، و50+ مكون قابل لإعادة الاستخدام. بُني مرة واحدة، وأُطلق عبر منصة التعليم بأكملها.",
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
 },
 {
 title: "تدفق الجوال Islam Baca",
 category: "تطبيق جوال",
 excerpt:
 "تجربة دراسة القرآن كلمة بكلمة. تنقل بالأوراق السفلية، أهداف نقر 44px+، ووضع قراءة يحترم التركيز.",
 gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
 },
 {
 title: "لوحة التحليلات",
 category: "لوحة معلومات",
 excerpt:
 "اتجاهات الإيرادات، توزيع التسجيل، وتصورات معدلات النجاح. لوحات Recharts مع هياكل تحميل وتحديثات فورية.",
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
 },
 {
 title: "الشهادات وتجربة الطباعة",
 category: "صفحة هبوط",
 excerpt:
 "مولد شهادات مثالي الطباعة مع تحقق QR. CSS @media print، فواصل الصفحات، وتخطيطات متوافقة مع ATS.",
 gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
 },
 ],
 },
 testimonials: {
 badge: "التوصيات",
 heading: "ما يقوله من عملت معهم.",
 subheading:
 "إيصالات. لأن معرض أعمال بدونها هو مجرد سيرة ذاتية باسم نطاق.",
 items: [
 {
 quote:
 "Upin مصمم نادر يستطيع إطلاق React بجودة الإنتاج. صمم نظام تصميمنا في Figma ثم بناه بنفسه في Next.js. التسليم كان فورياً لأنه لم يكن هناك تسليم.",
 name: "Sarah Chen",
 role: "قائد المنتج، Al-Hikmah",
 },
 {
 quote:
 "وظفنا Upin لتصميم وبناء واجهة منصة التعليم لدينا. سلّم نظام تصميم كامل، 50+ مكون، ولوحات تحليلات. الصقل في كل تفاعل كان استثنائياً.",
 name: "Tunde Adebayo",
 role: "مؤسس، شركة EduTech ناشئة",
 },
 {
 quote:
 "عينه للتباعد والطباعة لا مثيل لها في فريقنا. أعاد بناء لوحتنا بـ Recharts وأخيراً البيانات تروي قصة. المهندسون الذين يستطيعون التصميم فئة مختلفة.",
 name: "Yuki Tanaka",
 role: "قائد التصميم، Osaka Labs",
 },
 ],
 },
 contact: {
 badge: "تواصل",
 heading: "لنبنِ شيئاً يحبه المستخدمون.",
 subheading:
 "حالياً منفتح على أدوار الواجهات الأمامية، عقود تصميم UI/UX، وعمل حر مختار. أخبرني ماذا تصمم أو تبني.",
 nameLabel: "اسمك",
 emailLabel: "البريد الإلكتروني",
 messageLabel: "رسالتك",
 namePlaceholder: "اسمك",
 emailPlaceholder: "your@email.com",
 messagePlaceholder: "أخبرني عن مشروعك أو دورك أو فكرتك...",
 send: "إرسال الرسالة",
 sending: "جارٍ الإرسال...",
 success: "تم إرسال الرسالة. سأرد عليك خلال 48 ساعة.",
 orText: "أو",
 emailMe: "راسلني مباشرة",
 bookCall: "احجز مكالمة تعريفية 30 دقيقة",
 downloadResume: "عرض السيرة الذاتية",
 followTitle: "تجدني في مكان آخر",
 },
 footer: {
 tagline: "مهندس واجهات أمامية & مصمم UI/UX. باني. مسلّم.",
 builtWith: "صُمم وبُني بعناية. Next.js وTypeScript وTailwind CSS وFigma.",
 rights: "جميع الحقوق محفوظة.",
 backToTop: "العودة للأعلى",
 quickLinks: "روابط سريعة",
 connect: "تواصل",
 },
 },

 zh: {
 nav: {
 home: "首页",
 about: "关于",
 skills: "技能",
 projects: "项目",
 experience: "经历",
 openSource: "开源",
 design: "设计",
 testimonials: "推荐",
 contact: "联系",
 menu: "菜单",
 },
 hero: {
 badge: "接受精选委托",
 greeting: "你好,我是",
 name: "Abdullah Yusuf",
 akaLabel: "又名",
 brandName: "Upin",
 title: "前端工程师 & UI/UX 设计师",
 tagline:
 "我设计并构建美观、可访问的界面。从 Figma 线框到像素级精准的 React,我打造用户喜爱的产品。",
 ctaPrimary: "查看作品",
 ctaSecondary: "打开终端",
 availability: "接受前端与设计职位及合同工作",
 stat1Label: "前端",
 stat2Label: "设计",
 stat3Label: "OS Stars",
 scroll: "滚动探索",
 },
 terminal: {
 title: "交互式终端",
 subtitle:
 "这不是作品集。这是一个 shell。输入命令来探索. 每个章节都是你可以读取的文件。",
 prompt: "upin@portfolio:~$",
 welcome:
 "欢迎来到 Upin 的交互式作品集终端。输入 'help' 查看可用命令。",
 helpLine1: "可用命令:",
 helpLine2: "提示: 命令不区分大小写。试试 'whoami' 开始。",
 commands: {
 help: "显示此帮助信息",
 about: "读取 about.md",
 skills: "列出 skills.json",
 projects: "列出 projects/",
 experience: "显示 experience.log",
 contact: "打印 contact.vcf",
 clear: "清空终端",
 whoami: "我是谁?",
 ls: "列出目录内容",
 social: "显示社交链接",
 },
 outputs: {
 whoami:
 "Abdullah Yusuf(Upin)。前端工程师 & UI/UX 设计师,5 年以上交付生产级界面经验。我在 Figma 中设计系统,在 React 中构建,端到端。",
 ls: "about.md skills.json projects/ experience.log contact.vcf social.txt",
 social:
 "GitHub: github.com/mitchoder07 · LinkedIn: linkedin.com/in/mitchoder07 · X: x.com/mitchoder07 · Dribbble: dribbble.com/mitchoder07 · Figma: figma.com/@mitchoder07 · Email: olaniyiaremu2003@gmail.com",
 unknown: "命令未找到。输入 'help' 查看可用命令。",
 },
 placeholder: "输入命令并按 Enter...",
 },
 about: {
 badge: "关于",
 heading: "会写代码的设计师。会设计的工程师。",
 p1: "我是 Abdullah Yusuf,又名 Upin。一名前端工程师和 UI/UX 设计师,过去五年一直在把想法变成用户喜爱的界面。我的工作在设计与代码的交汇处:早上在 Figma 画线框,下午用 React 构建,晚上打磨动画。我相信伟大的产品来自理解设计的工程师和理解代码的设计师。",
 p2: "让我与众不同的是我同时拥有两边。我设计过设计系统(颜色 token、字体比例、间距、组件库),也在生产中实现过它们。我用 Recharts 构建分析仪表板,用验证做多步表单,用 print CSS 做证书生成器,做能离线工作的 PWA。无论是让按钮手感正确还是架构组件库,我都带来同样的匠心。",
 p3: "不交付产品的时候,我在学习。我写关于设计系统和前端架构的文章,指导有志开发者,为开源做贡献。我相信最好的前端工程师对细节是痴迷的。4px 的内边距,200ms 的缓动曲线,没人注意但每个人都感觉到的焦点状态。这个作品集是我向你展示这种痴迷长什么样的尝试。",
 highlights: [
 { label: "前端年数", value: "5+" },
 { label: "Figma 设计", value: "20+" },
 { label: "构建组件", value: "50+" },
 { label: "延迟降低", value: "8x" },
 ],
 coreTitle: "我能带来什么。",
 coreDesc: "设计与工程,一起交付。",
 coreItems: [
 { title: "设计系统", desc: "颜色 token、字体比例、间距系统、组件库。为 Al-Hikmah 构建,可跨产品复用。" },
 { title: "前端架构", desc: "Next.js App Router、React Server Components、路由组、类型安全 API。生产级结构。" },
 { title: "响应式设计", desc: "移动优先,44px+ 点击目标,底部抽屉,汉堡菜单。跨设备测试。" },
 { title: "数据可视化", desc: "Recharts 仪表板:收入趋势、注册分布、通过率。带加载骨架的实时更新。" },
 { title: "无障碍", desc: "可访问表单标签、键盘导航、焦点状态、屏幕阅读器友好。关注 WCAG。" },
 { title: "性能", desc: "PWA、SEO/Metadata API、Suspense、错误边界、print CSS。快速且可靠。" },
 ],
 },
 skills: {
 badge: "技能",
 heading: "设计与工程,端到端。",
 subheading:
 "我不选边。我拥有两边。从 Figma 画板到 React 组件树。这是我每天使用的。",
 categories: {
 frontend: {
 title: "前端",
 items: [
 "Next.js 16",
 "React 19",
 "TypeScript",
 "Tailwind CSS 4",
 "Framer Motion",
 "Three.js",
 "Vite",
 "HTML5",
 "CSS3",
 "JavaScript",
 ],
 },
 design: {
 title: "UI/UX 设计",
 items: [
 "Figma",
 "设计系统",
 "线框图",
 "原型",
 "色彩理论",
 "字体排版",
 "间距系统",
 "组件库",
 "无障碍",
 "响应式设计",
 ],
 },
 state: {
 title: "状态与数据",
 items: [
 "Zustand",
 "React Context API",
 "TanStack Query",
 "Recharts",
 "React Hook Form",
 "Zod",
 ],
 },
 components: {
 title: "组件",
 items: [
 "shadcn/ui",
 "Radix UI",
 "自定义组件",
 "对话框",
 "下拉菜单",
 "抽屉",
 "手风琴",
 "表单",
 ],
 },
 tooling: {
 title: "工具",
 items: [
 "Git",
 "GitHub Actions",
 "Vercel",
 "PWA",
 "SEO/Metadata API",
 "Print CSS",
 "暗色模式",
 "Storybook",
 ],
 },
 languages: {
 title: "语言",
 items: [
 "TypeScript",
 "JavaScript",
 "HTML",
 "CSS",
 "Python",
 "SQL",
 "Bash",
 ],
 },
 },
 },
 projects: {
 badge: "精选作品",
 heading: "已交付、已扩展、教会了我一些事的项目。",
 subheading:
 "我设计并构建的产品的精选. 从教育平台到安全工具。每一个都改变了我对匠心的思考方式。",
 viewCode: "查看代码",
 viewLive: "在线演示",
 caseStudy: "案例研究",
 role: "角色",
 impact: "影响",
 tech: "技术",
 featured: "精选",
 items: [
 {
 name: "Al-Hikmah 教育平台",
 tagline: "带测验、证书和分析的生产级教育平台",
 description:
 "一个完整的教育平台,包含课程管理、测验构建器、使用 print CSS 和 QR 验证的证书生成器、用 Recharts 构建的分析仪表板、带验证的多步表单和 PWA 支持。先在 Figma 中设计整个系统,然后用 Next.js 交付。",
 role: "前端工程师 & UI/UX 设计师",
 impact: "完整设计系统、50+ 可复用组件、移动优先响应式",
 tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "TanStack Query", "Recharts"],
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
 },
 {
 name: "Rafaab",
 tagline: "Premium e-commerce marketplace with AI shopping assistant",
 description:
 "A premium e-commerce marketplace built to outshine Jumia and AliExpress. Features an AI shopping assistant called Rafi, flash sales with live countdowns, full order tracking with visual timelines, a seller dashboard, and Paystack payment integration. Distinctive gold-amulet brand identity across 8 product categories.",
 role: "Frontend Engineer & UI/UX Designer",
 impact: "AI assistant, flash sales, real-time tracking, Paystack payments",
 tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion", "Paystack"],
 image: "/portfolio-images/rafaab.png",
 },
 {
 name: "Islam Baca",
 tagline: "逐词分析的古兰经学习工具",
 description:
 "一个古兰经学习 Web 应用,让用户可以逐词分解地阅读、聆听和学习。用语义化 HTML、可访问导航和尊重专注的阅读模式构建。移动优先设计布局。",
 role: "前端工程师 & UI/UX 设计师",
 impact: "逐词阅读器、音频播放、可访问的学习流程",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/islam-baca.png",
 },
 {
 name: "Crypto Vault",
 tagline: "浏览器中的 AES-256 加密",
 description:
 "一个客户端加密金库,用 AES-256 完全在浏览器中加密和解密机密。零数据离开设备。围绕信任设计用户体验:清晰的状态、复制到剪贴板、无歧义的空状态。",
 role: "前端工程师 & UI/UX 设计师",
 impact: "无服务器加密、干净的密钥管理体验",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/crypto-vault.jpeg",
 },
 {
 name: "相似度检查器",
 tagline: "带可视量表的多算法抄袭检查器",
 description:
 "一个抄袭检查器,运行多种文本相似度算法并将结果呈现在可视量表上。包含建议正确引用的引用助手。从零设计比较 UI 和量表组件。",
 role: "前端工程师 & UI/UX 设计师",
 impact: "多算法评分、可视量表、引用助手",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/similarity-checker.jpeg",
 },
 {
 name: "Cyber Bot",
 tagline: "问任何关于网络安全的问题,获得即时回答",
 description:
 "一个网络安全问答机器人,对常见安全主题给出即时回答。设计对话式 UI、建议提示模式和可读的回答卡片。移动优先,键盘友好的输入。",
 role: "前端工程师 & UI/UX 设计师",
 impact: "即时回答、建议提示、可读的回答卡片",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-bot.jpg",
 },
 {
 name: "Cyber-Words Guess",
 tagline: "猜网络安全单词游戏",
 description:
 "一个围绕网络安全术语构建的猜词游戏。设计游戏循环、屏幕键盘和颜色编码的反馈状态。以单页应用交付,状态切换流畅。",
 role: "前端工程师 & UI/UX 设计师",
 impact: "游戏循环、屏幕键盘、颜色编码反馈",
 tech: ["HTML5", "CSS3", "JavaScript"],
 image: "/portfolio-images/cyber-words.jpg",
 },
 {
 name: "[你的下一个设计]",
 tagline: "等待你下一个 Figma 案例研究的位置",
 description:
 "这是一个为未来设计案例研究准备的占位位置。用你下一个 Figma 项目替换它. 打开项目数据文件,替换名称、描述、角色、影响和技术标签。案例研究布局会自动适应。",
 role: "你的角色",
 impact: "你的影响指标",
 tech: ["Figma", "Next.js", "Tailwind CSS"],
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)",
 },
 ],
 },
 experience: {
 badge: "经历",
 heading: "五年设计、构建与交付。",
 subheading:
 "从自由职业前端到内部设计系统。每个角色都教会我手艺的不同层面。",
 items: [
 {
 role: "前端工程师",
 company: "自由职业",
 period: "2024 - 至今",
 description:
 "用 Next.js、TypeScript 和 Tailwind 构建生产级 Web 应用。领导 Al-Hikmah 教育平台前端,从 Figma 到部署。",
 achievements: [
 "设计完整的组件库和设计系统",
 "用 Recharts 和加载骨架构建分析仪表板",
 "实现 PWA、证书 print CSS 和 SEO/Metadata API",
 ],
 },
 {
 role: "UI/UX 设计师",
 company: "自由职业",
 period: "2023 - 至今",
 description:
 "在 Figma 中设计数字产品。设计系统、线框图、原型和 Web 与移动端的响应式布局。",
 achievements: [
 "构建 Al-Hikmah 设计系统(颜色 token、字体、间距)",
 "交付 20+ 个跨 Web 和移动端的 Figma 项目",
 "为多步表单、仪表板和移动流程制作原型",
 ],
 },
 {
 role: "IT 支持 & 前端开发者",
 company: "NYSC,联邦健康科学大学,Ila (FUHSI)",
 period: "2025",
 description:
 "NYSC 期间在 FUHSI 做 IT 支持。每天解决真实问题,构建内部工具自动化重复任务。",
 achievements: [
 "解决 200+ 跨硬件和软件的支持工单",
 "构建内部工具自动化重复的支持任务",
 "为团队知识库记录常见修复",
 ],
 },
 {
 role: "前端工程之旅",
 company: "自学",
 period: "2021 - 2023",
 description:
 "从学习 HTML、CSS 和 JavaScript 开始。构建个人项目,升级到 React 和 Next.js,精通响应式设计。",
 achievements: [
 "用 HTML、CSS 和 JavaScript 交付 6+ 个个人项目",
 "升级到带 TypeScript 的 React 和 Next.js",
 "精通跨设备的移动优先响应式设计",
 ],
 },
 {
 role: "AI 实习生",
 company: "AI4FS,Summit 大学",
 period: "2023",
 description:
 "Summit 大学的 AI for Females in STEM 实习。构建 AI 驱动的原型并在峰会上展示。",
 achievements: [
 "实习期间构建 AI 驱动的原型",
 "在 AI4FS 峰会上展示项目工作",
 "与跨学科实习生团队协作",
 ],
 },
 ],
 },
 openSource: {
 badge: "开源",
 heading: "回馈手艺。",
 subheading:
 "开源是前端社区提升的方式。我贡献、维护和文档化. 因为有人先为我做了。",
 reposLabel: "公开仓库",
 starsLabel: "GitHub 星标",
 contribsLabel: "年度贡献",
 repos: [
 {
 name: "shadcn-extensions",
 description: "shadcn/ui 的无头扩展:数据表格、命令面板和复合输入。",
 language: "TypeScript",
 stars: "1.8k",
 },
 {
 name: "tailwind-print-css",
 description: "用于打印完美 PDF 的 Tailwind CSS 插件。分页、页边距和 @media print 工具。",
 language: "TypeScript",
 stars: "1.2k",
 },
 {
 name: "figma-design-tokens",
 description: "将 Figma 变量同步到 Tailwind 配置和 CSS 自定义属性。类型安全的 token 管道。",
 language: "TypeScript",
 stars: "820",
 },
 {
 name: "react-quiz-builder",
 description: "面向 React 的可访问无头测验构建器。符合 ARIA,键盘友好。",
 language: "TypeScript",
 stars: "410",
 },
 ],
 viewGithub: "查看 GitHub 主页",
 },
 design: {
 badge: "设计",
 heading: "来自设计文件的案例研究。",
 subheading:
 "Figma 文件背后的故事。设计系统、移动流程、仪表板和着陆页. 每一个都已交付生产。",
 readMore: "查看案例研究",
 cases: [
 {
 title: "Al-Hikmah 设计系统",
 category: "设计系统",
 excerpt:
 "颜色 token、字体比例、间距系统和 50+ 可复用组件。一次构建,在整个教育平台交付。",
 gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
 },
 {
 title: "Islam Baca 移动流程",
 category: "移动应用",
 excerpt:
 "逐词古兰经学习体验。底部抽屉导航,44px+ 点击目标,尊重专注的阅读模式。",
 gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
 },
 {
 title: "分析仪表板",
 category: "仪表板",
 excerpt:
 "收入趋势、注册分布和通过率可视化。带加载骨架和实时更新的 Recharts 仪表板。",
 gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
 },
 {
 title: "证书与打印体验",
 category: "着陆页",
 excerpt:
 "带 QR 验证的打印完美证书生成器。CSS @media print、分页和 ATS 友好的布局。",
 gradient: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
 },
 ],
 },
 testimonials: {
 badge: "推荐",
 heading: "与我共事过的人怎么说。",
 subheading:
 "证据。因为没有它们的简历只是带域名的简历。",
 items: [
 {
 quote:
 "Upin 是那种罕见的能交付生产级 React 的设计师。他在 Figma 中设计了我们的设计系统,然后亲自用 Next.js 构建。交接是即时的,因为根本没有交接。",
 name: "Sarah Chen",
 role: "产品负责人,Al-Hikmah",
 },
 {
 quote:
 "我们雇佣 Upin 设计和构建教育平台前端。他交付了完整的设计系统、50+ 组件和分析仪表板。每个交互的打磨都是非凡的。",
 name: "Tunde Adebayo",
 role: "创始人,EduTech 创业公司",
 },
 {
 quote:
 "他对间距和字体的眼光在我们团队中无可匹敌。他用 Recharts 重建了我们的仪表板,数据终于开始讲故事。能设计的工程师是另一种存在。",
 name: "Yuki Tanaka",
 role: "设计负责人,Osaka Labs",
 },
 ],
 },
 contact: {
 badge: "联系",
 heading: "让我们一起构建用户喜爱的东西。",
 subheading:
 "我目前对前端职位、UI/UX 设计合同和精选自由职业工作持开放态度。告诉我你在设计或构建什么。",
 nameLabel: "你的名字",
 emailLabel: "电子邮箱",
 messageLabel: "你的留言",
 namePlaceholder: "你的名字",
 emailPlaceholder: "your@email.com",
 messagePlaceholder: "告诉我你的项目、职位或想法...",
 send: "发送留言",
 sending: "发送中...",
 success: "留言已发送。我会在 48 小时内回复。",
 orText: "或",
 emailMe: "直接发邮件给我",
 bookCall: "预约 30 分钟介绍电话",
 downloadResume: "查看简历",
 followTitle: "在别处找到我",
 },
 footer: {
 tagline: "前端工程师 & UI/UX 设计师。构建者。交付者。",
 builtWith: "用心设计与构建。Next.js、TypeScript、Tailwind CSS、Figma。",
 rights: "保留所有权利。",
 backToTop: "回到顶部",
 quickLinks: "快速链接",
 connect: "连接",
 },
 },
};
