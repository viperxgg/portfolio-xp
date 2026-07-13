"use client";

import { useEffect, useState } from "react";
import { getSoundEnabled, playToggle, setSoundEnabled, subscribeToSound } from "../lib/sounds";

function SpeakerIcon({ muted }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      {muted ? <path d="m17 9 4 6m0-6-4 6" /> : <path d="M17 9.5c1.4 1.4 1.4 3.6 0 5M19.5 7c2.8 2.8 2.8 7.2 0 10" />}
    </svg>
  );
}

export default function SoundToggle({ compact = false, copy }) {
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(getSoundEnabled());
    return subscribeToSound(setSoundOn);
  }, []);

  const toggle = () => {
    const next = !soundOn;
    if (soundOn) playToggle();
    setSoundEnabled(next);
    if (next) playToggle();
    setSoundOn(next);
  };

  return (
    <button
      type="button"
      className={`system-sound-toggle${compact ? " system-sound-toggle--compact" : ""}`}
      aria-label={soundOn ? copy.turnOff : copy.turnOn}
      aria-pressed={soundOn}
      onClick={toggle}
    >
      <SpeakerIcon muted={!soundOn} />
      {!compact && <span>{soundOn ? copy.on : copy.off}</span>}
    </button>
  );
}
