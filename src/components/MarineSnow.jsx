import { useEffect, useRef } from "react";

// Drifting specks of organic debris. They slide upward as you scroll down,
// which sells the feeling of sinking.
export default function MarineSnow() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 0.8,
      r: 0.6 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
    }));

    let w = 0;
    let h = 0;
    let raf = 0;
    let scroll = window.scrollY;
    let mouseX = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#e3f8ff";
      for (const p of particles) {
        const y = (((p.y * h - scroll * 0.6 * p.z + t * 0.012 * p.z) % h) + h) % h;
        const x = p.x * w + Math.sin(t * 0.0006 + p.phase) * 12 * p.z + mouseX * 28 * p.z;
        ctx.globalAlpha = 0.15 + p.z * 0.45;
        ctx.beginPath();
        ctx.arc(x, y, p.r * p.z * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scroll = window.scrollY;
      if (reduce) draw();
    };
    const onMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}
