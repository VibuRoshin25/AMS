import classNames from "classnames";
const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        " text-white font-bold py-2 px-4 rounded-full bg-sky-500 hover:bg-sky-600",
        { className }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
