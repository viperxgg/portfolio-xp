"use client";

import { useState } from "react";
import Minesweeper from "./Minesweeper";
import Paint from "./Paint";
import { ShellIcon } from "./ShellIcons";

export const PROJECTS = [
  { id: "elinsval", name: "Elins val", preview: "/previews/smartartai.png" },
  { id: "rattvis", name: "Rättvis Demokrati", preview: "/previews/rattvis-demokrati.webp" },
  { id: "rsmh", name: "RSMH Fjällsjö", preview: "/previews/rsmh-fjallsjo.webp" },
  { id: "menu", name: "Premium Menu", preview: "/previews/premium-menu.webp" },
];

function projectsFor(copy) {
  return PROJECTS.map((project) => ({ ...project, ...copy.projects[project.id] }));
}

function ProjectsWindow({ openWindow, copy }) {
  return (
    <div className="xp-folder">
      <p className="xp-folder-hint">{copy.folder.hint}</p>
      <div className="xp-project-grid">
        {projectsFor(copy).map((project) => (
          <button
            key={project.id}
            className="xp-project-card"
            type="button"
            aria-label={`${copy.folder.openLabel}: ${project.name}`}
            aria-haspopup="dialog"
            onClick={(event) => openWindow(`project-${project.id}`, event.currentTarget)}
          >
            <span className="xp-project-card__media">
              <img
                src={project.preview}
                alt={`${project.name} — ${copy.folder.imageAlt}`}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="xp-project-card__body">
              <span className="xp-project-card__title">
                <ShellIcon id={`project-${project.id}`} />
                <strong><bdi dir="auto">{project.name}</bdi></strong>
              </span>
              <span className="xp-project-card__description">{project.desc}</span>
              <span className="xp-project-card__tags" aria-label={copy.folder.scopeLabel}>
                {project.tags.split(" · ").map((tag) => <span key={tag}>{tag}</span>)}
              </span>
              <span className="xp-project-card__open">{copy.folder.openDetails} <span aria-hidden="true">{copy.folder.detailsArrow}</span></span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailWindow({ project, copy }) {
  return (
    <article className="xp-project-detail">
      <div className="xp-project-detail__media">
        <img src={project.preview} alt={`${project.name} — ${copy.imageAlt}`} />
      </div>
      <div className="xp-project-detail__content">
        <header className="xp-project-detail__header">
          <ShellIcon id={`project-${project.id}`} />
          <div>
            <p>{project.category}</p>
            <h2><bdi dir="auto">{project.name}</bdi></h2>
          </div>
        </header>
        <p className="xp-project-detail__lead">{project.desc}</p>
        <section>
          <h3>{copy.roleLabel}</h3>
          <p>{project.role}</p>
        </section>
        <section>
          <h3>{copy.builtLabel}</h3>
          <ul>
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </section>
        <section>
          <h3>{copy.techLabel}</h3>
          <ul className="xp-project-detail__tech">
            {project.tech.map((technology) => <li key={technology}><bdi dir="ltr">{technology}</bdi></li>)}
          </ul>
        </section>
      </div>
    </article>
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
    projects: { title: copy.registry.projects, icon: <ShellIcon id="projects" />, size: { w: 920, h: 700 }, content: <ProjectsWindow openWindow={openWindow} copy={copy} /> },
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
      title: `${project.name} — ${copy.projectDetail.titleSuffix}`,
      icon: <ShellIcon id={`project-${project.id}`} />,
      size: { w: 880, h: 650 },
      content: <ProjectDetailWindow project={project} copy={copy.projectDetail} />,
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
