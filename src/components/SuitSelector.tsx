import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

const suits = [
  {
    id: "classic",
    name: "Klasyczny Strój",
    alias: "Oryginał",
    year: "1962",
    universe: "Earth-616",
    description:
      "Uszyty własnoręcznie przez Petera Parkera po ukąszeniu przez radioaktywnego pająka. Prosty. Ikoniczny. Ponadczasowy. Każdy pająk od tamtej pory żyje w cieniu tego projektu.",
    color: "#cc0000",
    colorName: "crimson",
    gradient: "from-red-950 via-red-900 to-black",
    accentGradient: "from-red-600 to-red-900",
    stats: { power: 78, speed: 82, tech: 55, stealth: 40 },
    webPattern: "default",
  },
  {
    id: "symbiote",
    name: "Strój Symbionta",
    alias: "Czarny Strój",
    year: "1984",
    universe: "Earth-616",
    description:
      "Obcy organizm amplifikujący każdą zdolność ponad naturalne granice — za cenę. Ciemność, którą niesie, to nie tylko estetyka. Szepcze. Głoduje. I nigdy naprawdę nie odpuszcza.",
    color: "#e0e0e0",
    colorName: "white",
    gradient: "from-slate-950 via-slate-900 to-black",
    accentGradient: "from-slate-300 to-slate-600",
    stats: { power: 96, speed: 90, tech: 20, stealth: 85 },
    webPattern: "dense",
  },
  {
    id: "iron-spider",
    name: "Iron Spider",
    alias: "Projekt Starka",
    year: "2006",
    universe: "Earth-616",
    description:
      "Ostateczny dar Tony'ego Starka: nanopancerz, trzy dodatkowe kończyny, wbudowana AI i bezpośrednie łącze z Avengers. Moc przewyższająca każdy poprzedni strój.",
    color: "#ffd700",
    colorName: "gold",
    gradient: "from-yellow-950 via-amber-900 to-black",
    accentGradient: "from-yellow-400 to-amber-700",
    stats: { power: 95, speed: 75, tech: 99, stealth: 20 },
    webPattern: "hex",
  },
  {
    id: "miles",
    name: "Miles Morales",
    alias: "Nowe Pokolenie",
    year: "2011",
    universe: "Earth-1610",
    description:
      "Miles Morales posiada moc, której Peter nigdy nie miał — bioelektryczność rażącą jak piorun i zdolność znikania w ciemności. Nowy Spider-Man na nową erę.",
    color: "#3b82f6",
    colorName: "blue",
    gradient: "from-blue-950 via-blue-900 to-black",
    accentGradient: "from-blue-500 to-blue-900",
    stats: { power: 85, speed: 88, tech: 60, stealth: 92 },
    webPattern: "sparse",
  },
  {
    id: "spider-gwen",
    name: "Spider-Gwen",
    alias: "Duch-Pająk",
    year: "2014",
    universe: "Earth-65",
    description:
      "Na Ziemi-65 to Gwen Stacy została ukąszona — nie Peter. Ona stała się Pająkiem. Zwinna, szybka, nawiedzana stratą. Jej kaptur to jej legenda.",
    color: "#ec4899",
    colorName: "pink",
    gradient: "from-pink-950 via-fuchsia-900 to-black",
    accentGradient: "from-pink-400 to-fuchsia-700",
    stats: { power: 72, speed: 95, tech: 50, stealth: 78 },
    webPattern: "default",
  },
  {
    id: "noir",
    name: "Spider-Man Noir",
    alias: "Cień Sieci",
    year: "2009",
    universe: "Earth-90214",
    description:
      "Nowy Jork epoki Wielkiego Kryzysu. Bez żartów. Bez koloru. Tylko cień, gniew i wyrzutnia sieci sklecona ze złomu. Najciemniejszy Spider-Man, jaki kiedykolwiek istniał.",
    color: "#9ca3af",
    colorName: "grey",
    gradient: "from-neutral-950 via-neutral-900 to-black",
    accentGradient: "from-neutral-400 to-neutral-700",
    stats: { power: 70, speed: 68, tech: 30, stealth: 99 },
    webPattern: "dense",
  },
  {
    id: "scarlet",
    name: "Szkarłatny Pająk",
    alias: "Klon",
    year: "1994",
    universe: "Earth-616",
    description:
      "Ben Reilly — klon Petera Parkera — walczył o życie, którego nigdy nie zdążył skończyć. Bluza z kapturem i podarte rękawy stały się symbolem poświęcenia. Szkarłatny Pająk zasłużył na swój mit.",
    color: "#ef4444",
    colorName: "red",
    gradient: "from-red-950 via-rose-900 to-black",
    accentGradient: "from-rose-500 to-red-800",
    stats: { power: 78, speed: 85, tech: 45, stealth: 60 },
    webPattern: "sparse",
  },
  {
    id: "superior",
    name: "Nadrzędny Spider-Man",
    alias: "Uzurpator",
    year: "2012",
    universe: "Earth-616",
    description:
      "Doktor Octopus przejął ciało Petera i przysiągł być lepszym Spider-Manem. Bezwzględny, błyskotliwy, przerażająco skuteczny — dopóki Peter nie odzyskał swojego życia od środka.",
    color: "#7c3aed",
    colorName: "purple",
    gradient: "from-violet-950 via-purple-900 to-black",
    accentGradient: "from-violet-500 to-purple-900",
    stats: { power: 88, speed: 76, tech: 95, stealth: 55 },
    webPattern: "hex",
  },
];

const statLabels: Record<string, string> = {
  power: "Siła",
  speed: "Szybkość",
  tech: "Technologia",
  stealth: "Skradanie",
};

function WebPattern({ type }: { type: string }) {
  if (type === "dense") {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400" fill="none" stroke="white" strokeWidth="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx="200" cy="200" r={20 + i * 25} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          return <line key={i} x1="200" y1="200" x2={200 + Math.cos(angle) * 300} y2={200 + Math.sin(angle) * 300} />;
        })}
      </svg>
    );
  }
  if (type === "hex") {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400" fill="none" stroke="white" strokeWidth="0.5">
        {[60, 80, 100, 120, 140, 160, 180].map((r, i) => (
          <polygon key={i} points={Array.from({ length: 6 }).map((_, j) => {
            const a = (j / 6) * Math.PI * 2 - Math.PI / 6;
            return `${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`;
          }).join(" ")} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
          return <line key={i} x1="200" y1="200" x2={200 + Math.cos(angle) * 200} y2={200 + Math.sin(angle) * 200} />;
        })}
      </svg>
    );
  }
  if (type === "sparse") {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400" fill="none" stroke="white" strokeWidth="0.5">
        {[50, 120, 200].map((r, i) => <circle key={i} cx="200" cy="200" r={r} />)}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return <line key={i} x1="200" y1="200" x2={200 + Math.cos(angle) * 220} y2={200 + Math.sin(angle) * 220} />;
        })}
      </svg>
    );
  }
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400" fill="none" stroke="white" strokeWidth="0.5">
      {[40, 80, 120, 160, 200].map((r, i) => <circle key={i} cx="200" cy="200" r={r} />)}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return <line key={i} x1="200" y1="200" x2={200 + Math.cos(angle) * 220} y2={200 + Math.sin(angle) * 220} />;
      })}
    </svg>
  );
}

function StatBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs uppercase tracking-widest text-white/60 font-sans">{label}</span>
        <motion.span
          className="text-sm font-bold tabular-nums"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {value}
        </motion.span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function Card3D({ suit }: { suit: typeof suits[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [12, -12]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-12, 12]), { stiffness: 200, damping: 30 });
  const glareX = useTransform(mouseX, [-150, 150], [0, 100]);
  const glareY = useTransform(mouseY, [-150, 150], [0, 100]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-none select-none"
      data-testid={`suit-card-${suit.id}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${suit.gradient}`} />
      <WebPattern type={suit.webPattern} />

      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-8 md:p-10" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-start justify-between mb-auto">
          <div>
            <motion.span
              className="inline-block text-xs uppercase tracking-[0.3em] font-sans px-3 py-1 rounded-full border mb-3"
              style={{ color: suit.color, borderColor: `${suit.color}40`, background: `${suit.color}15` }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {suit.universe}
            </motion.span>
            <motion.p
              className="text-white/40 text-sm font-sans tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {suit.alias}
            </motion.p>
          </div>
          <motion.span
            className="text-4xl font-display font-bold opacity-20"
            style={{ color: suit.color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: 0.2 }}
          >
            {suit.year}
          </motion.span>
        </div>

        <div className="mt-4 mb-6">
          <motion.h3
            className="text-4xl md:text-5xl font-display uppercase leading-none mb-4"
            style={{ color: suit.color, textShadow: `0 0 40px ${suit.color}60` }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {suit.name}
          </motion.h3>
          <motion.p
            className="text-white/70 text-sm md:text-base font-sans leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {suit.description}
          </motion.p>
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
          <p className="text-xs uppercase tracking-widest text-white/40 font-sans mb-4">Statystyki</p>
          {Object.entries(suit.stats).map(([key, val], i) => (
            <StatBar key={key} label={statLabels[key]} value={val} color={suit.color} delay={0.3 + i * 0.08} />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${suit.color}30, 0 0 60px ${suit.color}20` }}
      />
    </motion.div>
  );
}

export function SuitSelector() {
  const [selected, setSelected] = useState(0);
  const suit = suits[selected];

  return (
    <section className="py-24 px-6 md:px-16 bg-background relative overflow-hidden" data-testid="section-suit-selector">
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{ background: `radial-gradient(ellipse 60% 60% at 70% 50%, ${suit.color}12, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary font-sans mb-3">Wybierz Swój Strój</p>
          <h2 className="text-5xl md:text-7xl font-display uppercase mb-4">Selektor Kostiumów</h2>
          <div className="h-px w-24 mx-auto" style={{ background: suit.color, transition: "background 0.5s" }} />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[600px]">
          <div className="lg:w-72 flex-shrink-0 flex flex-col gap-1" data-testid="suit-list">
            {suits.map((s, i) => (
              <motion.button
                key={s.id}
                data-testid={`suit-button-${s.id}`}
                onClick={() => setSelected(i)}
                className="relative text-left px-5 py-4 rounded-xl overflow-hidden cursor-none group transition-colors duration-200"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="absolute inset-0 rounded-xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, ${s.color}20, ${s.color}08)`,
                    opacity: selected === i ? 1 : 0,
                  }}
                />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full transition-all duration-300"
                  style={{
                    background: s.color,
                    opacity: selected === i ? 1 : 0,
                    transform: `translateY(-50%) scaleY(${selected === i ? 1 : 0})`,
                  }}
                />
                <div className="relative pl-3">
                  <span
                    className="block text-xs font-sans uppercase tracking-widest mb-0.5 transition-colors duration-200"
                    style={{ color: selected === i ? s.color : "rgba(255,255,255,0.3)" }}
                  >
                    {s.year}
                  </span>
                  <span
                    className="block text-base font-display uppercase transition-colors duration-200"
                    style={{ color: selected === i ? "#ffffff" : "rgba(255,255,255,0.5)" }}
                  >
                    {s.name}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex-1 relative" style={{ perspective: "1000px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={suit.id}
                className="h-full min-h-[520px]"
                initial={{ opacity: 0, x: 60, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -60, rotateY: 15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card3D suit={suit} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2" data-testid="suit-dots">
          {suits.map((s, i) => (
            <button
              key={s.id}
              data-testid={`suit-dot-${s.id}`}
              onClick={() => setSelected(i)}
              className="w-2 h-2 rounded-full transition-all duration-300 cursor-none"
              style={{
                background: selected === i ? s.color : "rgba(255,255,255,0.2)",
                transform: selected === i ? "scale(1.4)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
