export const MAX_DEPTH = 10935; // Challenger Deep, approx. metres

// Background colour at each depth (metres). Colours are blended between stops.
export const COLOR_STOPS = [
  [0, "#2fb4c8"],
  [200, "#176f98"],
  [1000, "#0c3a66"],
  [4000, "#071b3d"],
  [6000, "#040d24"],
  [10935, "#01030a"],
];

export const ZONES = [
  {
    id: "sunlight",
    name: "Sunlight Zone",
    start: 0,
    end: 200,
    blurb:
      "Light pours in here, so this is where almost all marine plants and algae live. It is the busiest, warmest and brightest layer of the ocean.",
    creature: "Green sea turtle",
    fact: "Turtles can hold their breath for hours while resting, and dive to look for seagrass and jellyfish.",
    jellies: [{ size: 90, left: "72%", top: "18%", color: "#e5fdff", delay: 0 }],
  },
  {
    id: "twilight",
    name: "Twilight Zone",
    start: 200,
    end: 1000,
    blurb:
      "Sunlight fades to a dim blue glow and then to nothing. Animals here are small, silver and sharp-eyed, and many make light of their own.",
    creature: "Lanternfish",
    fact: "Each night, billions rise toward the surface to feed and sink again by dawn, one of the largest migrations on Earth.",
    jellies: [
      { size: 120, left: "8%", top: "16%", color: "#a8ecff", delay: 1.2 },
      { size: 70, left: "78%", top: "62%", color: "#a8ecff", delay: 3 },
    ],
  },
  {
    id: "midnight",
    name: "Midnight Zone",
    start: 1000,
    end: 4000,
    blurb:
      "No sunlight has ever reached this far. It is cold, the pressure is crushing, and the only lights are the ones animals make themselves.",
    creature: "Anglerfish",
    fact: "Females dangle a glowing lure from their heads to attract prey in the dark.",
    jellies: [
      { size: 150, left: "70%", top: "14%", color: "#7dffcf", delay: 0.6 },
      { size: 80, left: "12%", top: "60%", color: "#7dffcf", delay: 2.4 },
    ],
  },
  {
    id: "abyss",
    name: "The Abyss",
    start: 4000,
    end: 6000,
    blurb:
      "Most of the deep sea floor lies in this layer. Food is scarce, so life moves slowly and makes the most of every scrap that drifts down.",
    creature: "Dumbo octopus",
    fact: "Its ear-like fins flap gently to steer, and it swallows prey whole instead of tearing it apart.",
    jellies: [
      { size: 130, left: "10%", top: "20%", color: "#c9a2ff", delay: 1 },
      { size: 90, left: "80%", top: "55%", color: "#c9a2ff", delay: 2.8 },
    ],
  },
  {
    id: "hadal",
    name: "The Hadal Trenches",
    start: 6000,
    end: 10935,
    blurb:
      "Named after Hades, these narrow trenches are the deepest places on Earth. Pressure at the bottom is over a thousand times what we feel at the surface.",
    creature: "Trench amphipod",
    fact: "These small crustaceans scavenge at the very bottom, living on whatever falls from far above.",
    jellies: [{ size: 110, left: "68%", top: "22%", color: "#ffb36b", delay: 0.4 }],
  },
];

export function zoneAtDepth(depth) {
  if (depth < 1) return "The Surface";
  const zone = ZONES.find((z) => depth >= z.start && depth < z.end);
  return zone ? zone.name : ZONES[ZONES.length - 1].name;
}
