
// Cache for preloaded audio
const audioCache: Record<string, HTMLAudioElement> = {};

// Available sound effects
const soundEffects = {
  hover: '/sounds/hover.mp3',
  click: '/sounds/click.mp3',
  notification: '/sounds/notification.mp3',
  open: '/sounds/open.mp3',
  close: '/sounds/close.mp3',
  minimize: '/sounds/minimize.mp3',
  success: '/sounds/success.mp3',
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

// Play a sound effect
export const playSoundEffect = (effect: keyof typeof soundEffects) => {
  // Check if user has allowed audio (stored in localStorage)
  const audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
  if (!audioEnabled) return;

  // Create audio on demand if not cached
  if (!audioCache[effect] && soundEffects[effect]) {
    const audio = new Audio(soundEffects[effect]);
    audio.volume = 0.3;
    audioCache[effect] = audio;
  }

  const audio = audioCache[effect];
  if (audio) {
    // Create a clone to allow overlapping sounds
    const clone = audio.cloneNode() as HTMLAudioElement;
    clone.volume = audio.volume;
    clone.play().catch(error => {
      // Usually happens if play() is not triggered by user interaction
      console.log('Audio play error:', error);
    });
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
