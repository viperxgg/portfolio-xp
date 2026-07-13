"use client";

import { useState } from "react";
import Image from "next/image";
import { ShellIcon } from "./ShellIcons";
import RetroPuzzle from "./RetroPuzzle";

const ExternalArrow = () => <span aria-hidden="true">↗</span>;

function CompanyPanel({ eyebrow, title, intro, children }) {
  return (
    <article className="company-panel">
      <header className="company-panel__header">
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        {intro && <span>{intro}</span>}
      </header>
      {children}
    </article>
  );
}

function LinkButton({ href, children, secondary = false }) {
  return (
    <a
      className={`company-link-button${secondary ? " company-link-button--secondary" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children} <ExternalArrow />
    </a>
  );
}

function AboutCompany() {
  return (
    <CompanyPanel
      eyebrow="OM STUDION"
      title="Webb, system och flöden — formade runt verkligt arbete."
      intro="FRAMFORM är en svensk digital studio ledd av Azzam Khalaf."
    >
      <div className="company-panel__split">
        <div className="company-panel__logo">
          <Image
            src="/framform-logo-full.png"
            alt=""
            width={2048}
            height={2048}
            sizes="(max-width: 767px) 220px, 280px"
          />
        </div>
        <div>
          <p>
            Vi bygger webbplatser, digitala kundflöden och ansvarsfull automation. Varje uppdrag samlar
            strategi, form, teknik och mänsklig granskning runt ett tydligt behov.
          </p>
          <ul className="company-chip-list" aria-label="FRAMFORMs arbetsområden">
            <li>Webbdesign</li><li>Utveckling</li><li>Automation</li><li>Digital produktion</li>
          </ul>
          <LinkButton href="https://framform.se/studio">Se hur studion arbetar</LinkButton>
        </div>
      </div>
    </CompanyPanel>
  );
}

function ServicesCompany() {
  const services = [
    {
      number: "01",
      title: "Webbdesign & utveckling",
      text: "Strategi, struktur, innehåll, design och responsiv utveckling för ett sammanhållet digitalt hem.",
      href: "https://framform.se/webbdesign",
    },
    {
      number: "02",
      title: "AI & automation",
      text: "Tydliga flöden och AI-stöd med mänsklig kontroll, avgränsade uppgifter och säker överlämning.",
      href: "https://framform.se/ai-automation",
    },
    {
      number: "03",
      title: "Webbplats + AI-assistent",
      text: "Tre paket som för samman varumärkesriktning, webb och en hjälpsam assistent i samma leverans.",
      href: "https://framform.se/webbplats-med-ai",
    },
  ];

  return (
    <CompanyPanel eyebrow="TJÄNSTER" title="Välj spåret som ligger närmast behovet.">
      <div className="company-service-grid">
        {services.map((service) => (
          <a key={service.number} href={service.href} target="_blank" rel="noopener noreferrer">
            <span>{service.number}</span>
            <strong>{service.title}</strong>
            <p>{service.text}</p>
            <small>Utforska tjänsten <ExternalArrow /></small>
          </a>
        ))}
      </div>
    </CompanyPanel>
  );
}

function WorkCompany() {
  return (
    <CompanyPanel
      eyebrow="UTVALDA ARBETEN"
      title="Bevis före stora ord."
      intro="Kundprojekt, verksamhetsprojekt, egna produkter och tydligt märkta konceptstudier hålls isär."
    >
      <div className="company-proof-list">
        <div><span>KUNDPROJEKT</span><strong>Digital närvaro och tydligare vägar framåt</strong></div>
        <div><span>EGET PROJEKT</span><strong>Elins val — innehåll, jämförelser och produktflöden</strong></div>
        <div><span>KONCEPT / DEMO</span><strong>Interaktiva arbetsprov med tydlig status</strong></div>
      </div>
      <LinkButton href="https://framform.se/arbete">Se alla arbeten och deras status</LinkButton>
    </CompanyPanel>
  );
}

function ProcessCompany() {
  const steps = ["Förstå", "Forma", "Bygga", "Granska", "Överlämna"];
  return (
    <CompanyPanel
      eyebrow="SÅ ARBETAR VI"
      title="Ett lugnt flöde från behov till överlämning."
      intro="Beslut, kontroll och ansvar stannar hos människor även när automation hjälper till."
    >
      <ol className="company-process">
        {steps.map((step, index) => (
          <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>
        ))}
      </ol>
      <p className="company-human-note"><span aria-hidden="true">●</span> Mänsklig kontroll före varje viktig leverans eller extern handling.</p>
      <LinkButton href="https://framform.se/studio" secondary>Läs om arbetssättet</LinkButton>
    </CompanyPanel>
  );
}

const FLOW_STEPS = [
  { title: "Behov", text: "En bokningsförfrågan kommer in." },
  { title: "Struktur", text: "Obligatoriska uppgifter och nästa steg kontrolleras." },
  { title: "Mänsklig kontroll", text: "En ansvarig person granskar innan något lämnar systemet." },
  { title: "Överlämning", text: "En tydlig bekräftelse förbereds för kunden." },
];

function FlowLab() {
  const [progress, setProgress] = useState(0);
  const statusText = progress === FLOW_STEPS.length
    ? "Simuleringen är klar. Fyra av fyra steg är genomförda."
    : `Steg ${progress + 1} av ${FLOW_STEPS.length}: ${FLOW_STEPS[progress].title}.`;
  return (
    <CompanyPanel
      eyebrow="FLÖDESLABBET · SIMULERING"
      title="Se ett arbetsflöde ta form."
      intro="Demon använder bara fasta exempel. Ingen data sparas, skickas eller analyseras externt."
    >
      <p className="company-flow-status" role="status">{statusText}</p>
      <div className="company-flow">
        {FLOW_STEPS.map((step, index) => (
          <div
            aria-current={index === progress && progress < FLOW_STEPS.length ? "step" : undefined}
            className={index < progress ? "is-complete" : index === progress ? "is-current" : ""}
            key={step.title}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step.title}</strong>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
      <div className="company-panel__actions">
        <button type="button" onClick={() => setProgress((value) => Math.min(value + 1, FLOW_STEPS.length))} disabled={progress === FLOW_STEPS.length}>
          {progress === 0 ? "Starta simuleringen" : progress === FLOW_STEPS.length ? "Flödet är klart" : "Visa nästa steg"}
        </button>
        <button type="button" className="is-secondary" onClick={() => setProgress(0)} disabled={progress === 0}>Återställ demo</button>
      </div>
    </CompanyPanel>
  );
}

function GuideCompany() {
  return (
    <CompanyPanel
      eyebrow="FRAMFORM GUIDE"
      title="Börja med behovet, inte med tekniken."
      intro="Guiden på framform.se hjälper dig att ringa in projektet steg för steg och lämnar sedan över till en människa."
    >
      <div className="company-guide-steps">
        <span>1. Välj start</span><span>2. Beskriv behovet</span><span>3. Granska underlaget</span><span>4. Skicka när du är redo</span>
      </div>
      <p className="company-human-note"><span aria-hidden="true">●</span> Guiden är ett verktyg, inte en mänsklig rådgivare eller en automatisk beställning.</p>
      <LinkButton href="https://framform.se/starta-projekt?mode=guide">Öppna FRAMFORM Guide</LinkButton>
    </CompanyPanel>
  );
}

function StartCompany() {
  return (
    <CompanyPanel
      eyebrow="STARTA PROJEKT"
      title="Berätta vad ni vill få att fungera."
      intro="Välj en guidad start eller skriv fritt. Underlaget är inte bindande och fortsatt kontakt sker via e-post."
    >
      <div className="company-cta-block">
        <strong>Svar inom en arbetsdag</strong>
        <span>Måndag–fredag · 08.30–14.30</span>
      </div>
      <LinkButton href="https://framform.se/starta-projekt">Starta ett projektunderlag</LinkButton>
    </CompanyPanel>
  );
}

function ContactCompany() {
  return (
    <CompanyPanel
      eyebrow="KONTAKT & ANSVAR"
      title="Tydlig kontakt. Tydliga gränser."
      intro="FRAMFORM arbetar digitalt från Sverige och leds av Azzam Khalaf."
    >
      <div className="company-contact-list">
        <a href="mailto:hello@framform.se"><span>E-POST</span><strong>hello@framform.se</strong></a>
        <a href="https://framform.se/foretagsinformation" target="_blank" rel="noopener noreferrer"><span>FÖRETAG</span><strong>Företagsinformation <ExternalArrow /></strong></a>
        <a href="https://framform.se/integritet" target="_blank" rel="noopener noreferrer"><span>INTEGRITET</span><strong>Så hanteras uppgifter <ExternalArrow /></strong></a>
      </div>
    </CompanyPanel>
  );
}

export function buildCompanyRegistry() {
  return {
    "company-about": { title: "Om FRAMFORM", size: { w: 760, h: 560 }, content: <AboutCompany /> },
    "company-services": { title: "Tjänster", size: { w: 860, h: 600 }, content: <ServicesCompany /> },
    "company-work": { title: "Utvalda arbeten", size: { w: 760, h: 560 }, content: <WorkCompany /> },
    "company-process": { title: "Så arbetar vi", size: { w: 760, h: 540 }, content: <ProcessCompany /> },
    "company-flow": { title: "Flödeslabbet — simulering", size: { w: 900, h: 610 }, content: <FlowLab /> },
    "company-guide": { title: "FRAMFORM Guide", size: { w: 700, h: 520 }, content: <GuideCompany /> },
    "company-start": { title: "Starta projekt", size: { w: 660, h: 480 }, content: <StartCompany /> },
    "company-puzzle": { title: "Formpussel 15", size: { w: 860, h: 680 }, content: <RetroPuzzle /> },
    "company-contact": { title: "Kontakt & ansvar", size: { w: 680, h: 500 }, content: <ContactCompany /> },
  };
}

export const COMPANY_ICONS = [
  { id: "company-about", label: "Om FRAMFORM" },
  { id: "company-services", label: "Tjänster" },
  { id: "company-work", label: "Utvalda arbeten" },
  { id: "company-process", label: "Så arbetar vi" },
  { id: "company-flow", label: "Flödeslabbet" },
  { id: "company-guide", label: "FRAMFORM Guide" },
  { id: "company-start", label: "Starta projekt" },
  { id: "company-contact", label: "Kontakt & ansvar" },
  { id: "company-puzzle", label: "Formpussel 15" },
];
