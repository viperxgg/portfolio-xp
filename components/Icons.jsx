// Small hand-drawn XP-style SVG icons (original artwork, no copyrighted assets).
const S = 34;

export function FolderIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <path d="M2 8c0-1.1.9-2 2-2h8l3 3h13c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8z" fill="#f7d774" stroke="#c9a53d" />
      <path d="M2 12h28v13c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V12z" fill="#ffe9a6" stroke="#c9a53d" />
    </svg>
  );
}

export function ComputerIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <rect x="3" y="4" width="26" height="18" rx="2" fill="#3b6ea5" stroke="#1c3d63" />
      <rect x="6" y="7" width="20" height="12" fill="#7fd4ff" />
      <rect x="6" y="7" width="20" height="12" fill="url(#scr)" opacity="0.5" />
      <rect x="12" y="24" width="8" height="3" fill="#c9c4b8" stroke="#8a8577" />
      <rect x="8" y="27" width="16" height="2.5" rx="1" fill="#e0dbcf" stroke="#8a8577" />
      <defs>
        <linearGradient id="scr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#2e7cc4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DocIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <path d="M7 2h13l6 6v22H7V2z" fill="#fff" stroke="#8a8a8a" />
      <path d="M20 2l6 6h-6V2z" fill="#d8d8d8" stroke="#8a8a8a" />
      <rect x="10" y="12" width="12" height="1.6" fill="#c34a4a" />
      <rect x="10" y="16" width="12" height="1.6" fill="#9a9a9a" />
      <rect x="10" y="20" width="12" height="1.6" fill="#9a9a9a" />
      <rect x="10" y="24" width="8" height="1.6" fill="#9a9a9a" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="13" fill="#5aa0e0" stroke="#2a5f9e" />
      <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#dff0ff" strokeWidth="1.4" />
      <ellipse cx="16" cy="16" rx="5" ry="13" fill="none" stroke="#dff0ff" strokeWidth="1.4" />
      <path d="M8 10c3 2 13 2 16 0M8 22c3-2 13-2 16 0" stroke="#dff0ff" strokeWidth="1.4" fill="none" />
      <path d="M6 12l5 2-2 4 3 3-1 4" stroke="#3f8c4f" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M22 7l2 4-4 3 1 3" stroke="#3f8c4f" strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <path d="M4 6h24v15H14l-6 6v-6H4V6z" fill="#7ec9f5" stroke="#2a5f9e" />
      <circle cx="11" cy="13.5" r="1.8" fill="#1c3d63" />
      <circle cx="16" cy="13.5" r="1.8" fill="#1c3d63" />
      <circle cx="21" cy="13.5" r="1.8" fill="#1c3d63" />
      <circle cx="24" cy="24" r="6" fill="#8ad14f" stroke="#4c7f22" />
      <path d="M21.5 24l1.8 1.8 3.2-3.6" stroke="#fff" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <rect x="3" y="7" width="26" height="18" rx="1.5" fill="#fdfdf5" stroke="#8a8577" />
      <path d="M3 8l13 10L29 8" fill="none" stroke="#3b6ea5" strokeWidth="1.8" />
      <path d="M3 24l9-8M29 24l-9-8" fill="none" stroke="#c9c4b8" strokeWidth="1.2" />
    </svg>
  );
}

export function BinIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <path d="M9 10h14l-1.5 18h-11L9 10z" fill="#dfeefc" stroke="#5a7ea6" opacity="0.9" />
      <ellipse cx="16" cy="10" rx="7" ry="2.4" fill="#f3f9ff" stroke="#5a7ea6" />
      <path d="M12 14l1 10M16 14v10M20 14l-1 10" stroke="#5a7ea6" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function GameIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <rect x="4" y="4" width="24" height="24" rx="2" fill="#c0c0c0" stroke="#7a7a7a" />
      <circle cx="16" cy="16" r="7" fill="#3a3a3a" />
      <path d="M16 6v20M6 16h20M9 9l14 14M23 9L9 23" stroke="#3a3a3a" strokeWidth="1.6" />
      <circle cx="13.5" cy="13.5" r="1.6" fill="#fff" />
    </svg>
  );
}

export function NotepadIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <rect x="6" y="3" width="20" height="26" rx="1.5" fill="#fdfdf5" stroke="#8a8577" />
      <rect x="6" y="3" width="20" height="4" fill="#b9cde8" stroke="#8a8577" />
      <rect x="9" y="11" width="14" height="1.4" fill="#7a8aa5" />
      <rect x="9" y="15" width="14" height="1.4" fill="#7a8aa5" />
      <rect x="9" y="19" width="14" height="1.4" fill="#7a8aa5" />
      <rect x="9" y="23" width="9" height="1.4" fill="#7a8aa5" />
      <path d="M22 20l6-6 2.5 2.5-6 6L21 24l1-4z" fill="#f4b800" stroke="#8a6d00" strokeWidth="0.8" />
    </svg>
  );
}

export function PaintIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <path d="M16 4c7 0 12 4.6 12 10.5 0 4-2.7 6-5.5 6H19c-1.6 0-2.3 1-1.7 2.2.7 1.4.2 3.3-2 3.3C9 26 4 21.4 4 15 4 8.8 9 4 16 4z" fill="#e8e2d6" stroke="#8a8577" />
      <circle cx="10.5" cy="12" r="2" fill="#c62828" />
      <circle cx="16" cy="9.5" r="2" fill="#f4b800" />
      <circle cx="21.5" cy="12" r="2" fill="#2e7d32" />
      <circle cx="9.5" cy="18" r="2" fill="#1d3fbf" />
      <path d="M24 22l4-9 2 1-3.4 9.2c-.4 1-1.6 1.4-2.5.8-.8-.5-.6-1.4-.1-2z" fill="#b06c3a" stroke="#7a4a26" strokeWidth="0.7" />
    </svg>
  );
}

export function CVIcon() {
  return (
    <svg width={S} height={S} viewBox="0 0 32 32">
      <path d="M7 2h13l6 6v22H7V2z" fill="#fff" stroke="#8a8a8a" />
      <path d="M20 2l6 6h-6V2z" fill="#d8d8d8" stroke="#8a8a8a" />
      <circle cx="13" cy="13" r="2.6" fill="#3b6ea5" />
      <path d="M9 20c.8-2.6 7.2-2.6 8 0v1.4H9V20z" fill="#3b6ea5" />
      <rect x="19" y="13" width="4" height="1.5" fill="#9a9a9a" />
      <rect x="10" y="24" width="12" height="1.5" fill="#9a9a9a" />
    </svg>
  );
}
