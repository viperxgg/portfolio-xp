"use client";

import { useState } from "react";
import Minesweeper from "./Minesweeper";
import Paint from "./Paint";
import { ShellIcon } from "./ShellIcons";

export const PROJECTS = [
  {
    id: "elinsval",
    name: "Elins val",
    desc: "Svensk produktguide med 300+ publicerade sidor, ett eget poängsystem och rådgivningsgränssnittet Fråga Elin.",
    tags: "Next.js · React · Supabase · SEO/AEO",
    url: "https://www.smartartai.se",
    caseUrl: "https://framform.se/arbete#elins-val",
    preview: "/previews/smartartai.png",
  },
  {
    id: "rattvis",
    name: "Rättvis Demokrati",
    desc: "Kampanjplattform med visuell identitet, tydlig innehållsstruktur och automatisk kommunbevakning.",
    tags: "Webbdesign · Innehåll · Automation",
    url: "https://rattvisdemokrati.pro",
    caseUrl: "https://framform.se/arbete#rattvis-demokrati",
    preview: "https://framform.se/media/work/rattvis-demokrati.webp",
  },
  {
    id: "rsmh",
    name: "RSMH Fjällsjö",
    desc: "Självservice för rumsbokning och matbeställning, med datumregler och strukturerad överlämning via e-post.",
    tags: "Webbdesign · Bokningslogik · Automation",
    url: "https://www.rsmhfjallsjo.se",
    caseUrl: "https://framform.se/arbete#rsmh-fjallsjo",
    preview: "https://framform.se/media/work/rsmh-fjallsjo.webp",
  },
  {
    id: "menu",
    name: "Premium Menu",
    desc: "Fungerande QR-meny där gäst, servering och kök delar samma orderflöde i realtid.",
    tags: "Produktdesign · Supabase · Realtidsflöde",
    url: "https://premium-menu-8fij.vercel.app",
    caseUrl: "https://framform.se/arbete#premium-menu",
    preview: "https://framform.se/media/work/premium-menu.webp",
  },
];

function ProjectsWindow({ openWindow }) {
  return (
    <div className="xp-folder">
      <p className="xp-folder-hint">4 projekt &mdash; välj ett projekt för att öppna det</p>
      <div className="xp-folder-grid">
        {PROJECTS.map((p) => (
          <button key={p.id} className="xp-file" onClick={() => openWindow(`project-${p.id}`)}>
            <ShellIcon id={`project-${p.id}`} />
            <span>{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectWindow({ project }) {
  return (
    <div className="xp-project">
      <div className="xp-project-bar">
        <span className="xp-address">Adress:</span>
        <span className="xp-address-box">{project.url}</span>
        <a className="xp-btn-link" href={project.url} target="_blank" rel="noopener noreferrer">
          <button>Öppna webbplatsen</button>
        </a>
        <a className="xp-btn-link" href={project.caseUrl} target="_blank" rel="noopener noreferrer">
          <button>Se hela caset</button>
        </a>
      </div>
      <p className="xp-project-desc">
        {project.desc} <em>({project.tags})</em>
      </p>
      {project.preview ? (
        <a className="xp-preview" href={project.url} target="_blank" rel="noopener noreferrer">
          <img src={project.preview} alt={`${project.name} — förhandsvisning`} />
          <span className="xp-preview-btn">
            <button>Öppna den publicerade webbplatsen &rarr;</button>
          </span>
        </a>
      ) : (
        <iframe src={project.url} title={project.name} className="xp-iframe" />
      )}
    </div>
  );
}

function AboutWindow() {
  return (
    <div className="xp-about">
      <img src="/azzam-khalaf.webp" alt="Azzam Khalaf" className="xp-about-photo" />
      <div>
        <h3>Azzam Khalaf</h3>
        <p className="xp-about-role">Grundare &amp; Creative Lead på FRAMFORM &mdash; Strömsund, Sverige</p>
        <p>
          Jag formar webbplatser, digitala system och automatiserade flöden runt verkliga behov. Arbetet
          går från analys och struktur till design, utveckling, test och en tydlig överlämning.
        </p>
        <ul>
          <li><b>Teknik:</b> Next.js / React, JavaScript, Supabase och Vercel</li>
          <li><b>Levererar:</b> webbplatser, bokningsflöden, självservice och praktisk automation</li>
          <li><b>Språk:</b> arabiska, svenska och engelska</li>
        </ul>
        <p>
          <a href="https://framform.se/studio" target="_blank" rel="noopener noreferrer">
            Läs mer om FRAMFORM och studion
          </a>
        </p>
      </div>
    </div>
  );
}

const CV_FILES = {
  sv: {
    label: "Svenska",
    src: "/Azzam-Khalaf-CV-FRAMFORM-SV.pdf",
    download: "Azzam-Khalaf-CV-FRAMFORM-SV.pdf",
    title: "Azzam Khalafs CV på svenska",
    status: "Visar den svenska versionen",
  },
  en: {
    label: "English",
    src: "/Azzam-Khalaf-CV-FRAMFORM-EN.pdf",
    download: "Azzam-Khalaf-CV-FRAMFORM-EN.pdf",
    title: "Azzam Khalaf's CV in English",
    status: "Showing the English version",
  },
};

function CVWindow() {
  const [language, setLanguage] = useState("sv");
  const selectedCV = CV_FILES[language];

  return (
    <div className="xp-cv">
      <div className="xp-project-bar xp-cv-bar">
        <div className="xp-cv-languages" role="group" aria-label="Välj CV-språk">
          {Object.entries(CV_FILES).map(([code, cv]) => (
            <button
              key={code}
              type="button"
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
            >
              {cv.label}
            </button>
          ))}
        </div>
        <a className="xp-cv-action" href={selectedCV.src} target="_blank" rel="noopener noreferrer">
          Öppna i ny flik
        </a>
        <a className="xp-cv-action" href={selectedCV.src} download={selectedCV.download}>
          Ladda ner
        </a>
      </div>
      <p className="xp-cv-status" aria-live="polite">{selectedCV.status}</p>
      <iframe key={language} src={selectedCV.src} title={selectedCV.title} className="xp-iframe" />
    </div>
  );
}

function FramformWindow() {
  return (
    <div className="xp-framform">
      <div className="xp-framform-header">
        <b>FRAMFORM hjälper dig att reda ut nästa steg</b> &mdash; <i>kort och tydligt</i>
      </div>
      <div className="xp-chatlog">
        <div className="xp-msg xp-msg-user">Vi behöver en bättre bokningslösning. Var börjar vi?</div>
        <div className="xp-msg xp-msg-framform">
          Börja med det verkliga arbetsflödet: vem bokar, vad ska bekräftas och vilken information behöver personalen se?
        </div>
        <div className="xp-msg xp-msg-user">Måste vi bygga allt från början?</div>
        <div className="xp-msg xp-msg-framform">
          Inte alltid. Först kartlägger vi vad som redan fungerar och bygger bara det som faktiskt saknas.
        </div>
      </div>
      <a className="xp-btn-link xp-framform-cta" href="https://framform.se/starta-projekt?mode=guide" target="_blank" rel="noopener noreferrer">
        <button>Starta projektguiden &rarr;</button>
      </a>
      <p className="xp-framform-note">
        Detta är en exempelkonversation. Projektguiden hjälper dig att formulera behovet inför en riktig genomgång.
      </p>
    </div>
  );
}

function ContactWindow() {
  return (
    <div className="xp-contact">
      <p>Har du ett projekt, ett problem eller en idé som behöver få form? Hör gärna av dig.</p>
      <div className="field-row-stacked">
        <label>E-post</label>
        <a href="mailto:hello@framform.se">hello@framform.se</a>
      </div>
      <div className="field-row-stacked">
        <label>Utvalda projekt</label>
        <a href="https://framform.se/arbete" target="_blank" rel="noopener noreferrer">
          framform.se/arbete
        </a>
      </div>
      <div className="field-row-stacked">
        <label>Plats</label>
        <span>Strömsund, Sverige &mdash; arbetar digitalt i hela landet</span>
      </div>
      <a className="xp-btn-link" href="mailto:hello@framform.se">
        <button>Skicka e-post</button>
      </a>
    </div>
  );
}

function NotepadWindow() {
  const story = `azzam.txt
────────────────────────────

Hej, jag heter Azzam. 👋

Min väg till FRAMFORM började långt före den första
webbplatsen. Åren inom försäljning lärde mig att lyssna
efter vad människor faktiskt behöver — inte bara vad
som är enklast att sälja.

Efter flytten till norra Sverige kom ett nytt språk,
ett nytt sammanhang och så småningom ett nytt hantverk:
att forma digitala lösningar som fungerar i vardagen.

Jag grundade FRAMFORM för att samla det arbetet:
  • webbplatser med tydlig struktur och egen identitet
  • bokning, beställning och självservice
  • automatiserade flöden med mänsklig kontroll
  • prototyper som går att använda, testa och förbättra

AI är ett arbetsverktyg under mänsklig ledning — inte
en ersättning för analys, omdöme eller ansvar.

Den här arbetsytan är också ett FRAMFORM-projekt:
en interaktiv portfolio byggd i Next.js för att visa
både resultatet och sättet jag tänker på.

Form för idéer. System för verkligheten.

— Azzam
hello@framform.se`;
  return (
    <div className="xp-notepad">
      <textarea defaultValue={story} spellCheck={false} />
    </div>
  );
}

function RecycleWindow() {
  return (
    <div className="xp-recycle">
      <p className="xp-folder-hint">3 objects &mdash; things I threw away</p>
      <ul>
        <li>&ldquo;Under construction&rdquo; GIFs (1998&ndash;2003)</li>
        <li>A career selling phones in Dubai</li>
        <li>Every design with boxes inside boxes inside boxes</li>
      </ul>
      <p className="xp-recycle-note">Some things are better left deleted.</p>
    </div>
  );
}

export function buildRegistry(openWindow) {
  const reg = {
    projects: {
      title: "My Projects",
      icon: <ShellIcon id="projects" />,
      size: { w: 560, h: 420 },
      content: <ProjectsWindow openWindow={openWindow} />,
    },
    about: {
      title: "My Computer — About Azzam",
      icon: <ShellIcon id="about" />,
      size: { w: 620, h: 460 },
      content: <AboutWindow />,
    },
    cv: {
      title: "My CV",
      icon: <ShellIcon id="cv" />,
      size: { w: 760, h: 620 },
      content: <CVWindow />,
    },
    framform: {
      title: "Guide — Fråga FRAMFORM",
      icon: <ShellIcon id="framform" />,
      size: { w: 480, h: 640 },
      content: <FramformWindow />,
    },
    contact: {
      title: "Contact Me",
      icon: <ShellIcon id="contact" />,
      size: { w: 460, h: 400 },
      content: <ContactWindow />,
    },
    recycle: {
      title: "Recycle Bin",
      icon: <ShellIcon id="recycle" />,
      size: { w: 460, h: 340 },
      content: <RecycleWindow />,
    },
    minesweeper: {
      title: "Minesweeper",
      icon: <ShellIcon id="minesweeper" />,
      size: { w: 330, h: 470 },
      content: <Minesweeper />,
    },
    notepad: {
      title: "azzam.txt — Notepad",
      icon: <ShellIcon id="notepad" />,
      size: { w: 500, h: 520 },
      content: <NotepadWindow />,
    },
    paint: {
      title: "untitled — Paint",
      icon: <ShellIcon id="paint" />,
      size: { w: 680, h: 560 },
      content: <Paint />,
    },
  };
  for (const p of PROJECTS) {
    reg[`project-${p.id}`] = {
      title: `${p.name} — Internet Explorer`,
      icon: <ShellIcon id={`project-${p.id}`} />,
      size: { w: 900, h: 640 },
      content: <ProjectWindow project={p} />,
    };
  }
  return reg;
}

export const DESKTOP_ICONS = [
  { id: "about", label: "My Computer" },
  { id: "projects", label: "My Projects" },
  { id: "cv", label: "My CV" },
  { id: "framform", label: "Fråga FRAMFORM" },
  { id: "notepad", label: "azzam.txt" },
  { id: "paint", label: "Paint" },
  { id: "minesweeper", label: "Minesweeper" },
  { id: "contact", label: "Contact Me" },
  { id: "recycle", label: "Recycle Bin" },
];
