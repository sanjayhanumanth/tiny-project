import { useEffect, useMemo, useState } from "react";
import Column from "./components/Column.jsx";
import TaskDialog from "./components/TaskDialog.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { COLUMNS, PRIORITIES, SEED_TASKS } from "./data.js";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskboard.tasks", SEED_TASKS);
  const [theme, setTheme] = useLocalStorage("taskboard.theme", "light");
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dialog, setDialog] = useState(null); // { task?, status? }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesText = !q || t.title.toLowerCase().includes(q) || t.notes.toLowerCase().includes(q);
      const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
      return matchesText && matchesPriority;
    });
  }, [tasks, query, priorityFilter]);

  const saveTask = (data) => {
    setTasks((prev) =>
      data.id
        ? prev.map((t) => (t.id === data.id ? data : t))
        : [...prev, { ...data, id: crypto.randomUUID() }]
    );
    setDialog(null);
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  // Move a task to a column, optionally placing it before another task.
  const moveTask = (id, status, beforeId) => {
    setTasks((prev) => {
      const moving = prev.find((t) => t.id === id);
      if (!moving) return prev;
      const rest = prev.filter((t) => t.id !== id);
      const updated = { ...moving, status };
      const index = beforeId ? rest.findIndex((t) => t.id === beforeId) : -1;
      if (index === -1) return [...rest, updated];
      return [...rest.slice(0, index), updated, ...rest.slice(index)];
    });
  };

  const doneCount = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Taskboard</h1>
          <p className="sub">
            {doneCount} of {tasks.length} tasks done
          </p>
        </div>

        <div className="tools">
          <input
            type="search"
            className="search"
            placeholder="Search tasks"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tasks"
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="all">All priorities</option>
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
          <button className="btn ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
          <button className="btn primary" onClick={() => setDialog({})}>
            New task
          </button>
        </div>
      </header>

      <main className="board">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={visible.filter((t) => t.status === col.id)}
            onEdit={(task) => setDialog({ task })}
            onDelete={deleteTask}
            onMove={moveTask}
            onAdd={(status) => setDialog({ status })}
          />
        ))}
      </main>

      {dialog && (
        <TaskDialog
          task={dialog.task}
          defaultStatus={dialog.status}
          onSave={saveTask}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}
