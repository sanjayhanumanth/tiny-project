import { PRIORITIES } from "../data.js";

export default function TaskCard({ task, onEdit, onDelete, onDragStart, onDropOnCard }) {
  const priority = PRIORITIES.find((p) => p.id === task.priority);

  return (
    <article
      className="card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropOnCard(e, task)}
    >
      <div className="card-top">
        <span className={`tag tag-${task.priority}`}>{priority?.label}</span>
        <div className="card-actions">
          <button className="icon-btn" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}>
            Edit
          </button>
          <button className="icon-btn danger" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>
            Delete
          </button>
        </div>
      </div>
      <h3>{task.title}</h3>
      {task.notes && <p>{task.notes}</p>}
    </article>
  );
}
