function DataCount({ taskDetails }) {
  return (
    <div className="w-full h-[16rem] relative rounded-2xl">
      <div className="absolute w-full h-full bg-white opacity-40 rounded-2xl"></div>
      <div className="z-10 w-full h-full flex flex-col gap-2 justify-center items-center backdrop-blur-lg text-slate-600 rounded-2xl">
        <img
          className="w-10 aspect-square self-center"
          alt={taskDetails.title}
          src={taskDetails.img}
        ></img>
        <p className="text-6xl max-[768px]:text-5xl animate-slideRight">
          {taskDetails.count}
        </p>
        <p className="text-xl font-medium text-center max-[768px]:text-lg">
          {taskDetails.title}
        </p>
      </div>
    </div>
  );
}

export default DataCount;
