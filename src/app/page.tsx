import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { Hero } from "@/components/hero/hero";
import { LanguageMarquee } from "@/components/sections/language-marquee";
import { InteractiveTerminal } from "@/components/terminal/interactive-terminal";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/projects/projects";
import { Experience } from "@/components/sections/experience";
import { MathCorner } from "@/components/sections/math-corner";
import { AnonymousChatWall } from "@/components/sections/anonymous-chat-wall";
import { OpenSource } from "@/components/sections/open-source";
import { Writing } from "@/components/sections/writing";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <LanguageMarquee />
        <InteractiveTerminal />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <MathCorner />
        <AnonymousChatWall />
        <OpenSource />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
