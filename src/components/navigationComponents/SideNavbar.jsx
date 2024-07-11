import { HiMenu } from "react-icons/hi";
import {
  RxDashboard,
  RxTimer,
  RxCalendar,
  RxReader,
  RxTable,
} from "react-icons/rx";
import classNames from "classnames";
import NavAnchor from "./NavAnchor";
import logo from "../../assets/flipopay-logo-bw.png";

const SideNavbar = ({ isExpanded, toggleNavbar }) => {
  return (
    <div className="flex">
      <div
        className={classNames(
          "bg-sky-500 px-4 text-white h-screen transition-all duration-300 fixed z-50",
          { "w-68": isExpanded, "w-16": !isExpanded }
        )}
      >
        <div
          className={classNames("flex h-16", {
            " items-center justify-start py-2 px-4": isExpanded,
            "justify-center items-center": !isExpanded,
          })}
        >
          <button
            className="focus:outline-none rounded-full p-2 hover:bg-black hover:bg-opacity-10"
            onClick={toggleNavbar}
          >
            <HiMenu size={24} />
          </button>
          {isExpanded && (
            <img
              src={logo}
              alt="Logo"
              className="justify-start h-16 p-4 ml-2"
            />
          )}
        </div>
        {isExpanded && (
          <div className=" mt-6 flex flex-col">
            <div className="flex w-full mb-4"></div>
            <NavAnchor href="/">
              <RxDashboard /> Dashboard
            </NavAnchor>
            <NavAnchor href="/reports">
              <RxTable /> Reports
            </NavAnchor>
            <NavAnchor href="/shift-policies">
              <RxTimer />
              Shift-Policies
            </NavAnchor>
            <NavAnchor href="/leave-policies">
              <RxReader />
              Leave-Policies
            </NavAnchor>
            <NavAnchor href="/holidays">
              <RxCalendar />
              Holidays
            </NavAnchor>
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
