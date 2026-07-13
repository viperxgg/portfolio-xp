"use client";

import { useState } from "react";
import Minesweeper from "./Minesweeper";
import Paint from "./Paint";
import { ShellIcon } from "./ShellIcons";

export const PROJECTS = [
  { id: "elinsval", name: "Elins val", url: "https://www.smartartai.se", caseUrl: "https://framform.se/arbete#elins-val", preview: "/previews/smartartai.png" },
  { id: "rattvis", name: "Rättvis Demokrati", url: "https://rattvisdemokrati.pro", caseUrl: "https://framform.se/arbete#rattvis-demokrati", preview: "https://framform.se/media/work/rattvis-demokrati.webp" },
  { id: "rsmh", name: "RSMH Fjällsjö", url: "https://www.rsmhfjallsjo.se", caseUrl: "https://framform.se/arbete#rsmh-fjallsjo", preview: "https://framform.se/media/work/rsmh-fjallsjo.webp" },
  { id: "menu", name: "Premium Menu", url: "https://premium-menu-8fij.vercel.app", caseUrl: "https://framform.se/arbete#premium-menu", preview: "https://framform.se/media/work/premium-menu.webp" },
];

function projectsFor(copy) {
  return PROJECTS.map((project) => ({ ...project, ...copy.projects[project.id] }));
}

function ProjectsWindow({ openWindow, copy }) {
  return (
    <div className="xp-folder">
      <p className="xp-folder-hint">{copy.folder.hint}</p>
      <div className="xp-folder-grid">
        {projectsFor(copy).map((project) => (
          <button key={project.id} className="xp-file" type="button" onClick={() => openWindow(`project-${project.id}`)}>
            <ShellIcon id={`project-${project.id}`} />
            <span>{project.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectWindow({ project, copy }) {
  return (
    <div className="xp-project">
      <div className="xp-project-bar">
        <span className="xp-address">{copy.address}</span>
        <bdi className="xp-address-box" dir="ltr">{project.url}</bdi>
        <a className="xp-btn-link xp-button-anchor" href={project.url} target="_blank" rel="noopener noreferrer">{copy.openWebsite}</a>
        <a className="xp-btn-link xp-button-anchor" href={project.caseUrl} target="_blank" rel="noopener noreferrer">{copy.viewCase}</a>
      </div>
      <p className="xp-project-desc">{project.desc} <em dir="auto">({project.tags})</em></p>
      <a className="xp-preview" href={project.url} target="_blank" rel="noopener noreferrer">
        <img src={project.preview} alt={`${project.name} — ${copy.previewAlt}`} />
        <span className="xp-preview-btn xp-button-anchor">{copy.openPublished} <span aria-hidden="true">→</span></span>
      </a>
    </div>
  );
}

function AboutWindow({ copy }) {
  return (
    <div className="xp-about">
      <img src="/azzam-khalaf.webp" alt="Azzam Khalaf" className="xp-about-photo" />
      <div>
        <h3><bdi dir="ltr">Azzam Khalaf</bdi></h3>
        <p className="xp-about-role">{copy.role}</p>
        <p>{copy.intro}</p>
        <ul>
          <li><b>{copy.techLabel}</b> <bdi dir="ltr">{copy.tech}</bdi></li>
          <li><b>{copy.deliversLabel}</b> {copy.delivers}</li>
          <li><b>{copy.languagesLabel}</b> {copy.languages}</li>
        </ul>
        <p><a href="https://framform.se/studio" target="_blank" rel="noopener noreferrer">{copy.link}</a></p>
      </div>
    </div>
  );
}

const CV_FILES = {
  sv: { src: "/Azzam-Khalaf-CV-FRAMFORM-SV.pdf", download: "Azzam-Khalaf-CV-FRAMFORM-SV.pdf" },
  en: { src: "/Azzam-Khalaf-CV-FRAMFORM-EN.pdf", download: "Azzam-Khalaf-CV-FRAMFORM-EN.pdf" },
  ar: { src: "/Azzam-Khalaf-CV-FRAMFORM-AR.pdf", download: "Azzam-Khalaf-CV-FRAMFORM-AR.pdf" },
};

function CVWindow({ copy, locale }) {
  const [language, setLanguage] = useState(CV_FILES[locale] ? locale : "en");
  const selected = { ...CV_FILES[language], ...copy.files[language] };

  return (
    <div className="xp-cv">
      <div className="xp-project-bar xp-cv-bar">
        <div className="xp-cv-languages" role="group" aria-label={copy.languageLabel}>
          {Object.entries(CV_FILES).map(([code]) => (
            <button key={code} type="button" lang={code} aria-pressed={language === code} onClick={() => setLanguage(code)}>
              {copy.files[code].label}
            </button>
          ))}
        </div>
        <a className="xp-cv-action" href={selected.src} target="_blank" rel="noopener noreferrer">{copy.open}</a>
        <a className="xp-cv-action" href={selected.src} download={selected.download}>{copy.download}</a>
      </div>
      {copy.availabilityNote && <p className="xp-cv-note">{copy.availabilityNote}</p>}
      <p className="xp-cv-status" aria-live="polite">{selected.status}</p>
      <iframe key={language} src={selected.src} title={selected.title} className="xp-iframe" />
    </div>
  );
}

function FramformWindow({ copy }) {
  return (
    <div className="xp-framform">
      <div className="xp-framform-header"><b>{copy.header}</b> — <i>{copy.qualifier}</i></div>
      <div className="xp-chatlog">
        <div className="xp-msg xp-msg-user">{copy.user1}</div>
        <div className="xp-msg xp-msg-framform">{copy.reply1}</div>
        <div className="xp-msg xp-msg-user">{copy.user2}</div>
        <div className="xp-msg xp-msg-framform">{copy.reply2}</div>
      </div>
      <a className="xp-btn-link xp-framform-cta xp-button-anchor" href="https://framform.se/starta-projekt?mode=guide" target="_blank" rel="noopener noreferrer">
        {copy.cta} <span aria-hidden="true">→</span>
      </a>
      {copy.externalNote && <p className="xp-external-language-note">{copy.externalNote}</p>}
      <p className="xp-framform-note">{copy.note}</p>
    </div>
  );
}

function ContactWindow({ copy }) {
  return (
    <div className="xp-contact">
      <p>{copy.intro}</p>
      <div className="field-row-stacked"><label>{copy.email}</label><a href="mailto:hello@framform.se"><bdi dir="ltr">hello@framform.se</bdi></a></div>
      <div className="field-row-stacked"><label>{copy.projects}</label><a href="https://framform.se/arbete" target="_blank" rel="noopener noreferrer"><bdi dir="ltr">framform.se/arbete</bdi></a></div>
      <div className="field-row-stacked"><label>{copy.location}</label><span>{copy.locationText}</span></div>
      <a className="xp-btn-link xp-button-anchor" href="mailto:hello@framform.se">{copy.send}</a>
    </div>
  );
}

function NotepadWindow({ copy, label }) {
  return <div className="xp-notepad"><textarea aria-label={label} defaultValue={copy} spellCheck={false} /></div>;
}

function RecycleWindow({ copy }) {
  return (
    <div className="xp-recycle">
      <p className="xp-folder-hint">{copy.hint}</p>
      <ul>{copy.items.map((item) => <li key={item}>{item}</li>)}</ul>
      <p className="xp-recycle-note">{copy.note}</p>
    </div>
  );
}

export function buildRegistry(openWindow, dictionary, locale) {
  const copy = dictionary.personal;
  const games = dictionary.games;
  const reg = {
    projects: { title: copy.registry.projects, icon: <ShellIcon id="projects" />, size: { w: 560, h: 420 }, content: <ProjectsWindow openWindow={openWindow} copy={copy} /> },
    about: { title: copy.registry.about, icon: <ShellIcon id="about" />, size: { w: 620, h: 460 }, content: <AboutWindow copy={copy.about} /> },
    cv: { title: copy.registry.cv, icon: <ShellIcon id="cv" />, size: { w: 760, h: 620 }, content: <CVWindow copy={copy.cv} locale={locale} /> },
    framform: { title: copy.registry.guide, icon: <ShellIcon id="framform" />, size: { w: 480, h: 640 }, content: <FramformWindow copy={copy.guide} /> },
    contact: { title: copy.registry.contact, icon: <ShellIcon id="contact" />, size: { w: 460, h: 400 }, content: <ContactWindow copy={copy.contact} /> },
    recycle: { title: copy.registry.recycle, icon: <ShellIcon id="recycle" />, size: { w: 460, h: 340 }, content: <RecycleWindow copy={copy.recycle} /> },
    minesweeper: { title: copy.registry.minesweeper, icon: <ShellIcon id="minesweeper" />, size: { w: 330, h: 470 }, content: <Minesweeper copy={games.minesweeper} /> },
    notepad: { title: copy.registry.notepad, icon: <ShellIcon id="notepad" />, size: { w: 500, h: 520 }, content: <NotepadWindow copy={copy.notepad} label={copy.registry.notepad} /> },
    paint: { title: copy.registry.paint, icon: <ShellIcon id="paint" />, size: { w: 680, h: 560 }, content: <Paint copy={games.paint} /> },
  };

  for (const project of projectsFor(copy)) {
    reg[`project-${project.id}`] = {
      title: `${project.name} — ${copy.registry.browserSuffix}`,
      icon: <ShellIcon id={`project-${project.id}`} />,
      size: { w: 900, h: 640 },
      content: <ProjectWindow project={project} copy={copy.project} />,
    };
  }
  return reg;
}

export function getDesktopIcons(dictionary) {
  const icons = dictionary.personal.icons;
  return [
    { id: "about", label: icons.about }, { id: "projects", label: icons.projects }, { id: "cv", label: icons.cv },
    { id: "framform", label: icons.guide }, { id: "notepad", label: icons.notepad }, { id: "paint", label: icons.paint },
    { id: "minesweeper", label: icons.minesweeper }, { id: "contact", label: icons.contact }, { id: "recycle", label: icons.recycle },
  ];
}
