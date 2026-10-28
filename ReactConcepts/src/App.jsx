// 
import { useState,useMemo, useEffect } from "react";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Filters from "./components/Filters.jsx";
import TaskList from ".components/TasList.jsx";
import Stats from "./components/Stats.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.jsx";
import {useTheme} from "./context/ThemeContext.jsx";

export default function App(){
  const [tasks, setTasks] = useLocalStorage("tasks", [
    {id: 1, text: "Read about components", done : true},
    {id: 2, text: "Understand state", done: false},
  ]);
  
  const [filter, setFilter] =useState("all");
  const {theme} =useTheme();

  function toggleTask(id) {
    setTasks(
      tasks.map(() =>
      tasks.id === id ? {...tasks, done: !tasks.done} : task)
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filters((task) => task.id !== id));
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
      <Filters current ={filter} onchange={setfilter}/>
      <TaskList
      tasks ={visibleTasks}
      onToggle ={toggleTask}
      onDelete = {deleteTask}
      onEdit = {editTask}
      />
      <stats total ={tasks.length} done ={doneCount} onClear={clearCompleted}/>
    </div>
  );
}