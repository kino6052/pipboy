import "@fontsource/vt323";
import { tabs } from "./content";
import { bendFor, createCrt, toScreen } from "./crt";
import { draw, type Hit, type State } from "./screen";

const output = document.querySelector<HTMLCanvasElement>("#screen")!;
const menu = document.createElement("canvas");
const context = menu.getContext("2d")!;
const render = createCrt(output);

if (render) {
  document.documentElement.classList.add("crt");

  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state: State = { tab: 0, item: 0 };
  const images = new Map<string, HTMLImageElement>();
  let hits: Hit[] = [];
  let glitch = 0;
  let frame = 0;
  let last = 0;

  const paint = (now: number) => {
    const seconds = still.matches ? 3 : now / 1000;
    hits = draw(context, state, seconds, images);
    render(menu, seconds, glitch);
    glitch *= 0.8;
  };

  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    if (now - last < 33) return;
    last = now;
    paint(now);
  };

  const run = () => {
    cancelAnimationFrame(frame);
    if (still.matches || document.hidden) paint(performance.now());
    else frame = requestAnimationFrame(loop);
  };

  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    output.width = menu.width = Math.round(output.clientWidth * scale);
    output.height = menu.height = Math.round(output.clientHeight * scale);
    paint(performance.now());
  };

  const change = (update: Partial<State>) => {
    Object.assign(state, update);
    glitch = 1;
    if (still.matches) {
      glitch = 0;
      paint(performance.now());
    }
  };

  const open = () => {
    const { url } = tabs[state.tab].items[state.item];
    if (url) window.open(url, "_blank", "noopener");
  };

  const moveItem = (step: number) => {
    const count = tabs[state.tab].items.length;
    change({ item: (state.item + step + count) % count });
  };

  const moveTab = (step: number) => {
    change({ tab: (state.tab + step + tabs.length) % tabs.length, item: 0 });
  };

  window.addEventListener("keydown", (event) => {
    const keys: Record<string, () => void> = {
      ArrowUp: () => moveItem(-1),
      ArrowDown: () => moveItem(1),
      ArrowLeft: () => moveTab(-1),
      ArrowRight: () => moveTab(1),
      w: () => moveItem(-1),
      s: () => moveItem(1),
      a: () => moveTab(-1),
      d: () => moveTab(1),
      Enter: open,
    };
    const action = keys[event.key.length === 1 ? event.key.toLowerCase() : event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  });

  output.addEventListener("pointerup", (event) => {
    const box = output.getBoundingClientRect();
    const point = toScreen((event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height, bendFor(output.width, output.height));
    const x = point.x * menu.width;
    const y = point.y * menu.height;
    const hit = [...hits].reverse().find((h) => x >= h.x && x <= h.x + h.width && y >= h.y && y <= h.y + h.height);
    if (!hit) return;
    if (hit.open) {
      open();
    } else if (hit.item === undefined) {
      if (hit.tab !== state.tab) change({ tab: hit.tab, item: 0 });
    } else {
      change({ item: hit.item });
    }
  });

  for (const { image } of tabs.flatMap((tab) => tab.items)) {
    if (!image) continue;
    const element = new Image();
    element.onload = () => paint(performance.now());
    element.src = `./images/${image}.webp`;
    images.set(image, element);
  }

  // A canvas can't swap fonts by itself, so repaint once the font has arrived.
  document.fonts.load('24px "VT323"').then(() => paint(performance.now()));

  new ResizeObserver(resize).observe(output);
  document.addEventListener("visibilitychange", run);
  still.addEventListener("change", run);
  resize();
  run();
}
