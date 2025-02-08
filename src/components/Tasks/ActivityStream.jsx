import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function ActivityStream({ taskDetails }) {
  const [activity, setActivity] = useState([]);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setActivity(taskDetails?.timeline ? taskDetails?.timeline : []);
  }, [taskDetails]);

  function handleActivity(e) {
    e.preventDefault();
    let id = 1;
    if (activity.length != 0) {
      id = parseInt(activity[activity.length - 1]?.id?.split("_")[1]);
    }
    const newDetails = {
      ...taskDetails,
      timeline: [...activity, { id: `Act_${id + 1}`, msg: msg }],
    };
    dispatch({ type: "updateLocalStorage", payload: newDetails });
    setMsg("");
  }

  return (
    <div className="flex flex-col h-[25rem] grow-1 w-full gap-6 p-4 bg-white rounded-md shadow-md animate-pop">
      <div className="grow-1 w-full flex flex-col gap-2 overflow-y-auto">
        {activity.map((node) => {
          return (
            <div key={node?.id} className="flex gap-4 w-full animate-pop">
              <div className="flex flex-col items-center">
                <i className="fa-solid fa-message text-2xl text-blue-600"></i>
                <div className="w-0.5 h-10 bg-blue-600 grow-1"></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-roboto text-slate-800 max-[576px]:text-sm break-all">
                  {node?.msg}
                </p>
                <p className="text-xs">{new Date().toDateString()}</p>
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="w-full h-fit bottom-0 sticky"
        onSubmit={(e) => {
          handleActivity(e);
        }}
      >
        <textarea
          id="desc"
          className="w-full bg-gray-200 p-2 rounded-md outline-0 border-0 resize-none"
          rows="2"
          placeholder="eg. Started the work..."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          required
          disabled={taskDetails?.status == "Completed" ? true : false}
        ></textarea>
        <button
          className="absolute top-[50%] -translate-y-[50%] right-[1.5rem] hover:cursor-pointer"
          type="submit"
          disabled={taskDetails?.status == "Completed" ? true : false}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

export default ActivityStream;
