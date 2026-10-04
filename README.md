# Scroll-Driven Hero Section Animation

A polished recreation of the interaction pattern from the reference assignment, built as a React + Vite app using Tailwind CSS and GSAP ScrollTrigger.

## Features

- Above-the-fold hero composition
- Letter-spaced "W E L C O M E I T Z F I Z Z" headline
- Smooth intro reveal on load
- Four impact metrics with staggered entry
- Pinned scroll stage
- Main visual moves with scroll progress
- Scroll-linked trail/progress indicator
- Letter reveal tied to the moving object
- Responsive layout for desktop/tablet/mobile
- `prefers-reduced-motion` support
- GitHub Pages deployment via GitHub Actions

## Tech

- React
- Vite
- Tailwind CSS
- GSAP + ScrollTrigger

## Local setup

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

The project is configured for a repository named `scroll-driven-hero-animation`.
If you use a different repository name, update the `base` value in `vite.config.js` to `/<YOUR-REPO>/` before pushing.

In GitHub:

1. Push the project to the `main` branch.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Wait for the workflow in **Actions** to finish.

Your Pages URL will be:

`https://<your-username>.github.io/<your-repo>/`

## Assignment note

The reference was used for interaction and layout inspiration only. The visual object, copy, metric labels, and styling in this implementation are original rather than copied from the reference source.


## Submission links

After publishing, submit:

- Live webpage: `https://<your-username>.github.io/scroll-driven-hero-animation/`
- GitHub repository: `https://github.com/<your-username>/scroll-driven-hero-animation`

Use the repository name `scroll-driven-hero-animation` so the included Vite `base` path works without changes.
