# Tulas International School homepage

A responsive React landing page concept for Tulas International School (TIS), built with Vite and CSS. It uses the school's public positioning and official campus imagery, with an editorial visual direction and lightweight motion.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. In this folder, install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open the local URL printed by Vite.

Build a production version with `npm run build`; preview it with `npm run preview`.

## Deploy

GitHub Pages deployment is configured in `.github/workflows/deploy-pages.yml`. Pushes to `main` build the site and publish the `dist` directory. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**. Once the workflow succeeds, the site is available at `https://nikhilkokatla.github.io/tis-homepage/`.

The site is static and does not need environment variables.

## Project structure

- `src/App.jsx` contains the page sections, responsive navigation, custom cursor, theme switch, scroll reveals, and reading progress.
- `src/styles.css` contains the visual system, responsive layouts, animation, and reduced-motion handling.
- `public/favicon.svg` contains the small TIS-inspired favicon.

The wordmark and photography are loaded from the public `tis.edu.in` asset host. The school identity, contact details, campus size, sports count, and student–teacher ratio follow the public TIS homepage. For a production handoff, confirm permission to reuse the official image assets and update admissions links as needed.
