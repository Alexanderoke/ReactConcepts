import { useState } from "react";

export default function TaskItem({task, onToggle, onDelete, onEdit}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  function save(){
    const clean = draft.trim();
    if (clean) onEdit(task.id, clean);
    else setDraft(task.text);
    setIsEditing(false);
  }

  return(
    <li className={task.done ? "item done" : "item"}>
    <input
    type="checkbox"
    checked={task.done}
    onChange={() => onToggle(task.id)}/>

    {isEditing ? (
      <input className="edit"
      value={draft}
      autoFocus
      onChange={(e) => setDraft(e.target.value)}
      onBlur={save}
      onKeyDown={(e) => e.key === "Enter" && save()}
       />
    ) : (
      <span onDoubleClick={() => setIsEditing(true)}>{task.text}</span>
    )}

    {!isEditing && (
      <button className="danger" onClick={() => onDelete(task.id)}>Delete</button>
    )}
    </li>
  );
}