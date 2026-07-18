# Neon Sign Studio

`neonsign-app` repository for a web prototype that turns typed text into a live neon sign.

## Stack

- React
- TypeScript
- Vite

## Structure

- `src/state` owns the neon config model
- `src/data` stores presets
- `src/components` contains the editor and preview UI
- `src/styles` keeps the visual language

## Start

```bash
npm install
npm run dev
```

## GitHub Pages

This project is configured for the `https://github.com/futDS92/neonsign-app` Pages path.

- Push the repository to GitHub
- Enable Pages with the `GitHub Actions` source
- The app will deploy from the `main` branch workflow
