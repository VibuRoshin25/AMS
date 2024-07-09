import classNames from "classnames";
import { GrEdit } from "react-icons/gr";

const EditButton = ({ onClick, className, disable }) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={classNames(
        " font-bold p-2 rounded-full",
        { className },
        { "text-sky-500 hover:bg-sky-500 hover:text-white": !disable },
        { "text-gray-500": disable }
      )}
    >
      <GrEdit size={20} />
    </button>
  );
};

export default EditButton;
