import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import useFetchCollection from "../hooks/UseFetchCollection";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserProfile({ userId }) {
  const [records, setRecords] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [presentDays, setPresentDays] = useState(0);
  const [absentDays, setAbsentDays] = useState(0);
  const [availableLeave, setAvailableLeave] = useState(0);

  useEffect(() => {
    const fetchAttendanceRecord = async () => {
      try {
        const docRef = doc(db, "attendance", userId);
        console.log(userId);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching attendance record: ", error);
      }
    };
    fetchAttendanceRecord();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const totalDaysInMonth = calculateTotalDays(currentMonth, currentYear);
    setTotalDays(totalDaysInMonth);

    const presentCount = records.filter(
      (record) => record.Status === "Present"
    ).length;
    setPresentDays(presentCount);

    const absentCount = records.filter(
      (record) => record.Status === "Absent"
    ).length;
    setAbsentDays(absentCount);

    setAvailableLeave(20);
  }, [userId, records]);

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
            <div className="flex justify-between gap-12">
              <img
                src=""
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-sky-500"
              />
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-sky-500">
                  Vino Kishore
                </h2>
                <p className="text-gray-600">Junior Developer, IT Department</p>
                <p className="text-gray-600">Email: vinokishore@murder.com</p>
                <p className="text-gray-600">Phone: +91 7339691376</p>
              </div>
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-sky-500 text-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Total Days</h3>
                <p className="text-lg">{totalDays}</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Present Days</h3>
                <p className="text-lg">{presentDays}</p>
              </div>
              <div className="bg-red-500 text-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Absent Days</h3>
                <p className="text-lg">{absentDays}</p>
              </div>
              <div className="bg-yellow-500 text-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">Available Leave</h3>
                <p className="text-lg">{availableLeave}</p>
              </div>
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
