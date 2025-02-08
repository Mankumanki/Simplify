import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import TaskEditCard from "./TaskEditCard";
import NoTask from "../Skeletons/NoTask";
import ActivityStream from "./ActivityStream";

function TaskEditForm() {
  const param = useParams();
  const task = useSelector((state) => state.taskReducer);
  const [taskDetails, setTaskDetails] = useState(undefined);
  const [activeBar, setActiveBar] = useState("details");

  useEffect(() => {
    const tasks = task.tasks;
    const details = tasks.find((value) => {
      return value.id == param.taskID;
    });
    setTaskDetails(details);
  }, [task.tasks]);

  return (
    <main className="grow-1 max-[768px]:p-4 p-6 flex flex-col gap-6">
      <p className="text-3xl font-medium font-sans text-slate-700">
        {taskDetails?.title}
      </p>
      <div className="flex gap-4 items-center">
        <a
          role="button"
          aria-label="View Task Details Bar"
          onClick={() => {
            setActiveBar("details");
          }}
          className={`h-fit text-black bg-white rounded-md hover:cursor-pointer px-2 py-1 flex gap-2 items-center hover:border-b-2 hover:border-blue-600 group ${
            activeBar == "details" ? "border-b-2 border-blue-600 shadow-md" : ""
          }`}
        >
          <i
            className={`fa-solid fa-circle-info transition-colors group-hover:text-blue-500 ${
              activeBar == "details" ? "text-blue-500" : ""
            }`}
          ></i>
          Task Details
        </a>
        <a
          role="button"
          aria-label="Activity Bar"
          onClick={() => {
            setActiveBar("timeline");
          }}
          className={`h-fit text-black bg-white rounded-md hover:cursor-pointer px-2 py-1 flex gap-2 items-center hover:border-b-2 hover:border-blue-600 group ${
            activeBar == "timeline"
              ? "border-b-2 border-blue-600 shadow-md"
              : ""
          }`}
        >
          <i
            className={`fa-solid fa-timeline transition-colors group-hover:text-blue-500 ${
              activeBar == "timeline" ? "text-blue-500" : ""
            }`}
          ></i>
          Timeline
        </a>
      </div>
      {activeBar == "details" && taskDetails ? (
        <TaskEditCard taskDetails={taskDetails} />
      ) : activeBar == "timeline" && taskDetails ? (
        <ActivityStream taskDetails={taskDetails} />
      ) : (
        <NoTask />
      )}
    </main>
  );
}

export default TaskEditForm;
