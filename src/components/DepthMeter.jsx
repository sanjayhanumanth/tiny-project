import { MAX_DEPTH, zoneAtDepth } from "../data.js";

export default function DepthMeter({ depth }) {
  const metres = Math.round(depth);
  const pressure = Math.round(depth / 10 + 1); // roughly 1 atm per 10 m, plus the air above
  const fill = (depth / MAX_DEPTH) * 100;

  return (
    <aside className="hud" aria-label="Depth gauge">
      <div className="hud-bar">
        <div className="hud-fill" style={{ height: `${fill}%` }} />
      </div>
      <div className="hud-text">
        <span className="hud-zone">{zoneAtDepth(depth)}</span>
        <span className="hud-depth">
          {metres.toLocaleString()}
          <small> m</small>
        </span>
        <span className="hud-pressure">≈ {pressure.toLocaleString()} atm</span>
      </div>
    </aside>
  );
}
