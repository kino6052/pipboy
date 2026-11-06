import { tabs, title } from "./content";

const GREEN = "#69fb8f";
const DIM = "#4cc06e";
const BACKGROUND = "#0b140e";
const FONT = '"VT323", ui-monospace, Consolas, monospace';
const FONT_SCALE = 1.34; // VT323 runs small, so it's drawn larger than the layout unit

export interface State {
  tab: number;
  item: number;
}

export interface Hit {
  x: number;
  y: number;
  width: number;
  height: number;
  tab: number;
  item?: number;
  open?: boolean;
}

type Shape = { points: number[][]; edges: number[][] };

const cube: Shape = {
  points: [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => [x, y, z]))),
  edges: [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]],
};
const octahedron: Shape = {
  points: [[1.4, 0, 0], [-1.4, 0, 0], [0, 1.4, 0], [0, -1.4, 0], [0, 0, 1.4], [0, 0, -1.4]],
  edges: [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5]],
};
const pyramid: Shape = {
  points: [[0, 1.5, 0], [-1.2, -0.9, -1.2], [1.2, -0.9, -1.2], [1.2, -0.9, 1.2], [-1.2, -0.9, 1.2]],
  edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 3], [3, 4], [4, 1]],
};
const shapes = [cube, octahedron, pyramid];

function wrap(context: CanvasRenderingContext2D, text: string, width: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && context.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawShape(context: CanvasRenderingContext2D, shape: Shape, x: number, y: number, size: number, time: number) {
  const a = time * 0.6;
  const b = time * 0.37 + 0.6;
  const projected = shape.points.map(([px, py, pz]) => {
    const x1 = px * Math.cos(a) - pz * Math.sin(a);
    const z1 = px * Math.sin(a) + pz * Math.cos(a);
    const y1 = py * Math.cos(b) - z1 * Math.sin(b);
    const z2 = py * Math.sin(b) + z1 * Math.cos(b);
    const depth = 4 / (5 + z2);
    return [x + x1 * depth * size, y + y1 * depth * size];
  });
  context.beginPath();
  for (const [from, to] of shape.edges) {
    context.moveTo(projected[from][0], projected[from][1]);
    context.lineTo(projected[to][0], projected[to][1]);
  }
  context.stroke();
}

export function draw(context: CanvasRenderingContext2D, state: State, time: number, images: Map<string, HTMLImageElement>): Hit[] {
  const { width, height } = context.canvas;
  const hits: Hit[] = [];
  const wide = width > height * 1.05;
  const unit = Math.max(13, Math.min(width / (wide ? 58 : 24), height / 34));
  const margin = unit * 2.4;

  context.fillStyle = BACKGROUND;
  context.fillRect(0, 0, width, height);
  context.textBaseline = "top";
  context.strokeStyle = GREEN;
  context.lineWidth = Math.max(1, unit / 12);
  context.shadowColor = GREEN;
  context.shadowBlur = unit * 0.5;

  context.fillStyle = DIM;
  context.font = `${unit * 0.8 * FONT_SCALE}px ${FONT}`;
  context.fillText(title, margin, margin * 0.7);

  // Tabs
  const tabY = margin * 0.7 + unit * 1.7;
  const tabHeight = unit * 2;
  const tabWidth = (width - margin * 2) / tabs.length;
  context.font = `${unit * (wide ? 1 : 0.8) * FONT_SCALE}px ${FONT}`;
  tabs.forEach((tab, index) => {
    const x = margin + index * tabWidth;
    if (index === state.tab) {
      context.fillStyle = GREEN;
      context.fillRect(x, tabY, tabWidth - unit * 0.4, tabHeight);
    }
    context.fillStyle = index === state.tab ? BACKGROUND : GREEN;
    context.fillText(tab.name, x + unit * 0.5, tabY + unit * 0.5);
    hits.push({ x, y: tabY, width: tabWidth, height: tabHeight, tab: index });
  });

  const top = tabY + tabHeight + unit * 1.2;
  const footer = height - margin * 0.9;
  const items = tabs[state.tab].items;
  const selected = items[state.item];

  // Item list
  const listWidth = wide ? (width - margin * 2) * 0.4 : width - margin * 2;
  const rowHeight = unit * (wide ? 2.2 : 1.9);
  context.font = `${unit * FONT_SCALE}px ${FONT}`;
  items.forEach((item, index) => {
    const y = top + index * rowHeight;
    if (index === state.item) {
      context.fillStyle = GREEN;
      context.fillRect(margin, y, listWidth, rowHeight - unit * 0.3);
    }
    context.fillStyle = index === state.item ? BACKGROUND : GREEN;
    context.fillText(`${index === state.item ? ">" : " "} ${item.name}`, margin + unit * 0.4, y + unit * 0.35);
    hits.push({ x: margin, y, width: listWidth, height: rowHeight, tab: state.tab, item: index });
  });

  // Detail panel
  const panelX = wide ? margin + listWidth + unit * 2 : margin;
  const panelY = wide ? top : top + items.length * rowHeight + unit * 0.8;
  const panelWidth = wide ? width - panelX - margin : width - margin * 2;
  const shapeSize = wide ? unit * 4.4 : unit * 2.6;

  const picture = selected.image ? images.get(selected.image) : undefined;
  context.fillStyle = GREEN;
  let y = panelY + shapeSize * 2.7;
  if (picture?.complete && picture.naturalWidth) {
    const pictureHeight = Math.min((panelWidth * 9) / 16, height * (wide ? 0.4 : 0.26));
    const pictureWidth = (pictureHeight * 16) / 9;
    const pictureX = panelX + (panelWidth - pictureWidth) / 2;
    context.shadowBlur = 0;
    context.drawImage(picture, pictureX, panelY, pictureWidth, pictureHeight);
    context.strokeRect(pictureX, panelY, pictureWidth, pictureHeight);
    context.shadowBlur = unit * 0.5;
    y = panelY + pictureHeight + unit * 1.1;
  } else {
    drawShape(context, shapes[(state.tab + state.item) % shapes.length], panelX + panelWidth / 2, panelY + shapeSize * 1.25, shapeSize, time);
  }

  if (selected.rating !== undefined) {
    context.strokeRect(panelX, y, panelWidth, unit * 0.8);
    context.fillRect(panelX, y, (panelWidth * selected.rating) / 100, unit * 0.8);
    y += unit * 1.5;
  }
  context.font = `${unit * FONT_SCALE}px ${FONT}`;
  const lineHeight = unit * 1.5;
  for (const line of wrap(context, selected.text, panelWidth)) {
    context.fillText(line, panelX, y);
    y += lineHeight;
  }
  if (selected.url) {
    y += unit * 0.5;
    const label = "[ OPEN ]";
    context.fillText(label, panelX, y);
    hits.push({ x: panelX, y: y - unit * 0.4, width: context.measureText(label).width + unit, height: unit * 2, tab: state.tab, item: state.item, open: true });
  }

  context.fillStyle = DIM;
  context.font = `${unit * 0.72 * FONT_SCALE}px ${FONT}`;
  context.fillText(wide ? "ARROWS OR WASD: MOVE   ENTER: OPEN   OR USE MOUSE / TOUCH" : "TAP TO SELECT", margin, footer);
  context.shadowBlur = 0;
  return hits;
}
