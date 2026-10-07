import { useEffect, useState } from "react";
import { clamp } from "../utils.js";

/**
 * Tracks scroll position and turns it into a depth in metres.
 * Every element with data-start / data-end maps its height to that depth range.
 */
export default function useDive() {
  const [state, setState] = useState({ progress: 0, depth: 0 });

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? clamp(window.scrollY / max) : 0;
      const mid = window.scrollY + window.innerHeight / 2;
      let depth = 0;

      document.querySelectorAll("[data-start]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (mid >= top && mid < top + rect.height) {
          const start = Number(el.dataset.start);
          const end = Number(el.dataset.end);
          depth = start + (end - start) * ((mid - top) / rect.height);
        }
      });

      setState({ progress, depth });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return state;
}
