"use client";

import { useState } from "react";
import Image from "next/image";
import Desktop from "../components/Desktop";
import SoundToggle from "../components/SoundToggle";
import { playPower, playStartup } from "../lib/sounds";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M12 3v9M7.1 6.4a8 8 0 1 0 9.8 0" />
    </svg>
  );
}

function LoginScreen({ onLogin, onCompany, onPowerOff }) {
  return (
    <div className="studio-entry">
      <div className="studio-entry__ambient" aria-hidden="true">
        <span className="studio-entry__orb studio-entry__orb--one" />
        <span className="studio-entry__orb studio-entry__orb--two" />
        <span className="studio-entry__grid" />
        <span className="studio-entry__pixel studio-entry__pixel--one" />
        <span className="studio-entry__pixel studio-entry__pixel--two" />
        <span className="studio-entry__pixel studio-entry__pixel--three" />
      </div>

      <header className="studio-entry__header">
        <div className="studio-entry__brand">
          <img src="/framform-symbol.webp" alt="" />
          <div>
            <strong>FRAMFORM</strong>
            <span>Digitala lösningar, formade runt verkligt arbete.</span>
          </div>
        </div>
        <p>PORTFOLIO &amp; STUDIO</p>
      </header>

      <main className="studio-entry__main">
        <div className="studio-entry__intro">
          <p>VÄLJ DIN INGÅNG</p>
          <h1>En portfolio. Två perspektiv.</h1>
        </div>

        <div className="studio-entry__choices" aria-label="Välj portfolio eller studio">
          <button className="studio-choice studio-choice--azzam" type="button" onClick={onLogin}>
            <span className="studio-choice__media">
              <img src="/azzam-khalaf.webp" alt="Azzam Khalaf" />
              <span className="studio-choice__availability">ÖPPEN</span>
            </span>
            <span className="studio-choice__content">
              <span className="studio-choice__number">01 / PERSONLIG PORTFOLIO</span>
              <strong>Azzam Khalaf</strong>
              <span className="studio-choice__role">Grundare &amp; Creative Lead</span>
              <span className="studio-choice__description">Projekt, erfarenhet och arbetssätt.</span>
              <span className="studio-choice__action">
                Öppna Azzams portfolio <ArrowIcon />
              </span>
            </span>
          </button>

          <button className="studio-choice studio-choice--company" type="button" onClick={onCompany}>
            <span className="studio-choice__media studio-choice__media--company">
              <Image
                src="/framform-logo-full.png"
                alt=""
                width={2048}
                height={2048}
                sizes="(max-width: 600px) 112px, (max-width: 900px) 150px, 210px"
                priority
              />
              <span className="studio-choice__availability">ÖPPEN</span>
            </span>
            <span className="studio-choice__content">
              <span className="studio-choice__number">02 / DIGITAL STUDIO</span>
              <strong>FRAMFORM</strong>
              <span className="studio-choice__role">Digital produktion &amp; automation</span>
              <span className="studio-choice__description">Webb, digitala flöden och ansvarsfull AI.</span>
              <span className="studio-choice__action">Öppna FRAMFORMs arbetsyta <ArrowIcon /></span>
            </span>
          </button>
        </div>
      </main>

      <footer className="studio-entry__footer">
        <div className="studio-entry__footer-actions">
          <button type="button" className="studio-entry__power" onClick={onPowerOff}>
            <PowerIcon />
            <span>Avsluta presentationen</span>
          </button>
          <SoundToggle />
        </div>
        <p>FRAMFORM · Sverige · Webb · System · Automation</p>
      </footer>
    </div>
  );
}

function ShutdownScreen({ onRestart }) {
  return (
    <div className="studio-shutdown">
      <img src="/framform-symbol.webp" alt="" />
      <p className="studio-shutdown__eyebrow">FRAMFORM</p>
      <h1>Presentationen är avslutad.</h1>
      <p>Tack för att du tittade in.</p>
      <button type="button" onClick={() => { playStartup(); onRestart(); }}>Starta igen <ArrowIcon /></button>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState("login");

  if (phase === "login") {
    return (
      <LoginScreen
        onLogin={() => {
          playStartup();
          setPhase("personal");
        }}
        onCompany={() => {
          playStartup();
          setPhase("company");
        }}
        onPowerOff={() => {
          playPower();
          setPhase("off");
        }}
      />
    );
  }

  if (phase === "off") return <ShutdownScreen onRestart={() => setPhase("login")} />;

  if (phase !== "personal" && phase !== "company") return null;

  return (
    <Desktop
      key={phase}
      workspaceId={phase}
      onLogOff={() => setPhase("login")}
      onShutDown={() => setPhase("off")}
    />
  );
}
