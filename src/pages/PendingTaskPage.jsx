import { useMemo, useState } from "react";
import TaskCard from "../components/Tasks/TaskCard";
import { useSelector } from "react-redux";
import useDataFilter from "../hooks/useDataFilter";
import useSortingFilter from "../hooks/useSortingFilter";
import TaskForm from "../components/TaskForm/TaskForm";
import filterConfig from "../config/filter-config.json";

function PendingTaskPage() {
  const task = useSelector((state) => state.taskReducer);
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const filterData = useMemo(() => {
    let pendingTask = useDataFilter(task.tasks, "Pending Tasks");
    return useSortingFilter(pendingTask, filter);
  }, [task.tasks, filter]);

  return (
    <>
      {showForm ? (
        <div className={`w-full h-dvh fixed z-20  backdrop-blur-sm p-4`}>
          <TaskForm totalTask={task.tasks.length} setShowForm={setShowForm} />
        </div>
      ) : null}

      <main className="grow-1 max-[768px]:p-4 p-6">
        <div className="w-full gap-6 flex flex-col">
          <div className="w-full flex justify-between items-center rounded-md bg-white py-2 px-4 shadow-md relative">
            <a
              aria-label="filter-option"
              role="button"
              className="hover:cursor-pointer transition-all hover:bg-gray-200 py-1 px-2 box-border rounded-md"
              onClick={() => {
                setShowFilter(!showFilter);
              }}
            >
              <i className="fa-solid fa-filter text-lg max-[576px]:text-sm text-slate-600"></i>
            </a>

            {showFilter ? (
              <div
                id="filterBtn"
                className="min-w-[10rem] text-white max-h-[10rem] overflow-y-auto bg-gray-700 z-10 absolute top-8 left-10 shadow-xl flex flex-col items-center rounded-md p-2 animate-pop"
              >
                {filterConfig?.filters.map((node) => {
                  return (
                    <a
                      role="button"
                      key={node}
                      className="w-full p-2 text-sm hover:cursor-pointer hover:bg-slate-600 transition-colors"
                      onClick={() => {
                        setFilter(node);
                        setShowFilter(!showFilter);
                      }}
                    >
                      {node}
                    </a>
                  );
                })}
              </div>
            ) : null}

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

export default PendingTaskPage;
