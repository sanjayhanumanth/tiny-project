import { useEffect, useRef } from "react";

// A darkness overlay with a soft hole that follows the cursor.
// Darkness grows with depth, so the deep zones are explored by torchlight.
export default function Flashlight({ darkness }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const move = (x, y) => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const onMouse = (e) => move(e.clientX, e.clientY);
    const onTouch = (e) => move(e.touches[0].clientX, e.touches[0].clientY);
    move(window.innerWidth / 2, window.innerHeight * 0.55);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flashlight"
      aria-hidden="true"
      style={{
        background: `radial-gradient(circle 280px at var(--mx) var(--my),
          rgba(140, 220, 255, 0.05) 0%,
          rgba(0, 0, 0, ${darkness * 0.45}) 45%,
          rgba(0, 0, 0, ${darkness}) 100%)`,
      }}
    />
  );
}
