import { useMemo, useState } from "react";
import TaskCard from "../components/Tasks/TaskCard";
import { useSelector } from "react-redux";
import useDataFilter from "../hooks/useDataFilter";
import TaskForm from "../components/TaskForm/TaskForm";

const Filters = [
  { title: "All Tasks", color: "bg-blue-700" },
  { title: "Pending Tasks", color: "bg-yellow-400" },
  { title: "Completed Tasks", color: "bg-green-600" },
  { title: "Overdue Tasks", color: "bg-red-600" },
];

function TasksPage() {
  const task = useSelector((state) => state.taskReducer);
  const [taskType, setTaskType] = useState("All Tasks");

  const [showForm, setShowForm] = useState(false);

  const filterData = useMemo(() => {
    return useDataFilter(task.tasks, taskType);
  }, [task.tasks, taskType]);

  return (
    <>
      {showForm ? (
        <div className={`w-full h-dvh fixed z-20  backdrop-blur-sm p-4`}>
          <TaskForm setShowForm={setShowForm} />
        </div>
      ) : null}

      <main className="grow-1 max-[768px]:p-4 p-6">
        <div className="w-full gap-6 flex flex-col">
          <div className="w-full flex justify-between items-center rounded-md bg-white p-2 shadow-md">
            <p className="text-lg max-[576px]:text-sm font-roboto">Tasks</p>
            <button
              type="button"
              onClick={() => {
                setShowForm(true);
              }}
              className=" bg-blue-700 max-[576px]:text-sm text-white p-2 rounded-md transition-all hover:bg-blue-800 hover:scale-90 hover:cursor-pointer"
            >
              <i className="fa-solid fa-plus pr-2"></i>Create Task
            </button>
          </div>

          {/* Tasks Filtering Option */}
          <div className="w-full grid grid-cols-4 gap-4 max-[768px]:grid-cols-3 max-[576px]:grid-cols-2 max-[344px]:grid-cols-1">
            {Filters.map((node) => {
              return (
                <a
                  role="button"
                  key={node.title}
                  onClick={() => {
                    setTaskType(node.title);
                  }}
                  className="w-full h-full flex gap-2 shadow-md bg-white rounded-md justify-center p-2 hover:cursor-pointer items-center transition-all hover:scale-90 hover:bg-blue-500 hover:text-white"
                >
                  <div className={`w-4 h-4 rounded-full ${node.color}`}></div>
                  <p className="font-medium text-sm">{node.title}</p>
                </a>
              );
            })}
          </div>

          {/*Task Card*/}
          <div className="w-full grid grid-cols-4 max-[1800px]:grid-cols-2 max-[576px]:grid-cols-1 gap-2">
            {filterData.map((data) => {
              const curDateTime = new Date().toDateString();
              const curDate = new Date(curDateTime);
              const dueDate = new Date(data.dueDate);

              const colorCode =
                data.status == "Completed"
                  ? "bg-green-600"
                  : data.status == "Pending" && dueDate >= curDate
                  ? "bg-yellow-400"
                  : "bg-red-600";

              return (
                <TaskCard key={data.id} taskType={colorCode} data={data} />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default TasksPage;
