import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 right-8 bottom-0 w-[1px] bg-white/10 z-[9000] hidden md:block mix-blend-difference">
      <motion.div
        className="absolute top-0 left-[-1px] right-[-1px] bottom-0 bg-primary origin-top shadow-[0_0_15px_rgba(255,26,26,0.8)]"
        style={{ scaleY }}
      />
      <motion.div 
        className="absolute w-3 h-3 rounded-full bg-primary left-[-5px] shadow-[0_0_10px_rgba(255,26,26,1)]"
        style={{ top: "0%", translateY: "-50%", scale: scaleY }}
      />
    </div>
  );
}
