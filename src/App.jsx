import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    const title = text.trim();
    if (!title) return;
    setTasks([...tasks, { id: Date.now(), title, done: false }]);
    setText("");
  };

  const toggle = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <main className="app">
      <h1>Tiny To-Do</h1>

      <div className="row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add your first one above.</p>
      ) : (
        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <label className={t.done ? "done" : ""}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                />
                {t.title}
              </label>
              <button className="ghost" onClick={() => remove(t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
