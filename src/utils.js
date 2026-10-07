import { COLOR_STOPS } from "./data.js";

export const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

export function colorAtDepth(depth) {
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const [d0, c0] = COLOR_STOPS[i];
    const [d1, c1] = COLOR_STOPS[i + 1];
    if (depth <= d1) {
      const t = clamp((depth - d0) / (d1 - d0));
      const a = hexToRgb(c0);
      const b = hexToRgb(c1);
      return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(",")})`;
    }
  }
  return COLOR_STOPS[COLOR_STOPS.length - 1][1];
}
