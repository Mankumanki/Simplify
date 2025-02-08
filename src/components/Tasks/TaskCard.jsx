import { useDispatch } from "react-redux";
import { Link } from "react-router";

function TaskCard({ taskType, data }) {
  const dispatch = useDispatch();

  function dateFormat(date) {
    if (date) {
      const dateConv = new Date(date);
      const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return formatter.format(dateConv);
    }
    return "";
  }

  return (
    <div className="w-full h-full rounded-md relative justify-between bg-white flex flex-col gap-4 p-4 animate-pop delay-100">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${taskType}`}></div>
          <p className="font-medium text-lg text-slate-700 ">{data.title}</p>
        </div>
      </div>

      <p>
        {data.description.length > 100
          ? data.description.substr(0, 100).padEnd(103, ".")
          : data.description}
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">
            Due: {dateFormat(data.dueDate)}
          </p>
          {data.completedDate != "" ? (
            <p className="text-sm font-medium text-gray-700">
              Completed: {dateFormat(data.completedDate)}
            </p>
          ) : null}
        </div>

        <div className="flex justify-between items-center flex-wrap">
          <p
            className={`font-medium p-2 text-white ${taskType} rounded-md text-sm`}
          >
            {data.status}
          </p>
          <div className="flex justify-end gap-4 text-gray-500">
            <Link
              to={{
                pathname: `/tasks/${data.id}`,
              }}
              aria-label="edit-task"
              role="button"
              className="hover:cursor-pointer"
            >
              {/* Come back for Linking to a param route */}
              <i className="fas fa-external-link-alt"></i>
            </Link>
            <a
              aria-label="delete-task"
              role="button"
              className="hover:cursor-pointer "
              onClick={() => {
                dispatch({
                  type: "removeLocalStorage",
                  payload: { id: data.id },
                });
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
