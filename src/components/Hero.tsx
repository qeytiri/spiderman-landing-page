import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  return (
    <section ref={ref} className="relative h-[150vh] w-full overflow-hidden bg-black">
      <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/hero-bg.png')`, opacity: 0.35 }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(10,10,15,0.95) 85%, #0a0a0f 100%)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(180,0,0,0.08), transparent 70%)" }} />
      </motion.div>

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-10 px-4">
        <motion.div
          style={{ y: yText, opacity: opacityText, scale: scaleText }}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary tracking-[0.35em] text-sm md:text-base font-sans uppercase mb-4"
          >
            Twój Przyjazny Sąsiad z Sąsiedztwa
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-7xl md:text-9xl lg:text-[12rem] font-black uppercase leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl"
          >
            SPIDER-MAN
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Przewiń</span>
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-primary"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
