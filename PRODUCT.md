# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

Assier Anteneh's personal portfolio presents his IT infrastructure, cybersecurity,
software projects, and career, with direct ways to contact him. Success means a
visitor can understand his work, inspect project details, verify credentials, and
reach him without navigating a game or a simulated operating system.

## Users

Inferred from the explicit portfolio brief: prospective employers, collaborators,
and peers evaluating Assier's experience and projects. No narrower audience was
specified; implementation proceeds autonomously as requested.

## Capabilities and Constraints

- React 19, Vite 8, and the existing Framer Motion dependency.
- `src/data/resume.js` is authoritative for the existing four projects, experience,
  skills, certifications, awards, dates, metrics, and verification links.
- Education includes the BSc in Software Engineering from HiLCoE (2021-2025)
  and the MSc in Computer Science currently being pursued at Addis Ababa
  University (2026-2029, expected), with a specialization in Network and Security.
- Preserve all seven projects. Show only ReverseScope and SentinelFlow initially;
  an Explore more projects button reveals CubeGuide, ML Optimized Traffic
  Control, Disease Prediction, Math Genius AI, and Automated Answer Sheet Grading
  with the same scene layout and full detail access.
- ReverseScope is a local-first Windows PE static-analysis workstation. Its
  supplied development capture uses synthetic test fixtures. Binaries are never
  executed; static evidence does not establish runtime behavior or a definitive
  malware verdict. Do not invent a hosted demo, public repository, or dates.
- CubeGuide is hosted at `https://cubeguide-phi.vercel.app/`.
- SentinelFlow is hosted at `https://sentinel-flow-fawn.vercel.app/`. Preserve its
  portfolio-project scope, synthetic screenshot context, and not-a-production-SIEM
  disclosure; do not invent a public repository or project dates.
- Vercel Web Analytics is enabled in production builds using its React
  integration. Contact form values are not supplied as analytics events.
- Preserve the supplied email, telephone, GitHub, and LinkedIn contacts.
- The requested email composer sends email, subject, and message fields from
  within the website, without prompting the visitor to open an email app.
  Server-side Resend credentials and an authorized From address must be
  configured privately. The recipient is server-controlled; the visitor address
  is Reply-To only. Success requires provider acceptance, not an animation timer.
  Never claim confirmed inbox delivery or end-to-end encryption.
- Real contact details sit beside the form, with new-tab GitHub/LinkedIn icon
  links. Sending triggers a creative full-page security-inspired scene instead
  of an inline envelope illustration. The scene must remain dismissible,
  keyboard-accessible, and static under reduced motion. After a successful
  receipt it automatically closes with an exit transition; the form retains
  the confirmation. Pending requests and errors must never auto-dismiss.
- No invented achievements, availability statements, project dates, or resume file.
- Native scrolling and functional project detail, navigation, and copy controls.
- Work is limited to this isolated worktree. No deployment, push, or commit.

## Brand Commitments

The user selected an original, Dennis Snellenberg-inspired creative portfolio:
portrait-led, expressive typography, meaningful scroll-linked animation, and
desktop/mobile craft. It must remain an ordinary usable website, not a game or a
generic neon cybersecurity dashboard. Reference code, copy, branding, and imagery
must not be copied.

## Evidence on Hand

- Existing source content and contact details.
- Two user-supplied photographs, used with the subject's likeness intact and
  optimized into local assets. Originals remain untouched.
- Independently collected CubeGuide visuals and SentinelFlow project facts are
  supplied by the coordinating session; this implementation does not run those
  projects or invent missing evidence.
- ReverseScope's existing dedicated-worktree documentation and synthetic
  acceptance screenshot establish its scope and visual evidence. The portfolio
  reuses an optimized copy without running ReverseScope or handling binaries.
- No downloadable resume was supplied.

## Product Principles

- Real work is the primary evidence; presentation must not overstate it.
- Reading and navigation stay straightforward even when the visual treatment is bold.
- Every project remains discoverable and has substantive detail access.
- Direct contact remains available alongside the optional email composer.
  Security-themed animations must distinguish illustration from real guarantees.

## Accessibility & Inclusion

Visible focus, skip navigation, keyboard access, accessible menu and detail
controls, readable contrast, responsive layouts, and reduced-motion alternatives
are explicit requirements. No essential information is hover-only or hidden
behind animation.
