# Tariq Ahmed — Portfolio

A modern, responsive developer portfolio built with React, Vite, TypeScript, and Tailwind CSS.

## Requirements

- Node.js 18 or newer

## Setup

```bash
npm install
```

## Run locally (development)

```bash
npm run dev
```

This starts a local dev server (by default at `http://localhost:5173`) with hot reload.

## Build for production

```bash
npm run build
```

This outputs a static site to the `dist/` folder.

## Preview the production build

```bash
npm run preview
```

## Deploying

Since this is a fully static site (no backend/database required), you can host the contents of `dist/` on **any** static host, for example:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any plain web server / VPS (just serve the `dist/` folder)

No special configuration, environment variables, or third-party platform is required to build or run this project.

## Visitor analytics (Google Analytics)

The site already includes the Google Analytics (GA4) tracking snippet in `index.html` — you just need your own free Measurement ID:

1. Go to https://analytics.google.com and create a free account (if you don't have one).
2. Create a new **Property** for your portfolio site.
3. Under **Data Streams**, add a **Web** stream and enter your site's URL.
4. Google will give you a **Measurement ID** that looks like `G-XXXXXXXXXX`.
5. Open `index.html` in this project and replace **both** occurrences of `G-XXXXXXXXXX` with your real Measurement ID.
6. Rebuild/redeploy the site (`npm run build`).

That's it — after deploying, visits, page views, and visitor locations will start showing up in your Google Analytics dashboard (usually within a few minutes to a couple hours for data to appear).
