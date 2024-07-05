import { getTime } from "../utils/dateMethods";

const Punch = ({ label, value }) => {
  return (
    <div className="text-center h-12">
      <p className="font-bold text-lg text-sky-500">{label}</p>
      <p className="block text-black text-sm">
        {value ? getTime(value) : "--:--"}
      </p>
    </div>
  );
};

export default Punch;
