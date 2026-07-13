# Stage 2 — FRAMFORM creative workspace

## Executive recommendation

Use **Formbord** as the interior shell: a warm Swedish studio workspace built from ivory, navy, cornflower blue, quiet construction lines, and original geometric forms. Preserve the desktop mental model without reproducing Windows XP trade dress.

## Product boundary

- User: a prospective client or collaborator entering Azzam Khalaf's portfolio.
- Five-second outcome: this is a FRAMFORM-owned creative and technical workspace.
- Desired action: open an existing shortcut or the branded launcher.
- Included: wallpaper, desktop shortcut presentation, launcher, dock, window chrome, helper, responsive shell, focus states.
- Excluded: changing the content, URLs, data, or features inside My Computer, My Projects, My CV, Fråga Elin, Paint, Minesweeper, Contact Me, Notepad, or Recycle Bin.
- Stop condition: the shell works locally on desktop, keeps all existing app IDs/actions, and passes the available build and interaction checks.

## Concept decision

Three territories were reviewed:

1. **Formbord** — warm studio surface, navy dock, custom duotone icons, geometric helper. Selected.
2. **Nattverkstad** — dark blueprint workspace. Rejected because it repeated the entry screen and risked a generic SaaS feel.
3. **Materialarkiv** — paper/archive visual language. Rejected because it could feel less technical and less professional.

Decision owner: Azzam Khalaf delegated the Stage 2 concept choice to the Studio Lead. Required staff reviews: Visual Identity, Product Experience, Engineering/CTO.

## Interaction contract

- Desktop shortcuts keep the same registry IDs and now open with a single click/tap or keyboard activation.
- The `Meny` trigger exposes expanded/collapsed state, opens a labelled launcher, and supports Escape with focus return.
- Launcher actions keep their previous `openWindow(id)`, log-off, shutdown, and external-link behavior.
- Formvän is optional guidance. It has an original geometric avatar, session-only open/closed state, four Swedish tips, a user-triggered next action, and no continuous motion.
- Task buttons retain minimize/restore behavior and expose the active state to assistive technology.
- Existing window drag, focus, minimize, maximize, close, and internal application content are preserved.

## Visual system

```text
ink          #07111F
navy         #101B31
paper        #FFFDF7
ivory        #F6F1E6
cornflower   #7698F2
blue strong  #4E6FBF
mist         #DCE4EA
slate        #68778B
```

- Custom shell icons use deterministic inline SVG and no external icon package.
- The helper is an original geometric form, not a Clippy/robot/AI-brain likeness.
- Motion is limited to short opacity/translate transitions and is removed for `prefers-reduced-motion`.
- Mobile uses a two-column shortcut grid, bottom-sheet launcher, safe-area dock, and visible helper.

## Files changed

- `components/Desktop.jsx` — modern shell composition and accessible launcher/helper states.
- `components/Window.jsx` — modern shell icon, dialog labelling, and dock-aware mobile geometry.
- `components/ShellIcons.jsx` — original FRAMFORM shell icon family and helper mark.
- `app/globals.css` — scoped Formbord visual system and responsive behavior.

## Verification

- `npm run build` — passed with Next.js 15.5.20.
- Entry → Azzam → workspace — passed.
- Launcher opens and keeps the same application targets — passed with My Projects.
- Escape closes the launcher — passed.
- Window chrome and task item rendering — passed.
- Formvän opens and advances to the next Swedish tip — passed.
- Desktop visual review at 2560 × 1271 — passed.
- Responsive CSS covers 767 px, 360 px, safe-area insets, internal launcher scrolling, and reduced motion. A physical-device pass remains part of later UAT.

## Known blockers before launch

- Deferred inner content still explicitly describes Elin's nature and names a vendor. This conflicts with the approved Elin ambiguity rule and must be corrected before deployment.
- Deferred Rättvis Demokrati portfolio content still requires evidence/permission and political-content review.
- `Portfolio hub` still points to `smartartai.se`; confirm the final FRAMFORM destination before launch.
- The project has no dedicated lint, typecheck, or test scripts.
- The existing dependency audit has two moderate PostCSS-chain findings. Do not use the breaking `npm audit fix --force` suggestion; handle the Next.js dependency upgrade separately.

## Decision log and lessons

- Preserve familiar interaction models, not another platform's trade dress.
- One calm light workspace creates better contrast with the dark entry screen than repeating another dark dashboard.
- Shell-only SVGs prevent the redesign from changing icons inside deferred application content.
- Optional guidance should remain available on mobile and must never be required navigation.
- Running `next build` while the development server is active can invalidate the shared `.next` cache; build and preview must run sequentially.
