import { useState, useEffect } from "react";
import { getDate, getTime, calculateDuration } from "../../utils/dateMethods";
import { db } from "../../firebase/firebaseConfig";
import { getDoc, setDoc, collection, doc } from "firebase/firestore";
// import { isWithinRadius } from "../utils/locationMethods";
import dayjs from "dayjs";
import { calculateStatus } from "../../utils/statusMethods";
import Punch from "../Punch";

const UserPunchin = ({ userId }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);
  const [status, setStatus] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchAttendanceRecord = async () => {
      try {
        const currentTime = new Date();
        const formattedDate = getDate(currentTime);
        const docRef = doc(db, "attendance", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data[formattedDate]) {
            const record = data[formattedDate];
            if (record.punchin && !record.punchout) {
              setPunchInTime(dayjs(record.punchin, "hh:mm A").toDate());
              setIsPunchedIn(true);
            } else if (record.punchin && record.punchout) {
              setPunchInTime(dayjs(record.punchin, "hh:mm A").toDate());
              setPunchOutTime(dayjs(record.punchout, "hh:mm A").toDate());
              setTotalDuration(record.duration);
              setStatus(record.status);
              setIsButtonDisabled(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching attendance record: ", error);
      }
    };

    fetchAttendanceRecord();
  }, [userId]);

  const handlePunch = async () => {
    try {
      const currentTime = new Date();
      const formattedDate = getDate(currentTime);
      const formattedTime = getTime(currentTime);
      const collectionRef = collection(db, "attendance");
      const docRef = doc(collectionRef, userId);
      // const validLocation = await isWithinRadius();

      if (!isPunchedIn) {
        setPunchInTime(currentTime);
        setTotalDuration(null);
        setIsPunchedIn(true);

        const data = {
          [formattedDate]: {
            punchin: formattedTime,
            // onSite: validLocation ? true : false,
          },
        };

        await setDoc(docRef, data, { merge: true });
      } else {
        setPunchOutTime(currentTime);
        const duration = calculateDuration(punchInTime, currentTime);
        const durationInHours = duration / 60;
        const currentStatus = calculateStatus(durationInHours);
        setTotalDuration(duration);
        setStatus(currentStatus);
        setIsPunchedIn(false);
        setIsButtonDisabled(true);

        const updateData = {
          [formattedDate]: {
            punchout: formattedTime,
            duration: duration,
            status: currentStatus,
          },
        };
        await setDoc(docRef, updateData, { merge: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap  items-center justify-center bg-white w-full h-full p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col items-center justify-between w-full h-full mb-6">
        <div className="flex flex-row gap-20">
          <Punch value={punchInTime} label="Punch In" />
          <Punch value={punchOutTime} label="Punch Out" />
        </div>
        {totalDuration && (
          <div className="mt-6 text-center">
            <p className="text-sky-500 font-bold text-lg">Total Duration</p>
            <a className="block text-black text-sm">{totalDuration}</a>
          </div>
        )}
        {status && (
          <div className="mt-4 text-center">
            <p className="text-sky-500 font-bold text-lg">Status</p>
            <a className="block text-black text-sm">{status}</a>
          </div>
        )}
        <button
          className="bg-gray-900 text-white w-28 h-10 rounded-full hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          onClick={handlePunch}
          disabled={isButtonDisabled}
        >
          {isPunchedIn ? "Punch Out" : "Punch In"}
        </button>
      </div>
    </div>
  );
};

export default UserPunchin;
