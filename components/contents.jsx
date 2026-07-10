"use client";

import { FolderIcon, ComputerIcon, DocIcon, GlobeIcon, ChatIcon, MailIcon, BinIcon, CVIcon } from "./Icons";

export const PROJECTS = [
  {
    id: "smartartai",
    name: "smartartai.se",
    desc: "Product guide with 300+ pages, a data-driven rating system and the AI advisor “Fråga Elin” (Claude API: streaming, tool calls, guardrails).",
    tags: "Next.js · React · Supabase · Claude API · SEO/AEO",
    url: "https://www.smartartai.se",
    pdf: "https://www.smartartai.se/portfolio/smartartai-se.pdf",
    preview: "/previews/smartartai.png",
  },
  {
    id: "rattvis",
    name: "Rättvis Demokrati",
    desc: "Complete political campaign site — from idea to live on its own domain in under six hours.",
    tags: "HTML/CSS · GitHub Pages · Design · Content",
    url: "https://rattvisdemokrati.pro",
    pdf: "https://www.smartartai.se/portfolio/rattvis-demokrati.pdf",
  },
  {
    id: "rsmh",
    name: "RSMH Fjällsjö",
    desc: "Room booking + food ordering with availability/date logic. Bookings land straight in the organisation's inbox — no accounts, no admin.",
    tags: "Vercel · Forms → email · Booking logic",
    url: "https://www.rsmhfjallsjo.se",
    pdf: "https://www.smartartai.se/portfolio/rsmh-fjallsjo.pdf",
  },
  {
    id: "menu",
    name: "Premium Menu",
    desc: "Digital QR menu for restaurants: guests order from their phone, staff & kitchen see orders in a real-time panel.",
    tags: "Vite · JavaScript · Supabase realtime",
    url: "https://premium-menu-8fij.vercel.app",
    pdf: "https://www.smartartai.se/portfolio/premium-menu.pdf",
  },
];

function ProjectsWindow({ openWindow }) {
  return (
    <div className="xp-folder">
      <p className="xp-folder-hint">4 objects &mdash; double-click a project to open it</p>
      <div className="xp-folder-grid">
        {PROJECTS.map((p) => (
          <button key={p.id} className="xp-file" onDoubleClick={() => openWindow(`project-${p.id}`)}>
            <GlobeIcon />
            <span>{p.name}</span>
          </button>
        ))}
      </div>
      <p className="xp-folder-hint xp-folder-hint-mobile">On mobile: tap twice.</p>
    </div>
  );
}

function ProjectWindow({ project }) {
  return (
    <div className="xp-project">
      <div className="xp-project-bar">
        <span className="xp-address">Address:</span>
        <span className="xp-address-box">{project.url}</span>
        <a className="xp-btn-link" href={project.url} target="_blank" rel="noopener noreferrer">
          <button>Open in new tab</button>
        </a>
        <a className="xp-btn-link" href={project.pdf} target="_blank" rel="noopener noreferrer">
          <button>Case sheet (PDF)</button>
        </a>
      </div>
      <p className="xp-project-desc">
        {project.desc} <em>({project.tags})</em>
      </p>
      {project.preview ? (
        <a className="xp-preview" href={project.url} target="_blank" rel="noopener noreferrer">
          <img src={project.preview} alt={`${project.name} preview`} />
          <span className="xp-preview-btn">
            <button>Open the live site &rarr;</button>
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
      <img src="/avatar.png" alt="Azzam Khalaf" className="xp-about-photo" />
      <div>
        <h3>Azzam Khalaf</h3>
        <p className="xp-about-role">Web developer &amp; digital creator &mdash; Strömsund, Sweden</p>
        <p>
          I design, build and ship complete web solutions &mdash; from idea to published product. AI and
          automation are a natural part of how I work: not as a shortcut, but to deliver more, faster,
          without compromising quality.
        </p>
        <ul>
          <li><b>Stack:</b> Next.js / React, JavaScript, Supabase (real-time), Claude API, Vercel</li>
          <li><b>Ships:</b> booking systems, QR ordering, AI advisors, admin dashboards</li>
          <li><b>Languages:</b> Arabic (native), Swedish, English</li>
        </ul>
        <p>
          <a href="https://www.smartartai.se/portfolio" target="_blank" rel="noopener noreferrer">
            www.smartartai.se/portfolio
          </a>
        </p>
      </div>
    </div>
  );
}

function CVWindow() {
  return (
    <div className="xp-cv">
      <div className="xp-project-bar">
        <a className="xp-btn-link" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
          <button>Open full screen</button>
        </a>
        <a className="xp-btn-link" href="/cv.pdf" download="Azzam-Khalaf-CV.pdf">
          <button>Download</button>
        </a>
      </div>
      <iframe src="/cv.pdf" title="CV" className="xp-iframe" />
    </div>
  );
}

function ElinWindow() {
  return (
    <div className="xp-elin">
      <div className="xp-elin-header">
        <b>Elin</b> is online <span className="xp-online-dot" /> &mdash; <i>&ldquo;kort, ärligt, utan köphets&rdquo;</i>
      </div>
      <div className="xp-chatlog">
        <div className="xp-msg xp-msg-user">Bästa mot frizz?</div>
        <div className="xp-msg xp-msg-elin">
          Ett anti-frizz serum på fuktigt hår + mindre värme. Jag tipsar gärna om ett prisvärt. 💁‍♀️
        </div>
        <div className="xp-msg xp-msg-user">Är ett dyrt serum värt det?</div>
        <div className="xp-msg xp-msg-elin">
          Oftast inte. Spara pengarna &mdash; jag säger ärligt när du kan skippa ett köp.
        </div>
      </div>
      <a className="xp-btn-link xp-elin-cta" href="https://www.smartartai.se/fraga-elin" target="_blank" rel="noopener noreferrer">
        <button>💬 Chat with Elin for real &rarr;</button>
      </a>
      <p className="xp-elin-note">
        Elin is a real AI advisor I built with the Claude API &mdash; streaming answers, tool calls
        against live product data, and custom guardrails. She answers in Swedish.
      </p>
    </div>
  );
}

function ContactWindow() {
  return (
    <div className="xp-contact">
      <p>Always happy to talk about a project, a role, or an idea.</p>
      <div className="field-row-stacked">
        <label>Email</label>
        <a href="mailto:hello@smartartai.se">hello@smartartai.se</a>
      </div>
      <div className="field-row-stacked">
        <label>Portfolio hub</label>
        <a href="https://www.smartartai.se/portfolio" target="_blank" rel="noopener noreferrer">
          smartartai.se/portfolio
        </a>
      </div>
      <div className="field-row-stacked">
        <label>Location</label>
        <span>Strömsund, Sweden &mdash; remote friendly (CET)</span>
      </div>
      <a className="xp-btn-link" href="mailto:hello@smartartai.se">
        <button>Send me an email</button>
      </a>
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
      icon: <FolderIcon />,
      size: { w: 560, h: 420 },
      content: <ProjectsWindow openWindow={openWindow} />,
    },
    about: {
      title: "My Computer — About Azzam",
      icon: <ComputerIcon />,
      size: { w: 620, h: 460 },
      content: <AboutWindow />,
    },
    cv: {
      title: "My CV",
      icon: <CVIcon />,
      size: { w: 760, h: 620 },
      content: <CVWindow />,
    },
    elin: {
      title: "Messenger — Fråga Elin",
      icon: <ChatIcon />,
      size: { w: 480, h: 640 },
      content: <ElinWindow />,
    },
    contact: {
      title: "Contact Me",
      icon: <MailIcon />,
      size: { w: 460, h: 400 },
      content: <ContactWindow />,
    },
    recycle: {
      title: "Recycle Bin",
      icon: <BinIcon />,
      size: { w: 460, h: 340 },
      content: <RecycleWindow />,
    },
  };
  for (const p of PROJECTS) {
    reg[`project-${p.id}`] = {
      title: `${p.name} — Internet Explorer`,
      icon: <GlobeIcon />,
      size: { w: 900, h: 640 },
      content: <ProjectWindow project={p} />,
    };
  }
  return reg;
}

export const DESKTOP_ICONS = [
  { id: "about", label: "My Computer", Icon: ComputerIcon },
  { id: "projects", label: "My Projects", Icon: FolderIcon },
  { id: "cv", label: "My CV", Icon: CVIcon },
  { id: "elin", label: "Fråga Elin", Icon: ChatIcon },
  { id: "contact", label: "Contact Me", Icon: MailIcon },
  { id: "recycle", label: "Recycle Bin", Icon: BinIcon },
];
