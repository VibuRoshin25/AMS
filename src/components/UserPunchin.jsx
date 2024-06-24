import { useState } from "react";
<<<<<<< HEAD
import { getDate, getTime, calculateDuration } from "../utils/dateMethods";
import { db } from "./firebase/firebase";
import { setDoc, collection, doc } from "firebase/firestore";
=======
>>>>>>> dev

const UserPunchin = ({ sid }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

<<<<<<< HEAD
  const handlePunch = async () => {
    try {
      const id = "55";
      const currentTime = new Date();
      const formattedDate = getDate(currentTime);
      const formattedTime = getTime(currentTime);
      const collectionRef = collection(db, "attendance");
      const docRef = doc(collectionRef, id);

      if (!isPunchedIn) {
        setPunchInTime(currentTime);
        setTotalDuration(null);
        setIsPunchedIn(true);

        const data = {
          [getDate(currentTime)]: {
            punchin: formattedTime,
          },
        };

        await setDoc(docRef, data, { merge: true });
      } else {
        setPunchOutTime(currentTime);
        const duration = calculateDuration(punchInTime, currentTime);
        setTotalDuration(duration);
        setIsPunchedIn(false);
        setIsButtonDisabled(true);

        const updateData = {
          [formattedDate]: {
            punchout: formattedTime,
            duration: duration,
          },
        };
        await setDoc(docRef, updateData, { merge: true });
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
=======
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
    <div className="flex flex-col items-center justify-center w-1/3 h-auto bg-gradient-to-r  p-6 mt-4 rounded-lg shadow-lg">
      <div className="flex justify-between w-full mb-6">
        <div className="text-center">
          <p className=" font-bold text-lg text-sky-500">Punch In</p>
          <a className="block text-black text-sm">{formatTime(punchInTime)}</a>
        </div>
        <div className="text-center">
          <p className=" font-bold text-lg text-sky-500">Punch Out</p>
          <a className="block text-black text-sm">{formatTime(punchOutTime)}</a>
>>>>>>> dev
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
