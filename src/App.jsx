import { useEffect } from "react";
import DepthMeter from "./components/DepthMeter.jsx";
import Flashlight from "./components/Flashlight.jsx";
import MarineSnow from "./components/MarineSnow.jsx";
import Zone from "./components/Zone.jsx";
import useDive from "./hooks/useDive.js";
import { MAX_DEPTH, ZONES } from "./data.js";
import { clamp, colorAtDepth, smoothstep } from "./utils.js";

export default function App() {
  const { depth } = useDive();

  useEffect(() => {
    document.documentElement.style.setProperty("--bg", colorAtDepth(depth));
  }, [depth]);

  const darkness = smoothstep(150, 4000, depth) * 0.82;
  const raysOpacity = clamp(1 - depth / 900) * 0.9;

  return (
    <>
      <div className="rays" style={{ opacity: raysOpacity }} aria-hidden="true" />
      <MarineSnow />

      <main>
        <section className="hero" data-start="0" data-end="0">
          <p className="eyebrow">An interactive descent</p>
          <h1>
            Deep <em>Dive</em>
          </h1>
          <p className="lede">
            Scroll to sink {MAX_DEPTH.toLocaleString()} metres, from sunlit shallows to the bottom of the Mariana
            Trench. Move your cursor once it gets dark.
          </p>
          <span className="scroll-cue" aria-hidden="true">
            Scroll to descend
            <i />
          </span>
        </section>

        {ZONES.map((zone, i) => (
          <Zone key={zone.id} zone={zone} index={i} />
        ))}

        <section className="outro" data-start={MAX_DEPTH} data-end={MAX_DEPTH}>
          <h2>
            This is <em>Challenger Deep</em>
          </h2>
          <p>
            About {MAX_DEPTH.toLocaleString()} metres down, and life is still here. Depths are approximate and vary
            between sources.
          </p>
          <button className="rise" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Rise to the surface
          </button>
        </section>
      </main>

      <Flashlight darkness={darkness} />
      <DepthMeter depth={depth} />
    </>
  );
}
