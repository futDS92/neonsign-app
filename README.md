# Neon Sign Studio

A web prototype that turns typed text into a live neon sign with a floating preview, docked settings wing, and instant effect changes.

## Stack

- React
- TypeScript
- Vite

## Features

- Live text input with instant preview updates
- Preset neon styles
- Adjustable glow, flicker, stroke, and typography controls
- Motion styles:
  - Float
  - Bounce
  - Sway
  - Drift
  - Depth
  - Jitter
- Docked `Setting` wing that can be collapsed

## Project Layout

- `src/state` defines the neon config model
- `src/data` stores presets
- `src/components` contains the editor, composer, and preview UI
- `src/styles` keeps the visual language

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This repo is set up for GitHub Pages at:

`https://futds92.github.io/neonsign-app/`

Deployment flow:
- Push to `main`
- Keep Pages source set to `GitHub Actions`
- The workflow in `.github/workflows/pages.yml` builds and publishes the site
