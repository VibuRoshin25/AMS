import Header from "./Header";
import Footer from "./Footer";
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

  return (
    <>
      <div className="flex flex-row w-full bg-slate-200">
        <SideNavbar isExpanded={isExpanded} toggleNavbar={toggleNavbar} />
        <div
          ref={contentRef}
          className={classNames(
            "flex flex-col items-center justify-stretch h-full relative grow",
            heightClass
          )}
        >
          {isExpanded && (
            <div className="absolute inset-0 bg-black/30 z-10"></div>
          )}
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PageOutline;
