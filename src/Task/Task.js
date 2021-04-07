import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./task.css";
import { ChangeContext } from "../App";

const Task = (props) => {
  const [taskChange, setTaskChange] = useContext(ChangeContext);

  const { name, _id, completed } = props.task;
  const index = props.index;

  const handleUpdate = (id) => {
    const completed = { completed: true };

    fetch(`http://localhost:4069/taskUpdate?id=${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(completed),
    })
      .then((res) => res.json())
      .then((data) => {
        const newTaskChange = { ...taskChange };
        newTaskChange.change = !newTaskChange.change;
        setTaskChange(newTaskChange);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4069/taskDelete?id=${id}`, {
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
    <div className="single-task-box">
      <div className="single-task">
        <p className="task-index">{index + 1}</p>

        {completed ? (
          <strike className="task-name">{name}</strike>
        ) : (
          <p className="task-name">{name}</p>
        )}

        <label
          onClick={() => handleUpdate(_id)}
          className={
            completed ? "task-check checked" : "task-check not-checked"
          }
          htmlFor={_id}
        >
          <FontAwesomeIcon icon={faCheckDouble} />
        </label>
      </div>
      <button onClick={() => handleDelete(_id)} className="delete-btn">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default Task;
