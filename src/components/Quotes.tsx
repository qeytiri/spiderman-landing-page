import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { playNarrator, stopNarrator } from "@/lib/narratorAudio";

const quotes = [
  {
    text: "Nieważne co robię, nieważne jak bardzo się staram — ci, których kocham, zawsze za to płacą.",
    source: "Peter Parker"
  },
  {
    text: "Każdy może nosić tę maskę. Ty też możesz ją nosić.",
    source: "Miles Morales"
  },
  {
    text: "Czasem, żeby postąpić właściwie, musimy być silni i zrezygnować z tego, czego pragniemy najbardziej. Nawet z naszych marzeń.",
    source: "Peter Parker"
  }
];

export function Quotes() {
  const ref = useRef<HTMLDivElement>(null);
  const [narPlaying, setNarPlaying] = useState(false);

  const toggleNarrator = () => {
    if (narPlaying) {
      stopNarrator();
      setNarPlaying(false);
    } else {
      playNarrator("/quotes-narrator.wav", () => setNarPlaying(false), () => setNarPlaying(false));
      setNarPlaying(true);
    }
  };

  return (
    <section ref={ref} className="py-32 px-6 md:px-20 bg-background relative overflow-hidden">
      {/* Tło - pajęcza sieć */}
      <div
        className="absolute inset-0 bg-center bg-cover pointer-events-none"
        style={{ backgroundImage: "url('/quotes.png')", opacity: 0.18 }}
      />
      {/* Vignette - przyciemnienie krawędzi */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.97) 100%)" }}
      />
      {/* Górna i dolna krawędź */}
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, #0a0a0f, transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, #0a0a0f, transparent)" }} />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-24">
        <div className="flex justify-center">
          <button
            onClick={toggleNarrator}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/50 bg-black/60 hover:bg-primary/20 transition-colors text-sm uppercase tracking-widest font-sans"
          >
            {narPlaying ? (
              <>
                <span className="w-3 h-3 flex gap-0.5">
                  <span className="w-1 h-3 bg-primary rounded-sm" />
                  <span className="w-1 h-3 bg-primary rounded-sm" />
                </span>
                <span className="text-primary">Zatrzymaj</span>
              </>
            ) : (
              <>
                <span className="w-0 h-0 border-y-4 border-y-transparent border-l-8 border-l-primary" />
                <span className="text-primary">Posłuchaj</span>
              </>
            )}
          </button>
        </div>
        {quotes.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${index % 2 !== 0 ? "items-end text-right" : "items-start text-left"}`}
          >
            <blockquote className="text-3xl md:text-5xl font-display uppercase leading-tight mb-6">
              "{quote.text}"
            </blockquote>
            <cite className="text-primary tracking-[0.2em] font-sans uppercase text-sm before:content-['—_']">
              {quote.source}
            </cite>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
