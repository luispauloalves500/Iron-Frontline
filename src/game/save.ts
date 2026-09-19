const KEY = "iron-frontline-save-v1";
const VERSION = 1;

export type SaveData = {
  version: number;
  unlocked: number[];
  bestScore: Record<string, number>;
  bestTime: Record<string, number>;
  secrets: string[];
  characters: string[];
  difficulties: string[];
  achievements: string[];
  reduceFlash: boolean;
  volume: number;
};

const DEFAULTS: SaveData = {
  version: VERSION,
  unlocked: [1],
  bestScore: {},
  bestTime: {},
  secrets: [],
  characters: ["ash"],
  difficulties: [],
  achievements: [],
  reduceFlash: false,
  volume: 0.7,
};

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    return { ...DEFAULTS, ...parsed, version: VERSION };
  } catch {
    return { ...DEFAULTS };
  }
}

export function writeSave(data: SaveData) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...data, version: VERSION }));
  } catch {
    /* quota / private mode */
  }
}

export function unlockMission(data: SaveData, id: number) {
  if (!data.unlocked.includes(id)) data.unlocked.push(id);
  writeSave(data);
}

export function recordRun(data: SaveData, mission: string, score: number, time: number) {
  data.bestScore[mission] = Math.max(data.bestScore[mission] ?? 0, score);
  const prev = data.bestTime[mission];
  data.bestTime[mission] = prev == null ? time : Math.min(prev, time);
  writeSave(data);
}
