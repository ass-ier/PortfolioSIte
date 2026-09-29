---
name: Assier Anteneh
description: A portrait-led editorial portfolio for infrastructure, security, and code.
colors:
  paper: "#f3f2ed"
  ink: "#242620"
  muted: "#65665d"
  line: "#cccfc4"
  dark: "#242720"
  muted-on-dark: "#b9bdb1"
  line-on-dark: "#50564a"
  orange: "#ef653f"
  orange-ink: "#aa3518"
  lavender: "#ccc9e3"
  sage: "#bacbbf"
typography:
  display:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(5.5rem, 12vw, 12rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 6.2vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  subheading:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  action: "100px"
  circle: "50%"
spacing:
  gutter: "clamp(1.25rem, 4.5vw, 5.5rem)"
  section: "clamp(5rem, 9vw, 9rem)"
components:
  action:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "0.8rem 1.3rem"
    height: "54px"
  action-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  icon-action:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    width: "48px"
    height: "48px"
---

# Design System: Assier Anteneh

## Overview

**Creative North Star: "Human systems"**

An editorial portfolio led by Assier's actual portraits and work. Oversized,
open grotesque typography meets warm paper, olive-black project chapters, and
an orange close. The interface is expressive without impersonating a terminal,
security dashboard, or game.

The selected creative-developer reference sets an interaction-craft ambition,
not a template to reproduce. Real photographs and application captures carry
the visual proof; normal navigation and readable content remain the foundation.

**Key Characteristics:**
- Portrait-led composition and oversized, medium-weight type.
- Sharp image fields, fine separators, and outlined circular or pill actions.
- Native-scroll movement with a complete static reduced-motion alternative.
- Clear project provenance, deployment status, and direct contact.

## Colors

Warm-neutral reading surfaces alternate with olive-black project scenes. Orange
is derived from the supplied portrait treatment and becomes a full contact field,
not a glow or a status-dashboard decoration.

- **Paper** and **ink** are the default reading pair.
- **Muted** carries secondary prose on paper; it is not a disabled state.
- **Orange ink** is the darker, readable text accent on light surfaces.
- **Orange** is used for the contact field and accents on dark backgrounds.
- **Lavender** holds CubeGuide's real interface; **sage** holds SentinelFlow's.
- **Muted on dark** and **line on dark** are separate dark-section roles.

**The Evidence Rule.** Project status is text, not color alone. A local project
never inherits a live-demo affordance.

The core text/background pairs were measured at 4.75:1 or higher; the default
body pair is 13.64:1. Do not substitute the bright orange for orange-ink text on
paper.

## Typography

Manrope is a locally hosted Latin variable font, with Helvetica Neue and Arial
fallbacks. Medium-weight display type keeps the large composition open rather
than heavy. The same family handles body copy; there is no technical monospace
costume.

The hero display reaches 12rem on large screens as an explicit exception for
the portrait-led brief. Section headings cap at 6rem. Hero type changes to an
18vw-based clamp on mobile; all large text uses a -0.04em tracking floor.
Biographical prose uses approximately 0.88rem/1.9, and project-detail prose uses
1rem/1.85 with a maximum 75-character measure. Small captions are supplementary,
never the only place essential status or actions appear.

## Layout

The shared container caps at 1600px and uses fluid side gutters. Major sections
use the shared section spacing rather than identical card grids. Composition
alternates a large portrait, two project scenes, a quieter biographical passage,
a career timeline, dense skills/credentials, and an orange contact close.

At 760px and below, navigation becomes a native modal menu, portrait/text grids
stack, project scenes return to normal flow, and contact rows reflow to keep
copy buttons separate. The skill grid changes to two columns at 1000px and one
column below 360px. Header heights are 88px desktop and 72px mobile; anchor
scroll padding adds 24px.

Desktop project scenes have short, real sticky intervals inside content-bearing
tracks, not empty multi-screen spacers. Career headings may stick beside the
chronological content. Reduced motion removes both types of sticky staging.

## Elevation & Depth

The interface is flat by default. A structural shadow,
`0 22px 38px rgb(25 30 30 / 18%)`, lifts actual application captures from their
colored fields. Fine-pointer movement tilts the image plane by at most seven
degrees; the surrounding control remains stationary. A one-shot, clipped
reflection on hover/focus makes the image-plane depth legible. Native modal
backdrops use `rgb(20 24 19 / 75%)`. There are no ambient glows, glass panels, or
gradient-text effects.

## Shapes

Image fields and dialog surfaces have sharp corners. Fine one-pixel rules
organize information. Pill actions use a 100px radius, and compact icon actions
are circular. The supplied hero's angular orange surround is matched by a
locally composited silhouette around the second real portrait. Neither
photograph is a generated likeness.

## Components

### Navigation

A fixed paper header holds the typographic monogram and five direct anchors.
Hover/focus adds a small dot under desktop links. The mobile menu uses the shared
native dialog, labeled navigation, a visible close button, and destination focus
after navigating.

### Actions

Primary text actions are outlined pills; link actions are underlined and have a
directional arrow. Hover inverts the surface or shifts the small arrow.
Interactive controls have at least a 44px target height where they occur in the
main interaction paths. Focus uses a two-pixel current-color outline, offset by
six pixels.

### Project scenes and details

Each featured scene combines project identity, purpose, explicit deployment
status, a real capture, its provenance caption, and substantive detail access.
The screenshot is also an accessible button; essential controls and information
are never hover-only. The four earlier projects form a typographic archive
beside a sticky preview window. Hover and keyboard focus select a preview;
selection persists so the visitor can move into the preview itself. Both the
row and preview open the same detail view.

Real application captures remain distinct from the three explicitly labeled
SVG concept illustrations. The illustrations use a 600-by-420 coordinate space:
19-unit diagram labels, a 50-unit illustrative equation, and 14-unit sample
answer numbers scale with the artwork. These are drawing coordinates, not
additional application typography steps or real product output.

Project preview windows use a directional mask to explain selection changes,
with fine registration corners rather than dashboard decoration. They do not
follow or replace the user's cursor. On mobile the list remains direct;
the same visual evidence is available in the detail view.

Details use a native modal dialog with protected focus, a sticky close row,
project evidence, highlights, tools, and only real external destinations. Escape
uses the React dismissal path; cleanup restores body scrolling and exact opener
focus. Queued StrictMode close events must not dismiss a newly reopened dialog.
Tab boundaries wrap explicitly, including dialogs with a single control.

### Portraits

Both portraits use the same monochrome-and-orange cutout language. The office
background and MMCY logo are removed from the second photograph with on-device
person segmentation and a refined hair matte; the real face, glasses, clothing,
and crossed-arm pose are retained. Its orange is sampled from the supplied hero.
White image mattes blend into the warm paper. The about artwork uses a 4:5
composition at 1080px and 640px wide, with no additional responsive `cover` crop.

The shared `PortraitImage` reserves each image's aspect ratio during loading.
The hero eases from scale 1.12 to 1 over 1050ms only after its image is ready,
including cached loads. Its entrance is on a separate layer from a reversible
scroll-linked retreat: scale 1 to 0.9, up to -4 degrees, and 72px of drift.
Mobile bounds those changes to scale 0.92, -3 degrees, and 36px rather than
disabling them. The about portrait settles from scale
0.94, a 36px lift, and -2.5 degrees over 850ms when 20% of its frame enters view
and its image has loaded. Both entrances replay on each return to view.
The shared `useReplayInView` observes untransformed frames and re-arms only at
full viewport exit, so crossing the entry threshold again while still visible
does not interrupt or restart them. Resetting happens instantly offscreen.
Neither image starts transparent. Reduced motion shows the static final pose
immediately, including live preference changes. Image failures show a visible
retry control without collapsing the layout.

### About statement and figures

The oversized statement moves from its first word to its last rather than
drifting by a percentage of an unrelated section. Its travel is the measured
difference between the line width and the viewport, including the page gutters.
A ResizeObserver follows font and viewport changes. Movement is tied to the
statement's own passage through the viewport, completing while the text is
still clear of the fixed navigation. There is no additional scroll spacer.
Reduced motion restores normal wrapping and centered, static text.

The four source figures count from zero each time 60% of their frame enters
view. A finite 1.5-second deceleration uses motion values rather than rerendering
the section on every frame. They remain active until completely offscreen,
when the current animation stops and the value resets for the next visit.
Small scrolls around the entry threshold do not restart a count. Tabular
numerals keep the presentation stable. Screen readers receive the final value,
not a stream of intermediate numbers; reduced motion shows the final numbers
immediately, even outside the viewport.

### Career and credentials

The career is a semantic ordered list, with all four roles and native disclosure
controls for full responsibilities. The current role starts expanded. A
supplementary desktop focus window displays the actual year, employer, role,
and skills for the role being read, hovered, or focused. An IntersectionObserver
updates the reading position without a continuous animation loop. The timeline
rail fills with native scroll progress, while four labeled chapter anchors
allow direct keyboard/touch navigation.

The focus window does not replace or hide career copy. Its duplicate content
is hidden from assistive technology, and the original ordered list remains the
semantic authority. On mobile the focus window is omitted, while the chapter
anchors and timeline remain.
Credentials are ruled rows with real verification links; awards without
verification URLs remain readable, non-link entries.

The three supplied certificate images form a desktop preview window selected
by hover or keyboard focus. Documents use `object-fit: contain`, not cropped
thumbnail treatments. A 240ms directional reveal connects a changed row to its
document; the images themselves are not tilted or magnified on hover.
Each certificate row has a native View certificate button whose transparent
hit area spans the whole row, with a matching full-row keyboard-focus outline.
The separate verification link is layered above that hit area; there are no
nested interactive controls or extra row tab stops. Titles, issuer text, and
row padding all open the document, while verification remains a direct link.
Click/tap opens the shared protected-focus dialog with the entire
document, verification action, and a link to the full image. The image-height
budget leaves room for these controls rather than pushing them offscreen. On mobile the
supplementary preview window is omitted, not the documents or view controls.
Loading is labeled, and image failures offer the verification link as recovery.
No placeholder document is shown for either award.

### Contact

Contact pairs the visitor-email/subject/message form with a direct-contact
sidebar inside the same orange field. Email and phone retain their real text
and copy buttons; GitHub and LinkedIn are 64px circular, labeled icon links
opening new tabs. Contact values scale from 1rem to 1.5rem and wrap when needed.
The form uses the existing subsection-heading scale (2rem to 3.4rem), 1rem labels
and input text, paper input surfaces, and an ink primary action. Validation names
the missing field and focuses the first invalid input. On mobile the sidebar
follows the form; no inline illustration takes its space.

The form sends to the site's server endpoint without opening another application.
Fields remain visible but are protected from edits while the request is active.
Failure is announced with a retry action and all entered values retained.
Success requires actual mail-provider acceptance; the visitor can then start
another message, keeping their email address. The recipient, From address, and
provider key are controlled only on the server. The website does not persist
messages or insert visitor text into the artwork.

Sending opens an olive-black, full-viewport native dialog. A 1,100ms masked-strip
transformation turns the authored word HELLO into cipher-like marks and a
faceted orange parcel. Seven expanding octagonal gates carry its 1,200ms transit;
a large geometric receipt only appears after mail-provider acceptance. Large
phase headings remain outside the artwork, with live status, Close, and a
return action. The artwork's 76-unit HELLO is SVG drawing typography, not an
application text step. No visitor text is passed into the drawing.

The scene stops moving while waiting for a slow server. Errors remain errors
with retry and preserved form values. Escape and Close restore focus and
scrolling without cancelling a request already in flight. A completed scene
holds its receipt for 1,600ms, then automatically returns through a 550ms
upward lift and bottom-to-top mask retraction while the backdrop fades.
Focus returns to the form action and its success message remains visible.
Errors do not auto-dismiss, and manual dismissal cancels pending exit timers.
Closing during a request focuses the form region.
The lock is explicitly illustrative, not end-to-end encryption or confirmed
inbox delivery. Reduced motion skips the choreography and exit movement, not
the success pause or the server response. The backdrop fills the viewport on both desktop and mobile;
short screens can scroll within the dialog rather than cropping its controls.

### Motion

The shared easing is `cubic-bezier(0.22, 1, 0.36, 1)`, with 240ms state changes.
Framer Motion maps native scroll progress to portrait/type movement, layered
capture transforms, image masks, and the career rail. Pointer depth uses a
spring with stiffness 180, damping 26, and mass 0.65; it is enabled only for a
fine mouse pointer with no reduced-motion preference. Preview selection changes
use 320-360ms decelerating mask transitions; the input-triggered reflection
lasts 700ms and never loops.

Reading copy never starts transparent. There is no autoplaying media, scroll
interception, particle loop, or custom cursor. Reduced motion removes spatial
effects, masks, smooth scrolling, transitions, and sticky scenes without
removing content. Preview selection remains functional and changes immediately.
The shared media-query hook listens for preference changes rather than taking
only a startup snapshot. Featured scenes reserve a bounded 10-18rem of sticky
travel, occupied by the image rather than an empty viewport. That extra travel
is absent on mobile and under reduced motion.

## Do's and Don'ts

- Do use the real portraits and verified project captures.
- Do preserve source dates, metrics, links, and explicit deployment status.
- Do keep content and controls visible before animation runs.
- Do retain the static mobile and reduced-motion reading paths.
- Don't introduce fake live links, resume files, availability, or testimonials.
- Don't replace the portfolio with a dashboard, game, or repeated icon-card grid.
- Don't animate layout dimensions or make essential information hover-only.
