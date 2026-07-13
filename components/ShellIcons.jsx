const commonProps = {
  "aria-hidden": "true",
  focusable: "false",
  viewBox: "0 0 32 32",
};

function IconFrame({ children }) {
  return (
    <svg {...commonProps} className="studio-shell-icon">
      <rect className="studio-shell-icon__tile" x="3" y="3" width="26" height="26" rx="7" />
      {children}
    </svg>
  );
}

const icons = {
  about: (
    <>
      <rect x="8" y="9" width="16" height="11" rx="2" />
      <path d="M12 24h8M16 20v4" />
    </>
  ),
  projects: (
    <>
      <path d="M8 11h7l2 2h7v10H8z" />
      <path d="M8 11V9h7l2 2" />
    </>
  ),
  cv: (
    <>
      <path d="M10 7h9l4 4v14H10z" />
      <path d="M19 7v5h4M13 16h7M13 20h7" />
    </>
  ),
  framform: (
    <>
      <path d="M8 9h16v11H14l-5 4v-4H8z" />
      <path d="M12 14h.01M16 14h.01M20 14h.01" />
    </>
  ),
  notepad: (
    <>
      <path d="M10 7h12v18H10zM13 12h6M13 16h6M13 20h4" />
      <path d="M13 7V5M19 7V5" />
    </>
  ),
  paint: (
    <>
      <path d="M16 7a9 9 0 1 0 0 18h2a2 2 0 0 0 1-3.7 2 2 0 0 1 1-3.7h2a3 3 0 0 0 3-3C25 10.4 21 7 16 7Z" />
      <path d="M11 13h.01M15 10h.01M20 12h.01" />
    </>
  ),
  minesweeper: (
    <>
      <circle cx="15" cy="17" r="6" />
      <path d="M18 11l3-3M20 8h3v3M15 8v3M7 17h2M21 17h3M10 10l2 2M10 24l2-2M20 22l2 2" />
    </>
  ),
  contact: (
    <>
      <rect x="7" y="10" width="18" height="13" rx="2" />
      <path d="m8 12 8 6 8-6" />
    </>
  ),
  recycle: (
    <>
      <path d="M11 11h10l-1 13h-8zM9 11h14M13 8h6M14 14v7M18 14v7" />
    </>
  ),
  "company-about": (
    <>
      <path d="M8 9h16v14H8z" />
      <path d="M12 13h8M12 17h5M6 12v8M26 12v8" />
    </>
  ),
  "company-services": (
    <>
      <rect x="8" y="8" width="7" height="7" rx="1.5" />
      <rect x="17" y="8" width="7" height="7" rx="1.5" />
      <rect x="8" y="17" width="7" height="7" rx="1.5" />
      <path d="M20.5 18v5M18 20.5h5" />
    </>
  ),
  "company-work": (
    <>
      <path d="M8 11h7l2 2h7v10H8z" />
      <path d="m12 18 2 2 5-5" />
    </>
  ),
  "company-process": (
    <>
      <circle cx="9" cy="10" r="2" />
      <circle cx="23" cy="16" r="2" />
      <circle cx="9" cy="22" r="2" />
      <path d="M11 10h7l3 4M21 18l-3 4h-7" />
    </>
  ),
  "company-flow": (
    <>
      <path d="M7 11h8M17 11h8M9 9l-2 2 2 2M23 9l2 2-2 2" />
      <path d="M7 21h8M17 21h8M9 19l-2 2 2 2M23 19l2 2-2 2" />
      <circle cx="16" cy="16" r="3" />
    </>
  ),
  "company-guide": (
    <>
      <path d="M8 9h16v11H14l-5 4v-4H8z" />
      <path d="M13 13.5a3 3 0 1 1 4 2.8V18M17 21h.01" />
    </>
  ),
  "company-start": (
    <>
      <path d="M8 16h14M17 10l6 6-6 6" />
      <path d="M8 10v12" />
    </>
  ),
  "company-puzzle": (
    <>
      <rect x="7" y="7" width="8" height="8" rx="2" />
      <rect x="17" y="7" width="8" height="8" rx="2" />
      <rect x="7" y="17" width="8" height="8" rx="2" />
      <path d="M20 18h4v4M22 16v8M18 20h8" />
    </>
  ),
  "company-contact": (
    <>
      <rect x="7" y="10" width="18" height="13" rx="2" />
      <path d="m8 12 8 6 8-6" />
      <path d="M21 8h4v4" />
    </>
  ),
  "project-elinsval": (
    <>
      <path d="M9 10h14M9 16h14M9 22h14" />
      <circle cx="13" cy="10" r="2" />
      <circle cx="20" cy="16" r="2" />
      <circle cx="15" cy="22" r="2" />
    </>
  ),
  "project-rattvis": (
    <>
      <path d="m8 13 8-5 8 5M10 14h12M11 14v9M16 14v9M21 14v9M8 24h16" />
    </>
  ),
  "project-rsmh": (
    <>
      <path d="m8 15 8-7 8 7v9H8zM12 24v-6h8v6" />
      <path d="M21 10v-3" />
    </>
  ),
  "project-menu": (
    <>
      <circle cx="16" cy="16" r="7" />
      <path d="M7 8v7M5 8v4c0 2 4 2 4 0V8M7 15v9M25 8v16M22 13c0-3 1-5 3-5" />
    </>
  ),
};

export function ShellIcon({ id }) {
  return <IconFrame>{icons[id] || icons.about}</IconFrame>;
}

export function GuideMark() {
  return (
    <svg {...commonProps} className="studio-guide-mark">
      <path d="M6 9.5 16 4l10 5.5v13L16 28 6 22.5Z" />
      <path d="M11 12.5 16 10l5 2.5v7L16 22l-5-2.5Z" />
      <circle cx="14" cy="16" r="1" />
      <circle cx="18" cy="16" r="1" />
    </svg>
  );
}

export function MenuMark() {
  return (
    <svg {...commonProps} className="studio-menu-mark">
      <rect x="6" y="6" width="8" height="8" rx="2" />
      <rect x="18" y="6" width="8" height="8" rx="2" />
      <rect x="6" y="18" width="8" height="8" rx="2" />
      <rect x="18" y="18" width="8" height="8" rx="2" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg {...commonProps} className="studio-action-icon">
      <path d="M8 16h16M18 10l6 6-6 6" />
    </svg>
  );
}

export function PowerIcon() {
  return (
    <svg {...commonProps} className="studio-action-icon">
      <path d="M16 6v10M10 9.5a9 9 0 1 0 12 0" />
    </svg>
  );
}
