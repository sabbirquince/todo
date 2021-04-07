import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ChangeContext } from "../App";

const CreateTask = () => {
  const [taskChange, setTaskChange] = useContext(ChangeContext);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const newData = { ...data };
    newData.completed = false;

    fetch("http://localhost:4069/createTask", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    }).then((result) => {
      const newTaskChange = { ...taskChange };
      newTaskChange.change = !newTaskChange.change;
      setTaskChange(newTaskChange);
    });
  };

  return (
    <div>
      <form className="create-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <input
            placeholder="task"
            className="todo-input"
            {...register("name", { required: true })}
          />

          {/* <input
            type="date"
            className="todo-input"
            {...register("date", { required: true })}
          /> */}
        </div>

        <input className="create-btn" type="submit" value="Create" />
      </form>
    </div>
  );
};

export default CreateTask;
