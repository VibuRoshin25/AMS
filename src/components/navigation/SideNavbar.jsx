import { HiMenu } from "react-icons/hi";
import classNames from "classnames";
import NavAnchor from "./NavAnchor";
import logo from "../../assets/flipopay-logo.png";

const SideNavbar = ({ isExpanded, toggleNavbar }) => {
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
            "flex items-center justify-center h-16": isExpanded,
            "flex justify-center items-center h-16": !isExpanded,
          })}
        >
          <button
            className="text-black focus:outline-none"
            onClick={toggleNavbar}
          >
            <HiMenu size={24} />
          </button>
          {isExpanded && (
            <img
              src={logo}
              alt="Logo"
              className="justify-start h-16 py-4 px-2 ml-2"
            />
          )}
        </div>
        {isExpanded && (
          <div className="mt-6 flex flex-col items-start">
            <div className="flex justify-center items-center w-full mb-4"></div>
            <NavAnchor href="/">Dashboard</NavAnchor>
            <NavAnchor href="/shift-policies">Shift Policies</NavAnchor>
            <NavAnchor href="/leave-policies">Leave Policies</NavAnchor>
            <NavAnchor href="/holidays">Holidays</NavAnchor>
          </div>
        )}
      </div>
      <div className="transition-all duration-300 flex-1 ml-16">
        {/** Empty div to push the content by the sidebar width */}
      </div>
    </div>
  );
};

export default SideNavbar;
