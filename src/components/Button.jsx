import classNames from "classnames";
const Button = ({ onClick, className, children, disable }) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={classNames(
        " text-white font-bold py-2 px-4 rounded-full",
        { className },
        { "bg-sky-500 hover:bg-sky-600": !disable },
        { "bg-gray-300": disable === true }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
