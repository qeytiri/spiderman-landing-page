import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const events = [
  {
    id: "bite",
    year: "1962",
    title: "Ukąszenie",
    subtitle: "Amazing Fantasy #15",
    category: "Geneza",
    color: "#cc0000",
    description:
      "Piętnastoletni Peter Parker odwiedza wystawę naukową i zostaje ukąszony przez radioaktywnego pająka. W ciągu kilku godzin potrafi wspinać się po ścianach, jego refleks jest szybszy od myśli, a nowy zmysł ostrzega go przed niebezpieczeństwem. Świat już nigdy nie będzie taki sam.",
    detail:
      "Stan Lee i Steve Ditko stworzyli Spider-Mana jako antidotum na złotowiekowego herosa: nastolatek z prawdziwymi problemami — praca domowa, czynsz, samotność. Ukąszenie przez radioaktywnego pająka było zdarzeniem inicjującym jedną z najbardziej trwałych postaci w historii fikcji.",
    icon: "◆",
  },
  {
    id: "uncle-ben",
    year: "1962",
    title: "Z Wielką Mocą…",
    subtitle: "Śmierć Wuja Bena",
    category: "Tragedia",
    color: "#7c3aed",
    description:
      "Peter, pełen nowych mocy, odmawia zatrzymania uciekającego złodzieja. Ten sam złodziej tej samej nocy morduje jego Wuja Bena. Wina nigdy go nie opuszcza. Staje się motorem wszystkiego, co robi.",
    detail:
      "'Z wielką mocą przychodzi wielka odpowiedzialność' — nigdy tak naprawdę nie zostało wypowiedziane przez Wuja Bena w oryginalnym komiksie. Lekcja była domyślna, przekazana wyłącznie przez konsekwencje. Ta cisza sprawiła, że stała się wieczna.",
    icon: "◆",
  },
  {
    id: "daily-bugle",
    year: "1963",
    title: "Daily Bugle",
    subtitle: "Spider-Man w Redakcji",
    category: "Tożsamość",
    color: "#f97316",
    description:
      "Peter Parker zaczyna sprzedawać zdjęcia Spider-Mana J. Jonahowi Jamesonowi — jedyny fotograf, który potrafi je zdobyć, bo sam jest Spider-Manem. Doskonała ironia finansująca jego podwójne życie przez lata.",
    detail:
      "Dynamika Daily Bugle'a wprowadziła jedno z wielkich, powracających napięć komiksów: bohater pogardzany przez prasę, na której polega. Wendeta Jamesona przeciwko Spider-Manowi trwała dekadami, czyniąc finansową desperację Petera stałym źródłem dramatu.",
    icon: "◆",
  },
  {
    id: "gwen",
    year: "1973",
    title: "Noc, Gdy Zginęła Gwen Stacy",
    subtitle: "The Amazing Spider-Man #121",
    category: "Tragedia",
    color: "#ec4899",
    description:
      "Zielony Goblin zrzuca Gwen Stacy z mostu George'a Washingtona. Sieć Spider-Mana ją łapie — ale szarpnięcie przy hamowaniu mogło już zakończyć jej życie. To pytanie prześladuje Petera na zawsze.",
    detail:
      "Powszechnie uważane za koniec Srebrnego Wieku Komiksów. Przed tym momentem bliscy bohaterów byli narażeni na niebezpieczeństwo, ale nigdy tak naprawdę nie ginęli. Po nim wszystko się zmieniło. Śmierć Gwen Stacy udowodniła, że nikt w orbicie Petera Parkera nie jest bezpieczny.",
    icon: "◆",
  },
  {
    id: "symbiote",
    year: "1984",
    title: "Czarny Strój",
    subtitle: "Secret Wars #8",
    category: "Moc",
    color: "#e0e0e0",
    description:
      "Podczas Secret Wars Peter łączy się z obcym organizmem naśladującym ubranie i wzmacniającym jego moce. Jest żywy. Żywi się jego agresją. I nie chce go puścić.",
    detail:
      "Wątek symbionta wprowadził koncepcję stroju jako relacji pasożytniczej — metafory uzależnienia, którą pisarze Marvela eksploatowali przez dekady. Ostatecznie oddzielił się od Petera i połączył z Eddiem Brockiem, stając się Venomem.",
    icon: "◆",
  },
  {
    id: "miles",
    year: "2011",
    title: "Miles Morales",
    subtitle: "Ultimate Fallout #4",
    category: "Dziedzictwo",
    color: "#3b82f6",
    description:
      "Po śmierci Petera Parkera w Uniwersum Ultimate, trzynastoletni Miles Morales — ukąszony przez skradzionego pająka Oscorp — wkłada strój. Jego historia staje się własną legendą.",
    detail:
      "Miles Morales był współtworzony przez Briana Michaela Bendisa i Sarę Pichelli, by odzwierciedlić współczesny Nowy Jork: Czarny i Portorykański, z Brooklynu, poruszający się w świecie, który oczekuje od niego zwyczajności. Stał się niezwykły.",
    icon: "◆",
  },
  {
    id: "spider-verse",
    year: "2014",
    title: "Spider-Verse",
    subtitle: "Sieć Światów",
    category: "Multiwersum",
    color: "#ffd700",
    description:
      "Każdy Spider-Man z każdego wszechświata jest ścigany przez Morluna i Dziedziców. Pająki z setek rzeczywistości zjeżdżają się w największym crossoverze w historii postaci. Każdy Pająk. Każdy świat. Jedna wojna.",
    detail:
      "Spider-Verse wprowadził Spider-Gwen, Spider-Hama, Spider-Mana Noir i SP//dr do mainstreamu. Przeformułował mitologię Spider-Mana jako uniwersalną: każdy, gdziekolwiek, ukąszony przez właściwego pająka, mógł stać się bohaterem.",
    icon: "◆",
  },
  {
    id: "into-verse",
    year: "2018",
    title: "Poprzez Spider-Verse",
    subtitle: "Oscar — Najlepszy Film Animowany",
    category: "Kultura",
    color: "#a855f7",
    description:
      "Animowany film Sony rozbił wszelkie oczekiwania wobec animacji superbohaterskiej. Historia Milesa Moralesa opowiedziana językiem wizualnym, którego nikt wcześniej nie widział — i zdobyła Oscara. Każdy może nosić maskę.",
    detail:
      "Reżyserzy Peter Ramsey, Bob Persichetti i Rodney Rothman użyli przesuniętej rejestracji, kropek Ben-Day i ręcznie rysowanych niedoskonałości, by film wyglądał jak żywy komiks. Pozostaje jednym z najbardziej wizualnie wpływowych filmów animowanych, jakie kiedykolwiek powstały.",
    icon: "◆",
  },
];

const categories: Record<string, string> = {
  Geneza: "#cc0000",
  Tragedia: "#7c3aed",
  Tożsamość: "#f97316",
  Moc: "#e0e0e0",
  Dziedzictwo: "#3b82f6",
  Multiwersum: "#ffd700",
  Kultura: "#a855f7",
};

function WebLine({ progress }: { progress: number }) {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden pointer-events-none hidden lg:block">
      <motion.div
        className="w-full origin-top"
        style={{
          height: `${progress * 100}%`,
          background: "linear-gradient(to bottom, #cc000080, #3b82f680, #ffd70080)",
        }}
      />
    </div>
  );
}

function EventCard({
  event,
  index,
  isSelected,
  onSelect,
}: {
  event: (typeof events)[0];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex items-start gap-6 lg:gap-0 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} mb-4`}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    >
      <div className={`flex-1 ${isEven ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"}`}>
        <motion.button
          data-testid={`timeline-event-${event.id}`}
          onClick={onSelect}
          className="group w-full cursor-none"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div
            className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${
              isSelected ? "border-opacity-60" : "border-white/10 hover:border-white/20"
            }`}
            style={isSelected ? { borderColor: `${event.color}60` } : {}}
          >
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `linear-gradient(${isEven ? "135deg" : "225deg"}, ${event.color}18, transparent 60%)`,
                opacity: isSelected ? 1 : 0.4,
              }}
            />
            {isSelected && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px ${event.color}40, 0 0 30px ${event.color}15` }}
                layoutId="selected-glow"
              />
            )}

            <div className="relative p-6">
              <div
                className={`flex items-center gap-3 mb-3 ${isEven ? "lg:flex-row-reverse lg:justify-end" : ""}`}
              >
                <span
                  className="text-xs font-sans uppercase tracking-[0.3em] px-2 py-0.5 rounded"
                  style={{ color: event.color, background: `${event.color}18` }}
                >
                  {event.category}
                </span>
                <span className="text-white/30 text-xs font-sans">{event.subtitle}</span>
              </div>

              <div className={`flex items-baseline gap-4 mb-3 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                <h3
                  className="text-xl md:text-2xl font-display uppercase"
                  style={{ color: isSelected ? event.color : "white" }}
                >
                  {event.title}
                </h3>
                <span
                  className="text-3xl font-display font-bold opacity-30 flex-shrink-0"
                  style={{ color: event.color }}
                >
                  {event.year}
                </span>
              </div>

              <p className="text-white/60 text-sm font-sans leading-relaxed">{event.description}</p>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className="mt-4 pt-4 border-t text-sm font-sans leading-relaxed italic"
                      style={{ borderColor: `${event.color}30`, color: `${event.color}cc` }}
                    >
                      {event.detail}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`mt-4 flex items-center gap-2 text-xs uppercase tracking-widest font-sans transition-colors duration-200 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
                style={{ color: isSelected ? event.color : "rgba(255,255,255,0.3)" }}
              >
                <motion.span
                  animate={{ x: isSelected ? (isEven ? -4 : 4) : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isSelected ? "— Mniej" : isEven ? "Czytaj Więcej —" : "— Czytaj Więcej"}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      <div className="hidden lg:flex absolute left-1/2 top-6 -translate-x-1/2 flex-col items-center z-10">
        <motion.div
          className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
          style={{
            borderColor: event.color,
            background: isSelected ? event.color : "black",
          }}
          animate={{ scale: isSelected ? 1.4 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isSelected && (
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-black"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          )}
        </motion.div>
        {isSelected && (
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ border: `1px solid ${event.color}40` }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
          />
        )}
      </div>

      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
}

export function Timeline() {
  const [selected, setSelected] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [lineVal, setLineVal] = useState(0);
  lineProgress.on("change", setLineVal);

  function toggle(id: string) {
    setSelected((prev) => (prev === id ? null : id));
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-16 bg-background relative overflow-hidden"
      data-testid="section-timeline"
    >
     <div className="absolute inset-0 pointer-events-none overflow-hidden">
  <video
    className="absolute inset-0 w-full h-full object-cover opacity-15"
    src="/spider-movie-2.mp4"
    autoPlay
    loop
    muted
    playsInline
  />
  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0a0a0f 0%, transparent 15%, transparent 85%, #0a0a0f 100%)" }} />
</div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary font-sans mb-3">60+ Lat Dziedzictwa</p>
          <h2 className="text-5xl md:text-7xl font-display uppercase mb-4">Oś Czasu Spider-Verse'u</h2>
          <p className="text-white/40 font-sans text-sm max-w-md mx-auto">
            Kliknij wydarzenie, aby rozwinąć pełną historię za danym momentem.
          </p>
          <div className="h-px w-24 bg-primary mx-auto mt-4" />
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-3" data-testid="legenda-osi-czasu">
          {Object.entries(categories).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs text-white/40 font-sans uppercase tracking-widest">{cat}</span>
            </div>
          ))}
        </div>

        <div className="relative">
          <WebLine progress={lineVal} />
          <div className="space-y-2">
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                isSelected={selected === event.id}
                onSelect={() => toggle(event.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
