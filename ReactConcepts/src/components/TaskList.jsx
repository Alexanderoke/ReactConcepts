import TaskItem from "./TaskItem.jsx";

export default function TaskList({tasks, onToggle, onDelete, onEdit}) {
  if (tasks.length ===0) {
    return <p className="empty">Nothing here yet.</p>;
  }

  return(
    <ul className="list">
      {tasks.map((task)=>(
        <TaskItem
        key={task.id}
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}/>
      ))}
    </ul>
  );
}