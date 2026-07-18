# Neon Sign Studio

Web prototype for typing text and live-tuning neon sign effects.

## Stack

- React
- TypeScript
- Vite

## Structure

- `src/state` owns the neon config model
- `src/data` stores presets
- `src/components` contains the editor and preview UI
- `src/styles` keeps the global visual language

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
