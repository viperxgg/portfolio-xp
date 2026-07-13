const STORAGE_KEY = "framform-system-sound";

const SOUND_FILES = {
  startup: "/audio/kenney-ui/system-startup.mp3",
  menuOpen: "/audio/kenney-ui/system-menu-open.mp3",
  menuClose: "/audio/kenney-ui/system-menu-close.mp3",
  select: "/audio/kenney-ui/system-select.mp3",
  windowOpen: "/audio/kenney-ui/system-window-open.mp3",
  windowClose: "/audio/kenney-ui/system-window-close.mp3",
  minimize: "/audio/kenney-ui/system-minimize.mp3",
  restore: "/audio/kenney-ui/system-restore.mp3",
  toggle: "/audio/kenney-ui/system-toggle.mp3",
  power: "/audio/kenney-ui/system-power.mp3",
  blocked: "/audio/kenney-ui/puzzle-blocked.mp3",
  success1: "/audio/kenney-ui/puzzle-success-1.mp3",
  success2: "/audio/kenney-ui/puzzle-success-2.mp3",
};

const cache = new Map();
let enabled = true;
let preferenceLoaded = false;

function loadPreference() {
  if (preferenceLoaded || typeof window === "undefined") return;
  preferenceLoaded = true;
  try {
    enabled = window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    enabled = true;
  }
}

export function getSoundEnabled() {
  loadPreference();
  return enabled;
}

export function setSoundEnabled(nextValue) {
  loadPreference();
  enabled = Boolean(nextValue);
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Sound still works for this visit when storage is unavailable.
  }
  window.dispatchEvent(new CustomEvent("framform:sound-change", { detail: enabled }));
}

export function subscribeToSound(callback) {
  if (typeof window === "undefined") return () => {};
  const listener = (event) => callback(event.detail);
  window.addEventListener("framform:sound-change", listener);
  return () => window.removeEventListener("framform:sound-change", listener);
}

export function playSound(name, volume = 0.46) {
  loadPreference();
  if (!enabled || typeof Audio === "undefined") return;
  const src = SOUND_FILES[name];
  if (!src) return;

  let base = cache.get(name);
  if (!base) {
    base = new Audio(src);
    base.preload = "auto";
    cache.set(name, base);
  }

  const audio = base.paused ? base : base.cloneNode();
  audio.volume = volume;
  try {
    audio.currentTime = 0;
  } catch {
    // Some mobile browsers do not expose currentTime until metadata is ready.
  }
  audio.play().catch(() => {});
}

export const playStartup = () => playSound("startup", 0.52);
export const playMenuOpen = () => playSound("menuOpen", 0.42);
export const playMenuClose = () => playSound("menuClose", 0.36);
export const playSelect = () => playSound("select", 0.4);
export const playOpen = () => playSound("windowOpen", 0.5);
export const playClose = () => playSound("windowClose", 0.46);
export const playMinimize = () => playSound("minimize", 0.42);
export const playRestore = () => playSound("restore", 0.44);
export const playToggle = () => playSound("toggle", 0.4);
export const playPower = () => playSound("power", 0.5);
export const playClick = () => playSelect();
export const playBoom = () => playSound("blocked", 0.56);
export const playWin = () => {
  playSound("success1", 0.5);
  window.setTimeout(() => playSound("success2", 0.48), 130);
};
