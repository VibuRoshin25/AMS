const Table = ({ children }) => {
  return (
    <>
      <div className="shadow-lg rounded-lg w-[95%] flex flex-col justify-center items-center mt-12">
        <table className="min-w-full bg-white ">{children}</table>
      </div>
    </>
  );
};

export default Table;
