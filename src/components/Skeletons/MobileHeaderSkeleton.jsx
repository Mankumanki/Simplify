import config from "../../config/header-config.json";

function MobileHeaderSkeleton() {
  const HeaderConfig = config.HeaderConfig;

  return (
    <header className="w-full top-0 z-10 sticky h-[5rem] bg-white shadow-md p-2 flex items-center justify-between animate-slideDown">
      <div className="flex gap-1 items-center">
        <div className="aspect-square w-16 self-center bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="aspect-square w-8 self-center bg-gray-200 rounded-md animate-pulse"></div>
    </header>
  );
}

export default MobileHeaderSkeleton;
