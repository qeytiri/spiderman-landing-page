import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } }
};


export function Origin() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const imageScale = useTransform(scrollYProgress, [0.1, 0.5], [0.92, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-28 px-6 md:px-20 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #0a0a0f 0%, #0c0610 50%, #0a0a0f 100%)" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div style={{ background: "radial-gradient(ellipse 80% 70% at 65% 40%, rgba(140,0,0,0.14), transparent 65%)" }} className="absolute inset-0" />
        <div style={{ background: "radial-gradient(ellipse 50% 50% at 30% 60%, rgba(0,20,100,0.1), transparent 60%)" }} className="absolute inset-0" />
      </motion.div>

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url('/web-bg.png')`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p variants={item} className="text-xs uppercase tracking-[0.4em] text-primary font-sans mb-3">
            Historia Pewnego Nastolatka
          </motion.p>
          <motion.h2 variants={item} className="text-5xl md:text-7xl font-display uppercase mb-6">
            GENEZA
          </motion.h2>
          <motion.div variants={item} className="h-1 w-24 bg-primary mb-8" />
          <motion.p variants={item} className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-6">
            Ukąszony przez radioaktywnego pająka, uczeń szkoły średniej Peter Parker zyskał prędkość, siłę i zdolności pająka.
          </motion.p>
          <motion.p variants={item} className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12">
            Przyjmując imię Spider-Man, Peter liczył na karierę z wykorzystaniem nowych mocy. Nauczony, że wraz z wielką mocą przychodzi wielka odpowiedzialność, Spider-Man poprzysiągł służyć ludziom.
          </motion.p>

          <motion.blockquote variants={item} className="border-l-4 border-primary pl-6 py-2">
            <p className="text-2xl md:text-3xl font-display italic text-white">
              "Z WIELKĄ MOCĄ MUSI PRZYJŚĆ — WIELKA ODPOWIEDZIALNOŚĆ!"
            </p>
            <footer className="mt-4 text-primary uppercase tracking-wider text-sm font-sans">
              — Amazing Fantasy #15
            </footer>
          </motion.blockquote>
        </motion.div>

        <motion.div
          style={{
            rotate: imageRotate,
            scale: imageScale,
            background: "linear-gradient(135deg, #0d0d1a 0%, #1a0505 50%, #050510 100%)"
          }}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 80 }}
          viewport={{ once: true }}
          className="relative h-[580px] w-full rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center"
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(180,0,0,0.18), transparent 70%)" }} />
          <img
            src="/spiderman-origin.png"
            alt="Spider-Man"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="h-px bg-primary/40 mb-3" />
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70 font-sans">Nowy Jork · 1962 · Amazing Fantasy #15</p>
          </div>
          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "inset 0 0 0 1px rgba(204,0,0,0.2)" }} />
        </motion.div>
      </div>
    </section>
  );
}
