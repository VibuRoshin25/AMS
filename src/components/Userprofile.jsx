import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import ProfileCard from "./ProfileCard";
import ProfilePhoto from "./ProfilePhoto";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserProfile({ userId }) {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [userData, setUserData] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [presentDays, setPresentDays] = useState(0);
  const [absentDays, setAbsentDays] = useState(0);
  const [availableLeaves, setAvailableLeave] = useState(0);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const attendanceDocRef = doc(db, "attendance", userId);
        const userDocRef = doc(db, "employees", userId);

        const attendanceDocSnap = await getDoc(attendanceDocRef);
        const userDocSnap = await getDoc(userDocRef);

        if (attendanceDocSnap.exists()) {
          const data = attendanceDocSnap.data();
          const attendanceArray = Object.entries(data).map(([id, details]) => ({
            id,
            ...details,
          }));
          setAttendanceRecords(attendanceArray);
        }
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();

          setUserData(data);
          console.log(userData);
        }
      } catch (error) {
        console.error("Error fetching attendance record: ", error);
      }
    };

    fetchRecords();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const totalDaysInMonth = calculateTotalDays(currentMonth, currentYear);
    setTotalDays(totalDaysInMonth);

    const presentCount = attendanceRecords.filter(
      (record) => record.status === "Present"
    ).length;
    setPresentDays(presentCount);

    const absentCount = attendanceRecords.filter(
      (record) => record.status === "Absent"
    ).length;
    setAbsentDays(absentCount);

    setAvailableLeave(20);
  }, []);

  const calculateTotalDays = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const pieData = {
    labels: ["Present Days", "Absent Days", "Total Days"],
    datasets: [
      {
        label: "Attendance",
        data: [presentDays, absentDays, totalDays - presentDays - absentDays],
        backgroundColor: ["#10B981", "#EF4444", "#0EA5E9"],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <div className="container mx-auto p-4 flex flex-wrap">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-3/3">
          <div className="flex justify-between">
            <div className="flex  items-center w-full justify-between">
              <ProfilePhoto />
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-sky-500">
                  {userData.name}
                </h2>
                <p className="text-gray-600">
                  {userData.role}, {userData.department}
                </p>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
              <ProfileCard
                bgClass="bg-sky-500"
                label="Total Days"
                value={totalDays}
              />
              <ProfileCard
                bgClass="bg-green-500"
                label="Days Present"
                value={presentDays}
              />
              <ProfileCard
                bgClass="bg-red-500"
                label="Days Absent"
                value={absentDays}
              />
              <ProfileCard
                bgClass="bg-yellow-500"
                label="Available Leaves"
                value={availableLeaves}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-3/3 flex justify-center items-center mt-6 lg:mt-0 lg:ml-6">
          <div style={{ width: "230px", height: "270px" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
