import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Origin } from "@/components/Origin";
import { Abilities } from "@/components/Abilities";
import { SuitSelector } from "@/components/SuitSelector";
import { Villains } from "@/components/Villains";
import { Quotes } from "@/components/Quotes";
import { Timeline } from "@/components/Timeline";
import { BackgroundMusic } from "@/components/BackgroundMusic";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <BackgroundMusic />
      
      <Hero />
      <Origin />
      <Abilities />
      <SuitSelector />
      <Timeline />
      <Quotes />
      <Villains />
      
      <footer className="py-12 text-center border-t border-white/10 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-widest text-white/5 mb-4 select-none">SPIDER-MAN</h2>
          <p className="text-sm text-primary uppercase tracking-widest">Projekt Paweł Wójtowicz</p>
        </div>
      </footer>
    </main>
  );
}
