// Globalny singleton — tylko jeden narrator gra na raz
let currentAudio: HTMLAudioElement | null = null;
let currentStop: (() => void) | null = null;

export function playNarrator(src: string, onEnd: () => void, onStop: () => void) {
  // Zatrzymaj poprzedniego
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentStop?.();
  }

  const audio = new Audio(src);
  audio.volume = 1.0;
  currentAudio = audio;
  currentStop = onStop;

  audio.onended = () => {
    currentAudio = null;
    currentStop = null;
    onEnd();
  };

  audio.play();
}

export function stopNarrator() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentStop?.();
    currentAudio = null;
    currentStop = null;
  }
}
