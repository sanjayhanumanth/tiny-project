export default function Jellyfish({ size = 100, color = "#9fe8ff", delay = 0, style }) {
  return (
    <svg
      className="jelly"
      width={size}
      height={size * 1.5}
      viewBox="0 0 100 150"
      aria-hidden="true"
      style={{ color, animationDelay: `${delay}s`, ...style }}
    >
      <path
        d="M10 56 C10 14 90 14 90 56 C80 64 70 58 60 63 C50 68 40 63 30 63 C20 58 14 63 10 56 Z"
        fill="currentColor"
        fillOpacity="0.28"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse cx="50" cy="34" rx="22" ry="10" fill="currentColor" fillOpacity="0.2" />
      <g className="tentacles" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M26 64 C20 85 32 100 24 124" style={{ animationDelay: `${delay}s` }} />
        <path d="M38 66 C34 90 44 104 38 138" style={{ animationDelay: `${delay + 0.4}s` }} />
        <path d="M50 67 C56 92 46 108 52 146" style={{ animationDelay: `${delay + 0.8}s` }} />
        <path d="M62 66 C66 88 56 102 64 134" style={{ animationDelay: `${delay + 1.2}s` }} />
        <path d="M74 64 C80 84 68 100 76 122" style={{ animationDelay: `${delay + 1.6}s` }} />
      </g>
    </svg>
  );
}
