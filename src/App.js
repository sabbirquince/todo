import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import CreateTask from "./CreateTask/CreateTask";
import Task from "./Task/Task";
import TaskHead from "./TaskHead/TaskHead";

export const ChangeContext = createContext();

function App() {
  const [taskChange, setTaskChange] = useState({
    state: "all",
    change: false,
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (taskChange.state === "all") {
      fetch("http://localhost:4069/tasks")
        .then((res) => res.json())
        .then((data) => setTasks(data));
      //
    } else if (taskChange.state === "active" || "completed") {
      fetch(`http://localhost:4069/tasks/${taskChange.state}`)
        .then((res) => res.json())
        .then((data) => setTasks(data));
    }
  }, [taskChange]);

  return (
    <div className="app">
      <ChangeContext.Provider value={[taskChange, setTaskChange, tasks]}>
        <div className="box">
          <h1>Create Your Tasks</h1>
          <CreateTask />

          <section className="tasks">
            <h2>Tasks</h2>
            <TaskHead />
            {tasks.map((task, index) => (
              <Task key={task._id} index={index} task={task} />
            ))}
          </section>
        </div>
      </ChangeContext.Provider>
    </div>
  );
}

export default App;
