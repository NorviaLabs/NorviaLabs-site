# Norvia Labs

Static website for **Norvia Labs** (`norvialabs.com`): open-source infrastructure for AI agents in production. Dark, monochrome silver on near-black with a live particle "gate"; colour appears only as an agent decision (allow green, ask amber, deny red). Product context lives in `PRODUCT.md`, the design system in `DESIGN.md`.

## Stack

- Plain HTML, CSS, and JavaScript (no build step)
- Self-hosted fonts in `assets/fonts/` (Funnel Display, Funnel Sans, Martian Mono; SIL OFL)
- `app.js`: hero terminal playback, mobile menu, copy button, table of contents, contact form

## Local preview

From this directory:

```bash
python3 -m http.server 5173
```

Open [http://localhost:5173](http://localhost:5173).

Or with Node:

```bash
npx serve .
```

## Customize

| What | Where |
| --- | --- |
| Pages | `index.html`, `platform/`, `roadmap/`, `products/forge/`, `conclave/`, `building-forge/`, `about/`, `contact/` |
| Contact form backend | `data/contact-config.js` (Web3Forms access key) |
| Colours, type, layout | `styles.css` (tokens on `:root`) |
| Crawlers | `llms.txt`, `sitemap.xml`, JSON-LD in each page head |

### Clean URLs

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/building-forge/` | `building-forge/index.html` |
| `/platform/` | `platform/index.html` |
| `/roadmap/` | `roadmap/index.html` |
| `/about/` | `about/index.html` |
| `/contact/` | `contact/index.html` |

`/ideas/`, `/experiments/`, `experiments.html`, `about.html` and `contact.html` are redirect stubs for old links.

### Contact form (Web3Forms)

The contact page posts to [Web3Forms](https://web3forms.com/). Put the access key in `data/contact-config.js` → `accessKey`. The public site shows no email address; visitors use `/contact/`, LinkedIn, or mohitranka.com.

### Honesty rules

Every claim must be checkable in the Forge repository. Never add stars, user counts, customers, funding, or team claims. Unbuilt platform parts stay marked "In development" or "Planned". See `PRODUCT.md`.

## Deploy

Any static host works:

- **Cloudflare Pages / Netlify / Vercel**: point at this folder, no build command
- **GitHub Pages**: publish the repo root (or `/docs` if you move files)

Set the custom domain to `norvialabs.com` in your host’s DNS settings.

## License

Site markup and styles: use freely for Norvia Labs. Experiment software licenses live in their own repositories (MIT intended).
