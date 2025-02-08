import icon from "../../assets/icon.webp";
import { Link } from "react-router";

import config from "../../config/header-config.json";

function DesktopHeader() {
  const HeaderConfig = config.HeaderConfig;

  return (
    <header className="min-w-[16rem] sticky top-0 overflow-auto h-dvh z-10 bg-white shadow-md p-2 box-border flex flex-col gap-10 font-medium">
      <div className="flex flex-col gap-1 font-mono items-center">
        <img
          className="aspect-square w-18 self-center "
          src={icon}
          alt="Company Logo"
        ></img>
        <p className="text-lg text-gray-700 font-semibold font-Monsterrat">
          Simplify
        </p>
      </div>

      <nav className="w-full flex flex-col gap-2 content-center text-gray-700">
        {HeaderConfig.map((node) => {
          return (
            <Link
              key={node.title}
              to={node.url}
              className="w-full p-2 rounded-md hover:bg-amber-400 transition-colors"
            >
              <i className={`${node.icon} pr-5`}></i>
              {node.title}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default DesktopHeader;
