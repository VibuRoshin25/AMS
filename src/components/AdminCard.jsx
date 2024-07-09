import { BsPersonFill } from "react-icons/bs";

const AdminCard = ({ className, label, value }) => {
  return (
    <>
      <div
        className={`${className} bg-white shadow-lg flex flex-col justify-center gap-4 p-4 rounded-lg`}
      >
        <BsPersonFill className=" rounded-lg" size={50} />
        <div className="flex flex-col items-end ">
          <h3 className="text-xl font-semibold mb-2">{label}</h3>
          <p className="text-lg">{value}</p>
        </div>
      </div>
    </>
  );
};

export default AdminCard;
