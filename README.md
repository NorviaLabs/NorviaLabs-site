# NorviaLabs.com

Static website for **NorviaLabs** — an open-source experiment lab site inspired by the visual language of [neullabs.com](https://www.neullabs.com/): dark navy base, blue/violet brand accents, Inter + JetBrains Mono, product cards, family filters, and a decision table.

## Stack

- Plain HTML, CSS, and JavaScript (no build step)
- Portfolio data in `data/experiments.js`

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
| Experiments list | `data/experiments.js` |
| Contact form backend | `data/contact-config.js` (Web3Forms access key) |
| Copy & sections | `index.html`, `about/`, `experiments/`, `contact/` |
| Colors / layout | `styles.css` |
| GitHub org links | search for `github.com/norvialabs` |

### Clean URLs

Pages live as folders so paths have no `.html` suffix:

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/about/` | `about/index.html` |
| `/experiments/` | `experiments/index.html` |
| `/contact/` | `contact/index.html` |

Stub files `about.html`, `contact.html`, and `experiments.html` redirect to the clean paths for old bookmarks.

### Contact form (Web3Forms)

The contact page posts to [Web3Forms](https://web3forms.com/) (free: **250 submissions/month**).

1. Create a key at https://web3forms.com/ for your inbox
2. Confirm the email
3. Put the access key in `data/contact-config.js` → `accessKey`

The public site does not display a direct email address; visitors use `/contact/` or GitHub.

### Add an experiment

Append an object to `window.NORVIA_EXPERIMENTS` in `data/experiments.js`:

```js
{
  id: "my-tool",
  name: "my-tool",
  stack: "TypeScript", // or Python, Rust, Rust + Python, Go, …
  family: "Tooling",
  familySlug: "tooling", // foundations | runtimes | observability | tooling | research
  description: "One sentence that states the sharp idea.",
  url: "https://github.com/norvialabs/my-tool",
  code: "https://github.com/norvialabs/my-tool",
}
```

Update the decision-table rows in `app.js` if you want it listed under “If you need this…”.

## Deploy

Any static host works:

- **Cloudflare Pages / Netlify / Vercel**: point at this folder, no build command
- **GitHub Pages**: publish the repo root (or `/docs` if you move files)

Set the custom domain to `norvialabs.com` in your host’s DNS settings.

## License

Site markup and styles: use freely for NorviaLabs. Experiment software licenses live in their own repositories (MIT intended).
