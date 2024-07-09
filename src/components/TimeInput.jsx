import { useState } from "react";
import TimePicker from "@asphalt-react/time-picker";
import { getTime } from "../utils/dateMethods";

const TimeInput = ({ label, value, onChange }) => {
  const [time, setTime] = useState(value);

  const handleError = (error) => {
    console.log(error);
  };

  const handleTimeChange = ({ time }) => {
    setTime(time);
    onChange(getTime(time));
  };

  return (
    <div className="flex flex-col items-center w-full mb-4">
      <label className="w-full block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <TimePicker
        onTimeChange={handleTimeChange}
        value={time}
        className="w-full"
        onError={(error) => handleError(error)}
      />
    </div>
  );
};

export default TimeInput;
