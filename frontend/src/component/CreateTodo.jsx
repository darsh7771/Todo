import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function CreateTodo() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    todo_description: "",
    todo_responsible: "",
    todo_priority: "",
    todo_completed: false,
  });
  const onChangeHadler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { todo_description, todo_responsible, todo_priority } = state;
    if (
      todo_description == "" ||
      todo_responsible == "" ||
      todo_priority == ""
    ) {
      alert("Please enter a all field");
    } else {
      const res = await axios.post("http://localhost:4000/todos/add", state);
      if (res) {
        setState({
          todo_description: "",
          todo_responsible: "",
          todo_priority: "",
          todo_completed: false,
        });
        toast.success("Successfully Create todo");
        navigate("/");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div>
      {" "}
      <div style={{ marginTop: 20 }}>
        <h3>Create New Todo</h3>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              name="todo_description"
              value={state.todo_description}
              onChange={(e) => onChangeHadler(e)}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              name="todo_responsible"
              value={state.todo_responsible}
              onChange={(e) => onChangeHadler(e)}
            />
          </div>
          <div className="form-group">
            <label>Task Priority: </label>
            <br />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="priorityLow"
                value="Low"
                checked={state.todo_priority === "Low"}
                onChange={(e) => onChangeHadler(e)}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="priorityMedium"
                value="Medium"
                checked={state.todo_priority === "Medium"}
                onChange={(e) => onChangeHadler(e)}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="todo_priority"
                id="priorityHigh"
                value="High"
                checked={state.todo_priority === "High"}
                onChange={(e) => onChangeHadler(e)}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTodo;
