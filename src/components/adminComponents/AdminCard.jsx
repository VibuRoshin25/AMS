import { BsPersonFill } from "react-icons/bs";

const AdminCard = ({ textClass, bgClass, label, value }) => {
  return (
    <>
      <div
        className={`${textClass} bg-white shadow-lg flex items-center justify-evenly gap-4 p-4 rounded-lg`}
      >
        <BsPersonFill
          className={`${bgClass} text-white rounded-lg h-1/2 w-1/4`}
        />
        <div className="flex flex-col items-center ">
          <h3 className="text-xl font-semibold mb-2">{label}</h3>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
    </>
  );
};

export default AdminCard;
