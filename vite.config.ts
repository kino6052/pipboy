import { defineConfig } from "vite";

// GitHub Pages serves the root of the gh-pages branch at /pipboy/, so the build
// lands next to src and uses relative paths.
export default defineConfig({
  root: "src",
  base: "./",
  build: { outDir: "..", emptyOutDir: false, assetsDir: "assets" },
});
