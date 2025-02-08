import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initalForm = {
  id: "",
  title: "",
  description: "",
  dueDate: "",
  createdDate: "",
  completedDate: "",
  status: "Pending",
};

function TaskForm({ setShowForm }) {
  const [formData, setFormData] = useState(initalForm);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(0);
  const dispatch = useDispatch();
  const task = useSelector((state) => state.taskReducer.tasks);

  function checkDateValidity(e) {
    setError("");
    const stringcurDate = new Date().toDateString();
    const curDate = new Date(stringcurDate);
    const dueDate = new Date(e.target.value);
    if (dueDate < curDate) {
      setError("Due date should be greater than current date");
      setFormData({ ...formData, dueDate: "" });
    } else {
      setFormData({ ...formData, dueDate: e.target.value });
    }
  }

  function dispatchData(e) {
    e.preventDefault();
    const curDate = new Date().toDateString();
    const lastTask = task[task.length - 1];
    const id = parseInt(lastTask.id.split("_")[1]);
    const formPayload = {
      id: `Task_${id + 1}`,
      title: formData.title,
      description: formData.description,
      dueDate: new Date(formData.dueDate).toDateString(),
      createdDate: curDate,
      completedDate: completed ? curDate : "",
      status: completed ? "Completed" : "Pending",
    };

    dispatch({ type: "addLocalStorage", payload: formPayload });
    setFormData(initalForm);
  }

  return (
    <form
      onSubmit={(e) => {
        dispatchData(e);
      }}
      className="max-w-[25rem] h-fit relative top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] flex flex-col gap-4 z-10 p-4 rounded-xl shadow-2xl animate-pop"
    >
      <div className="h-full w-full bg-slate-800 opacity-70 top-0 left-0 absolute rounded-xl -z-10"></div>
      <a
        role="button"
        className="hover:cursor-pointer"
        onClick={() => {
          setShowForm(false);
        }}
      >
        <i className="absolute right-4 top-4 text-lg text-white fa fa-close"></i>
      </a>
      <p className="text-white text-xl font-medium max-[576px]:text-lg">
        Create Task
      </p>
      <div className="flex flex-col gap-2 max-[576px]:text-sm">
        <label htmlFor="title" className="text-white">
          Title
        </label>
        <input
          id="title"
          type="text"
          className={`bg-white p-2 rounded-xl outline-0 border-0 ${
            limit == 60 ? "border-2 border-green-500" : ""
          }`}
          placeholder="eg. Fix main room bulb"
          value={formData.title}
          maxLength="60"
          onChange={(e) => {
            setLimit((limit) => e.target.value.length);
            setFormData({ ...formData, title: e.target.value });
          }}
          required
        ></input>
        <p className="text-white self-end text-sm">{limit}/60</p>
      </div>
      <div className="flex flex-col gap-2 max-[576px]:text-sm">
        <label htmlFor="desc" className="text-white">
          Description
        </label>
        <textarea
          id="desc"
          className="bg-white p-2 rounded-xl outline-0 border-0 resize-none"
          rows="6"
          placeholder="eg. Buy bulb from nearby electric shop...."
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          required
        ></textarea>
      </div>

      <div className="flex gap-2 max-[576px]:text-sm items-center">
        <input
          id="markComplete"
          className="bg-white w-fit p-2 text-sm rounded-3xl outline-0 border-0 hover:cursor-pointer"
          type="checkbox"
          checked={completed}
          onChange={() => {
            setCompleted(!completed);
          }}
        ></input>
        <label htmlFor="markComplete" className="text-white">
          Mark Complete
        </label>
      </div>

      <div className="flex flex-col gap-2 max-[576px]:text-sm ">
        <label htmlFor="dueDate" className="text-white">
          Due Date
        </label>
        <input
          id="dueDate"
          className="bg-white w-fit p-2 text-sm rounded-3xl outline-0 border-0"
          type="date"
          value={formData.dueDate}
          onChange={(e) => {
            checkDateValidity(e);
          }}
          required
        ></input>
        {error != "" ? <p className="text-amber-500">* {error}</p> : null}
      </div>

      <button
        type="submit"
        className="self-end w-fit bg-green-600 max-[576px]:text-sm text-white p-2 rounded-md transition-all hover:bg-green-700 hover:scale-90 hover:cursor-pointer"
      >
        <i className="fa-solid fa-plus pr-2"></i>Add Task
      </button>
    </form>
  );
}

export default TaskForm;
