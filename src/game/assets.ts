export type LoadedImage = HTMLImageElement | HTMLCanvasElement;
export type Facing = "left" | "right";

type AssetEntry = readonly [key: string, src: string];

const GLOBAL_ASSETS: readonly AssetEntry[] = [
  ["player-idle", "/sprites/player-idle.webp"],
  ["player-run", "/sprites/player-run.webp"],
  ["player-core-sheet", "/sprites/player-core-sheet.png"],
  ["player-rifle-sheet", "/sprites/player-rifle-sheet.png"],
  ["player-weapon-sheet", "/sprites/player-weapon-sheet.png"],
  ["player-special-sheet", "/sprites/player-special-sheet.png"],
  ["enemy-rifle-sheet", "/sprites/enemy-rifle-sheet.png"],
  ["enemy-heavy-sheet", "/sprites/enemy-heavy-sheet.png"],
  ["fx-explode", "/sprites/fx-explode.webp"],
];

const PHASE_ASSETS: Record<string, readonly AssetEntry[]> = {
  "01": [
    ["enemy-rifle", "/sprites/enemy-rifle.webp"],
    ["enemy-heavy", "/sprites/enemy-heavy.webp"],
    ["jeep", "/sprites/jeep.webp"],
    ["boss-iron", "/sprites/boss-iron.webp"],
  ],
  "02": [
    ["enemy-rifle", "/sprites/enemy-rifle.webp"],
    ["enemy-heavy", "/sprites/enemy-heavy.webp"],
  ],
  "03": [
    ["enemy-rifle", "/sprites/enemy-rifle.webp"],
    ["enemy-heavy", "/sprites/enemy-heavy.webp"],
  ],
};

export class AssetManager {
  global = new Map<string, LoadedImage>();
  phase = new Map<string, LoadedImage>();
  loaded = 0;
  total = 0;
  currentPhase: string | null = null;
  failures: Array<{ key: string; error: string; phase: string }> = [];

  get(key: string): LoadedImage | null {
    return this.phase.get(key) ?? this.global.get(key) ?? null;
  }

  async loadImage(src: string, key: string): Promise<LoadedImage | null> {
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (img.decode) img.decode().then(() => resolve(img)).catch(() => resolve(img));
        else resolve(img);
      };
      img.onerror = () => {
        this.failures.push({ key, error: `failed to load ${src}`, phase: this.currentPhase ?? "global" });
        resolve(null);
      };
      img.src = src;
    });
  }

  async loadGlobal(onProgress?: (l: number, t: number, name?: string) => void) {
    this.total = GLOBAL_ASSETS.length;
    this.loaded = 0;
    for (const [key, src] of GLOBAL_ASSETS) {
      if (!this.global.has(key)) {
        const img = await this.loadImage(src, key);
        if (img) this.global.set(key, img);
      }
      this.loaded++;
      onProgress?.(this.loaded, this.total, key);
      await yieldFrame();
    }
  }

  async loadPhase(id: string, onProgress?: (l: number, t: number, name?: string) => void) {
    if (this.currentPhase !== id) this.unloadPhase();
    this.currentPhase = id;
    const list = PHASE_ASSETS[id] ?? [];
    this.total = Math.max(1, list.length);
    this.loaded = 0;
    if (list.length === 0) {
      this.loaded = 1;
      onProgress?.(1, 1, "phase-data");
      return;
    }
    for (const [key, src] of list) {
      const img = await this.loadImage(src, key);
      if (img) this.phase.set(key, img);
      this.loaded++;
      onProgress?.(this.loaded, this.total, key);
      await yieldFrame();
    }
  }

  unloadPhase() {
    this.phase.clear();
    this.currentPhase = null;
  }
}

function yieldFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

export function drawSheet(
  ctx: CanvasRenderingContext2D,
  img: LoadedImage,
  frame: number,
  cols: number,
  rows: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  facing: Facing,
  ox = 0,
  oy = 0,
  nativeFacing: Facing = "right",
) {
  const fw = img.width / cols;
  const fh = img.height / rows;
  const col = frame % cols;
  const row = Math.floor(frame / cols) % rows;
  ctx.save();
  ctx.translate(dx + dw / 2, dy + dh / 2);
  if (facing !== nativeFacing) ctx.scale(-1, 1);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img, col * fw, row * fh, fw, fh, -dw / 2 + ox, -dh / 2 + oy, dw, dh);
  ctx.restore();
}
