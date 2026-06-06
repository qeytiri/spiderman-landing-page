import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { playNarrator, stopNarrator } from "@/lib/narratorAudio";

const abilities = [
  {
    title: "Wspinaczka po Ścianach",
    desc: "Zdolność do mentalnego kontrolowania przepływu przyciągania między-atomowego między warstwami molekularnymi. Może przyczepiać się do niemal każdej powierzchni.",
    color: "from-blue-600 to-blue-900",
    image: "/ability-wall.jpg"
  },
  {
    title: "Nadludzka Siła",
    desc: "Proporcjonalna siła pająka — zdolny do podniesienia ciężaru do 10 ton. Każdy cios ma siłę rozbijającą stal.",
    color: "from-red-600 to-red-900",
    image: "/ability-strength.jpg"
  },
  {
    title: "Zmysł Pająka",
    desc: "Mrowienie u nasady czaszki ostrzegające przed nadchodzącym niebezpieczeństwem — szybsze od myśli, nieomylne jak instynkt.",
    color: "from-yellow-500 to-amber-700",
    image: "/ability-sense.jpg"
  },
  {
    title: "Strzelanie Siecią",
    desc: "Własnoręcznie zbudowane urządzenia nadgarstkowe wystrzeliwujące zaawansowany adhezyjny polimer syntetyczny — wytrzymalszy od stali.",
    color: "from-gray-300 to-gray-600",
    image: "/ability-web.jpg"
  }
];

export function Abilities() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const [narPlaying, setNarPlaying] = useState(false);

  const toggleNarrator = () => {
    if (narPlaying) {
      stopNarrator();
      setNarPlaying(false);
    } else {
      playNarrator("/abilities-narrator.wav", () => setNarPlaying(false), () => setNarPlaying(false));
      setNarPlaying(true);
    }
  };

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 left-10 md:left-20 z-10">
          <h2 className="text-6xl md:text-8xl font-display text-white opacity-80 uppercase drop-shadow-[0_0_30px_rgba(204,0,0,0.5)]">
            Moce
          </h2>
          <button
            onClick={toggleNarrator}
            className="mt-4 flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/50 bg-black/60 hover:bg-primary/20 transition-colors text-sm uppercase tracking-widest font-sans"
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

        <motion.div style={{ x }} className="flex gap-8 px-10 md:px-32 pt-20">
          {abilities.map((ability, index) => (
            <div
              key={index}
              className="w-[85vw] md:w-[600px] h-[500px] flex-shrink-0 rounded-3xl p-1 relative overflow-hidden bg-gradient-to-br from-white/10 to-white/0"
            >
              {ability.image && (
                <img
                  src={ability.image}
                  alt={ability.title}
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-3xl opacity-60"
                />
              )}
              <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] z-0 rounded-3xl" />
              <div className={`absolute inset-0 opacity-15 bg-gradient-to-br ${ability.color} z-0 rounded-3xl`} />

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
