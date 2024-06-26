import Header from "./Header";

const PageOutline = ({ children }) => {
  return (
    <>
      <div>
        <div className="relative">
          <div className="flex flex-col justify-center items-center backdrop-blur-xl relative ">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageOutline;
