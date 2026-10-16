---
name: Norvia Labs
description: Monochrome silver on near-black, where colour appears only as a decision.
colors:
  ink-black: "#070708"
  surface: "#0d0d0f"
  panel: "#0a0a0c"
  raised: "#141416"
  graphite: "#1c1c1f"
  hairline: "rgba(255, 255, 255, 0.07)"
  hairline-strong: "rgba(255, 255, 255, 0.13)"
  silver: "#ededeb"
  silver-muted: "#a1a19c"
  silver-faint: "#8b8b86"
  allow-green: "#3fb950"
  ask-amber: "#e3b341"
  deny-red: "#f85149"
typography:
  display:
    fontFamily: "Funnel Display, Funnel Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6.1vw, 5.6rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.038em"
  display-page:
    fontFamily: "Funnel Display, Funnel Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.8vw, 4.9rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Funnel Display, Funnel Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Funnel Display, Funnel Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.7vw, 3.125rem)"
    fontWeight: 300
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Funnel Display, Funnel Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.2vw, 2.625rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title-sm:
    fontFamily: "Funnel Display, Funnel Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.2vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  wordmark:
    fontFamily: "Funnel Display, Funnel Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4.5rem, 19.5vw, 19rem)"
    fontWeight: 300
    lineHeight: 0.8
    letterSpacing: "-0.045em"
  body-lg:
    fontFamily: "Funnel Sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.0625rem, 1.4vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Funnel Sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Funnel Sans, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label-status:
    fontFamily: "Funnel Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
  mono-data:
    fontFamily: "Martian Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.7
  mono-verdict:
    fontFamily: "Martian Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  tag: "5px"
  field: "8px"
  inset: "10px"
  panel: "12px"
  card: "14px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  container: "1240px"
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "32px"
  head-gap: "clamp(40px, 5vw, 64px)"
  section: "clamp(88px, 11vw, 152px)"
  closing: "clamp(120px, 15vw, 210px)"
components:
  button-primary:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  button-primary-lg:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-black}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.silver}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  install-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.silver}"
    typography: "{typography.mono-data}"
    rounded: "{rounded.panel}"
    height: "48px"
  tag-live:
    backgroundColor: "{colors.silver}"
    textColor: "{colors.ink-black}"
    typography: "{typography.label-status}"
    rounded: "{rounded.tag}"
    padding: "0 7px"
    height: "20px"
  tag-soon:
    backgroundColor: "rgba(255, 255, 255, 0.07)"
    textColor: "{colors.silver}"
    typography: "{typography.label-status}"
    rounded: "{rounded.tag}"
    padding: "0 7px"
    height: "20px"
  tag-dev:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.silver}"
    typography: "{typography.label-status}"
    rounded: "{rounded.tag}"
    padding: "0 7px"
    height: "20px"
  tag-plan:
    backgroundColor: "transparent"
    textColor: "{colors.silver-muted}"
    typography: "{typography.label-status}"
    rounded: "{rounded.tag}"
    padding: "0 7px"
    height: "20px"
  verdict-allow:
    backgroundColor: "rgba(63, 185, 80, 0.1)"
    textColor: "{colors.allow-green}"
    typography: "{typography.mono-verdict}"
    rounded: "{rounded.tag}"
    padding: "0 7px"
    height: "20px"
  verdict-ask:
    backgroundColor: "rgba(227, 179, 65, 0.1)"
    textColor: "{colors.ask-amber}"
    typography: "{typography.mono-verdict}"
    rounded: "{rounded.tag}"
    padding: "0 7px"
    height: "20px"
  verdict-deny:
    backgroundColor: "rgba(248, 81, 73, 0.1)"
    textColor: "{colors.deny-red}"
    typography: "{typography.mono-verdict}"
    rounded: "{rounded.tag}"
    padding: "0 7px"
    height: "20px"
  decision-log:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.silver}"
    typography: "{typography.mono-data}"
    rounded: "{rounded.panel}"
    width: "440px"
  bento-tile:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.silver}"
    padding: "clamp(22px, 2.6vw, 34px)"
  capture:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "10px"
  text-field:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.silver}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
  nav-bar:
    backgroundColor: "rgba(7, 7, 8, 0.82)"
    textColor: "{colors.silver-muted}"
    height: "64px"
  nav-link:
    textColor: "{colors.silver-muted}"
    rounded: "{rounded.pill}"
    padding: "7px 12px"
---

# Design System: Norvia Labs

## Overview

**Creative North Star: "The Gate"**

Everything on the site is silver on near-black: type, hairlines, buttons, the logo, the particles. Colour is reserved for one idea. When an agent action is decided, it turns green (allowed), amber (held for a person) or red (denied), and nowhere else. The page is calm until a decision happens, so the decision is what the eye finds.

The signature is a live particle field drawn on canvas behind the content. Silver streaks are agent actions. On the home page they funnel into a single luminous vertical gate, and a decision log beside it records each verdict as it lands. Elsewhere the same field runs quieter: it converges on the gate in the closing band and drifts as dust behind inner page heads. Structure comes from hairlines, rails and quiet surface steps, not from boxes inside boxes. The type is light and large (Funnel Display at 300), and the body is set in Funnel Sans. Martian Mono appears only where the content is machine content.

The world sits in the dark AI-infrastructure lane (Modal, Resend, Warp) and refuses the violet-glow SaaS template it replaced: no gradient accent, no brand hue, and no card grids standing in for structure.

**Key Characteristics:**
- Monochrome silver on near-black, with three verdict hues and nothing else.
- Light, large display type with tight negative tracking.
- Hairline structure (7% and 13% white) instead of shadows and nested frames.
- White pill buttons as the only filled control.
- A canvas particle field with three modes (gate, converge, dust) as the signature motion.
- A giant cropped wordmark at 7% silver closes every page.

## Colors

The palette is achromatic silver on near-black, plus three verdict colours that carry meaning rather than brand.

### Primary
- **Silver** (#EDEDEB): primary text, the white pill button fill, focus rings, the selection highlight, the roadmap "Now" node and the AVAILABLE · BETA chip. Hovered primary buttons brighten to pure white.

### Verdict (the only hues)
- **Allow Green** (#3FB950): an agent action that was allowed. ALLOW tags, green gate flashes and allowed particles.
- **Ask Amber** (#E3B341): an action held for approval. ASK tags, the amber hold at the gate with its pulsing rings.
- **Deny Red** (#F85149): an action that was denied. DENY tags, the red gate flash and scattering shards, and "denied" lines in policy output.

Verdict chips are 10% tints of their hue with a 32%-alpha inset ring.

### Neutral
- **Ink Black** (#070708): the page ground, text on silver fills, and the field background.
- **Surface** (#0D0D0F): the announcement strip, install bar, captures, forms, glance tables and quote blocks.
- **Panel** (#0A0A0C): the decision log and the bento tiles, a step darker than surface so the panels read as instruments.
- **Raised** (#141416): inline code chips and diagram nodes.
- **Graphite** (#1C1C1F): scrollbar thumbs only.
- **Silver Muted** (#A1A19C): secondary text, ledes, nav links at rest, and descriptions.
- **Silver Faint** (#8B8B86): tertiary text such as meta, captions, column labels, log operations and the `$` prompt.
- **Hairline** (7% white) and **Hairline Strong** (13% white): every divider, rail, panel edge and ghost-button border.

### Named Rules
**The Colour Means a Decision Rule.** Green is only ALLOW, amber is only ASK and red is only DENY. No status, link, hover, brand mark, chart or success message borrows a verdict hue. If a colour on screen isn't reporting a decision, it is wrong.

**The Silver Status Rule.** Product and roadmap status is always silver. AVAILABLE · BETA (and SHIPPING) is an inverted silver chip. COMING SOON is a 7% tint, IN DEVELOPMENT (and BUILDING) is a 4% tint with a 24% ring, and PLANNED is an outline with muted text. The roadmap "Now" node is a filled silver dot with a 12% halo.

**The Gate N Rule.** The logo is the Gate N: two silver posts (the gate) joined by a diagonal broken into three segments at 40%, 70% and 100% opacity, actions brightening as they pass through. The master is `assets/norvia-mark.svg` (32-unit grid, posts 4.6 wide at x 5 and 22.4, segments along the band from 9.6/13.8 at the top to 18.2/22.4 at the bottom, gaps at 27–36.5% and 63.5–73% of its length). It is inlined as `currentColor` SVG at 24px beside the Funnel Display 500 wordmark in the nav and footer; `favicon.svg` and the PNG icons (`favicon-mono-32`, `mark-mono-96`, `apple-touch-mono`, `norvia-mark-512`) set it on a #141416 tile. Silver only; never recoloured, outlined, rotated or given a gradient. The old blue-violet N is retired.

## Typography

**Display Font:** Funnel Display (with Funnel Sans, ui-sans-serif, system-ui)
**Body Font:** Funnel Sans (with ui-sans-serif, system-ui, -apple-system, Segoe UI)
**Label/Mono Font:** Martian Mono (with ui-monospace, SF Mono, Menlo)

All three are self-hosted variable woff2 files in `assets/fonts/`.

**Character:** Funnel Display at light weight gives the big lines an airy, precise presence on black. Funnel Sans keeps the reading text plain. Martian Mono's wide, squared forms mark the machine layer: commands, logs and verdicts.

### Hierarchy
- **Display** (300, clamp(2.75rem, 6.1vw, 5.6rem), 0.98): the home hero headline only.
- **Display Page** (300, clamp(2.6rem, 5.8vw, 4.9rem), 1, max 16ch): inner page heads. The closing band headline uses the same register (300, clamp(2.6rem, 6vw, 5rem)).
- **Headline** (300, clamp(2.25rem, 4.6vw, 3.75rem), 1.02): section heads, with a muted paragraph of up to 60ch below.
- **Statement** (300, clamp(1.875rem, 3.7vw, 3.125rem), 1.14): a pull statement set in faint silver, with the key phrase lifted to full silver.
- **Title** (400, clamp(2rem, 3.2vw, 2.625rem)): product names in product rows. **Title Small** (400, clamp(1.5rem, 2.2vw, 1.875rem)) is used for ladder rungs, roadmap phases and stages, and 1.625rem for bento tiles.
- **Body Large** (400, clamp(1.0625rem, 1.4vw, 1.1875rem), 1.55): the hero sub and page ledes, max 34em.
- **Body** (400, 1.0625rem, 1.6): running text. Long-form prose is at 1.7 line height, 640px wide.
- **Body Small** (400, 0.875rem to 0.8125rem): meta, captions, footer headings and the announcement.
- **Status Label** (Funnel Sans 600, 0.6875rem, +0.06em, uppercase): status chips only.
- **Mono Data** (Martian Mono 400, 0.75rem): install commands, the decision log, policy samples, version numbers and crate names.
- **Mono Verdict** (Martian Mono 500, 0.6875rem, +0.04em, uppercase): ALLOW / ASK / DENY tags and canvas verdict labels (600 11px).
- **Wordmark** (Funnel Display 300, clamp(4.5rem, 19.5vw, 19rem), 0.8): the cropped "Norvia Labs" at the foot of every page, in 7% silver.

### Named Rules
**The Machine Voice Rule.** Martian Mono is only for commands, code, data and the ALLOW/ASK/DENY verdict tags. Status tags, diagram labels, buttons and navigation use Funnel Sans.

**The Light Display Rule.** Display and headline sizes are set at weight 300 with tracking between -0.03em and -0.045em. Weight 400 is the ceiling for titles, and nothing heading-sized goes bold.

**The No Kicker Rule.** Headings stand alone. There are no eyebrow or kicker labels above them.

## Layout

Content sits in a 1240px container with a fluid gutter of clamp(16px, 4vw, 40px). Sections open with clamp(88px, 11vw, 152px) of top space, and a section head (max 760px) sits clamp(40px, 5vw, 64px) above its content. Rhythm inside components runs on 8, 12, 18, 24 and 32px steps.

- **Hero:** a 7fr / 5fr grid over a full-bleed canvas, at least clamp(680px, 100svh − 102px, 900px) tall. Copy is pinned top-left and the decision log bottom-right. Below 900px it becomes one column, and a clamp(200px, 52vw, 300px) gap opens a dedicated stage for the gate between the actions and the log, which then shows only three rows.
- **Product rows:** 5fr / 7fr copy and capture, alternating sides, clamp(72px, 9vw, 128px) apart. They stack below 900px.
- **Rails:** the strategy ladder, stages and roadmap are three columns on a strong hairline rail. Columns are split by vertical hairlines, and growing ring nodes (9, 13, 17px) sit on the rail. They stack below 960px, each gaining its own top rail.
- **Bento:** a 6-column grid with 1px hairline gaps (spans 4/2, 3/3). Tiles go full width below 960px.
- **Long-form:** a 200px sticky TOC beside 640px prose. The TOC hides below 900px.
- **Closing band:** clamp(120px, 15vw, 210px) of vertical padding, with copy at a max of 640px on the left and the converge field to the right. Below 760px the bottom padding grows to clamp(240px, 60vw, 300px) so the gate sits clear beneath the text.
- **Nav:** sticky, 64px tall, under a 38px announcement strip. Below 960px it collapses to a menu button.

## Elevation & Depth

Depth is tonal and luminous, not shadowed. Surfaces step from ink black to surface to raised, and edges are hairlines. The only light in the scene is the gate's glow and the white pill. Three shadows exist, and each is a long, soft drop that seats a panel on the dark rather than lifting it.

### Shadow Vocabulary
- **Pill lift** (`box-shadow: 0 10px 30px -12px rgba(255, 255, 255, 0.45)`): the primary button on hover only, together with a 1px rise.
- **Log seat** (`box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.9)`): the hero decision log over the particle field.
- **Capture seat** (`box-shadow: 0 40px 90px -45px rgba(0, 0, 0, 0.95)`): framed product screenshots.
- **Focus ring** (`box-shadow: 0 0 0 3px rgba(237, 237, 235, 0.16)`) on fields, and a 2px silver outline offset 3px everywhere else.

### Named Rules
**The Hairline Structure Rule.** Group content with a 7% or 13% hairline, a rail or a surface step. Never put a card inside a card: a bento tile holds content directly, and the diagram's gateway controls are hairline quadrants inside a single outlined layer, not boxed sub-cards.

## Shapes

The control language is round, and the container language is softly squared. Buttons, nav links, the menu button and icon links are full pills (999px). Captures, forms and bento grids use 14px. Panels such as the install bar, decision log, glance tables, quote blocks and table wrappers use 12px. Inner panels and diagram nodes use 10px (9px for small nodes), and fields and capture images use 8px. Tags and inline code use 5px. Rail nodes and the announcement dot are circles. Ladder bullets are 6px squares, filled for shipped items and outlined for later ones.

## Components

### Buttons
White pills that feel lit rather than coloured.
- **Shape:** full pill (999px), 40px tall (48px for large).
- **Primary:** a silver fill with ink-black text at weight 600. On hover it brightens to pure white, gains the pill-lift glow and rises 1px. It settles on press.
- **Ghost:** transparent with a 13% hairline border and silver text. On hover it gets a 6% white wash and a 22% border.
- **Text arrow:** a silver weight-500 link with a muted arrow, whose gap widens from 7px to 10px on hover.
- **Disabled / busy:** 60% opacity with no lift.

### Product Link
The way into each product from the homepage rows, set apart from ordinary arrow links. A 52px pill with a Strong Hairline border and a 3% white fill: the label in body 500 on the left, a 38px solid silver disc with a dark arrow on the right. On hover the border lifts to 30% white, the left padding grows 4px and the disc slides 4px forward (350ms ease-out); reduced motion holds still. Silver only, never a verdict colour.

### Chips
- **Status (silver):** 20px tall, 5px radius, Funnel Sans 600 at 11px with +0.06em tracking, uppercase. Variants are live (inverted silver), soon (7% tint with a 13% ring), dev (4% tint with a 24% ring) and plan (an outline only, with muted text).
- **Verdict (colour):** the same box in Martian Mono 500, with a 10% hue tint, a 32% hue inset ring and hue text. They appear only in the decision log, policy samples and on the canvas.

### Install Bar
A working, copyable command. It is 48px tall on the surface colour, with a 13% hairline border and 12px radius. The command is in Mono Data after a faint `$` and fades out at the right edge, and a hairline-divided Copy button follows, which reads "Copied" for 1.8s. It is the hero's main control, paired with the Install Forge pill.

### Decision Log
The panel colour, a 13% hairline border, 12px radius and the log-seat shadow, set entirely in Martian Mono. A faint header reads "forge · decisions" and "illustrative". Each row is a three-column grid: the operation (faint), the target (silver, ellipsised) over the reason (faint, 11px), and then a verdict tag. New rows slide in from 6px above. The newest row carries a 2.5% white wash. It shows up to five rows (three on mobile) and stays in sync with the gate's events.

### Cards / Containers
- **Bento tile:** the panel colour inside a hairline-gap grid with a 14px outer radius and clamp(22px, 2.6vw, 34px) padding. A tile holds a title, a status chip, muted copy and, at most, one inset mono panel (the 10px radius ink-black "viz"). Tiles never hold other tiles.
- **Capture:** a 10px-padded surface frame with a 14px radius, 13% border and capture-seat shadow, holding an 8px-radius screenshot and a faint caption.

### Inputs / Fields
- **Style:** an ink-black fill, 13% hairline border, 8px radius, 10px × 12px padding at 0.9375rem, and a silver caret.
- **Hover:** the border goes to 22%.
- **Focus:** a silver border plus the 3px 16% silver ring.

### Navigation
- A sticky bar in 82% ink black with a 16px blur, 64px tall, with a bottom hairline. It holds the silver mark and the "Norvia Labs" wordmark in Funnel Display 500, pill links in muted silver (full silver with a 5% wash on hover, full silver when current), a GitHub icon pill and a primary "Get in touch" pill.
- **Mobile (<960px):** a 40px outlined menu button opens a full-width ink-black list with hairline-separated 1.0625rem links and a full-width silver pill CTA at the end.
- **Announcement strip:** 38px on the surface colour, with a silver dot and its 3px halo, muted 13px text and a silver link whose arrow nudges 3px on hover.

- **Product group:** Forge and Conclave sit together in one hairline pill (3px inset, 3% white fill) ahead of the plain links, set in bright text at 500. Each carries a status marker in silver only: a solid 7px dot with a soft ring and an uppercase "Beta" label for the shipped product, a hollow ring and "Soon" for the coming one. The current page fills its segment at 11% white. In the mobile menu the group becomes a "Products" section with the status labels right-aligned.

### Particle Field (signature)
A canvas behind content (`canvas[data-field]`) in three modes, drawn with additive blending. Silver streaks are `rgba(226,226,222)` in four alpha buckets (0.12 to 0.7). The field dims to 7% under the copy it sits behind, and pauses off-screen and in hidden tabs.
- **Gate (home hero):** streaks funnel left to right and pinch into a luminous 1.5px vertical gate with tick marks and a soft silver halo, at about 73% width on desktop. Every 1.1 to 1.8s a particle gets a verdict from the same event list the log prints. ALLOW passes with a green flash and label. ASK holds at the gate with amber pulsing rings for 1.7s, then passes. DENY flashes red and scatters into shards. On mobile the gate gets its own stage between the actions and the log.
- **Converge (closing band):** a calmer stream that is absorbed at the gate, at 80% width on desktop. On mobile it sits below the text.
- **Dust (inner page heads):** a slow, sparse drift with brightness weighted to the right, so the left-hand headline stays clean.
- **Reduced motion:** a single still frame (420 simulated steps) is drawn, with no animation loop.

### Architecture Diagram
An inline SVG. Agent and system nodes are raised fills with 13% strokes and 10px radius, labelled in Funnel Sans 15px. Uppercase column labels are in faint Funnel Sans 12px with +0.08em tracking. The central gateway is one surface layer (16px radius, 34% silver stroke) split into hairline quadrants (16% stroke) for Guard, Approvals, Audit and Identity, with titles in Funnel Display 21px and muted subtitles in Funnel Sans 13px. Wires are 12% white curves. Animated flows are dotted silver dashes (2 16) that travel in 1.6s and stop under reduced motion. Below 760px a vertical version replaces the horizontal one.

### Footer and Wordmark
A four-column footer (2fr + three 1fr columns) under a hairline. It has faint 13px column headings, muted links and a base row, and ends with the giant cropped wordmark in 7% silver that bleeds off the bottom edge.

## Do's and Don'ts

### Do:
- **Do** keep every non-verdict pixel achromatic: ink black (#070708) grounds, silver (#EDEDEB) text and fills, and 7% / 13% white hairlines.
- **Do** use green, amber and red only for ALLOW, ASK and DENY, always together with the word itself.
- **Do** mark status in silver: an inverted chip for AVAILABLE · BETA, and tint or outline chips for COMING SOON, IN DEVELOPMENT and PLANNED.
- **Do** set display and section headlines in Funnel Display 300 with negative tracking (-0.03em to -0.045em).
- **Do** reserve Martian Mono for commands, code, data and verdict tags.
- **Do** make the primary action a white pill and the secondary a hairline ghost pill.
- **Do** structure with hairlines, rails and the 1px bento gap, and seat panels with long soft black shadows only.
- **Do** give every inner page head the dust field and every closing band the converge field, and render a still frame under reduced motion.
- **Do** use only the silver Gate N for the logo, from `assets/norvia-mark.svg`.

### Don't:
- **Don't** use a verdict colour for success messages, links, hovers, brand accents, charts or status.
- **Don't** introduce a brand hue, gradient accent or coloured glow. The only glow is the silver gate and the white pill lift.
- **Don't** put eyebrow or kicker labels above headings.
- **Don't** nest cards. Gateway controls are hairline quadrants, and a tile holds content, not other tiles.
- **Don't** set status tags, diagram labels, buttons or body copy in Martian Mono.
- **Don't** set headings bold. Titles top out at weight 400.
- **Don't** use the retired blue-violet N, or redraw the Gate N with a solid diagonal: the three segments are the mark.
- **Don't** place the hero gate under the headline on mobile. It needs its own stage between the actions and the log.
