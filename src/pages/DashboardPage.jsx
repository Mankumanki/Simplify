import { useEffect, useMemo } from "react";
import DataCount from "../components/Dashboard/DataCount";
import { useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";

import taskIcon from "../assets/task.webp";
import completeIcon from "../assets/checklist.webp";
import pendingIcon from "../assets/clipboard.webp";
import overdueIcon from "../assets/overdue.webp";

const initialData = [
  { title: "Total Tasks", img: taskIcon, count: 0 },
  { title: "Pending Tasks", img: pendingIcon, count: 0 },
  { title: "Completed Tasks", img: completeIcon, count: 0 },
  { title: "Overdue Tasks (Incomplete)", img: overdueIcon, count: 0 },
];

function DashboardPage() {
  const task = useSelector((state) => state.taskReducer);

  let data = initialData;
  data = useMemo(() => {
    const total = task.tasks.length;
    const curDate = new Date().toDateString();
    const complete = task.tasks.reduce((acc, node) => {
      return acc + (node.status == "Completed");
    }, 0);

    const pending = task.tasks.reduce((acc, node) => {
      return (
        acc +
        (new Date(node.dueDate) >= new Date(curDate) &&
          node.status == "Pending")
      );
    }, 0);

    const elapsed = task.tasks.reduce((acc, node) => {
      return (
        acc +
        (new Date(node.dueDate) < new Date(curDate) && node.status == "Pending")
      );
    }, 0);

    const countData = [total, pending, complete, elapsed];

    const newData = data.map((node, idx) => {
      return { ...node, count: countData[idx] };
    });

    return newData;
  }, [task.tasks]);

  return (
    <main className="h-fit min-[992px]:grow-1 grid grid-cols-4 max-[1800px]:grid-cols-2 max-[576px]:grid-cols-1 max-[768px]:p-4 max-[768px]:gap-2 gap-4 p-6">
      {data.map((node) => {
        return <DataCount key={node.title} taskDetails={node} />;
      })}
      <div className="col-span-full w-full h-[500px] max-[576px]:h-[400px] rounded-md relative">
        <div className="absolute w-full h-full bg-white opacity-40"></div>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: [...data.map((val) => val.title)],
            },
          ]}
          series={[
            {
              label: "Task Distribution",
              data: [...data.map((val) => val.count)],
            },
          ]}
        />
      </div>
    </main>
  );
}

export default DashboardPage;
