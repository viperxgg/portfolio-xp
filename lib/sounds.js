// Original synthesized retro-OS sounds (Web Audio API) — no copyrighted audio files.
let ctx = null;

function ac() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, at, dur, type = "sine", peak = 0.07) {
  const c = ac();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(peak, at + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(g).connect(c.destination);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

export function playStartup() {
  const c = ac();
  if (!c) return;
  const t = c.currentTime + 0.05;
  // Soft rising pad — an original chime in the spirit of an OS boot
  tone(392.0, t, 1.6, "sine", 0.05); // G4
  tone(523.25, t + 0.14, 1.5, "sine", 0.055); // C5
  tone(659.25, t + 0.28, 1.4, "sine", 0.05); // E5
  tone(783.99, t + 0.42, 1.6, "sine", 0.045); // G5
  tone(1046.5, t + 0.62, 1.3, "triangle", 0.02); // C6 sparkle
}

export function playOpen() {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  tone(520, t, 0.09, "triangle", 0.05);
  tone(780, t + 0.07, 0.12, "triangle", 0.045);
}

export function playClose() {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  tone(700, t, 0.09, "triangle", 0.045);
  tone(420, t + 0.07, 0.13, "triangle", 0.04);
}

export function playMinimize() {
  const c = ac();
  if (!c) return;
  tone(560, c.currentTime, 0.1, "sine", 0.04);
}

export function playClick() {
  const c = ac();
  if (!c) return;
  tone(1200, c.currentTime, 0.035, "square", 0.02);
}

export function playBoom() {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(40, t + 0.5);
  g.gain.setValueAtTime(0.12, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.6);
}

export function playWin() {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.09, 0.25, "triangle", 0.05));
}
