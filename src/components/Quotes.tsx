import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="py-32 px-6 md:px-20 bg-background relative overflow-hidden">
      <motion.svg
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-full md:w-1/2 h-full opacity-5 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0,0 L100,100 M0,50 L100,50 M50,0 L50,100 M0,100 L100,0" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </motion.svg>

      <motion.div
        style={{ y: y2 }}
        className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx="100" cy="100" r={20 + i * 20} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1="100" y1="100" x2={100 + Math.cos(a) * 120} y2={100 + Math.sin(a) * 120} />;
          })}
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-24">
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
