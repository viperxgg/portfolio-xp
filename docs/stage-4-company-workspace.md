# Stage 4 — FRAMFORM company workspace

Date: 2026-07-13
Status: local preview, not deployed

## Executive decision

Open the FRAMFORM entry as a separate company workspace while preserving Azzam Khalaf's personal portfolio.
The workspace is a public client-facing map of services, work, process, a safe flow simulation, and next actions.
Internal virtual offices and management files are not exposed or represented as real people.

## Identity and entry

- The approved full `FRAMFORM` logo is used as the primary company-profile image.
- The exact approved 2048×2048 source is stored as `public/framform-logo-full.png`.
- Next Image serves optimized variants in the interface while preserving the master asset.
- The FRAMFORM card is active, keyboard accessible, labelled `ÖPPEN`, and opens a separate `company` workspace.

## Company applications

1. `Om FRAMFORM` — truthful studio overview and public studio link.
2. `Tjänster` — web design, AI/automation, and website-plus-assistant offer paths.
3. `Utvalda arbeten` — honest project/status categories and public work link.
4. `Så arbetar vi` — Understand, shape, build, review, and hand over with human control.
5. `Flödeslabbet` — deterministic local booking-flow simulation with no storage, network call, AI, or external side effect.
6. `FRAMFORM Guide` — explains the public guide and hands off to `framform.se`.
7. `Starta projekt` — explicit external project-intake action.
8. `Kontakt & ansvar` — email, company information, and privacy links.
9. `Formpussel 15` — a mobile-ready, always-solvable classic sliding puzzle with local sound controls.

## Stage 4.1 — light identity and play

- The company workspace now uses an off-white base with navy and blue typography, icons, controls, and restrained accents.
- Azzam Khalaf is presented beneath the company identity as `VD & grundare`, using the approved existing portrait.
- The puzzle shuffles only through legal moves from the solved board, so every round remains solvable.
- Move, blocked-move, and success sounds come from the official Kenney UI Audio pack under CC0. The files are stored locally and do not require a network request while playing.
- `public/audio/kenney-ui/SOURCE.md` and `LICENSE.txt` preserve the source, original filenames, conversion note, and license evidence.
- Ten distinct system effects now cover startup, menu open/close, selection, window open/close, minimize/restore, sound toggle, and power-off actions.
- A persistent `Systemljud` control is available on the entry screen and in the workspace tray; it stores only the visitor's on/off preference locally.

## Architecture and safety boundaries

- `page.jsx` uses independent `login`, `personal`, `company`, and `off` phases.
- `Desktop.jsx` keeps one window engine but receives workspace-specific apps and content.
- A keyed workspace mount prevents personal windows from leaking into the company workspace.
- Company content is static and contains no form, analytics, customer data, secrets, internal office documents, or external automation.
- The personal portfolio remains independently reachable and retains its existing applications.

## Accessibility and responsive behavior

- Company entry supports mouse, Enter, Space, visible focus, and reduced motion.
- Opening a window moves focus to its dialog; Escape closes the top window and returns focus to its source.
- Launcher-opened windows return focus to `Meny`.
- Window controls use Swedish accessible names; mobile maximize is disabled.
- The flow simulation exposes its current step with `aria-current` and a live textual status.
- The company grid reflows at 390px and 320px without horizontal overflow.

## Verification evidence

- `npm run build` — passed with Next.js 15.5.20.
- Nine company icons rendered and opened registered destinations.
- Escape left zero visible dialogs and returned focus successfully.
- Azzam's `My Projects` path remained available after switching workspaces.
- 390px and 320px checks reported no horizontal overflow.
- Reduced-motion rules applied.
- Puzzle moves, reset, sound toggle, and all four local audio responses passed.
- Puzzle board and controls remained usable at 390px and 320px; the 320px window scrolled to the controls without page overflow.
- Browser console and page errors: zero.
- All public `framform.se` destinations used by the workspace returned HTTP 200.
- Independent review: local preview `PASS WITH CONDITIONS`; production remains `HOLD` pending explicit deploy approval and final UAT.

## Decision log

- D-010: Use the approved full logo for primary company-profile surfaces and the responsive symbol only at micro sizes.
- D-011: Keep the company workspace public and client-facing; never expose virtual offices as real staff or publish internal operating files.
- D-012: Use one window engine with separate personal/company registries.
- D-013: Keep Flödeslabbet deterministic and local until a separately approved automation contract exists.
- D-014: Treat `framform.se` as the source of truth for services, work, legal information, and project intake.
- D-015: Use a light off-white workspace as the primary company presentation while retaining blue as the identity color.
- D-016: Use `VD & grundare` as the concise Swedish founder title.
- D-017: Use documented CC0 interface audio rather than copyrighted sounds copied from a commercial game.

## Lessons ledger

- A company profile becomes useful when each icon answers a client question and has a real destination.
- A responsive full-logo asset can remain the master while framework image optimization protects load cost.
- Separating workspace content from the window engine preserves the personal portfolio and makes future company modules safer to add.
- Internal governance can shape public behavior without being presented as a fictional public team.

## Remaining production gates

- Azzam must explicitly approve `LAUNCH` or `deploy`.
- Confirm that the public one-business-day response statement remains operationally accurate.
- Run final physical-device and quick screen-reader UAT.
- Review known dependency findings without using a forced breaking upgrade.
- Prepare rollback and changed-files evidence before any publication.
