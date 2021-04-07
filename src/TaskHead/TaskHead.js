import React, { useContext } from "react";
import { ChangeContext } from "../App";
import "./taskHead.css";

const TaskHead = () => {
  const [taskChange, setTaskChange, tasks] = useContext(ChangeContext);

  const activeTasksLength = tasks.filter((task) => task.completed === false)
    .length;

  const filterTasks = (state) => {
    const newTaskChange = { ...taskChange };
    newTaskChange.state = state;
    setTaskChange(newTaskChange);
  };

  const deleteCompleted = () => {
    fetch("http://localhost:4069/deleteCompleted", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newTaskChange = { ...taskChange };
        newTaskChange.change = !newTaskChange.change;
        setTaskChange(newTaskChange);
      });
  };

  return (
    <div className="task-head">
      <div className="task-first">
        <p>{activeTasksLength > 0 ? activeTasksLength : "x"} items left</p>
      </div>

      <div className="task-state">
        <p onClick={() => filterTasks("all")}>all</p>
        <p onClick={() => filterTasks("active")}>active</p>
        <p onClick={() => filterTasks("completed")}>completed</p>
      </div>

      <div className="task-last">
        <p onClick={deleteCompleted}>clear completed</p>
      </div>
    </div>
  );
};

export default TaskHead;
