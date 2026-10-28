import { useState,useMemo, useEffect } from "react";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Filters from "./components/Filters.jsx";
import TaskList from "./components/TaskList.jsx";
import Stats from "./components/Stats.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.jsx";
import { useTheme } from "./context/useTheme.js";

export default function App(){
  const [tasks, setTasks] = useLocalStorage("tasks", [
    {id: 1, text: "Read about components", done : true},
    {id: 2, text: "Understand state", done: false},
  ]);
  
  const [filter, setFilter] =useState("all");
  const {theme} =useTheme();

  function addTask(text) {
    const newTask = {id: Date.now(), text, done: false};
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  function editTask (id, newText){
    setTasks(
      tasks.map((task) =>(task.id === id ? {...task, text: newText}: task))
    );
  }

  function clearCompleted () {
    setTasks(tasks.filter((task) => !task.done));
  }

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.done);
    if (filter === "done") return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks,filter]);

  const doneCount = tasks.filter((t) => t.done).length;

  useEffect(() => {
    const left = tasks.length - doneCount;
    document.title = `${left} ${left === 1 ? "task" : "tasks"} left`;
  }, [tasks, doneCount]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  return(
    <div className="app">
      <Header title ="React Task Tracker"/>
      <TaskForm onAdd ={addTask}/>
      <Filters current={filter} onChange={setFilter} />
      <TaskList
      tasks ={visibleTasks}
      onToggle ={toggleTask}
      onDelete = {deleteTask}
      onEdit = {editTask}
      />
      <Stats total={tasks.length} done={doneCount} onClear={clearCompleted} />
    </div>
  );
}