import Jellyfish from "./Jellyfish.jsx";
import useReveal from "../hooks/useReveal.js";

export default function Zone({ zone, index }) {
  const ref = useReveal();
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <section className={`zone zone-${side}`} id={zone.id} data-start={zone.start} data-end={zone.end}>
      {zone.jellies.map((j, i) => (
        <Jellyfish
          key={i}
          size={j.size}
          color={j.color}
          delay={j.delay}
          style={{ position: "absolute", left: j.left, top: j.top }}
        />
      ))}

      <div className="zone-inner reveal" ref={ref}>
        <p className="range">
          {zone.start.toLocaleString()} – {zone.end.toLocaleString()} m
        </p>
        <h2>{zone.name}</h2>
        <p className="blurb">{zone.blurb}</p>

        <div className="creature">
          <span className="label">Resident</span>
          <h3>{zone.creature}</h3>
          <p>{zone.fact}</p>
        </div>
      </div>
    </section>
  );
}
