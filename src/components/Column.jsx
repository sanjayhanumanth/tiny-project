import { useState } from "react";
import TaskCard from "./TaskCard.jsx";

export default function Column({ column, tasks, onEdit, onDelete, onMove, onAdd }) {
  const [over, setOver] = useState(false);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDropOnColumn = (e) => {
    e.preventDefault();
    setOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) onMove(id, column.id, null);
  };

  const handleDropOnCard = (e, target) => {
    e.preventDefault();
    e.stopPropagation();
    setOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id && id !== target.id) onMove(id, column.id, target.id);
  };

  return (
    <section
      className={`column ${over ? "is-over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDropOnColumn}
    >
      <header className="column-head">
        <h2>{column.title}</h2>
        <span className="count">{tasks.length}</span>
        <button className="add-btn" onClick={() => onAdd(column.id)} aria-label={`Add task to ${column.title}`}>
          + Add
        </button>
      </header>

      <div className="column-body">
        {tasks.length === 0 && <p className="empty">Drop a task here or add one.</p>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onDragStart={handleDragStart}
            onDropOnCard={handleDropOnCard}
          />
        ))}
      </div>
    </section>
  );
}
