import icon from "../../assets/icon.webp";
import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router";

import config from "../../config/header-config.json";

function MobileHeader() {
  const [showPanel, setPanel] = useState(-1);

  function TogglePanel(toggle) {
    if (toggle) {
      setPanel(1);
    } else {
      setPanel(0);
    }
  }

  return (
    <>
      <header className="w-full top-0 z-20 sticky h-[5rem] bg-white shadow-md flex flex-col">
        <div className="flex justify-between items-center p-2">
          <div className="flex gap-1 font-mono items-center">
            <img
              className="aspect-square w-16 self-center"
              src={icon}
              alt="Company Logo"
            ></img>
            <p className="text-lg text-gray-700 font-semibold font-Monsterrat">
              Simplify
            </p>
          </div>
          <Hamburger
            size={20}
            color="#364153"
            toggled={showPanel == -1 ? false : showPanel}
            onToggle={(toggle) => {
              TogglePanel(toggle);
            }}
          />
        </div>
        {/*Side Bar*/}
        <SidePanel showPanel={showPanel} setPanel={setPanel} />
      </header>
    </>
  );
}

function SidePanel({ showPanel, setPanel }) {
  const HeaderConfig = config.HeaderConfig;

  return (
    <nav
      className={`w-[16rem] max-[300px]:max-w-[14rem] panel-height sticky top-0 overflow-y-auto bg-white shadow-md p-2 box-border flex flex-col gap-10 font-medium ${
        showPanel == 1
          ? "animate-slideRight"
          : showPanel == 0
          ? "animate-slideLeft"
          : "hidden"
      }`}
    >
      <div className="flex flex-col w-full gap-2 content-center text-gray-700 mt-5">
        {HeaderConfig.map((node) => {
          return (
            <Link
              key={node.title}
              to={node.url}
              className="p-2 w-full rounded-md hover:bg-amber-400 transition-colors"
              onClick={() => {
                setPanel(false);
              }}
            >
              <i className={`${node.icon} pr-5`}></i>
              {node.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileHeader;
