import { motion } from "framer-motion";

const suits = [
  { name: "Classic Suit", year: "1962", type: "Earth-616" },
  { name: "Symbiote Suit", year: "1984", type: "Alien Entity" },
  { name: "Iron Spider", year: "2006", type: "Stark Tech" },
  { name: "Miles Morales", year: "2011", type: "Ultimate Universe" },
  { name: "Spider-Gwen", year: "2014", type: "Earth-65" },
  { name: "Spider-Man Noir", year: "2009", type: "Earth-90214" }
];

export function Suits() {
  return (
    <section className="py-32 px-6 md:px-20 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-4">Iconic Suits</h2>
          <div className="h-1 w-24 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suits.map((suit, index) => (
            <motion.div
              key={suit.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-96 border border-white/10 bg-white/5 rounded-xl overflow-hidden cursor-none"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">{suit.year}</span>
                <h3 className="text-3xl font-display uppercase mb-1 group-hover:text-primary transition-colors">{suit.name}</h3>
                <p className="text-gray-400 text-sm font-sans">{suit.type}</p>
              </div>

              {/* Decorative Web element */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0">
                 <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0,0 L100,100 M100,0 L0,100 M50,0 L50,100 M0,50 L100,50" />
                    <circle cx="50" cy="50" r="20" />
                    <circle cx="50" cy="50" r="40" />
                 </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
