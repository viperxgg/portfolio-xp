# Stage 3 — Inner applications and FRAMFORM content

Date: 2026-07-13
Status: local preview, not a release candidate

## 1. Executive recommendation

Keep the approved Formbord visual system unchanged and migrate the inner applications from the retired Smart Art AI portfolio identity to FRAMFORM in small, reviewable slices.

## 2. User, outcome, evidence, assumptions, and stop condition

- User: a Swedish prospective client or collaborator reviewing Azzam Khalaf and FRAMFORM.
- Five-second outcome: the inner workspace belongs to Azzam and FRAMFORM.
- Thirty-second proof: About, projects, project guide, contact details, and `azzam.txt` tell one consistent story.
- Evidence: Azzam approved the shell and explicitly requested `Fråga FRAMFORM`, FRAMFORM-focused notepad copy, and a team check of the game.
- Assumption: `hello@framform.se`, `framform.se/arbete`, and the project-guide route are the approved public destinations; they are documented and return HTTP 200.
- Stop condition: the inner content is coherent and testable locally; the CV remains untouched until Azzam supplies the new PDF.

## 3. Team and decisions

- Decision owner: Azzam Khalaf.
- Execution owner: Product & Automation Studio Lead.
- Reviewers: Visual Identity, Governance, and Quality/UX virtual specialist roles.
- Azzam has explicitly authorised the use of Rättvis Demokrati as a company case.

## 4. Experience and interaction contract

- Preserve the approved wallpaper, window chrome, launcher, taskbar, Formvän, motion, and palette.
- Open desktop applications and project files with one click/tap and keyboard activation.
- Use the FRAMFORM shell-icon family inside windows as well as outside them.
- `Fråga FRAMFORM` is an example conversation with a clear handoff to the real project guide; it does not claim to be a live chat.
- Keep Elins val as a separate, correctly named portfolio project and do not describe Elin's nature.

## 5. Vertical slice and backlog

Completed in this slice:

- About migrated to FRAMFORM and the current Azzam portrait.
- Contact details and portfolio destinations migrated to FRAMFORM.
- `Fråga Elin` replaced by `Fråga FRAMFORM` without changing the visual layout.
- `azzam.txt` rewritten as Azzam and FRAMFORM's story.
- Project copy changed to Swedish and case links moved to `framform.se/arbete`.
- Unique FRAMFORM-style icons added for each project.
- Project files changed from double-click/tap-twice to single activation.
- My CV now opens the approved Swedish CV by default and lets the visitor switch to, open, or download the English version.

Deferred:

- Decide whether all remaining application labels should move from nostalgic English names to Swedish.
- Optional later skin pass for Paint and Recycle Bin; no functional or visual change in this slice.

## 6. Architecture, data, automation, and failure boundaries

- Local Next.js application only; no new backend, integration, analytics, tracking, or customer data.
- External actions are limited to explicit links opened by the visitor.
- No deployment, DNS, production, secret, vendor, or paid-service changes.
- Project previews use verified public image URLs; the local Elins val preview remains unchanged.

## 7. Test and evidence matrix

- Next.js compile and production build.
- HTTP 200 for local preview and every new FRAMFORM destination.
- Desktop application opening, project single activation, taskbar icons, and window recovery.
- Keyboard focus and project-button activation.
- Mobile layout spot check at 390 x 844.
- Content grep for retired contact links, vendor disclosure, and direct claims about Elin's nature.

## 8. Preview and gates

- Preview: `http://localhost:3100/`.
- Rollback: revert only the Stage 3 files; earlier Stage 1 and Stage 2 work remains independent.
- Missing approval: none for this local slice; Azzam still decides any future launch.
- Release status: not approved, not committed, not pushed, and not deployed.

## 9. Decision Log and Lessons Ledger

- D-005: Preserve the approved visual shell and change only inner content and icon consistency.
- D-006: Separate Elins val from the FRAMFORM project-guidance experience.
- D-007: Describe `Fråga FRAMFORM` as an example conversation, not a live chat.
- D-008: Use single activation for project files across mouse, touch, and keyboard.
- D-009: Use the Swedish CV as the default document and expose the English CV through an explicit language control in the same application.
- Lesson: a successful rebrand must include destinations, claims, assets, and internal application copy; changing only the outer shell creates a trust-breaking split identity.
