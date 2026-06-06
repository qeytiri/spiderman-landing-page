import { motion } from "framer-motion";

const villains = [
  {
    name: "Green Goblin",
    alterEgo: "Norman Osborn",
    quote: "We are who we choose to be... NOW CHOOSE!",
    image: "/green-goblin.png",
    color: "#22c55e",
  },
  {
    name: "Doctor Octopus",
    alterEgo: "Otto Octavius",
    quote: "The power of the sun, in the palm of my hand.",
    image: "/doctor-octopus.png",
    color: "#f97316",
  },
  {
    name: "Venom",
    alterEgo: "Eddie Brock",
    quote: "We are Venom.",
    image: "/venom.png",
    color: "#e0e0e0",
  },
];

export function Villains() {
  return (
    <section className="relative py-32 px-6 md:px-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary font-sans mb-3">Enemies of the Spider</p>
          <h2
            className="text-6xl md:text-8xl font-display uppercase tracking-tighter"
            style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.4)" }}
          >
            Rogues Gallery
          </h2>
        </motion.div>

        <div className="flex flex-col gap-20">
          {villains.map((villain, index) => (
            <motion.div
              key={villain.name}
              data-testid={`villain-card-${villain.name.toLowerCase().replace(/\s/g, "-")}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16`}
            >
              <motion.div
                className="flex-1 w-full h-[480px] rounded-2xl overflow-hidden relative group cursor-none"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at center, ${villain.color}20, transparent 70%)` }}
                />
                <div
                  className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 0 1px ${villain.color}30` }}
                />
                <img
                  src={villain.image}
                  alt={villain.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              </motion.div>

              <div className="flex-1 space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <span
                    className="inline-block text-xs font-sans uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-4"
                    style={{ color: villain.color, background: `${villain.color}18`, border: `1px solid ${villain.color}30` }}
                  >
                    {villain.alterEgo}
                  </span>
                  <h3
                    className="text-5xl md:text-7xl font-display uppercase leading-none"
                    style={{ textShadow: `0 0 30px ${villain.color}30` }}
                  >
                    {villain.name}
                  </h3>
                </motion.div>

                <motion.div
                  className="h-px w-16"
                  style={{ background: villain.color }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />

                <motion.blockquote
                  initial={{ opacity: 0, x: index % 2 === 1 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="text-xl md:text-2xl text-white/70 italic pl-5 py-2 border-l-2 font-sans leading-relaxed"
                  style={{ borderColor: villain.color }}
                >
                  "{villain.quote}"
                </motion.blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
