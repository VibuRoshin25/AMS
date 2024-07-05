import Header from "./Header";
import SideNavbar from "./navigationComponents/SideNavbar";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";

const PageOutline = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [heightClass, setHeightClass] = useState("h-screen");
  const contentRef = useRef(null);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const updateHeightClass = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const screenHeight = window.innerHeight;
        console.log("Content Height:", contentHeight);
        console.log("Screen Height:", screenHeight);
        if (contentHeight > screenHeight) {
          setHeightClass("h-full");
        } else {
          setHeightClass("h-screen");
        }
      }
    };

    updateHeightClass();
    window.addEventListener("resize", updateHeightClass);
    return () => window.removeEventListener("resize", updateHeightClass);
  }, []);

  useEffect(() => {
    console.log("Height Class Updated:", heightClass);
  }, [heightClass]);

  return (
    <>
      <div className="flex flex-row w-full">
        <SideNavbar isExpanded={isExpanded} toggleNavbar={toggleNavbar} />
        <div
          ref={contentRef}
          className={classNames(
            "flex flex-col items-center relative grow",
            heightClass
          )}
        >
          {isExpanded && (
            <div className="absolute inset-0 bg-black/30 z-10"></div>
          )}
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default PageOutline;
