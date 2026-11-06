# CRT terminal portfolio

Kirill Novik's retro portfolio, first built in 2015 as a student project. The menu is drawn on a 2D canvas, then shown through a WebGL 2 shader that adds screen curvature, scanlines and signal noise.

Live at https://kino6052.github.io/pipboy/

```bash
pnpm install
pnpm dev
pnpm build
```

`pnpm build` writes `index.html` and `assets/` to the repo root, which GitHub Pages serves from the `gh-pages` branch.

## How it works

- `src/content.ts`: everything the terminal says
- `src/screen.ts`: draws the menu and returns clickable areas
- `src/crt.ts`: the WebGL 2 shader, which uses the menu canvas as a texture
- `src/main.ts`: state, keyboard, mouse and touch

Images in `src/public/images` are tinted phosphor green. Items without an image show a spinning wireframe. There are no runtime dependencies. The page also holds the same content as plain HTML for screen readers and search engines, and it's what you see without WebGL 2.
