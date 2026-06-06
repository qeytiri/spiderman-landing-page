import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function BackgroundMusic() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/spiderman_theme.mp3");
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;

    const start = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    // Spróbuj od razu
    audio.play().then(() => setPlaying(true)).catch(() => {
      // Czekaj na pierwszą interakcję
      document.addEventListener("click", start, { once: true, capture: true });
      document.addEventListener("keydown", start, { once: true });
      document.addEventListener("touchstart", start, { once: true });
    });

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", start, { capture: true });
      document.removeEventListener("keydown", start);
      document.removeEventListener("touchstart", start);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <motion.button
        onClick={toggle}
        title={playing ? "Wycisz muzykę" : "Włącz muzykę tła"}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg border border-primary/40 bg-black/80 backdrop-blur-md hover:bg-primary/20 transition-colors relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-primary/50">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </motion.button>

      {playing && (
        <motion.input
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type="range"
          min={0} max={1} step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="w-14 accent-primary cursor-pointer"
          title="Głośność"
        />
      )}
    </motion.div>
  );
}
