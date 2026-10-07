import { useEffect, useRef, useState } from "react";
import { COLUMNS, PRIORITIES } from "../data.js";

export default function TaskDialog({ task, defaultStatus, onSave, onClose }) {
  const isEdit = Boolean(task);
  const [title, setTitle] = useState(task?.title ?? "");
  const [notes, setNotes] = useState(task?.notes ?? "");
  const [priority, setPriority] = useState(task?.priority ?? "med");
  const [status, setStatus] = useState(task?.status ?? defaultStatus ?? "todo");
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Give the task a title.");
      return;
    }
    onSave({ ...task, title: title.trim(), notes: notes.trim(), priority, status });
  };

  return (
    <div className="overlay" onMouseDown={onClose}>
      <form className="dialog" onSubmit={submit} onMouseDown={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Edit task" : "New task"}</h2>

        <label>
          Title
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            placeholder="What needs doing?"
          />
          {error && <span className="field-error">{error}</span>}
        </label>

        <label>
          Notes
          <textarea rows="3" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <div className="row">
          <label>
            Priority
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </label>
          <label>
            Column
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {COLUMNS.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="dialog-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">{isEdit ? "Save changes" : "Add task"}</button>
        </div>
      </form>
    </div>
  );
}
