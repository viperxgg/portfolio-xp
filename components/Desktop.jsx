"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Window from "./Window";
import SoundToggle from "./SoundToggle";
import { buildRegistry, DESKTOP_ICONS } from "./contents";
import { buildCompanyRegistry, COMPANY_ICONS } from "./company-contents";
import { ArrowIcon, GuideMark, MenuMark, PowerIcon, ShellIcon } from "./ShellIcons";
import {
  playClose,
  playMenuClose,
  playMenuOpen,
  playMinimize,
  playOpen,
  playPower,
  playRestore,
  playSelect,
} from "../lib/sounds";

const PERSONAL_TIPS = [
  "Hej! Jag är Formvän. Öppna My Projects för att se vad Azzam har byggt.",
  "Öppna Fråga FRAMFORM för hjälp att formulera ett projekt.",
  "Du kan flytta fönstren och ordna arbetsytan precis som du vill.",
  "Nyfiken på ett samarbete? My CV och Contact Me hjälper dig vidare.",
];

const COMPANY_TIPS = [
  "Hej! Börja med Om FRAMFORM för en snabb överblick av studion.",
  "Öppna Flödeslabbet för att prova en lokal simulering utan att skicka data.",
  "Utvalda arbeten visar skillnaden mellan kundprojekt, egna projekt och koncept.",
  "Formpussel 15 blandar klassisk spelkänsla med FRAMFORMs nya arbetsyta.",
  "När du är redo öppnar Starta projekt ett riktigt underlag på framform.se.",
];

function Clock() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 20000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return <span className="xp-clock" aria-hidden="true">--:--</span>;

  return (
    <time
      className="xp-clock"
      dateTime={now.toISOString()}
      aria-label={now.toLocaleString("sv-SE", { dateStyle: "long", timeStyle: "short" })}
    >
      {now.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}
    </time>
  );
}

export default function Desktop({ workspaceId = "personal", onLogOff, onShutDown }) {
  const isCompany = workspaceId === "company";
  const desktopIcons = isCompany ? COMPANY_ICONS : DESKTOP_ICONS;
  const registryBuilder = isCompany ? buildCompanyRegistry : buildRegistry;
  const studioTips = isCompany ? COMPANY_TIPS : PERSONAL_TIPS;
  const [wins, setWins] = useState([]);
  const [startOpen, setStartOpen] = useState(false);
  const [guideTip, setGuideTip] = useState(0);
  const [guideOpen, setGuideOpen] = useState(!isCompany);
  const [isMobile, setIsMobile] = useState(false);
  const zRef = useRef(10);
  const spawnRef = useRef(0);
  const startButtonRef = useRef(null);
  const launcherRef = useRef(null);
  const focusTargetsRef = useRef(new Map());

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!startOpen) return;
    launcherRef.current?.querySelector("button, a")?.focus();
  }, [startOpen]);

  const openWindow = useCallback((id, sourceElement) => {
    playOpen();
    setGuideOpen(false);
    focusTargetsRef.current.set(id, sourceElement || document.activeElement);
    setWins((prev) => {
      const existing = prev.find((windowItem) => windowItem.id === id);
      zRef.current += 1;
      if (existing) {
        return prev.map((windowItem) => (
          windowItem.id === id
            ? { ...windowItem, minimized: false, z: zRef.current }
            : windowItem
        ));
      }
      const registry = registryBuilder(openWindow);
      const definition = registry[id];
      if (!definition) return prev;
      spawnRef.current += 1;
      const offset = (spawnRef.current % 6) * 28;
      const maxWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      const width = Math.min(definition.size.w, maxWidth - 40);
      return [
        ...prev,
        {
          id,
          title: definition.title,
          icon: definition.icon,
          content: definition.content,
          size: { w: width, h: definition.size.h },
          pos: { x: Math.max(10, 90 + offset), y: Math.max(6, 40 + offset) },
          minimized: false,
          maximized: false,
          z: zRef.current,
        },
      ];
    });
    window.setTimeout(() => document.querySelector(`[data-window-id="${id}"]`)?.focus(), 0);
  }, [registryBuilder]);

  const closeWindow = (id) => {
    const focusTarget = focusTargetsRef.current.get(id);
    playClose();
    setWins((previous) => previous.filter((windowItem) => windowItem.id !== id));
    focusTargetsRef.current.delete(id);
    if (focusTarget?.isConnected) focusTarget.focus();
  };

  const minimizeWindow = (id) => {
    playMinimize();
    setWins((previous) => previous.map((windowItem) => (
      windowItem.id === id ? { ...windowItem, minimized: true } : windowItem
    )));
    document.querySelector(`[data-task-id="${id}"]`)?.focus();
  };

  const maximizeWindow = (id) => {
    playRestore();
    setWins((previous) => previous.map((windowItem) => (
      windowItem.id === id ? { ...windowItem, maximized: !windowItem.maximized } : windowItem
    )));
  };

  const focusWindow = (id) => {
    zRef.current += 1;
    setWins((previous) => previous.map((windowItem) => (
      windowItem.id === id ? { ...windowItem, z: zRef.current } : windowItem
    )));
  };

  const moveWindow = (id, pos) => setWins((previous) => previous.map((windowItem) => (
    windowItem.id === id ? { ...windowItem, pos } : windowItem
  )));

  const taskbarClick = (id) => {
    const selectedWindow = wins.find((windowItem) => windowItem.id === id);
    if (!selectedWindow) return;
    if (selectedWindow.minimized) {
      playRestore();
      zRef.current += 1;
      setWins((previous) => previous.map((windowItem) => (
        windowItem.id === id
          ? { ...windowItem, minimized: false, z: zRef.current }
          : windowItem
      )));
      return;
    }
    minimizeWindow(id);
  };

  const openFromLauncher = (id) => {
    openWindow(id, startButtonRef.current);
    setStartOpen(false);
  };

  const topZ = useMemo(
    () => Math.max(0, ...wins.filter((windowItem) => !windowItem.minimized).map((windowItem) => windowItem.z)),
    [wins]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (startOpen) {
        playMenuClose();
        setStartOpen(false);
        startButtonRef.current?.focus();
        return;
      }
      const topWindow = wins.find((windowItem) => !windowItem.minimized && windowItem.z === topZ);
      if (!topWindow) return;
      const focusTarget = focusTargetsRef.current.get(topWindow.id);
      playClose();
      setWins((previous) => previous.filter((windowItem) => windowItem.id !== topWindow.id));
      focusTargetsRef.current.delete(topWindow.id);
      if (focusTarget?.isConnected) focusTarget.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [startOpen, topZ, wins]);

  return (
    <main
      className={`xp-desktop${isCompany ? " company-workspace" : ""}`}
      onClick={() => {
        if (!startOpen) return;
        playMenuClose();
        setStartOpen(false);
      }}
    >
      <div className="xp-wallpaper" aria-hidden="true">
        <div className="studio-wallpaper-grid" />
        <div className="studio-wallpaper-fold studio-wallpaper-fold--one" />
        <div className="studio-wallpaper-fold studio-wallpaper-fold--two" />
        <div className="studio-wallpaper-brand">
          <Image
            src={isCompany ? "/framform-logo-full.png" : "/framform-symbol.webp"}
            alt=""
            width={isCompany ? 2048 : 512}
            height={isCompany ? 2048 : 512}
            sizes={isCompany ? "108px" : "48px"}
          />
          <span>
            <strong>FRAMFORM</strong>
            <small>{isCompany ? "Studio workspace" : "Creative workspace"}</small>
          </span>
        </div>
        <div className="studio-wallpaper-message">
          <span>{isCompany ? "STUDIO · ARBETE · FLÖDEN" : "WEBB · SYSTEM · AUTOMATION"}</span>
          <strong>{isCompany ? <>Webb, system och flöden.<br />Formade runt verkligt arbete.</> : <>Form för idéer.<br />System för verkligheten.</>}</strong>
        </div>
      </div>

      {isCompany && (
        <aside className="company-founder-card" aria-label="Azzam Khalaf, VD och grundare">
          <Image src="/azzam-khalaf.webp" alt="Azzam Khalaf" width={320} height={400} sizes="64px" />
          <span><small>FRAMFORM LEDS AV</small><strong>Azzam Khalaf</strong><em>VD &amp; grundare</em></span>
        </aside>
      )}

      <nav className="xp-icons" aria-label="Skrivbordsgenvägar">
        {desktopIcons.map(({ id, label }) => (
          <button
            key={id}
            data-app-id={id}
            type="button"
            className="xp-desktop-icon"
            onClick={(event) => openWindow(id, event.currentTarget)}
            aria-label={`Öppna ${label}`}
          >
            <span className="xp-desktop-icon__art"><ShellIcon id={id} /></span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {wins.map((windowItem) => (
        <Window
          key={windowItem.id}
          win={windowItem}
          focused={windowItem.z === topZ}
          isMobile={isMobile}
          onFocus={focusWindow}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onMove={moveWindow}
        />
      ))}

      <aside
        className={`studio-guide ${guideOpen ? "studio-guide--open" : ""} ${wins.some((windowItem) => !windowItem.minimized) ? "studio-guide--window-open" : ""}`}
        aria-label="Formvän, guide"
      >
        {guideOpen && (
          <div className="studio-guide__bubble">
            <p aria-live="polite">{studioTips[guideTip]}</p>
            <div className="studio-guide__actions">
              <button type="button" onClick={() => { playSelect(); setGuideTip((guideTip + 1) % studioTips.length); }}>
                Nästa tips <ArrowIcon />
              </button>
              <button type="button" onClick={() => { playMenuClose(); setGuideOpen(false); }}>Dölj</button>
            </div>
          </div>
        )}
        <button
          type="button"
          className="studio-guide__avatar"
          aria-label={guideOpen ? "Stäng Formvän" : "Öppna Formvän"}
          aria-expanded={guideOpen}
          onClick={(event) => {
            event.stopPropagation();
            if (guideOpen) playMenuClose(); else playMenuOpen();
            setGuideOpen((isOpen) => !isOpen);
            setStartOpen(false);
          }}
        >
          <GuideMark />
          <span aria-hidden="true" />
        </button>
      </aside>

      {startOpen && (
        <section
          ref={launcherRef}
          id="studio-launcher"
          className="xp-startmenu"
          role="dialog"
          aria-label="FRAMFORM-meny"
          onClick={(event) => event.stopPropagation()}
        >
          <header className="xp-startmenu-head">
            <img src={isCompany ? "/framform-symbol.webp" : "/azzam-khalaf.webp"} alt="" />
            <div>
              <strong>{isCompany ? "FRAMFORM" : "Azzam Khalaf"}</strong>
              <span>{isCompany ? "Webb · system · automation" : "Grundare & Creative Lead"}</span>
            </div>
            <img className="xp-startmenu-brand" src="/framform-symbol.webp" alt="" />
          </header>

          <div className="xp-startmenu-body">
            <p className="xp-startmenu-label">Arbetsyta</p>
            <div className="xp-startmenu-grid">
              {(isCompany ? desktopIcons : desktopIcons.slice(0, 8)).map(({ id, label }) => (
                <button key={id} type="button" onClick={() => openFromLauncher(id)}>
                  <ShellIcon id={id} />
                  <span>{label}</span>
                  <ArrowIcon />
                </button>
              ))}
            </div>

            <a
              className="xp-startmenu-link"
              href={isCompany ? "https://framform.se" : "https://framform.se/arbete"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playSelect}
            >
              <ShellIcon id={isCompany ? "company-about" : "projects"} />
              <span>{isCompany ? "Öppna framform.se" : "Portfolio hub"}</span>
              <ArrowIcon />
            </a>
          </div>

          <footer className="xp-startmenu-footer">
            <button type="button" onClick={() => { playSelect(); onLogOff(); }}>Tillbaka till valet</button>
            <button type="button" onClick={() => { playPower(); onShutDown(); }}><PowerIcon /> Avsluta presentationen</button>
          </footer>
        </section>
      )}

      <footer className="xp-taskbar" aria-label="Aktiva fönster">
        <button
          ref={startButtonRef}
          type="button"
          className="xp-start"
          aria-haspopup="dialog"
          aria-expanded={startOpen}
          aria-controls="studio-launcher"
          onClick={(event) => {
            event.stopPropagation();
            if (startOpen) playMenuClose(); else playMenuOpen();
            setStartOpen((isOpen) => !isOpen);
            setGuideOpen(false);
          }}
        >
          <MenuMark />
          <span>Meny</span>
        </button>

        <div className="xp-tasks">
          {wins.map((windowItem) => {
            const isActive = !windowItem.minimized && windowItem.z === topZ;
            return (
              <button
                key={windowItem.id}
                type="button"
                className={`xp-task ${isActive ? "xp-task-active" : ""}`}
                data-task-id={windowItem.id}
                onClick={() => taskbarClick(windowItem.id)}
                aria-pressed={isActive}
                aria-label={`${windowItem.title}${windowItem.minimized ? ", minimerat" : isActive ? ", aktivt" : ""}`}
              >
                <ShellIcon id={windowItem.id} />
                <span className="xp-task-label">{windowItem.title}</span>
              </button>
            );
          })}
        </div>

        <div className="xp-tray">
          <SoundToggle compact />
          <span className="xp-tray-brand">FRAMFORM</span>
          <Clock />
        </div>
      </footer>
    </main>
  );
}
