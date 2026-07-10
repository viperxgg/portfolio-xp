"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Window from "./Window";
import { buildRegistry, DESKTOP_ICONS } from "./contents";
import { playOpen, playClose, playMinimize } from "../lib/sounds";

const CLIPPY_TIPS = [
  "Hi! I'm Clippy 📎 It looks like you want to get to know Azzam. Double-click “My Projects” to see what he builds!",
  "Tip: open “Fråga Elin” — a real AI advisor Azzam built with the Claude API. She even tells you what NOT to buy!",
  "Fun fact: this whole desktop is a Next.js app. Drag the windows around!",
  "Looking to hire? “My CV” has the full story — and every project has a case sheet (PDF).",
];

function Clock() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 20000);
    return () => clearInterval(t);
  }, []);
  return <span className="xp-clock">{now}</span>;
}

export default function Desktop({ onLogOff, onShutDown }) {
  const [wins, setWins] = useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [clippyTip, setClippyTip] = useState(0);
  const [clippyHidden, setClippyHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const zRef = useRef(10);
  const spawnRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const openWindow = useCallback((id) => {
    playOpen();
    setWins((prev) => {
      const existing = prev.find((w) => w.id === id);
      zRef.current += 1;
      if (existing) {
        return prev.map((w) => (w.id === id ? { ...w, minimized: false, z: zRef.current } : w));
      }
      const reg = buildRegistry(openWindow);
      const def = reg[id];
      if (!def) return prev;
      spawnRef.current += 1;
      const offset = (spawnRef.current % 6) * 28;
      const maxW = typeof window !== "undefined" ? window.innerWidth : 1200;
      const w = Math.min(def.size.w, maxW - 40);
      return [
        ...prev,
        {
          id,
          title: def.title,
          icon: def.icon,
          content: def.content,
          size: { w, h: def.size.h },
          pos: { x: Math.max(10, 90 + offset), y: Math.max(6, 40 + offset) },
          minimized: false,
          maximized: false,
          z: zRef.current,
        },
      ];
    });
  }, []);

  const closeWindow = (id) => {
    playClose();
    setWins((p) => p.filter((w) => w.id !== id));
  };
  const minimizeWindow = (id) => {
    playMinimize();
    setWins((p) => p.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  };
  const maximizeWindow = (id) =>
    setWins((p) => p.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  const focusWindow = (id) => {
    zRef.current += 1;
    setWins((p) => p.map((w) => (w.id === id ? { ...w, z: zRef.current } : w)));
  };
  const moveWindow = (id, pos) => setWins((p) => p.map((w) => (w.id === id ? { ...w, pos } : w)));
  const taskbarClick = (id) => {
    const w = wins.find((x) => x.id === id);
    if (!w) return;
    if (w.minimized) {
      zRef.current += 1;
      setWins((p) => p.map((x) => (x.id === id ? { ...x, minimized: false, z: zRef.current } : x)));
    } else {
      minimizeWindow(id);
    }
  };

  const topZ = useMemo(() => Math.max(0, ...wins.filter((w) => !w.minimized).map((w) => w.z)), [wins]);

  return (
    <div className="xp-desktop" onClick={() => startOpen && setStartOpen(false)}>
      <div className="xp-wallpaper" />

      <div className="xp-icons">
        {DESKTOP_ICONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className="xp-desktop-icon"
            onDoubleClick={() => openWindow(id)}
            onClick={(e) => {
              if (isMobile) openWindow(id);
            }}
            title={isMobile ? undefined : "Double-click to open"}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {wins.map((w) => (
        <Window
          key={w.id}
          win={w}
          focused={w.z === topZ}
          isMobile={isMobile}
          onFocus={focusWindow}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onMove={moveWindow}
        />
      ))}

      {!clippyHidden && (
        <div className="xp-clippy">
          <div className="xp-clippy-bubble window">
            <div className="window-body">
              <p>{CLIPPY_TIPS[clippyTip]}</p>
              <div className="xp-clippy-buttons">
                <button onClick={() => setClippyTip((clippyTip + 1) % CLIPPY_TIPS.length)}>Next tip</button>
                <button onClick={() => setClippyHidden(true)}>Hide me</button>
              </div>
            </div>
          </div>
          <div className="xp-clippy-char">📎</div>
        </div>
      )}

      {startOpen && (
        <div className="xp-startmenu window" onClick={(e) => e.stopPropagation()}>
          <div className="xp-startmenu-head">
            <img src="/avatar.png" alt="" />
            <b>Azzam Khalaf</b>
          </div>
          <div className="xp-startmenu-body">
            <button onClick={() => { openWindow("projects"); setStartOpen(false); }}>📁 My Projects</button>
            <button onClick={() => { openWindow("cv"); setStartOpen(false); }}>📄 My CV</button>
            <button onClick={() => { openWindow("elin"); setStartOpen(false); }}>💬 Fråga Elin</button>
            <button onClick={() => { openWindow("contact"); setStartOpen(false); }}>✉️ Contact Me</button>
            <button onClick={() => { openWindow("notepad"); setStartOpen(false); }}>📝 azzam.txt</button>
            <button onClick={() => { openWindow("paint"); setStartOpen(false); }}>🎨 Paint</button>
            <button onClick={() => { openWindow("minesweeper"); setStartOpen(false); }}>💣 Minesweeper</button>
            <a href="https://www.smartartai.se/portfolio" target="_blank" rel="noopener noreferrer">
              <button>🌐 Portfolio hub</button>
            </a>
            <hr />
            <button onClick={onLogOff}>🚪 Log Off</button>
            <button onClick={onShutDown}>⏻ Turn Off Computer</button>
          </div>
        </div>
      )}

      <div className="xp-taskbar">
        <button className="xp-start" onClick={(e) => { e.stopPropagation(); setStartOpen(!startOpen); }}>
          <span className="xp-flag xp-flag-small">
            <i className="f r" /><i className="f g" /><i className="f b" /><i className="f y" />
          </span>
          start
        </button>
        <div className="xp-tasks">
          {wins.map((w) => (
            <button
              key={w.id}
              className={`xp-task ${!w.minimized && w.z === topZ ? "xp-task-active" : ""}`}
              onClick={() => taskbarClick(w.id)}
            >
              <span className="xp-title-icon">{w.icon}</span>
              <span className="xp-task-label">{w.title}</span>
            </button>
          ))}
        </div>
        <div className="xp-tray">
          <Clock />
        </div>
      </div>
    </div>
  );
}
