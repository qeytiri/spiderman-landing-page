import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const abilities = [
  {
    title: "Wspinaczka po Ścianach",
    desc: "Zdolność do mentalnego kontrolowania przepływu przyciągania między-atomowego między warstwami molekularnymi. Może przyczepiać się do niemal każdej powierzchni.",
    color: "from-blue-600 to-blue-900"
  },
  {
    title: "Nadludzka Siła",
    desc: "Proporcjonalna siła pająka — zdolny do podniesienia ciężaru do 10 ton. Każdy cios ma siłę rozbijającą stal.",
    color: "from-red-600 to-red-900"
  },
  {
    title: "Zmysł Pająka",
    desc: "Mrowienie u nasady czaszki ostrzegające przed nadchodzącym niebezpieczeństwem — szybsze od myśli, nieomylne jak instynkt.",
    color: "from-yellow-500 to-amber-700"
  },
  {
    title: "Strzelanie Siecią",
    desc: "Własnoręcznie zbudowane urządzenia nadgarstkowe wystrzeliwujące zaawansowany adhezyjny polimer syntetyczny — wytrzymalszy od stali.",
    color: "from-gray-300 to-gray-600"
  }
];

export function Abilities() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 left-10 md:left-20 z-10">
          <h2 className="text-6xl md:text-8xl font-display text-transparent text-stroke-white opacity-10 uppercase">
            Moce
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-10 md:px-32 pt-20">
          {abilities.map((ability, index) => (
            <div
              key={index}
              className="w-[85vw] md:w-[600px] h-[500px] flex-shrink-0 rounded-3xl p-1 relative overflow-hidden bg-gradient-to-br from-white/10 to-white/0"
            >
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0 rounded-3xl" />
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${ability.color} z-0 rounded-3xl`} />

              <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-16">
                <span className="text-8xl font-black text-white/20 mb-auto tracking-widest">0{index + 1}</span>
                <h3 className="text-4xl md:text-5xl font-display mb-4 uppercase">{ability.title}</h3>
                <p className="text-xl text-gray-400 font-light font-sans">{ability.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
