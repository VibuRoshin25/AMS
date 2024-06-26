import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import classNames from "classnames";
import logo from "../assets/flipopay_logo.png";

const SideNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      <div
        className={classNames(
          "bg-sky-200 text-black h-screen transition-all duration-300 fixed z-50",
          { "w-64": isExpanded, "w-16": !isExpanded }
        )}
      >
        <div
          className={classNames({
            "flex items-center justify-end h-16": isExpanded,
            "flex justify-center items-center h-16": !isExpanded,
          })}
        >
          <button
            className="text-black focus:outline-none"
            onClick={toggleNavbar}
          >
            <HiMenu size={24} />
          </button>
        </div>
        {isExpanded && (
          <div className="mt-6 flex flex-col items-start">
            <div className="flex justify-center items-center w-full mb-4">
              <img src={logo} alt="Logo" className="h-12" />
            </div>
            <a
              href="#"
              className="text-black py-2 px-4 hover:bg-gray-700 w-full text-left text-2xl"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-black py-2 px-4 hover:bg-gray-700 w-full text-left text-2xl"
            >
              Analytics
            </a>
            <a
              href="#"
              className="text-black py-2 px-4 hover:bg-gray-700 w-full text-left text-2xl"
            >
              Settings
            </a>
            <a
              href="#"
              className="text-black py-2 px-4 hover:bg-gray-700 w-full text-left text-2xl"
            >
              Logout
            </a>
          </div>
        )}
      </div>
      <div
        className={classNames("transition-all duration-300 flex-1", {
          // "ml-": isExpanded,
          // "ml-1": !isExpanded,
        })}
      ></div>
    </div>
  );
};

export default SideNavbar;
