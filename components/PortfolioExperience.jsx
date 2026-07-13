"use client";

import { useState } from "react";
import Image from "next/image";
import Desktop from "./Desktop";
import LanguageSwitcher from "./LanguageSwitcher";
import SoundToggle from "./SoundToggle";
import { LOCALE_DETAILS } from "../lib/i18n/config";
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

function LoginScreen({ locale, dictionary, onLogin, onCompany, onPowerOff }) {
  const copy = dictionary.entry;

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
            <span>{copy.brandTagline}</span>
          </div>
        </div>
        <p>{copy.headerLabel}</p>
      </header>

      <main className="studio-entry__main">
        <div className="studio-entry__intro">
          <p>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
        </div>

        <div className="studio-entry__choices" aria-label={copy.choicesLabel}>
          <button className="studio-choice studio-choice--azzam" type="button" onClick={onLogin}>
            <span className="studio-choice__media">
              <img src="/azzam-khalaf.webp" alt="Azzam Khalaf" />
              <span className="studio-choice__availability">{copy.open}</span>
            </span>
            <span className="studio-choice__content">
              <span className="studio-choice__number">{copy.personal.number}</span>
              <strong>Azzam Khalaf</strong>
              <span className="studio-choice__role">{copy.personal.role}</span>
              <span className="studio-choice__description">{copy.personal.description}</span>
              <span className="studio-choice__action">
                {copy.personal.action} <ArrowIcon />
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
              <span className="studio-choice__availability">{copy.open}</span>
            </span>
            <span className="studio-choice__content">
              <span className="studio-choice__number">{copy.company.number}</span>
              <strong>FRAMFORM</strong>
              <span className="studio-choice__role">{copy.company.role}</span>
              <span className="studio-choice__description">{copy.company.description}</span>
              <span className="studio-choice__action">{copy.company.action} <ArrowIcon /></span>
            </span>
          </button>
        </div>
      </main>

      <footer className="studio-entry__footer">
        <div className="studio-entry__footer-actions">
          <button type="button" className="studio-entry__power" onClick={onPowerOff}>
            <PowerIcon />
            <span>{copy.power}</span>
          </button>
          <SoundToggle locale={locale} dictionary={dictionary} copy={dictionary.sound} />
        </div>
        <p>{copy.footer}</p>
      </footer>
    </div>
  );
}

function ShutdownScreen({ dictionary, onRestart }) {
  const copy = dictionary.entry;

  return (
    <div className="studio-shutdown">
      <img src="/framform-symbol.webp" alt="" />
      <p className="studio-shutdown__eyebrow">FRAMFORM</p>
      <h1>{copy.shutdownTitle}</h1>
      <p>{copy.shutdownText}</p>
      <button type="button" onClick={() => { playStartup(); onRestart(); }}>
        {copy.restart} <ArrowIcon />
      </button>
    </div>
  );
}

export default function PortfolioExperience({ locale, dictionary, initialPhase = "login" }) {
  const [phase, setPhase] = useState(initialPhase);

  let experience = null;

  if (phase === "login") {
    experience = (
      <LoginScreen
        locale={locale}
        dictionary={dictionary}
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
  } else if (phase === "off") {
    experience = <ShutdownScreen dictionary={dictionary} onRestart={() => setPhase("login")} />;
  } else if (phase === "personal" || phase === "company") {
    experience = (
      <Desktop
        key={phase}
        workspaceId={phase}
        locale={locale}
        dictionary={dictionary}
        localeDetails={LOCALE_DETAILS[locale]}
        onLogOff={() => setPhase("login")}
        onShutDown={() => setPhase("off")}
      />
    );
  }

  return (
    <>
      {(phase === "login" || phase === "off") && (
        <LanguageSwitcher locale={locale} dictionary={dictionary} view={phase} />
      )}
      {experience}
    </>
  );
}
