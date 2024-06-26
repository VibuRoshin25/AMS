import { useState } from "react";

const UserPunchin = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePunch = () => {
    const currentTime = new Date();
    if (!isPunchedIn) {
      setPunchInTime(currentTime);
      setPunchOutTime(null);
      setTotalDuration(null);
      setIsPunchedIn(true);
    } else {
      setPunchOutTime(currentTime);
      const duration = calculateTotalDuration(punchInTime, currentTime);
      setTotalDuration(duration);
      setIsPunchedIn(false);
      setIsButtonDisabled(true);
    }
  };

  const calculateTotalDuration = (start, end) => {
    const difference = end - start;
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hours ${minutes} min`;
  };

  const formatTime = (date) => {
    if (!date) return "--";
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex flex-wrap flex-col items-center justify-center h-[317px] bg-white w-1/4 p-6 mt-11 rounded-2xl shadow-lg">
      <div className="flex justify-between w-full mb-6">
        <div className="text-center">
          <p className="font-bold text-lg text-sky-500">Punch In</p>
          <a className="block text-black text-sm">{formatTime(punchInTime)}</a>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg text-sky-500">Punch Out</p>
          <a className="block text-black text-sm">{formatTime(punchOutTime)}</a>
        </div>
      </div>
      <button
        className="bg-gray-900 text-white w-28 h-10 rounded-full hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        onClick={handlePunch}
        disabled={isButtonDisabled}
      >
        {isPunchedIn ? "Punch Out" : "Punch In"}
      </button>
      {totalDuration && (
        <div className="mt-6 text-center">
          <p className="text-sky-500 font-bold text-lg">Total Duration</p>
          <a className="block text-black text-sm">{totalDuration}</a>
        </div>
      )}
    </div>
  );
};

export default UserPunchin;
