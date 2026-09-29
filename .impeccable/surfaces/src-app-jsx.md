---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: ["src/sections/Hero.jsx","src/sections/Projects.jsx","src/sections/About.jsx","src/sections/Experience.jsx","src/sections/Skills.jsx","src/sections/Contact.jsx","src/components/PortraitImage.jsx","src/components/EmailComposer.jsx","src/components/MessageTransmission.jsx"]
---

## Scope and visitor mode

The single-page portfolio at `/`, implemented through `src/App.jsx`.
Mode: Experience. The work and the person lead; the interface is a means of
exploration, not a simulated operating system.

## Audience, job, and action

Prospective employers, collaborators, and peers should understand Assier's
practice, inspect six substantive projects and the career behind them, verify
credentials, and make direct contact.

## Proof and constraints

The two supplied portraits, real CubeGuide and SentinelFlow application
captures, the source resume, exact credential links, and direct contact data
are the evidence. SentinelFlow remains local/not deployed and its screenshots
are explicitly synthetic demo data. Native scrolling, keyboard access, mobile
reflow, and reduced motion are required.

## Selected direction and memorable moment

The user explicitly selected an original Dennis Snellenberg-inspired editorial
portfolio rather than a game or a restrained template. The oversized name meets
the monochrome/orange portrait immediately. Native scrolling brings real
project interfaces into large colored fields, then gives way to a readable
career and a direct orange contact close. No random concept selection was
needed because this direction was already approved.

The requested motion enhancement adds a consistent focus-window interaction:
hover/focus selects an archive project preview, and scroll/hover/focus selects
a career chapter preview. Featured image planes respond to a fine pointer and
native scrolling. Where no real project capture exists, labeled conceptual
illustrations explain the workflow without masquerading as screenshots.
No continuous loops, cursor replacement, or new factual claims are introduced.

The about statement now traverses its actual measured width during native
scrolling, making its full wording readable. The four original figures count
from zero on each viewport re-entry, re-arming only after a full exit. The
user-supplied CompTIA, Azure, and Google
certificates provide direct visual evidence through hover/focus previews and
accessible full-image dialogs. Each whole certificate row is clickable, with
a native button, full-row keyboard focus, and a separate verification link.
Static reduced-motion alternatives retain all text and final values.

The portraits now share an angular orange cutout treatment. The second real
photograph is monochrome with its office background and MMCY logo removed
locally, not replaced by an invented likeness. The hero has an image-ready
zoom-out entrance plus reversible scroll-linked depth on desktop and mobile;
the about cutout lifts and straightens as it enters view. Both entrances replay
after fully leaving and returning to the viewport, without restarting during
small boundary scrolls. Both remain static under reduced motion. Neither
entrance hides copy or blocks navigation.

The contact composer pairs visitor-email/subject/message fields with the real
email/phone details and new-tab GitHub/LinkedIn icon links. It submits through a
server endpoint, never prompting an email app. A full-page native dialog replaces
the inline illustration: masked cipher-like strips become a locked parcel,
travel through geometric gates, and end in a receipt. Arrival and success
wait for real mail-provider acceptance; failures retain entered values and
offer retry. Server-controlled recipient/From and private credentials keep the
visitor address restricted to Reply-To. The lock is illustrative, not
end-to-end encryption or confirmed inbox delivery. Reduced motion still waits
for the response. Escape/Close restores form focus and scrolling without
cancelling an active request. Private provider configuration is required for
real sending.

## Remaining decisions

No blocking design decisions remain. No deployment, resume download, or public
SentinelFlow destination is authorized or implied.
