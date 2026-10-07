export const COLUMNS = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "In progress" },
  { id: "done", title: "Done" },
];

export const PRIORITIES = [
  { id: "high", label: "High" },
  { id: "med", label: "Medium" },
  { id: "low", label: "Low" },
];

export const SEED_TASKS = [
  { id: "t1", title: "Sketch the onboarding flow", notes: "Three screens max.", priority: "high", status: "todo" },
  { id: "t2", title: "Set up CI for the repo", notes: "Run lint and build on every push.", priority: "med", status: "todo" },
  { id: "t3", title: "Write release notes for v1.2", notes: "", priority: "low", status: "doing" },
  { id: "t4", title: "Fix date picker on Safari", notes: "Reported by two customers.", priority: "high", status: "doing" },
  { id: "t5", title: "Pick a color palette", notes: "", priority: "low", status: "done" },
];
