# Stage 1 — FRAMFORM entry screen

Date: 2026-07-12

## Approved scope

- Replace the old Portfolio XP login identity with a FRAMFORM-owned entry experience.
- Show two choices: Azzam Khalaf and FRAMFORM.
- Preserve the current Azzam-to-desktop behavior.
- Add FRAMFORM as a visibly unavailable `Kommer snart` choice only.
- Use the approved Azzam portrait and existing FRAMFORM symbol.
- Redesign the old power control and shutdown state.
- Support desktop, mobile, keyboard focus, disabled state, and reduced motion.
- Do not redesign the internal desktop during this stage.

## Decision log

- D-001: The entry experience uses FRAMFORM's navy, ivory, and cornflower-blue palette.
- D-002: Windows/XP naming, flag mark, login bands, and instructional copy are removed from the entry screen.
- D-003: Azzam is the only active entry choice in Stage 1.
- D-004: FRAMFORM is disabled and visibly labelled `SNART`; it has no dead link or hidden destination.
- D-005: `Avsluta presentationen` opens an honest local end state; it does not claim to close the user's computer or browser.
- D-006: Production deployment, push, and publication are outside this stage.

## Verification evidence

- Next.js production build passes.
- Azzam choice opens the existing internal desktop.
- End-presentation control opens the new shutdown state.
- Mobile layout stacks Azzam before FRAMFORM at 390 × 844.
- FRAMFORM choice is natively disabled.
- Focus-visible and reduced-motion rules are present.

## Deferred blockers before any future launch

- The internal desktop still uses XP visual language and `xp.css` by design; later stages must replace it.
- Existing internal copy explicitly labels Elin as AI and names a model/vendor. This conflicts with FRAMFORM's approved Elin ambiguity rule and must be corrected before launch.
- Existing smartartai identity/contact references need migration to FRAMFORM.
- The Rättvis Demokrati case needs confirmed client permission, evidence, and political-content review before reuse.
- The project currently has no lint, typecheck, or automated test scripts.
- Dependency audit reports two moderate-severity issues; assess and upgrade deliberately instead of using a forced breaking fix.

## Lessons ledger

- Reusable: brand-owned entry shell, active/coming-soon choice pattern, responsive split-to-stack layout, and honest local shutdown state.
- Do not repeat: dead controls, tiny explanatory copy, OS-trade-dress dependence, or visual claims unsupported by working destinations.
