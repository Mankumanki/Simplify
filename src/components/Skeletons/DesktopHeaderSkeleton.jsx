import config from "../../config/header-config.json";

function DesktopHeaderSkeleton() {
  const HeaderConfig = config.HeaderConfig;

  return (
    <header className="min-w-[16rem] overflow-auto h-dvh z-10 bg-white shadow-md p-2 box-border flex flex-col gap-10 animate-slideRight">
      <div className="aspect-square w-16 self-center bg-gray-200 rounded-md animate-pulse"></div>
      <nav className="w-full flex flex-col gap-2 content-center">
        {HeaderConfig.map((node, idx) => {
          return (
            <div
              key={idx}
              className="w-full p-2 rounded-md h-10 bg-gray-200 animate-pulse"
            ></div>
          );
        })}
      </nav>
    </header>
  );
}

export default DesktopHeaderSkeleton;
