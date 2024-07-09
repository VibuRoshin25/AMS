const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen  text-sky-600">
      <div
        className=" inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
      <p>Loading</p>
    </div>
  );
};

export default Loading;
