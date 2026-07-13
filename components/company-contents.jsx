"use client";

import { useState } from "react";
import Image from "next/image";
import RetroPuzzle from "./RetroPuzzle";

const SERVICE_URLS = ["https://framform.se/webbdesign", "https://framform.se/ai-automation", "https://framform.se/webbplats-med-ai"];
const ExternalArrow = () => <span aria-hidden="true">↗</span>;

function CompanyPanel({ eyebrow, title, intro, children }) {
  return (
    <article className="company-panel">
      <header className="company-panel__header"><p>{eyebrow}</p><h2>{title}</h2>{intro && <span>{intro}</span>}</header>
      {children}
    </article>
  );
}

function LinkButton({ href, children, secondary = false }) {
  return <a className={`company-link-button${secondary ? " company-link-button--secondary" : ""}`} href={href} target="_blank" rel="noopener noreferrer">{children} <ExternalArrow /></a>;
}

function ExternalNote({ children }) {
  return children ? <p className="xp-external-language-note">{children}</p> : null;
}

function AboutCompany({ copy, externalNote }) {
  return (
    <CompanyPanel eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <div className="company-panel__split">
        <div className="company-panel__logo"><Image src="/framform-logo-full.png" alt="" width={2048} height={2048} sizes="(max-width: 767px) 220px, 280px" /></div>
        <div>
          <p>{copy.body}</p>
          <ul className="company-chip-list" aria-label={copy.areasLabel}>{copy.areas.map((area) => <li key={area}>{area}</li>)}</ul>
          <LinkButton href="https://framform.se/studio">{copy.cta}</LinkButton>
          <ExternalNote>{externalNote}</ExternalNote>
        </div>
      </div>
    </CompanyPanel>
  );
}

function ServicesCompany({ copy, externalNote }) {
  return (
    <CompanyPanel eyebrow={copy.eyebrow} title={copy.title}>
      <div className="company-service-grid">
        {copy.items.map((service, index) => (
          <a key={service.number} href={SERVICE_URLS[index]} target="_blank" rel="noopener noreferrer">
            <span dir="ltr">{service.number}</span><strong>{service.title}</strong><p>{service.text}</p>
            <small>{copy.explore} <ExternalArrow /></small>
          </a>
        ))}
      </div>
      <ExternalNote>{externalNote}</ExternalNote>
    </CompanyPanel>
  );
}

function WorkCompany({ copy, externalNote }) {
  return (
    <CompanyPanel eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <div className="company-proof-list">{copy.items.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.title}</strong></div>)}</div>
      <LinkButton href="https://framform.se/arbete">{copy.cta}</LinkButton>
      <ExternalNote>{externalNote}</ExternalNote>
    </CompanyPanel>
  );
}

function ProcessCompany({ copy, externalNote }) {
  return (
    <CompanyPanel eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <ol className="company-process">{copy.steps.map((step, index) => <li key={step}><span dir="ltr">{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></li>)}</ol>
      <p className="company-human-note"><span aria-hidden="true">●</span> {copy.human}</p>
      <LinkButton href="https://framform.se/studio" secondary>{copy.cta}</LinkButton>
      <ExternalNote>{externalNote}</ExternalNote>
    </CompanyPanel>
  );
}

function FlowLab({ copy }) {
  const [progress, setProgress] = useState(0);
  const statusText = progress === copy.steps.length
    ? copy.completeStatus
    : `${copy.stepLabel} ${progress + 1} ${copy.of} ${copy.steps.length}: ${copy.steps[progress].title}.`;
  return (
    <CompanyPanel eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <p className="company-flow-status" role="status">{statusText}</p>
      <div className="company-flow">
        {copy.steps.map((step, index) => (
          <div aria-current={index === progress && progress < copy.steps.length ? "step" : undefined} className={index < progress ? "is-complete" : index === progress ? "is-current" : ""} key={step.title}>
            <span dir="ltr">{String(index + 1).padStart(2, "0")}</span><strong>{step.title}</strong><p>{step.text}</p>
          </div>
        ))}
      </div>
      <div className="company-panel__actions">
        <button type="button" onClick={() => setProgress((value) => Math.min(value + 1, copy.steps.length))} disabled={progress === copy.steps.length}>
          {progress === 0 ? copy.start : progress === copy.steps.length ? copy.complete : copy.next}
        </button>
        <button type="button" className="is-secondary" onClick={() => setProgress(0)} disabled={progress === 0}>{copy.reset}</button>
      </div>
    </CompanyPanel>
  );
}

function GuideCompany({ copy, externalNote }) {
  return (
    <CompanyPanel eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <div className="company-guide-steps">{copy.steps.map((step) => <span key={step}>{step}</span>)}</div>
      <p className="company-human-note"><span aria-hidden="true">●</span> {copy.human}</p>
      <LinkButton href="https://framform.se/starta-projekt?mode=guide">{copy.cta}</LinkButton>
      <ExternalNote>{externalNote}</ExternalNote>
    </CompanyPanel>
  );
}

function StartCompany({ copy, locale, externalNote }) {
  const mailto = `mailto:hello@framform.se?subject=${encodeURIComponent(copy.mailSubject)}&body=${encodeURIComponent(copy.mailBody)}`;
  const href = locale === "sv" ? "https://framform.se/starta-projekt" : mailto;
  return (
    <CompanyPanel eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <div className="company-cta-block"><strong>{copy.response}</strong><span dir="auto">{copy.hours}</span></div>
      <LinkButton href={href}>{copy.cta}</LinkButton>
      {locale === "sv" && <ExternalNote>{externalNote}</ExternalNote>}
    </CompanyPanel>
  );
}

function ContactCompany({ copy, externalNote }) {
  return (
    <CompanyPanel eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}>
      <div className="company-contact-list">
        <a href="mailto:hello@framform.se"><span>{copy.email}</span><strong><bdi dir="ltr">hello@framform.se</bdi></strong></a>
        <a href="https://framform.se/foretagsinformation" target="_blank" rel="noopener noreferrer"><span>{copy.company}</span><strong>{copy.companyLink} <ExternalArrow /></strong></a>
        <a href="https://framform.se/integritet" target="_blank" rel="noopener noreferrer"><span>{copy.privacy}</span><strong>{copy.privacyLink} <ExternalArrow /></strong></a>
      </div>
      <ExternalNote>{externalNote}</ExternalNote>
    </CompanyPanel>
  );
}

export function buildCompanyRegistry(dictionary, locale) {
  const copy = dictionary.company;
  return {
    "company-about": { title: copy.registry.about, size: { w: 760, h: 560 }, content: <AboutCompany copy={copy.about} externalNote={copy.externalSwedish} /> },
    "company-services": { title: copy.registry.services, size: { w: 860, h: 600 }, content: <ServicesCompany copy={copy.services} externalNote={copy.externalSwedish} /> },
    "company-work": { title: copy.registry.work, size: { w: 760, h: 560 }, content: <WorkCompany copy={copy.work} externalNote={copy.externalSwedish} /> },
    "company-process": { title: copy.registry.process, size: { w: 760, h: 540 }, content: <ProcessCompany copy={copy.process} externalNote={copy.externalSwedish} /> },
    "company-flow": { title: copy.registry.flow, size: { w: 900, h: 610 }, content: <FlowLab copy={copy.flow} /> },
    "company-guide": { title: copy.registry.guide, size: { w: 700, h: 520 }, content: <GuideCompany copy={copy.guide} externalNote={copy.externalSwedish} /> },
    "company-start": { title: copy.registry.start, size: { w: 660, h: 480 }, content: <StartCompany copy={copy.start} locale={locale} externalNote={copy.externalSwedish} /> },
    "company-puzzle": { title: copy.registry.puzzle, size: { w: 860, h: 680 }, content: <RetroPuzzle copy={dictionary.games.puzzle} /> },
    "company-contact": { title: copy.registry.contact, size: { w: 680, h: 500 }, content: <ContactCompany copy={copy.contact} externalNote={copy.externalSwedish} /> },
  };
}

export function getCompanyIcons(dictionary) {
  const icons = dictionary.company.icons;
  return [
    { id: "company-about", label: icons.about }, { id: "company-services", label: icons.services },
    { id: "company-work", label: icons.work }, { id: "company-process", label: icons.process },
    { id: "company-flow", label: icons.flow }, { id: "company-guide", label: icons.guide },
    { id: "company-start", label: icons.start }, { id: "company-contact", label: icons.contact },
    { id: "company-puzzle", label: icons.puzzle },
  ];
}
