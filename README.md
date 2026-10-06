# Abhimanyu Sen — Portfolio

Minimal, solid-color mocha portfolio with light/dark themes, projects, and certificates. Built with React, TypeScript, Vite, and Tailwind CSS. Certificate images are included locally; no Lovable account, API keys, or backend required.

## Run locally

Install Node.js 22 or later, then:

```sh
npm install
npm run dev
```

## Commit to GitHub

Extract this folder and copy its contents into your `portfolio` repository. Commit the files normally (including `.github`, `.gitignore`, and `package-lock.json`). Do not commit `node_modules` or `dist`.

```sh
git add .
git commit -m "Add personal portfolio"
git push
```

## Publish on GitHub Pages

In your GitHub repository, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**. The included workflow publishes on pushes to `main`, or you can run it manually from the Actions tab. If your default branch has another name, update the workflow branch. Relative asset paths work on a repository Pages URL or a custom domain.

## Other hosting

Run `npm run build`. Upload the resulting `dist` folder to any static host (Netlify, Cloudflare Pages, or Vercel). Use `npm run preview` to preview that output locally.

## Content

Portfolio text and certificate links are in `src/Portfolio.tsx`. Themes and typography are in `src/styles.css`. All attached certificates live in `src/assets`. The original CV is deliberately not included because it contains excluded challenge references and a student registration number. External fonts load from Google Fonts; serif/sans-serif fallbacks work without network access.
