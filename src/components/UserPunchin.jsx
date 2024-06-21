import { useState } from "react";
import { getDate, getTime, calculateDuration } from "../utils/dateMethods";
import { db } from "./firebase/firebase";
import { setDoc, collection, doc } from "firebase/firestore";

const UserPunchin = ({ sid }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePunch = async () => {
    try {
      const id = "55";
      const currentTime = new Date();
      const collectionRef = collection(db, "attendance");
      const docRef = doc(collectionRef, id);

      if (!isPunchedIn) {
        console.log(currentTime);
        setPunchInTime(currentTime);
        console.log(getTime(punchInTime).toString);
        setPunchOutTime(null);
        setTotalDuration(null);
        setIsPunchedIn(true);
        console.log("punchInTime", punchInTime);
        const data = {
          [getDate(currentTime)]: {
            punchin: String(getTime(punchInTime)),
            punchout: getTime(punchOutTime),
          },
        };
        console.log(data);
        await setDoc(docRef, data);
      } else {
        setPunchOutTime(currentTime);
        const duration = calculateDuration(punchInTime, currentTime);
        setTotalDuration(duration);
        setIsPunchedIn(false);
        setIsButtonDisabled(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/3 h-auto bg-gradient-to-r p-6 mt-4 rounded-lg shadow-lg">
      <div className="flex justify-between w-full mb-6">
        <div className="text-center">
          <p className="font-bold text-lg text-sky-500">Punch In</p>
          <a className="block text-black text-sm">
            {punchInTime ? getTime(punchInTime) : "--:--"}
          </a>
        </div>
        <div className="text-center">
          <p className="font-bold text-lg text-sky-500">Punch Out</p>
          <a className="block text-black text-sm">
            {punchOutTime ? getTime(punchOutTime) : "--:--"}
          </a>
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
