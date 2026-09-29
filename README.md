# Assier Anteneh

A portrait-led portfolio for an IT Infrastructure & Cybersecurity Engineer in
Addis Ababa, Ethiopia. Built with React 19, Vite 8, CSS Modules, and Framer Motion.

## Local development

Use Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4178 --strictPort
```

```sh
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4178 --strictPort
```

The dev and production-preview commands use the same example port; run only one
at a time. Production output is written to `dist/`. Building does not deploy.
The focused content, form-validation, and mail-endpoint tests use Node's built-in
runner and mocked provider responses; no test framework is required and no real
emails are sent by the tests.

## In-site email sending

The contact form collects a visitor's email, subject, and message and posts to
`/api/contact`. It does not open an email app. `api/contact.js` is a Vercel Node
function; `server/contact.js` contains the same handler used by the local Vite
dev and preview servers. No extra mail SDK is needed.

Real sending requires two **server-only** environment variables, set privately:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | A sending API key from an authorized [Resend](https://resend.com/docs/api-reference/emails/send-email) account. |
| `CONTACT_FROM` | A sender authorized by that account, optionally `Assier Portfolio <contact@your-verified-domain.example>`. |

For local use, copy `.env.example` to `.env.local`, fill in the two values outside
chat, and restart the dev server. Environment files other than the blank example
are ignored by Git. Never prefix either setting with `VITE_`; those values would
be exposed to browser code. For a future authorized Vercel deployment, configure
the same variables in the project's private environment settings. Deploy the
source and its API function together, not just a static copy of `dist/`.
This change does not configure a provider or authorize a deployment.

The recipient is fixed server-side to `assieranteneh0306@gmail.com`. Only the
validated visitor address becomes `reply_to`; visitors cannot choose recipients
or override the sender. Messages are plain text. The website does not persist or
log message content; the email provider handles the submitted email. Subjects
are limited to 120 characters, messages to 2,000, and requests to 16 KiB.

The endpoint enforces JSON POST requests from the same origin, a honeypot, and
five attempts per ten minutes per client address in a bounded, in-memory rate
limiter. Address hashes expire with that window. This is **best-effort per warm
server instance**, not distributed abuse protection; use platform/firewall rate
limiting for stronger protection on a public deployment. Local development does
not trust caller-supplied forwarding headers; Vercel uses its platform-provided
client address.

An unchanged retry reuses its request ID and Resend's `Idempotency-Key` to avoid
duplicate sends within the provider's 24-hour idempotency window. Editing or
starting a new message creates a new ID. Provider rejection, timeout, invalid
responses, rate limits, and missing configuration remain explicit errors;
entered values are preserved. Without the key or sender, the endpoint returns
503 and **does not pretend to send**.

The illustrated arrival and success message appear only after the provider
accepts the request. Acceptance is not confirmed inbox delivery. The lock is a
security-inspired illustration, not end-to-end encryption; no recipient
encryption key or delivery webhook is configured.

## Vercel Web Analytics

`src/App.jsx` mounts the official `@vercel/analytics/react` component once in
production builds. This is the React/Vite integration, not the Next.js import.
Local `npm run dev` sessions do not load analytics or send test visits.

Enable Web Analytics for the portfolio project in Vercel's Analytics dashboard
if it is not already enabled, then deploy this updated source. Vercel provides
the analytics script and collection endpoints on the deployment; no API key or
extra environment variable is required. Visit the deployed site to begin
collecting visitor and page-view statistics. A standalone local production
preview cannot provide Vercel's collection service.

Only the standard page-view integration is enabled. No custom events, email
addresses, subjects, or message bodies are passed to the analytics component.
See the [official setup guide](https://vercel.com/docs/analytics/quickstart).

## Content

`src/data/resume.js` is the content source for projects, career history, skills,
credentials, awards, original portfolio metrics, and contact destinations.
Education and the biographical introduction live in `src/sections/About.jsx`.

All six projects have keyboard-accessible detail views. CubeGuide and
SentinelFlow have featured, native-scroll project scenes:

- **CubeGuide:** [live application](https://cubeguide-phi.vercel.app/) and
  [source](https://github.com/ass-ier/CubeGuide). Its screenshot shows a practice
  scramble and the verified solution interface, not an uploaded physical cube.
- **SentinelFlow:** [live application](https://sentinel-flow-fawn.vercel.app/),
  a detection-engineering portfolio application, **not a production SIEM**.
  Its saved development captures contain synthetic demonstration data, not
  employer telemetry. No public repository URL is supplied or invented.
- **Original projects:** ML Optimized Traffic Control, Disease Prediction, Math
  Genius AI, and Automated Answer Sheet Grading retain the original descriptions,
  highlights, dates, metrics, and external link behavior.

Do not add a resume-download action without a real resume asset, or replace
project evidence with invented metrics, deployment status, or availability.

## Interaction and accessibility

- Native document scrolling; no scroll hijacking, cursor replacement, or
  autoplaying media.
- The hero portrait eases from 112% to its resting size after the image loads.
  Both that entrance and the about cutout's lift/straighten replay on returning
  to view. They re-arm only after a full viewport exit, not on every wheel tick.
  The hero also pulls back, tilts, and drifts with native scrolling in both
  directions, with smaller travel on mobile. A shared
  `PortraitImage` keeps cached/slow loads, reserved image space, visible retry
  errors, and live reduced-motion behavior consistent. Neither entrance blocks
  text, navigation, or the hero's separate scroll movement.
- Scroll-linked portrait/type movement and sticky project scenes use Framer
  Motion. Featured captures add bounded spring-based pointer depth and a
  one-shot reflected-light sweep. Mobile scenes stay in normal document flow.
- The project archive has a sticky preview window that responds to hover and
  keyboard focus. Projects without a supplied screenshot use explicitly labeled
  concept illustrations, also available in their detail views on touch devices.
- The career sidebar previews the role being read, hovered, or keyboard-focused.
  A scroll-linked timeline and four native chapter anchors provide wayfinding;
  the full career text remains readable without interacting with the preview.
- The about statement traverses its measured horizontal overflow as its own
  strip scrolls through view, so both the first and last words can be read.
  Measurements follow font and viewport changes; reduced motion wraps the
  full phrase into a static, readable block.
- The four original stats count from zero each time they re-enter view, resetting
  only when fully offscreen. The shared `useReplayInView` hook prevents threshold
  jitter from interrupting an active count or portrait entrance. Assistive
  technology receives the final values throughout; reduced motion shows them
  immediately.
- The three supplied certificates appear on hover or keyboard focus. Their
  entire rows open an uncropped image dialog on desktop and touch, not just
  the View certificate label. A native button's hit area and focus outline span
  each row; the separate verification link stays above it and opens only its
  real external destination. Award rows without documents remain noninteractive.
- `prefers-reduced-motion: reduce` removes spatial effects and sticky scenes,
  disables smooth scrolling, and leaves every text and control visible.
  The shared media-query subscription responds to preference changes without
  reloading; previews continue to switch immediately in reduced-motion mode.
- Native modal dialogs provide focus containment, Escape handling, body scroll
  locking, and focus restoration. The shared lifecycle accounts for React
  StrictMode's effect cleanup and replay.
- Skip navigation, visible focus, semantic headings, and native career
  disclosures support keyboard and screen-reader navigation.
- The contact sidebar shows the real email address and telephone number with
  separate copy controls. GitHub and LinkedIn use labeled icon links rather than
  raw URLs; each opens a new tab with `noopener noreferrer`. Clipboard failures
  announce a useful manual-copy recovery.
- The contact composer validates email, subject, and message fields and submits
  to its server endpoint without leaving the page. It prevents duplicate active
  submissions, preserves entered values on failure, announces errors, and allows
  a new message after confirmed acceptance. Direct contact remains available in
  the sidebar instead of an inline illustration.
- Sending opens a full-viewport, native-dialog scene: a note becomes masked
  cipher-like strips, folds into a locked parcel, and travels through seven
  expanding geometric gates. The 1,100ms transformation and 1,200ms transit are
  finite; the final receipt still waits for actual provider acceptance. A failed
  request shows an honest error, never a delivery animation. After success, the
  receipt pauses for 1,600ms, then the full-screen view lifts and retracts over
  550ms while its backdrop fades, automatically returning to the form. The
  inline confirmation remains available; errors never auto-dismiss.
  Escape or Close
  returns to the form with focus and scrolling restored; closing the visual does
  not cancel an active request. Reduced motion uses static states and an
  immediate exit after the same success pause, but still waits for the server.
  No visitor text is displayed in the artwork, and the
  scene explicitly distinguishes its security metaphor from real encryption.

## Local assets and design

`public/images/` contains optimized, responsive JPEG derivatives of the two
user-supplied portraits and actual project captures. The originals are not
modified. The second portrait's office background and MMCY logo were removed
entirely on-device, using a local person matte with hair-edge refinement. The
real pose and likeness remain intact. Its monochrome treatment and angular
orange surround match the supplied hero; both responsive about images retain
the full composed crop rather than using CSS `cover` to cut it further.
New-project descriptions and captures were verified separately;
SentinelFlow captures are cropped near the top to retain readable evidence.
No third-party stock or generated portraits are used.

`public/images/certificates/` contains responsive JPEG copies of the supplied
CompTIA CySA+, Microsoft Azure Fundamentals, and Google Cybersecurity
certificates. The original attachments are unchanged. Image aspect ratios and
all certificate content are preserved; no award documents are invented.

`ProjectStudy.jsx` contains three authored SVG workflow illustrations for the
older projects without real captures. They are visual explanations, not fake
application screenshots, and their captions make that distinction explicit.

Manrope is self-hosted as a Latin variable WOFF2, with its SIL Open Font License
at `public/fonts/OFL-Manrope.txt`. The page does not request a remote font service.

`src/tokens.css` owns the palette and layout tokens; adjacent CSS Modules own
section styling. `PRODUCT.md` records durable factual constraints, and
`DESIGN.md` records the implemented visual system. The reference is interaction
craft, not copied source, branding, assets, or text.

The email composer lives in `src/components/EmailComposer.jsx`, and its full-page
sequence lives in `src/components/MessageTransmission.jsx`. Shared client
and server validation is in `src/utils/contact.js`; its tests and
`server/contact.test.js` cover field limits, recipient/Reply-To separation,
request guards, retry IDs, rate limits, and provider success/failure without
making real provider requests.
