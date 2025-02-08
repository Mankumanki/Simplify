import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function TaskEditCard({ taskDetails }) {
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState("");

  useEffect(() => {
    const curDateTime = new Date().toDateString();
    const curDate = new Date(curDateTime);
    const dueDate = new Date(taskDetails?.dueDate);

    const colorCode =
      taskDetails?.status == "Completed"
        ? "bg-green-600"
        : taskDetails?.status == "Pending" && dueDate >= curDate
        ? "bg-yellow-400"
        : "bg-red-600";
    setState(colorCode);
  }, [taskDetails]);

  return edit ? (
    <TaskCardEditable
      state={state}
      setEdit={setEdit}
      taskDetails={taskDetails}
    />
  ) : (
    <TaskCardNotEdit
      setEdit={setEdit}
      state={state}
      taskDetails={taskDetails}
    />
  );
}

function TaskCardEditable({ state, setEdit, taskDetails }) {
  const [limit, setLimit] = useState(0);
  const [newDetails, setNewDetails] = useState(taskDetails);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function dateFormat(date) {
    if (date) {
      const dateConv = new Date(date);
      const formatter = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return formatter.format(dateConv);
    }
    return "";
  }

  function checkDateValidity(e) {
    setError("");
    const stringcurDate = new Date().toDateString();
    const curDate = new Date(stringcurDate);
    const dueDate = new Date(e.target.value);
    if (dueDate < curDate) {
      setError("Due date should be greater than current date");
      setNewDetails({ ...newDetails, dueDate: "" });
    } else {
      setNewDetails({ ...newDetails, dueDate: e.target.value });
    }
  }

  function updateChanges(e) {
    e.preventDefault();
    const curDate = new Date().toDateString();

    const formPayload = {
      id: newDetails.id,
      title: newDetails.title,
      description: newDetails.description,
      dueDate: new Date(newDetails.dueDate).toDateString(),
      createdDate: newDetails.createdDate,
      completedDate: completed ? curDate : newDetails.completedDate,
      status: completed ? "Completed" : newDetails.status,
    };

    if (newDetails?.timeline) {
      formPayload.timeline = newDetails?.timeline;
    }
    dispatch({ type: "updateLocalStorage", payload: formPayload });
    setEdit(false);
  }

  return (
    <form
      onSubmit={(e) => {
        updateChanges(e);
      }}
      className="flex flex-col h-fit w-full gap-6 p-4 bg-white rounded-md shadow-md animate-pop relative"
    >
      <button
        type="button"
        onClick={() => {
          setEdit(false);
        }}
        className="w-fit self-end px-2 py-1 bg-blue-600 rounded-md text-white absolute hover:cursor-pointer flex items-center "
      >
        <i className="fa fa-close pr-2 text-xs"></i>Cancel
      </button>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${state}`}></div>
          <p className="font-medium text-lg text-slate-700 ">
            {taskDetails?.status}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Created At: {taskDetails?.createdDate}
        </p>
      </div>
      {/*Title input */}
      <div className="flex flex-col gap-2 max-[576px]:text-sm">
        <label htmlFor="title" className="text-lg font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          className={`bg-slate-300 p-2 rounded-md outline-0 border-0 ${
            limit == 60 ? "border-2 border-green-500" : ""
          }`}
          placeholder="eg. Fix main room bulb"
          value={newDetails?.title}
          maxLength="60"
          required
          autoFocus
          onChange={(e) => {
            setLimit(e.target.value.length);
            setNewDetails({ ...newDetails, title: e.target.value });
          }}
        ></input>
        <p className="self-end text-sm">{limit}/60</p>
      </div>

      {/* Description Input*/}
      <div className="flex flex-col gap-2 max-[576px]:text-sm">
        <label htmlFor="desc" className="text-lg font-medium">
          Description
        </label>
        <textarea
          id="desc"
          className="bg-slate-300 p-2 rounded-md outline-0 border-0 resize-none"
          rows="6"
          placeholder="eg. Buy bulb from nearby electric shop...."
          value={newDetails?.description}
          onChange={(e) => {
            setNewDetails({ ...newDetails, description: e.target.value });
          }}
          required
        ></textarea>
      </div>

      {/* Mark Task Complete */}
      <div className="flex gap-2 max-[576px]:text-sm items-center">
        <input
          id="markComplete"
          className="bg-slate-300 w-fit p-2 text-sm rounded-3xl outline-0 border-0 hover:cursor-pointer"
          type="checkbox"
          checked={completed}
          onChange={() => {
            setCompleted(!completed);
          }}
        ></input>
        <label htmlFor="markComplete">Mark Complete</label>
      </div>

      {/*Due Date*/}
      <div className="flex flex-col gap-2 max-[576px]:text-sm ">
        <label htmlFor="dueDate" className="text-lg font-medium">
          Due Date
        </label>
        <input
          id="dueDate"
          className="bg-slate-300 w-fit p-2 text-sm rounded-3xl outline-0 border-0"
          type="date"
          value={dateFormat(newDetails?.dueDate)}
          onChange={(e) => {
            checkDateValidity(e);
          }}
          required
        ></input>
        {error != "" ? <p className="text-amber-500">* {error}</p> : null}
      </div>

      <button
        type="submit"
        className="w-fit self-end px-2 py-1 bg-blue-600 rounded-md text-white hover:cursor-pointer flex items-center "
      >
        <i className="fas fa-save pr-2 text-xs"></i>Save
      </button>
    </form>
  );
}

function TaskCardNotEdit({ state, taskDetails, setEdit }) {
  return (
    <div className="flex flex-col h-fit w-full gap-10 p-4 bg-white rounded-md shadow-md animate-pop relative">
      {taskDetails?.status != "Completed" ? (
        <button
          onClick={() => {
            setEdit(true);
          }}
          className="w-fit self-end px-2 py-1 bg-blue-600 rounded-md text-white absolute hover:cursor-pointer flex items-center "
        >
          <i className="fas fa-edit pr-2 text-xs"></i>Edit
        </button>
      ) : null}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${state}`}></div>
          <p className="font-medium text-lg text-slate-700 ">
            {taskDetails?.status}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          Created At: {taskDetails?.createdDate}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xl font-medium">Description</p>
        <p className="max-[576px]:text-sm ">{taskDetails?.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">
            Due Date: {taskDetails?.dueDate}
          </p>
          {taskDetails?.completedDate != "" ? (
            <p className="text-sm font-medium text-gray-700">
              Completed: {taskDetails?.completedDate}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TaskEditCard;
