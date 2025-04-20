// Cache for preloaded audio
const audioCache: Record<string, HTMLAudioElement> = {};

// Available sound effects with base URL
const BASE_URL = '/src/assets/sounds';
const soundEffects = {
  hover: `${BASE_URL}/hover.mp3`,
  click: `${BASE_URL}/click.mp3`,
  notification: `${BASE_URL}/notification.mp3`,
  open: `${BASE_URL}/open.mp3`,
  close: `${BASE_URL}/close.mp3`,
  minimize: `${BASE_URL}/minimize.mp3`,
  success: `${BASE_URL}/success.mp3`,
  pop: `${BASE_URL}/pop.mp3`,
};

// Preload audio files
export const preloadAudioEffects = () => {
  Object.entries(soundEffects).forEach(([key, path]) => {
    const audio = new Audio();
    audio.src = path;
    audio.volume = 0.3; // Default volume
    audioCache[key] = audio;
  });
};

// Play a sound effect with error handling
export const playSoundEffect = async (effect: keyof typeof soundEffects) => {
  // Check if user has allowed audio (stored in localStorage)
  const audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
  if (!audioEnabled) return;

  try {
    // Create audio on demand if not cached
    if (!audioCache[effect] && soundEffects[effect]) {
      const audio = new Audio(soundEffects[effect]);
      audio.volume = 0.3;
      await audio.load(); // Ensure audio is loaded before playing
      audioCache[effect] = audio;
    }

    const audio = audioCache[effect];
    if (audio) {
      // Create a clone to allow overlapping sounds
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = audio.volume;
      await clone.play();
    }
  } catch (error) {
    console.log('Audio play error:', error);
  }
};

// Set volume for all sound effects
export const setAudioVolume = (volume: number) => {
  Object.values(audioCache).forEach(audio => {
    audio.volume = Math.max(0, Math.min(1, volume)); // Clamp between 0 and 1
  });
};

// Toggle audio on/off
export const toggleAudio = (enabled: boolean) => {
  localStorage.setItem('audioEnabled', enabled.toString());
};

// Check if audio is enabled
export const isAudioEnabled = (): boolean => {
  return localStorage.getItem('audioEnabled') !== 'false';
};
